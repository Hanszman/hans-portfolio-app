import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { buildApiUrl } from '../api.config';
import {
  AdminPortfolioSettingMutationPayload,
  AdminPortfolioSettingRecord,
} from './admin-portfolio-settings-api.types';

@Injectable({
  providedIn: 'root',
})
export class AdminPortfolioSettingsApiService {
  private readonly httpClient = inject(HttpClient);

  getAll(accessToken: string): Observable<readonly AdminPortfolioSettingRecord[]> {
    return this.httpClient.get<readonly AdminPortfolioSettingRecord[]>(
      buildApiUrl('/admin/portfolio-settings'),
      {
        headers: this.buildAuthHeaders(accessToken),
      },
    );
  }

  create(
    accessToken: string,
    payload: AdminPortfolioSettingMutationPayload,
  ): Observable<AdminPortfolioSettingRecord> {
    return this.httpClient.post<AdminPortfolioSettingRecord>(
      buildApiUrl('/admin/portfolio-settings'),
      payload,
      {
        headers: this.buildAuthHeaders(accessToken),
      },
    );
  }

  update(
    accessToken: string,
    settingId: string,
    payload: AdminPortfolioSettingMutationPayload,
  ): Observable<AdminPortfolioSettingRecord> {
    return this.httpClient.patch<AdminPortfolioSettingRecord>(
      buildApiUrl(`/admin/portfolio-settings/${settingId}`),
      payload,
      {
        headers: this.buildAuthHeaders(accessToken),
      },
    );
  }

  delete(accessToken: string, settingId: string): Observable<void> {
    return this.httpClient.delete<void>(
      buildApiUrl(`/admin/portfolio-settings/${settingId}`),
      {
        headers: this.buildAuthHeaders(accessToken),
      },
    );
  }

  private buildAuthHeaders(accessToken: string): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
  }
}
