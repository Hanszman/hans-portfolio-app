export interface RoutePageContent {
  readonly sectionLabel: string;
  readonly title: string;
  readonly description: string;
  readonly summaryLabel: string;
  readonly summaryTitle: string;
  readonly summaryDescription: string;
  readonly statusLabel: string;
  readonly statusDescription: string;
}

export const DEFAULT_ROUTE_PAGE_CONTENT: RoutePageContent = {
  sectionLabel: 'Foundation',
  title: 'Home foundation',
  description:
    'The home route is wired and ready for the upcoming hero, highlights, and API-driven portfolio summary.',
  summaryLabel: 'Roadmap',
  summaryTitle: 'Hero, highlights and API-driven overview',
  summaryDescription:
    'The home route will introduce Victor, reinforce positioning, and surface the first backend-driven summary cards.',
  statusLabel: 'Status',
  statusDescription:
    'This route already sits inside the new portfolio shell and is ready for the upcoming hero, highlights, and API-driven summary implementation.',
};
