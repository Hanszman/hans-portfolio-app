import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { buildApiUrl } from '../../api.config';
import {
  AdminLoginPayload,
  AdminLoginResult,
  AdminSessionSnapshot,
} from './admin-auth.types';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthenticationService {
  private readonly httpClient = inject(HttpClient);

  login(payload: AdminLoginPayload): Observable<AdminLoginResult> {
    return this.httpClient.post<AdminLoginResult>(
      buildApiUrl('/auth/login'),
      payload,
    );
  }

  getSession(): Observable<AdminSessionSnapshot> {
    return this.httpClient.get<AdminSessionSnapshot>(buildApiUrl('/admin/session'));
  }
}
