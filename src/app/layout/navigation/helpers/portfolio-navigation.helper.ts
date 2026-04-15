import { Route, Routes } from '@angular/router';
import { PortfolioNavigationItem } from '../portfolio-navigation.types';

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

const joinRouteSegments = (
  parentSegments: readonly string[],
  routePath: string,
): string => [...parentSegments, routePath].filter(isNonEmptyString).join('/');

const readNavigationLabel = (route: Route): string | null => {
  const label = route.data?.['navigationLabel'];

  return isNonEmptyString(label) ? label : null;
};

export const readPortfolioNavigationItems = (
  routes: Routes,
  parentSegments: readonly string[] = [],
): PortfolioNavigationItem[] =>
  routes.flatMap((route) => {
    const routePath = isNonEmptyString(route.path) ? route.path : '';
    const nextSegments = isNonEmptyString(routePath)
      ? [...parentSegments, routePath]
      : [...parentSegments];
    const childItems = route.children
      ? readPortfolioNavigationItems(route.children, nextSegments)
      : [];

    if (!isNonEmptyString(routePath) || route.redirectTo || routePath === '**') {
      return childItems;
    }

    const navigationLabel = readNavigationLabel(route);

    if (!navigationLabel) {
      return childItems;
    }

    return [
      {
        path: `/${joinRouteSegments(parentSegments, routePath)}`,
        label: navigationLabel,
      },
      ...childItems,
    ];
  });
