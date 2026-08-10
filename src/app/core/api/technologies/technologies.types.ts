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
  labelPt?: string;
  labelEn?: string;
  labelEs?: string;
  startedAt: string | null;
  endedAt: string | null;
}

export interface TechnologyExperienceMetricsResponse {
  total: TechnologyExperienceDurationResponse;
  byContext: Record<TechnologyContextKey, TechnologyExperienceDurationResponse>;
}

export interface TechnologyImageAssetResponse {
  id?: string;
  filePath: string;
  kind: string;
  altPt: string | null;
  altEn: string | null;
  altEs?: string | null;
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
  sortOrder?: number | null;
  technologyContexts?: TechnologyContextResponse[];
  imageAssets?: TechnologyImageAssetRelationResponse[];
  experienceMetrics?: TechnologyExperienceMetricsResponse;
  projectUsages?: TechnologyRelationRecord[] | null;
  experienceUses?: TechnologyRelationRecord[] | null;
  formationUses?: TechnologyRelationRecord[] | null;
  tags?: TechnologyRelationRecord[] | null;
  links?: TechnologyRelationRecord[] | null;
  projectRelations?: TechnologyRelationRecord[] | null;
  experienceRelations?: TechnologyRelationRecord[] | null;
  formationRelations?: TechnologyRelationRecord[] | null;
  projectIds?: string[] | null;
  experienceIds?: string[] | null;
  formationIds?: string[] | null;
  tagIds?: string[] | null;
  linkIds?: string[] | null;
  imageAssetIds?: string[] | null;
}

export interface TechnologyRelationRecord {
  projectId?: string;
  experienceId?: string;
  formationId?: string;
  tagId?: string;
  linkId?: string;
  project?: {
    id: string;
    slug?: string;
    titlePt?: string | null;
    titleEn?: string | null;
    titleEs?: string | null;
  } | null;
  experience?: {
    id: string;
    slug?: string;
    titlePt?: string | null;
    titleEn?: string | null;
    titleEs?: string | null;
    companyName?: string | null;
  } | null;
  formation?: {
    id: string;
    slug?: string;
    titlePt?: string | null;
    titleEn?: string | null;
    titleEs?: string | null;
  } | null;
  tag?: {
    id: string;
    slug?: string;
    namePt?: string | null;
    nameEn?: string | null;
    nameEs?: string | null;
  } | null;
  link?: {
    id: string;
    url?: string | null;
    labelPt?: string | null;
    labelEn?: string | null;
    labelEs?: string | null;
  } | null;
}

export interface TechnologyMutationPayload {
  slug: string;
  name: string;
  category: string;
  level?: string;
  frequency?: string;
  highlight: boolean;
  sortOrder: number;
  projectRelations: { projectId: string }[];
  experienceRelations: { experienceId: string }[];
  formationRelations: { formationId: string }[];
  tagIds: string[];
  linkIds: string[];
  imageAssetIds: string[];
}

export type TechnologyAdminRecord = TechnologyCollectionItemResponse;

export type TechnologiesCollectionResponse =
  PaginatedResponse<TechnologyCollectionItemResponse>;
