import { ImageAssetRecord } from '../../../../core/api/image-assets/image-assets.types';
import {
  JobExperienceRelationRecord,
  JobImageAssetRelationRecord,
  JobMutationPayload,
} from '../../../../core/api/jobs/jobs.types';
import { ExperienceCollectionItemResponse } from '../../../../core/api/experiences/experiences.types';
import { AppTranslationKey } from '../../../../core/translation/translation.types';
import { AdminFormFieldConfig } from '../../admin.types';
import {
  AdminImageAssetOptionViewModel,
  createAdminImageAssetOptionViewModel,
  resolveAdminImageAssetLabel,
} from '../../helpers/admin.helper';

export type JobsOperationsModalMode =
  | 'create'
  | 'read'
  | 'pick-update'
  | 'pick-delete'
  | 'update'
  | 'delete';

export interface JobsOperationsFormValue {
  slug: string;
  namePt: string;
  nameEn: string;
  nameEs?: string;
  summaryPt: string;
  summaryEn: string;
  summaryEs?: string;
  startDate: string;
  endDate: string;
  highlight: boolean;
  sortOrder: string;
  experienceIds: readonly string[];
  imageAssetIds: readonly string[];
}

export const JOBS_OPERATIONS_FIELDS = {
  slug: {
    labelKey: 'common.fields.slug',
    placeholderKey: 'pages.admin.jobs.fields.slug.placeholder',
    required: true,
  },
  namePt: {
    labelKey: 'pages.admin.tags.fields.namePt.label',
    placeholderKey: 'pages.admin.jobs.fields.namePt.placeholder',
    required: true,
  },
  nameEn: {
    labelKey: 'pages.admin.tags.fields.nameEn.label',
    placeholderKey: 'pages.admin.jobs.fields.nameEn.placeholder',
    required: true,
  },
  nameEs: {
    labelKey: 'common.fields.spanishName',
    placeholderKey: 'pages.admin.jobs.fields.nameEs.placeholder',
    required: true,
  },
  summaryPt: {
    labelKey: 'pages.admin.jobs.fields.summaryPt.label',
    placeholderKey: 'pages.admin.jobs.fields.summaryPt.placeholder',
    required: false,
    multiline: true,
  },
  summaryEn: {
    labelKey: 'pages.admin.jobs.fields.summaryEn.label',
    placeholderKey: 'pages.admin.jobs.fields.summaryEn.placeholder',
    required: false,
    multiline: true,
  },
  summaryEs: {
    labelKey: 'common.fields.spanishSummary',
    placeholderKey: 'pages.admin.jobs.fields.summaryEs.placeholder',
    required: false,
    multiline: true,
  },
  startDate: {
    labelKey: 'common.fields.startDate',
    placeholderKey: 'common.fields.startDate',
    required: true,
  },
  endDate: {
    labelKey: 'common.fields.endDate',
    placeholderKey: 'common.fields.endDate',
    required: false,
  },
  sortOrder: {
    labelKey: 'common.fields.sortOrder',
    placeholderKey: 'common.placeholders.integerSortOrder',
    required: true,
  },
} as const satisfies Record<string, AdminFormFieldConfig>;

export interface JobExperienceOptionViewModel {
  id: string;
  title: string;
  subtitle: string;
}

export type JobImageAssetOptionViewModel = AdminImageAssetOptionViewModel;

export interface JobOperationsViewModel {
  id: string;
  slug: string;
  namePt: string;
  nameEn: string;
  nameEs?: string;
  summaryPt: string;
  summaryEn: string;
  summaryEs?: string;
  startDate: string;
  endDateLabel: string;
  highlight: boolean;
  sortOrderLabel: string;
  experienceLabels: readonly string[];
  imageAssetLabels: readonly string[];
  experienceIds: readonly string[];
  imageAssetIds: readonly string[];
}

export interface JobsMutationBuildSuccess {
  isValid: true;
  payload: JobMutationPayload;
}

export interface JobsMutationBuildFailure {
  isValid: false;
  errorKey: AppTranslationKey;
}

export type JobsMutationBuildResult = JobsMutationBuildSuccess | JobsMutationBuildFailure;

export const createEmptyJobsOperationsFormValue = (): JobsOperationsFormValue => ({
  slug: '',
  namePt: '',
  nameEn: '',
  nameEs: '',
  summaryPt: '',
  summaryEn: '',
  summaryEs: '',
  startDate: '',
  endDate: '',
  highlight: true,
  sortOrder: '0',
  experienceIds: [],
  imageAssetIds: [],
});

export const createJobExperienceOptionViewModel = (
  experience: ExperienceCollectionItemResponse,
): JobExperienceOptionViewModel => ({
  id: experience.id,
  title: experience.titlePt,
  subtitle: experience.companyName,
});

export const createJobImageAssetOptionViewModel = (
  imageAsset: ImageAssetRecord,
): JobImageAssetOptionViewModel => createAdminImageAssetOptionViewModel(imageAsset);

export const resolveJobExperienceIdFromRelation = (
  relation: JobExperienceRelationRecord,
): string | null => relation.experienceId || relation.experience?.id || null;

export const resolveJobImageAssetIdFromRelation = (
  relation: JobImageAssetRelationRecord,
): string | null => relation.imageAssetId || relation.imageAsset?.id || null;

export const resolveJobImageAssetLabel = (imageAsset: ImageAssetRecord): string =>
  resolveAdminImageAssetLabel(imageAsset);
