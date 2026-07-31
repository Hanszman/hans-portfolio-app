import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { buildApiUrl } from '../api.config';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../api.types';
import {
  TechnologyContextMutationPayload,
  TechnologyContextRecord,
  TechnologyContextsCollectionResponse,
  TechnologyContextsPublicCollectionResponse,
} from './technology-contexts.types';

@Injectable({ providedIn: 'root' })
export class TechnologyContextsService {
  private readonly httpClient = inject(HttpClient);

  getAll(
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGE_SIZE,
    search = '',
  ): Observable<TechnologyContextsCollectionResponse> {
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
      sortBy: 'startedAt',
      sortDirection: 'desc',
    });
    if (search.trim()) params.set('search', search.trim());
    return this.httpClient
      .get<TechnologyContextsPublicCollectionResponse>(
        buildApiUrl(`/technology-contexts?${params.toString()}`),
      )
      .pipe(
        map((response) => ({
          ...response,
          data: response.data.flatMap((group) =>
            group.technologyContexts.map((context) => ({
              ...context,
              technologyId: group.technologyId,
              technology: {
                id: group.technologyId,
                slug: group.slug,
                name: group.name,
              },
            })),
          ),
        })),
      );
  }

  create(payload: TechnologyContextMutationPayload): Observable<TechnologyContextRecord> {
    return this.httpClient.post<TechnologyContextRecord>(
      buildApiUrl('/admin/technology-contexts'),
      payload,
    );
  }

  update(
    id: string,
    payload: TechnologyContextMutationPayload,
  ): Observable<TechnologyContextRecord> {
    return this.httpClient.put<TechnologyContextRecord>(
      buildApiUrl(`/admin/technology-contexts/${id}`),
      payload,
    );
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(buildApiUrl(`/admin/technology-contexts/${id}`));
  }
}
