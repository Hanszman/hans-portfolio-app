import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { buildApiUrl } from '../../api.config';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../../api.types';
import {
  TagMutationPayload,
  TagRecord,
  TagsCollectionResponse,
} from './tags-operations.types';

@Injectable({
  providedIn: 'root',
})
export class TagsOperationsService {
  private readonly httpClient = inject(HttpClient);

  getAll(
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGE_SIZE,
    search = '',
  ): Observable<TagsCollectionResponse> {
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

    return this.httpClient.get<TagsCollectionResponse>(
      buildApiUrl(`/tags?${searchParams.toString()}`),
    );
  }

  create(payload: TagMutationPayload): Observable<TagRecord> {
    return this.httpClient.post<TagRecord>(buildApiUrl('/admin/tags'), payload);
  }

  update(tagId: string, payload: TagMutationPayload): Observable<TagRecord> {
    return this.httpClient.put<TagRecord>(buildApiUrl(`/admin/tags/${tagId}`), payload);
  }

  delete(tagId: string): Observable<void> {
    return this.httpClient.delete<void>(buildApiUrl(`/admin/tags/${tagId}`));
  }
}
