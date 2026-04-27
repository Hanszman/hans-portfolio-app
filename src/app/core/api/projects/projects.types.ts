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
  isPublished: boolean;
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
  isPublished: boolean;
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
  isPublished: boolean;
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
  isPublished: boolean;
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
  isPublished: boolean;
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
  isPublished: boolean;
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
