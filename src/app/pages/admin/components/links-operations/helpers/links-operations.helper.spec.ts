import { LinkRecord } from '../../../../../core/api/links/links.types';
import { ProjectCollectionItemResponse } from '../../../../../core/api/projects/projects.types';
import {
  buildLinkCatalogOptions,
  buildLinksFormValue,
  buildLinksMutationPayload,
  buildLinksViewModels,
  normalizeLinkProjectIds,
} from './links-operations.helper';

const createProject = (
  overrides: Partial<ProjectCollectionItemResponse> = {},
): ProjectCollectionItemResponse => ({
  id: 'project-1',
  slug: 'portfolio-remake',
  titlePt: 'Portfolio remake',
  titleEn: 'Portfolio remake',
  titleEs: 'Portfolio remake',
  summaryPt: 'Resumo',
  summaryEn: 'Summary',
  summaryEs: 'Summary',
  descriptionPt: 'Descricao',
  descriptionEn: 'Description',
  descriptionEs: 'Description',
  context: 'personal',
  status: 'in-progress',
  environment: 'fullstack',
  featured: true,
  highlight: true,
  startDate: '2024-01-01',
  endDate: null,
  sortOrder: 1,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  technologies: [],
  experiences: [],
  links: [],
  imageAssets: [],
  ...overrides,
});

const createLink = (overrides: Partial<LinkRecord> = {}): LinkRecord => ({
  id: 'link-1',
  url: 'https://github.com/vh/portfolio',
  labelPt: 'Repositorio',
  labelEn: 'Repository',
  labelEs: 'Repository',
  descriptionPt: 'Codigo fonte',
  descriptionEn: 'Source code',
  descriptionEs: 'Source code',
  type: 'GITHUB',
  sortOrder: 2,
  projectIds: ['project-2'],
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
  ...overrides,
});

describe('links helper', () => {
  it('should sort the catalog options by title', () => {
    const options = buildLinkCatalogOptions([
      createProject({
        id: 'project-2',
        titlePt: 'Zebra project',
        slug: 'zebra',
      }),
      createProject({
        id: 'project-1',
        titlePt: 'Admin workspace',
        slug: 'admin-workspace',
      }),
    ]);

    expect(options).toEqual([
      {
        id: 'project-1',
        title: 'Admin workspace',
        subtitle: 'admin-workspace',
      },
      {
        id: 'project-2',
        title: 'Zebra project',
        subtitle: 'zebra',
      },
    ]);
  });

  it('should normalize relations from explicit ids, nested records and the public project catalog', () => {
    expect(
      normalizeLinkProjectIds(createLink(), [
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
                labelEs: null,
                descriptionPt: null,
                descriptionEn: null,
                descriptionEs: null,
                type: 'GITHUB',
                sortOrder: 1,
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z',
              },
            },
          ],
        }),
      ]),
    ).toEqual(['project-2', 'project-3', 'project-1']);
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
  });

  it('should build an empty form when no link is selected', () => {
    expect(buildLinksFormValue(undefined, [])).toEqual({
      url: '',
      labelPt: '',
      labelEn: '',
      labelEs: '',
      descriptionPt: '',
      descriptionEn: '',
      descriptionEs: '',
      type: '',
      sortOrder: '0',
      projectIds: [],
    });
  });

  it('should map a selected link into the form model', () => {
    expect(buildLinksFormValue(createLink(), [])).toEqual({
      url: 'https://github.com/vh/portfolio',
      labelPt: 'Repositorio',
      labelEn: 'Repository',
      labelEs: 'Repository',
      descriptionPt: 'Codigo fonte',
      descriptionEn: 'Source code',
      descriptionEs: 'Source code',
      type: 'GITHUB',
      sortOrder: '2',
      projectIds: ['project-2', 'project-3'],
    });
  });

  it('should gracefully map nullish optional relation collections and fallback flags', () => {
    expect(
      buildLinksFormValue(
        createLink({
          labelPt: null,
          labelEn: null,
          labelEs: null,
          descriptionPt: null,
          descriptionEn: null,
          descriptionEs: null,
          type: null,
          sortOrder: null,
          projectIds: undefined,
          projects: undefined,
        }),
        [],
      ),
    ).toEqual({
      url: 'https://github.com/vh/portfolio',
      labelPt: '',
      labelEn: '',
      labelEs: '',
      descriptionPt: '',
      descriptionEn: '',
      descriptionEs: '',
      type: '',
      sortOrder: '0',
      projectIds: [],
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
          labelEs: 'Demo',
          type: 'DEPLOY',
          sortOrder: 3,
          projectIds: ['project-1'],
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
    );

    expect(viewModels.map((viewModel) => viewModel.url)).toEqual([
      'https://github.com/vh/portfolio',
      'https://example.com/demo',
    ]);
    expect(viewModels[0].projectLabels).toEqual(['Admin workspace', 'Dashboard suite']);
  });

  it('should fallback to raw ids and default values when linked catalogs or optional fields are missing', () => {
    const viewModels = buildLinksViewModels(
      [
        createLink({
          id: 'link-fallback',
          url: 'https://fallback.dev',
          labelPt: null,
          labelEn: null,
          labelEs: null,
          descriptionPt: null,
          descriptionEn: null,
          descriptionEs: null,
          type: null,
          sortOrder: null,
          projectIds: ['project-missing'],
          projects: undefined,
        }),
        createLink({
          id: 'link-default-sort',
          url: 'https://zzz.dev',
          sortOrder: null,
          projectIds: undefined,
          projects: undefined,
        }),
      ],
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
        labelEs: '',
        descriptionPt: '',
        descriptionEn: '',
        descriptionEs: '',
        type: '',
        sortOrderLabel: '0',
        projectLabels: ['project-missing'],
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
          projects: undefined,
          sortOrder: 1,
        }),
        createLink({
          id: 'link-1',
          url: 'https://alpha.dev',
          projectIds: undefined,
          projects: undefined,
          sortOrder: 1,
          type: null,
        }),
      ],
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
        projectIds: ['project-1', 'project-1'],
      }),
    ).toEqual({
      isValid: true,
      payload: {
        url: 'https://github.com/vh/portfolio',
        labelPt: 'Repositorio',
        labelEn: 'Repository',
        labelEs: 'Repository',
        descriptionPt: 'Codigo fonte',
        descriptionEn: 'Source code',
        descriptionEs: '',
        type: 'GITHUB',
        sortOrder: 5,
        projectIds: ['project-1'],
      },
    });
  });

  it('should reject invalid mutation forms with the matching translation key', () => {
    expect(
      buildLinksMutationPayload({
        url: '',
        labelPt: 'Portfolio',
        labelEn: 'Portfolio',
        labelEs: 'Portfolio',
        descriptionPt: '',
        descriptionEn: '',
        descriptionEs: '',
        type: '',
        sortOrder: 'abc',
        projectIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.links.feedback.requiredUrl',
    });

    const validBase = {
      url: 'https://github.com/vh/portfolio',
      labelPt: 'Portfolio',
      labelEn: 'Portfolio',
      labelEs: 'Portafolio',
      descriptionPt: '',
      descriptionEn: '',
      descriptionEs: '',
      type: 'GITHUB',
      sortOrder: '1',
      projectIds: [],
    };

    expect(buildLinksMutationPayload({ ...validBase, labelPt: '' })).toEqual({
      isValid: false,
      errorKey: 'pages.admin.links.feedback.requiredLabelPt',
    });
    expect(buildLinksMutationPayload({ ...validBase, labelEn: '' })).toEqual({
      isValid: false,
      errorKey: 'pages.admin.links.feedback.requiredLabelEn',
    });
    expect(buildLinksMutationPayload({ ...validBase, labelEs: '' })).toEqual({
      isValid: false,
      errorKey: 'pages.admin.links.feedback.requiredLabelEs',
    });

    expect(
      buildLinksMutationPayload({
        url: 'https://github.com/vh/portfolio',
        labelPt: 'Portfolio',
        labelEn: 'Portfolio',
        labelEs: 'Portfolio',
        descriptionPt: '',
        descriptionEn: '',
        descriptionEs: '',
        type: '',
        sortOrder: 'abc',
        projectIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.links.feedback.requiredType',
    });

    expect(
      buildLinksMutationPayload({
        url: 'https://github.com/vh/portfolio',
        labelPt: 'Portfolio',
        labelEn: 'Portfolio',
        labelEs: 'Portfolio',
        descriptionPt: '',
        descriptionEn: '',
        descriptionEs: '',
        type: 'INVALID',
        sortOrder: 'abc',
        projectIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.links.feedback.invalidType',
    });

    expect(
      buildLinksMutationPayload({
        url: 'https://github.com/vh/portfolio',
        labelPt: 'Portfolio',
        labelEn: 'Portfolio',
        labelEs: 'Portfolio',
        descriptionPt: '',
        descriptionEn: '',
        descriptionEs: '',
        type: 'GITHUB',
        sortOrder: 'abc',
        projectIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'common.feedback.invalidIntegerSortOrder',
    });
  });
});
