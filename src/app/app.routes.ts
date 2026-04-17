import { Routes } from '@angular/router';
import { AppShellComponent } from './layout/app-shell/app-shell.component';

const loadHomePage = () =>
  import('./pages/home/home-page.component').then((module) => module.HomePageComponent);

const loadExperiencesPage = () =>
  import('./pages/experiences/experiences-page.component').then(
    (module) => module.ExperiencesPageComponent,
  );

const loadSkillsPage = () =>
  import('./pages/skills/skills-page.component').then(
    (module) => module.SkillsPageComponent,
  );

const loadProjectsPage = () =>
  import('./pages/projects/projects-page.component').then(
    (module) => module.ProjectsPageComponent,
  );

const loadDashboardPage = () =>
  import('./pages/dashboard/dashboard-page.component').then(
    (module) => module.DashboardPageComponent,
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
        loadComponent: loadHomePage,
      },
      {
        path: 'experiences',
        loadComponent: loadExperiencesPage,
      },
      {
        path: 'skills',
        loadComponent: loadSkillsPage,
      },
      {
        path: 'projects',
        loadComponent: loadProjectsPage,
      },
      {
        path: 'dashboard',
        loadComponent: loadDashboardPage,
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
];
