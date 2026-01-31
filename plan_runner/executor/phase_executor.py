"""Execute phases with parallel or sequential task execution."""

from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import Optional, Callable

from ..models.plan import Phase, Task, ExecutionMode
from ..models.config import PlanConfig
from ..state.state_manager import StateManager
from .task_executor import TaskExecutor


class PhaseExecutor:
    """Execute a phase with configurable parallelism.

    Provides:
    - Parallel execution with thread pool
    - Sequential execution
    - Progress tracking via StateManager
    """

    def __init__(
        self,
        config: PlanConfig,
        state_manager: StateManager,
        on_task_start: Optional[Callable[[str], None]] = None,
        on_task_complete: Optional[Callable[[str, dict], None]] = None,
        on_task_fail: Optional[Callable[[str, str], None]] = None,
    ):
        """Initialize phase executor.

        Args:
            config: Plan configuration
            state_manager: State manager for persistence
            on_task_start: Callback when task starts
            on_task_complete: Callback when task completes
            on_task_fail: Callback when task fails
        """
        self.config = config
        self.state_manager = state_manager
        self.on_task_start = on_task_start
        self.on_task_complete = on_task_complete
        self.on_task_fail = on_task_fail

    def execute(
        self,
        phase: Phase,
        tasks: list[Task],
        resume: bool = False,
    ) -> tuple[bool, int, int]:
        """Execute a phase.

        Args:
            phase: Phase to execute
            tasks: Tasks in the phase
            resume: Whether to skip completed tasks

        Returns:
            Tuple of (all_succeeded, completed_count, failed_count)
        """
        print(f"\n{'='*60}")
        print(f"Phase: {phase.name}")
        print(f"Execution mode: {phase.execution.value}")
        print(f"{'='*60}")

        # Mark phase as started
        self.state_manager.phase_started(phase.name)

        # Filter tasks if resuming
        if resume:
            tasks = [t for t in tasks if not self.state_manager.is_task_completed(t.task_id)]
            print(f"Resume mode: {len(tasks)} tasks remaining")

        if not tasks:
            print("No tasks to execute")
            self.state_manager.phase_completed(phase.name)
            return True, 0, 0

        print(f"Tasks to execute: {len(tasks)}")

        # Execute based on mode
        if phase.execution == ExecutionMode.PARALLEL:
            success, completed, failed = self._execute_parallel(tasks)
        else:
            success, completed, failed = self._execute_sequential(tasks)

        # Mark phase status
        if success:
            self.state_manager.phase_completed(phase.name)
        else:
            self.state_manager.phase_failed(phase.name)

        print(f"\nPhase {phase.name} {'completed' if success else 'failed'}")
        print(f"  Completed: {completed}, Failed: {failed}")

        return success, completed, failed

    def _execute_parallel(self, tasks: list[Task]) -> tuple[bool, int, int]:
        """Execute tasks in parallel using thread pool.

        Args:
            tasks: Tasks to execute

        Returns:
            Tuple of (all_succeeded, completed_count, failed_count)
        """
        completed = 0
        failed = 0

        # Create task executor with callbacks
        task_executor = TaskExecutor(
            config=self.config,
            on_start=self._handle_task_start,
            on_complete=self._handle_task_complete,
            on_fail=self._handle_task_fail,
        )

        with ThreadPoolExecutor(max_workers=self.config.workers) as executor:
            # Submit all tasks
            futures = {
                executor.submit(task_executor.execute, task): task
                for task in tasks
            }

            # Process results as they complete
            for future in as_completed(futures):
                task = futures[future]
                try:
                    success, outputs = future.result()
                    if success:
                        completed += 1
                    else:
                        failed += 1
                except Exception as e:
                    print(f"  [{task.task_id}] Exception: {str(e)}")
                    failed += 1
                    self._handle_task_fail(task.task_id, str(e))

        return failed == 0, completed, failed

    def _execute_sequential(self, tasks: list[Task]) -> tuple[bool, int, int]:
        """Execute tasks sequentially.

        Args:
            tasks: Tasks to execute

        Returns:
            Tuple of (all_succeeded, completed_count, failed_count)
        """
        completed = 0
        failed = 0

        task_executor = TaskExecutor(
            config=self.config,
            on_start=self._handle_task_start,
            on_complete=self._handle_task_complete,
            on_fail=self._handle_task_fail,
        )

        for task in tasks:
            try:
                # Get current attempt count for resume
                attempt = self.state_manager.get_task_attempts(task.task_id)
                success, outputs = task_executor.execute(task, attempt)

                if success:
                    completed += 1
                else:
                    failed += 1
            except Exception as e:
                print(f"  [{task.task_id}] Exception: {str(e)}")
                failed += 1
                self._handle_task_fail(task.task_id, str(e))

        return failed == 0, completed, failed

    def _handle_task_start(self, task_id: str) -> None:
        """Handle task start event."""
        self.state_manager.task_started(task_id)
        if self.on_task_start:
            self.on_task_start(task_id)

    def _handle_task_complete(self, task_id: str, outputs: dict) -> None:
        """Handle task completion event."""
        self.state_manager.task_completed(task_id, outputs)
        if self.on_task_complete:
            self.on_task_complete(task_id, outputs)

    def _handle_task_fail(self, task_id: str, error: str) -> None:
        """Handle task failure event."""
        self.state_manager.task_failed(task_id, error)
        if self.on_task_fail:
            self.on_task_fail(task_id, error)
