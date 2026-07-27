import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { buildApiUrl } from '../api.config';
import {
  TechnologyAdminRecord,
  TechnologyMutationPayload,
  TechnologiesCollectionResponse,
} from './technologies.types';

@Injectable({
  providedIn: 'root',
})
export class TechnologiesService {
  private readonly httpClient = inject(HttpClient);

  getTechnologies(): Observable<TechnologiesCollectionResponse> {
    const searchParams = new URLSearchParams({
      page: '1',
      pageSize: '100',
      sortBy: 'sortOrder',
      sortDirection: 'asc',
    });

    return this.httpClient.get<TechnologiesCollectionResponse>(
      buildApiUrl(`/technologies?${searchParams.toString()}`),
    );
  }

  getAll(page = 1, pageSize = 5, search = ''): Observable<TechnologiesCollectionResponse> {
    const searchParams = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
      sortBy: 'sortOrder',
      sortDirection: 'asc',
    });
    if (search.trim()) searchParams.set('search', search.trim());
    return this.httpClient.get<TechnologiesCollectionResponse>(
      buildApiUrl(`/technologies?${searchParams.toString()}`),
    );
  }

  create(payload: TechnologyMutationPayload): Observable<TechnologyAdminRecord> {
    return this.httpClient.post<TechnologyAdminRecord>(
      buildApiUrl('/admin/technologies'),
      payload,
    );
  }

  update(id: string, payload: TechnologyMutationPayload): Observable<TechnologyAdminRecord> {
    return this.httpClient.put<TechnologyAdminRecord>(
      buildApiUrl(`/admin/technologies/${id}`),
      payload,
    );
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(buildApiUrl(`/admin/technologies/${id}`));
  }
}
