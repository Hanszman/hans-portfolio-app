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
});
