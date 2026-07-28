import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { buildApiUrl } from '../../api.config';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../../api.types';
import {
  ExperienceMutationPayload,
  ExperienceRecord,
  ExperiencesCollectionResponse,
} from './experiences-operations.types';

@Injectable({ providedIn: 'root' })
export class ExperiencesOperationsService {
  private readonly httpClient = inject(HttpClient);

  getAll(
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGE_SIZE,
    search = '',
  ): Observable<ExperiencesCollectionResponse> {
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
      sortBy: 'startDate',
      sortDirection: 'desc',
    });
    if (search.trim()) params.set('search', search.trim());
    return this.httpClient.get<ExperiencesCollectionResponse>(
      buildApiUrl(`/experiences?${params.toString()}`),
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
