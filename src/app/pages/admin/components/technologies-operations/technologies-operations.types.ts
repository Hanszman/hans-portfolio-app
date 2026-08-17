import { ImageAssetRecord } from '../../../../core/api/image-assets/image-assets.types';
import {
  TechnologyAdminRecord,
  TechnologyContextResponse,
  TechnologyMutationPayload,
  TechnologyStack,
  TechnologyType,
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

export const TECHNOLOGY_LEVEL_VALUES = ['BASIC', 'INTERMEDIATE', 'ADVANCED'] as const;

export const TECHNOLOGY_FREQUENCY_VALUES = [
  'FREQUENT',
  'OCCASIONAL',
  'PREVIOUSLY_USED',
  'STUDYING',
] as const;

export const TECHNOLOGY_STACK_VALUES: readonly TechnologyStack[] = [
  'BACK_END', 'DATABASES', 'FRONT_END', 'GAMES', 'MOBILE', 'OTHERS',
];

export const TECHNOLOGY_TYPE_VALUES: readonly TechnologyType[] = [
  'CLOUD_HOSTING_PLATFORMS', 'CODE_EDITORS', 'DATABASES_MANAGEMENT_SYSTEMS',
  'DEPLOYMENT_TOOLS', 'DEVELOPMENT_PLATFORMS', 'FRAMEWORKS', 'LIBRARIES',
  'METHODOLOGIES', 'NON_RELATIONAL_DATABASES', 'OBJECT_NOTATIONS', 'OTHERS',
  'PACKAGE_MANAGERS', 'PACKAGES', 'PROGRAMMING_LANGUAGES', 'PROTOCOLS',
  'RELATIONAL_DATABASES', 'TECHNIQUES', 'VERSIONING_PLATFORMS', 'WEB_LANGUAGES',
];

export type TechnologyOptionValue =
  | (typeof TECHNOLOGY_LEVEL_VALUES)[number]
  | (typeof TECHNOLOGY_FREQUENCY_VALUES)[number]
  | TechnologyStack
  | TechnologyType;

export const TECHNOLOGY_OPTION_LABEL_KEYS = {
  BASIC: 'taxonomy.skills.level.basic',
  INTERMEDIATE: 'taxonomy.skills.level.intermediate',
  ADVANCED: 'taxonomy.skills.level.advanced',
  FREQUENT: 'taxonomy.skills.frequency.frequent',
  OCCASIONAL: 'taxonomy.skills.frequency.occasional',
  PREVIOUSLY_USED: 'taxonomy.skills.frequency.previouslyUsed',
  STUDYING: 'pages.admin.technologies.options.STUDYING',
  BACK_END: 'taxonomy.skills.stack.backEnd',
  DATABASES: 'taxonomy.skills.stack.databases',
  FRONT_END: 'taxonomy.skills.stack.frontEnd',
  GAMES: 'taxonomy.skills.stack.games',
  MOBILE: 'taxonomy.skills.stack.mobile',
  OTHERS: 'taxonomy.skills.stack.others',
  CLOUD_HOSTING_PLATFORMS: 'taxonomy.skills.type.cloudHostingPlatforms',
  CODE_EDITORS: 'taxonomy.skills.type.codeEditors',
  DATABASES_MANAGEMENT_SYSTEMS: 'taxonomy.skills.type.databasesManagementSystems',
  DEPLOYMENT_TOOLS: 'taxonomy.skills.type.deploymentTools',
  DEVELOPMENT_PLATFORMS: 'taxonomy.skills.type.developmentPlatforms',
  FRAMEWORKS: 'taxonomy.skills.type.frameworks',
  LIBRARIES: 'taxonomy.skills.type.libraries',
  METHODOLOGIES: 'taxonomy.skills.type.methodologies',
  NON_RELATIONAL_DATABASES: 'taxonomy.skills.type.nonRelationalDataBases',
  OBJECT_NOTATIONS: 'taxonomy.skills.type.objectNotations',
  PACKAGE_MANAGERS: 'taxonomy.skills.type.packageManagers',
  PACKAGES: 'taxonomy.skills.type.packages',
  PROGRAMMING_LANGUAGES: 'taxonomy.skills.type.programmingLanguages',
  PROTOCOLS: 'taxonomy.skills.type.protocols',
  RELATIONAL_DATABASES: 'taxonomy.skills.type.relationalDataBases',
  TECHNIQUES: 'taxonomy.skills.type.techniques',
  VERSIONING_PLATFORMS: 'taxonomy.skills.type.versioningPlatforms',
  WEB_LANGUAGES: 'taxonomy.skills.type.webLanguages',
} as const satisfies Record<TechnologyOptionValue, AppTranslationKey>;

export interface TechnologiesOperationsFormValue {
  slug: string;
  name: string;
  stack: TechnologyStack | '';
  type: TechnologyType | '';
  level: string;
  frequency: string;
  highlight: boolean;
  sortOrder: string;
  projectIds: readonly string[];
  experienceIds: readonly string[];
  formationIds: readonly string[];
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
  stack: { labelKey: 'common.fields.stack', required: true },
  type: { labelKey: 'common.fields.type', required: true },
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
  linkLabels: readonly string[];
  technologyContexts: readonly TechnologyContextResponse[];
}

export type TechnologiesMutationBuildResult =
  | { isValid: true; payload: TechnologyMutationPayload }
  | { isValid: false; errorKey: AppTranslationKey };

export const createEmptyTechnologiesOperationsFormValue = (): TechnologiesOperationsFormValue => ({
  slug: '',
  name: '',
  stack: '',
  type: '',
  level: '',
  frequency: '',
  highlight: true,
  sortOrder: '0',
  projectIds: [],
  experienceIds: [],
  formationIds: [],
  linkIds: [],
  imageAssetIds: [],
});

const normalizeTechnologyRelationIds = (
  directIds: readonly string[] | null | undefined,
  relations:
    | readonly import('../../../../core/api/technologies/technologies.types').TechnologyRelationRecord[]
    | null
    | undefined,
  idKey: 'projectId' | 'experienceId' | 'formationId' | 'linkId',
  nestedKey: 'project' | 'experience' | 'formation' | 'link',
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
        stack: technology.stack ?? '',
        type: technology.type ?? '',
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
  const stack = form.stack;
  const type = form.type;
  const sortOrder = Number.parseInt(form.sortOrder.trim(), 10);
  if (!slug) return { isValid: false, errorKey: 'pages.admin.technologies.feedback.requiredSlug' };
  if (!name) return { isValid: false, errorKey: 'pages.admin.technologies.feedback.requiredName' };
  if (!stack)
    return { isValid: false, errorKey: 'pages.admin.technologies.feedback.requiredStack' };
  if (!type)
    return { isValid: false, errorKey: 'pages.admin.technologies.feedback.requiredType' };
  if (!Number.isInteger(sortOrder))
    return { isValid: false, errorKey: 'pages.admin.technologies.feedback.invalidSortOrder' };
  return {
    isValid: true,
    payload: {
      slug,
      name,
      stack,
      type,
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
      linkIds: [...new Set(form.linkIds)],
      imageAssetIds: [...new Set(form.imageAssetIds)],
    },
  };
};
