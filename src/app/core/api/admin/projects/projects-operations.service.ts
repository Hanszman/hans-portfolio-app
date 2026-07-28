import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { buildApiUrl } from '../../api.config';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../../api.types';
import {
  ProjectMutationPayload,
  ProjectRecord,
  ProjectsCollectionResponse,
} from './projects-operations.types';

@Injectable({ providedIn: 'root' })
export class ProjectsOperationsService {
  private readonly httpClient = inject(HttpClient);

  getAll(
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGE_SIZE,
    search = '',
  ): Observable<ProjectsCollectionResponse> {
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
      sortBy: 'sortOrder',
      sortDirection: 'asc',
    });
    if (search.trim()) params.set('search', search.trim());
    return this.httpClient.get<ProjectsCollectionResponse>(
      buildApiUrl(`/projects?${params.toString()}`),
    );
  }

  create(payload: ProjectMutationPayload): Observable<ProjectRecord> {
    return this.httpClient.post<ProjectRecord>(buildApiUrl('/admin/projects'), payload);
  }

  update(id: string, payload: ProjectMutationPayload): Observable<ProjectRecord> {
    return this.httpClient.put<ProjectRecord>(buildApiUrl(`/admin/projects/${id}`), payload);
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(buildApiUrl(`/admin/projects/${id}`));
  }
}
