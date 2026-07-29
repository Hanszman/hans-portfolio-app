import { PaginatedResponse } from '../../experiences/experiences.types';

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
  titlePt?: string | null;
  companyName?: string | null;
  labelPt?: string | null;
  fileName?: string | null;
  filePath?: string | null;
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

export type ProjectsCollectionResponse = PaginatedResponse<ProjectRecord>;
