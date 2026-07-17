import { PaginatedResponse } from '../../experiences/experiences.types';

export interface SpokenLanguageImageAssetReference {
  id: string;
  fileName?: string | null;
  filePath?: string | null;
  kind?: string | null;
}

export interface SpokenLanguageImageAssetRelationRecord {
  imageAssetId?: string;
  imageAsset?: SpokenLanguageImageAssetReference | null;
}

export interface SpokenLanguageRecord {
  id: string;
  code: string;
  namePt: string;
  nameEn: string;
  proficiency: string;
  highlight?: boolean | null;
  sortOrder?: number | null;
  imageAssetIds?: string[] | null;
  imageAssets?: SpokenLanguageImageAssetRelationRecord[] | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface SpokenLanguageMutationPayload {
  code: string;
  namePt: string;
  nameEn: string;
  proficiency: string;
  highlight: boolean;
  sortOrder: number;
  imageAssetIds: string[];
}

export type SpokenLanguagesCollectionResponse =
  PaginatedResponse<SpokenLanguageRecord>;
