"""Load data from various sources."""

import json
import yaml
from pathlib import Path
from typing import Any

from ..models.plan import DataSource


class DataLoader:
    """Load data from inline definitions or external files."""

    def __init__(self, base_dir: Path):
        """Initialize data loader.

        Args:
            base_dir: Base directory for resolving relative file paths
        """
        self.base_dir = Path(base_dir)

    def load(self, data_source: DataSource) -> list[dict]:
        """Load data from a data source.

        Args:
            data_source: DataSource definition

        Returns:
            List of data items
        """
        if data_source.type == "inline":
            return data_source.items

        if data_source.type == "file":
            return self.load_file(data_source.file_path)

        raise ValueError(f"Unknown data source type: {data_source.type}")

    def load_file(self, file_path: str) -> list[dict]:
        """Load data from an external file.

        Supports JSON and YAML formats.

        Args:
            file_path: Path to data file (relative or absolute)

        Returns:
            List of data items
        """
        path = Path(file_path)
        if not path.is_absolute():
            path = self.base_dir / path

        if not path.exists():
            raise FileNotFoundError(f"Data file not found: {path}")

        content = path.read_text(encoding="utf-8")

        # Determine format from extension
        suffix = path.suffix.lower()

        if suffix in (".json",):
            data = json.loads(content)
        elif suffix in (".yaml", ".yml"):
            data = yaml.safe_load(content)
        else:
            # Try JSON first, then YAML
            try:
                data = json.loads(content)
            except json.JSONDecodeError:
                data = yaml.safe_load(content)

        # Ensure we return a list
        if isinstance(data, list):
            return data
        elif isinstance(data, dict):
            # If it's a dict with an "items" key, use that
            if "items" in data:
                return data["items"]
            # Otherwise wrap in a list
            return [data]
        else:
            return [{"value": data}]

    def load_all(self, data_sources: dict[str, DataSource]) -> dict[str, list[dict]]:
        """Load all data sources.

        Args:
            data_sources: Dict of name -> DataSource

        Returns:
            Dict of name -> loaded items
        """
        result = {}
        for name, source in data_sources.items():
            result[name] = self.load(source)
        return result
