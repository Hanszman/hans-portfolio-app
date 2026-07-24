import {
  ImageAssetExperienceRelationRecord,
  ImageAssetMutationPayload,
  ImageAssetProjectRelationRecord,
  ImageAssetRecord,
  ImageAssetTechnologyRelationRecord,
} from '../../../../core/api/admin/image-assets/image-assets-operations.types';
import { ExperienceCollectionItemResponse } from '../../../../core/api/experiences/experiences.types';
import { ProjectCollectionItemResponse } from '../../../../core/api/projects/projects.types';
import { TechnologyCollectionItemResponse } from '../../../../core/api/technologies/technologies.types';
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
  folder: string;
  kind: string;
  altPt: string;
  altEn: string;
  captionPt: string;
  captionEn: string;
  mimeType: string;
  width: string;
  height: string;
  sortOrder: string;
  projectIds: readonly string[];
  experienceIds: readonly string[];
  technologyIds: readonly string[];
  formationIds: readonly string[];
  spokenLanguageIds: readonly string[];
  customerIds: readonly string[];
  jobIds: readonly string[];
}

export const IMAGE_ASSETS_OPERATIONS_FIELDS = {
  fileName: {
    labelKey: 'pages.admin.imageAssets.fields.fileName.label',
    placeholderKey: 'pages.admin.imageAssets.fields.fileName.placeholder',
    required: true,
  },
  filePath: {
    labelKey: 'pages.admin.imageAssets.fields.filePath.label',
    placeholderKey: 'pages.admin.imageAssets.fields.filePath.placeholder',
    required: true,
  },
  folder: {
    labelKey: 'pages.admin.imageAssets.fields.folder.label',
    placeholderKey: 'pages.admin.imageAssets.fields.folder.placeholder',
    required: true,
  },
  kind: {
    labelKey: 'pages.admin.imageAssets.fields.kind.label',
    required: true,
  },
  altPt: {
    labelKey: 'pages.admin.imageAssets.fields.altPt.label',
    placeholderKey: 'pages.admin.imageAssets.fields.altPt.placeholder',
  },
  altEn: {
    labelKey: 'pages.admin.imageAssets.fields.altEn.label',
    placeholderKey: 'pages.admin.imageAssets.fields.altEn.placeholder',
  },
  captionPt: {
    labelKey: 'pages.admin.imageAssets.fields.captionPt.label',
    placeholderKey: 'pages.admin.imageAssets.fields.captionPt.placeholder',
  },
  captionEn: {
    labelKey: 'pages.admin.imageAssets.fields.captionEn.label',
    placeholderKey: 'pages.admin.imageAssets.fields.captionEn.placeholder',
  },
  mimeType: {
    labelKey: 'pages.admin.imageAssets.fields.mimeType.label',
    placeholderKey: 'pages.admin.imageAssets.fields.mimeType.placeholder',
    required: true,
  },
  width: {
    labelKey: 'pages.admin.imageAssets.fields.width.label',
    placeholderKey: 'pages.admin.imageAssets.fields.width.placeholder',
  },
  height: {
    labelKey: 'pages.admin.imageAssets.fields.height.label',
    placeholderKey: 'pages.admin.imageAssets.fields.height.placeholder',
  },
  sortOrder: {
    labelKey: 'pages.admin.imageAssets.fields.sortOrder.label',
    placeholderKey: 'pages.admin.imageAssets.fields.sortOrder.placeholder',
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
  folder: string;
  kind: string;
  altPt: string;
  altEn: string;
  captionPt: string;
  captionEn: string;
  mimeType: string;
  dimensionsLabel: string;
  sortOrderLabel: string;
  projectLabels: readonly string[];
  experienceLabels: readonly string[];
  technologyLabels: readonly string[];
  formationLabels: readonly string[];
  spokenLanguageLabels: readonly string[];
  customerLabels: readonly string[];
  jobLabels: readonly string[];
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
    folder: '',
    kind: '',
    altPt: '',
    altEn: '',
    captionPt: '',
    captionEn: '',
    mimeType: '',
    width: '',
    height: '',
    sortOrder: '0',
    projectIds: [],
    experienceIds: [],
    technologyIds: [],
    formationIds: [],
    spokenLanguageIds: [],
    customerIds: [],
    jobIds: [],
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
    | TechnologyCollectionItemResponse,
): ImageAssetCatalogOptionViewModel => {
  if ('companyName' in item) {
    return {
      id: item.id,
      title: item.titlePt,
      subtitle: item.companyName,
    };
  }

  if ('titlePt' in item) {
    return {
      id: item.id,
      title: item.titlePt,
      subtitle: item.slug,
    };
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

export const resolveImageAssetAltPt = (imageAsset: ImageAssetRecord): string =>
  imageAsset.altPt ?? '';

export const resolveImageAssetAltEn = (imageAsset: ImageAssetRecord): string =>
  imageAsset.altEn ?? '';

export const resolveImageAssetCaptionPt = (imageAsset: ImageAssetRecord): string =>
  imageAsset.captionPt ?? '';

export const resolveImageAssetCaptionEn = (imageAsset: ImageAssetRecord): string =>
  imageAsset.captionEn ?? '';
