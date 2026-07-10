import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { buildApiUrl } from '../../api.config';
import {
  TagMutationPayload,
  TagRecord,
  TagsCollectionResponse,
} from './tags-api.types';

@Injectable({
  providedIn: 'root',
})
export class TagsApiService {
  private readonly httpClient = inject(HttpClient);

  getAll(): Observable<TagsCollectionResponse> {
    const searchParams = new URLSearchParams({
      page: '1',
      pageSize: '100',
      sortBy: 'sortOrder',
      sortDirection: 'asc',
    });

    return this.httpClient.get<TagsCollectionResponse>(
      buildApiUrl(`/tags?${searchParams.toString()}`),
    );
  }

  create(accessToken: string, payload: TagMutationPayload): Observable<TagRecord> {
    return this.httpClient.post<TagRecord>(buildApiUrl('/admin/tags'), payload, {
      headers: this.buildAuthHeaders(accessToken),
    });
  }

  update(
    accessToken: string,
    tagId: string,
    payload: TagMutationPayload,
  ): Observable<TagRecord> {
    return this.httpClient.put<TagRecord>(
      buildApiUrl(`/admin/tags/${tagId}`),
      payload,
      {
        headers: this.buildAuthHeaders(accessToken),
      },
    );
  }

  delete(accessToken: string, tagId: string): Observable<void> {
    return this.httpClient.delete<void>(buildApiUrl(`/admin/tags/${tagId}`), {
      headers: this.buildAuthHeaders(accessToken),
    });
  }

  private buildAuthHeaders(accessToken: string): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
  }
}
