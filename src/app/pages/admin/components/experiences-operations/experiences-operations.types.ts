import {
  ExperienceMutationPayload,
  ExperienceRecord,
  ExperienceRelationRecord,
} from '../../../../core/api/admin/experiences/experiences-operations.types';
import { ImageAssetRecord } from '../../../../core/api/admin/image-assets/image-assets-operations.types';
import { AdminFormFieldConfig } from '../../admin.types';
import {
  AdminImageAssetOptionViewModel,
  createAdminImageAssetOptionViewModel,
} from '../../helpers/admin.helper';
import { AppTranslationKey } from '../../../../core/translation/translation.types';

export type ExperiencesOperationsModalMode =
  | 'create'
  | 'read'
  | 'pick-update'
  | 'pick-delete'
  | 'update'
  | 'delete';

export interface ExperiencesOperationsFormValue {
  slug: string;
  companyName: string;
  titlePt: string;
  titleEn: string;
  summaryPt: string;
  summaryEn: string;
  descriptionPt: string;
  descriptionEn: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  highlight: boolean;
  sortOrder: string;
  technologyIds: readonly string[];
  projectIds: readonly string[];
  customerIds: readonly string[];
  jobIds: readonly string[];
  linkIds: readonly string[];
  imageAssetIds: readonly string[];
}

export const EXPERIENCES_OPERATIONS_FIELDS = {
  slug: {
    labelKey: 'pages.admin.experiences.fields.slug.label',
    placeholderKey: 'pages.admin.experiences.fields.slug.placeholder',
    required: true,
  },
  companyName: {
    labelKey: 'pages.admin.experiences.fields.companyName.label',
    placeholderKey: 'pages.admin.experiences.fields.companyName.placeholder',
    required: true,
  },
  titlePt: {
    labelKey: 'pages.admin.experiences.fields.titlePt.label',
    placeholderKey: 'pages.admin.experiences.fields.titlePt.placeholder',
    required: true,
  },
  titleEn: {
    labelKey: 'pages.admin.experiences.fields.titleEn.label',
    placeholderKey: 'pages.admin.experiences.fields.titleEn.placeholder',
    required: true,
  },
  summaryPt: {
    labelKey: 'pages.admin.experiences.fields.summaryPt.label',
    placeholderKey: 'pages.admin.experiences.fields.summaryPt.placeholder',
    required: true,
  },
  summaryEn: {
    labelKey: 'pages.admin.experiences.fields.summaryEn.label',
    placeholderKey: 'pages.admin.experiences.fields.summaryEn.placeholder',
    required: true,
  },
  descriptionPt: {
    labelKey: 'pages.admin.experiences.fields.descriptionPt.label',
    placeholderKey: 'pages.admin.experiences.fields.descriptionPt.placeholder',
    required: true,
  },
  descriptionEn: {
    labelKey: 'pages.admin.experiences.fields.descriptionEn.label',
    placeholderKey: 'pages.admin.experiences.fields.descriptionEn.placeholder',
    required: true,
  },
  startDate: {
    labelKey: 'pages.admin.experiences.fields.startDate.label',
    placeholderKey: 'pages.admin.experiences.fields.startDate.placeholder',
    required: true,
  },
  endDate: {
    labelKey: 'pages.admin.experiences.fields.endDate.label',
    placeholderKey: 'pages.admin.experiences.fields.endDate.placeholder',
  },
  sortOrder: {
    labelKey: 'pages.admin.experiences.fields.sortOrder.label',
    placeholderKey: 'pages.admin.experiences.fields.sortOrder.placeholder',
    required: true,
  },
} as const satisfies Record<string, AdminFormFieldConfig>;

export interface ExperienceOption {
  id: string;
  title: string;
  subtitle: string;
}
export type ExperienceImageAssetOption = AdminImageAssetOptionViewModel;

export interface ExperienceOperationsViewModel extends ExperiencesOperationsFormValue {
  id: string;
  sortOrderLabel: string;
  relationLabels: readonly string[];
  imageAssetLabels: readonly string[];
}

export type ExperiencesMutationBuildResult =
  | { isValid: true; payload: ExperienceMutationPayload }
  | { isValid: false; errorKey: AppTranslationKey };

export const createEmptyExperiencesOperationsFormValue = (): ExperiencesOperationsFormValue => ({
  slug: '',
  companyName: '',
  titlePt: '',
  titleEn: '',
  summaryPt: '',
  summaryEn: '',
  descriptionPt: '',
  descriptionEn: '',
  startDate: '',
  endDate: '',
  isCurrent: false,
  highlight: true,
  sortOrder: '0',
  technologyIds: [],
  projectIds: [],
  customerIds: [],
  jobIds: [],
  linkIds: [],
  imageAssetIds: [],
});

export const createExperienceImageAssetOption = (
  item: ImageAssetRecord,
): ExperienceImageAssetOption => createAdminImageAssetOptionViewModel(item);
type ExperienceRelationKey = 'technology' | 'project' | 'customer' | 'job' | 'link' | 'imageAsset';
const EXPERIENCE_RELATION_KEYS: Record<
  ExperienceRelationKey,
  { direct: keyof ExperienceRecord; nested: keyof ExperienceRelationRecord }
> = {
  technology: { direct: 'technologyRelations', nested: 'technology' },
  project: { direct: 'projectIds', nested: 'project' },
  customer: { direct: 'customerIds', nested: 'customer' },
  job: { direct: 'jobIds', nested: 'job' },
  link: { direct: 'linkIds', nested: 'link' },
  imageAsset: { direct: 'imageAssetIds', nested: 'imageAsset' },
};

export const relationId = (
  relation: ExperienceRelationRecord,
  key: 'technologyId' | 'projectId' | 'customerId' | 'jobId' | 'linkId' | 'imageAssetId',
): string | null => {
  const relationName = key.replace('Id', '') as ExperienceRelationKey;
  const direct = relation[key];
  const nested = relation[EXPERIENCE_RELATION_KEYS[relationName].nested] as
    | { id?: string }
    | null
    | undefined;
  return direct || nested?.id || null;
};

export const normalizeRelationIds = (
  record: ExperienceRecord,
  key: 'technologyId' | 'projectId' | 'customerId' | 'jobId' | 'linkId' | 'imageAssetId',
): readonly string[] => {
  const relationName = key.replace('Id', '') as ExperienceRelationKey;
  const direct = record[EXPERIENCE_RELATION_KEYS[relationName].direct];
  const values = Array.isArray(direct)
    ? direct.filter((value): value is string => typeof value === 'string')
    : [];
  const nestedCollections: Partial<Record<ExperienceRelationKey, unknown>> = {
    technology: record.technologyRelations,
    project: record.projects,
    customer: record.customers,
    job: record.jobs,
    link: record.links,
    imageAsset: record.imageAssets,
  };
  const relations = (
    Array.isArray(nestedCollections[relationName]) ? nestedCollections[relationName] : []
  ) as ExperienceRelationRecord[];
  return [
    ...new Set([
      ...values,
      ...relations.map((item) => relationId(item, key)).filter((value): value is string => !!value),
    ]),
  ];
};

export const buildExperiencesFormValue = (
  record: ExperienceRecord | null | undefined,
): ExperiencesOperationsFormValue =>
  record
    ? {
        slug: record.slug,
        companyName: record.companyName,
        titlePt: record.titlePt,
        titleEn: record.titleEn,
        summaryPt: record.summaryPt,
        summaryEn: record.summaryEn,
        descriptionPt: record.descriptionPt,
        descriptionEn: record.descriptionEn,
        startDate: record.startDate,
        endDate: record.endDate ?? '',
        isCurrent: record.isCurrent ?? false,
        highlight: record.highlight ?? false,
        sortOrder: String(record.sortOrder ?? 0),
        technologyIds: normalizeRelationIds(record, 'technologyId'),
        projectIds: normalizeRelationIds(record, 'projectId'),
        customerIds: normalizeRelationIds(record, 'customerId'),
        jobIds: normalizeRelationIds(record, 'jobId'),
        linkIds: normalizeRelationIds(record, 'linkId'),
        imageAssetIds: normalizeRelationIds(record, 'imageAssetId'),
      }
    : createEmptyExperiencesOperationsFormValue();

export const buildExperiencesMutationPayload = (
  form: ExperiencesOperationsFormValue,
): ExperiencesMutationBuildResult => {
  const required = [
    'slug',
    'companyName',
    'titlePt',
    'titleEn',
    'summaryPt',
    'summaryEn',
    'descriptionPt',
    'descriptionEn',
  ] as const;
  for (const key of required)
    if (!form[key].trim())
      return {
        isValid: false,
        errorKey:
          `pages.admin.experiences.feedback.required${key[0].toUpperCase()}${key.slice(1)}` as AppTranslationKey,
      };
  const sortOrder = Number.parseInt(form.sortOrder.trim(), 10);
  if (!Number.isInteger(sortOrder))
    return { isValid: false, errorKey: 'pages.admin.experiences.feedback.invalidSortOrder' };
  if (!form.startDate.trim())
    return { isValid: false, errorKey: 'pages.admin.experiences.feedback.requiredStartDate' };
  return {
    isValid: true,
    payload: {
      slug: form.slug.trim(),
      companyName: form.companyName.trim(),
      titlePt: form.titlePt.trim(),
      titleEn: form.titleEn.trim(),
      summaryPt: form.summaryPt.trim(),
      summaryEn: form.summaryEn.trim(),
      descriptionPt: form.descriptionPt.trim(),
      descriptionEn: form.descriptionEn.trim(),
      startDate: form.startDate,
      endDate: form.endDate || undefined,
      isCurrent: form.isCurrent,
      highlight: form.highlight,
      sortOrder,
      technologyRelations: form.technologyIds.map((technologyId) => ({ technologyId })),
      projectIds: [...new Set(form.projectIds)],
      customerIds: [...new Set(form.customerIds)],
      jobIds: [...new Set(form.jobIds)],
      linkIds: [...new Set(form.linkIds)],
      imageAssetIds: [...new Set(form.imageAssetIds)],
    },
  };
};
