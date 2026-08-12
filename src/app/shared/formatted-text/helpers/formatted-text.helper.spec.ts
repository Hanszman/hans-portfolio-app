import { parseFormattedText, parseFormattedTextSegments } from './formatted-text.helper';

describe('formatted text helper', () => {
  it('parses only the supported inline markers', () => {
    expect(parseFormattedTextSegments('A **bold**, *italic* and __underlined__ text.')).toEqual([
      { text: 'A ', style: 'plain' },
      { text: 'bold', style: 'bold' },
      { text: ', ', style: 'plain' },
      { text: 'italic', style: 'italic' },
      { text: ' and ', style: 'plain' },
      { text: 'underlined', style: 'underline' },
      { text: ' text.', style: 'plain' },
    ]);
  });

  it('groups dash and bullet lines while preserving paragraphs and blank lines', () => {
    expect(parseFormattedText('Intro\r\n- First\n• Second\n\nEnd')).toEqual([
      { type: 'paragraph', segments: [{ text: 'Intro', style: 'plain' }] },
      {
        type: 'list',
        items: [[{ text: 'First', style: 'plain' }], [{ text: 'Second', style: 'plain' }]],
      },
      { type: 'paragraph', segments: [] },
      { type: 'paragraph', segments: [{ text: 'End', style: 'plain' }] },
    ]);
  });

  it('normalizes legacy inline bullets into list items', () => {
    expect(parseFormattedText('Intro • First • Second')).toEqual([
      { type: 'paragraph', segments: [{ text: 'Intro', style: 'plain' }] },
      {
        type: 'list',
        items: [[{ text: 'First', style: 'plain' }], [{ text: 'Second', style: 'plain' }]],
      },
    ]);
  });
});
