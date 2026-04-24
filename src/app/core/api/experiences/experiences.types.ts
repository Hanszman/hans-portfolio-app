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
  category: string;
  level: string;
  frequency: string;
  highlight: boolean;
  sortOrder: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ExperienceProjectResponse {
  id: string;
  slug: string;
  titlePt: string;
  titleEn: string;
  shortDescriptionPt: string;
  shortDescriptionEn: string;
  fullDescriptionPt: string;
  fullDescriptionEn: string;
  context: string;
  status: string;
  environment: string;
  featured: boolean;
  highlight: boolean;
  startDate: string;
  endDate: string | null;
  sortOrder: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ExperienceCustomerResponse {
  id: string;
  slug: string;
  name: string;
  summaryPt: string;
  summaryEn: string;
  highlight: boolean;
  sortOrder: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ExperienceJobResponse {
  id: string;
  slug: string;
  namePt: string;
  nameEn: string;
  summaryPt: string;
  summaryEn: string;
  highlight: boolean;
  sortOrder: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ExperienceImageAssetResponse {
  id: string;
  fileName: string;
  filePath: string;
  folder: string;
  kind: string;
  altPt: string | null;
  altEn: string | null;
  captionPt: string | null;
  captionEn: string | null;
  mimeType: string;
  width: number | null;
  height: number | null;
  sortOrder: number;
  isPublished: boolean;
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
  summaryPt: string;
  summaryEn: string;
  descriptionPt: string;
  descriptionEn: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  highlight: boolean;
  sortOrder: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  technologies: ExperienceTechnologyRelationResponse[];
  projects: ExperienceProjectRelationResponse[];
  customers: ExperienceCustomerRelationResponse[];
  jobs: ExperienceJobRelationResponse[];
  links: unknown[];
  imageAssets: ExperienceImageAssetRelationResponse[];
}

export type ExperiencesCollectionResponse =
  PaginatedResponse<ExperienceCollectionItemResponse>;
