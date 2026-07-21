import { PaginatedResponse } from '../../experiences/experiences.types';

export interface ImageAssetProjectReference {
  id: string;
  slug?: string;
  titlePt?: string | null;
  titleEn?: string | null;
}

export interface ImageAssetExperienceReference {
  id: string;
  slug?: string;
  companyName?: string | null;
  titlePt?: string | null;
  titleEn?: string | null;
}

export interface ImageAssetTechnologyReference {
  id: string;
  slug?: string;
  name?: string | null;
}

export interface ImageAssetProjectRelationRecord {
  projectId?: string;
  project?: ImageAssetProjectReference | null;
}

export interface ImageAssetExperienceRelationRecord {
  experienceId?: string;
  experience?: ImageAssetExperienceReference | null;
}

export interface ImageAssetTechnologyRelationRecord {
  technologyId?: string;
  technology?: ImageAssetTechnologyReference | null;
}

export interface ImageAssetRecord {
  id: string;
  fileName: string;
  filePath: string;
  folder: string;
  kind: string;
  altPt?: string | null;
  altEn?: string | null;
  captionPt?: string | null;
  captionEn?: string | null;
  mimeType: string;
  width?: number | null;
  height?: number | null;
  sortOrder?: number | null;
  projectIds?: string[] | null;
  experienceIds?: string[] | null;
  technologyIds?: string[] | null;
  formationIds?: string[] | null;
  spokenLanguageIds?: string[] | null;
  customerIds?: string[] | null;
  jobIds?: string[] | null;
  projects?: ImageAssetProjectRelationRecord[] | null;
  experiences?: ImageAssetExperienceRelationRecord[] | null;
  technologies?: ImageAssetTechnologyRelationRecord[] | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ImageAssetMutationPayload {
  fileName: string;
  filePath: string;
  folder: string;
  kind: string;
  altPt: string;
  altEn: string;
  captionPt: string;
  captionEn: string;
  mimeType: string;
  width: number | null;
  height: number | null;
  sortOrder: number;
  projectIds: string[];
  experienceIds: string[];
  technologyIds: string[];
  formationIds: string[];
  spokenLanguageIds: string[];
  customerIds: string[];
  jobIds: string[];
}

export type ImageAssetsCollectionResponse = PaginatedResponse<ImageAssetRecord>;
