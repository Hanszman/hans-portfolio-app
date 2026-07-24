import { appConfig } from '../../../../../core/api/api.config';
import { ImageAssetRecord } from '../../../../../core/api/admin/image-assets/image-assets-operations.types';
import { FormationRecord } from '../../../../../core/api/admin/formations/formations-operations.types';
import { LinkRecord } from '../../../../../core/api/admin/links/links-operations.types';
import { TechnologyCollectionItemResponse } from '../../../../../core/api/technologies/technologies.types';
import {
  buildFormationImageAssetOptions,
  buildFormationLinkOptions,
  buildFormationsFormValue,
  buildFormationsMutationPayload,
  buildFormationsViewModels,
  buildFormationTechnologyOptions,
  normalizeFormationImageAssetIds,
  normalizeFormationLinkIds,
  normalizeFormationTechnologyIds,
} from './formations-operations.helper';

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
  url: 'https://example.com',
  labelPt: 'Repositorio',
  labelEn: 'Repository',
  descriptionPt: 'Descricao',
  descriptionEn: 'Description',
  type: 'DOCS',
  sortOrder: 1,
  projectIds: [],
  experienceIds: [],
  technologyIds: [],
  formationIds: [],
  ...overrides,
});

const createImageAsset = (overrides: Partial<ImageAssetRecord> = {}): ImageAssetRecord => ({
  id: 'image-asset-1',
  fileName: 'diploma.png',
  filePath: '/assets/img/formations/diploma.png',
  folder: 'formations',
  kind: 'COVER',
  mimeType: 'image/png',
  projectIds: [],
  experienceIds: [],
  technologyIds: [],
  formationIds: [],
  spokenLanguageIds: [],
  customerIds: [],
  jobIds: [],
  ...overrides,
});

const createFormation = (overrides: Partial<FormationRecord> = {}): FormationRecord => ({
  id: 'formation-1',
  slug: 'computer-science',
  institution: 'UFMG',
  titlePt: 'Ciencia da Computacao',
  titleEn: 'Computer Science',
  degreeType: 'BACHELOR',
  summaryPt: 'Graduacao em computacao.',
  summaryEn: 'Computer science graduation.',
  startDate: '2020-01-01',
  endDate: '2024-12-31',
  highlight: true,
  sortOrder: 2,
  technologyRelations: [
    {
      technologyId: 'technology-2',
      sortOrder: 1,
      technology: { id: 'technology-2', slug: 'nestjs', name: 'NestJS' },
    },
  ],
  linkIds: ['link-2'],
  imageAssetIds: ['image-asset-2'],
  links: [
    {
      linkId: 'link-3',
      link: { id: 'link-3', url: 'https://docs', labelPt: 'Docs', labelEn: 'Docs' },
    },
  ],
  imageAssets: [
    {
      imageAssetId: 'image-asset-3',
      imageAsset: {
        id: 'image-asset-3',
        fileName: 'campus.png',
        filePath: '/assets/img/formations/campus.png',
        kind: 'COVER',
      },
    },
  ],
  ...overrides,
});

describe('formations operations helper', () => {
  it('should sort technology, link and image-asset catalog options by title', () => {
    expect(
      buildFormationTechnologyOptions([
        createTechnology({ id: 'technology-2', name: 'Zeta', slug: 'zeta' }),
        createTechnology({ id: 'technology-1', name: 'Alpha', slug: 'alpha' }),
      ]),
    ).toEqual([
      { id: 'technology-1', title: 'Alpha', subtitle: 'alpha' },
      { id: 'technology-2', title: 'Zeta', subtitle: 'zeta' },
    ]);

    expect(
      buildFormationLinkOptions([
        createLink({ id: 'link-2', labelPt: 'Zeta', url: 'https://zeta.dev' }),
        createLink({ id: 'link-1', labelPt: 'Alpha', url: 'https://alpha.dev' }),
      ]),
    ).toEqual([
      { id: 'link-1', title: 'Alpha', subtitle: 'https://alpha.dev' },
      { id: 'link-2', title: 'Zeta', subtitle: 'https://zeta.dev' },
    ]);

    expect(
      buildFormationImageAssetOptions([
        createImageAsset({ id: 'image-asset-2', fileName: 'zeta.png' }),
        createImageAsset({ id: 'image-asset-1', fileName: 'alpha.png' }),
      ]),
    ).toEqual([
      {
        id: 'image-asset-1',
        title: 'alpha.png',
        subtitle: '/assets/img/formations/diploma.png',
        imageUrl: `${appConfig.baseUrl}/assets/img/formations/diploma.png`,
      },
      {
        id: 'image-asset-2',
        title: 'zeta.png',
        subtitle: '/assets/img/formations/diploma.png',
        imageUrl: `${appConfig.baseUrl}/assets/img/formations/diploma.png`,
      },
    ]);
  });

  it('should normalize relation ids from scalar arrays and nested relation records', () => {
    const formation = createFormation();

    expect(normalizeFormationTechnologyIds(formation)).toEqual(['technology-2']);
    expect(normalizeFormationLinkIds(formation)).toEqual(['link-2', 'link-3']);
    expect(normalizeFormationImageAssetIds(formation)).toEqual([
      'image-asset-2',
      'image-asset-3',
    ]);
  });

  it('should normalize fallback ids from secondary relation collections', () => {
    const formation = createFormation({
      technologyRelations: [],
      technologies: [
        {
          technologyId: '',
          technology: {
            id: 'technology-3',
            slug: 'rxjs',
            name: 'RxJS',
          },
        },
      ],
      linkIds: [],
      links: [
        {
          linkId: '',
          link: {
            id: 'link-4',
            url: 'https://example.com/rx',
            labelEn: 'RxJS Docs',
          },
        },
      ],
      imageAssetIds: [],
      imageAssets: [
        {
          imageAssetId: '',
          imageAsset: {
            id: 'image-asset-4',
            fileName: 'rxjs.png',
            filePath: '/assets/img/formations/rxjs.png',
            kind: 'ICON',
          },
        },
      ],
    });

    expect(normalizeFormationTechnologyIds(formation)).toEqual(['technology-3']);
    expect(normalizeFormationLinkIds(formation)).toEqual(['link-4']);
    expect(normalizeFormationImageAssetIds(formation)).toEqual(['image-asset-4']);
  });

  it('should build an empty form when no formation is selected', () => {
    expect(buildFormationsFormValue(undefined)).toEqual({
      slug: '',
      institution: '',
      titlePt: '',
      titleEn: '',
      degreeType: '',
      summaryPt: '',
      summaryEn: '',
      startDate: '',
      endDate: '',
      highlight: true,
      sortOrder: '0',
      technologyIds: [],
      linkIds: [],
      imageAssetIds: [],
    });
  });

  it('should map a selected formation into the form model', () => {
    expect(buildFormationsFormValue(createFormation())).toEqual({
      slug: 'computer-science',
      institution: 'UFMG',
      titlePt: 'Ciencia da Computacao',
      titleEn: 'Computer Science',
      degreeType: 'BACHELOR',
      summaryPt: 'Graduacao em computacao.',
      summaryEn: 'Computer science graduation.',
      startDate: '2020-01-01',
      endDate: '2024-12-31',
      highlight: true,
      sortOrder: '2',
      technologyIds: ['technology-2'],
      linkIds: ['link-2', 'link-3'],
      imageAssetIds: ['image-asset-2', 'image-asset-3'],
    });
  });

  it('should gracefully map nullish relation collections and fallback scalar fields', () => {
    expect(
      buildFormationsFormValue(
        createFormation({
          endDate: null,
          highlight: null,
          sortOrder: null,
          technologyRelations: undefined,
          technologies: undefined,
          linkIds: undefined,
          links: undefined,
          imageAssetIds: undefined,
          imageAssets: undefined,
        }),
      ),
    ).toEqual({
      slug: 'computer-science',
      institution: 'UFMG',
      titlePt: 'Ciencia da Computacao',
      titleEn: 'Computer Science',
      degreeType: 'BACHELOR',
      summaryPt: 'Graduacao em computacao.',
      summaryEn: 'Computer science graduation.',
      startDate: '2020-01-01',
      endDate: '',
      highlight: false,
      sortOrder: '0',
      technologyIds: [],
      linkIds: [],
      imageAssetIds: [],
    });
  });

  it('should sort formations with nullish sort orders after explicit sort orders', () => {
    const viewModels = buildFormationsViewModels(
      [
        createFormation({
          id: 'formation-2',
          slug: 'late-record',
          institution: 'Late Institute',
          sortOrder: null,
        }),
        createFormation({
          id: 'formation-3',
          slug: 'first-record',
          institution: 'Alpha Institute',
          sortOrder: 1,
        }),
        createFormation({
          id: 'formation-4',
          slug: 'fallback-record',
          institution: 'Beta Institute',
          sortOrder: undefined,
        }),
      ],
      [],
      [],
      [],
    );

    expect(viewModels.map(({ id }) => id)).toEqual([
      'formation-3',
      'formation-4',
      'formation-2',
    ]);
  });

  it('should build sorted formation view-models with resolved labels', () => {
    const viewModels = buildFormationsViewModels(
      [
        createFormation({
          id: 'formation-2',
          slug: 'mba-management',
          institution: 'PUC',
          titlePt: 'MBA em Gestao',
          titleEn: 'Management MBA',
          sortOrder: 1,
          technologyRelations: [],
          linkIds: ['link-1'],
          links: [],
          imageAssetIds: ['image-asset-1'],
          imageAssets: [],
        }),
        createFormation(),
      ],
      [
        createTechnology({ id: 'technology-2', name: 'NestJS', slug: 'nestjs' }),
      ],
      [
        createLink({ id: 'link-1', labelPt: 'Portal PUC' }),
        createLink({ id: 'link-2', labelPt: 'Portal UFMG' }),
        createLink({ id: 'link-3', labelPt: 'Documentacao' }),
      ],
      [
        createImageAsset({ id: 'image-asset-1', fileName: 'degree.png' }),
        createImageAsset({ id: 'image-asset-2', fileName: 'diploma.png' }),
        createImageAsset({ id: 'image-asset-3', fileName: 'campus.png' }),
      ],
    );

    expect(viewModels.map((viewModel) => viewModel.slug)).toEqual([
      'mba-management',
      'computer-science',
    ]);
    expect(viewModels[1].technologyLabels).toEqual(['NestJS (nestjs)']);
    expect(viewModels[1].linkLabels).toEqual(['Portal UFMG', 'Documentacao']);
    expect(viewModels[1].imageAssetLabels).toEqual(['diploma.png (COVER)', 'campus.png (COVER)']);
  });

  it('should use the institution as the tie-breaker and fallback missing relation labels', () => {
    const viewModels = buildFormationsViewModels(
      [
        createFormation({
          id: 'formation-2',
          institution: 'Zeta University',
          slug: 'zeta-course',
          sortOrder: 1,
          technologyRelations: [],
          linkIds: [],
          links: [],
          imageAssetIds: [],
          imageAssets: [],
        }),
        createFormation({
          id: 'formation-1',
          institution: 'Alpha University',
          slug: 'alpha-course',
          sortOrder: 1,
          highlight: null,
          technologyRelations: [{ technologyId: 'missing-technology' }],
          linkIds: ['missing-link'],
          links: [],
          imageAssetIds: ['missing-image'],
          imageAssets: [],
        }),
      ],
      [],
      [],
      [],
    );

    expect(viewModels.map((viewModel) => viewModel.institution)).toEqual([
      'Alpha University',
      'Zeta University',
    ]);
    expect(viewModels[0].highlight).toBeFalse();
    expect(viewModels[0].technologyLabels).toEqual(['missing-technology']);
    expect(viewModels[0].linkLabels).toEqual(['missing-link']);
    expect(viewModels[0].imageAssetLabels).toEqual(['missing-image']);
  });

  it('should fallback to end-date placeholder, zero sort-order and alternative link labels', () => {
    const viewModels = buildFormationsViewModels(
      [
        createFormation({
          id: 'formation-3',
          slug: 'fallbacks-course',
          institution: 'Fallback University',
          sortOrder: null,
          endDate: null,
          technologyRelations: [],
          technologies: [],
          linkIds: ['link-4', 'link-5'],
          links: [],
          imageAssetIds: [],
          imageAssets: [],
        }),
      ],
      [],
      [
        createLink({
          id: 'link-4',
          labelPt: '',
          labelEn: 'English only label',
          url: 'https://example.com/en-only',
        }),
        createLink({
          id: 'link-5',
          labelPt: '',
          labelEn: '',
          url: 'https://example.com/url-only',
        }),
      ],
      [],
    );

    expect(viewModels[0].endDateLabel).toBe('-');
    expect(viewModels[0].sortOrderLabel).toBe('0');
    expect(viewModels[0].linkLabels).toEqual([
      'English only label',
      'https://example.com/url-only',
    ]);
  });

  it('should build a valid mutation payload with deduplicated relations', () => {
    expect(
      buildFormationsMutationPayload({
        slug: ' computer-science ',
        institution: ' UFMG ',
        titlePt: ' Ciencia da Computacao ',
        titleEn: ' Computer Science ',
        degreeType: ' BACHELOR ',
        summaryPt: ' Graduacao em computacao. ',
        summaryEn: ' Computer science graduation. ',
        startDate: ' 2020-01-01 ',
        endDate: ' 2024-12-31 ',
        highlight: true,
        sortOrder: '5',
        technologyIds: ['technology-1', 'technology-1'],
        linkIds: ['link-1', 'link-1'],
        imageAssetIds: ['image-asset-1', 'image-asset-1'],
      }),
    ).toEqual({
      isValid: true,
      payload: {
        slug: 'computer-science',
        institution: 'UFMG',
        titlePt: 'Ciencia da Computacao',
        titleEn: 'Computer Science',
        degreeType: 'BACHELOR',
        summaryPt: 'Graduacao em computacao.',
        summaryEn: 'Computer science graduation.',
        startDate: '2020-01-01',
        endDate: '2024-12-31',
        highlight: true,
        sortOrder: 5,
        technologyRelations: [{ technologyId: 'technology-1' }],
        linkIds: ['link-1'],
        imageAssetIds: ['image-asset-1'],
      },
    });
  });

  it('should omit the end date when the field is blank', () => {
    expect(
      buildFormationsMutationPayload({
        slug: 'computer-science',
        institution: 'UFMG',
        titlePt: 'Ciencia da Computacao',
        titleEn: 'Computer Science',
        degreeType: 'BACHELOR',
        summaryPt: 'Graduacao em computacao.',
        summaryEn: 'Computer science graduation.',
        startDate: '2020-01-01',
        endDate: '   ',
        highlight: true,
        sortOrder: '1',
        technologyIds: [],
        linkIds: [],
        imageAssetIds: [],
      }),
    ).toEqual({
      isValid: true,
      payload: {
        slug: 'computer-science',
        institution: 'UFMG',
        titlePt: 'Ciencia da Computacao',
        titleEn: 'Computer Science',
        degreeType: 'BACHELOR',
        summaryPt: 'Graduacao em computacao.',
        summaryEn: 'Computer science graduation.',
        startDate: '2020-01-01',
        highlight: true,
        sortOrder: 1,
        technologyRelations: [],
        linkIds: [],
        imageAssetIds: [],
      },
    });
  });

  it('should reject invalid mutation forms with the matching translation key', () => {
    expect(
      buildFormationsMutationPayload({
        slug: '',
        institution: '',
        titlePt: '',
        titleEn: '',
        degreeType: '',
        summaryPt: '',
        summaryEn: '',
        startDate: '',
        endDate: '',
        highlight: true,
        sortOrder: 'abc',
        technologyIds: [],
        linkIds: [],
        imageAssetIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.formations.feedback.requiredSlug',
    });

    expect(
      buildFormationsMutationPayload({
        slug: 'computer-science',
        institution: '',
        titlePt: '',
        titleEn: '',
        degreeType: '',
        summaryPt: '',
        summaryEn: '',
        startDate: '',
        endDate: '',
        highlight: true,
        sortOrder: 'abc',
        technologyIds: [],
        linkIds: [],
        imageAssetIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.formations.feedback.requiredInstitution',
    });

    expect(
      buildFormationsMutationPayload({
        slug: 'computer-science',
        institution: 'UFMG',
        titlePt: '',
        titleEn: '',
        degreeType: '',
        summaryPt: '',
        summaryEn: '',
        startDate: '',
        endDate: '',
        highlight: true,
        sortOrder: 'abc',
        technologyIds: [],
        linkIds: [],
        imageAssetIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.formations.feedback.requiredTitlePt',
    });

    expect(
      buildFormationsMutationPayload({
        slug: 'computer-science',
        institution: 'UFMG',
        titlePt: 'Ciencia da Computacao',
        titleEn: '',
        degreeType: '',
        summaryPt: '',
        summaryEn: '',
        startDate: '',
        endDate: '',
        highlight: true,
        sortOrder: 'abc',
        technologyIds: [],
        linkIds: [],
        imageAssetIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.formations.feedback.requiredTitleEn',
    });

    expect(
      buildFormationsMutationPayload({
        slug: 'computer-science',
        institution: 'UFMG',
        titlePt: 'Ciencia da Computacao',
        titleEn: 'Computer Science',
        degreeType: '',
        summaryPt: '',
        summaryEn: '',
        startDate: '',
        endDate: '',
        highlight: true,
        sortOrder: 'abc',
        technologyIds: [],
        linkIds: [],
        imageAssetIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.formations.feedback.requiredDegreeType',
    });

    expect(
      buildFormationsMutationPayload({
        slug: 'computer-science',
        institution: 'UFMG',
        titlePt: 'Ciencia da Computacao',
        titleEn: 'Computer Science',
        degreeType: 'BACHELOR',
        summaryPt: '',
        summaryEn: '',
        startDate: '',
        endDate: '',
        highlight: true,
        sortOrder: 'abc',
        technologyIds: [],
        linkIds: [],
        imageAssetIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.formations.feedback.requiredSummaryPt',
    });

    expect(
      buildFormationsMutationPayload({
        slug: 'computer-science',
        institution: 'UFMG',
        titlePt: 'Ciencia da Computacao',
        titleEn: 'Computer Science',
        degreeType: 'BACHELOR',
        summaryPt: 'Graduacao em computacao.',
        summaryEn: '',
        startDate: '',
        endDate: '',
        highlight: true,
        sortOrder: 'abc',
        technologyIds: [],
        linkIds: [],
        imageAssetIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.formations.feedback.requiredSummaryEn',
    });

    expect(
      buildFormationsMutationPayload({
        slug: 'computer-science',
        institution: 'UFMG',
        titlePt: 'Ciencia da Computacao',
        titleEn: 'Computer Science',
        degreeType: 'BACHELOR',
        summaryPt: 'Graduacao em computacao.',
        summaryEn: 'Computer science graduation.',
        startDate: '',
        endDate: '',
        highlight: true,
        sortOrder: 'abc',
        technologyIds: [],
        linkIds: [],
        imageAssetIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.formations.feedback.requiredStartDate',
    });

    expect(
      buildFormationsMutationPayload({
        slug: 'computer-science',
        institution: 'UFMG',
        titlePt: 'Ciencia da Computacao',
        titleEn: 'Computer Science',
        degreeType: 'BACHELOR',
        summaryPt: 'Graduacao em computacao.',
        summaryEn: 'Computer science graduation.',
        startDate: '2020-01-01',
        endDate: '',
        highlight: true,
        sortOrder: 'abc',
        technologyIds: [],
        linkIds: [],
        imageAssetIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.formations.feedback.invalidSortOrder',
    });
  });
});
