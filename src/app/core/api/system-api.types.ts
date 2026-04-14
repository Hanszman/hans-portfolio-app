export interface SystemOverviewResponse {
  readonly name: string;
  readonly module: 'system';
  readonly status: 'operational';
  readonly routes: string[];
}

export interface HealthChecksResponse {
  readonly database: 'up';
}

export interface HealthResponse {
  readonly status: 'healthy';
  readonly checks: HealthChecksResponse;
  readonly checkedAtUtc: string;
}
