export const APP_ROUTE_PATHS = {
  home: 'home',
  experiences: 'experiences',
  skills: 'skills',
  projects: 'projects',
  dashboard: 'dashboard',
} as const;

export type AppRouteKey = keyof typeof APP_ROUTE_PATHS;

export interface FoundationRouteContent {
  readonly sectionLabel: string;
  readonly title: string;
  readonly description: string;
}

export const FOUNDATION_ROUTE_CONTENT: Record<AppRouteKey, FoundationRouteContent> = {
  home: {
    sectionLabel: 'Foundation',
    title: 'Home foundation',
    description:
      'The home route is wired and ready for the upcoming hero, highlights, and API-driven portfolio summary.',
  },
  experiences: {
    sectionLabel: 'Foundation',
    title: 'Experiences foundation',
    description:
      'The experiences route is prepared to receive the career timeline, impact storytelling, and real backend data.',
  },
  skills: {
    sectionLabel: 'Foundation',
    title: 'Skills foundation',
    description:
      'The skills route is prepared for the upcoming technology catalog, filters, and experience metrics integration.',
  },
  projects: {
    sectionLabel: 'Foundation',
    title: 'Projects foundation',
    description:
      'The projects route is prepared for the future case-study layout, linked assets, and portfolio highlights.',
  },
  dashboard: {
    sectionLabel: 'Foundation',
    title: 'Dashboard foundation',
    description:
      'The dashboard route is prepared for the analytics page and its backend aggregate endpoints.',
  },
};
