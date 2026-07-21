import {
  TAG_TYPE_VALUES,
  createEmptyTagsOperationsFormValue,
  createTagTypeOptions,
  createTagCatalogOptionViewModel,
  resolveTagNameEn,
  resolveTagNamePt,
  resolveTagProjectIdFromRelation,
  resolveTagTechnologyIdFromRelation,
} from './tags-operations.types';

describe('tags types helpers', () => {
  it('should create the empty tags form value', () => {
    expect(createEmptyTagsOperationsFormValue()).toEqual({
      slug: '',
      namePt: '',
      nameEn: '',
      type: '',
      sortOrder: '0',
      projectIds: [],
      technologyIds: [],
    });
  });

  it('should resolve the localized names with legacy fallbacks and empty defaults', () => {
    expect(
      resolveTagNamePt({
        id: 'tag-1',
        slug: 'frontend',
        namePt: 'Front-end',
      }),
    ).toBe('Front-end');

    expect(
      resolveTagNameEn({
        id: 'tag-1',
        slug: 'frontend',
        labelEn: 'Legacy en',
      }),
    ).toBe('Legacy en');

    expect(
      resolveTagNamePt({
        id: 'tag-1',
        slug: 'frontend',
      }),
    ).toBe('');

    expect(
      resolveTagNameEn({
        id: 'tag-1',
        slug: 'frontend',
      }),
    ).toBe('');
  });

  it('should resolve relation ids from explicit ids, nested records and null fallbacks', () => {
    expect(
      resolveTagProjectIdFromRelation({
        projectId: 'project-1',
      }),
    ).toBe('project-1');

    expect(
      resolveTagProjectIdFromRelation({
        project: {
          id: 'project-2',
          slug: 'admin-workspace',
          titlePt: 'Admin workspace',
        },
      }),
    ).toBe('project-2');

    expect(resolveTagProjectIdFromRelation({})).toBeNull();

    expect(
      resolveTagTechnologyIdFromRelation({
        technologyId: 'technology-1',
      }),
    ).toBe('technology-1');

    expect(
      resolveTagTechnologyIdFromRelation({
        technology: {
          id: 'technology-2',
          slug: 'angular',
          name: 'Angular',
        },
      }),
    ).toBe('technology-2');

    expect(resolveTagTechnologyIdFromRelation({})).toBeNull();
  });

  it('should build project and technology catalog options', () => {
    expect(
      createTagCatalogOptionViewModel({
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
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        technologies: [],
        experiences: [],
        tags: [],
        links: [],
        imageAssets: [],
      }),
    ).toEqual({
      id: 'project-1',
      title: 'Portfolio remake',
      subtitle: 'portfolio-remake',
    });

    expect(
      createTagCatalogOptionViewModel({
        id: 'technology-1',
        slug: 'angular',
        name: 'Angular',
        category: 'framework',
        level: 'advanced',
        frequency: 'frequent',
        highlight: true,
      }),
    ).toEqual({
      id: 'technology-1',
      title: 'Angular',
      subtitle: 'angular',
    });
  });

  it('should expose the supported tag type options', () => {
    expect(TAG_TYPE_VALUES).toEqual([
      'STACK',
      'DOMAIN',
      'PLATFORM',
      'HIGHLIGHT',
      'METHODOLOGY',
      'INDUSTRY',
      'OTHER',
    ]);

    expect(createTagTypeOptions()[0]).toEqual({
      id: 'STACK',
      label: 'STACK',
      value: 'STACK',
    });
  });
});
