import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { buildApiUrl } from '../../api.config';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../../api.types';
import {
  JobMutationPayload,
  JobRecord,
  JobsCollectionResponse,
} from './jobs-operations.types';

@Injectable({
  providedIn: 'root',
})
export class JobsOperationsService {
  private readonly httpClient = inject(HttpClient);

  getAll(
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGE_SIZE,
    search = '',
  ): Observable<JobsCollectionResponse> {
    const searchParams = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
      sortBy: 'sortOrder',
      sortDirection: 'asc',
    });

    const normalizedSearch = search.trim();

    if (normalizedSearch) {
      searchParams.set('search', normalizedSearch);
    }

    return this.httpClient.get<JobsCollectionResponse>(
      buildApiUrl(`/jobs?${searchParams.toString()}`),
    );
  }

  create(payload: JobMutationPayload): Observable<JobRecord> {
    return this.httpClient.post<JobRecord>(buildApiUrl('/admin/jobs'), payload);
  }

  update(jobId: string, payload: JobMutationPayload): Observable<JobRecord> {
    return this.httpClient.put<JobRecord>(
      buildApiUrl(`/admin/jobs/${jobId}`),
      payload,
    );
  }

  delete(jobId: string): Observable<void> {
    return this.httpClient.delete<void>(buildApiUrl(`/admin/jobs/${jobId}`));
  }
}
