"""Built-in filters for template substitution."""

import re
import os
from typing import Any, Callable
from pathlib import Path


class FilterRegistry:
    """Registry of filter functions for template substitution."""

    def __init__(self):
        """Initialize with built-in filters."""
        self._filters: dict[str, Callable[[Any], str]] = {}
        self._register_builtins()

    def _register_builtins(self) -> None:
        """Register built-in filter functions."""
        self.register("slugify", self.slugify)
        self.register("basename", self.basename)
        self.register("dirname", self.dirname)
        self.register("lower", self.lower)
        self.register("upper", self.upper)
        self.register("trim", self.trim)
        self.register("default", self.default)
        self.register("replace", self.replace)
        self.register("strip_slashes", self.strip_slashes)
        self.register("to_path", self.to_path)

    def register(self, name: str, func: Callable) -> None:
        """Register a filter function."""
        self._filters[name] = func

    def get(self, name: str) -> Callable:
        """Get a filter function by name."""
        if name not in self._filters:
            raise ValueError(f"Unknown filter: {name}")
        return self._filters[name]

    def has(self, name: str) -> bool:
        """Check if a filter exists."""
        return name in self._filters

    # Built-in filter implementations

    @staticmethod
    def slugify(value: Any) -> str:
        """Convert value to URL-safe slug.

        Examples:
            "Hello World" -> "hello-world"
            "/about/team" -> "about-team"
            "My Page!" -> "my-page"
        """
        value = str(value)
        # Remove leading/trailing slashes
        value = value.strip("/")
        # Replace slashes with dashes
        value = value.replace("/", "-")
        # Convert to lowercase
        value = value.lower()
        # Replace spaces with dashes
        value = value.replace(" ", "-")
        # Remove non-alphanumeric except dashes
        value = re.sub(r"[^a-z0-9-]", "", value)
        # Collapse multiple dashes
        value = re.sub(r"-+", "-", value)
        # Handle root path
        if not value:
            value = "index"
        return value

    @staticmethod
    def basename(value: Any) -> str:
        """Get the basename of a path.

        Examples:
            "/path/to/file.txt" -> "file.txt"
            "file.txt" -> "file.txt"
        """
        return os.path.basename(str(value))

    @staticmethod
    def dirname(value: Any) -> str:
        """Get the directory name of a path.

        Examples:
            "/path/to/file.txt" -> "/path/to"
            "file.txt" -> ""
        """
        return os.path.dirname(str(value))

    @staticmethod
    def lower(value: Any) -> str:
        """Convert to lowercase."""
        return str(value).lower()

    @staticmethod
    def upper(value: Any) -> str:
        """Convert to uppercase."""
        return str(value).upper()

    @staticmethod
    def trim(value: Any) -> str:
        """Trim whitespace."""
        return str(value).strip()

    @staticmethod
    def default(value: Any, default_value: str = "") -> str:
        """Return default value if value is empty/None.

        Note: This filter takes an argument, handled specially in engine.
        """
        if not value:
            return default_value
        return str(value)

    @staticmethod
    def replace(value: Any, old: str = "", new: str = "") -> str:
        """Replace substring in value.

        Note: This filter takes arguments, handled specially in engine.
        """
        return str(value).replace(old, new)

    @staticmethod
    def strip_slashes(value: Any) -> str:
        """Remove leading and trailing slashes.

        Examples:
            "/path/to/" -> "path/to"
            "//test//" -> "test"
        """
        return str(value).strip("/")

    @staticmethod
    def to_path(value: Any) -> str:
        """Convert route to filesystem-safe path.

        Examples:
            "/" -> "index"
            "/about" -> "about"
            "/blog/post-1" -> "blog/post-1"
        """
        value = str(value).strip("/")
        if not value:
            return "index"
        return value
