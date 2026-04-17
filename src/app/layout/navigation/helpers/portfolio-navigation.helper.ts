import { Route, Routes } from '@angular/router';
import { PortfolioNavigationItem } from '../portfolio-navigation.types';

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

const joinRouteSegments = (
  parentSegments: readonly string[],
  routePath: string,
): string => [...parentSegments, routePath].filter(isNonEmptyString).join('/');

const formatNavigationLabel = (routePath: string): string =>
  routePath
    .split('-')
    .filter(isNonEmptyString)
    .map((segment) => `${segment[0].toUpperCase()}${segment.slice(1)}`)
    .join(' ');

const isNavigableRoute = (route: Route, routePath: string): boolean =>
  isNonEmptyString(routePath) &&
  !route.redirectTo &&
  routePath !== '**' &&
  !routePath.includes(':') &&
  Boolean(route.component || route.loadComponent);

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

    if (!isNavigableRoute(route, routePath)) {
      return childItems;
    }

    return [
      {
        path: `/${joinRouteSegments(parentSegments, routePath)}`,
        label: formatNavigationLabel(routePath),
      },
      ...childItems,
    ];
  });
