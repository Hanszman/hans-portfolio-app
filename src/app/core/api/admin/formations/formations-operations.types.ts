import { PaginatedResponse } from '../../experiences/experiences.types';

export interface FormationTechnologyReference {
  id: string;
  slug?: string | null;
  name?: string | null;
}

export interface FormationLinkReference {
  id: string;
  url?: string | null;
  labelPt?: string | null;
  labelEn?: string | null;
}

export interface FormationImageAssetReference {
  id: string;
  fileName?: string | null;
  filePath?: string | null;
  kind?: string | null;
}

export interface FormationTechnologyRelationRecord {
  technologyId?: string;
  sortOrder?: number | null;
  technology?: FormationTechnologyReference | null;
}

export interface FormationLinkRelationRecord {
  linkId?: string;
  link?: FormationLinkReference | null;
}

export interface FormationImageAssetRelationRecord {
  imageAssetId?: string;
  imageAsset?: FormationImageAssetReference | null;
}

export interface FormationRecord {
  id: string;
  slug: string;
  institution: string;
  titlePt: string;
  titleEn: string;
  degreeType: string;
  summaryPt: string;
  summaryEn: string;
  startDate: string;
  endDate?: string | null;
  highlight?: boolean | null;
  sortOrder?: number | null;
  technologyRelations?: FormationTechnologyRelationRecord[] | null;
  linkIds?: string[] | null;
  imageAssetIds?: string[] | null;
  technologies?: FormationTechnologyRelationRecord[] | null;
  links?: FormationLinkRelationRecord[] | null;
  imageAssets?: FormationImageAssetRelationRecord[] | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface FormationTechnologyRelationPayload {
  technologyId: string;
  sortOrder: number;
}

export interface FormationMutationPayload {
  slug: string;
  institution: string;
  titlePt: string;
  titleEn: string;
  degreeType: string;
  summaryPt: string;
  summaryEn: string;
  startDate: string;
  endDate?: string;
  highlight: boolean;
  sortOrder: number;
  technologyRelations: FormationTechnologyRelationPayload[];
  linkIds: string[];
  imageAssetIds: string[];
}

export type FormationsCollectionResponse = PaginatedResponse<FormationRecord>;
