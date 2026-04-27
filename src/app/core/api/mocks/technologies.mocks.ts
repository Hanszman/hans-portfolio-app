import { of } from 'rxjs';
import { TechnologiesService } from '../technologies/technologies.service';
import { TechnologiesCollectionResponse } from '../technologies/technologies.types';

export const createTechnologiesCollectionResponse = (
  overrides: Partial<TechnologiesCollectionResponse> = {},
): TechnologiesCollectionResponse => ({
  data: [
    {
      id: 'tech-angular',
      slug: 'angular',
      name: 'Angular',
      category: 'FRAMEWORK',
      level: 'ADVANCED',
      frequency: 'FREQUENT',
      highlight: true,
      technologyContexts: [
        {
          id: 'context-angular-professional',
          context: 'PROFESSIONAL',
          startedAt: '2020-01-01',
          endedAt: null,
        },
        {
          id: 'context-angular-study',
          context: 'STUDY',
          startedAt: '2019-01-01',
          endedAt: '2019-12-01',
        },
      ],
      imageAssets: [
        {
          imageAsset: {
            filePath: '/assets/img/skills/angular.png',
            kind: 'ICON',
            altPt: 'Logo Angular',
            altEn: 'Angular logo',
          },
        },
      ],
      experienceMetrics: {
        total: {
          totalMonths: 74,
          years: 6,
          months: 2,
          label: '6 years 2 months',
          startedAt: '2019-01-01',
          endedAt: null,
        },
        byContext: {
          PROFESSIONAL: {
            totalMonths: 64,
            years: 5,
            months: 4,
            label: '5 years 4 months',
            startedAt: '2020-01-01',
            endedAt: null,
          },
          PERSONAL: {
            totalMonths: 0,
            years: 0,
            months: 0,
            label: '0 months',
            startedAt: null,
            endedAt: null,
          },
          ACADEMIC: {
            totalMonths: 0,
            years: 0,
            months: 0,
            label: '0 months',
            startedAt: null,
            endedAt: null,
          },
          STUDY: {
            totalMonths: 10,
            years: 0,
            months: 10,
            label: '10 months',
            startedAt: '2019-01-01',
            endedAt: '2019-12-01',
          },
        },
      },
    },
    {
      id: 'tech-typescript',
      slug: 'typescript',
      name: 'TypeScript',
      category: 'LANGUAGE',
      level: 'ADVANCED',
      frequency: 'FREQUENT',
      highlight: true,
      technologyContexts: [
        {
          id: 'context-typescript-professional',
          context: 'PROFESSIONAL',
          startedAt: '2020-01-01',
          endedAt: null,
        },
        {
          id: 'context-typescript-personal',
          context: 'PERSONAL',
          startedAt: '2024-05-01',
          endedAt: null,
        },
      ],
      imageAssets: [
        {
          imageAsset: {
            filePath: '/assets/img/skills/typescript.png',
            kind: 'ICON',
            altPt: 'Logo TypeScript',
            altEn: 'TypeScript logo',
          },
        },
      ],
      experienceMetrics: {
        total: {
          totalMonths: 64,
          years: 5,
          months: 4,
          label: '5 years 4 months',
          startedAt: '2020-01-01',
          endedAt: null,
        },
        byContext: {
          PROFESSIONAL: {
            totalMonths: 52,
            years: 4,
            months: 4,
            label: '4 years 4 months',
            startedAt: '2020-01-01',
            endedAt: '2024-04-01',
          },
          PERSONAL: {
            totalMonths: 12,
            years: 1,
            months: 0,
            label: '1 year',
            startedAt: '2024-05-01',
            endedAt: null,
          },
          ACADEMIC: {
            totalMonths: 0,
            years: 0,
            months: 0,
            label: '0 months',
            startedAt: null,
            endedAt: null,
          },
          STUDY: {
            totalMonths: 0,
            years: 0,
            months: 0,
            label: '0 months',
            startedAt: null,
            endedAt: null,
          },
        },
      },
    },
    {
      id: 'tech-docker',
      slug: 'docker',
      name: 'Docker',
      category: 'DEVOPS',
      level: 'INTERMEDIATE',
      frequency: 'OCCASIONAL',
      highlight: false,
      technologyContexts: [
        {
          id: 'context-docker-study',
          context: 'STUDY',
          startedAt: '2023-01-01',
          endedAt: '2024-06-01',
        },
      ],
      imageAssets: [
        {
          imageAsset: {
            filePath: '/assets/img/skills/docker.png',
            kind: 'ICON',
            altPt: 'Logo Docker',
            altEn: 'Docker logo',
          },
        },
      ],
      experienceMetrics: {
        total: {
          totalMonths: 17,
          years: 1,
          months: 5,
          label: '1 year 5 months',
          startedAt: '2023-01-01',
          endedAt: '2024-06-01',
        },
        byContext: {
          PROFESSIONAL: {
            totalMonths: 0,
            years: 0,
            months: 0,
            label: '0 months',
            startedAt: null,
            endedAt: null,
          },
          PERSONAL: {
            totalMonths: 0,
            years: 0,
            months: 0,
            label: '0 months',
            startedAt: null,
            endedAt: null,
          },
          ACADEMIC: {
            totalMonths: 0,
            years: 0,
            months: 0,
            label: '0 months',
            startedAt: null,
            endedAt: null,
          },
          STUDY: {
            totalMonths: 17,
            years: 1,
            months: 5,
            label: '1 year 5 months',
            startedAt: '2023-01-01',
            endedAt: '2024-06-01',
          },
        },
      },
    },
    {
      id: 'tech-sql',
      slug: 'sql',
      name: 'SQL',
      category: 'DATABASE',
      level: 'INTERMEDIATE',
      frequency: 'FREQUENT',
      highlight: false,
      technologyContexts: [
        {
          id: 'context-sql-professional',
          context: 'PROFESSIONAL',
          startedAt: '2018-01-01',
          endedAt: '2021-12-01',
        },
        {
          id: 'context-sql-academic',
          context: 'ACADEMIC',
          startedAt: '2017-01-01',
          endedAt: '2017-12-01',
        },
      ],
      experienceMetrics: {
        total: {
          totalMonths: 59,
          years: 4,
          months: 11,
          label: '4 years 11 months',
          startedAt: '2017-01-01',
          endedAt: '2021-12-01',
        },
        byContext: {
          PROFESSIONAL: {
            totalMonths: 48,
            years: 4,
            months: 0,
            label: '4 years',
            startedAt: '2018-01-01',
            endedAt: '2021-12-01',
          },
          PERSONAL: {
            totalMonths: 0,
            years: 0,
            months: 0,
            label: '0 months',
            startedAt: null,
            endedAt: null,
          },
          ACADEMIC: {
            totalMonths: 11,
            years: 0,
            months: 11,
            label: '11 months',
            startedAt: '2017-01-01',
            endedAt: '2017-12-01',
          },
          STUDY: {
            totalMonths: 0,
            years: 0,
            months: 0,
            label: '0 months',
            startedAt: null,
            endedAt: null,
          },
        },
      },
    },
  ],
  pagination: {
    page: 1,
    pageSize: 100,
    totalItems: 4,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  },
  ...overrides,
});

export const createTechnologiesServiceMock = (
  responseOverrides: Partial<TechnologiesCollectionResponse> = {},
): Pick<TechnologiesService, 'getTechnologies'> => ({
  getTechnologies: () => of(createTechnologiesCollectionResponse(responseOverrides)),
});
