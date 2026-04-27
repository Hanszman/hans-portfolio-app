import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { buildApiUrl } from '../api.config';
import { createDashboardOverviewResponse } from '../mocks/dashboard.mocks';
import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        DashboardService,
      ],
    });
  });

  it('should request the dashboard overview using the configured API base URL', () => {
    const service = TestBed.inject(DashboardService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.getOverview().subscribe((response) => {
      expect(response.summary.projects).toBe(12);
    });

    const request = httpTestingController.expectOne(buildApiUrl('/dashboard'));
    expect(request.request.method).toBe('GET');

    request.flush(
      createDashboardOverviewResponse({
        stackDistribution: {
          generatedAtUtc: '2026-04-18T12:00:00.000Z',
          stacks: [],
        },
      }),
    );

    httpTestingController.verify();
  });

  it('should request each specialized dashboard aggregate endpoint', () => {
    const service = TestBed.inject(DashboardService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    const response = createDashboardOverviewResponse();

    service.getStackDistribution().subscribe((stackDistribution) => {
      expect(stackDistribution.stacks.length).toBe(4);
    });
    service.getProjectContexts().subscribe((projectContexts) => {
      expect(projectContexts.totalProjects).toBe(12);
    });
    service.getTechnologyUsage().subscribe((technologyUsage) => {
      expect(technologyUsage.totalUsageLinks).toBe(48);
    });
    service.getProfessionalTimeline().subscribe((professionalTimeline) => {
      expect(professionalTimeline.totalItems).toBe(1);
    });
    service.getHighlights().subscribe((highlights) => {
      expect(highlights.totalItems).toBe(2);
    });

    const stackRequest = httpTestingController.expectOne(
      buildApiUrl('/dashboard/stack-distribution'),
    );
    expect(stackRequest.request.method).toBe('GET');
    stackRequest.flush(response.stackDistribution);

    const projectContextsRequest = httpTestingController.expectOne(
      buildApiUrl('/dashboard/project-contexts'),
    );
    expect(projectContextsRequest.request.method).toBe('GET');
    projectContextsRequest.flush(response.projectContexts);

    const technologyUsageRequest = httpTestingController.expectOne(
      buildApiUrl('/dashboard/technology-usage'),
    );
    expect(technologyUsageRequest.request.method).toBe('GET');
    technologyUsageRequest.flush(response.technologyUsage);

    const professionalTimelineRequest = httpTestingController.expectOne(
      buildApiUrl('/dashboard/professional-timeline'),
    );
    expect(professionalTimelineRequest.request.method).toBe('GET');
    professionalTimelineRequest.flush(response.professionalTimeline);

    const highlightsRequest = httpTestingController.expectOne(
      buildApiUrl('/dashboard/highlights'),
    );
    expect(highlightsRequest.request.method).toBe('GET');
    highlightsRequest.flush(response.highlights);

    httpTestingController.verify();
  });
});
