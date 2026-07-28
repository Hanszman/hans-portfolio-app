import { PaginatedResponse } from '../../experiences/experiences.types';

export interface ExperienceRelationReference {
  id: string;
  slug?: string | null;
  name?: string | null;
  titlePt?: string | null;
  companyName?: string | null;
  fileName?: string | null;
  filePath?: string | null;
}

export interface ExperienceRelationRecord {
  id?: string;
  technologyId?: string;
  projectId?: string;
  customerId?: string;
  jobId?: string;
  linkId?: string;
  imageAssetId?: string;
  technology?: ExperienceRelationReference | null;
  project?: ExperienceRelationReference | null;
  customer?: ExperienceRelationReference | null;
  job?: ExperienceRelationReference | null;
  link?: ExperienceRelationReference | null;
  imageAsset?: ExperienceRelationReference | null;
}

export interface ExperienceRecord {
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
  endDate?: string | null;
  isCurrent?: boolean | null;
  highlight?: boolean | null;
  sortOrder?: number | null;
  technologyRelations?: ExperienceRelationRecord[] | null;
  projectIds?: string[] | null;
  customerIds?: string[] | null;
  jobIds?: string[] | null;
  linkIds?: string[] | null;
  imageAssetIds?: string[] | null;
  technologies?: ExperienceRelationRecord[] | null;
  projects?: ExperienceRelationRecord[] | null;
  customers?: ExperienceRelationRecord[] | null;
  jobs?: ExperienceRelationRecord[] | null;
  links?: ExperienceRelationRecord[] | null;
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
  summaryPt: string;
  summaryEn: string;
  descriptionPt: string;
  descriptionEn: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  highlight: boolean;
  sortOrder: number;
  technologyRelations: ExperienceTechnologyRelationPayload[];
  projectIds: string[];
  customerIds: string[];
  jobIds: string[];
  linkIds: string[];
  imageAssetIds: string[];
}

export type ExperiencesCollectionResponse = PaginatedResponse<ExperienceRecord>;
