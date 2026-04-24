import { of } from 'rxjs';
import { DashboardService } from '../dashboard/service';
import { DashboardOverviewResponse } from '../dashboard/types';

export const createDashboardOverviewResponse = (
  overrides: Partial<DashboardOverviewResponse> = {},
): DashboardOverviewResponse => ({
  generatedAtUtc: '2026-04-18T12:00:00.000Z',
  summary: {
    projects: 12,
    experiences: 4,
    technologies: 35,
    formations: 3,
    customers: 6,
    jobs: 5,
    spokenLanguages: 2,
  },
  stackDistribution: {
    generatedAtUtc: '2026-04-18T12:00:00.000Z',
    stacks: [
      {
        slug: 'front-end',
        namePt: 'Front-End',
        nameEn: 'Front-End',
        projectCount: 8,
        technologyCount: 18,
      },
      {
        slug: 'backend',
        namePt: 'Back-End',
        nameEn: 'Back-End',
        projectCount: 5,
        technologyCount: 9,
      },
      {
        slug: 'devops',
        namePt: 'DevOps',
        nameEn: 'DevOps',
        projectCount: 3,
        technologyCount: 6,
      },
      {
        slug: 'mobile',
        namePt: 'Mobile',
        nameEn: 'Mobile',
        projectCount: 2,
        technologyCount: 4,
      },
    ],
  },
  projectContexts: {
    generatedAtUtc: '2026-04-18T12:00:00.000Z',
    totalProjects: 12,
    featuredProjects: 3,
    highlightedProjects: 5,
    contexts: [
      {
        key: 'DASHBOARD',
        count: 4,
      },
      {
        key: 'ADMIN',
        count: 3,
      },
    ],
    environments: [
      {
        key: 'WEB',
        count: 9,
      },
      {
        key: 'MOBILE',
        count: 2,
      },
    ],
  },
  technologyUsage: {
    generatedAtUtc: '2026-04-18T12:00:00.000Z',
    totalUsageLinks: 48,
    levels: [
      {
        key: 'ADVANCED',
        count: 14,
      },
    ],
    frequencies: [
      {
        key: 'DAILY',
        count: 12,
      },
    ],
    contexts: [
      {
        key: 'PROJECT',
        count: 27,
      },
    ],
    sources: [
      {
        key: 'EXPERIENCE',
        count: 19,
      },
    ],
    topTechnologies: [
      {
        slug: 'angular',
        name: 'Angular',
        category: 'FRAMEWORK',
        usageCount: 10,
      },
      {
        slug: 'typescript',
        name: 'TypeScript',
        category: 'LANGUAGE',
        usageCount: 9,
      },
      {
        slug: 'rxjs',
        name: 'RxJS',
        category: 'LIBRARY',
        usageCount: 7,
      },
      {
        slug: 'nestjs',
        name: 'NestJS',
        category: 'FRAMEWORK',
        usageCount: 6,
      },
      {
        slug: 'prisma',
        name: 'Prisma',
        category: 'ORM',
        usageCount: 5,
      },
      {
        slug: 'postgresql',
        name: 'PostgreSQL',
        category: 'DATABASE',
        usageCount: 4,
      },
    ],
  },
  professionalTimeline: {
    generatedAtUtc: '2026-04-18T12:00:00.000Z',
    totalItems: 1,
    items: [
      {
        slug: 'pagbank',
        companyName: 'PagBank',
        titlePt: 'Engenheiro de Software',
        titleEn: 'Software Engineer',
        startDate: '2023-01-01',
        endDate: null,
        isCurrent: true,
        highlight: true,
        jobs: ['Frontend Engineer'],
        customers: ['PagBank', 'Stone'],
        projects: ['portfolio-remake', 'admin-dashboard'],
        technologies: ['Angular', 'TypeScript', 'Design Systems', 'NestJS'],
        imagePath: '/assets/img/experiences/pagbank.png',
      },
    ],
  },
  highlights: {
    generatedAtUtc: '2026-04-18T12:00:00.000Z',
    totalItems: 2,
    items: [
      {
        entity: 'project',
        slug: 'portfolio-remake',
        titlePt: 'Remake do Portfólio',
        titleEn: 'Portfolio Remake',
        subtitlePt: 'Projeto full stack conectado a API real.',
        subtitleEn: 'Full stack project connected to a real API.',
        icon: '/assets/img/logo/angular.svg',
        imagePath: '/assets/img/projects/portfolio-remake.png',
        featured: true,
      },
      {
        entity: 'technology',
        slug: 'typescript',
        titlePt: 'TypeScript',
        titleEn: 'TypeScript',
        subtitlePt: 'Baseando componentes, contratos e integrações.',
        subtitleEn: 'Powering components, contracts, and integrations.',
        icon: '/assets/img/skills/typescript.svg',
        featured: false,
      },
    ],
  },
  ...overrides,
});

export const createDashboardServiceMock = (
  responseOverrides: Partial<DashboardOverviewResponse> = {},
): Pick<DashboardService, 'getOverview'> => ({
  getOverview: () => of(createDashboardOverviewResponse(responseOverrides)),
});
