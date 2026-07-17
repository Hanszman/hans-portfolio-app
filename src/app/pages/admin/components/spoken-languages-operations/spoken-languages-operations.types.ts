import { ImageAssetRecord } from '../../../../core/api/admin/image-assets/image-assets-operations.types';
import {
  SpokenLanguageImageAssetRelationRecord,
  SpokenLanguageMutationPayload,
} from '../../../../core/api/admin/spoken-languages/spoken-languages-operations.types';
import { AppTranslationKey } from '../../../../core/translation/translation.types';
import { AdminFormFieldConfig } from '../../admin.types';

export const SPOKEN_LANGUAGE_PROFICIENCY_VALUES = [
  'NATIVE',
  'FLUENT',
  'ADVANCED',
  'INTERMEDIATE',
  'BASIC',
] as const;

export type SpokenLanguageProficiencyValue =
  (typeof SPOKEN_LANGUAGE_PROFICIENCY_VALUES)[number];

export type SpokenLanguagesOperationsModalMode =
  | 'create'
  | 'read'
  | 'pick-update'
  | 'pick-delete'
  | 'update'
  | 'delete';

export interface SpokenLanguagesOperationsFormValue {
  code: string;
  namePt: string;
  nameEn: string;
  proficiency: SpokenLanguageProficiencyValue | '';
  highlight: boolean;
  sortOrder: string;
  imageAssetIds: readonly string[];
}

export const SPOKEN_LANGUAGES_OPERATIONS_FIELDS = {
  code: {
    labelKey: 'pages.admin.spokenLanguages.fields.code.label',
    placeholderKey: 'pages.admin.spokenLanguages.fields.code.placeholder',
    required: true,
  },
  namePt: {
    labelKey: 'pages.admin.spokenLanguages.fields.namePt.label',
    placeholderKey: 'pages.admin.spokenLanguages.fields.namePt.placeholder',
    required: true,
  },
  nameEn: {
    labelKey: 'pages.admin.spokenLanguages.fields.nameEn.label',
    placeholderKey: 'pages.admin.spokenLanguages.fields.nameEn.placeholder',
    required: true,
  },
  proficiency: {
    labelKey: 'pages.admin.spokenLanguages.fields.proficiency.label',
    required: true,
  },
  sortOrder: {
    labelKey: 'pages.admin.spokenLanguages.fields.sortOrder.label',
    placeholderKey: 'pages.admin.spokenLanguages.fields.sortOrder.placeholder',
    required: true,
  },
} as const satisfies Record<string, AdminFormFieldConfig>;

export interface SpokenLanguageImageAssetOptionViewModel {
  id: string;
  title: string;
  subtitle: string;
}

export interface SpokenLanguageProficiencyOptionViewModel {
  id: SpokenLanguageProficiencyValue;
  label: string;
  value: SpokenLanguageProficiencyValue;
}

export interface SpokenLanguageOperationsViewModel {
  id: string;
  code: string;
  namePt: string;
  nameEn: string;
  proficiency: string;
  highlight: boolean;
  sortOrderLabel: string;
  imageAssetLabels: readonly string[];
  imageAssetIds: readonly string[];
}

export interface SpokenLanguagesMutationBuildSuccess {
  isValid: true;
  payload: SpokenLanguageMutationPayload;
}

export interface SpokenLanguagesMutationBuildFailure {
  isValid: false;
  errorKey: AppTranslationKey;
}

export type SpokenLanguagesMutationBuildResult =
  | SpokenLanguagesMutationBuildSuccess
  | SpokenLanguagesMutationBuildFailure;

export const createEmptySpokenLanguagesOperationsFormValue =
  (): SpokenLanguagesOperationsFormValue => ({
    code: '',
    namePt: '',
    nameEn: '',
    proficiency: '',
    highlight: true,
    sortOrder: '0',
    imageAssetIds: [],
  });

export const createSpokenLanguageProficiencyOptions =
  (): readonly SpokenLanguageProficiencyOptionViewModel[] =>
    SPOKEN_LANGUAGE_PROFICIENCY_VALUES.map((value) => ({
      id: value,
      label: value,
      value,
    }));

export const createSpokenLanguageImageAssetOptionViewModel = (
  imageAsset: ImageAssetRecord,
): SpokenLanguageImageAssetOptionViewModel => ({
  id: imageAsset.id,
  title: imageAsset.fileName,
  subtitle: imageAsset.filePath,
});

export const resolveSpokenLanguageImageAssetIdFromRelation = (
  relation: SpokenLanguageImageAssetRelationRecord,
): string | null => relation.imageAssetId ?? relation.imageAsset?.id ?? null;

export const resolveSpokenLanguageImageAssetLabel = (
  imageAsset: ImageAssetRecord,
): string => `${imageAsset.fileName} (${imageAsset.kind})`;
