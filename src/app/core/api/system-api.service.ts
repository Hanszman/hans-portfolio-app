import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../config/api-base-url.token';
import { buildApiUrl } from '../config/api-url.helper';
import { HealthResponse, SystemOverviewResponse } from './system-api.types';

@Injectable({
  providedIn: 'root',
})
export class SystemApiService {
  private readonly httpClient = inject(HttpClient);
  private readonly resolvedApiBaseUrl = inject(API_BASE_URL);

  get apiBaseUrl(): string {
    return this.resolvedApiBaseUrl;
  }

  getSystemOverview(): Observable<SystemOverviewResponse> {
    return this.httpClient.get<SystemOverviewResponse>(
      buildApiUrl(this.resolvedApiBaseUrl, '/system'),
    );
  }

  getHealth(): Observable<HealthResponse> {
    return this.httpClient.get<HealthResponse>(
      buildApiUrl(this.resolvedApiBaseUrl, '/health'),
    );
  }
}
