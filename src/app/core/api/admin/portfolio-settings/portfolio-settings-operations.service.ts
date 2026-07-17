import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { buildApiUrl } from '../../api.config';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../../api.types';
import {
  PortfolioSettingMutationPayload,
  PortfolioSettingRecord,
  PortfolioSettingsCollectionResponse,
} from './portfolio-settings-operations.types';

@Injectable({
  providedIn: 'root',
})
export class PortfolioSettingsOperationsService {
  private readonly httpClient = inject(HttpClient);

  getAll(
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGE_SIZE,
    search = '',
  ): Observable<PortfolioSettingsCollectionResponse> {
    const searchParams = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
      sortBy: 'key',
      sortDirection: 'asc',
    });

    const normalizedSearch = search.trim();

    if (normalizedSearch) {
      searchParams.set('search', normalizedSearch);
    }

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
