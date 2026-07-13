import { PaginatedResponse } from '../../experiences/experiences.types';

export interface PortfolioSettingRecord {
  id: string;
  key: string;
  value: unknown;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface PortfolioSettingMutationPayload {
  key: string;
  value: unknown;
  description?: string;
}

export type PortfolioSettingsCollectionResponse =
  PaginatedResponse<PortfolioSettingRecord>;
