import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { buildApiUrl } from '../api.config';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../api.types';
import {
  ExperienceMutationPayload,
  ExperienceRecord,
  ExperiencesCollectionResponse as AdminExperiencesCollectionResponse,
} from './experiences-operations.types';
import { ExperiencesCollectionResponse } from './experiences.types';

@Injectable({
  providedIn: 'root',
})
export class ExperiencesService {
  private readonly httpClient = inject(HttpClient);
  private readonly noCacheHeaders = new HttpHeaders({
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
  });

  getExperiences(): Observable<ExperiencesCollectionResponse> {
    const searchParams = new URLSearchParams({
      page: '1',
      pageSize: '20',
      sortBy: 'startDate',
      sortDirection: 'desc',
    });

    return this.httpClient.get<ExperiencesCollectionResponse>(
      buildApiUrl(`/experiences?${searchParams.toString()}`),
      { headers: this.noCacheHeaders },
    );
  }

  getAll(
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGE_SIZE,
    search = '',
  ): Observable<AdminExperiencesCollectionResponse> {
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
      sortBy: 'startDate',
      sortDirection: 'desc',
    });

    if (search.trim()) {
      params.set('search', search.trim());
    }

    return this.httpClient.get<AdminExperiencesCollectionResponse>(
      buildApiUrl(`/experiences?${params.toString()}`),
      { headers: this.noCacheHeaders },
    );
  }

  create(payload: ExperienceMutationPayload): Observable<ExperienceRecord> {
    return this.httpClient.post<ExperienceRecord>(buildApiUrl('/admin/experiences'), payload);
  }

  update(id: string, payload: ExperienceMutationPayload): Observable<ExperienceRecord> {
    return this.httpClient.put<ExperienceRecord>(buildApiUrl(`/admin/experiences/${id}`), payload);
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(buildApiUrl(`/admin/experiences/${id}`));
  }
}
