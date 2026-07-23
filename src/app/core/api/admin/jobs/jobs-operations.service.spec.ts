import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { buildApiUrl } from '../../api.config';
import { JobsOperationsService } from './jobs-operations.service';
import {
  JobMutationPayload,
  JobRecord,
  JobsCollectionResponse,
} from './jobs-operations.types';

const createJob = (): JobRecord => ({
  id: 'job-1',
  slug: 'frontend-engineer',
  namePt: 'Engenheiro Front-End',
  nameEn: 'Front-End Engineer',
  summaryPt: 'Papel focado em interfaces.',
  summaryEn: 'Role focused on interfaces.',
  highlight: true,
  sortOrder: 1,
  experienceIds: ['experience-1'],
  imageAssetIds: ['image-asset-1'],
  createdAt: '2026-07-23T00:00:00.000Z',
  updatedAt: '2026-07-23T00:00:00.000Z',
});

const createJobsCollectionResponse = (): JobsCollectionResponse => ({
  data: [createJob()],
  pagination: {
    page: 1,
    pageSize: 5,
    totalItems: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  },
});

const createJobPayload = (): JobMutationPayload => ({
  slug: 'frontend-engineer',
  namePt: 'Engenheiro Front-End',
  nameEn: 'Front-End Engineer',
  summaryPt: 'Papel focado em interfaces.',
  summaryEn: 'Role focused on interfaces.',
  highlight: true,
  sortOrder: 1,
  experienceIds: ['experience-1'],
  imageAssetIds: ['image-asset-1'],
});

describe('JobsOperationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        JobsOperationsService,
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('should load the jobs collection through the public read endpoint', () => {
    const service = TestBed.inject(JobsOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.getAll().subscribe((response) => {
      expect(response).toEqual(createJobsCollectionResponse());
    });

    const request = httpTestingController.expectOne(
      buildApiUrl('/jobs?page=1&pageSize=5&sortBy=sortOrder&sortDirection=asc'),
    );

    expect(request.request.method).toBe('GET');
    expect(request.request.headers.has('Authorization')).toBeFalse();

    request.flush(createJobsCollectionResponse());
  });

  it('should allow custom paging and searching when loading the collection', () => {
    const service = TestBed.inject(JobsOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.getAll(2, 4, ' front ').subscribe();

    const request = httpTestingController.expectOne(
      buildApiUrl('/jobs?page=2&pageSize=4&sortBy=sortOrder&sortDirection=asc&search=front'),
    );

    expect(request.request.method).toBe('GET');

    request.flush(createJobsCollectionResponse());
  });

  it('should create a protected job', () => {
    const service = TestBed.inject(JobsOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.create(createJobPayload()).subscribe((response) => {
      expect(response).toEqual(createJob());
    });

    const request = httpTestingController.expectOne(buildApiUrl('/admin/jobs'));

    expect(request.request.method).toBe('POST');
    expect(request.request.headers.has('Authorization')).toBeFalse();
    expect(request.request.body).toEqual(createJobPayload());

    request.flush(createJob());
  });

  it('should update a protected job through PUT', () => {
    const service = TestBed.inject(JobsOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.update('job-1', createJobPayload()).subscribe((response) => {
      expect(response).toEqual(createJob());
    });

    const request = httpTestingController.expectOne(buildApiUrl('/admin/jobs/job-1'));

    expect(request.request.method).toBe('PUT');
    expect(request.request.headers.has('Authorization')).toBeFalse();
    expect(request.request.body).toEqual(createJobPayload());

    request.flush(createJob());
  });

  it('should delete a protected job', () => {
    const service = TestBed.inject(JobsOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.delete('job-1').subscribe((response) => {
      expect(response).toBeNull();
    });

    const request = httpTestingController.expectOne(buildApiUrl('/admin/jobs/job-1'));

    expect(request.request.method).toBe('DELETE');
    expect(request.request.headers.has('Authorization')).toBeFalse();

    request.flush(null);
  });
});
