import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { buildApiUrl } from '../api.config';
import { ExperiencesCollectionResponse } from './experiences.types';

@Injectable({
  providedIn: 'root',
})
export class ExperiencesService {
  private readonly httpClient = inject(HttpClient);

  getExperiences(): Observable<ExperiencesCollectionResponse> {
    const searchParams = new URLSearchParams({
      page: '1',
      pageSize: '20',
      sortBy: 'startDate',
      sortDirection: 'desc',
    });

    return this.httpClient.get<ExperiencesCollectionResponse>(
      buildApiUrl(`/experiences?${searchParams.toString()}`),
    );
  }
}
