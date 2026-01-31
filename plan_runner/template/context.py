"""Template context for variable resolution."""

from typing import Any, Optional


class TemplateContext:
    """Hierarchical context for template variable resolution.

    Provides access to:
    - config: Plan configuration values
    - data: Data sources
    - item: Current iteration item (in foreach loops)
    - requires: Required task outputs
    - variables: User-defined variables
    - TASK_ID: Current task ID
    """

    def __init__(
        self,
        config: Optional[dict] = None,
        data: Optional[dict] = None,
        item: Optional[dict] = None,
        requires: Optional[dict] = None,
        variables: Optional[dict] = None,
        task_id: Optional[str] = None,
    ):
        """Initialize template context.

        Args:
            config: Plan configuration as dict
            data: Data sources as dict
            item: Current iteration item
            requires: Required task outputs (alias -> resolved path)
            variables: User-defined variables
            task_id: Current task ID
        """
        self.config = config or {}
        self.data = data or {}
        self.item = item or {}
        self.requires = requires or {}
        self.variables = variables or {}
        self.task_id = task_id or ""

    def resolve(self, path: str) -> Any:
        """Resolve a dotted path to a value.

        Examples:
            "config.workers" -> 5
            "item.route" -> "/"
            "data.pages" -> [...]
            "requires.spec_path" -> "/output/specs/index.md"
            "TASK_ID" -> "spec-index"

        Args:
            path: Dotted path like "config.workers" or "item.route"

        Returns:
            Resolved value or empty string if not found
        """
        parts = path.split(".")

        # Handle special TASK_ID variable
        if parts[0] == "TASK_ID":
            return self.task_id

        # Determine root object
        root_map = {
            "config": self.config,
            "data": self.data,
            "item": self.item,
            "requires": self.requires,
            "variables": self.variables,
        }

        if parts[0] not in root_map:
            # Try variables as fallback
            if parts[0] in self.variables:
                return self._resolve_nested(self.variables, parts)
            return ""

        root = root_map[parts[0]]
        return self._resolve_nested(root, parts[1:])

    def _resolve_nested(self, obj: Any, parts: list[str]) -> Any:
        """Resolve nested path from an object.

        Args:
            obj: Starting object
            parts: Remaining path parts

        Returns:
            Resolved value or empty string
        """
        for part in parts:
            if obj is None:
                return ""

            if isinstance(obj, dict):
                obj = obj.get(part, "")
            elif isinstance(obj, list):
                try:
                    index = int(part)
                    obj = obj[index]
                except (ValueError, IndexError):
                    return ""
            elif hasattr(obj, part):
                obj = getattr(obj, part)
            else:
                return ""

        return obj if obj is not None else ""

    def with_item(self, item: dict) -> "TemplateContext":
        """Create new context with item set.

        Args:
            item: Item data for foreach iteration

        Returns:
            New context with item
        """
        return TemplateContext(
            config=self.config,
            data=self.data,
            item=item,
            requires=self.requires,
            variables=self.variables,
            task_id=self.task_id,
        )

    def with_task_id(self, task_id: str) -> "TemplateContext":
        """Create new context with task ID set.

        Args:
            task_id: Task ID

        Returns:
            New context with task ID
        """
        return TemplateContext(
            config=self.config,
            data=self.data,
            item=self.item,
            requires=self.requires,
            variables=self.variables,
            task_id=task_id,
        )

    def with_requires(self, requires: dict) -> "TemplateContext":
        """Create new context with requires set.

        Args:
            requires: Required outputs (alias -> resolved path)

        Returns:
            New context with requires
        """
        return TemplateContext(
            config=self.config,
            data=self.data,
            item=self.item,
            requires=requires,
            variables=self.variables,
            task_id=self.task_id,
        )

    @classmethod
    def from_plan(cls, plan: Any) -> "TemplateContext":
        """Create context from a Plan object.

        Args:
            plan: Plan object

        Returns:
            TemplateContext for the plan
        """
        # Convert config to dict
        config_dict = {
            "name": plan.config.name,
            "workers": plan.config.workers,
            "timeout": plan.config.timeout,
            "retries": plan.config.retries,
            "model": plan.config.model,
            "working_dir": plan.config.working_dir,
            "output_dir": plan.config.output_dir,
        }

        # Convert data sources to dict
        data_dict = {}
        for name, ds in plan.data_sources.items():
            data_dict[name] = ds.items

        return cls(
            config=config_dict,
            data=data_dict,
            variables=plan.variables,
        )
