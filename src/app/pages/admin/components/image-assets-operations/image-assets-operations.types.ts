import {
  ImageAssetExperienceRelationRecord,
  ImageAssetMutationPayload,
  ImageAssetProjectRelationRecord,
  ImageAssetRecord,
  ImageAssetTechnologyRelationRecord,
  ImageAssetFormationRelationRecord,
  ImageAssetSpokenLanguageRelationRecord,
  ImageAssetCustomerRelationRecord,
} from '../../../../core/api/image-assets/image-assets.types';
import { ExperienceCollectionItemResponse } from '../../../../core/api/experiences/experiences.types';
import { ProjectCollectionItemResponse } from '../../../../core/api/projects/projects.types';
import { TechnologyCollectionItemResponse } from '../../../../core/api/technologies/technologies.types';
import { FormationRecord } from '../../../../core/api/formations/formations.types';
import { SpokenLanguageRecord } from '../../../../core/api/spoken-languages/spoken-languages.types';
import { CustomerRecord } from '../../../../core/api/customers/customers.types';
import { AppTranslationKey } from '../../../../core/translation/translation.types';
import { AdminFormFieldConfig } from '../../admin.types';
import {
  AdminSelectOptionDefinition,
  AdminSelectOptionViewModel,
  createAdminSelectOptionDefinitions,
} from '../../helpers/admin.helper';

export const IMAGE_ASSET_KIND_VALUES = ['ICON', 'SCREENSHOT'] as const;

export type ImageAssetKindValue = (typeof IMAGE_ASSET_KIND_VALUES)[number];

export type ImageAssetsOperationsModalMode =
  | 'create'
  | 'read'
  | 'pick-update'
  | 'pick-delete'
  | 'update'
  | 'delete';

export interface ImageAssetsOperationsFormValue {
  fileName: string;
  filePath: string;
  kind: string;
  altPt: string;
  altEn: string;
  altEs?: string;
  width: string;
  height: string;
  sortOrder: string;
  projectIds: readonly string[];
  experienceIds: readonly string[];
  technologyIds: readonly string[];
  formationIds: readonly string[];
  spokenLanguageIds: readonly string[];
  customerIds: readonly string[];
}

export const IMAGE_ASSETS_OPERATIONS_FIELDS = {
  fileName: {
    labelKey: 'common.fields.fileName',
    placeholderKey: 'pages.admin.imageAssets.fields.fileName.placeholder',
    required: true,
  },
  filePath: {
    labelKey: 'common.fields.filePath',
    placeholderKey: 'pages.admin.imageAssets.fields.filePath.placeholder',
    required: true,
  },
  kind: {
    labelKey: 'common.fields.kind',
    required: true,
  },
  altPt: {
    labelKey: 'pages.admin.imageAssets.fields.altPt.label',
    placeholderKey: 'pages.admin.imageAssets.fields.altPt.placeholder',
    required: false,
  },
  altEn: {
    labelKey: 'pages.admin.imageAssets.fields.altEn.label',
    placeholderKey: 'pages.admin.imageAssets.fields.altEn.placeholder',
    required: false,
  },
  altEs: {
    labelKey: 'pages.admin.imageAssets.fields.altEs.label',
    placeholderKey: 'pages.admin.imageAssets.fields.altEs.placeholder',
    required: false,
  },
  width: {
    labelKey: 'pages.admin.imageAssets.fields.width.label',
    placeholderKey: 'pages.admin.imageAssets.fields.width.placeholder',
    required: false,
  },
  height: {
    labelKey: 'pages.admin.imageAssets.fields.height.label',
    placeholderKey: 'pages.admin.imageAssets.fields.height.placeholder',
    required: false,
  },
  sortOrder: {
    labelKey: 'common.fields.sortOrder',
    placeholderKey: 'common.placeholders.integerSortOrder',
    required: true,
  },
} as const satisfies Record<string, AdminFormFieldConfig>;

export interface ImageAssetCatalogOptionViewModel {
  id: string;
  title: string;
  subtitle: string;
}

export type ImageAssetKindOptionDefinition =
  AdminSelectOptionDefinition<ImageAssetKindValue>;

export type ImageAssetKindOptionViewModel =
  AdminSelectOptionViewModel<ImageAssetKindValue>;

export interface ImageAssetOperationsViewModel {
  id: string;
  fileName: string;
  filePath: string;
  kind: string;
  altPt: string;
  altEn: string;
  altEs?: string;
  dimensionsLabel: string;
  sortOrderLabel: string;
  projectLabels: readonly string[];
  experienceLabels: readonly string[];
  technologyLabels: readonly string[];
  formationLabels: readonly string[];
  spokenLanguageLabels: readonly string[];
  customerLabels: readonly string[];
}

export interface ImageAssetsMutationBuildSuccess {
  isValid: true;
  payload: ImageAssetMutationPayload;
}

export interface ImageAssetsMutationBuildFailure {
  isValid: false;
  errorKey: AppTranslationKey;
}

export type ImageAssetsMutationBuildResult =
  | ImageAssetsMutationBuildSuccess
  | ImageAssetsMutationBuildFailure;

export const createEmptyImageAssetsOperationsFormValue =
  (): ImageAssetsOperationsFormValue => ({
    fileName: '',
    filePath: '',
    kind: '',
    altPt: '',
    altEn: '',
    altEs: '',
    width: '',
    height: '',
    sortOrder: '0',
    projectIds: [],
    experienceIds: [],
    technologyIds: [],
    formationIds: [],
    spokenLanguageIds: [],
    customerIds: [],
  });

export const createImageAssetKindOptions =
  (): readonly ImageAssetKindOptionDefinition[] =>
    createAdminSelectOptionDefinitions(
      IMAGE_ASSET_KIND_VALUES,
      (value) => `pages.admin.imageAssets.fields.kind.options.${value}` as AppTranslationKey,
    );

export const createImageAssetCatalogOptionViewModel = (
  item:
    | ProjectCollectionItemResponse
    | ExperienceCollectionItemResponse
    | TechnologyCollectionItemResponse
    | FormationRecord
    | SpokenLanguageRecord
    | CustomerRecord,
): ImageAssetCatalogOptionViewModel => {
  if ('companyName' in item) {
    return {
      id: item.id,
      title: item.titlePt,
      subtitle: item.companyName,
    };
  }

  if (
    'institution' in item &&
    typeof item.institution === 'string' &&
    'titlePt' in item &&
    typeof item.titlePt === 'string'
  ) {
    return { id: item.id, title: item.titlePt, subtitle: item.institution };
  }

  if ('titlePt' in item) {
    return {
      id: item.id,
      title: item.titlePt,
      subtitle: item.slug,
    };
  }

  if ('code' in item) {
    return { id: item.id, title: item.namePt, subtitle: item.code };
  }

  if ('name' in item && typeof item.name === 'string') {
    return { id: item.id, title: item.name, subtitle: item.slug };
  }

  return {
    id: item.id,
    title: item.name,
    subtitle: item.slug,
  };
};

export const resolveImageAssetProjectIdFromRelation = (
  relation: ImageAssetProjectRelationRecord,
): string | null => relation.projectId ?? relation.project?.id ?? null;

export const resolveImageAssetExperienceIdFromRelation = (
  relation: ImageAssetExperienceRelationRecord,
): string | null => relation.experienceId ?? relation.experience?.id ?? null;

export const resolveImageAssetTechnologyIdFromRelation = (
  relation: ImageAssetTechnologyRelationRecord,
): string | null => relation.technologyId ?? relation.technology?.id ?? null;

export const resolveImageAssetFormationIdFromRelation = (
  relation: ImageAssetFormationRelationRecord,
): string | null => relation.formationId ?? relation.formation?.id ?? null;

export const resolveImageAssetSpokenLanguageIdFromRelation = (
  relation: ImageAssetSpokenLanguageRelationRecord,
): string | null => relation.spokenLanguageId ?? relation.spokenLanguage?.id ?? null;

export const resolveImageAssetCustomerIdFromRelation = (
  relation: ImageAssetCustomerRelationRecord,
): string | null => relation.customerId ?? relation.customer?.id ?? null;

export const resolveImageAssetAltPt = (imageAsset: ImageAssetRecord): string =>
  imageAsset.altPt ?? '';

export const resolveImageAssetAltEn = (imageAsset: ImageAssetRecord): string =>
  imageAsset.altEn ?? '';
export const resolveImageAssetAltEs = (imageAsset: ImageAssetRecord): string =>
  imageAsset.altEs ?? '';
