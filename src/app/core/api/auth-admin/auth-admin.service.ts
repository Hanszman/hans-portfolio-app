import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { buildApiUrl } from '../api.config';
import {
  AdminLoginRequest,
  AdminLoginResponse,
  AdminSessionResponse,
} from './auth-admin.types';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthApiService {
  private readonly httpClient = inject(HttpClient);

  login(request: AdminLoginRequest): Observable<AdminLoginResponse> {
    return this.httpClient.post<AdminLoginResponse>(
      buildApiUrl('/auth/login'),
      request,
    );
  }

  getSession(accessToken: string): Observable<AdminSessionResponse> {
    return this.httpClient.get<AdminSessionResponse>(
      buildApiUrl('/admin/session'),
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${accessToken}`,
        }),
      },
    );
  }
}
