import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { buildApiUrl } from '../../api.config';
import {
  AdminLoginPayload,
  AdminLoginResult,
  AdminSessionSnapshot,
} from './admin-auth-api.types';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthenticationApiService {
  private readonly httpClient = inject(HttpClient);

  login(payload: AdminLoginPayload): Observable<AdminLoginResult> {
    return this.httpClient.post<AdminLoginResult>(
      buildApiUrl('/auth/login'),
      payload,
    );
  }

  getSession(accessToken: string): Observable<AdminSessionSnapshot> {
    return this.httpClient.get<AdminSessionSnapshot>(
      buildApiUrl('/admin/session'),
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${accessToken}`,
        }),
      },
    );
  }
}
