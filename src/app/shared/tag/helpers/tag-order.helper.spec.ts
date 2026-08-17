import { sortTagItems } from './tag-order.helper';

describe('tag order helper', () => {
  it('should place highlighted items first and alphabetize each group without mutating input', () => {
    const items = [
      { name: 'Zulu', highlight: false },
      { name: 'Beta', highlight: true },
      { name: 'Alpha', highlight: true },
      { name: 'Echo' },
    ] as const;

    expect(sortTagItems(items, ({ name }) => name, 'en-us').map(({ name }) => name)).toEqual([
      'Alpha',
      'Beta',
      'Echo',
      'Zulu',
    ]);
    expect(items.map(({ name }) => name)).toEqual(['Zulu', 'Beta', 'Alpha', 'Echo']);
  });
});
