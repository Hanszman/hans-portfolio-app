import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { apiConfig, buildApiUrl } from '../api.config';
import {
  createHealthResponse,
  createSystemOverviewResponse,
} from '../mocks/system.mocks';
import { SystemService } from './system.service';

describe('SystemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        SystemService,
      ],
    });
  });

  it('should expose the configured API base URL', () => {
    const service = TestBed.inject(SystemService);

    expect(service.apiBaseUrl).toBe(apiConfig.baseUrl);
  });

  it('should request the system overview using the configured API base URL', () => {
    const service = TestBed.inject(SystemService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.getSystemOverview().subscribe();

    const request = httpTestingController.expectOne(buildApiUrl('/system'));
    expect(request.request.method).toBe('GET');

    request.flush(createSystemOverviewResponse());

    httpTestingController.verify();
  });

  it('should request the health endpoint using the configured API base URL', () => {
    const service = TestBed.inject(SystemService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.getHealth().subscribe();

    const request = httpTestingController.expectOne(buildApiUrl('/health'));
    expect(request.request.method).toBe('GET');

    request.flush(createHealthResponse());

    httpTestingController.verify();
  });
});
