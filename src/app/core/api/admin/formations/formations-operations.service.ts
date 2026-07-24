import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { buildApiUrl } from '../../api.config';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../../api.types';
import {
  FormationMutationPayload,
  FormationRecord,
  FormationsCollectionResponse,
} from './formations-operations.types';

const sanitizeFormationMutationPayload = (
  payload: FormationMutationPayload,
): FormationMutationPayload => ({
  ...payload,
  technologyRelations: payload.technologyRelations.map((relation) => ({
    technologyId: relation.technologyId,
  })),
});

@Injectable({
  providedIn: 'root',
})
export class FormationsOperationsService {
  private readonly httpClient = inject(HttpClient);

  getAll(
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGE_SIZE,
    search = '',
  ): Observable<FormationsCollectionResponse> {
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

    return this.httpClient.get<FormationsCollectionResponse>(
      buildApiUrl(`/formations?${searchParams.toString()}`),
    );
  }

  create(payload: FormationMutationPayload): Observable<FormationRecord> {
    return this.httpClient.post<FormationRecord>(
      buildApiUrl('/admin/formations'),
      sanitizeFormationMutationPayload(payload),
    );
  }

  update(
    formationId: string,
    payload: FormationMutationPayload,
  ): Observable<FormationRecord> {
    return this.httpClient.put<FormationRecord>(
      buildApiUrl(`/admin/formations/${formationId}`),
      sanitizeFormationMutationPayload(payload),
    );
  }

  delete(formationId: string): Observable<void> {
    return this.httpClient.delete<void>(buildApiUrl(`/admin/formations/${formationId}`));
  }
}
