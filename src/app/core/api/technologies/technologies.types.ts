import { PaginatedResponse } from '../experiences/experiences.types';

export type TechnologyContextKey =
  | 'PROFESSIONAL'
  | 'PERSONAL'
  | 'ACADEMIC'
  | 'STUDY';

export type TechnologyStack =
  | 'BACK_END'
  | 'CONCEPTS'
  | 'DATABASES'
  | 'DEVOPS'
  | 'FRONT_END'
  | 'GAMES'
  | 'MOBILE'
  | 'OTHERS'
  | 'TESTING';

export type TechnologyType =
  | 'ARCHITECTURES'
  | 'ARTIFICIAL_INTELLIGENCES'
  | 'BUILD_TOOLS'
  | 'CLOUD_HOSTING_PLATFORMS'
  | 'CODE_EDITORS'
  | 'DATABASES_MANAGEMENT_SYSTEMS'
  | 'DEPLOYMENT_TOOLS'
  | 'DESIGN_PATTERNS'
  | 'DEVELOPMENT_PLATFORMS'
  | 'DOCUMENTATION_TOOLS'
  | 'FRAMEWORKS'
  | 'LIBRARIES'
  | 'MARKUP_AND_FORMAT_SYNTAXES'
  | 'METHODOLOGIES'
  | 'NON_RELATIONAL_DATABASES'
  | 'ORMS'
  | 'OTHERS'
  | 'PACKAGE_MANAGERS'
  | 'PACKAGES'
  | 'PREPROCESSORS'
  | 'PRINCIPLES'
  | 'PROGRAMMING_LANGUAGES'
  | 'PROGRAMMING_PARADIGMS'
  | 'PROTOCOLS'
  | 'RELATIONAL_DATABASES'
  | 'RUNTIME_ENVIRONMENTS'
  | 'TECHNIQUES'
  | 'TESTING_TOOLS'
  | 'VERSIONING_PLATFORMS'
  | 'WEB_LANGUAGES';

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
  stack?: TechnologyStack;
  type?: TechnologyType;
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
  projectRelations?: TechnologyRelationRecord[] | null;
  experienceRelations?: TechnologyRelationRecord[] | null;
  formationRelations?: TechnologyRelationRecord[] | null;
  projectIds?: string[] | null;
  experienceIds?: string[] | null;
  formationIds?: string[] | null;
  imageAssetIds?: string[] | null;
}

export interface TechnologyRelationRecord {
  projectId?: string;
  experienceId?: string;
  formationId?: string;
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
}

export interface TechnologyMutationPayload {
  slug: string;
  name: string;
  stack: TechnologyStack;
  type: TechnologyType;
  level?: string;
  frequency?: string;
  highlight: boolean;
  sortOrder: number;
  projectRelations: { projectId: string }[];
  experienceRelations: { experienceId: string }[];
  formationRelations: { formationId: string }[];
  imageAssetIds: string[];
}

export type TechnologyAdminRecord = TechnologyCollectionItemResponse;

export type TechnologiesCollectionResponse =
  PaginatedResponse<TechnologyCollectionItemResponse>;
