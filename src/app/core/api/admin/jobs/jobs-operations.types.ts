import { PaginatedResponse } from '../../experiences/experiences.types';

export interface JobExperienceReference {
  id: string;
  slug?: string | null;
  companyName?: string | null;
  titlePt?: string | null;
  titleEn?: string | null;
}

export interface JobImageAssetReference {
  id: string;
  fileName?: string | null;
  filePath?: string | null;
  kind?: string | null;
}

export interface JobExperienceRelationRecord {
  experienceId?: string;
  experience?: JobExperienceReference | null;
}

export interface JobImageAssetRelationRecord {
  imageAssetId?: string;
  imageAsset?: JobImageAssetReference | null;
}

export interface JobRecord {
  id: string;
  slug: string;
  namePt: string;
  nameEn: string;
  summaryPt: string;
  summaryEn: string;
  highlight?: boolean | null;
  sortOrder?: number | null;
  experienceIds?: string[] | null;
  imageAssetIds?: string[] | null;
  experiences?: JobExperienceRelationRecord[] | null;
  imageAssets?: JobImageAssetRelationRecord[] | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface JobMutationPayload {
  slug: string;
  namePt: string;
  nameEn: string;
  summaryPt: string;
  summaryEn: string;
  highlight: boolean;
  sortOrder: number;
  experienceIds: string[];
  imageAssetIds: string[];
}

export type JobsCollectionResponse = PaginatedResponse<JobRecord>;
