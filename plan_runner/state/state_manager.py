"""State persistence for resume functionality."""

import json
from pathlib import Path
from typing import Optional
from datetime import datetime
import threading

from ..models.state import ExecutionState, TaskResult, PhaseResult, TaskStatus, PhaseStatus
from ..models.plan import Plan, Task


class StateManager:
    """Manage execution state persistence.

    Provides:
    - State persistence to JSON file
    - Resume capability after failure
    - Thread-safe state updates
    """

    def __init__(self, state_file: Path):
        """Initialize state manager.

        Args:
            state_file: Path to state JSON file
        """
        self.state_file = Path(state_file)
        self.state: Optional[ExecutionState] = None
        self._lock = threading.Lock()

    def initialize(self, plan: Plan, tasks: list[Task]) -> ExecutionState:
        """Initialize fresh state for a plan.

        Args:
            plan: Plan being executed
            tasks: All tasks to be executed

        Returns:
            New ExecutionState
        """
        self.state = ExecutionState(
            plan_name=plan.name,
            plan_file=str(plan.config.working_dir),
        )

        # Initialize phase results
        for phase in plan.phases:
            self.state.phases[phase.name] = PhaseResult(phase_name=phase.name)

        # Initialize task results
        for task in tasks:
            self.state.tasks[task.task_id] = TaskResult(
                task_id=task.task_id,
                phase_name=task.phase_name,
            )

        self.save()
        return self.state

    def load(self) -> Optional[ExecutionState]:
        """Load state from file.

        Returns:
            ExecutionState if file exists, None otherwise
        """
        if not self.state_file.exists():
            return None

        try:
            content = self.state_file.read_text(encoding="utf-8")
            self.state = ExecutionState.from_json(content)
            return self.state
        except (json.JSONDecodeError, KeyError) as e:
            print(f"Warning: Could not load state file: {e}")
            return None

    def save(self) -> None:
        """Save current state to file."""
        if self.state is None:
            return

        with self._lock:
            # Ensure parent directory exists
            self.state_file.parent.mkdir(parents=True, exist_ok=True)
            self.state_file.write_text(self.state.to_json(), encoding="utf-8")

    def task_started(self, task_id: str) -> None:
        """Mark a task as started.

        Args:
            task_id: Task identifier
        """
        with self._lock:
            if self.state and task_id in self.state.tasks:
                self.state.tasks[task_id].mark_started()
        self.save()

    def task_completed(self, task_id: str, outputs: dict[str, str]) -> None:
        """Mark a task as completed.

        Args:
            task_id: Task identifier
            outputs: Output paths produced by the task
        """
        with self._lock:
            if self.state and task_id in self.state.tasks:
                self.state.tasks[task_id].mark_completed(outputs)
        self.save()

    def task_failed(self, task_id: str, error: str) -> None:
        """Mark a task as failed.

        Args:
            task_id: Task identifier
            error: Error message
        """
        with self._lock:
            if self.state and task_id in self.state.tasks:
                self.state.tasks[task_id].mark_failed(error)
        self.save()

    def phase_started(self, phase_name: str) -> None:
        """Mark a phase as started.

        Args:
            phase_name: Phase name
        """
        with self._lock:
            if self.state:
                if phase_name not in self.state.phases:
                    self.state.phases[phase_name] = PhaseResult(phase_name=phase_name)
                self.state.phases[phase_name].status = PhaseStatus.RUNNING
                self.state.phases[phase_name].started_at = datetime.now().isoformat()
        self.save()

    def phase_completed(self, phase_name: str) -> None:
        """Mark a phase as completed.

        Args:
            phase_name: Phase name
        """
        with self._lock:
            if self.state and phase_name in self.state.phases:
                self.state.phases[phase_name].status = PhaseStatus.COMPLETED
                self.state.phases[phase_name].completed_at = datetime.now().isoformat()
        self.save()

    def phase_failed(self, phase_name: str) -> None:
        """Mark a phase as failed.

        Args:
            phase_name: Phase name
        """
        with self._lock:
            if self.state and phase_name in self.state.phases:
                self.state.phases[phase_name].status = PhaseStatus.FAILED
                self.state.phases[phase_name].completed_at = datetime.now().isoformat()
        self.save()

    def execution_completed(self) -> None:
        """Mark the entire execution as completed."""
        with self._lock:
            if self.state:
                self.state.completed_at = datetime.now().isoformat()
        self.save()

    def get_pending_tasks(self, phase_name: str) -> list[str]:
        """Get task IDs that need to be executed in a phase.

        Returns tasks that are pending or failed (for retry).

        Args:
            phase_name: Phase name

        Returns:
            List of task IDs
        """
        if self.state is None:
            return []

        pending = []
        for task_id, result in self.state.tasks.items():
            if result.phase_name == phase_name:
                if result.status in (TaskStatus.PENDING, TaskStatus.FAILED):
                    pending.append(task_id)

        return pending

    def get_completed_task_outputs(self, task_id: str) -> dict[str, str]:
        """Get outputs from a completed task.

        Args:
            task_id: Task identifier

        Returns:
            Dict of output name -> path
        """
        if self.state is None:
            return {}

        if task_id in self.state.tasks:
            result = self.state.tasks[task_id]
            if result.status == TaskStatus.COMPLETED:
                return result.outputs

        return {}

    def is_task_completed(self, task_id: str) -> bool:
        """Check if a task is completed.

        Args:
            task_id: Task identifier

        Returns:
            True if completed
        """
        if self.state is None:
            return False

        if task_id in self.state.tasks:
            return self.state.tasks[task_id].status == TaskStatus.COMPLETED

        return False

    def is_phase_completed(self, phase_name: str) -> bool:
        """Check if all tasks in a phase are completed.

        Args:
            phase_name: Phase name

        Returns:
            True if all tasks completed
        """
        if self.state is None:
            return False

        return self.state.is_phase_complete(phase_name)

    def get_task_attempts(self, task_id: str) -> int:
        """Get the number of attempts for a task.

        Args:
            task_id: Task identifier

        Returns:
            Number of attempts
        """
        if self.state and task_id in self.state.tasks:
            return self.state.tasks[task_id].attempts
        return 0

    def print_summary(self) -> None:
        """Print execution summary."""
        if self.state is None:
            print("No state loaded.")
            return

        stats = self.state.get_stats()
        print(f"\nExecution Summary for: {self.state.plan_name}")
        print(f"  Total tasks: {stats['total']}")
        print(f"  Completed:   {stats['completed']}")
        print(f"  Failed:      {stats['failed']}")
        print(f"  Pending:     {stats['pending']}")
        print(f"  Running:     {stats['running']}")

        # Show failed tasks
        failed_tasks = [
            result for result in self.state.tasks.values()
            if result.status == TaskStatus.FAILED
        ]
        if failed_tasks:
            print("\nFailed tasks:")
            for task in failed_tasks:
                print(f"  - {task.task_id}: {task.error_message}")
