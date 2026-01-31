"""Configuration dataclasses for plan runner."""

from dataclasses import dataclass, field
from typing import Optional
from pathlib import Path


@dataclass
class PlanConfig:
    """Global configuration for a plan execution."""

    name: str = "Unnamed Plan"
    workers: int = 5
    timeout: int = 3600  # seconds per task
    retries: int = 3
    retry_delay: int = 5  # base delay in seconds for exponential backoff
    model: str = "sonnet"
    working_dir: str = "./"
    output_dir: str = "./output"
    state_file: str = "state.json"

    @classmethod
    def from_dict(cls, data: dict) -> "PlanConfig":
        """Create config from dictionary."""
        return cls(
            name=data.get("name", cls.name),
            workers=data.get("workers", cls.workers),
            timeout=data.get("timeout", cls.timeout),
            retries=data.get("retries", cls.retries),
            retry_delay=data.get("retry_delay", cls.retry_delay),
            model=data.get("model", cls.model),
            working_dir=data.get("working_dir", cls.working_dir),
            output_dir=data.get("output_dir", cls.output_dir),
            state_file=data.get("state_file", cls.state_file),
        )

    def resolve_paths(self, base_dir: Path) -> "PlanConfig":
        """Resolve relative paths against a base directory."""
        return PlanConfig(
            name=self.name,
            workers=self.workers,
            timeout=self.timeout,
            retries=self.retries,
            retry_delay=self.retry_delay,
            model=self.model,
            working_dir=str((base_dir / self.working_dir).resolve()),
            output_dir=str((base_dir / self.output_dir).resolve()),
            state_file=self.state_file,
        )


@dataclass
class TaskConfig:
    """Configuration for a specific task execution."""

    task_id: str
    prompt: str
    working_dir: str
    timeout: int = 3600
    retries: int = 3
    retry_delay: int = 5
    model: str = "sonnet"
    outputs: dict = field(default_factory=dict)

    @property
    def output_paths(self) -> dict[str, str]:
        """Get output name to path mapping."""
        return self.outputs
