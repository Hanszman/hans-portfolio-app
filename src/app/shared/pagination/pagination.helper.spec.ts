import {
  calculateTotalPages,
  paginateItems,
  resolvePaginationPage,
} from './pagination.helper';

describe('pagination helpers', () => {
  it('paginates collections and calculates their total pages', () => {
    expect(paginateItems(['a', 'b', 'c'], 2, 2)).toEqual(['c']);
    expect(calculateTotalPages(3, 2)).toBe(2);
    expect(calculateTotalPages(0, 2)).toBe(0);
  });

  it('resolves pagination pages from every supported web-component event shape', () => {
    expect(resolvePaginationPage(2)).toBe(2);
    expect(resolvePaginationPage(new CustomEvent('pagechange', { detail: 3 }))).toBe(3);
    expect(
      resolvePaginationPage(new CustomEvent('pagechange', { detail: { page: 4 } })),
    ).toBe(4);

    const targetEvent = new Event('pagechange');
    Object.defineProperty(targetEvent, 'target', { value: { page: 5 } });
    expect(resolvePaginationPage(targetEvent)).toBe(5);
    expect(resolvePaginationPage(new Event('pagechange'))).toBeNull();
  });
});
