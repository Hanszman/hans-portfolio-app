import { PaginatedResponse } from '../experiences/experiences.types';

export type TechnologyContextKey =
  | 'PROFESSIONAL'
  | 'PERSONAL'
  | 'ACADEMIC'
  | 'STUDY';

export interface TechnologyExperienceDurationResponse {
  totalMonths: number;
  years: number;
  months: number;
  label: string;
  startedAt: string | null;
  endedAt: string | null;
}

export interface TechnologyExperienceMetricsResponse {
  total: TechnologyExperienceDurationResponse;
  byContext: Record<TechnologyContextKey, TechnologyExperienceDurationResponse>;
}

export interface TechnologyImageAssetResponse {
  filePath: string;
  kind: string;
  altPt: string | null;
  altEn: string | null;
}

export interface TechnologyImageAssetRelationResponse {
  imageAsset: TechnologyImageAssetResponse;
}

export interface TechnologyContextResponse {
  id: string;
  context: TechnologyContextKey;
  startedAt: string;
  endedAt: string | null;
}

export interface TechnologyCollectionItemResponse {
  id: string;
  slug: string;
  name: string;
  category: string;
  level: string | null;
  frequency: string | null;
  highlight: boolean;
  technologyContexts?: TechnologyContextResponse[];
  imageAssets?: TechnologyImageAssetRelationResponse[];
  experienceMetrics?: TechnologyExperienceMetricsResponse;
}

export type TechnologiesCollectionResponse =
  PaginatedResponse<TechnologyCollectionItemResponse>;
