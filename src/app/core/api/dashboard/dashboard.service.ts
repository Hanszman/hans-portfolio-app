import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { buildApiUrl } from '../api.config';
import {
  DashboardHighlightsResponse,
  DashboardOverviewResponse,
  DashboardProfessionalTimelineResponse,
  DashboardProjectContextsResponse,
  DashboardStackDistributionResponse,
  DashboardTechnologyUsageResponse,
} from './dashboard.types';

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

  getStackDistribution(): Observable<DashboardStackDistributionResponse> {
    return this.httpClient.get<DashboardStackDistributionResponse>(
      buildApiUrl('/dashboard/stack-distribution'),
    );
  }

  getProjectContexts(): Observable<DashboardProjectContextsResponse> {
    return this.httpClient.get<DashboardProjectContextsResponse>(
      buildApiUrl('/dashboard/project-contexts'),
    );
  }

  getTechnologyUsage(): Observable<DashboardTechnologyUsageResponse> {
    return this.httpClient.get<DashboardTechnologyUsageResponse>(
      buildApiUrl('/dashboard/technology-usage'),
    );
  }

  getProfessionalTimeline(): Observable<DashboardProfessionalTimelineResponse> {
    return this.httpClient.get<DashboardProfessionalTimelineResponse>(
      buildApiUrl('/dashboard/professional-timeline'),
    );
  }

  getHighlights(): Observable<DashboardHighlightsResponse> {
    return this.httpClient.get<DashboardHighlightsResponse>(
      buildApiUrl('/dashboard/highlights'),
    );
  }
}
