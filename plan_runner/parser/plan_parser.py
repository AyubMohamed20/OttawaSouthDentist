"""Parse Markdown plan files with YAML frontmatter."""

import re
import yaml
from pathlib import Path
from typing import Any, Optional

from ..models.config import PlanConfig
from ..models.plan import Plan, Phase, TaskTemplate, TaskOutput, TaskRequirement, DataSource
from .prompt_parser import PromptParser


class PlanParser:
    """Parse Markdown plan files into Plan objects."""

    # Pattern to match YAML frontmatter
    FRONTMATTER_PATTERN = re.compile(
        r"^---\s*\n(.*?)\n---\s*\n",
        re.DOTALL
    )

    # Pattern to match phase headers (# Phase Name)
    PHASE_HEADER_PATTERN = re.compile(
        r"^#\s+(.+?)$",
        re.MULTILINE
    )

    # Pattern to match task template headers (## Task Template: name or ## Task: name)
    TASK_TEMPLATE_PATTERN = re.compile(
        r"^##\s+Task(?:\s+Template)?:\s*(.+?)$",
        re.MULTILINE
    )

    # Pattern to match metadata fields like **key:** value
    METADATA_PATTERN = re.compile(
        r"^\*\*(\w+):\*\*\s*(.+?)$",
        re.MULTILINE
    )

    # Pattern to match list items under outputs/requires
    LIST_ITEM_PATTERN = re.compile(
        r"^\s*-\s+(.+?)$",
        re.MULTILINE
    )

    def __init__(self, plan_file: Path):
        """Initialize parser with plan file path."""
        self.plan_file = Path(plan_file)
        self.base_dir = self.plan_file.parent

    def parse(self) -> Plan:
        """Parse the plan file and return a Plan object."""
        content = self.plan_file.read_text(encoding="utf-8")

        # Extract frontmatter
        frontmatter, body = self._extract_frontmatter(content)

        # Parse config
        config_data = frontmatter.get("config", {})
        config = PlanConfig.from_dict(config_data)
        config = config.resolve_paths(self.base_dir)

        # Parse variables
        variables = frontmatter.get("variables", {})

        # Parse data sources
        data_sources = {}
        for name, ds_data in frontmatter.get("data_sources", {}).items():
            data_sources[name] = DataSource.from_dict(name, ds_data)

        # Parse phases from body
        phases = self._parse_phases(body)

        return Plan(
            name=config.name,
            config=config,
            variables=variables,
            data_sources=data_sources,
            phases=phases,
        )

    def _extract_frontmatter(self, content: str) -> tuple[dict, str]:
        """Extract YAML frontmatter and return (frontmatter_dict, remaining_body)."""
        match = self.FRONTMATTER_PATTERN.match(content)
        if match:
            frontmatter_yaml = match.group(1)
            body = content[match.end():]
            try:
                frontmatter = yaml.safe_load(frontmatter_yaml) or {}
            except yaml.YAMLError as e:
                raise ValueError(f"Invalid YAML frontmatter: {e}")
            return frontmatter, body
        return {}, content

    def _parse_phases(self, body: str) -> list[Phase]:
        """Parse phases from Markdown body."""
        phases = []

        # Split content by phase headers
        phase_splits = re.split(r"(?=^#\s+)", body, flags=re.MULTILINE)

        for section in phase_splits:
            if not section.strip():
                continue

            # Check if this is a phase section
            header_match = self.PHASE_HEADER_PATTERN.match(section)
            if not header_match:
                continue

            phase_name = header_match.group(1).strip()
            phase_content = section[header_match.end():]

            # Parse phase metadata
            phase_data = self._parse_phase_metadata(phase_content)
            phase = Phase.from_dict(phase_name, phase_data)

            # Parse task templates in this phase
            phase.task_templates = self._parse_task_templates(phase_content)

            phases.append(phase)

        return phases

    def _parse_phase_metadata(self, content: str) -> dict:
        """Parse phase metadata from content."""
        data = {}

        # Find all **key:** value pairs before any ## Task heading
        task_match = re.search(r"^##\s+Task(?:\s+Template)?:", content, re.MULTILINE)
        if task_match:
            content = content[:task_match.start()]

        for match in self.METADATA_PATTERN.finditer(content):
            key = match.group(1).lower()
            value = match.group(2).strip()
            data[key] = value

        return data

    def _parse_task_templates(self, phase_content: str) -> list[TaskTemplate]:
        """Parse task templates from phase content."""
        templates = []

        # Split by task template headers (supports both ## Task Template: and ## Task:)
        template_splits = re.split(r"(?=^##\s+Task(?:\s+Template)?:)", phase_content, flags=re.MULTILINE)

        for section in template_splits:
            if not section.strip():
                continue

            header_match = self.TASK_TEMPLATE_PATTERN.match(section)
            if not header_match:
                continue

            template_name = header_match.group(1).strip()
            template_content = section[header_match.end():]

            template = self._parse_single_template(template_name, template_content)
            templates.append(template)

        return templates

    def _parse_single_template(self, name: str, content: str) -> TaskTemplate:
        """Parse a single task template."""
        data = {}

        # Parse metadata fields
        for match in self.METADATA_PATTERN.finditer(content):
            key = match.group(1).lower()
            value = match.group(2).strip()
            data[key] = value

        # Parse outputs section
        outputs = self._parse_outputs_section(content)

        # Parse requires section
        requires = self._parse_requires_section(content)

        # Parse prompt block
        prompt = PromptParser.extract_prompt(content) or ""

        return TaskTemplate(
            name=name,
            foreach=data.get("foreach"),
            task_id_template=data.get("task_id", ""),
            prompt_template=prompt,
            outputs=outputs,
            requirements=requires,
        )

    def _parse_outputs_section(self, content: str) -> list[TaskOutput]:
        """Parse outputs section from template content."""
        outputs = []

        # Find the outputs section
        outputs_match = re.search(
            r"\*\*outputs:\*\*\s*\n((?:\s+-\s+.+\n)+)",
            content,
            re.IGNORECASE | re.MULTILINE
        )

        if outputs_match:
            outputs_text = outputs_match.group(1)
            # Parse each output item
            current_output = {}
            for line in outputs_text.split("\n"):
                line = line.strip()
                if line.startswith("-"):
                    # New output item
                    if current_output and "name" in current_output:
                        outputs.append(TaskOutput(
                            name=current_output["name"],
                            path=current_output.get("path", ""),
                        ))
                    current_output = {}
                    # Check for inline name: value
                    if "name:" in line:
                        parts = line.split("name:", 1)
                        current_output["name"] = parts[1].strip()
                elif ":" in line:
                    key, value = line.split(":", 1)
                    current_output[key.strip()] = value.strip()

            # Don't forget the last output
            if current_output and "name" in current_output:
                outputs.append(TaskOutput(
                    name=current_output["name"],
                    path=current_output.get("path", ""),
                ))

        return outputs

    def _parse_requires_section(self, content: str) -> list[TaskRequirement]:
        """Parse requires section from template content."""
        requirements = []

        # Find the requires section
        requires_match = re.search(
            r"\*\*requires:\*\*\s*\n((?:\s+-\s+.+\n)+)",
            content,
            re.IGNORECASE | re.MULTILINE
        )

        if requires_match:
            requires_text = requires_match.group(1)
            # Parse each requirement item
            current_req = {}
            for line in requires_text.split("\n"):
                line = line.strip()
                if line.startswith("-"):
                    # New requirement item
                    if current_req and "task" in current_req:
                        requirements.append(TaskRequirement(
                            task_id_template=current_req["task"],
                            output_name=current_req.get("output", ""),
                            alias=current_req.get("as", ""),
                        ))
                    current_req = {}
                    # Check for inline task: value
                    if "task:" in line:
                        parts = line.split("task:", 1)
                        current_req["task"] = parts[1].strip()
                elif ":" in line:
                    key, value = line.split(":", 1)
                    current_req[key.strip()] = value.strip()

            # Don't forget the last requirement
            if current_req and "task" in current_req:
                requirements.append(TaskRequirement(
                    task_id_template=current_req["task"],
                    output_name=current_req.get("output", ""),
                    alias=current_req.get("as", ""),
                ))

        return requirements
