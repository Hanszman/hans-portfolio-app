import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { buildApiUrl } from '../../api.config';
import { FormationsOperationsService } from './formations-operations.service';
import {
  FormationMutationPayload,
  FormationRecord,
  FormationsCollectionResponse,
} from './formations-operations.types';

const createFormation = (): FormationRecord => ({
  id: 'formation-1',
  slug: 'computer-science',
  institution: 'UFMG',
  titlePt: 'Ciencia da Computacao',
  titleEn: 'Computer Science',
  degreeType: 'BACHELOR',
  summaryPt: 'Graduacao em computacao.',
  summaryEn: 'Computer science graduation.',
  startDate: '2020-01-01',
  endDate: '2024-12-31',
  highlight: true,
  sortOrder: 1,
  technologyRelations: [{ technologyId: 'technology-1', sortOrder: 0 }],
  linkIds: ['link-1'],
  imageAssetIds: ['image-asset-1'],
  createdAt: '2026-07-23T00:00:00.000Z',
  updatedAt: '2026-07-23T00:00:00.000Z',
});

const createFormationsCollectionResponse = (): FormationsCollectionResponse => ({
  data: [createFormation()],
  pagination: {
    page: 1,
    pageSize: 5,
    totalItems: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  },
});

const createFormationPayload = (): FormationMutationPayload => ({
  slug: 'computer-science',
  institution: 'UFMG',
  titlePt: 'Ciencia da Computacao',
  titleEn: 'Computer Science',
  degreeType: 'BACHELOR',
  summaryPt: 'Graduacao em computacao.',
  summaryEn: 'Computer science graduation.',
  startDate: '2020-01-01',
  endDate: '2024-12-31',
  highlight: true,
  sortOrder: 1,
  technologyRelations: [{ technologyId: 'technology-1', sortOrder: 0 }],
  linkIds: ['link-1'],
  imageAssetIds: ['image-asset-1'],
});

describe('FormationsOperationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormationsOperationsService,
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('should load the formations collection through the public read endpoint', () => {
    const service = TestBed.inject(FormationsOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.getAll().subscribe((response) => {
      expect(response).toEqual(createFormationsCollectionResponse());
    });

    const request = httpTestingController.expectOne(
      buildApiUrl('/formations?page=1&pageSize=5&sortBy=sortOrder&sortDirection=asc'),
    );

    expect(request.request.method).toBe('GET');
    expect(request.request.headers.has('Authorization')).toBeFalse();

    request.flush(createFormationsCollectionResponse());
  });

  it('should allow custom paging and searching when loading the collection', () => {
    const service = TestBed.inject(FormationsOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.getAll(2, 4, ' comp ').subscribe();

    const request = httpTestingController.expectOne(
      buildApiUrl(
        '/formations?page=2&pageSize=4&sortBy=sortOrder&sortDirection=asc&search=comp',
      ),
    );

    expect(request.request.method).toBe('GET');

    request.flush(createFormationsCollectionResponse());
  });

  it('should create a protected formation', () => {
    const service = TestBed.inject(FormationsOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.create(createFormationPayload()).subscribe((response) => {
      expect(response).toEqual(createFormation());
    });

    const request = httpTestingController.expectOne(buildApiUrl('/admin/formations'));

    expect(request.request.method).toBe('POST');
    expect(request.request.headers.has('Authorization')).toBeFalse();
    expect(request.request.body).toEqual(createFormationPayload());

    request.flush(createFormation());
  });

  it('should update a protected formation through PUT', () => {
    const service = TestBed.inject(FormationsOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.update('formation-1', createFormationPayload()).subscribe((response) => {
      expect(response).toEqual(createFormation());
    });

    const request = httpTestingController.expectOne(
      buildApiUrl('/admin/formations/formation-1'),
    );

    expect(request.request.method).toBe('PUT');
    expect(request.request.headers.has('Authorization')).toBeFalse();
    expect(request.request.body).toEqual(createFormationPayload());

    request.flush(createFormation());
  });

  it('should delete a protected formation', () => {
    const service = TestBed.inject(FormationsOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.delete('formation-1').subscribe((response) => {
      expect(response).toBeNull();
    });

    const request = httpTestingController.expectOne(
      buildApiUrl('/admin/formations/formation-1'),
    );

    expect(request.request.method).toBe('DELETE');
    expect(request.request.headers.has('Authorization')).toBeFalse();

    request.flush(null);
  });
});
