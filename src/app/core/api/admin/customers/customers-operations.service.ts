import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { buildApiUrl } from '../../api.config';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../../api.types';
import {
  CustomerMutationPayload,
  CustomerRecord,
  CustomersCollectionResponse,
} from './customers-operations.types';

@Injectable({
  providedIn: 'root',
})
export class CustomersOperationsService {
  private readonly httpClient = inject(HttpClient);

  getAll(
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGE_SIZE,
    search = '',
  ): Observable<CustomersCollectionResponse> {
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

    return this.httpClient.get<CustomersCollectionResponse>(
      buildApiUrl(`/customers?${searchParams.toString()}`),
    );
  }

  create(
    accessToken: string,
    payload: CustomerMutationPayload,
  ): Observable<CustomerRecord> {
    return this.httpClient.post<CustomerRecord>(buildApiUrl('/admin/customers'), payload, {
      headers: this.buildAuthHeaders(accessToken),
    });
  }

  update(
    accessToken: string,
    customerId: string,
    payload: CustomerMutationPayload,
  ): Observable<CustomerRecord> {
    return this.httpClient.put<CustomerRecord>(
      buildApiUrl(`/admin/customers/${customerId}`),
      payload,
      {
        headers: this.buildAuthHeaders(accessToken),
      },
    );
  }

  delete(accessToken: string, customerId: string): Observable<void> {
    return this.httpClient.delete<void>(buildApiUrl(`/admin/customers/${customerId}`), {
      headers: this.buildAuthHeaders(accessToken),
    });
  }

  private buildAuthHeaders(accessToken: string): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
  }
}
