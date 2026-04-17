import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell/shell.component';

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
