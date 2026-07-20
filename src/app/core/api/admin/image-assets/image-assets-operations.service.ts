import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { buildApiUrl } from '../../api.config';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../../api.types';
import {
  ImageAssetMutationPayload,
  ImageAssetRecord,
  ImageAssetsCollectionResponse,
} from './image-assets-operations.types';

@Injectable({
  providedIn: 'root',
})
export class ImageAssetsOperationsService {
  private readonly httpClient = inject(HttpClient);

  getAll(
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGE_SIZE,
    search = '',
  ): Observable<ImageAssetsCollectionResponse> {
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

    return this.httpClient.get<ImageAssetsCollectionResponse>(
      buildApiUrl(`/image-assets?${searchParams.toString()}`),
    );
  }

  create(payload: ImageAssetMutationPayload): Observable<ImageAssetRecord> {
    return this.httpClient.post<ImageAssetRecord>(buildApiUrl('/admin/image-assets'), payload);
  }

  update(
    imageAssetId: string,
    payload: ImageAssetMutationPayload,
  ): Observable<ImageAssetRecord> {
    return this.httpClient.put<ImageAssetRecord>(
      buildApiUrl(`/admin/image-assets/${imageAssetId}`),
      payload,
    );
  }

  delete(imageAssetId: string): Observable<void> {
    return this.httpClient.delete<void>(buildApiUrl(`/admin/image-assets/${imageAssetId}`));
  }
}
