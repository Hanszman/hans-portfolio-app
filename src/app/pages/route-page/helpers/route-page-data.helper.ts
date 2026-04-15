import { Data } from '@angular/router';
import {
  DEFAULT_ROUTE_PAGE_CONTENT,
  RoutePageContent,
} from '../route-page.types';

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

export const readRoutePageData = (data: Data): RoutePageContent => ({
  sectionLabel: isNonEmptyString(data['sectionLabel'])
    ? data['sectionLabel']
    : DEFAULT_ROUTE_PAGE_CONTENT.sectionLabel,
  title: isNonEmptyString(data['title'])
    ? data['title']
    : DEFAULT_ROUTE_PAGE_CONTENT.title,
  description: isNonEmptyString(data['description'])
    ? data['description']
    : DEFAULT_ROUTE_PAGE_CONTENT.description,
  summaryLabel: isNonEmptyString(data['summaryLabel'])
    ? data['summaryLabel']
    : DEFAULT_ROUTE_PAGE_CONTENT.summaryLabel,
  summaryTitle: isNonEmptyString(data['summaryTitle'])
    ? data['summaryTitle']
    : DEFAULT_ROUTE_PAGE_CONTENT.summaryTitle,
  summaryDescription: isNonEmptyString(data['summaryDescription'])
    ? data['summaryDescription']
    : DEFAULT_ROUTE_PAGE_CONTENT.summaryDescription,
  statusLabel: isNonEmptyString(data['statusLabel'])
    ? data['statusLabel']
    : DEFAULT_ROUTE_PAGE_CONTENT.statusLabel,
  statusDescription: isNonEmptyString(data['statusDescription'])
    ? data['statusDescription']
    : DEFAULT_ROUTE_PAGE_CONTENT.statusDescription,
});
