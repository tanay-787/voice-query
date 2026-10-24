import re
from collections.abc import Awaitable, Callable

from pipecat.frames.frames import (
    EndFrame,
    Frame,
    LLMFullResponseEndFrame,
    TextFrame,
)
from pipecat.processors.frame_processor import FrameDirection, FrameProcessor


class CitationEventFrame(Frame):
    """Out-of-band control frame carrying visual citation metadata to the client."""

    def __init__(self, page: int, quote: str | None = None):
        super().__init__()
        self.page = page
        self.quote = quote

    def __str__(self):
        return f"CitationEventFrame(page={self.page}, quote={self.quote})"


class CitationSplitterProcessor(FrameProcessor):
    """
    Frame processor that sits between LLM and TTS.

    1. Buffers initial tokens to reliably catch [PAGE: <number>] even when split across tokens.
    2. When found: emits CitationEventFrame (to be sent as JSON to the mobile app)
       and strips [PAGE: <number>] from downstream TextFrames so TTS never reads it.
    3. If no tag is present within 30 characters, flushes the buffer downstream.
    """

    def __init__(self, on_citation: Callable[[int], Awaitable[None]] | None = None):
        super().__init__()
        self._on_citation = on_citation
        self._buffer = ""
        self._citation_detected = False
        self._pattern = re.compile(r"\[PAGE:\s*(\d+)\]", re.IGNORECASE)

    def reset(self):
        self._buffer = ""
        self._citation_detected = False

    async def _flush_clean_text(self, text: str, direction: FrameDirection):
        if text:
            await self.push_frame(TextFrame(text), direction)

    async def process_frame(self, frame: Frame, direction: FrameDirection):
        await super().process_frame(frame, direction)

        if isinstance(frame, TextFrame):
            # If citation already handled for this turn, pass text straight through
            if self._citation_detected:
                await self.push_frame(frame, direction)
                return

            self._buffer += frame.text
            match = self._pattern.search(self._buffer)

            if match:
                # Found the citation!
                page_num = int(match.group(1))
                self._citation_detected = True

                # Dispatch CitationEventFrame downstream
                await self.push_frame(CitationEventFrame(page=page_num), direction)
                if self._on_citation:
                    await self._on_citation(page_num)

                # Extract and push any text that appeared after the tag
                after_tag = self._buffer[match.end() :]
                self._buffer = ""
                await self._flush_clean_text(after_tag, direction)
                return

            # Check if buffer has exceeded maximum possible tag length without starting with '['
            # If buffer doesn't contain '[', or if it exceeds 30 chars without a full match:
            if "[" not in self._buffer or len(self._buffer) > 35:
                # No valid citation in header, flush buffer as regular speech text
                self._citation_detected = True  # don't search anymore for this turn
                flush_text = self._buffer
                self._buffer = ""
                await self._flush_clean_text(flush_text, direction)
            return

        elif isinstance(frame, (LLMFullResponseEndFrame, EndFrame)):
            # Flush whatever is left in buffer on turn completion
            if self._buffer:
                clean_text = self._pattern.sub("", self._buffer).strip()
                self._buffer = ""
                await self._flush_clean_text(clean_text, direction)
            self.reset()
            await self.push_frame(frame, direction)
            return

        # Forward all other frames (Audio, Metrics, System frames, etc.)
        await self.push_frame(frame, direction)
