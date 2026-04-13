import { Data } from '@angular/router';
import {
  FOUNDATION_ROUTE_CONTENT,
  type FoundationRouteContent,
} from '../core/routing/app-route-paths';

const DEFAULT_FOUNDATION_ROUTE_CONTENT = FOUNDATION_ROUTE_CONTENT.home;

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

export const readFoundationRouteData = (data: Data): FoundationRouteContent => ({
  sectionLabel: isNonEmptyString(data['sectionLabel'])
    ? data['sectionLabel']
    : DEFAULT_FOUNDATION_ROUTE_CONTENT.sectionLabel,
  title: isNonEmptyString(data['title'])
    ? data['title']
    : DEFAULT_FOUNDATION_ROUTE_CONTENT.title,
  description: isNonEmptyString(data['description'])
    ? data['description']
    : DEFAULT_FOUNDATION_ROUTE_CONTENT.description,
});
