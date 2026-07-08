import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { buildApiUrl } from '../../api.config';
import {
  PortfolioSettingMutationPayload,
  PortfolioSettingRecord,
  PortfolioSettingsCollectionResponse,
} from './portfolio-settings-api.types';

@Injectable({
  providedIn: 'root',
})
export class PortfolioSettingsApiService {
  private readonly httpClient = inject(HttpClient);

  getAll(): Observable<PortfolioSettingsCollectionResponse> {
    const searchParams = new URLSearchParams({
      page: '1',
      pageSize: '100',
      sortBy: 'key',
      sortDirection: 'asc',
    });

    return this.httpClient.get<PortfolioSettingsCollectionResponse>(
      buildApiUrl(`/portfolio-settings?${searchParams.toString()}`),
    );
  }

  create(
    accessToken: string,
    payload: PortfolioSettingMutationPayload,
  ): Observable<PortfolioSettingRecord> {
    return this.httpClient.post<PortfolioSettingRecord>(
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
    payload: PortfolioSettingMutationPayload,
  ): Observable<PortfolioSettingRecord> {
    return this.httpClient.put<PortfolioSettingRecord>(
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
