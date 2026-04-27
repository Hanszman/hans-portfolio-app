import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { buildApiUrl } from '../api.config';
import { TechnologiesCollectionResponse } from './technologies.types';

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
}
