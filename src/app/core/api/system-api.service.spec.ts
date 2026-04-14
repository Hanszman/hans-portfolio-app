import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { apiConfig } from './api.config';
import { SystemApiService } from './system-api.service';

describe('SystemApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        SystemApiService,
      ],
    });
  });

  it('should expose the configured API base URL', () => {
    const service = TestBed.inject(SystemApiService);

    expect(service.apiBaseUrl).toBe(apiConfig.baseUrl);
  });

  it('should request the system overview using the configured API base URL', () => {
    const service = TestBed.inject(SystemApiService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.getSystemOverview().subscribe();

    const request = httpTestingController.expectOne(`${apiConfig.baseUrl}/system`);
    expect(request.request.method).toBe('GET');

    request.flush({
      name: 'Hans Portfolio API',
      module: 'system',
      status: 'operational',
      routes: ['/system/ping'],
    });

    httpTestingController.verify();
  });

  it('should request the health endpoint using the configured API base URL', () => {
    const service = TestBed.inject(SystemApiService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.getHealth().subscribe();

    const request = httpTestingController.expectOne(`${apiConfig.baseUrl}/health`);
    expect(request.request.method).toBe('GET');

    request.flush({
      status: 'healthy',
      checks: {
        database: 'up',
      },
      checkedAtUtc: '2026-04-14T13:00:00.000Z',
    });

    httpTestingController.verify();
  });
});
