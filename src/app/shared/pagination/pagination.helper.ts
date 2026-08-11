export const paginateItems = <T>(
  items: readonly T[],
  currentPage: number,
  pageSize: number,
): readonly T[] => {
  const startIndex = (currentPage - 1) * pageSize;

  return items.slice(startIndex, startIndex + pageSize);
};

export const calculateTotalPages = (totalItems: number, pageSize: number): number =>
  Math.ceil(totalItems / pageSize);

export const resolvePaginationPage = (event: Event | number): number | null => {
  if (typeof event === 'number') {
    return event;
  }

  const customEvent = event as Event & {
    detail?: number | { page?: number };
    target: (EventTarget & { page?: number }) | null;
  };

  if (typeof customEvent.detail === 'number') {
    return customEvent.detail;
  }

  if (
    customEvent.detail &&
    typeof customEvent.detail === 'object' &&
    typeof customEvent.detail.page === 'number'
  ) {
    return customEvent.detail.page;
  }

  return customEvent.target && typeof customEvent.target.page === 'number'
    ? customEvent.target.page
    : null;
};
