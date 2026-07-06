import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { buildApiUrl } from '../api.config';
import { AdminPortfolioSettingsApiService } from './admin-portfolio-settings-api.service';
import {
  AdminPortfolioSettingMutationPayload,
  AdminPortfolioSettingRecord,
} from './admin-portfolio-settings-api.types';

const createPortfolioSetting = (): AdminPortfolioSettingRecord => ({
  id: 'setting-1',
  key: 'hero.metrics',
  value: {
    projects: 12,
  },
  description: 'Controls the highlighted portfolio metrics.',
});

const createPortfolioSettingPayload =
  (): AdminPortfolioSettingMutationPayload => ({
    key: 'hero.metrics',
    value: {
      projects: 12,
    },
    description: 'Controls the highlighted portfolio metrics.',
  });

describe('AdminPortfolioSettingsApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AdminPortfolioSettingsApiService,
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('should load the protected portfolio settings collection', () => {
    const service = TestBed.inject(AdminPortfolioSettingsApiService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.getAll('token-123').subscribe((response) => {
      expect(response).toEqual([createPortfolioSetting()]);
    });

    const request = httpTestingController.expectOne(
      buildApiUrl('/admin/portfolio-settings'),
    );

    expect(request.request.method).toBe('GET');
    expect(request.request.headers.get('Authorization')).toBe('Bearer token-123');

    request.flush([createPortfolioSetting()]);
  });

  it('should create a protected portfolio setting', () => {
    const service = TestBed.inject(AdminPortfolioSettingsApiService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service
      .create('token-123', createPortfolioSettingPayload())
      .subscribe((response) => {
        expect(response).toEqual(createPortfolioSetting());
      });

    const request = httpTestingController.expectOne(
      buildApiUrl('/admin/portfolio-settings'),
    );

    expect(request.request.method).toBe('POST');
    expect(request.request.headers.get('Authorization')).toBe('Bearer token-123');
    expect(request.request.body).toEqual(createPortfolioSettingPayload());

    request.flush(createPortfolioSetting());
  });

  it('should update a protected portfolio setting', () => {
    const service = TestBed.inject(AdminPortfolioSettingsApiService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service
      .update('token-123', 'setting-1', createPortfolioSettingPayload())
      .subscribe((response) => {
        expect(response).toEqual(createPortfolioSetting());
      });

    const request = httpTestingController.expectOne(
      buildApiUrl('/admin/portfolio-settings/setting-1'),
    );

    expect(request.request.method).toBe('PATCH');
    expect(request.request.headers.get('Authorization')).toBe('Bearer token-123');
    expect(request.request.body).toEqual(createPortfolioSettingPayload());

    request.flush(createPortfolioSetting());
  });

  it('should delete a protected portfolio setting', () => {
    const service = TestBed.inject(AdminPortfolioSettingsApiService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.delete('token-123', 'setting-1').subscribe((response) => {
      expect(response).toBeNull();
    });

    const request = httpTestingController.expectOne(
      buildApiUrl('/admin/portfolio-settings/setting-1'),
    );

    expect(request.request.method).toBe('DELETE');
    expect(request.request.headers.get('Authorization')).toBe('Bearer token-123');

    request.flush(null);
  });
});
