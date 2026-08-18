import { PaginatedResponse } from '../experiences/experiences.types';

export interface JobExperienceReference {
  id: string;
  slug?: string | null;
  companyName?: string | null;
  titlePt?: string | null;
  titleEn?: string | null;
  titleEs?: string | null;
}

export interface JobExperienceRelationRecord {
  experienceId?: string;
  experience?: JobExperienceReference | null;
}

export interface JobRecord {
  id: string;
  slug: string;
  namePt: string;
  nameEn: string;
  nameEs?: string;
  summaryPt?: string | null;
  summaryEn?: string | null;
  summaryEs?: string | null;
  startDate: string;
  endDate?: string | null;
  highlight?: boolean | null;
  sortOrder?: number | null;
  experienceIds?: string[] | null;
  experiences?: JobExperienceRelationRecord[] | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface JobMutationPayload {
  slug: string;
  namePt: string;
  nameEn: string;
  nameEs?: string;
  summaryPt?: string | null;
  summaryEn?: string | null;
  summaryEs?: string | null;
  startDate: string;
  endDate?: string;
  highlight: boolean;
  sortOrder: number;
  experienceIds: string[];
}

export type JobsCollectionResponse = PaginatedResponse<JobRecord>;
