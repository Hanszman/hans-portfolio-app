import { TechnologyStack, TechnologyType } from '../technologies/technologies.types';

export interface PaginatedResponse<TItem> {
  data: TItem[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface ExperienceTechnologyResponse {
  id: string;
  slug: string;
  name: string;
  stack: TechnologyStack;
  type: TechnologyType;
  level: string;
  frequency: string;
  highlight: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ExperienceProjectResponse {
  id: string;
  slug: string;
  titlePt: string;
  titleEn: string;
  titleEs?: string;
  summaryPt: string;
  summaryEn: string;
  summaryEs?: string;
  descriptionPt: string;
  descriptionEn: string;
  descriptionEs?: string;
  context: string;
  status: string;
  environment: string;
  featured: boolean;
  highlight: boolean;
  startDate: string;
  endDate: string | null;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ExperienceCustomerResponse {
  id: string;
  slug: string;
  name: string;
  summaryPt: string;
  summaryEn: string;
  summaryEs?: string;
  highlight: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ExperienceJobResponse {
  id: string;
  slug: string;
  namePt: string;
  nameEn: string;
  nameEs?: string;
  summaryPt: string;
  summaryEn: string;
  summaryEs?: string;
  startDate: string;
  endDate: string | null;
  highlight: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ExperienceImageAssetResponse {
  id: string;
  fileName: string;
  filePath: string;
  kind: string;
  altPt: string | null;
  altEn: string | null;
  altEs?: string | null;
  width: number | null;
  height: number | null;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ExperienceTechnologyRelationResponse {
  experienceId: string;
  technologyId: string;
  technology: ExperienceTechnologyResponse;
}

export interface ExperienceProjectRelationResponse {
  projectId: string;
  experienceId: string;
  sortOrder: number;
  project: ExperienceProjectResponse;
}

export interface ExperienceCustomerRelationResponse {
  experienceId: string;
  customerId: string;
  sortOrder: number;
  customer: ExperienceCustomerResponse;
}

export interface ExperienceJobRelationResponse {
  experienceId: string;
  jobId: string;
  sortOrder: number;
  job: ExperienceJobResponse;
}

export interface ExperienceImageAssetRelationResponse {
  experienceId: string;
  imageAssetId: string;
  sortOrder: number;
  imageAsset: ExperienceImageAssetResponse;
}

export interface ExperienceCollectionItemResponse {
  id: string;
  slug: string;
  companyName: string;
  titlePt: string;
  titleEn: string;
  titleEs?: string;
  summaryPt: string;
  summaryEn: string;
  summaryEs?: string;
  descriptionPt: string;
  descriptionEn: string;
  descriptionEs?: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  highlight: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  technologies: ExperienceTechnologyRelationResponse[];
  projects: ExperienceProjectRelationResponse[];
  customers: ExperienceCustomerRelationResponse[];
  jobs: ExperienceJobRelationResponse[];
  links: unknown[];
  imageAssets: ExperienceImageAssetRelationResponse[];
}

export type ExperiencesCollectionResponse = PaginatedResponse<ExperienceCollectionItemResponse>;

export interface ExperienceRelationReference {
  id: string;
  slug?: string | null;
  name?: string | null;
  namePt?: string | null;
  nameEn?: string | null;
  nameEs?: string | null;
  titlePt?: string | null;
  titleEn?: string | null;
  titleEs?: string | null;
  labelPt?: string | null;
  labelEn?: string | null;
  labelEs?: string | null;
  companyName?: string | null;
  fileName?: string | null;
  filePath?: string | null;
  url?: string | null;
  kind?: string | null;
  code?: string | null;
}

export interface ExperienceRelationRecord {
  id?: string;
  technologyId?: string;
  projectId?: string;
  customerId?: string;
  jobId?: string;
  imageAssetId?: string;
  technology?: ExperienceRelationReference | null;
  project?: ExperienceRelationReference | null;
  customer?: ExperienceRelationReference | null;
  job?: ExperienceRelationReference | null;
  imageAsset?: ExperienceRelationReference | null;
}

export interface ExperienceRecord {
  id: string;
  slug: string;
  companyName: string;
  titlePt: string;
  titleEn: string;
  titleEs?: string;
  summaryPt: string;
  summaryEn: string;
  summaryEs?: string;
  descriptionPt: string;
  descriptionEn: string;
  descriptionEs?: string;
  startDate: string;
  endDate?: string | null;
  isCurrent?: boolean | null;
  highlight?: boolean | null;
  sortOrder?: number | null;
  technologyIds?: string[] | null;
  technologyRelations?: ExperienceRelationRecord[] | null;
  projectIds?: string[] | null;
  customerIds?: string[] | null;
  jobIds?: string[] | null;
  imageAssetIds?: string[] | null;
  technologies?: ExperienceRelationRecord[] | null;
  projects?: ExperienceRelationRecord[] | null;
  customers?: ExperienceRelationRecord[] | null;
  jobs?: ExperienceRelationRecord[] | null;
  imageAssets?: ExperienceRelationRecord[] | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ExperienceTechnologyRelationPayload {
  technologyId: string;
}

export interface ExperienceMutationPayload {
  slug: string;
  companyName: string;
  titlePt: string;
  titleEn: string;
  titleEs?: string;
  summaryPt: string;
  summaryEn: string;
  summaryEs?: string;
  descriptionPt: string;
  descriptionEn: string;
  descriptionEs?: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  highlight: boolean;
  sortOrder: number;
  technologyRelations: ExperienceTechnologyRelationPayload[];
  projectIds: string[];
  customerIds: string[];
  jobIds: string[];
  imageAssetIds: string[];
}

export type AdminExperiencesCollectionResponse = PaginatedResponse<ExperienceRecord>;
