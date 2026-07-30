import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { buildApiUrl } from '../api.config';
import { TechnologyContextsOperationsService } from './technology-contexts-operations.service';
import {
  TechnologyContextMutationPayload,
  TechnologyContextRecord,
  TechnologyContextsCollectionResponse,
  TechnologyContextsPublicCollectionResponse,
} from './technology-contexts-operations.types';

const record: TechnologyContextRecord = {
  id: 'context-1',
  technologyId: 'tech-1',
  context: 'PROFESSIONAL',
  startedAt: '2026-01-01',
  endedAt: null,
  technology: { id: 'tech-1', slug: 'angular', name: 'Angular' },
};
const payload: TechnologyContextMutationPayload = {
  technologyId: 'tech-1',
  context: 'PROFESSIONAL',
  startedAt: '2026-01-01',
  endedAt: null,
};
const collection: TechnologyContextsCollectionResponse = {
  data: [record],
  pagination: {
    page: 1,
    pageSize: 5,
    totalItems: 1,
    totalPages: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  },
};
const publicCollection: TechnologyContextsPublicCollectionResponse = {
  data: [
    {
      technologyId: 'tech-1',
      slug: 'angular',
      name: 'Angular',
      technologyContexts: [
        { id: 'context-1', context: 'PROFESSIONAL', startedAt: '2026-01-01', endedAt: null },
      ],
    },
  ],
  pagination: collection.pagination,
};

describe('TechnologyContextsOperationsService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        TechnologyContextsOperationsService,
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }),
  );

  afterEach(() => TestBed.inject(HttpTestingController).verify());

  it('loads public contexts with defaults and search', () => {
    const service = TestBed.inject(TechnologyContextsOperationsService);
    const http = TestBed.inject(HttpTestingController);
    service.getAll(2, 4, ' angular ').subscribe((response) => expect(response).toEqual(collection));
    const request = http.expectOne(
      buildApiUrl(
        '/technology-contexts?page=2&pageSize=4&sortBy=startedAt&sortDirection=desc&search=angular',
      ),
    );
    expect(request.request.method).toBe('GET');
    expect(request.request.headers.has('Authorization')).toBeFalse();
    request.flush(publicCollection);
  });

  it('uses the public read endpoint without a search query when search is blank', () => {
    const service = TestBed.inject(TechnologyContextsOperationsService);
    const http = TestBed.inject(HttpTestingController);
    service.getAll().subscribe((response) => expect(response).toEqual(collection));
    const request = http.expectOne(
      buildApiUrl('/technology-contexts?page=1&pageSize=5&sortBy=startedAt&sortDirection=desc'),
    );
    request.flush(publicCollection);
  });

  it('creates, updates and deletes protected contexts', () => {
    const service = TestBed.inject(TechnologyContextsOperationsService);
    const http = TestBed.inject(HttpTestingController);
    service.create(payload).subscribe((response) => expect(response).toEqual(record));
    let request = http.expectOne(buildApiUrl('/admin/technology-contexts'));
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(payload);
    request.flush(record);
    service.update('context-1', payload).subscribe((response) => expect(response).toEqual(record));
    request = http.expectOne(buildApiUrl('/admin/technology-contexts/context-1'));
    expect(request.request.method).toBe('PUT');
    request.flush(record);
    service.delete('context-1').subscribe((response) => expect(response).toBeNull());
    request = http.expectOne(buildApiUrl('/admin/technology-contexts/context-1'));
    expect(request.request.method).toBe('DELETE');
    request.flush(null);
  });
});
