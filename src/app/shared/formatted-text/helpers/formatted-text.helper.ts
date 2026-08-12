import { FormattedTextBlock, FormattedTextSegment } from '../formatted-text.types';

const INLINE_MARKER_PATTERN = /(\*\*[^*]+\*\*|__[^_]+__|\*[^*]+\*)/g;

export const parseFormattedTextSegments = (value: string): readonly FormattedTextSegment[] =>
  value
    .split(INLINE_MARKER_PATTERN)
    .filter(Boolean)
    .map((part) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return { text: part.slice(2, -2), style: 'bold' };
      }
      if (part.startsWith('__') && part.endsWith('__')) {
        return { text: part.slice(2, -2), style: 'underline' };
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return { text: part.slice(1, -1), style: 'italic' };
      }
      return { text: part, style: 'plain' };
    });

export const parseFormattedText = (value: string): readonly FormattedTextBlock[] => {
  const blocks: FormattedTextBlock[] = [];
  let pendingList: (readonly FormattedTextSegment[])[] = [];
  const flushList = (): void => {
    if (pendingList.length > 0) {
      blocks.push({ type: 'list', items: pendingList });
      pendingList = [];
    }
  };

  const normalizedValue = value
    .replace(/\r\n?/g, '\n')
    .replace(/\s+•\s+/g, '\n• ');

  for (const rawLine of normalizedValue.split('\n')) {
    const line = rawLine.trimEnd();
    if (line.startsWith('- ') || line.startsWith('• ')) {
      pendingList.push(parseFormattedTextSegments(line.slice(2)));
      continue;
    }

    flushList();
    blocks.push({ type: 'paragraph', segments: parseFormattedTextSegments(line) });
  }
  flushList();
  return blocks;
};
