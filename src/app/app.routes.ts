import { Routes } from '@angular/router';
import {
  adminAuthGuard,
  adminLoginGuard,
} from './core/auth-admin/auth-admin.guard';
import { ShellComponent } from './layout/shell/shell.component';

const loadAdminLogin = () =>
  import('./pages/admin-login/admin-login.component').then(
    (module) => module.AdminLoginComponent,
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
    path: 'admin/login',
    canActivate: [adminLoginGuard],
    loadComponent: loadAdminLogin,
  },
  {
    path: 'admin',
    canActivate: [adminAuthGuard],
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
