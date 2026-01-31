"""Plan, Phase, and Task data models."""

from dataclasses import dataclass, field
from typing import Optional, Any
from enum import Enum


class ExecutionMode(Enum):
    """How tasks in a phase should be executed."""
    PARALLEL = "parallel"
    SEQUENTIAL = "sequential"


@dataclass
class DataSource:
    """A data source for task iteration."""

    name: str
    type: str  # "inline" or "file"
    items: list[dict] = field(default_factory=list)
    file_path: Optional[str] = None

    @classmethod
    def from_dict(cls, name: str, data: dict) -> "DataSource":
        """Create data source from dictionary."""
        return cls(
            name=name,
            type=data.get("type", "inline"),
            items=data.get("items", []),
            file_path=data.get("file"),
        )


@dataclass
class TaskOutput:
    """Definition of a task output."""

    name: str
    path: str  # Template string for output path


@dataclass
class TaskRequirement:
    """A dependency on another task's output."""

    task_id_template: str  # Template for task ID
    output_name: str
    alias: str  # Variable name to use in prompt


@dataclass
class TaskTemplate:
    """Template for generating tasks from data."""

    name: str
    foreach: Optional[str] = None  # Data source reference like ${data.pages}
    task_id_template: str = ""
    prompt_template: str = ""
    outputs: list[TaskOutput] = field(default_factory=list)
    requirements: list[TaskRequirement] = field(default_factory=list)

    @classmethod
    def from_dict(cls, name: str, data: dict) -> "TaskTemplate":
        """Create task template from dictionary."""
        outputs = []
        for output_data in data.get("outputs", []):
            outputs.append(TaskOutput(
                name=output_data["name"],
                path=output_data["path"],
            ))

        requirements = []
        for req_data in data.get("requires", []):
            requirements.append(TaskRequirement(
                task_id_template=req_data["task"],
                output_name=req_data["output"],
                alias=req_data["as"],
            ))

        return cls(
            name=name,
            foreach=data.get("foreach"),
            task_id_template=data.get("task_id", ""),
            prompt_template=data.get("prompt", ""),
            outputs=outputs,
            requirements=requirements,
        )


@dataclass
class Task:
    """A concrete task to execute."""

    task_id: str
    phase_name: str
    prompt: str
    outputs: dict[str, str] = field(default_factory=dict)  # name -> resolved path
    requirements: dict[str, str] = field(default_factory=dict)  # alias -> resolved path
    item_data: Optional[dict] = None  # Data from foreach iteration


@dataclass
class Phase:
    """A phase in the execution plan."""

    name: str
    execution: ExecutionMode = ExecutionMode.PARALLEL
    depends_on: list[str] = field(default_factory=list)
    task_templates: list[TaskTemplate] = field(default_factory=list)
    tasks: list[Task] = field(default_factory=list)

    @classmethod
    def from_dict(cls, name: str, data: dict) -> "Phase":
        """Create phase from dictionary."""
        execution_str = data.get("execution", "parallel").lower()
        execution = ExecutionMode.PARALLEL if execution_str == "parallel" else ExecutionMode.SEQUENTIAL

        depends_on = data.get("depends_on", [])
        if isinstance(depends_on, str):
            if depends_on.lower() == "none":
                depends_on = []
            else:
                depends_on = [d.strip() for d in depends_on.split(",")]

        return cls(
            name=name,
            execution=execution,
            depends_on=depends_on,
            task_templates=[],
            tasks=[],
        )


@dataclass
class Plan:
    """A complete execution plan."""

    name: str
    config: Any  # PlanConfig - avoiding circular import
    variables: dict[str, Any] = field(default_factory=dict)
    data_sources: dict[str, DataSource] = field(default_factory=dict)
    phases: list[Phase] = field(default_factory=list)

    def get_phase(self, name: str) -> Optional[Phase]:
        """Get a phase by name."""
        for phase in self.phases:
            if phase.name == name:
                return phase
        return None

    def get_phase_order(self) -> list[Phase]:
        """Get phases in dependency order."""
        # Simple topological sort
        ordered = []
        remaining = list(self.phases)
        completed_names = set()

        while remaining:
            # Find phases with all dependencies satisfied
            ready = []
            for phase in remaining:
                deps_satisfied = all(dep in completed_names for dep in phase.depends_on)
                if deps_satisfied:
                    ready.append(phase)

            if not ready:
                # Circular dependency or missing phase
                raise ValueError(f"Cannot resolve phase dependencies: {[p.name for p in remaining]}")

            for phase in ready:
                ordered.append(phase)
                completed_names.add(phase.name)
                remaining.remove(phase)

        return ordered
