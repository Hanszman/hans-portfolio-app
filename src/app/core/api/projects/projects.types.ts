import { PaginatedResponse } from '../experiences/experiences.types';

export interface ProjectTechnologyResponse {
  id: string;
  slug: string;
  name: string;
  category: string;
  level: string | null;
  frequency: string | null;
  highlight: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectExperienceResponse {
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
  createdAt: string;
  updatedAt: string;
}

export interface ProjectTagResponse {
  id: string;
  slug: string;
  labelPt: string;
  labelEn: string;
  color: string | null;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectLinkResponse {
  id: string;
  url: string;
  labelPt: string | null;
  labelEn: string | null;
  descriptionPt: string | null;
  descriptionEn: string | null;
  type: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectImageAssetResponse {
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
  createdAt: string;
  updatedAt: string;
}

export interface ProjectTechnologyRelationResponse {
  projectId: string;
  technologyId: string;
  technology: ProjectTechnologyResponse;
}

export interface ProjectExperienceRelationResponse {
  projectId: string;
  experienceId: string;
  sortOrder: number;
  experience: ProjectExperienceResponse;
}

export interface ProjectTagRelationResponse {
  projectId: string;
  tagId: string;
  sortOrder: number;
  tag: ProjectTagResponse;
}

export interface ProjectLinkRelationResponse {
  projectId: string;
  linkId: string;
  sortOrder: number;
  link: ProjectLinkResponse;
}

export interface ProjectImageAssetRelationResponse {
  projectId: string;
  imageAssetId: string;
  sortOrder: number;
  imageAsset: ProjectImageAssetResponse;
}

export interface ProjectCollectionItemResponse {
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
  createdAt: string;
  updatedAt: string;
  technologies: ProjectTechnologyRelationResponse[];
  experiences: ProjectExperienceRelationResponse[];
  tags: ProjectTagRelationResponse[];
  links: ProjectLinkRelationResponse[];
  imageAssets: ProjectImageAssetRelationResponse[];
}

export type ProjectsCollectionResponse =
  PaginatedResponse<ProjectCollectionItemResponse>;

export type ProjectContext = 'PROFESSIONAL' | 'PERSONAL' | 'ACADEMIC' | 'STUDY';

export type ProjectStatus = 'COMPLETED' | 'IN_PROGRESS' | 'ARCHIVED' | 'PLANNED';

export type ProjectEnvironment =
  | 'FRONTEND'
  | 'BACKEND'
  | 'FULLSTACK'
  | 'MOBILE'
  | 'LIBRARY'
  | 'DASHBOARD';

export interface ProjectRelationReference {
  id: string;
  slug?: string | null;
  name?: string | null;
  namePt?: string | null;
  titlePt?: string | null;
  companyName?: string | null;
  labelPt?: string | null;
  labelEn?: string | null;
  fileName?: string | null;
  filePath?: string | null;
  url?: string | null;
  kind?: string | null;
  code?: string | null;
}

export interface ProjectRelationRecord {
  id?: string;
  technologyId?: string;
  experienceId?: string;
  tagId?: string;
  linkId?: string;
  imageAssetId?: string;
  technology?: ProjectRelationReference | null;
  experience?: ProjectRelationReference | null;
  tag?: ProjectRelationReference | null;
  link?: ProjectRelationReference | null;
  imageAsset?: ProjectRelationReference | null;
}

export interface ProjectRecord {
  id: string;
  slug: string;
  titlePt: string;
  titleEn: string;
  shortDescriptionPt: string;
  shortDescriptionEn: string;
  fullDescriptionPt: string;
  fullDescriptionEn: string;
  context: ProjectContext;
  status: ProjectStatus;
  environment: ProjectEnvironment;
  featured?: boolean | null;
  highlight?: boolean | null;
  startDate?: string | null;
  endDate?: string | null;
  sortOrder?: number | null;
  technologyIds?: string[] | null;
  technologyRelations?: ProjectRelationRecord[] | null;
  experienceIds?: string[] | null;
  tagIds?: string[] | null;
  linkIds?: string[] | null;
  imageAssetIds?: string[] | null;
  technologies?: ProjectRelationRecord[] | null;
  experiences?: ProjectRelationRecord[] | null;
  tags?: ProjectRelationRecord[] | null;
  links?: ProjectRelationRecord[] | null;
  imageAssets?: ProjectRelationRecord[] | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectTechnologyRelationPayload {
  technologyId: string;
}

export interface ProjectMutationPayload {
  slug: string;
  titlePt: string;
  titleEn: string;
  shortDescriptionPt: string;
  shortDescriptionEn: string;
  fullDescriptionPt: string;
  fullDescriptionEn: string;
  context: ProjectContext;
  status: ProjectStatus;
  environment: ProjectEnvironment;
  featured: boolean;
  highlight: boolean;
  startDate?: string;
  endDate?: string;
  sortOrder: number;
  technologyRelations: ProjectTechnologyRelationPayload[];
  experienceIds: string[];
  tagIds: string[];
  linkIds: string[];
  imageAssetIds: string[];
}

export type AdminProjectsCollectionResponse = PaginatedResponse<ProjectRecord>;
