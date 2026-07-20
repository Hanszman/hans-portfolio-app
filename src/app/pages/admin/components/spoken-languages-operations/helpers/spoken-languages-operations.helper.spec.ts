import { appConfig } from '../../../../../core/api/api.config';
import { ImageAssetRecord } from '../../../../../core/api/admin/image-assets/image-assets-operations.types';
import { SpokenLanguageRecord } from '../../../../../core/api/admin/spoken-languages/spoken-languages-operations.types';
import {
  buildSpokenLanguageImageAssetOptions,
  buildSpokenLanguagesFormValue,
  buildSpokenLanguagesMutationPayload,
  buildSpokenLanguagesViewModels,
  normalizeSpokenLanguageImageAssetIds,
} from './spoken-languages-operations.helper';

const createImageAsset = (
  overrides: Partial<ImageAssetRecord> = {},
): ImageAssetRecord => ({
  id: 'image-asset-1',
  fileName: 'usa.png',
  filePath: '/assets/img/skills/usa.png',
  folder: 'skills',
  kind: 'ICON',
  mimeType: 'image/png',
  spokenLanguageIds: [],
  ...overrides,
});

const createSpokenLanguage = (
  overrides: Partial<SpokenLanguageRecord> = {},
): SpokenLanguageRecord => ({
  id: 'spoken-language-1',
  code: 'en-us',
  namePt: 'Ingles',
  nameEn: 'English',
  proficiency: 'FLUENT',
  highlight: true,
  sortOrder: 2,
  imageAssetIds: ['image-asset-2'],
  imageAssets: [
    {
      imageAssetId: 'image-asset-3',
      imageAsset: {
        id: 'image-asset-3',
        fileName: 'english.svg',
        filePath: '/assets/img/skills/english.svg',
        kind: 'ICON',
      },
    },
  ],
  ...overrides,
});

describe('spoken languages helper', () => {
  it('should sort image asset catalog options by title', () => {
    const options = buildSpokenLanguageImageAssetOptions([
      createImageAsset({ id: 'image-asset-2', fileName: 'zeta.png' }),
      createImageAsset({ id: 'image-asset-1', fileName: 'alpha.png' }),
    ]);

    expect(options).toEqual([
      {
        id: 'image-asset-1',
        title: 'alpha.png',
        subtitle: '/assets/img/skills/usa.png',
        imageUrl: `${appConfig.baseUrl}/assets/img/skills/usa.png`,
      },
      {
        id: 'image-asset-2',
        title: 'zeta.png',
        subtitle: '/assets/img/skills/usa.png',
        imageUrl: `${appConfig.baseUrl}/assets/img/skills/usa.png`,
      },
    ]);
  });

  it('should normalize image asset relations from explicit ids, nested relations and the image asset catalog', () => {
    expect(
      normalizeSpokenLanguageImageAssetIds(createSpokenLanguage(), [
        createImageAsset({
          id: 'image-asset-1',
          spokenLanguageIds: ['spoken-language-1'],
        }),
      ]),
    ).toEqual(['image-asset-2', 'image-asset-3', 'image-asset-1']);
  });

  it('should build an empty form when no spoken language is selected', () => {
    expect(buildSpokenLanguagesFormValue(undefined, [])).toEqual({
      code: '',
      namePt: '',
      nameEn: '',
      proficiency: '',
      highlight: true,
      sortOrder: '0',
      imageAssetIds: [],
    });
  });

  it('should map a selected spoken language into the form model', () => {
    expect(
      buildSpokenLanguagesFormValue(createSpokenLanguage(), [
        createImageAsset({
          id: 'image-asset-1',
          spokenLanguageIds: ['spoken-language-1'],
        }),
      ]),
    ).toEqual({
      code: 'en-us',
      namePt: 'Ingles',
      nameEn: 'English',
      proficiency: 'FLUENT',
      highlight: true,
      sortOrder: '2',
      imageAssetIds: ['image-asset-2', 'image-asset-3', 'image-asset-1'],
    });
  });

  it('should gracefully map nullish relation collections and fallback scalar fields', () => {
    expect(
      buildSpokenLanguagesFormValue(
        createSpokenLanguage({
          imageAssetIds: undefined,
          imageAssets: undefined,
          proficiency: null as never,
          highlight: null,
          sortOrder: null,
        }),
        [],
      ),
    ).toEqual({
      code: 'en-us',
      namePt: 'Ingles',
      nameEn: 'English',
      proficiency: '',
      highlight: false,
      sortOrder: '0',
      imageAssetIds: [],
    });
  });

  it('should build sorted spoken language view-models with resolved labels', () => {
    const viewModels = buildSpokenLanguagesViewModels(
      [
        createSpokenLanguage({
          id: 'spoken-language-2',
          code: 'pt-br',
          namePt: 'Portugues',
          nameEn: 'Portuguese',
          proficiency: 'NATIVE',
          sortOrder: 1,
          imageAssetIds: ['image-asset-1'],
          imageAssets: undefined,
        }),
        createSpokenLanguage(),
      ],
      [
        createImageAsset({
          id: 'image-asset-1',
          fileName: 'brasil.png',
          kind: 'ICON',
        }),
        createImageAsset({
          id: 'image-asset-2',
          fileName: 'usa.png',
          kind: 'ICON',
        }),
        createImageAsset({
          id: 'image-asset-3',
          fileName: 'english.svg',
          kind: 'ICON',
        }),
      ],
    );

    expect(viewModels.map((viewModel) => viewModel.code)).toEqual([
      'pt-br',
      'en-us',
    ]);
    expect(viewModels[1].imageAssetLabels).toEqual([
      'usa.png (ICON)',
      'english.svg (ICON)',
    ]);
  });

  it('should use the code as the tie-breaker when sort orders are equal', () => {
    const viewModels = buildSpokenLanguagesViewModels(
      [
        createSpokenLanguage({
          id: 'spoken-language-2',
          code: 'zeta',
          imageAssetIds: undefined,
          imageAssets: undefined,
          sortOrder: 1,
        }),
        createSpokenLanguage({
          id: 'spoken-language-1',
          code: 'alpha',
          imageAssetIds: undefined,
          imageAssets: undefined,
          sortOrder: 1,
          proficiency: null as never,
        }),
      ],
      [],
    );

    expect(viewModels.map((viewModel) => viewModel.code)).toEqual(['alpha', 'zeta']);
    expect(viewModels[0].proficiency).toBe('');
    expect(viewModels[0].imageAssetLabels).toEqual([]);
  });

  it('should fallback nullish sort orders during sorting and label mapping', () => {
    const leftDefault = buildSpokenLanguagesViewModels(
      [
        createSpokenLanguage({
          id: 'spoken-language-1',
          code: 'without-order',
          sortOrder: undefined,
          imageAssetIds: undefined,
          imageAssets: undefined,
        }),
        createSpokenLanguage({
          id: 'spoken-language-2',
          code: 'ordered',
          sortOrder: 1,
          imageAssetIds: undefined,
          imageAssets: undefined,
        }),
      ],
      [],
    );

    const rightDefault = buildSpokenLanguagesViewModels(
      [
        createSpokenLanguage({
          id: 'spoken-language-2',
          code: 'ordered',
          sortOrder: 1,
          imageAssetIds: undefined,
          imageAssets: undefined,
        }),
        createSpokenLanguage({
          id: 'spoken-language-1',
          code: 'without-order',
          sortOrder: null,
          imageAssetIds: undefined,
          imageAssets: undefined,
        }),
      ],
      [],
    );

    expect(leftDefault.map((viewModel) => viewModel.code)).toEqual([
      'ordered',
      'without-order',
    ]);
    expect(rightDefault[1].sortOrderLabel).toBe('0');
  });

  it('should fallback nullish catalog relations and highlight values inside the view-model mapper', () => {
    const viewModels = buildSpokenLanguagesViewModels(
      [
        createSpokenLanguage({
          highlight: null,
          imageAssetIds: undefined,
          imageAssets: undefined,
        }),
      ],
      [
        createImageAsset({
          spokenLanguageIds: undefined,
        }),
      ],
    );

    expect(viewModels[0].highlight).toBeFalse();
    expect(viewModels[0].imageAssetIds).toEqual([]);
    expect(viewModels[0].imageAssetLabels).toEqual([]);
  });

  it('should fallback to ids when image asset labels are unavailable', () => {
    const viewModels = buildSpokenLanguagesViewModels(
      [
        createSpokenLanguage({
          imageAssetIds: ['missing-image-asset'],
          imageAssets: [],
        }),
      ],
      [],
    );

    expect(viewModels[0]).toEqual({
      id: 'spoken-language-1',
      code: 'en-us',
      namePt: 'Ingles',
      nameEn: 'English',
      proficiency: 'FLUENT',
      highlight: true,
      sortOrderLabel: '2',
      imageAssetLabels: ['missing-image-asset'],
      imageAssetIds: ['missing-image-asset'],
    });
  });

  it('should build a valid mutation payload with deduplicated relations', () => {
    expect(
      buildSpokenLanguagesMutationPayload({
        code: ' en-us ',
        namePt: ' Ingles ',
        nameEn: ' English ',
        proficiency: 'FLUENT',
        highlight: true,
        sortOrder: '5',
        imageAssetIds: ['image-asset-1', 'image-asset-1'],
      }),
    ).toEqual({
      isValid: true,
      payload: {
        code: 'en-us',
        namePt: 'Ingles',
        nameEn: 'English',
        proficiency: 'FLUENT',
        highlight: true,
        sortOrder: 5,
        imageAssetIds: ['image-asset-1'],
      },
    });
  });

  it('should reject invalid mutation forms with the matching translation key', () => {
    expect(
      buildSpokenLanguagesMutationPayload({
        code: '',
        namePt: '',
        nameEn: '',
        proficiency: '',
        highlight: true,
        sortOrder: 'abc',
        imageAssetIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.spokenLanguages.feedback.requiredCode',
    });

    expect(
      buildSpokenLanguagesMutationPayload({
        code: 'en-us',
        namePt: '',
        nameEn: '',
        proficiency: '',
        highlight: true,
        sortOrder: 'abc',
        imageAssetIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.spokenLanguages.feedback.requiredNamePt',
    });

    expect(
      buildSpokenLanguagesMutationPayload({
        code: 'en-us',
        namePt: 'Ingles',
        nameEn: '',
        proficiency: '',
        highlight: true,
        sortOrder: 'abc',
        imageAssetIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.spokenLanguages.feedback.requiredNameEn',
    });

    expect(
      buildSpokenLanguagesMutationPayload({
        code: 'en-us',
        namePt: 'Ingles',
        nameEn: 'English',
        proficiency: '',
        highlight: true,
        sortOrder: 'abc',
        imageAssetIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.spokenLanguages.feedback.requiredProficiency',
    });

    expect(
      buildSpokenLanguagesMutationPayload({
        code: 'en-us',
        namePt: 'Ingles',
        nameEn: 'English',
        proficiency: 'INVALID' as never,
        highlight: true,
        sortOrder: '1',
        imageAssetIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.spokenLanguages.feedback.invalidProficiency',
    });

    expect(
      buildSpokenLanguagesMutationPayload({
        code: 'en-us',
        namePt: 'Ingles',
        nameEn: 'English',
        proficiency: 'FLUENT',
        highlight: true,
        sortOrder: 'abc',
        imageAssetIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.spokenLanguages.feedback.invalidSortOrder',
    });
  });
});
