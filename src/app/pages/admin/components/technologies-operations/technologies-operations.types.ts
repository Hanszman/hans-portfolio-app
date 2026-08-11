import { ImageAssetRecord } from '../../../../core/api/image-assets/image-assets.types';
import {
  TechnologyAdminRecord,
  TechnologyContextResponse,
  TechnologyMutationPayload,
} from '../../../../core/api/technologies/technologies.types';
import { AdminFormFieldConfig } from '../../admin.types';
import {
  AdminImageAssetOptionViewModel,
  createAdminImageAssetOptionViewModel,
} from '../../helpers/admin.helper';
import { AppTranslationKey } from '../../../../core/translation/translation.types';
import { OperationsRelationPickerOption } from '../../../../shared/operations/operations-relation-picker/operations-relation-picker.types';

export type TechnologiesOperationsModalMode =
  | 'create'
  | 'read'
  | 'pick-update'
  | 'pick-delete'
  | 'update'
  | 'delete';

export const TECHNOLOGY_CATEGORY_VALUES = [
  'LANGUAGE',
  'FRAMEWORK',
  'LIBRARY',
  'TOOL',
  'DATABASE',
  'CLOUD',
  'TESTING',
  'DEVOPS',
  'STYLING',
  'ARCHITECTURE',
  'OTHER',
] as const;

export const TECHNOLOGY_LEVEL_VALUES = ['BASIC', 'INTERMEDIATE', 'ADVANCED'] as const;

export const TECHNOLOGY_FREQUENCY_VALUES = [
  'FREQUENT',
  'OCCASIONAL',
  'PREVIOUSLY_USED',
  'STUDYING',
] as const;

export type TechnologyOptionValue =
  | (typeof TECHNOLOGY_CATEGORY_VALUES)[number]
  | (typeof TECHNOLOGY_LEVEL_VALUES)[number]
  | (typeof TECHNOLOGY_FREQUENCY_VALUES)[number];

export const TECHNOLOGY_OPTION_LABEL_KEYS = {
  LANGUAGE: 'taxonomy.skills.category.language',
  FRAMEWORK: 'taxonomy.skills.category.framework',
  LIBRARY: 'taxonomy.skills.category.library',
  TOOL: 'pages.admin.technologies.options.TOOL',
  DATABASE: 'taxonomy.skills.category.database',
  CLOUD: 'pages.admin.technologies.options.CLOUD',
  TESTING: 'pages.admin.technologies.options.TESTING',
  DEVOPS: 'taxonomy.skills.category.devops',
  STYLING: 'pages.admin.technologies.options.STYLING',
  ARCHITECTURE: 'pages.admin.technologies.options.ARCHITECTURE',
  OTHER: 'common.values.other',
  BASIC: 'taxonomy.skills.level.basic',
  INTERMEDIATE: 'taxonomy.skills.level.intermediate',
  ADVANCED: 'taxonomy.skills.level.advanced',
  FREQUENT: 'taxonomy.skills.frequency.frequent',
  OCCASIONAL: 'taxonomy.skills.frequency.occasional',
  PREVIOUSLY_USED: 'taxonomy.skills.frequency.previouslyUsed',
  STUDYING: 'pages.admin.technologies.options.STUDYING',
} as const satisfies Record<TechnologyOptionValue, AppTranslationKey>;

export interface TechnologiesOperationsFormValue {
  slug: string;
  name: string;
  category: string;
  level: string;
  frequency: string;
  highlight: boolean;
  sortOrder: string;
  projectIds: readonly string[];
  experienceIds: readonly string[];
  formationIds: readonly string[];
  tagIds: readonly string[];
  linkIds: readonly string[];
  imageAssetIds: readonly string[];
}

export const TECHNOLOGIES_OPERATIONS_FIELDS = {
  slug: {
    labelKey: 'common.fields.slug',
    placeholderKey: 'pages.admin.technologies.fields.slug.placeholder',
    required: true,
  },
  name: {
    labelKey: 'common.fields.name',
    placeholderKey: 'pages.admin.technologies.fields.name.placeholder',
    required: true,
  },
  category: { labelKey: 'common.fields.category', required: true },
  level: { labelKey: 'common.fields.level', required: false },
  frequency: { labelKey: 'common.fields.frequency', required: false },
  sortOrder: {
    labelKey: 'common.fields.sortOrder',
    placeholderKey: 'pages.admin.technologies.fields.sortOrder.placeholder',
    required: true,
  },
} as const satisfies Record<string, AdminFormFieldConfig>;

export type TechnologyImageAssetOptionViewModel = AdminImageAssetOptionViewModel;

export type TechnologyRelationOptionViewModel = OperationsRelationPickerOption;

export interface TechnologyOperationsViewModel extends TechnologiesOperationsFormValue {
  id: string;
  imageAssetLabels: readonly string[];
  projectLabels: readonly string[];
  experienceLabels: readonly string[];
  formationLabels: readonly string[];
  tagLabels: readonly string[];
  linkLabels: readonly string[];
  technologyContexts: readonly TechnologyContextResponse[];
}

export type TechnologiesMutationBuildResult =
  | { isValid: true; payload: TechnologyMutationPayload }
  | { isValid: false; errorKey: AppTranslationKey };

export const createEmptyTechnologiesOperationsFormValue = (): TechnologiesOperationsFormValue => ({
  slug: '',
  name: '',
  category: '',
  level: '',
  frequency: '',
  highlight: true,
  sortOrder: '0',
  projectIds: [],
  experienceIds: [],
  formationIds: [],
  tagIds: [],
  linkIds: [],
  imageAssetIds: [],
});

const normalizeTechnologyRelationIds = (
  directIds: readonly string[] | null | undefined,
  relations:
    | readonly import('../../../../core/api/technologies/technologies.types').TechnologyRelationRecord[]
    | null
    | undefined,
  idKey: 'projectId' | 'experienceId' | 'formationId' | 'tagId' | 'linkId',
  nestedKey: 'project' | 'experience' | 'formation' | 'tag' | 'link',
): readonly string[] => [
  ...new Set([
    ...(directIds ?? []),
    ...(relations ?? [])
      .map((relation) => relation[idKey] ?? relation[nestedKey]?.id)
      .filter((id): id is string => typeof id === 'string' && id.length > 0),
  ]),
];

export const createTechnologyImageAssetOptionViewModel = (
  imageAsset: ImageAssetRecord,
): TechnologyImageAssetOptionViewModel => createAdminImageAssetOptionViewModel(imageAsset);

export const buildTechnologiesFormValue = (
  technology: TechnologyAdminRecord | null | undefined,
): TechnologiesOperationsFormValue =>
  technology
    ? {
        slug: technology.slug,
        name: technology.name,
        category: technology.category,
        level: technology.level ?? '',
        frequency: technology.frequency ?? '',
        highlight: technology.highlight,
        sortOrder: String(
          (technology as TechnologyAdminRecord & { sortOrder?: number }).sortOrder ?? 0,
        ),
        projectIds: normalizeTechnologyRelationIds(
          technology.projectIds,
          technology.projectUsages ?? technology.projectRelations,
          'projectId',
          'project',
        ),
        experienceIds: normalizeTechnologyRelationIds(
          technology.experienceIds,
          technology.experienceUses ?? technology.experienceRelations,
          'experienceId',
          'experience',
        ),
        formationIds: normalizeTechnologyRelationIds(
          technology.formationIds,
          technology.formationUses ?? technology.formationRelations,
          'formationId',
          'formation',
        ),
        tagIds: normalizeTechnologyRelationIds(technology.tagIds, technology.tags, 'tagId', 'tag'),
        linkIds: normalizeTechnologyRelationIds(
          technology.linkIds,
          technology.links,
          'linkId',
          'link',
        ),
        imageAssetIds:
          technology.imageAssetIds ??
          technology.imageAssets?.flatMap((relation) =>
            relation.imageAsset.id ? [relation.imageAsset.id] : [],
          ) ??
          [],
      }
    : createEmptyTechnologiesOperationsFormValue();

export const buildTechnologiesMutationPayload = (
  form: TechnologiesOperationsFormValue,
): TechnologiesMutationBuildResult => {
  const slug = form.slug.trim();
  const name = form.name.trim();
  const category = form.category.trim();
  const sortOrder = Number.parseInt(form.sortOrder.trim(), 10);
  if (!slug) return { isValid: false, errorKey: 'pages.admin.technologies.feedback.requiredSlug' };
  if (!name) return { isValid: false, errorKey: 'pages.admin.technologies.feedback.requiredName' };
  if (!category)
    return { isValid: false, errorKey: 'pages.admin.technologies.feedback.requiredCategory' };
  if (!Number.isInteger(sortOrder))
    return { isValid: false, errorKey: 'pages.admin.technologies.feedback.invalidSortOrder' };
  return {
    isValid: true,
    payload: {
      slug,
      name,
      category,
      ...(form.level.trim() ? { level: form.level.trim() } : {}),
      ...(form.frequency.trim() ? { frequency: form.frequency.trim() } : {}),
      highlight: form.highlight,
      sortOrder,
      projectRelations: [...new Set(form.projectIds)].map((projectId) => ({ projectId })),
      experienceRelations: [...new Set(form.experienceIds)].map((experienceId) => ({
        experienceId,
      })),
      formationRelations: [...new Set(form.formationIds)].map((formationId) => ({
        formationId,
      })),
      tagIds: [...new Set(form.tagIds)],
      linkIds: [...new Set(form.linkIds)],
      imageAssetIds: [...new Set(form.imageAssetIds)],
    },
  };
};
