import { appConfig } from '../../../../core/api/api.config';
import {
  SPOKEN_LANGUAGE_PROFICIENCY_VALUES,
  createEmptySpokenLanguagesOperationsFormValue,
  createSpokenLanguageImageAssetOptionViewModel,
  createSpokenLanguageProficiencyOptions,
  resolveSpokenLanguageImageAssetIdFromRelation,
  resolveSpokenLanguageImageAssetLabel,
} from './spoken-languages-operations.types';

describe('spoken languages types helpers', () => {
  it('should create the empty spoken languages form value', () => {
    expect(createEmptySpokenLanguagesOperationsFormValue()).toEqual({
      code: '',
      namePt: '',
      nameEn: '',
      proficiency: '',
      highlight: true,
      sortOrder: '0',
      imageAssetIds: [],
    });
  });

  it('should expose the supported spoken language proficiency options', () => {
    expect(SPOKEN_LANGUAGE_PROFICIENCY_VALUES).toEqual([
      'NATIVE',
      'FLUENT',
      'ADVANCED',
      'INTERMEDIATE',
      'BASIC',
    ]);

    expect(createSpokenLanguageProficiencyOptions()[0]).toEqual({
      id: 'NATIVE',
      label: 'NATIVE',
      value: 'NATIVE',
    });
  });

  it('should build image asset options and labels', () => {
    expect(
      createSpokenLanguageImageAssetOptionViewModel({
        id: 'image-asset-1',
        fileName: 'usa.png',
        filePath: '/assets/img/skills/usa.png',
        folder: 'skills',
        kind: 'ICON',
        mimeType: 'image/png',
      }),
    ).toEqual({
      id: 'image-asset-1',
      title: 'usa.png',
      subtitle: '/assets/img/skills/usa.png',
      imageUrl: `${appConfig.baseUrl}/assets/img/skills/usa.png`,
    });

    expect(
      resolveSpokenLanguageImageAssetLabel({
        id: 'image-asset-1',
        fileName: 'usa.png',
        filePath: '/assets/img/skills/usa.png',
        folder: 'skills',
        kind: 'ICON',
        mimeType: 'image/png',
      }),
    ).toBe('usa.png (ICON)');
  });

  it('should resolve relation ids from explicit ids, nested records and null fallbacks', () => {
    expect(
      resolveSpokenLanguageImageAssetIdFromRelation({
        imageAssetId: 'image-asset-1',
      }),
    ).toBe('image-asset-1');

    expect(
      resolveSpokenLanguageImageAssetIdFromRelation({
        imageAsset: {
          id: 'image-asset-2',
          fileName: 'brasil.png',
          filePath: '/assets/img/skills/brasil.png',
          kind: 'ICON',
        },
      }),
    ).toBe('image-asset-2');

    expect(resolveSpokenLanguageImageAssetIdFromRelation({})).toBeNull();
  });
});
