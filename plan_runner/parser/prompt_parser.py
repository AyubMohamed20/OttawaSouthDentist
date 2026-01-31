"""Extract prompt blocks from Markdown content."""

import re
from typing import Optional


class PromptParser:
    """Extract and process prompt blocks from Markdown."""

    # Pattern to match ```prompt ... ``` blocks
    PROMPT_BLOCK_PATTERN = re.compile(
        r"```prompt\s*\n(.*?)```",
        re.DOTALL | re.MULTILINE
    )

    @classmethod
    def extract_prompt(cls, content: str) -> Optional[str]:
        """Extract the first prompt block from content.

        Args:
            content: Markdown content containing ```prompt``` blocks

        Returns:
            The content of the prompt block, or None if not found
        """
        match = cls.PROMPT_BLOCK_PATTERN.search(content)
        if match:
            return match.group(1).strip()
        return None

    @classmethod
    def extract_all_prompts(cls, content: str) -> list[str]:
        """Extract all prompt blocks from content.

        Args:
            content: Markdown content containing ```prompt``` blocks

        Returns:
            List of prompt block contents
        """
        matches = cls.PROMPT_BLOCK_PATTERN.findall(content)
        return [m.strip() for m in matches]

    @classmethod
    def has_prompt_block(cls, content: str) -> bool:
        """Check if content contains a prompt block."""
        return bool(cls.PROMPT_BLOCK_PATTERN.search(content))
