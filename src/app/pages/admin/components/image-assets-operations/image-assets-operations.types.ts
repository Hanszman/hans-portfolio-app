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
  isPublished: boolean;
  projectIds: readonly string[];
  experienceIds: readonly string[];
  technologyIds: readonly string[];
  formationIds: readonly string[];
  spokenLanguageIds: readonly string[];
  customerIds: readonly string[];
  jobIds: readonly string[];
}

export interface ImageAssetCatalogOptionViewModel {
  id: string;
  title: string;
  subtitle: string;
}

export interface ImageAssetKindOptionViewModel {
  id: ImageAssetKindValue;
  label: string;
  value: ImageAssetKindValue;
}

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
  isPublished: boolean;
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
    isPublished: true,
    projectIds: [],
    experienceIds: [],
    technologyIds: [],
    formationIds: [],
    spokenLanguageIds: [],
    customerIds: [],
    jobIds: [],
  });

export const createImageAssetKindOptions =
  (): readonly ImageAssetKindOptionViewModel[] =>
    IMAGE_ASSET_KIND_VALUES.map((value) => ({
      id: value,
      label: value,
      value,
    }));

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
