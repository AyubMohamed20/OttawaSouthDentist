"""Main orchestrator for plan execution."""

from pathlib import Path
from typing import Optional

from ..models.plan import Plan, Phase, Task, TaskTemplate
from ..models.config import PlanConfig
from ..state.state_manager import StateManager
from ..template.engine import TemplateEngine
from ..template.context import TemplateContext
from ..data.data_loader import DataLoader
from .phase_executor import PhaseExecutor


class PlanExecutor:
    """Orchestrate execution of an entire plan.

    Provides:
    - Task generation from templates
    - Phase dependency ordering
    - Resume capability
    - Dry run mode
    """

    def __init__(
        self,
        plan: Plan,
        state_file: Optional[Path] = None,
        dry_run: bool = False,
    ):
        """Initialize plan executor.

        Args:
            plan: Plan to execute
            state_file: Path to state file (default: output_dir/state.json)
            dry_run: If True, only parse and validate without executing
        """
        self.plan = plan
        self.dry_run = dry_run

        # Setup state file path
        if state_file:
            self.state_file = Path(state_file)
        else:
            self.state_file = Path(plan.config.output_dir) / plan.config.state_file

        # Initialize components
        self.template_engine = TemplateEngine()
        self.data_loader = DataLoader(Path(plan.config.working_dir))
        self.state_manager = StateManager(self.state_file)

        # Generate all tasks from templates
        self.tasks: dict[str, Task] = {}
        self.phase_tasks: dict[str, list[Task]] = {}

    def execute(
        self,
        resume: bool = False,
        phase_filter: Optional[str] = None,
        workers_override: Optional[int] = None,
    ) -> bool:
        """Execute the plan.

        Args:
            resume: Whether to resume from previous state
            phase_filter: If set, only execute this phase
            workers_override: Override worker count from config

        Returns:
            True if all tasks succeeded
        """
        print(f"\n{'#'*60}")
        print(f"# Plan: {self.plan.name}")
        print(f"# Dry run: {self.dry_run}")
        print(f"# Resume: {resume}")
        print(f"{'#'*60}")

        # Apply workers override
        if workers_override:
            self.plan.config.workers = workers_override

        # Load data sources
        print("\nLoading data sources...")
        loaded_data = self.data_loader.load_all(self.plan.data_sources)
        for name, items in loaded_data.items():
            print(f"  {name}: {len(items)} items")

        # Create template context
        context = TemplateContext.from_plan(self.plan)
        # Update data with loaded items
        context.data = loaded_data

        # Generate tasks from templates
        print("\nGenerating tasks from templates...")
        self._generate_all_tasks(context)

        total_tasks = sum(len(tasks) for tasks in self.phase_tasks.values())
        print(f"Total tasks generated: {total_tasks}")

        if self.dry_run:
            self._print_dry_run_summary()
            return True

        # Load or initialize state
        if resume and self.state_file.exists():
            print("\nResuming from previous state...")
            self.state_manager.load()
        else:
            print("\nInitializing fresh state...")
            all_tasks = [task for tasks in self.phase_tasks.values() for task in tasks]
            self.state_manager.initialize(self.plan, all_tasks)

        # Get phase execution order
        ordered_phases = self.plan.get_phase_order()

        # Filter to single phase if requested
        if phase_filter:
            ordered_phases = [p for p in ordered_phases if p.name == phase_filter]
            if not ordered_phases:
                print(f"Error: Phase '{phase_filter}' not found")
                return False

        # Create phase executor
        phase_executor = PhaseExecutor(
            config=self.plan.config,
            state_manager=self.state_manager,
        )

        # Execute phases in order
        all_succeeded = True
        total_completed = 0
        total_failed = 0

        for phase in ordered_phases:
            # Check dependencies
            for dep in phase.depends_on:
                if not self.state_manager.is_phase_completed(dep):
                    print(f"\nSkipping {phase.name}: dependency {dep} not completed")
                    continue

            # Get tasks for this phase
            tasks = self.phase_tasks.get(phase.name, [])

            # Execute phase
            success, completed, failed = phase_executor.execute(
                phase=phase,
                tasks=tasks,
                resume=resume,
            )

            total_completed += completed
            total_failed += failed

            if not success:
                all_succeeded = False
                # Continue with other phases or stop?
                # For now, continue to allow partial progress

        # Mark execution completed
        self.state_manager.execution_completed()

        # Print final summary
        print(f"\n{'='*60}")
        print("EXECUTION SUMMARY")
        print(f"{'='*60}")
        print(f"Total tasks: {total_tasks}")
        print(f"Completed: {total_completed}")
        print(f"Failed: {total_failed}")
        print(f"Success: {all_succeeded}")

        if total_failed > 0:
            print(f"\nTo retry failed tasks, run with --resume")

        return all_succeeded

    def _generate_all_tasks(self, context: TemplateContext) -> None:
        """Generate all tasks from templates.

        Args:
            context: Template context for variable substitution
        """
        for phase in self.plan.phases:
            self.phase_tasks[phase.name] = []

            for template in phase.task_templates:
                tasks = self._generate_tasks_from_template(
                    template=template,
                    phase_name=phase.name,
                    context=context,
                )
                self.phase_tasks[phase.name].extend(tasks)

                for task in tasks:
                    self.tasks[task.task_id] = task

    def _generate_tasks_from_template(
        self,
        template: TaskTemplate,
        phase_name: str,
        context: TemplateContext,
    ) -> list[Task]:
        """Generate tasks from a template.

        Args:
            template: Task template definition
            phase_name: Name of the phase
            context: Template context

        Returns:
            List of generated tasks
        """
        tasks = []

        if template.foreach:
            # Extract data source reference from ${data.sourcename}
            data_ref = template.foreach
            if data_ref.startswith("${") and data_ref.endswith("}"):
                data_ref = data_ref[2:-1]

            # Resolve to get items
            items = context.resolve(data_ref)
            if not isinstance(items, list):
                items = [items] if items else []

            for item in items:
                task = self._create_task(
                    template=template,
                    phase_name=phase_name,
                    context=context.with_item(item),
                    item=item,
                )
                tasks.append(task)
        else:
            # Single task, no iteration
            task = self._create_task(
                template=template,
                phase_name=phase_name,
                context=context,
                item=None,
            )
            tasks.append(task)

        return tasks

    def _create_task(
        self,
        template: TaskTemplate,
        phase_name: str,
        context: TemplateContext,
        item: Optional[dict],
    ) -> Task:
        """Create a single task from a template.

        Args:
            template: Task template
            phase_name: Phase name
            context: Template context (with item set)
            item: Current iteration item

        Returns:
            Generated task
        """
        # Generate task ID
        task_id = self.template_engine.render(template.task_id_template, context)
        context = context.with_task_id(task_id)

        # Resolve outputs
        outputs = {}
        for output in template.outputs:
            path = self.template_engine.render(output.path, context)
            outputs[output.name] = path

        # Resolve requirements (dependencies on other tasks)
        requirements = {}
        for req in template.requirements:
            dep_task_id = self.template_engine.render(req.task_id_template, context)
            # Get output path from the dependency
            dep_outputs = self.state_manager.get_completed_task_outputs(dep_task_id)
            if dep_outputs and req.output_name in dep_outputs:
                requirements[req.alias] = dep_outputs[req.output_name]
            else:
                # Task not completed yet - use expected path
                # This assumes consistent output naming
                requirements[req.alias] = f"[pending:{dep_task_id}.{req.output_name}]"

        # Update context with requirements
        context = context.with_requires(requirements)

        # Render prompt
        prompt = self.template_engine.render(template.prompt_template, context)

        return Task(
            task_id=task_id,
            phase_name=phase_name,
            prompt=prompt,
            outputs=outputs,
            requirements=requirements,
            item_data=item,
        )

    def _print_dry_run_summary(self) -> None:
        """Print summary for dry run mode."""
        print(f"\n{'='*60}")
        print("DRY RUN SUMMARY")
        print(f"{'='*60}")

        for phase in self.plan.get_phase_order():
            tasks = self.phase_tasks.get(phase.name, [])
            print(f"\n{phase.name}:")
            print(f"  Execution: {phase.execution.value}")
            print(f"  Depends on: {phase.depends_on or 'none'}")
            print(f"  Tasks: {len(tasks)}")

            if tasks:
                print("  Task IDs:")
                for task in tasks[:5]:  # Show first 5
                    print(f"    - {task.task_id}")
                if len(tasks) > 5:
                    print(f"    ... and {len(tasks) - 5} more")

        print(f"\n{'='*60}")
        print("Dry run complete. No tasks were executed.")
        print(f"{'='*60}")
