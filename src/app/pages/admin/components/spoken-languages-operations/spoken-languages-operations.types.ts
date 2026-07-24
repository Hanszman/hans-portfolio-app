import { ImageAssetRecord } from '../../../../core/api/admin/image-assets/image-assets-operations.types';
import {
  SpokenLanguageImageAssetRelationRecord,
  SpokenLanguageMutationPayload,
} from '../../../../core/api/admin/spoken-languages/spoken-languages-operations.types';
import { AppTranslationKey } from '../../../../core/translation/translation.types';
import { AdminFormFieldConfig } from '../../admin.types';
import {
  AdminImageAssetOptionViewModel,
  AdminSelectOptionDefinition,
  AdminSelectOptionViewModel,
  createAdminSelectOptionDefinitions,
  createAdminImageAssetOptionViewModel,
  resolveAdminImageAssetLabel,
} from '../../helpers/admin.helper';

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

export type SpokenLanguageImageAssetOptionViewModel = AdminImageAssetOptionViewModel;

export type SpokenLanguageProficiencyOptionDefinition =
  AdminSelectOptionDefinition<SpokenLanguageProficiencyValue>;

export type SpokenLanguageProficiencyOptionViewModel =
  AdminSelectOptionViewModel<SpokenLanguageProficiencyValue>;

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
  (): readonly SpokenLanguageProficiencyOptionDefinition[] =>
    createAdminSelectOptionDefinitions(
      SPOKEN_LANGUAGE_PROFICIENCY_VALUES,
      (value) =>
        `pages.admin.spokenLanguages.fields.proficiency.options.${value}` as AppTranslationKey,
    );

export const createSpokenLanguageImageAssetOptionViewModel = (
  imageAsset: ImageAssetRecord,
): SpokenLanguageImageAssetOptionViewModel =>
  createAdminImageAssetOptionViewModel(imageAsset);

export const resolveSpokenLanguageImageAssetIdFromRelation = (
  relation: SpokenLanguageImageAssetRelationRecord,
): string | null => relation.imageAssetId ?? relation.imageAsset?.id ?? null;

export const resolveSpokenLanguageImageAssetLabel = (
  imageAsset: ImageAssetRecord,
): string => resolveAdminImageAssetLabel(imageAsset);
