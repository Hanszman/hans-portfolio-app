import { PaginatedResponse } from '../../experiences/experiences.types';

export interface CustomerExperienceReference {
  id: string;
  slug?: string | null;
  companyName?: string | null;
  titlePt?: string | null;
  titleEn?: string | null;
}

export interface CustomerImageAssetReference {
  id: string;
  fileName?: string | null;
  filePath?: string | null;
  kind?: string | null;
}

export interface CustomerExperienceRelationRecord {
  experienceId?: string;
  experience?: CustomerExperienceReference | null;
}

export interface CustomerImageAssetRelationRecord {
  imageAssetId?: string;
  imageAsset?: CustomerImageAssetReference | null;
}

export interface CustomerRecord {
  id: string;
  slug: string;
  name: string;
  summaryPt: string;
  summaryEn: string;
  highlight?: boolean | null;
  sortOrder?: number | null;
  isPublished?: boolean | null;
  experienceIds?: string[] | null;
  imageAssetIds?: string[] | null;
  experiences?: CustomerExperienceRelationRecord[] | null;
  imageAssets?: CustomerImageAssetRelationRecord[] | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface CustomerMutationPayload {
  slug: string;
  name: string;
  summaryPt: string;
  summaryEn: string;
  highlight: boolean;
  sortOrder: number;
  isPublished: boolean;
  experienceIds: string[];
  imageAssetIds: string[];
}

export type CustomersCollectionResponse = PaginatedResponse<CustomerRecord>;
