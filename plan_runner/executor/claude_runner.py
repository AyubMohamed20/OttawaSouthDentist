"""Claude CLI wrapper for executing tasks."""

import json
import subprocess
import os
from pathlib import Path
from typing import Optional
from dataclasses import dataclass


@dataclass
class ClaudeResult:
    """Result from a Claude CLI execution."""

    success: bool
    exit_code: int
    stdout: str
    stderr: str
    error_message: Optional[str] = None
    input_tokens: Optional[int] = None
    output_tokens: Optional[int] = None


class ClaudeRunner:
    """Execute prompts via Claude CLI."""

    def __init__(
        self,
        working_dir: str = "./",
        model: str = "sonnet",
        timeout: int = 3600,
    ):
        """Initialize Claude runner.

        Args:
            working_dir: Working directory for Claude execution
            model: Model to use (sonnet, opus, haiku)
            timeout: Timeout in seconds
        """
        self.working_dir = Path(working_dir)
        self.model = model
        self.timeout = timeout

    def run(self, prompt: str, task_id: str = "") -> ClaudeResult:
        """Execute a prompt via Claude CLI.

        Args:
            prompt: The prompt to execute
            task_id: Optional task ID for logging

        Returns:
            ClaudeResult with execution outcome
        """
        # Build the Claude CLI command
        cmd = [
            "claude",
            "--print",  # Print response to stdout
            "--model", self.model,
            "--dangerously-skip-permissions",  # Skip permission prompts for automation
            "--output-format", "json",  # JSON output for usage metrics
        ]

        try:
            # Ensure working directory exists
            self.working_dir.mkdir(parents=True, exist_ok=True)

            # Run Claude CLI
            result = subprocess.run(
                cmd,
                input=prompt,
                capture_output=True,
                text=True,
                cwd=str(self.working_dir),
                timeout=self.timeout,
                env={**os.environ, "CLAUDE_CODE_ENTRYPOINT": "plan-runner"},
            )

            success = result.returncode == 0

            # Parse JSON response to extract usage and content
            input_tokens = None
            output_tokens = None
            content = result.stdout

            if result.returncode == 0:
                try:
                    data = json.loads(result.stdout)
                    input_tokens = data.get("usage", {}).get("input_tokens")
                    output_tokens = data.get("usage", {}).get("output_tokens")
                    content = data.get("result", result.stdout)
                except json.JSONDecodeError:
                    pass

            return ClaudeResult(
                success=success,
                exit_code=result.returncode,
                stdout=content,
                stderr=result.stderr,
                error_message=result.stderr if not success else None,
                input_tokens=input_tokens,
                output_tokens=output_tokens,
            )

        except subprocess.TimeoutExpired:
            return ClaudeResult(
                success=False,
                exit_code=-1,
                stdout="",
                stderr="",
                error_message=f"Task timed out after {self.timeout} seconds",
            )

        except FileNotFoundError:
            return ClaudeResult(
                success=False,
                exit_code=-1,
                stdout="",
                stderr="",
                error_message="Claude CLI not found. Ensure 'claude' is in PATH.",
            )

        except Exception as e:
            return ClaudeResult(
                success=False,
                exit_code=-1,
                stdout="",
                stderr="",
                error_message=f"Unexpected error: {str(e)}",
            )

    def check_available(self) -> bool:
        """Check if Claude CLI is available.

        Returns:
            True if Claude CLI is installed and accessible
        """
        try:
            result = subprocess.run(
                ["claude", "--version"],
                capture_output=True,
                text=True,
                timeout=10,
            )
            return result.returncode == 0
        except (FileNotFoundError, subprocess.TimeoutExpired):
            return False
