"""Execution state models for tracking progress and enabling resume."""

from dataclasses import dataclass, field
from typing import Optional, Any
from enum import Enum
from datetime import datetime
import json


class TaskStatus(Enum):
    """Status of a task execution."""
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    SKIPPED = "skipped"


class PhaseStatus(Enum):
    """Status of a phase execution."""
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    SKIPPED = "skipped"


@dataclass
class TaskResult:
    """Result of a single task execution."""

    task_id: str
    phase_name: str
    status: TaskStatus = TaskStatus.PENDING
    started_at: Optional[str] = None
    completed_at: Optional[str] = None
    attempts: int = 0
    error_message: Optional[str] = None
    outputs: dict[str, str] = field(default_factory=dict)  # output name -> path

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "task_id": self.task_id,
            "phase_name": self.phase_name,
            "status": self.status.value,
            "started_at": self.started_at,
            "completed_at": self.completed_at,
            "attempts": self.attempts,
            "error_message": self.error_message,
            "outputs": self.outputs,
        }

    @classmethod
    def from_dict(cls, data: dict) -> "TaskResult":
        """Create from dictionary."""
        return cls(
            task_id=data["task_id"],
            phase_name=data["phase_name"],
            status=TaskStatus(data["status"]),
            started_at=data.get("started_at"),
            completed_at=data.get("completed_at"),
            attempts=data.get("attempts", 0),
            error_message=data.get("error_message"),
            outputs=data.get("outputs", {}),
        )

    def mark_started(self) -> None:
        """Mark task as started."""
        self.status = TaskStatus.RUNNING
        self.started_at = datetime.now().isoformat()
        self.attempts += 1

    def mark_completed(self, outputs: dict[str, str]) -> None:
        """Mark task as completed."""
        self.status = TaskStatus.COMPLETED
        self.completed_at = datetime.now().isoformat()
        self.outputs = outputs
        self.error_message = None

    def mark_failed(self, error: str) -> None:
        """Mark task as failed."""
        self.status = TaskStatus.FAILED
        self.completed_at = datetime.now().isoformat()
        self.error_message = error


@dataclass
class PhaseResult:
    """Result of a phase execution."""

    phase_name: str
    status: PhaseStatus = PhaseStatus.PENDING
    started_at: Optional[str] = None
    completed_at: Optional[str] = None

    def to_dict(self) -> dict:
        """Convert to dictionary."""
        return {
            "phase_name": self.phase_name,
            "status": self.status.value,
            "started_at": self.started_at,
            "completed_at": self.completed_at,
        }

    @classmethod
    def from_dict(cls, data: dict) -> "PhaseResult":
        """Create from dictionary."""
        return cls(
            phase_name=data["phase_name"],
            status=PhaseStatus(data["status"]),
            started_at=data.get("started_at"),
            completed_at=data.get("completed_at"),
        )


@dataclass
class ExecutionState:
    """Complete execution state for a plan run."""

    plan_name: str
    plan_file: str
    started_at: str = field(default_factory=lambda: datetime.now().isoformat())
    completed_at: Optional[str] = None
    phases: dict[str, PhaseResult] = field(default_factory=dict)
    tasks: dict[str, TaskResult] = field(default_factory=dict)

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "plan_name": self.plan_name,
            "plan_file": self.plan_file,
            "started_at": self.started_at,
            "completed_at": self.completed_at,
            "phases": {name: result.to_dict() for name, result in self.phases.items()},
            "tasks": {task_id: result.to_dict() for task_id, result in self.tasks.items()},
        }

    @classmethod
    def from_dict(cls, data: dict) -> "ExecutionState":
        """Create from dictionary."""
        state = cls(
            plan_name=data["plan_name"],
            plan_file=data["plan_file"],
            started_at=data.get("started_at", datetime.now().isoformat()),
            completed_at=data.get("completed_at"),
        )

        for name, phase_data in data.get("phases", {}).items():
            state.phases[name] = PhaseResult.from_dict(phase_data)

        for task_id, task_data in data.get("tasks", {}).items():
            state.tasks[task_id] = TaskResult.from_dict(task_data)

        return state

    def to_json(self) -> str:
        """Serialize to JSON string."""
        return json.dumps(self.to_dict(), indent=2)

    @classmethod
    def from_json(cls, json_str: str) -> "ExecutionState":
        """Deserialize from JSON string."""
        return cls.from_dict(json.loads(json_str))

    def get_task_result(self, task_id: str) -> TaskResult:
        """Get or create task result."""
        if task_id not in self.tasks:
            # Task not found - this shouldn't happen normally
            raise KeyError(f"Task {task_id} not found in state")
        return self.tasks[task_id]

    def get_phase_result(self, phase_name: str) -> PhaseResult:
        """Get or create phase result."""
        if phase_name not in self.phases:
            self.phases[phase_name] = PhaseResult(phase_name=phase_name)
        return self.phases[phase_name]

    def get_pending_tasks(self, phase_name: str) -> list[str]:
        """Get task IDs that are pending or failed in a phase."""
        pending = []
        for task_id, result in self.tasks.items():
            if result.phase_name == phase_name:
                if result.status in (TaskStatus.PENDING, TaskStatus.FAILED):
                    pending.append(task_id)
        return pending

    def get_completed_task_outputs(self, task_id: str) -> dict[str, str]:
        """Get outputs from a completed task."""
        if task_id in self.tasks:
            result = self.tasks[task_id]
            if result.status == TaskStatus.COMPLETED:
                return result.outputs
        return {}

    def is_phase_complete(self, phase_name: str) -> bool:
        """Check if all tasks in a phase are completed."""
        phase_tasks = [r for r in self.tasks.values() if r.phase_name == phase_name]
        return all(t.status == TaskStatus.COMPLETED for t in phase_tasks)

    def get_stats(self) -> dict:
        """Get execution statistics."""
        total = len(self.tasks)
        completed = sum(1 for t in self.tasks.values() if t.status == TaskStatus.COMPLETED)
        failed = sum(1 for t in self.tasks.values() if t.status == TaskStatus.FAILED)
        pending = sum(1 for t in self.tasks.values() if t.status == TaskStatus.PENDING)
        running = sum(1 for t in self.tasks.values() if t.status == TaskStatus.RUNNING)

        return {
            "total": total,
            "completed": completed,
            "failed": failed,
            "pending": pending,
            "running": running,
        }
