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
  context: ProjectContext | string;
  status: ProjectStatus | string;
  environment: ProjectEnvironment | string;
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
  'context',
  'status',
  'environment',
  'sortOrder',
] as const;

export const PROJECT_CONTEXT_VALUES: ProjectContext[] = [
  'CLIENT',
  'PERSONAL',
  'ACADEMIC',
  'OPEN_SOURCE',
  'OTHER',
];

export const PROJECT_STATUS_VALUES: ProjectStatus[] = [
  'COMPLETED',
  'IN_PROGRESS',
  'ARCHIVED',
  'PLANNED',
];

export const PROJECT_ENVIRONMENT_VALUES: ProjectEnvironment[] = [
  'WEB',
  'MOBILE',
  'DESKTOP',
  'API',
  'OTHER',
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
const PROJECT_RELATION_KEYS: Record<
  ProjectRelationKey,
  { ids: string; relations: keyof ProjectRecord; id: keyof ProjectRelationRecord }
> = {
  technology: { ids: 'technologyIds', relations: 'technologyRelations', id: 'technologyId' },
  experience: { ids: 'experienceIds', relations: 'experiences', id: 'experienceId' },
  tag: { ids: 'tagIds', relations: 'tags', id: 'tagId' },
  link: { ids: 'linkIds', relations: 'links', id: 'linkId' },
  imageAsset: { ids: 'imageAssetIds', relations: 'imageAssets', id: 'imageAssetId' },
};

export const projectRelationId = (
  relation: ProjectRelationRecord,
  key: ProjectRelationKey,
): string | null => {
  const value = relation[PROJECT_RELATION_KEYS[key].id];
  return typeof value === 'string' ? value : (value?.id ?? null);
};

export const normalizeProjectRelationIds = (
  record: ProjectRecord,
  key: ProjectRelationKey,
): readonly string[] => {
  const config = PROJECT_RELATION_KEYS[key];
  const direct = (record as unknown as Record<string, unknown>)[config.ids];
  const relations = record[config.relations];
  return [
    ...new Set([
      ...(Array.isArray(direct) ? direct.filter((v): v is string => typeof v === 'string') : []),
      ...(Array.isArray(relations)
        ? (relations as ProjectRelationRecord[])
            .map((r) => projectRelationId(r, key))
            .filter((v): v is string => !!v)
        : []),
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
        startDate: record.startDate ?? '',
        endDate: record.endDate ?? '',
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
      context: form.context as ProjectContext,
      status: form.status as ProjectStatus,
      environment: form.environment as ProjectEnvironment,
      featured: form.featured,
      highlight: form.highlight,
      startDate: form.startDate || undefined,
      endDate: form.endDate || undefined,
      sortOrder,
      technologyRelations: form.technologyIds.map((technologyId) => ({ technologyId })),
      experienceIds: [...new Set(form.experienceIds)],
      tagIds: [...new Set(form.tagIds)],
      linkIds: [...new Set(form.linkIds)],
      imageAssetIds: [...new Set(form.imageAssetIds)],
    },
  };
};
