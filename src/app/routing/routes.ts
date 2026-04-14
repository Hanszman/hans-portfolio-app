import { Routes } from '@angular/router';
import { AppShellComponent } from '../layout/app-shell/app-shell.component';
import { PATHS } from './paths';

const loadRoutePage = () =>
  import('../pages/route-page/route-page.component').then(
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
        redirectTo: PATHS.home,
      },
      {
        path: PATHS.home,
        loadComponent: loadRoutePage,
        data: {
          sectionLabel: 'Foundation',
          title: 'Home foundation',
          description:
            'The home route is wired and ready for the upcoming hero, highlights, and API-driven portfolio summary.',
        },
      },
      {
        path: PATHS.experiences,
        loadComponent: loadRoutePage,
        data: {
          sectionLabel: 'Foundation',
          title: 'Experiences foundation',
          description:
            'The experiences route is prepared to receive the career timeline, impact storytelling, and real backend data.',
        },
      },
      {
        path: PATHS.skills,
        loadComponent: loadRoutePage,
        data: {
          sectionLabel: 'Foundation',
          title: 'Skills foundation',
          description:
            'The skills route is prepared for the upcoming technology catalog, filters, and experience metrics integration.',
        },
      },
      {
        path: PATHS.projects,
        loadComponent: loadRoutePage,
        data: {
          sectionLabel: 'Foundation',
          title: 'Projects foundation',
          description:
            'The projects route is prepared for the future case-study layout, linked assets, and portfolio highlights.',
        },
      },
      {
        path: PATHS.dashboard,
        loadComponent: loadRoutePage,
        data: {
          sectionLabel: 'Foundation',
          title: 'Dashboard foundation',
          description:
            'The dashboard route is prepared for the analytics page and its backend aggregate endpoints.',
        },
      },
      {
        path: '**',
        redirectTo: PATHS.home,
      },
    ],
  },
];
