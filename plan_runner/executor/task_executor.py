"""Execute individual tasks with retry logic."""

import time
from pathlib import Path
from typing import Callable, Optional

from ..models.plan import Task
from ..models.config import PlanConfig
from .claude_runner import ClaudeRunner, ClaudeResult


class TaskExecutor:
    """Execute a single task with retry and backoff.

    Provides:
    - Exponential backoff retry
    - Output path verification
    - Progress callbacks
    """

    def __init__(
        self,
        config: PlanConfig,
        on_start: Optional[Callable[[str], None]] = None,
        on_complete: Optional[Callable[[str, dict], None]] = None,
        on_fail: Optional[Callable[[str, str], None]] = None,
    ):
        """Initialize task executor.

        Args:
            config: Plan configuration
            on_start: Callback when task starts (task_id)
            on_complete: Callback when task completes (task_id, outputs)
            on_fail: Callback when task fails (task_id, error)
        """
        self.config = config
        self.on_start = on_start
        self.on_complete = on_complete
        self.on_fail = on_fail

        self.runner = ClaudeRunner(
            working_dir=config.working_dir,
            model=config.model,
            timeout=config.timeout,
        )

    def execute(self, task: Task, attempt: int = 0) -> tuple[bool, dict[str, str]]:
        """Execute a task with retry logic.

        Args:
            task: Task to execute
            attempt: Current attempt number (for retry)

        Returns:
            Tuple of (success, outputs)
        """
        max_retries = self.config.retries
        base_delay = self.config.retry_delay

        # Notify start
        if self.on_start:
            self.on_start(task.task_id)

        while attempt < max_retries:
            attempt += 1

            # Log attempt
            print(f"  [{task.task_id}] Attempt {attempt}/{max_retries}")

            # Execute via Claude
            result = self.runner.run(task.prompt, task.task_id)

            if result.success:
                # Verify outputs exist (optional - outputs might be created by Claude)
                outputs = task.outputs.copy()

                # Notify completion
                if self.on_complete:
                    self.on_complete(task.task_id, outputs)

                print(f"  [{task.task_id}] Completed successfully")

                # Log context window usage if available
                if result.input_tokens is not None or result.output_tokens is not None:
                    input_t = result.input_tokens or 0
                    output_t = result.output_tokens or 0
                    total = input_t + output_t
                    print(f"  [{task.task_id}] Context: {input_t:,} in + {output_t:,} out = {total:,} tokens")

                return True, outputs

            # Failed - log error
            error_msg = result.error_message or f"Exit code: {result.exit_code}"
            print(f"  [{task.task_id}] Failed: {error_msg}")

            # Check if we should retry
            if attempt < max_retries:
                delay = base_delay * (2 ** (attempt - 1))  # Exponential backoff
                print(f"  [{task.task_id}] Retrying in {delay}s...")
                time.sleep(delay)
            else:
                # Final failure
                if self.on_fail:
                    self.on_fail(task.task_id, error_msg)
                return False, {}

        return False, {}

    def verify_outputs(self, task: Task) -> bool:
        """Verify that task outputs exist.

        Args:
            task: Task with output definitions

        Returns:
            True if all outputs exist
        """
        for name, path in task.outputs.items():
            if not Path(path).exists():
                print(f"  [{task.task_id}] Output not found: {path}")
                return False
        return True
