import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { apiConfig } from './api.config';
import { DashboardApiService } from './dashboard-api.service';

describe('DashboardApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        DashboardApiService,
      ],
    });
  });

  it('should request the dashboard overview using the configured API base URL', () => {
    const service = TestBed.inject(DashboardApiService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.getOverview().subscribe((response) => {
      expect(response.summary.projects).toBe(12);
    });

    const request = httpTestingController.expectOne(
      `${apiConfig.baseUrl}/dashboard`,
    );
    expect(request.request.method).toBe('GET');

    request.flush({
      generatedAtUtc: '2026-04-18T12:00:00.000Z',
      summary: {
        projects: 12,
        experiences: 4,
        technologies: 35,
        formations: 3,
        customers: 6,
        jobs: 5,
        spokenLanguages: 2,
      },
      stackDistribution: {
        generatedAtUtc: '2026-04-18T12:00:00.000Z',
        stacks: [],
      },
      projectContexts: {
        generatedAtUtc: '2026-04-18T12:00:00.000Z',
        totalProjects: 12,
        featuredProjects: 3,
        highlightedProjects: 4,
      },
      technologyUsage: {
        generatedAtUtc: '2026-04-18T12:00:00.000Z',
        totalUsageLinks: 48,
        topTechnologies: [],
      },
      professionalTimeline: {
        generatedAtUtc: '2026-04-18T12:00:00.000Z',
        totalItems: 0,
        items: [],
      },
      highlights: {
        generatedAtUtc: '2026-04-18T12:00:00.000Z',
        totalItems: 0,
        items: [],
      },
    });

    httpTestingController.verify();
  });
});
