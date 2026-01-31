"""Template engine for ${variable | filter} substitution."""

import re
from typing import Any

from .filters import FilterRegistry
from .context import TemplateContext


class TemplateEngine:
    """Template engine for variable substitution with filters.

    Supports:
    - ${variable} - Simple variable substitution
    - ${variable | filter} - With single filter
    - ${variable | filter1 | filter2} - Chained filters
    - ${config.key} - Nested access
    - ${item.property | slugify} - Combined
    """

    # Pattern to match ${...} expressions
    VARIABLE_PATTERN = re.compile(
        r"\$\{([^}]+)\}"
    )

    def __init__(self, filters: FilterRegistry = None):
        """Initialize template engine.

        Args:
            filters: Filter registry to use (creates default if None)
        """
        self.filters = filters or FilterRegistry()

    def render(self, template: str, context: TemplateContext) -> str:
        """Render a template string with variable substitution.

        Args:
            template: Template string with ${...} expressions
            context: Context for variable resolution

        Returns:
            Rendered string with variables substituted
        """
        def replace_match(match: re.Match) -> str:
            expression = match.group(1).strip()
            return self._evaluate_expression(expression, context)

        return self.VARIABLE_PATTERN.sub(replace_match, template)

    def _evaluate_expression(self, expression: str, context: TemplateContext) -> str:
        """Evaluate a template expression.

        Args:
            expression: Expression like "item.route | slugify"
            context: Context for variable resolution

        Returns:
            Evaluated string value
        """
        # Split by pipe for filters
        parts = [p.strip() for p in expression.split("|")]
        variable_path = parts[0]
        filter_names = parts[1:] if len(parts) > 1 else []

        # Resolve the variable
        value = context.resolve(variable_path)

        # Apply filters in order
        for filter_expr in filter_names:
            value = self._apply_filter(filter_expr, value)

        return str(value) if value is not None else ""

    def _apply_filter(self, filter_expr: str, value: Any) -> Any:
        """Apply a filter to a value.

        Args:
            filter_expr: Filter name, possibly with arguments
            value: Value to filter

        Returns:
            Filtered value
        """
        # Check for filter with arguments: filter(arg1, arg2)
        if "(" in filter_expr:
            match = re.match(r"(\w+)\((.*)\)", filter_expr)
            if match:
                filter_name = match.group(1)
                args_str = match.group(2)
                args = self._parse_filter_args(args_str)
                return self._call_filter(filter_name, value, *args)

        # Simple filter without arguments
        return self._call_filter(filter_expr, value)

    def _parse_filter_args(self, args_str: str) -> list[str]:
        """Parse filter arguments from string.

        Args:
            args_str: Comma-separated arguments, possibly quoted

        Returns:
            List of argument values
        """
        args = []
        current = ""
        in_quotes = False
        quote_char = None

        for char in args_str:
            if char in ('"', "'") and not in_quotes:
                in_quotes = True
                quote_char = char
            elif char == quote_char and in_quotes:
                in_quotes = False
                quote_char = None
            elif char == "," and not in_quotes:
                args.append(current.strip().strip("'\""))
                current = ""
            else:
                current += char

        if current:
            args.append(current.strip().strip("'\""))

        return args

    def _call_filter(self, filter_name: str, value: Any, *args) -> Any:
        """Call a filter function.

        Args:
            filter_name: Name of the filter
            value: Value to filter
            *args: Additional arguments for the filter

        Returns:
            Filtered value
        """
        if not self.filters.has(filter_name):
            # Unknown filter - return value unchanged
            return value

        filter_func = self.filters.get(filter_name)

        # Handle filters that take additional arguments
        if args:
            return filter_func(value, *args)
        return filter_func(value)

    def render_dict(self, template_dict: dict, context: TemplateContext) -> dict:
        """Render all string values in a dictionary.

        Args:
            template_dict: Dictionary with template strings
            context: Context for variable resolution

        Returns:
            Dictionary with rendered values
        """
        result = {}
        for key, value in template_dict.items():
            if isinstance(value, str):
                result[key] = self.render(value, context)
            elif isinstance(value, dict):
                result[key] = self.render_dict(value, context)
            elif isinstance(value, list):
                result[key] = self.render_list(value, context)
            else:
                result[key] = value
        return result

    def render_list(self, template_list: list, context: TemplateContext) -> list:
        """Render all string values in a list.

        Args:
            template_list: List with template strings
            context: Context for variable resolution

        Returns:
            List with rendered values
        """
        result = []
        for item in template_list:
            if isinstance(item, str):
                result.append(self.render(item, context))
            elif isinstance(item, dict):
                result.append(self.render_dict(item, context))
            elif isinstance(item, list):
                result.append(self.render_list(item, context))
            else:
                result.append(item)
        return result
