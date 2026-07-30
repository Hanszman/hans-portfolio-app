import { ImageAssetRecord } from '../../../../core/api/image-assets/image-assets-operations.types';
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

export interface TechnologiesOperationsFormValue {
  slug: string;
  name: string;
  category: string;
  level: string;
  frequency: string;
  highlight: boolean;
  sortOrder: string;
  imageAssetIds: readonly string[];
}

export const TECHNOLOGIES_OPERATIONS_FIELDS = {
  slug: {
    labelKey: 'pages.admin.technologies.fields.slug.label',
    placeholderKey: 'pages.admin.technologies.fields.slug.placeholder',
    required: true,
  },
  name: {
    labelKey: 'pages.admin.technologies.fields.name.label',
    placeholderKey: 'pages.admin.technologies.fields.name.placeholder',
    required: true,
  },
  category: { labelKey: 'pages.admin.technologies.fields.category.label', required: true },
  level: { labelKey: 'pages.admin.technologies.fields.level.label' },
  frequency: { labelKey: 'pages.admin.technologies.fields.frequency.label' },
  sortOrder: {
    labelKey: 'pages.admin.technologies.fields.sortOrder.label',
    placeholderKey: 'pages.admin.technologies.fields.sortOrder.placeholder',
    required: true,
  },
} as const satisfies Record<string, AdminFormFieldConfig>;

export type TechnologyImageAssetOptionViewModel = AdminImageAssetOptionViewModel;

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
  imageAssetIds: [],
});

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
      projectRelations: [],
      experienceRelations: [],
      formationRelations: [],
      tagIds: [],
      linkIds: [],
      imageAssetIds: [...new Set(form.imageAssetIds)],
    },
  };
};
