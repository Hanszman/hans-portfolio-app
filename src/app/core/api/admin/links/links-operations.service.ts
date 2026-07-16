import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { buildApiUrl } from '../../api.config';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../../api.types';
import {
  LinkMutationPayload,
  LinkRecord,
  LinksCollectionResponse,
} from './links-operations.types';

@Injectable({
  providedIn: 'root',
})
export class LinksOperationsService {
  private readonly httpClient = inject(HttpClient);

  getAll(
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGE_SIZE,
  ): Observable<LinksCollectionResponse> {
    const searchParams = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
      sortBy: 'sortOrder',
      sortDirection: 'asc',
    });

    return this.httpClient.get<LinksCollectionResponse>(
      buildApiUrl(`/links?${searchParams.toString()}`),
    );
  }

  create(accessToken: string, payload: LinkMutationPayload): Observable<LinkRecord> {
    return this.httpClient.post<LinkRecord>(buildApiUrl('/admin/links'), payload, {
      headers: this.buildAuthHeaders(accessToken),
    });
  }

  update(
    accessToken: string,
    linkId: string,
    payload: LinkMutationPayload,
  ): Observable<LinkRecord> {
    return this.httpClient.put<LinkRecord>(
      buildApiUrl(`/admin/links/${linkId}`),
      payload,
      {
        headers: this.buildAuthHeaders(accessToken),
      },
    );
  }

  delete(accessToken: string, linkId: string): Observable<void> {
    return this.httpClient.delete<void>(buildApiUrl(`/admin/links/${linkId}`), {
      headers: this.buildAuthHeaders(accessToken),
    });
  }

  private buildAuthHeaders(accessToken: string): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
  }
}
