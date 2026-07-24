import {
  createEmptyLinksOperationsFormValue,
  createLinkCatalogOptionViewModel,
  createLinkTypeOptions,
} from './links-operations.types';

describe('links types helpers', () => {
  it('should create the empty links form value', () => {
    expect(createEmptyLinksOperationsFormValue()).toEqual({
      url: '',
      labelPt: '',
      labelEn: '',
      descriptionPt: '',
      descriptionEn: '',
      type: '',
      sortOrder: '0',
      projectIds: [],
      experienceIds: [],
      technologyIds: [],
      formationIds: [],
    });
  });

  it('should build project, experience and technology catalog options', () => {
    expect(
      createLinkCatalogOptionViewModel({
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
      createLinkCatalogOptionViewModel({
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
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        technologies: [],
        projects: [],
        customers: [],
        jobs: [],
        links: [],
        imageAssets: [],
      }),
    ).toEqual({
      id: 'experience-1',
      title: 'Analista',
      subtitle: 'Stefanini Ford',
    });

    expect(
      createLinkCatalogOptionViewModel({
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

  it('should create the supported link type options', () => {
    expect(createLinkTypeOptions()).toEqual([
      {
        id: 'GITHUB',
        labelKey: 'pages.admin.links.fields.type.options.GITHUB',
        value: 'GITHUB',
      },
      {
        id: 'DEPLOY',
        labelKey: 'pages.admin.links.fields.type.options.DEPLOY',
        value: 'DEPLOY',
      },
      { id: 'NPM', labelKey: 'pages.admin.links.fields.type.options.NPM', value: 'NPM' },
      { id: 'DOCS', labelKey: 'pages.admin.links.fields.type.options.DOCS', value: 'DOCS' },
      {
        id: 'LINKEDIN',
        labelKey: 'pages.admin.links.fields.type.options.LINKEDIN',
        value: 'LINKEDIN',
      },
      {
        id: 'WEBSITE',
        labelKey: 'pages.admin.links.fields.type.options.WEBSITE',
        value: 'WEBSITE',
      },
      {
        id: 'ARTICLE',
        labelKey: 'pages.admin.links.fields.type.options.ARTICLE',
        value: 'ARTICLE',
      },
      { id: 'FIGMA', labelKey: 'pages.admin.links.fields.type.options.FIGMA', value: 'FIGMA' },
      { id: 'OTHER', labelKey: 'pages.admin.links.fields.type.options.OTHER', value: 'OTHER' },
    ]);
  });
});
