import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { buildApiUrl } from '../api.config';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../api.types';
import {
  ProjectMutationPayload,
  ProjectRecord,
  ProjectsCollectionResponse as AdminProjectsCollectionResponse,
} from './projects-operations.types';
import { ProjectsCollectionResponse } from './projects.types';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private readonly httpClient = inject(HttpClient);
  private readonly noCacheHeaders = new HttpHeaders({
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
  });

  getProjects(): Observable<ProjectsCollectionResponse> {
    const searchParams = new URLSearchParams({
      page: '1',
      pageSize: '100',
      sortBy: 'sortOrder',
      sortDirection: 'asc',
    });

    return this.httpClient.get<ProjectsCollectionResponse>(
      buildApiUrl(`/projects?${searchParams.toString()}`),
      { headers: this.noCacheHeaders },
    );
  }

  getAll(
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGE_SIZE,
    search = '',
  ): Observable<AdminProjectsCollectionResponse> {
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
      sortBy: 'sortOrder',
      sortDirection: 'asc',
    });

    if (search.trim()) {
      params.set('search', search.trim());
    }

    return this.httpClient.get<AdminProjectsCollectionResponse>(
      buildApiUrl(`/projects?${params.toString()}`),
      { headers: this.noCacheHeaders },
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
