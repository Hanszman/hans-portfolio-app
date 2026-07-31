import { PaginatedResponse } from '../experiences/experiences.types';
import { TechnologyContextKey } from '../technologies/technologies.types';

export interface TechnologyContextTechnologyReference {
  id: string;
  slug: string;
  name: string;
}

export interface TechnologyContextRecord {
  id: string;
  technologyId: string;
  context: TechnologyContextKey;
  startedAt: string;
  endedAt: string | null;
  technology?: TechnologyContextTechnologyReference | null;
}

export interface TechnologyContextPublicGroup {
  technologyId: string;
  slug: string;
  name: string;
  technologyContexts: readonly TechnologyContextPublicRecord[];
}

export interface TechnologyContextPublicRecord {
  id: string;
  context: TechnologyContextKey;
  startedAt: string;
  endedAt: string | null;
}

export type TechnologyContextsPublicCollectionResponse = PaginatedResponse<TechnologyContextPublicGroup>;

export interface TechnologyContextMutationPayload {
  technologyId: string;
  context: TechnologyContextKey;
  startedAt: string;
  endedAt?: string | null;
}

export type TechnologyContextsCollectionResponse = PaginatedResponse<TechnologyContextRecord>;
