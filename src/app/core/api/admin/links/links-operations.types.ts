import { PaginatedResponse } from '../../experiences/experiences.types';

export interface LinkProjectReference {
  id: string;
  slug?: string;
  titlePt?: string | null;
  titleEn?: string | null;
}

export interface LinkExperienceReference {
  id: string;
  slug?: string;
  companyName?: string | null;
  titlePt?: string | null;
  titleEn?: string | null;
}

export interface LinkTechnologyReference {
  id: string;
  slug?: string;
  name?: string | null;
}

export interface LinkFormationReference {
  id: string;
  slug?: string;
  namePt?: string | null;
  nameEn?: string | null;
}

export interface LinkProjectRelationRecord {
  projectId?: string;
  project?: LinkProjectReference | null;
}

export interface LinkExperienceRelationRecord {
  experienceId?: string;
  experience?: LinkExperienceReference | null;
}

export interface LinkTechnologyRelationRecord {
  technologyId?: string;
  technology?: LinkTechnologyReference | null;
}

export interface LinkFormationRelationRecord {
  formationId?: string;
  formation?: LinkFormationReference | null;
}

export interface LinkRecord {
  id: string;
  url: string;
  labelPt?: string | null;
  labelEn?: string | null;
  descriptionPt?: string | null;
  descriptionEn?: string | null;
  type?: string | null;
  sortOrder?: number | null;
  isPublished?: boolean | null;
  projectIds?: string[] | null;
  experienceIds?: string[] | null;
  technologyIds?: string[] | null;
  formationIds?: string[] | null;
  projects?: LinkProjectRelationRecord[] | null;
  experiences?: LinkExperienceRelationRecord[] | null;
  technologies?: LinkTechnologyRelationRecord[] | null;
  formations?: LinkFormationRelationRecord[] | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface LinkMutationPayload {
  url: string;
  labelPt: string;
  labelEn: string;
  descriptionPt: string;
  descriptionEn: string;
  type: string;
  sortOrder: number;
  isPublished: boolean;
  projectIds: string[];
  experienceIds: string[];
  technologyIds: string[];
  formationIds: string[];
}

export type LinksCollectionResponse = PaginatedResponse<LinkRecord>;
