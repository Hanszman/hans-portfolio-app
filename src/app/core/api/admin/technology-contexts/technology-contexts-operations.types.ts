import { PaginatedResponse } from '../../experiences/experiences.types';
import { TechnologyContextKey } from '../../technologies/technologies.types';

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

export interface TechnologyContextMutationPayload {
  technologyId: string;
  context: TechnologyContextKey;
  startedAt: string;
  endedAt?: string | null;
}

export type TechnologyContextsCollectionResponse = PaginatedResponse<TechnologyContextRecord>;
