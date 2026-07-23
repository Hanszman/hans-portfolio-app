import { ImageAssetRecord } from '../../../../core/api/admin/image-assets/image-assets-operations.types';
import {
  FormationImageAssetRelationRecord,
  FormationLinkRelationRecord,
  FormationMutationPayload,
  FormationTechnologyRelationRecord,
} from '../../../../core/api/admin/formations/formations-operations.types';
import { LinkRecord } from '../../../../core/api/admin/links/links-operations.types';
import { TechnologyCollectionItemResponse } from '../../../../core/api/technologies/technologies.types';
import { AppTranslationKey } from '../../../../core/translation/translation.types';
import { AdminFormFieldConfig } from '../../admin.types';
import {
  AdminImageAssetOptionViewModel,
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
  degreeType: string;
  summaryPt: string;
  summaryEn: string;
  startDate: string;
  endDate: string;
  highlight: boolean;
  sortOrder: string;
  technologyIds: readonly string[];
  linkIds: readonly string[];
  imageAssetIds: readonly string[];
}

export const FORMATIONS_OPERATIONS_FIELDS = {
  slug: {
    labelKey: 'pages.admin.formations.fields.slug.label',
    placeholderKey: 'pages.admin.formations.fields.slug.placeholder',
    required: true,
  },
  institution: {
    labelKey: 'pages.admin.formations.fields.institution.label',
    placeholderKey: 'pages.admin.formations.fields.institution.placeholder',
    required: true,
  },
  titlePt: {
    labelKey: 'pages.admin.formations.fields.titlePt.label',
    placeholderKey: 'pages.admin.formations.fields.titlePt.placeholder',
    required: true,
  },
  titleEn: {
    labelKey: 'pages.admin.formations.fields.titleEn.label',
    placeholderKey: 'pages.admin.formations.fields.titleEn.placeholder',
    required: true,
  },
  degreeType: {
    labelKey: 'pages.admin.formations.fields.degreeType.label',
    required: true,
  },
  summaryPt: {
    labelKey: 'pages.admin.formations.fields.summaryPt.label',
    placeholderKey: 'pages.admin.formations.fields.summaryPt.placeholder',
    required: true,
  },
  summaryEn: {
    labelKey: 'pages.admin.formations.fields.summaryEn.label',
    placeholderKey: 'pages.admin.formations.fields.summaryEn.placeholder',
    required: true,
  },
  startDate: {
    labelKey: 'pages.admin.formations.fields.startDate.label',
    placeholderKey: 'pages.admin.formations.fields.startDate.placeholder',
    required: true,
  },
  endDate: {
    labelKey: 'pages.admin.formations.fields.endDate.label',
    placeholderKey: 'pages.admin.formations.fields.endDate.placeholder',
  },
  sortOrder: {
    labelKey: 'pages.admin.formations.fields.sortOrder.label',
    placeholderKey: 'pages.admin.formations.fields.sortOrder.placeholder',
    required: true,
  },
} as const satisfies Record<string, AdminFormFieldConfig>;

export interface FormationTechnologyOptionViewModel {
  id: string;
  title: string;
  subtitle: string;
}

export interface FormationLinkOptionViewModel {
  id: string;
  title: string;
  subtitle: string;
}

export type FormationImageAssetOptionViewModel = AdminImageAssetOptionViewModel;

export interface FormationDegreeTypeOptionViewModel {
  id: FormationDegreeTypeValue;
  label: AppTranslationKey;
  value: FormationDegreeTypeValue;
}

export interface FormationOperationsViewModel {
  id: string;
  slug: string;
  institution: string;
  titlePt: string;
  titleEn: string;
  degreeType: string;
  summaryPt: string;
  summaryEn: string;
  startDate: string;
  endDateLabel: string;
  highlight: boolean;
  sortOrderLabel: string;
  technologyLabels: readonly string[];
  linkLabels: readonly string[];
  imageAssetLabels: readonly string[];
  technologyIds: readonly string[];
  linkIds: readonly string[];
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

export const createFormationDegreeTypeOptions =
  (): readonly FormationDegreeTypeOptionViewModel[] =>
    FORMATION_DEGREE_TYPE_VALUES.map((value) => ({
      id: value,
      label: `pages.admin.formations.fields.degreeType.options.${value}` as AppTranslationKey,
      value,
    }));

export const createFormationTechnologyOptionViewModel = (
  technology: TechnologyCollectionItemResponse,
): FormationTechnologyOptionViewModel => ({
  id: technology.id,
  title: technology.name,
  subtitle: technology.slug,
});

export const createFormationLinkOptionViewModel = (
  link: LinkRecord,
): FormationLinkOptionViewModel => ({
  id: link.id,
  title: link.labelPt || link.labelEn || link.url,
  subtitle: link.url,
});

export const createFormationImageAssetOptionViewModel = (
  imageAsset: ImageAssetRecord,
): FormationImageAssetOptionViewModel => createAdminImageAssetOptionViewModel(imageAsset);

export const resolveFormationTechnologyIdFromRelation = (
  relation: FormationTechnologyRelationRecord,
): string | null =>
  relation.technologyId?.trim() || relation.technology?.id?.trim() || null;

export const resolveFormationLinkIdFromRelation = (
  relation: FormationLinkRelationRecord,
): string | null => relation.linkId?.trim() || relation.link?.id?.trim() || null;

export const resolveFormationImageAssetIdFromRelation = (
  relation: FormationImageAssetRelationRecord,
): string | null =>
  relation.imageAssetId?.trim() || relation.imageAsset?.id?.trim() || null;

export const resolveFormationImageAssetLabel = (imageAsset: ImageAssetRecord): string =>
  resolveAdminImageAssetLabel(imageAsset);
