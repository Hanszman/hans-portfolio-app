import { Routes } from '@angular/router';
import {
  adminSessionGuard,
  loginPageGuard,
} from './core/admin-session/admin-session.guard';
import {
  ADMIN_HOME_ROUTE,
  ADMIN_LOGIN_ROUTE,
} from './core/admin-session/admin-session.types';
import { ShellComponent } from './layout/shell/shell.component';

const loadLogin = () =>
  import('./pages/login/login.component').then(
    (module) => module.LoginComponent,
  );

const loadAdmin = () =>
  import('./pages/admin/admin.component').then(
    (module) => module.AdminComponent,
  );

const loadHome = () =>
  import('./pages/home/home.component').then((module) => module.HomeComponent);

const loadExperiences = () =>
  import('./pages/experiences/experiences.component').then(
    (module) => module.ExperiencesComponent,
  );

const loadSkills = () =>
  import('./pages/skills/skills.component').then((module) => module.SkillsComponent);

const loadProjects = () =>
  import('./pages/projects/projects.component').then(
    (module) => module.ProjectsComponent,
  );

const loadDashboard = () =>
  import('./pages/dashboard/dashboard.component').then(
    (module) => module.DashboardComponent,
  );

export const routes: Routes = [
  {
    path: ADMIN_LOGIN_ROUTE.slice(1),
    canActivate: [loginPageGuard],
    loadComponent: loadLogin,
  },
  {
    path: ADMIN_HOME_ROUTE.slice(1),
    canActivate: [adminSessionGuard],
    loadComponent: loadAdmin,
  },
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadComponent: loadHome,
      },
      {
        path: 'experiences',
        loadComponent: loadExperiences,
      },
      {
        path: 'skills',
        loadComponent: loadSkills,
      },
      {
        path: 'projects',
        loadComponent: loadProjects,
      },
      {
        path: 'dashboard',
        loadComponent: loadDashboard,
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
];
