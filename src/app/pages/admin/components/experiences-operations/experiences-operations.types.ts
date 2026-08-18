import {
  ExperienceMutationPayload,
  ExperienceRecord,
  ExperienceRelationRecord,
} from '../../../../core/api/experiences/experiences.types';
import { ImageAssetRecord } from '../../../../core/api/image-assets/image-assets.types';
import { AdminFormFieldConfig } from '../../admin.types';
import {
  AdminImageAssetOptionViewModel,
  createAdminImageAssetOptionViewModel,
  normalizeAdminDateValueForMutation,
  normalizeAdminDateValueForPicker,
  validateAdminDateRange,
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
  titleEs?: string;
  summaryPt: string;
  summaryEn: string;
  summaryEs?: string;
  descriptionPt: string;
  descriptionEn: string;
  descriptionEs?: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  highlight: boolean;
  sortOrder: string;
  technologyIds: readonly string[];
  projectIds: readonly string[];
  customerIds: readonly string[];
  jobIds: readonly string[];
  imageAssetIds: readonly string[];
}

export const EXPERIENCES_OPERATIONS_FIELDS = {
  slug: {
    labelKey: 'common.fields.slug',
    placeholderKey: 'pages.admin.experiences.fields.slug.placeholder',
    required: true,
  },
  companyName: {
    labelKey: 'pages.admin.experiences.fields.companyName.label',
    placeholderKey: 'pages.admin.experiences.fields.companyName.placeholder',
    required: true,
  },
  titlePt: {
    labelKey: 'pages.admin.projects.fields.titlePt.label',
    placeholderKey: 'pages.admin.experiences.fields.titlePt.placeholder',
    required: true,
  },
  titleEn: {
    labelKey: 'pages.admin.projects.fields.titleEn.label',
    placeholderKey: 'pages.admin.experiences.fields.titleEn.placeholder',
    required: true,
  },
  titleEs: {
    labelKey: 'common.fields.spanishTitle',
    placeholderKey: 'pages.admin.experiences.fields.titleEs.placeholder',
    required: true,
  },
  summaryPt: {
    labelKey: 'pages.admin.jobs.fields.summaryPt.label',
    placeholderKey: 'pages.admin.experiences.fields.summaryPt.placeholder',
    required: true,
    multiline: true,
  },
  summaryEn: {
    labelKey: 'pages.admin.jobs.fields.summaryEn.label',
    placeholderKey: 'pages.admin.experiences.fields.summaryEn.placeholder',
    required: true,
    multiline: true,
  },
  summaryEs: {
    labelKey: 'common.fields.spanishSummary',
    placeholderKey: 'common.placeholders.spanishSummary',
    required: true,
    multiline: true,
  },
  descriptionPt: {
    labelKey: 'pages.admin.links.fields.descriptionPt.label',
    placeholderKey: 'pages.admin.experiences.fields.descriptionPt.placeholder',
    required: true,
    multiline: true,
  },
  descriptionEn: {
    labelKey: 'pages.admin.links.fields.descriptionEn.label',
    placeholderKey: 'pages.admin.experiences.fields.descriptionEn.placeholder',
    required: true,
    multiline: true,
  },
  descriptionEs: {
    labelKey: 'common.fields.spanishDescription',
    placeholderKey: 'pages.admin.experiences.fields.descriptionEs.placeholder',
    required: true,
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
    placeholderKey: 'common.placeholders.displayOrder',
    required: true,
  },
} as const satisfies Record<string, AdminFormFieldConfig>;

export const EXPERIENCES_OPERATIONS_FORM_FIELDS = [
  'slug',
  'companyName',
  'titlePt',
  'titleEn',
  'titleEs',
  'summaryPt',
  'summaryEn',
  'summaryEs',
  'descriptionPt',
  'descriptionEn',
  'descriptionEs',
  'sortOrder',
] as const;

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
  titleEs: '',
  summaryPt: '',
  summaryEn: '',
  summaryEs: '',
  descriptionPt: '',
  descriptionEn: '',
  descriptionEs: '',
  startDate: '',
  endDate: '',
  isCurrent: false,
  highlight: true,
  sortOrder: '0',
  technologyIds: [],
  projectIds: [],
  customerIds: [],
  jobIds: [],
  imageAssetIds: [],
});

export const createExperienceImageAssetOption = (
  item: ImageAssetRecord,
): ExperienceImageAssetOption => createAdminImageAssetOptionViewModel(item);
type ExperienceRelationKey = 'technology' | 'project' | 'customer' | 'job' | 'imageAsset';

interface ExperienceRelationConfig {
  readonly directIds: keyof ExperienceRecord;
  readonly collections: readonly (keyof ExperienceRecord)[];
  readonly nested: keyof ExperienceRelationRecord;
}

const EXPERIENCE_RELATION_KEYS: Record<ExperienceRelationKey, ExperienceRelationConfig> = {
  technology: {
    directIds: 'technologyIds',
    collections: ['technologyRelations', 'technologies'],
    nested: 'technology',
  },
  project: {
    directIds: 'projectIds',
    collections: ['projects'],
    nested: 'project',
  },
  customer: {
    directIds: 'customerIds',
    collections: ['customers'],
    nested: 'customer',
  },
  job: { directIds: 'jobIds', collections: ['jobs'], nested: 'job' },
  imageAsset: {
    directIds: 'imageAssetIds',
    collections: ['imageAssets'],
    nested: 'imageAsset',
  },
};

export const relationId = (
  relation: ExperienceRelationRecord,
  key: 'technologyId' | 'projectId' | 'customerId' | 'jobId' | 'imageAssetId',
): string | null => {
  const relationName = key.replace('Id', '') as ExperienceRelationKey;
  const direct = relation[key];
  const nested = relation[EXPERIENCE_RELATION_KEYS[relationName].nested] as
    | { id?: string }
    | null
    | undefined;
  return direct || nested?.id || relation.id || null;
};

export const normalizeRelationIds = (
  record: ExperienceRecord,
  key: 'technologyId' | 'projectId' | 'customerId' | 'jobId' | 'imageAssetId',
): readonly string[] => {
  const relationName = key.replace('Id', '') as ExperienceRelationKey;
  const config = EXPERIENCE_RELATION_KEYS[relationName];
  const direct = record[config.directIds];
  const values = Array.isArray(direct)
    ? direct.filter((value): value is string => typeof value === 'string')
    : [];
  const relations = config.collections.reduce<unknown[]>((items, collectionKey) => {
    const collection = record[collectionKey];
    return Array.isArray(collection) ? [...items, ...collection] : items;
  }, []);
  return [
    ...new Set([
      ...values,
      ...relations
        .map((item) =>
          typeof item === 'string' ? item : relationId(item as ExperienceRelationRecord, key),
        )
        .filter((value): value is string => !!value),
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
        titleEs: record.titleEs ?? '',
        summaryPt: record.summaryPt,
        summaryEn: record.summaryEn,
        summaryEs: record.summaryEs ?? '',
        descriptionPt: record.descriptionPt,
        descriptionEn: record.descriptionEn,
        descriptionEs: record.descriptionEs ?? '',
        startDate: normalizeAdminDateValueForPicker(record.startDate),
        endDate: normalizeAdminDateValueForPicker(record.endDate),
        isCurrent: record.isCurrent ?? false,
        highlight: record.highlight ?? false,
        sortOrder: String(record.sortOrder ?? 0),
        technologyIds: normalizeRelationIds(record, 'technologyId'),
        projectIds: normalizeRelationIds(record, 'projectId'),
        customerIds: normalizeRelationIds(record, 'customerId'),
        jobIds: normalizeRelationIds(record, 'jobId'),
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
    'titleEs',
    'summaryPt',
    'summaryEn',
    'summaryEs',
    'descriptionPt',
    'descriptionEn',
    'descriptionEs',
  ] as const;
  for (const key of required)
    if (!form[key]?.trim())
      return {
        isValid: false,
        errorKey:
          `pages.admin.experiences.feedback.required${key[0].toUpperCase()}${key.slice(1)}` as AppTranslationKey,
      };
  const sortOrder = Number.parseInt(form.sortOrder.trim(), 10);
  if (!Number.isInteger(sortOrder))
    return { isValid: false, errorKey: 'common.feedback.invalidSortOrder' };
  if (!form.startDate.trim())
    return { isValid: false, errorKey: 'pages.admin.experiences.feedback.requiredStartDate' };

  const dateRangeResult = validateAdminDateRange(
    form.startDate,
    form.endDate,
    'common.feedback.invalidDateRange',
  );

  if (!dateRangeResult.isValid) {
    return dateRangeResult;
  }

  return {
    isValid: true,
    payload: {
      slug: form.slug.trim(),
      companyName: form.companyName.trim(),
      titlePt: form.titlePt.trim(),
      titleEn: form.titleEn.trim(),
      titleEs: form.titleEs!.trim(),
      summaryPt: form.summaryPt.trim(),
      summaryEn: form.summaryEn.trim(),
      summaryEs: form.summaryEs!.trim(),
      descriptionPt: form.descriptionPt.trim(),
      descriptionEn: form.descriptionEn.trim(),
      descriptionEs: form.descriptionEs!.trim(),
      startDate: normalizeAdminDateValueForMutation(form.startDate),
      endDate: normalizeAdminDateValueForMutation(form.endDate) || undefined,
      isCurrent: form.isCurrent,
      highlight: form.highlight,
      sortOrder,
      technologyRelations: [...new Set(form.technologyIds)].map((technologyId) => ({
        technologyId,
      })),
      projectIds: [...new Set(form.projectIds)],
      customerIds: [...new Set(form.customerIds)],
      jobIds: [...new Set(form.jobIds)],
      imageAssetIds: [...new Set(form.imageAssetIds)],
    },
  };
};
