import { Data } from '@angular/router';
export interface RoutePageContent {
  readonly sectionLabel: string;
  readonly title: string;
  readonly description: string;
}

const DEFAULT_ROUTE_PAGE_CONTENT: RoutePageContent = {
  sectionLabel: 'Foundation',
  title: 'Home foundation',
  description:
    'The home route is wired and ready for the upcoming hero, highlights, and API-driven portfolio summary.',
};

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

export const readFoundationRouteData = (data: Data): RoutePageContent => ({
  sectionLabel: isNonEmptyString(data['sectionLabel'])
    ? data['sectionLabel']
    : DEFAULT_ROUTE_PAGE_CONTENT.sectionLabel,
  title: isNonEmptyString(data['title'])
    ? data['title']
    : DEFAULT_ROUTE_PAGE_CONTENT.title,
  description: isNonEmptyString(data['description'])
    ? data['description']
    : DEFAULT_ROUTE_PAGE_CONTENT.description,
});
