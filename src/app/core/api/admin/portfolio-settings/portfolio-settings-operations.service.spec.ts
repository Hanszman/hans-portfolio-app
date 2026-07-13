import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { buildApiUrl } from '../../api.config';
import { PortfolioSettingsOperationsService } from './portfolio-settings-operations.service';
import {
  PortfolioSettingMutationPayload,
  PortfolioSettingRecord,
  PortfolioSettingsCollectionResponse,
} from './portfolio-settings-operations.types';

const createPortfolioSetting = (): PortfolioSettingRecord => ({
  id: 'setting-1',
  key: 'hero.metrics',
  value: {
    projects: 12,
  },
  description: 'Controls the highlighted portfolio metrics.',
  createdAt: '2026-07-06T00:00:00.000Z',
  updatedAt: '2026-07-06T00:00:00.000Z',
});

const createPortfolioSettingsCollectionResponse =
  (): PortfolioSettingsCollectionResponse => ({
    data: [createPortfolioSetting()],
    pagination: {
      page: 1,
      pageSize: 5,
      totalItems: 1,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  });

const createPortfolioSettingPayload =
  (): PortfolioSettingMutationPayload => ({
    key: 'hero.metrics',
    value: {
      projects: 12,
    },
    description: 'Controls the highlighted portfolio metrics.',
  });

describe('PortfolioSettingsOperationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PortfolioSettingsOperationsService,
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('should load the portfolio settings collection through the public read endpoint', () => {
    const service = TestBed.inject(PortfolioSettingsOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.getAll().subscribe((response) => {
      expect(response).toEqual(createPortfolioSettingsCollectionResponse());
    });

    const request = httpTestingController.expectOne(
      buildApiUrl('/portfolio-settings?page=1&pageSize=5&sortBy=key&sortDirection=asc'),
    );

    expect(request.request.method).toBe('GET');

    request.flush(createPortfolioSettingsCollectionResponse());
  });

  it('should allow custom paging when loading the collection', () => {
    const service = TestBed.inject(PortfolioSettingsOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.getAll(3, 4).subscribe();

    const request = httpTestingController.expectOne(
      buildApiUrl('/portfolio-settings?page=3&pageSize=4&sortBy=key&sortDirection=asc'),
    );

    expect(request.request.method).toBe('GET');

    request.flush(createPortfolioSettingsCollectionResponse());
  });

  it('should create a protected portfolio setting', () => {
    const service = TestBed.inject(PortfolioSettingsOperationsService);
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

  it('should update a protected portfolio setting through PUT', () => {
    const service = TestBed.inject(PortfolioSettingsOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service
      .update('token-123', 'setting-1', createPortfolioSettingPayload())
      .subscribe((response) => {
        expect(response).toEqual(createPortfolioSetting());
      });

    const request = httpTestingController.expectOne(
      buildApiUrl('/admin/portfolio-settings/setting-1'),
    );

    expect(request.request.method).toBe('PUT');
    expect(request.request.headers.get('Authorization')).toBe('Bearer token-123');
    expect(request.request.body).toEqual(createPortfolioSettingPayload());

    request.flush(createPortfolioSetting());
  });

  it('should delete a protected portfolio setting', () => {
    const service = TestBed.inject(PortfolioSettingsOperationsService);
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
