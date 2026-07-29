import {
  ProjectContext,
  ProjectEnvironment,
  ProjectMutationPayload,
  ProjectRecord,
  ProjectRelationRecord,
  ProjectStatus,
} from '../../../../core/api/admin/projects/projects-operations.types';
import { ImageAssetRecord } from '../../../../core/api/admin/image-assets/image-assets-operations.types';
import { AdminFormFieldConfig } from '../../admin.types';
import {
  AdminImageAssetOptionViewModel,
  createAdminImageAssetOptionViewModel,
  normalizeAdminDateValueForMutation,
  normalizeAdminDateValueForPicker,
  validateAdminDateRange,
} from '../../helpers/admin.helper';
import { AppTranslationKey } from '../../../../core/translation/translation.types';

export type ProjectsOperationsModalMode =
  | 'create'
  | 'read'
  | 'pick-update'
  | 'pick-delete'
  | 'update'
  | 'delete';

export interface ProjectsOperationsFormValue {
  slug: string;
  titlePt: string;
  titleEn: string;
  shortDescriptionPt: string;
  shortDescriptionEn: string;
  fullDescriptionPt: string;
  fullDescriptionEn: string;
  context: ProjectContext | '';
  status: ProjectStatus | '';
  environment: ProjectEnvironment | '';
  featured: boolean;
  highlight: boolean;
  startDate: string;
  endDate: string;
  sortOrder: string;
  technologyIds: readonly string[];
  experienceIds: readonly string[];
  tagIds: readonly string[];
  linkIds: readonly string[];
  imageAssetIds: readonly string[];
}

export const PROJECTS_OPERATIONS_FIELDS = {
  slug: {
    labelKey: 'pages.admin.projects.fields.slug.label',
    placeholderKey: 'pages.admin.projects.fields.slug.placeholder',
    required: true,
  },
  titlePt: {
    labelKey: 'pages.admin.projects.fields.titlePt.label',
    placeholderKey: 'pages.admin.projects.fields.titlePt.placeholder',
    required: true,
  },
  titleEn: {
    labelKey: 'pages.admin.projects.fields.titleEn.label',
    placeholderKey: 'pages.admin.projects.fields.titleEn.placeholder',
    required: true,
  },
  shortDescriptionPt: {
    labelKey: 'pages.admin.projects.fields.shortDescriptionPt.label',
    placeholderKey: 'pages.admin.projects.fields.shortDescriptionPt.placeholder',
    required: true,
  },
  shortDescriptionEn: {
    labelKey: 'pages.admin.projects.fields.shortDescriptionEn.label',
    placeholderKey: 'pages.admin.projects.fields.shortDescriptionEn.placeholder',
    required: true,
  },
  fullDescriptionPt: {
    labelKey: 'pages.admin.projects.fields.fullDescriptionPt.label',
    placeholderKey: 'pages.admin.projects.fields.fullDescriptionPt.placeholder',
    required: true,
  },
  fullDescriptionEn: {
    labelKey: 'pages.admin.projects.fields.fullDescriptionEn.label',
    placeholderKey: 'pages.admin.projects.fields.fullDescriptionEn.placeholder',
    required: true,
  },
  context: {
    labelKey: 'pages.admin.projects.fields.context.label',
    placeholderKey: 'pages.admin.projects.fields.context.placeholder',
    required: true,
  },
  status: {
    labelKey: 'pages.admin.projects.fields.status.label',
    placeholderKey: 'pages.admin.projects.fields.status.placeholder',
    required: true,
  },
  environment: {
    labelKey: 'pages.admin.projects.fields.environment.label',
    placeholderKey: 'pages.admin.projects.fields.environment.placeholder',
    required: true,
  },
  startDate: {
    labelKey: 'pages.admin.projects.fields.startDate.label',
    placeholderKey: 'pages.admin.projects.fields.startDate.placeholder',
  },
  endDate: {
    labelKey: 'pages.admin.projects.fields.endDate.label',
    placeholderKey: 'pages.admin.projects.fields.endDate.placeholder',
  },
  sortOrder: {
    labelKey: 'pages.admin.projects.fields.sortOrder.label',
    placeholderKey: 'pages.admin.projects.fields.sortOrder.placeholder',
    required: true,
  },
} as const satisfies Record<string, AdminFormFieldConfig>;

export const PROJECTS_OPERATIONS_FORM_FIELDS = [
  'slug',
  'titlePt',
  'titleEn',
  'shortDescriptionPt',
  'shortDescriptionEn',
  'fullDescriptionPt',
  'fullDescriptionEn',
  'sortOrder',
] as const;

export const PROJECT_CONTEXT_VALUES: ProjectContext[] = [
  'PROFESSIONAL',
  'PERSONAL',
  'ACADEMIC',
  'STUDY',
];

export const PROJECT_STATUS_VALUES: ProjectStatus[] = [
  'COMPLETED',
  'IN_PROGRESS',
  'ARCHIVED',
  'PLANNED',
];

export const PROJECT_ENVIRONMENT_VALUES: ProjectEnvironment[] = [
  'FRONTEND',
  'BACKEND',
  'FULLSTACK',
  'MOBILE',
  'LIBRARY',
  'DASHBOARD',
];

export interface ProjectOption {
  id: string;
  title: string;
  subtitle: string;
}

export type ProjectImageAssetOption = AdminImageAssetOptionViewModel;

export interface ProjectOperationsViewModel extends ProjectsOperationsFormValue {
  id: string;
  sortOrderLabel: string;
  relationLabels: readonly string[];
  imageAssetLabels: readonly string[];
}

export type ProjectsMutationBuildResult =
  | { isValid: true; payload: ProjectMutationPayload }
  | { isValid: false; errorKey: AppTranslationKey };

export const createEmptyProjectsOperationsFormValue = (): ProjectsOperationsFormValue => ({
  slug: '',
  titlePt: '',
  titleEn: '',
  shortDescriptionPt: '',
  shortDescriptionEn: '',
  fullDescriptionPt: '',
  fullDescriptionEn: '',
  context: '',
  status: '',
  environment: '',
  featured: false,
  highlight: true,
  startDate: '',
  endDate: '',
  sortOrder: '0',
  technologyIds: [],
  experienceIds: [],
  tagIds: [],
  linkIds: [],
  imageAssetIds: [],
});

export const createProjectImageAssetOption = (item: ImageAssetRecord): ProjectImageAssetOption =>
  createAdminImageAssetOptionViewModel(item);
type ProjectRelationKey = 'technology' | 'experience' | 'tag' | 'link' | 'imageAsset';
interface ProjectRelationConfig {
  readonly directIds: keyof ProjectRecord;
  readonly collections: readonly (keyof ProjectRecord)[];
  readonly relationId: keyof ProjectRelationRecord;
  readonly nested: keyof ProjectRelationRecord;
}

const PROJECT_RELATION_KEYS: Record<ProjectRelationKey, ProjectRelationConfig> = {
  technology: {
    directIds: 'technologyIds',
    collections: ['technologyRelations', 'technologies'],
    relationId: 'technologyId',
    nested: 'technology',
  },
  experience: {
    directIds: 'experienceIds',
    collections: ['experiences'],
    relationId: 'experienceId',
    nested: 'experience',
  },
  tag: {
    directIds: 'tagIds',
    collections: ['tags'],
    relationId: 'tagId',
    nested: 'tag',
  },
  link: {
    directIds: 'linkIds',
    collections: ['links'],
    relationId: 'linkId',
    nested: 'link',
  },
  imageAsset: {
    directIds: 'imageAssetIds',
    collections: ['imageAssets'],
    relationId: 'imageAssetId',
    nested: 'imageAsset',
  },
};

export const projectRelationId = (
  relation: ProjectRelationRecord,
  key: ProjectRelationKey,
): string | null => {
  const config = PROJECT_RELATION_KEYS[key];
  const direct = relation[config.relationId];
  const nested = relation[config.nested];

  return (
    (typeof direct === 'string' ? direct : null) ||
    (typeof nested === 'object' && nested ? nested.id : null) ||
    relation.id ||
    null
  );
};

export const normalizeProjectRelationIds = (
  record: ProjectRecord,
  key: ProjectRelationKey,
): readonly string[] => {
  const config = PROJECT_RELATION_KEYS[key];
  const direct = record[config.directIds];
  const relations = config.collections.reduce<unknown[]>((items, collectionKey) => {
    const collection = record[collectionKey];
    return Array.isArray(collection) ? [...items, ...collection] : items;
  }, []);
  return [
    ...new Set([
      ...(Array.isArray(direct) ? direct.filter((v): v is string => typeof v === 'string') : []),
      ...relations
        .map((relation) =>
          typeof relation === 'string'
            ? relation
            : projectRelationId(relation as ProjectRelationRecord, key),
        )
        .filter((value): value is string => !!value),
    ]),
  ];
};

export const buildProjectsFormValue = (
  record: ProjectRecord | null | undefined,
): ProjectsOperationsFormValue =>
  record
    ? {
        slug: record.slug,
        titlePt: record.titlePt,
        titleEn: record.titleEn,
        shortDescriptionPt: record.shortDescriptionPt,
        shortDescriptionEn: record.shortDescriptionEn,
        fullDescriptionPt: record.fullDescriptionPt,
        fullDescriptionEn: record.fullDescriptionEn,
        context: record.context,
        status: record.status,
        environment: record.environment,
        featured: record.featured ?? false,
        highlight: record.highlight ?? false,
        startDate: normalizeAdminDateValueForPicker(record.startDate),
        endDate: normalizeAdminDateValueForPicker(record.endDate),
        sortOrder: String(record.sortOrder ?? 0),
        technologyIds: normalizeProjectRelationIds(record, 'technology'),
        experienceIds: normalizeProjectRelationIds(record, 'experience'),
        tagIds: normalizeProjectRelationIds(record, 'tag'),
        linkIds: normalizeProjectRelationIds(record, 'link'),
        imageAssetIds: normalizeProjectRelationIds(record, 'imageAsset'),
      }
    : createEmptyProjectsOperationsFormValue();

export const buildProjectsMutationPayload = (
  form: ProjectsOperationsFormValue,
): ProjectsMutationBuildResult => {
  for (const key of [
    'slug',
    'titlePt',
    'titleEn',
    'shortDescriptionPt',
    'shortDescriptionEn',
    'fullDescriptionPt',
    'fullDescriptionEn',
  ] as const)
    if (!form[key].trim())
      return {
        isValid: false,
        errorKey:
          `pages.admin.projects.feedback.required${key[0].toUpperCase()}${key.slice(1)}` as AppTranslationKey,
      };
  const sortOrder = Number.parseInt(form.sortOrder.trim(), 10);
  if (!Number.isInteger(sortOrder))
    return { isValid: false, errorKey: 'pages.admin.projects.feedback.invalidSortOrder' };
  if (!form.context || !form.status || !form.environment)
    return { isValid: false, errorKey: 'pages.admin.projects.feedback.requiredOptions' };

  if (
    !PROJECT_CONTEXT_VALUES.includes(form.context) ||
    !PROJECT_STATUS_VALUES.includes(form.status) ||
    !PROJECT_ENVIRONMENT_VALUES.includes(form.environment)
  ) {
    return { isValid: false, errorKey: 'pages.admin.projects.feedback.requiredOptions' };
  }

  const dateRangeResult = validateAdminDateRange(
    form.startDate,
    form.endDate,
    'pages.admin.projects.feedback.invalidDateRange',
  );

  if (!dateRangeResult.isValid) {
    return dateRangeResult;
  }

  return {
    isValid: true,
    payload: {
      slug: form.slug.trim(),
      titlePt: form.titlePt.trim(),
      titleEn: form.titleEn.trim(),
      shortDescriptionPt: form.shortDescriptionPt.trim(),
      shortDescriptionEn: form.shortDescriptionEn.trim(),
      fullDescriptionPt: form.fullDescriptionPt.trim(),
      fullDescriptionEn: form.fullDescriptionEn.trim(),
      context: form.context,
      status: form.status,
      environment: form.environment,
      featured: form.featured,
      highlight: form.highlight,
      startDate: normalizeAdminDateValueForMutation(form.startDate) || undefined,
      endDate: normalizeAdminDateValueForMutation(form.endDate) || undefined,
      sortOrder,
      technologyRelations: [...new Set(form.technologyIds)].map((technologyId) => ({
        technologyId,
      })),
      experienceIds: [...new Set(form.experienceIds)],
      tagIds: [...new Set(form.tagIds)],
      linkIds: [...new Set(form.linkIds)],
      imageAssetIds: [...new Set(form.imageAssetIds)],
    },
  };
};
