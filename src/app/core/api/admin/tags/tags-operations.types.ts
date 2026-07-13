import { PaginatedResponse } from '../../experiences/experiences.types';

export interface TagProjectReference {
  id: string;
  slug?: string;
  titlePt?: string | null;
  titleEn?: string | null;
}

export interface TagTechnologyReference {
  id: string;
  slug?: string;
  name?: string | null;
}

export interface TagProjectRelationRecord {
  projectId?: string;
  project?: TagProjectReference | null;
}

export interface TagTechnologyRelationRecord {
  technologyId?: string;
  technology?: TagTechnologyReference | null;
}

export interface TagRecord {
  id: string;
  slug: string;
  namePt?: string | null;
  nameEn?: string | null;
  labelPt?: string | null;
  labelEn?: string | null;
  type?: string | null;
  color?: string | null;
  sortOrder?: number | null;
  projectIds?: string[] | null;
  technologyIds?: string[] | null;
  projects?: TagProjectRelationRecord[] | null;
  technologies?: TagTechnologyRelationRecord[] | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface TagMutationPayload {
  slug: string;
  namePt: string;
  nameEn: string;
  type: string;
  sortOrder: number;
  projectIds: string[];
  technologyIds: string[];
}

export type TagsCollectionResponse = PaginatedResponse<TagRecord>;
