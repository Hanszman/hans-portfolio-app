export interface AdminPortfolioSettingRecord {
  id: string;
  key: string;
  value: unknown;
  description: string;
}

export interface AdminPortfolioSettingMutationPayload {
  key: string;
  value: unknown;
  description: string;
}
