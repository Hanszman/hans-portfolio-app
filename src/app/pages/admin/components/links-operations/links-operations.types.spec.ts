import {
  createEmptyLinksOperationsFormValue,
  createLinkCatalogOptionViewModel,
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
      isPublished: true,
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
        isPublished: true,
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
        isPublished: true,
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
});
