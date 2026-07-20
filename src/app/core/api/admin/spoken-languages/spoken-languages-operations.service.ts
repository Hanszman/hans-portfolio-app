import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { buildApiUrl } from '../../api.config';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../../api.types';
import {
  SpokenLanguageMutationPayload,
  SpokenLanguageRecord,
  SpokenLanguagesCollectionResponse,
} from './spoken-languages-operations.types';

@Injectable({
  providedIn: 'root',
})
export class SpokenLanguagesOperationsService {
  private readonly httpClient = inject(HttpClient);

  getAll(
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGE_SIZE,
    search = '',
  ): Observable<SpokenLanguagesCollectionResponse> {
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

    return this.httpClient.get<SpokenLanguagesCollectionResponse>(
      buildApiUrl(`/spoken-languages?${searchParams.toString()}`),
    );
  }

  create(payload: SpokenLanguageMutationPayload): Observable<SpokenLanguageRecord> {
    return this.httpClient.post<SpokenLanguageRecord>(
      buildApiUrl('/admin/spoken-languages'),
      payload,
    );
  }

  update(
    spokenLanguageId: string,
    payload: SpokenLanguageMutationPayload,
  ): Observable<SpokenLanguageRecord> {
    return this.httpClient.put<SpokenLanguageRecord>(
      buildApiUrl(`/admin/spoken-languages/${spokenLanguageId}`),
      payload,
    );
  }

  delete(spokenLanguageId: string): Observable<void> {
    return this.httpClient.delete<void>(
      buildApiUrl(`/admin/spoken-languages/${spokenLanguageId}`),
    );
  }
}
