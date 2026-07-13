import { ProjectCollectionItemResponse } from '../../../../../core/api/projects/projects.types';
import { TechnologyCollectionItemResponse } from '../../../../../core/api/technologies/technologies.types';
import { TagRecord } from '../../../../../core/api/admin/tags/tags-operations.types';
import {
  buildTagCatalogOptions,
  buildTagsFormValue,
  buildTagsMutationPayload,
  buildTagsViewModels,
  normalizeTagProjectIds,
  normalizeTagTechnologyIds,
} from './tags-operations.helper';

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

const createTag = (
  overrides: Partial<TagRecord> = {},
): TagRecord => ({
  id: 'tag-1',
  slug: 'frontend',
  namePt: 'Front-end',
  nameEn: 'Front-end',
  type: 'STACK',
  sortOrder: 2,
  projectIds: ['project-2'],
  technologyIds: ['technology-2'],
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
  ...overrides,
});

describe('tags helper', () => {
  it('should sort the catalog options by title', () => {
    const options = buildTagCatalogOptions([
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

  it('should normalize project relations from explicit ids, nested relations and the public project catalog', () => {
    const projectIds = normalizeTagProjectIds(
      createTag({
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
      }),
      [
        createProject({
          id: 'project-1',
          titlePt: 'Portfolio remake',
          tags: [
            {
              projectId: 'project-1',
              tagId: 'another-tag-id',
              sortOrder: 1,
              tag: {
                id: 'another-tag-id',
                slug: 'frontend',
                labelPt: 'Front-end',
                labelEn: 'Front-end',
                color: null,
                sortOrder: 1,
                isPublished: true,
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z',
              },
            },
          ],
        }),
      ],
    );

    expect(projectIds).toEqual(['project-2', 'project-3', 'project-1']);
  });

  it('should normalize technology relations from explicit ids and nested relations', () => {
    expect(normalizeTagTechnologyIds(createTag())).toEqual([
      'technology-2',
      'technology-3',
    ]);
  });

  it('should build an empty form when no tag is selected', () => {
    expect(buildTagsFormValue(undefined, [])).toEqual({
      slug: '',
      namePt: '',
      nameEn: '',
      type: '',
      sortOrder: '0',
      projectIds: [],
      technologyIds: [],
    });
  });

  it('should map a selected tag into the form model', () => {
    expect(buildTagsFormValue(createTag(), [])).toEqual({
      slug: 'frontend',
      namePt: 'Front-end',
      nameEn: 'Front-end',
      type: 'STACK',
      sortOrder: '2',
      projectIds: ['project-2', 'project-3'],
      technologyIds: ['technology-2', 'technology-3'],
    });
  });

  it('should gracefully map nullish optional relation collections and fallback scalar fields', () => {
    expect(
      buildTagsFormValue(
        createTag({
          projectIds: undefined,
          technologyIds: undefined,
          projects: undefined,
          technologies: undefined,
          type: null,
          sortOrder: null,
        }),
        [],
      ),
    ).toEqual({
      slug: 'frontend',
      namePt: 'Front-end',
      nameEn: 'Front-end',
      type: '',
      sortOrder: '0',
      projectIds: [],
      technologyIds: [],
    });
  });

  it('should build sorted tag view-models with resolved labels', () => {
    const viewModels = buildTagsViewModels(
      [
        createTag({
          id: 'tag-2',
          slug: 'backend',
          namePt: 'Back-end',
          nameEn: 'Back-end',
          sortOrder: 3,
          projectIds: ['project-1'],
          technologyIds: ['technology-1'],
        }),
        createTag({
          id: 'tag-1',
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

    expect(viewModels.map((viewModel) => viewModel.slug)).toEqual([
      'frontend',
      'backend',
    ]);
    expect(viewModels[0].projectLabels).toEqual([
      'Admin workspace',
      'Dashboard suite',
    ]);
    expect(viewModels[0].technologyLabels).toEqual(['React', 'NestJS']);
  });

  it('should use the slug as the tie-breaker when sort orders are equal', () => {
    const viewModels = buildTagsViewModels(
      [
        createTag({
          id: 'tag-2',
          slug: 'zeta',
          projectIds: undefined,
          technologyIds: undefined,
          projects: undefined,
          technologies: undefined,
          sortOrder: 1,
        }),
        createTag({
          id: 'tag-1',
          slug: 'alpha',
          projectIds: undefined,
          technologyIds: undefined,
          projects: undefined,
          technologies: undefined,
          sortOrder: 1,
          type: null,
        }),
      ],
      [],
      [],
    );

    expect(viewModels.map((viewModel) => viewModel.slug)).toEqual([
      'alpha',
      'zeta',
    ]);
    expect(viewModels[0].type).toBe('');
    expect(viewModels[0].projectLabels).toEqual([]);
    expect(viewModels[0].technologyLabels).toEqual([]);
  });

  it('should fallback nullish sort orders during sorting and label mapping', () => {
    const leftDefault = buildTagsViewModels(
      [
        createTag({
          id: 'tag-1',
          slug: 'without-order',
          sortOrder: undefined,
          projectIds: undefined,
          technologyIds: undefined,
          projects: undefined,
          technologies: undefined,
        }),
        createTag({
          id: 'tag-2',
          slug: 'ordered',
          sortOrder: 1,
          projectIds: undefined,
          technologyIds: undefined,
          projects: undefined,
          technologies: undefined,
        }),
      ],
      [],
      [],
    );

    const rightDefault = buildTagsViewModels(
      [
        createTag({
          id: 'tag-2',
          slug: 'ordered',
          sortOrder: 1,
          projectIds: undefined,
          technologyIds: undefined,
          projects: undefined,
          technologies: undefined,
        }),
        createTag({
          id: 'tag-1',
          slug: 'without-order',
          sortOrder: null,
          projectIds: undefined,
          technologyIds: undefined,
          projects: undefined,
          technologies: undefined,
        }),
      ],
      [],
      [],
    );

    expect(leftDefault.map((viewModel) => viewModel.slug)).toEqual([
      'ordered',
      'without-order',
    ]);
    expect(rightDefault[1].sortOrderLabel).toBe('0');
  });

  it('should fallback to legacy label fields and ids when catalog labels are unavailable', () => {
    const viewModels = buildTagsViewModels(
      [
        createTag({
          namePt: undefined,
          nameEn: undefined,
          labelPt: 'Legado pt',
          labelEn: 'Legacy en',
          projectIds: ['missing-project'],
          technologyIds: ['missing-technology'],
          projects: [],
          technologies: [],
        }),
      ],
      [],
      [],
    );

    expect(viewModels[0]).toEqual({
      id: 'tag-1',
      slug: 'frontend',
      namePt: 'Legado pt',
      nameEn: 'Legacy en',
      type: 'STACK',
      sortOrderLabel: '2',
      projectLabels: ['missing-project'],
      technologyLabels: ['missing-technology'],
      projectIds: ['missing-project'],
      technologyIds: ['missing-technology'],
    });
  });

  it('should build a valid mutation payload with deduplicated relations', () => {
    expect(
      buildTagsMutationPayload({
        slug: ' frontend ',
        namePt: ' Front-end ',
        nameEn: ' Front-end ',
        type: 'STACK',
        sortOrder: '5',
        projectIds: ['project-1', 'project-1'],
        technologyIds: ['technology-1', 'technology-1'],
      }),
    ).toEqual({
      isValid: true,
      payload: {
        slug: 'frontend',
        namePt: 'Front-end',
        nameEn: 'Front-end',
        type: 'STACK',
        sortOrder: 5,
        projectIds: ['project-1'],
        technologyIds: ['technology-1'],
      },
    });
  });

  it('should reject invalid mutation forms with the matching translation key', () => {
    expect(
      buildTagsMutationPayload({
        slug: '',
        namePt: '',
        nameEn: '',
        type: '',
        sortOrder: 'abc',
        projectIds: [],
        technologyIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.tags.feedback.requiredSlug',
    });

    expect(
      buildTagsMutationPayload({
        slug: 'frontend',
        namePt: '',
        nameEn: '',
        type: '',
        sortOrder: 'abc',
        projectIds: [],
        technologyIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.tags.feedback.requiredNamePt',
    });

    expect(
      buildTagsMutationPayload({
        slug: 'frontend',
        namePt: 'Front-end',
        nameEn: '',
        type: '',
        sortOrder: 'abc',
        projectIds: [],
        technologyIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.tags.feedback.requiredNameEn',
    });

    expect(
      buildTagsMutationPayload({
        slug: 'frontend',
        namePt: 'Front-end',
        nameEn: 'Front-end',
        type: '',
        sortOrder: 'abc',
        projectIds: [],
        technologyIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.tags.feedback.requiredType',
    });

    expect(
      buildTagsMutationPayload({
        slug: 'frontend',
        namePt: 'Front-end',
        nameEn: 'Front-end',
        type: 'STACK',
        sortOrder: 'abc',
        projectIds: [],
        technologyIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.tags.feedback.invalidSortOrder',
    });

    expect(
      buildTagsMutationPayload({
        slug: 'frontend',
        namePt: 'Front-end',
        nameEn: 'Front-end',
        type: 'INVALID' as never,
        sortOrder: '1',
        projectIds: [],
        technologyIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.tags.feedback.invalidType',
    });
  });
});
