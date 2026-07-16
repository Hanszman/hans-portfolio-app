import { LinkRecord } from '../../../../../core/api/admin/links/links-operations.types';
import { ExperienceCollectionItemResponse } from '../../../../../core/api/experiences/experiences.types';
import { ProjectCollectionItemResponse } from '../../../../../core/api/projects/projects.types';
import { TechnologyCollectionItemResponse } from '../../../../../core/api/technologies/technologies.types';
import {
  buildLinkCatalogOptions,
  buildLinksFormValue,
  buildLinksMutationPayload,
  buildLinksViewModels,
  normalizeLinkExperienceIds,
  normalizeLinkFormationIds,
  normalizeLinkProjectIds,
  normalizeLinkTechnologyIds,
} from './links-operations.helper';

const createProject = (
  overrides: Partial<ProjectCollectionItemResponse> = {},
): ProjectCollectionItemResponse => ({
  id: 'project-1',
  slug: 'portfolio-remake',
  titlePt: 'Portfolio remake',
  titleEn: 'Portfolio remake',
  shortDescriptionPt: 'Resumo',
  shortDescriptionEn: 'Summary',
  fullDescriptionPt: 'Descricao',
  fullDescriptionEn: 'Description',
  context: 'personal',
  status: 'in-progress',
  environment: 'fullstack',
  featured: true,
  highlight: true,
  startDate: '2024-01-01',
  endDate: null,
  sortOrder: 1,
  isPublished: true,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  technologies: [],
  experiences: [],
  tags: [],
  links: [],
  imageAssets: [],
  ...overrides,
});

const createExperience = (
  overrides: Partial<ExperienceCollectionItemResponse> = {},
): ExperienceCollectionItemResponse => ({
  id: 'experience-1',
  slug: 'stefanini-ford',
  companyName: 'Stefanini Ford',
  titlePt: 'Analista',
  titleEn: 'Analyst',
  summaryPt: 'Resumo',
  summaryEn: 'Summary',
  descriptionPt: 'Descricao',
  descriptionEn: 'Description',
  startDate: '2024-01-01',
  endDate: null,
  isCurrent: true,
  highlight: true,
  sortOrder: 1,
  isPublished: true,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  technologies: [],
  projects: [],
  customers: [],
  jobs: [],
  links: [],
  imageAssets: [],
  ...overrides,
});

const createTechnology = (
  overrides: Partial<TechnologyCollectionItemResponse> = {},
): TechnologyCollectionItemResponse => ({
  id: 'technology-1',
  slug: 'angular',
  name: 'Angular',
  category: 'framework',
  level: 'advanced',
  frequency: 'frequent',
  highlight: true,
  ...overrides,
});

const createLink = (overrides: Partial<LinkRecord> = {}): LinkRecord => ({
  id: 'link-1',
  url: 'https://github.com/vh/portfolio',
  labelPt: 'Repositorio',
  labelEn: 'Repository',
  descriptionPt: 'Codigo fonte',
  descriptionEn: 'Source code',
  type: 'GITHUB',
  sortOrder: 2,
  isPublished: true,
  projectIds: ['project-2'],
  experienceIds: ['experience-2'],
  technologyIds: ['technology-2'],
  formationIds: ['formation-2'],
  projects: [
    {
      projectId: 'project-3',
      project: {
        id: 'project-3',
        slug: 'dashboard-suite',
        titlePt: 'Dashboard suite',
      },
    },
  ],
  experiences: [
    {
      experienceId: 'experience-3',
      experience: {
        id: 'experience-3',
        slug: 'outsourcing',
        titlePt: 'Tech lead',
        companyName: 'Outsourcing',
      },
    },
  ],
  technologies: [
    {
      technologyId: 'technology-3',
      technology: {
        id: 'technology-3',
        slug: 'nestjs',
        name: 'NestJS',
      },
    },
  ],
  formations: [
    {
      formationId: 'formation-3',
      formation: {
        id: 'formation-3',
        slug: 'puc',
        namePt: 'PUC',
      },
    },
  ],
  ...overrides,
});

describe('links helper', () => {
  it('should sort the catalog options by title', () => {
    const options = buildLinkCatalogOptions([
      createTechnology({
        id: 'technology-2',
        name: 'React',
        slug: 'react',
      }),
      createProject({
        id: 'project-2',
        titlePt: 'Admin workspace',
        slug: 'admin-workspace',
      }),
    ]);

    expect(options).toEqual([
      {
        id: 'project-2',
        title: 'Admin workspace',
        subtitle: 'admin-workspace',
      },
      {
        id: 'technology-2',
        title: 'React',
        subtitle: 'react',
      },
    ]);
  });

  it('should normalize relations from explicit ids, nested records and the public project catalog', () => {
    expect(
      normalizeLinkProjectIds(
        createLink(),
        [
          createProject({
            id: 'project-1',
            links: [
              {
                projectId: 'project-1',
                linkId: 'another-link',
                sortOrder: 1,
                link: {
                  id: 'another-link',
                  url: 'https://github.com/vh/portfolio',
                  labelPt: null,
                  labelEn: null,
                  descriptionPt: null,
                  descriptionEn: null,
                  type: 'GITHUB',
                  sortOrder: 1,
                  isPublished: true,
                  createdAt: '2024-01-01T00:00:00.000Z',
                  updatedAt: '2024-01-01T00:00:00.000Z',
                },
              },
            ],
          }),
        ],
      ),
    ).toEqual(['project-2', 'project-3', 'project-1']);

    expect(normalizeLinkExperienceIds(createLink())).toEqual([
      'experience-2',
      'experience-3',
    ]);
    expect(normalizeLinkTechnologyIds(createLink())).toEqual([
      'technology-2',
      'technology-3',
    ]);
    expect(normalizeLinkFormationIds(createLink())).toEqual([
      'formation-2',
      'formation-3',
    ]);
  });

  it('should normalize relation ids from nested records and ignore empty fallback relations', () => {
    expect(
      normalizeLinkProjectIds(
        createLink({
          projectIds: undefined,
          projects: [{ project: { id: 'project-nested', slug: 'nested', titlePt: 'Nested' } }, {}],
        }),
        [],
      ),
    ).toEqual(['project-nested']);

    expect(
      normalizeLinkExperienceIds(
        createLink({
          experienceIds: undefined,
          experiences: [
            {
              experience: {
                id: 'experience-nested',
                slug: 'nested',
                titlePt: 'Nested experience',
                companyName: 'Nested company',
              },
            },
            {},
          ],
        }),
      ),
    ).toEqual(['experience-nested']);

    expect(
      normalizeLinkTechnologyIds(
        createLink({
          technologyIds: undefined,
          technologies: [{ technology: { id: 'technology-nested', slug: 'nested', name: 'Nested tech' } }, {}],
        }),
      ),
    ).toEqual(['technology-nested']);

    expect(
      normalizeLinkFormationIds(
        createLink({
          formationIds: undefined,
          formations: [{ formation: { id: 'formation-nested', slug: 'nested', namePt: 'Nested formation' } }, {}],
        }),
      ),
    ).toEqual(['formation-nested']);
  });

  it('should build an empty form when no link is selected', () => {
    expect(buildLinksFormValue(undefined, [])).toEqual({
      url: '',
      labelPt: '',
      labelEn: '',
      descriptionPt: '',
      descriptionEn: '',
      type: '',
      sortOrder: '0',
      isPublished: true,
      projectIds: [],
      experienceIds: [],
      technologyIds: [],
      formationIds: [],
    });
  });

  it('should map a selected link into the form model', () => {
    expect(buildLinksFormValue(createLink(), [])).toEqual({
      url: 'https://github.com/vh/portfolio',
      labelPt: 'Repositorio',
      labelEn: 'Repository',
      descriptionPt: 'Codigo fonte',
      descriptionEn: 'Source code',
      type: 'GITHUB',
      sortOrder: '2',
      isPublished: true,
      projectIds: ['project-2', 'project-3'],
      experienceIds: ['experience-2', 'experience-3'],
      technologyIds: ['technology-2', 'technology-3'],
      formationIds: ['formation-2', 'formation-3'],
    });
  });

  it('should gracefully map nullish optional relation collections and fallback flags', () => {
    expect(
      buildLinksFormValue(
        createLink({
          labelPt: null,
          labelEn: null,
          descriptionPt: null,
          descriptionEn: null,
          type: null,
          sortOrder: null,
          isPublished: null,
          projectIds: undefined,
          experienceIds: undefined,
          technologyIds: undefined,
          formationIds: undefined,
          projects: undefined,
          experiences: undefined,
          technologies: undefined,
          formations: undefined,
        }),
        [],
      ),
    ).toEqual({
      url: 'https://github.com/vh/portfolio',
      labelPt: '',
      labelEn: '',
      descriptionPt: '',
      descriptionEn: '',
      type: '',
      sortOrder: '0',
      isPublished: true,
      projectIds: [],
      experienceIds: [],
      technologyIds: [],
      formationIds: [],
    });
  });

  it('should build sorted link view-models with resolved labels', () => {
    const viewModels = buildLinksViewModels(
      [
        createLink({
          id: 'link-2',
          url: 'https://example.com/demo',
          labelPt: 'Demo',
          labelEn: 'Demo',
          type: 'DEPLOY',
          sortOrder: 3,
          projectIds: ['project-1'],
          experienceIds: ['experience-1'],
          technologyIds: ['technology-1'],
          formationIds: ['formation-1'],
        }),
        createLink({
          id: 'link-1',
          sortOrder: 1,
        }),
      ],
      [
        createProject(),
        createProject({
          id: 'project-2',
          titlePt: 'Admin workspace',
          slug: 'admin-workspace',
        }),
        createProject({
          id: 'project-3',
          titlePt: 'Dashboard suite',
          slug: 'dashboard-suite',
        }),
      ],
      [
        createExperience(),
        createExperience({
          id: 'experience-2',
          titlePt: 'Arquiteto',
          companyName: 'Stefanini',
        }),
        createExperience({
          id: 'experience-3',
          titlePt: 'Tech lead',
          companyName: 'Outsourcing',
        }),
      ],
      [
        createTechnology(),
        createTechnology({
          id: 'technology-2',
          name: 'React',
          slug: 'react',
        }),
        createTechnology({
          id: 'technology-3',
          name: 'NestJS',
          slug: 'nestjs',
        }),
      ],
    );

    expect(viewModels.map((viewModel) => viewModel.url)).toEqual([
      'https://github.com/vh/portfolio',
      'https://example.com/demo',
    ]);
    expect(viewModels[0].projectLabels).toEqual([
      'Admin workspace',
      'Dashboard suite',
    ]);
    expect(viewModels[0].experienceLabels).toEqual([
      'Arquiteto (Stefanini)',
      'Tech lead (Outsourcing)',
    ]);
    expect(viewModels[0].technologyLabels).toEqual(['React', 'NestJS']);
    expect(viewModels[0].formationLabels).toEqual(['formation-2', 'formation-3']);
  });

  it('should fallback to raw ids and default values when linked catalogs or optional fields are missing', () => {
    const viewModels = buildLinksViewModels(
      [
        createLink({
          id: 'link-fallback',
          url: 'https://fallback.dev',
          labelPt: null,
          labelEn: null,
          descriptionPt: null,
          descriptionEn: null,
          type: null,
          sortOrder: null,
          isPublished: null,
          projectIds: ['project-missing'],
          experienceIds: ['experience-missing'],
          technologyIds: ['technology-missing'],
          formationIds: ['formation-missing'],
          projects: undefined,
          experiences: undefined,
          technologies: undefined,
          formations: undefined,
        }),
        createLink({
          id: 'link-default-sort',
          url: 'https://zzz.dev',
          sortOrder: null,
          projectIds: undefined,
          experienceIds: undefined,
          technologyIds: undefined,
          formationIds: undefined,
          projects: undefined,
          experiences: undefined,
          technologies: undefined,
          formations: undefined,
        }),
      ],
      [],
      [],
      [],
    );

    expect(viewModels.map((viewModel) => viewModel.url)).toEqual([
      'https://fallback.dev',
      'https://zzz.dev',
    ]);
    expect(viewModels[0]).toEqual(
      jasmine.objectContaining({
        labelPt: '',
        labelEn: '',
        descriptionPt: '',
        descriptionEn: '',
        type: '',
        sortOrderLabel: '0',
        isPublished: true,
        projectLabels: ['project-missing'],
        experienceLabels: ['experience-missing'],
        technologyLabels: ['technology-missing'],
        formationLabels: ['formation-missing'],
      }),
    );
  });

  it('should use the url as the tie-breaker when sort orders are equal', () => {
    const viewModels = buildLinksViewModels(
      [
        createLink({
          id: 'link-2',
          url: 'https://zeta.dev',
          projectIds: undefined,
          experienceIds: undefined,
          technologyIds: undefined,
          formationIds: undefined,
          projects: undefined,
          experiences: undefined,
          technologies: undefined,
          formations: undefined,
          sortOrder: 1,
        }),
        createLink({
          id: 'link-1',
          url: 'https://alpha.dev',
          projectIds: undefined,
          experienceIds: undefined,
          technologyIds: undefined,
          formationIds: undefined,
          projects: undefined,
          experiences: undefined,
          technologies: undefined,
          formations: undefined,
          sortOrder: 1,
          type: null,
        }),
      ],
      [],
      [],
      [],
    );

    expect(viewModels.map((viewModel) => viewModel.url)).toEqual([
      'https://alpha.dev',
      'https://zeta.dev',
    ]);
    expect(viewModels[0].type).toBe('');
  });

  it('should build a valid mutation payload with deduplicated relations', () => {
    expect(
      buildLinksMutationPayload({
        url: ' https://github.com/vh/portfolio ',
        labelPt: ' Repositorio ',
        labelEn: ' Repository ',
        descriptionPt: ' Codigo fonte ',
        descriptionEn: ' Source code ',
        type: 'github',
        sortOrder: '5',
        isPublished: true,
        projectIds: ['project-1', 'project-1'],
        experienceIds: ['experience-1', 'experience-1'],
        technologyIds: ['technology-1', 'technology-1'],
        formationIds: ['formation-1', 'formation-1'],
      }),
    ).toEqual({
      isValid: true,
      payload: {
        url: 'https://github.com/vh/portfolio',
        labelPt: 'Repositorio',
        labelEn: 'Repository',
        descriptionPt: 'Codigo fonte',
        descriptionEn: 'Source code',
        type: 'GITHUB',
        sortOrder: 5,
        isPublished: true,
        projectIds: ['project-1'],
        experienceIds: ['experience-1'],
        technologyIds: ['technology-1'],
        formationIds: ['formation-1'],
      },
    });
  });

  it('should reject invalid mutation forms with the matching translation key', () => {
    expect(
      buildLinksMutationPayload({
        url: '',
        labelPt: '',
        labelEn: '',
        descriptionPt: '',
        descriptionEn: '',
        type: '',
        sortOrder: 'abc',
        isPublished: true,
        projectIds: [],
        experienceIds: [],
        technologyIds: [],
        formationIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.links.feedback.requiredUrl',
    });

    expect(
      buildLinksMutationPayload({
        url: 'https://github.com/vh/portfolio',
        labelPt: '',
        labelEn: '',
        descriptionPt: '',
        descriptionEn: '',
        type: '',
        sortOrder: 'abc',
        isPublished: true,
        projectIds: [],
        experienceIds: [],
        technologyIds: [],
        formationIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.links.feedback.requiredType',
    });

    expect(
      buildLinksMutationPayload({
        url: 'https://github.com/vh/portfolio',
        labelPt: '',
        labelEn: '',
        descriptionPt: '',
        descriptionEn: '',
        type: 'GITHUB',
        sortOrder: 'abc',
        isPublished: true,
        projectIds: [],
        experienceIds: [],
        technologyIds: [],
        formationIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.links.feedback.invalidSortOrder',
    });
  });
});
