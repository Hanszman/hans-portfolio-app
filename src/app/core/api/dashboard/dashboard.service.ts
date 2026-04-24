import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { buildApiUrl } from '../api.config';
import { DashboardOverviewResponse } from './dashboard.types';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly httpClient = inject(HttpClient);

  getOverview(): Observable<DashboardOverviewResponse> {
    return this.httpClient.get<DashboardOverviewResponse>(
      buildApiUrl('/dashboard'),
    );
  }
}
