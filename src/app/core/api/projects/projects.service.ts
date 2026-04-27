import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { buildApiUrl } from '../api.config';
import { ProjectsCollectionResponse } from './projects.types';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private readonly httpClient = inject(HttpClient);

  getProjects(): Observable<ProjectsCollectionResponse> {
    const searchParams = new URLSearchParams({
      page: '1',
      pageSize: '100',
      sortBy: 'sortOrder',
      sortDirection: 'asc',
    });

    return this.httpClient.get<ProjectsCollectionResponse>(
      buildApiUrl(`/projects?${searchParams.toString()}`),
    );
  }
}
