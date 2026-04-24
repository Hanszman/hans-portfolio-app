import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiConfig, buildApiUrl } from '../api.config';
import { HealthResponse, SystemOverviewResponse } from './types';

@Injectable({
  providedIn: 'root',
})
export class SystemService {
  private readonly httpClient = inject(HttpClient);

  get apiBaseUrl(): string {
    return apiConfig.baseUrl;
  }

  getSystemOverview(): Observable<SystemOverviewResponse> {
    return this.httpClient.get<SystemOverviewResponse>(buildApiUrl('/system'));
  }

  getHealth(): Observable<HealthResponse> {
    return this.httpClient.get<HealthResponse>(buildApiUrl('/health'));
  }
}
