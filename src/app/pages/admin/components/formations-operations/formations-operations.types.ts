import { ImageAssetRecord } from '../../../../core/api/image-assets/image-assets.types';
import {
  FormationImageAssetRelationRecord,
  FormationMutationPayload,
  FormationTechnologyRelationRecord,
} from '../../../../core/api/formations/formations.types';
import { TechnologyCollectionItemResponse } from '../../../../core/api/technologies/technologies.types';
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

export const FORMATION_DEGREE_TYPE_VALUES = [
  'TECHNICAL',
  'BACHELOR',
  'POSTGRADUATE',
  'MBA',
  'MASTER',
  'DOCTORATE',
  'BOOTCAMP',
  'CERTIFICATION',
  'COURSE',
  'OTHER',
] as const;

export type FormationDegreeTypeValue = (typeof FORMATION_DEGREE_TYPE_VALUES)[number];

export type FormationsOperationsModalMode =
  | 'create'
  | 'read'
  | 'pick-update'
  | 'pick-delete'
  | 'update'
  | 'delete';

export interface FormationsOperationsFormValue {
  slug: string;
  institution: string;
  titlePt: string;
  titleEn: string;
  titleEs?: string;
  degreeType: string;
  summaryPt: string;
  summaryEn: string;
  summaryEs?: string;
  startDate: string;
  endDate: string;
  highlight: boolean;
  sortOrder: string;
  technologyIds: readonly string[];
  imageAssetIds: readonly string[];
}

export const FORMATIONS_OPERATIONS_FIELDS = {
  slug: {
    labelKey: 'common.fields.slug',
    placeholderKey: 'pages.admin.formations.fields.slug.placeholder',
    required: true,
  },
  institution: {
    labelKey: 'common.fields.institution',
    placeholderKey: 'pages.admin.formations.fields.institution.placeholder',
    required: true,
  },
  titlePt: {
    labelKey: 'pages.admin.projects.fields.titlePt.label',
    placeholderKey: 'pages.admin.formations.fields.titlePt.placeholder',
    required: true,
  },
  titleEn: {
    labelKey: 'pages.admin.projects.fields.titleEn.label',
    placeholderKey: 'pages.admin.formations.fields.titleEn.placeholder',
    required: true,
  },
  titleEs: {
    labelKey: 'common.fields.spanishTitle',
    placeholderKey: 'pages.admin.formations.fields.titleEs.placeholder',
    required: true,
  },
  degreeType: {
    labelKey: 'common.fields.degreeType',
    required: true,
  },
  summaryPt: {
    labelKey: 'pages.admin.jobs.fields.summaryPt.label',
    placeholderKey: 'pages.admin.formations.fields.summaryPt.placeholder',
    required: true,
  },
  summaryEn: {
    labelKey: 'pages.admin.jobs.fields.summaryEn.label',
    placeholderKey: 'pages.admin.formations.fields.summaryEn.placeholder',
    required: true,
  },
  summaryEs: {
    labelKey: 'common.fields.spanishSummary',
    placeholderKey: 'common.placeholders.spanishSummary',
    required: true,
  },
  startDate: {
    labelKey: 'pages.admin.formations.fields.startDate.label',
    required: true,
  },
  endDate: {
    labelKey: 'pages.admin.formations.fields.endDate.label',
    required: false,
  },
  sortOrder: {
    labelKey: 'common.fields.sortOrder',
    placeholderKey: 'common.placeholders.integerSortOrder',
    required: true,
  },
} as const satisfies Record<string, AdminFormFieldConfig>;

export interface FormationTechnologyOptionViewModel {
  id: string;
  title: string;
  subtitle: string;
}

export type FormationImageAssetOptionViewModel = AdminImageAssetOptionViewModel;

export type FormationDegreeTypeOptionDefinition =
  AdminSelectOptionDefinition<FormationDegreeTypeValue>;

export type FormationDegreeTypeOptionViewModel =
  AdminSelectOptionViewModel<FormationDegreeTypeValue>;

export interface FormationOperationsViewModel {
  id: string;
  slug: string;
  institution: string;
  titlePt: string;
  titleEn: string;
  titleEs?: string;
  degreeType: string;
  summaryPt: string;
  summaryEn: string;
  summaryEs?: string;
  startDate: string;
  endDateLabel: string;
  highlight: boolean;
  sortOrderLabel: string;
  technologyLabels: readonly string[];
  imageAssetLabels: readonly string[];
  technologyIds: readonly string[];
  imageAssetIds: readonly string[];
}

export interface FormationsMutationBuildSuccess {
  isValid: true;
  payload: FormationMutationPayload;
}

export interface FormationsMutationBuildFailure {
  isValid: false;
  errorKey: AppTranslationKey;
}

export type FormationsMutationBuildResult =
  | FormationsMutationBuildSuccess
  | FormationsMutationBuildFailure;

export const createEmptyFormationsOperationsFormValue =
  (): FormationsOperationsFormValue => ({
    slug: '',
    institution: '',
    titlePt: '',
    titleEn: '',
    titleEs: '',
    degreeType: '',
    summaryPt: '',
    summaryEn: '',
    summaryEs: '',
    startDate: '',
    endDate: '',
    highlight: true,
    sortOrder: '0',
    technologyIds: [],
    imageAssetIds: [],
  });

export const createFormationDegreeTypeOptions =
  (): readonly FormationDegreeTypeOptionDefinition[] =>
    createAdminSelectOptionDefinitions(
      FORMATION_DEGREE_TYPE_VALUES,
      (value) =>
        value === 'OTHER'
          ? 'common.values.other'
          : (`pages.admin.formations.fields.degreeType.options.${value}` as AppTranslationKey),
    );

export const createFormationTechnologyOptionViewModel = (
  technology: TechnologyCollectionItemResponse,
): FormationTechnologyOptionViewModel => ({
  id: technology.id,
  title: technology.name,
  subtitle: technology.slug,
});

export const createFormationImageAssetOptionViewModel = (
  imageAsset: ImageAssetRecord,
): FormationImageAssetOptionViewModel => createAdminImageAssetOptionViewModel(imageAsset);

export const resolveFormationTechnologyIdFromRelation = (
  relation: FormationTechnologyRelationRecord,
): string | null =>
  relation.technologyId?.trim() || relation.technology?.id?.trim() || null;

export const resolveFormationImageAssetIdFromRelation = (
  relation: FormationImageAssetRelationRecord,
): string | null =>
  relation.imageAssetId?.trim() || relation.imageAsset?.id?.trim() || null;

export const resolveFormationImageAssetLabel = (imageAsset: ImageAssetRecord): string =>
  resolveAdminImageAssetLabel(imageAsset);
