import { PaginatedResponse } from '../experiences/experiences.types';

export interface LinkProjectReference {
  id: string;
  slug?: string;
  titlePt?: string | null;
  titleEn?: string | null;
  titleEs?: string | null;
}

export interface LinkProjectRelationRecord {
  projectId?: string;
  project?: LinkProjectReference | null;
}

export interface LinkRecord {
  id: string;
  url: string;
  labelPt?: string | null;
  labelEn?: string | null;
  labelEs?: string | null;
  descriptionPt?: string | null;
  descriptionEn?: string | null;
  descriptionEs?: string | null;
  type?: string | null;
  sortOrder?: number | null;
  projectIds?: string[] | null;
  projects?: LinkProjectRelationRecord[] | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface LinkMutationPayload {
  url: string;
  labelPt: string;
  labelEn: string;
  labelEs?: string;
  descriptionPt: string;
  descriptionEn: string;
  descriptionEs?: string;
  type: string;
  sortOrder: number;
  projectIds: string[];
}

export type LinksCollectionResponse = PaginatedResponse<LinkRecord>;
