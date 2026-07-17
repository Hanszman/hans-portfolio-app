import { ImageAssetRecord } from '../../../../../core/api/admin/image-assets/image-assets-operations.types';
import {
  SpokenLanguageMutationPayload,
  SpokenLanguageRecord,
} from '../../../../../core/api/admin/spoken-languages/spoken-languages-operations.types';
import {
  SPOKEN_LANGUAGE_PROFICIENCY_VALUES,
  SpokenLanguageImageAssetOptionViewModel,
  SpokenLanguageOperationsViewModel,
  SpokenLanguagesMutationBuildResult,
  SpokenLanguagesOperationsFormValue,
  createEmptySpokenLanguagesOperationsFormValue,
  createSpokenLanguageImageAssetOptionViewModel,
  resolveSpokenLanguageImageAssetIdFromRelation,
  resolveSpokenLanguageImageAssetLabel,
} from '../spoken-languages-operations.types';

const sortCatalogOptions = (
  left: SpokenLanguageImageAssetOptionViewModel,
  right: SpokenLanguageImageAssetOptionViewModel,
): number => left.title.localeCompare(right.title);

const appendUnique = (collection: Set<string>, value: string | null | undefined): void => {
  if (value) {
    collection.add(value);
  }
};

const createImageAssetMap = (
  imageAssets: readonly ImageAssetRecord[],
): Map<string, ImageAssetRecord> =>
  new Map(imageAssets.map((imageAsset) => [imageAsset.id, imageAsset]));

const resolveSpokenLanguageImageAssetIdsFromCatalog = (
  spokenLanguage: SpokenLanguageRecord,
  imageAssets: readonly ImageAssetRecord[],
): readonly string[] =>
  imageAssets
    .filter((imageAsset) =>
      (imageAsset.spokenLanguageIds ?? []).includes(spokenLanguage.id),
    )
    .map((imageAsset) => imageAsset.id);

const resolveImageAssetLabel = (
  imageAssetId: string,
  imageAssetMap: Map<string, ImageAssetRecord>,
): string => {
  const imageAsset = imageAssetMap.get(imageAssetId);

  return imageAsset ? resolveSpokenLanguageImageAssetLabel(imageAsset) : imageAssetId;
};

export const buildSpokenLanguageImageAssetOptions = (
  imageAssets: readonly ImageAssetRecord[],
): readonly SpokenLanguageImageAssetOptionViewModel[] =>
  [...imageAssets]
    .map(createSpokenLanguageImageAssetOptionViewModel)
    .sort(sortCatalogOptions);

export const normalizeSpokenLanguageImageAssetIds = (
  spokenLanguage: SpokenLanguageRecord,
  imageAssets: readonly ImageAssetRecord[],
): readonly string[] => {
  const imageAssetIds = new Set<string>();

  for (const imageAssetId of spokenLanguage.imageAssetIds ?? []) {
    appendUnique(imageAssetIds, imageAssetId);
  }

  for (const relation of spokenLanguage.imageAssets ?? []) {
    appendUnique(imageAssetIds, resolveSpokenLanguageImageAssetIdFromRelation(relation));
  }

  for (const imageAssetId of resolveSpokenLanguageImageAssetIdsFromCatalog(
    spokenLanguage,
    imageAssets,
  )) {
    appendUnique(imageAssetIds, imageAssetId);
  }

  return [...imageAssetIds];
};

export const buildSpokenLanguagesFormValue = (
  spokenLanguage: SpokenLanguageRecord | null | undefined,
  imageAssets: readonly ImageAssetRecord[],
): SpokenLanguagesOperationsFormValue => {
  if (!spokenLanguage) {
    return createEmptySpokenLanguagesOperationsFormValue();
  }

  return {
    code: spokenLanguage.code,
    namePt: spokenLanguage.namePt,
    nameEn: spokenLanguage.nameEn,
    proficiency:
      (spokenLanguage.proficiency?.toUpperCase() as SpokenLanguagesOperationsFormValue['proficiency']) ??
      '',
    highlight: spokenLanguage.highlight ?? false,
    sortOrder: String(spokenLanguage.sortOrder ?? 0),
    imageAssetIds: normalizeSpokenLanguageImageAssetIds(spokenLanguage, imageAssets),
  };
};

export const buildSpokenLanguagesViewModels = (
  spokenLanguages: readonly SpokenLanguageRecord[],
  imageAssets: readonly ImageAssetRecord[],
): readonly SpokenLanguageOperationsViewModel[] => {
  const imageAssetMap = createImageAssetMap(imageAssets);

  return [...spokenLanguages]
    .sort((left, right) => {
      const leftSortOrder = left.sortOrder ?? Number.MAX_SAFE_INTEGER;
      const rightSortOrder = right.sortOrder ?? Number.MAX_SAFE_INTEGER;

      if (leftSortOrder !== rightSortOrder) {
        return leftSortOrder - rightSortOrder;
      }

      return left.code.localeCompare(right.code);
    })
    .map((spokenLanguage) => {
      const imageAssetIds = normalizeSpokenLanguageImageAssetIds(
        spokenLanguage,
        imageAssets,
      );

      return {
        id: spokenLanguage.id,
        code: spokenLanguage.code,
        namePt: spokenLanguage.namePt,
        nameEn: spokenLanguage.nameEn,
        proficiency: spokenLanguage.proficiency?.toUpperCase() ?? '',
        highlight: spokenLanguage.highlight ?? false,
        sortOrderLabel: String(spokenLanguage.sortOrder ?? 0),
        imageAssetLabels: imageAssetIds.map((imageAssetId) =>
          resolveImageAssetLabel(imageAssetId, imageAssetMap),
        ),
        imageAssetIds,
      };
    });
};

export const buildSpokenLanguagesMutationPayload = (
  formValue: SpokenLanguagesOperationsFormValue,
): SpokenLanguagesMutationBuildResult => {
  const code = formValue.code.trim();
  const namePt = formValue.namePt.trim();
  const nameEn = formValue.nameEn.trim();
  const proficiency = formValue.proficiency.trim().toUpperCase();
  const sortOrder = Number.parseInt(formValue.sortOrder.trim(), 10);

  if (!code) {
    return {
      isValid: false,
      errorKey: 'pages.admin.spokenLanguages.feedback.requiredCode',
    };
  }

  if (!namePt) {
    return {
      isValid: false,
      errorKey: 'pages.admin.spokenLanguages.feedback.requiredNamePt',
    };
  }

  if (!nameEn) {
    return {
      isValid: false,
      errorKey: 'pages.admin.spokenLanguages.feedback.requiredNameEn',
    };
  }

  if (!proficiency) {
    return {
      isValid: false,
      errorKey: 'pages.admin.spokenLanguages.feedback.requiredProficiency',
    };
  }

  if (
    !SPOKEN_LANGUAGE_PROFICIENCY_VALUES.includes(
      proficiency as (typeof SPOKEN_LANGUAGE_PROFICIENCY_VALUES)[number],
    )
  ) {
    return {
      isValid: false,
      errorKey: 'pages.admin.spokenLanguages.feedback.invalidProficiency',
    };
  }

  if (!Number.isInteger(sortOrder)) {
    return {
      isValid: false,
      errorKey: 'pages.admin.spokenLanguages.feedback.invalidSortOrder',
    };
  }

  return {
    isValid: true,
    payload: {
      code,
      namePt,
      nameEn,
      proficiency,
      highlight: formValue.highlight,
      sortOrder,
      imageAssetIds: [...new Set(formValue.imageAssetIds)],
    } satisfies SpokenLanguageMutationPayload,
  };
};
