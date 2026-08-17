const isHighlighted = <T>(item: T): boolean =>
  Boolean((item as T & { highlight?: boolean | null }).highlight);

export const sortTagItems = <T>(
  items: readonly T[],
  resolveLabel: (item: T) => string,
  locale: string,
): readonly T[] =>
  [...items].sort(
    (left, right) =>
      Number(isHighlighted(right)) - Number(isHighlighted(left)) ||
      resolveLabel(left).localeCompare(resolveLabel(right), locale, {
        sensitivity: 'base',
      }),
  );
