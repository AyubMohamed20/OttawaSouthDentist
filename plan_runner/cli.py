"""Command-line interface for plan runner."""

import argparse
import sys
from pathlib import Path

from .parser.plan_parser import PlanParser
from .executor.plan_executor import PlanExecutor
from .executor.claude_runner import ClaudeRunner


def main(args: list[str] = None) -> int:
    """Main entry point for plan runner CLI.

    Args:
        args: Command line arguments (uses sys.argv if None)

    Returns:
        Exit code (0 for success, non-zero for failure)
    """
    parser = argparse.ArgumentParser(
        prog="plan_runner",
        description="Execute plans defined in Markdown files via Claude CLI",
    )

    parser.add_argument(
        "plan_file",
        type=Path,
        help="Path to the Markdown plan file",
    )

    parser.add_argument(
        "--resume",
        action="store_true",
        help="Resume from previous state (skip completed tasks)",
    )

    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Parse and validate plan without executing",
    )

    parser.add_argument(
        "--workers",
        type=int,
        help="Override number of parallel workers",
    )

    parser.add_argument(
        "--phase",
        type=str,
        help="Execute only the specified phase",
    )

    parser.add_argument(
        "--state-file",
        type=Path,
        help="Custom path for state file",
    )

    parser.add_argument(
        "--check-cli",
        action="store_true",
        help="Check if Claude CLI is available and exit",
    )

    parser.add_argument(
        "--version",
        action="version",
        version="%(prog)s 1.0.0",
    )

    parsed = parser.parse_args(args)

    # Check CLI availability
    if parsed.check_cli:
        runner = ClaudeRunner()
        if runner.check_available():
            print("Claude CLI is available")
            return 0
        else:
            print("Claude CLI is not available")
            return 1

    # Validate plan file exists
    if not parsed.plan_file.exists():
        print(f"Error: Plan file not found: {parsed.plan_file}")
        return 1

    try:
        # Parse plan
        print(f"Parsing plan: {parsed.plan_file}")
        parser_obj = PlanParser(parsed.plan_file)
        plan = parser_obj.parse()

        # Create executor
        executor = PlanExecutor(
            plan=plan,
            state_file=parsed.state_file,
            dry_run=parsed.dry_run,
        )

        # Execute
        success = executor.execute(
            resume=parsed.resume,
            phase_filter=parsed.phase,
            workers_override=parsed.workers,
        )

        return 0 if success else 1

    except ValueError as e:
        print(f"Error parsing plan: {e}")
        return 1
    except KeyboardInterrupt:
        print("\nExecution interrupted by user")
        return 130
    except Exception as e:
        print(f"Unexpected error: {e}")
        import traceback
        traceback.print_exc()
        return 1


if __name__ == "__main__":
    sys.exit(main())
