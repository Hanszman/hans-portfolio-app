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

export const TECHNOLOGY_LEVEL_VALUES = ['BASIC', 'INTERMEDIATE', 'ADVANCED', 'STUDYING'] as const;

export const TECHNOLOGY_FREQUENCY_VALUES = ['FREQUENT', 'OCCASIONAL', 'RARE'] as const;

export const TECHNOLOGY_STACK_VALUES: readonly TechnologyStack[] = [
  'BACK_END', 'CONCEPTS', 'DATABASES', 'DEVOPS', 'FRONT_END', 'GAMES', 'MOBILE', 'OTHERS', 'TESTING',
];

export const TECHNOLOGY_TYPE_VALUES: readonly TechnologyType[] = [
  'ARCHITECTURES', 'ARTIFICIAL_INTELLIGENCES', 'BUILD_TOOLS', 'CLOUD_HOSTING_PLATFORMS',
  'CODE_EDITORS', 'DATABASES_MANAGEMENT_SYSTEMS', 'DEPLOYMENT_TOOLS', 'DESIGN_PATTERNS',
  'DEVELOPMENT_PLATFORMS', 'DOCUMENTATION_TOOLS', 'FRAMEWORKS', 'LIBRARIES',
  'MARKUP_AND_FORMAT_SYNTAXES', 'METHODOLOGIES', 'NON_RELATIONAL_DATABASES', 'ORMS', 'OTHERS',
  'PACKAGE_MANAGERS', 'PACKAGES', 'PREPROCESSORS', 'PRINCIPLES', 'PROGRAMMING_LANGUAGES',
  'PROGRAMMING_PARADIGMS', 'PROTOCOLS', 'RELATIONAL_DATABASES', 'RUNTIME_ENVIRONMENTS',
  'TECHNIQUES', 'TESTING_TOOLS', 'VERSIONING_PLATFORMS', 'WEB_LANGUAGES',
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
  RARE: 'taxonomy.skills.frequency.rare',
  STUDYING: 'common.states.studying',
  BACK_END: 'taxonomy.skills.stack.backEnd',
  DATABASES: 'taxonomy.skills.stack.databases',
  FRONT_END: 'taxonomy.skills.stack.frontEnd',
  GAMES: 'taxonomy.skills.stack.games',
  MOBILE: 'taxonomy.skills.stack.mobile',
  TESTING: 'taxonomy.skills.stack.testing',
  DEVOPS: 'taxonomy.skills.stack.devops',
  CONCEPTS: 'taxonomy.skills.stack.concepts',
  OTHERS: 'taxonomy.skills.stack.others',
  ARCHITECTURES: 'taxonomy.skills.type.architectures',
  ARTIFICIAL_INTELLIGENCES: 'taxonomy.skills.type.artificialIntelligences',
  BUILD_TOOLS: 'taxonomy.skills.type.buildTools',
  CLOUD_HOSTING_PLATFORMS: 'taxonomy.skills.type.cloudHostingPlatforms',
  CODE_EDITORS: 'taxonomy.skills.type.codeEditors',
  DATABASES_MANAGEMENT_SYSTEMS: 'taxonomy.skills.type.databasesManagementSystems',
  DEPLOYMENT_TOOLS: 'taxonomy.skills.type.deploymentTools',
  DESIGN_PATTERNS: 'taxonomy.skills.type.designPatterns',
  DEVELOPMENT_PLATFORMS: 'taxonomy.skills.type.developmentPlatforms',
  DOCUMENTATION_TOOLS: 'taxonomy.skills.type.documentationTools',
  FRAMEWORKS: 'taxonomy.skills.type.frameworks',
  LIBRARIES: 'taxonomy.skills.type.libraries',
  MARKUP_AND_FORMAT_SYNTAXES: 'taxonomy.skills.type.markupAndFormatSyntaxes',
  METHODOLOGIES: 'taxonomy.skills.type.methodologies',
  NON_RELATIONAL_DATABASES: 'taxonomy.skills.type.nonRelationalDataBases',
  ORMS: 'taxonomy.skills.type.orms',
  PACKAGE_MANAGERS: 'taxonomy.skills.type.packageManagers',
  PACKAGES: 'taxonomy.skills.type.packages',
  PREPROCESSORS: 'taxonomy.skills.type.preprocessors',
  PRINCIPLES: 'taxonomy.skills.type.principles',
  PROGRAMMING_LANGUAGES: 'taxonomy.skills.type.programmingLanguages',
  PROGRAMMING_PARADIGMS: 'taxonomy.skills.type.programmingParadigms',
  PROTOCOLS: 'taxonomy.skills.type.protocols',
  RELATIONAL_DATABASES: 'taxonomy.skills.type.relationalDataBases',
  RUNTIME_ENVIRONMENTS: 'taxonomy.skills.type.runtimeEnvironments',
  TECHNIQUES: 'taxonomy.skills.type.techniques',
  TESTING_TOOLS: 'taxonomy.skills.type.testingTools',
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
  imageAssetIds: [],
});

const normalizeTechnologyRelationIds = (
  directIds: readonly string[] | null | undefined,
  relations:
    | readonly import('../../../../core/api/technologies/technologies.types').TechnologyRelationRecord[]
    | null
    | undefined,
  idKey: 'projectId' | 'experienceId' | 'formationId',
  nestedKey: 'project' | 'experience' | 'formation',
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
      imageAssetIds: [...new Set(form.imageAssetIds)],
    },
  };
};
