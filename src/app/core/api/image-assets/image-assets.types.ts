import { PaginatedResponse } from '../experiences/experiences.types';

export interface ImageAssetProjectReference {
  id: string;
  slug?: string;
  titlePt?: string | null;
  titleEn?: string | null;
  titleEs?: string | null;
}

export interface ImageAssetExperienceReference {
  id: string;
  slug?: string;
  companyName?: string | null;
  titlePt?: string | null;
  titleEn?: string | null;
  titleEs?: string | null;
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

export interface ImageAssetNamedReference {
  id: string;
  slug?: string | null;
  name?: string | null;
  namePt?: string | null;
  titlePt?: string | null;
  institution?: string | null;
  companyName?: string | null;
}

export interface ImageAssetFormationRelationRecord {
  formationId?: string;
  formation?: ImageAssetNamedReference | null;
}

export interface ImageAssetSpokenLanguageRelationRecord {
  spokenLanguageId?: string;
  spokenLanguage?: ImageAssetNamedReference | null;
}

export interface ImageAssetCustomerRelationRecord {
  customerId?: string;
  customer?: ImageAssetNamedReference | null;
}

export interface ImageAssetRecord {
  id: string;
  fileName: string;
  filePath: string;
  kind: string;
  altPt?: string | null;
  altEn?: string | null;
  altEs?: string | null;
  width?: number | null;
  height?: number | null;
  sortOrder?: number | null;
  projectIds?: string[] | null;
  experienceIds?: string[] | null;
  technologyIds?: string[] | null;
  formationIds?: string[] | null;
  spokenLanguageIds?: string[] | null;
  customerIds?: string[] | null;
  projects?: ImageAssetProjectRelationRecord[] | null;
  experiences?: ImageAssetExperienceRelationRecord[] | null;
  technologies?: ImageAssetTechnologyRelationRecord[] | null;
  formations?: ImageAssetFormationRelationRecord[] | null;
  spokenLanguages?: ImageAssetSpokenLanguageRelationRecord[] | null;
  customers?: ImageAssetCustomerRelationRecord[] | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ImageAssetMutationPayload {
  fileName: string;
  filePath: string;
  kind: string;
  altPt: string;
  altEn: string;
  altEs?: string;
  width: number | null;
  height: number | null;
  sortOrder: number;
  projectIds: string[];
  experienceIds: string[];
  technologyIds: string[];
  formationIds: string[];
  spokenLanguageIds: string[];
  customerIds: string[];
}

export type ImageAssetsCollectionResponse = PaginatedResponse<ImageAssetRecord>;
