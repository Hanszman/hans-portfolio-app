import { Routes } from '@angular/router';
import {
  APP_ROUTE_PATHS,
  FOUNDATION_ROUTE_CONTENT,
} from './core/routing/app-route-paths';
import { AppShellComponent } from './layout/app-shell/app-shell.component';

export const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: APP_ROUTE_PATHS.home,
      },
      {
        path: APP_ROUTE_PATHS.home,
        loadComponent: () =>
          import('./pages/route-page/route-page.component').then(
            (module) => module.RoutePageComponent,
          ),
        data: FOUNDATION_ROUTE_CONTENT.home,
      },
      {
        path: APP_ROUTE_PATHS.experiences,
        loadComponent: () =>
          import('./pages/route-page/route-page.component').then(
            (module) => module.RoutePageComponent,
          ),
        data: FOUNDATION_ROUTE_CONTENT.experiences,
      },
      {
        path: APP_ROUTE_PATHS.skills,
        loadComponent: () =>
          import('./pages/route-page/route-page.component').then(
            (module) => module.RoutePageComponent,
          ),
        data: FOUNDATION_ROUTE_CONTENT.skills,
      },
      {
        path: APP_ROUTE_PATHS.projects,
        loadComponent: () =>
          import('./pages/route-page/route-page.component').then(
            (module) => module.RoutePageComponent,
          ),
        data: FOUNDATION_ROUTE_CONTENT.projects,
      },
      {
        path: APP_ROUTE_PATHS.dashboard,
        loadComponent: () =>
          import('./pages/route-page/route-page.component').then(
            (module) => module.RoutePageComponent,
          ),
        data: FOUNDATION_ROUTE_CONTENT.dashboard,
      },
      {
        path: '**',
        redirectTo: APP_ROUTE_PATHS.home,
      },
    ],
  },
];
