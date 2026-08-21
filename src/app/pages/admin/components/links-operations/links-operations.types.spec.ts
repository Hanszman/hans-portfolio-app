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
      labelEs: '',
      type: '',
      sortOrder: '0',
      projectIds: [],
    });
  });

  it('should build project catalog options', () => {
    expect(
      createLinkCatalogOptionViewModel({
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
      } as never),
    ).toEqual({
      id: 'project-1',
      title: 'Portfolio remake',
      subtitle: 'portfolio-remake',
    });
  });

  it('should create the supported link type options', () => {
    expect(createLinkTypeOptions()).toEqual([
      {
        id: 'GITHUB',
        labelKey: 'taxonomy.projects.linkType.github',
        value: 'GITHUB',
      },
      {
        id: 'DEPLOY',
        labelKey: 'taxonomy.projects.linkType.deploy',
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
      { id: 'OTHER', labelKey: 'common.values.other', value: 'OTHER' },
    ]);
  });
});
