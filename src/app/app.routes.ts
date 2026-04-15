import { Routes } from '@angular/router';
import { AppShellComponent } from './layout/app-shell/app-shell.component';

const loadRoutePage = () =>
  import('./pages/route-page/route-page.component').then(
    (module) => module.RoutePageComponent,
  );

export const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadComponent: loadRoutePage,
        data: {
          navigationLabel: 'Home',
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
        },
      },
      {
        path: 'experiences',
        loadComponent: loadRoutePage,
        data: {
          navigationLabel: 'Experiences',
          sectionLabel: 'Foundation',
          title: 'Experiences foundation',
          description:
            'The experiences route is prepared to receive the career timeline, impact storytelling, and real backend data.',
          summaryLabel: 'Career arc',
          summaryTitle: 'Impact timeline and leadership narrative',
          summaryDescription:
            'This page will connect professional milestones, measurable outcomes, and storytelling blocks powered by the API.',
          statusLabel: 'Status',
          statusDescription:
            'The experiences area is ready to receive the first timeline sections, leadership highlights, and backend-driven metrics.',
        },
      },
      {
        path: 'skills',
        loadComponent: loadRoutePage,
        data: {
          navigationLabel: 'Skills',
          sectionLabel: 'Foundation',
          title: 'Skills foundation',
          description:
            'The skills route is prepared for the upcoming technology catalog, filters, and experience metrics integration.',
          summaryLabel: 'Catalog',
          summaryTitle: 'Technology clusters and real experience metrics',
          summaryDescription:
            'The skills page will organize front-end depth, full-stack breadth, and API-backed metrics in a curated catalog.',
          statusLabel: 'Status',
          statusDescription:
            'The skills route is ready to receive grouped technologies, filters, and experience evidence from the backend.',
        },
      },
      {
        path: 'projects',
        loadComponent: loadRoutePage,
        data: {
          navigationLabel: 'Projects',
          sectionLabel: 'Foundation',
          title: 'Projects foundation',
          description:
            'The projects route is prepared for the future case-study layout, linked assets, and portfolio highlights.',
          summaryLabel: 'Case studies',
          summaryTitle: 'Featured work, outcomes and linked assets',
          summaryDescription:
            'This page will evolve into a curated case-study space with stronger storytelling, screenshots, and structured project metadata.',
          statusLabel: 'Status',
          statusDescription:
            'The projects route is ready to receive featured cases, richer storytelling, and linked assets from the new content model.',
        },
      },
      {
        path: 'dashboard',
        loadComponent: loadRoutePage,
        data: {
          navigationLabel: 'Dashboard',
          sectionLabel: 'Foundation',
          title: 'Dashboard foundation',
          description:
            'The dashboard route is prepared for the analytics page and its backend aggregate endpoints.',
          summaryLabel: 'Analytics',
          summaryTitle: 'Operational metrics and aggregate portfolio data',
          summaryDescription:
            'The dashboard will surface aggregate signals from the portfolio API, including content health and summary metrics.',
          statusLabel: 'Status',
          statusDescription:
            'The dashboard route is ready to receive analytics widgets, health snapshots, and aggregate backend endpoints.',
        },
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
];
