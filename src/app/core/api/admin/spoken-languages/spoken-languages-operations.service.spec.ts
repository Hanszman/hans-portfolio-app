import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { buildApiUrl } from '../../api.config';
import { SpokenLanguagesOperationsService } from './spoken-languages-operations.service';
import {
  SpokenLanguageMutationPayload,
  SpokenLanguageRecord,
  SpokenLanguagesCollectionResponse,
} from './spoken-languages-operations.types';

const createSpokenLanguage = (): SpokenLanguageRecord => ({
  id: 'spoken-language-1',
  code: 'en-us',
  namePt: 'Ingles',
  nameEn: 'English',
  proficiency: 'FLUENT',
  highlight: true,
  sortOrder: 2,
  imageAssetIds: ['image-asset-1'],
  createdAt: '2026-07-17T00:00:00.000Z',
  updatedAt: '2026-07-17T00:00:00.000Z',
});

const createSpokenLanguagesCollectionResponse =
  (): SpokenLanguagesCollectionResponse => ({
    data: [createSpokenLanguage()],
    pagination: {
      page: 1,
      pageSize: 5,
      totalItems: 1,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  });

const createSpokenLanguagePayload = (): SpokenLanguageMutationPayload => ({
  code: 'en-us',
  namePt: 'Ingles',
  nameEn: 'English',
  proficiency: 'FLUENT',
  highlight: true,
  sortOrder: 2,
  imageAssetIds: ['image-asset-1'],
});

describe('SpokenLanguagesOperationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SpokenLanguagesOperationsService,
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('should load the spoken languages collection through the public read endpoint', () => {
    const service = TestBed.inject(SpokenLanguagesOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.getAll().subscribe((response) => {
      expect(response).toEqual(createSpokenLanguagesCollectionResponse());
    });

    const request = httpTestingController.expectOne(
      buildApiUrl(
        '/spoken-languages?page=1&pageSize=5&sortBy=sortOrder&sortDirection=asc',
      ),
    );

    expect(request.request.method).toBe('GET');

    request.flush(createSpokenLanguagesCollectionResponse());
  });

  it('should allow custom paging when loading the collection', () => {
    const service = TestBed.inject(SpokenLanguagesOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.getAll(2, 4).subscribe();

    const request = httpTestingController.expectOne(
      buildApiUrl(
        '/spoken-languages?page=2&pageSize=4&sortBy=sortOrder&sortDirection=asc',
      ),
    );

    expect(request.request.method).toBe('GET');

    request.flush(createSpokenLanguagesCollectionResponse());
  });

  it('should append the search term when loading the collection', () => {
    const service = TestBed.inject(SpokenLanguagesOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.getAll(1, 5, 'english').subscribe();

    const request = httpTestingController.expectOne(
      buildApiUrl(
        '/spoken-languages?page=1&pageSize=5&sortBy=sortOrder&sortDirection=asc&search=english',
      ),
    );

    expect(request.request.method).toBe('GET');

    request.flush(createSpokenLanguagesCollectionResponse());
  });

  it('should create a protected spoken language', () => {
    const service = TestBed.inject(SpokenLanguagesOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service
      .create('token-123', createSpokenLanguagePayload())
      .subscribe((response) => {
        expect(response).toEqual(createSpokenLanguage());
      });

    const request = httpTestingController.expectOne(
      buildApiUrl('/admin/spoken-languages'),
    );

    expect(request.request.method).toBe('POST');
    expect(request.request.headers.get('Authorization')).toBe('Bearer token-123');
    expect(request.request.body).toEqual(createSpokenLanguagePayload());

    request.flush(createSpokenLanguage());
  });

  it('should update a protected spoken language through PUT', () => {
    const service = TestBed.inject(SpokenLanguagesOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service
      .update('token-123', 'spoken-language-1', createSpokenLanguagePayload())
      .subscribe((response) => {
        expect(response).toEqual(createSpokenLanguage());
      });

    const request = httpTestingController.expectOne(
      buildApiUrl('/admin/spoken-languages/spoken-language-1'),
    );

    expect(request.request.method).toBe('PUT');
    expect(request.request.headers.get('Authorization')).toBe('Bearer token-123');
    expect(request.request.body).toEqual(createSpokenLanguagePayload());

    request.flush(createSpokenLanguage());
  });

  it('should delete a protected spoken language', () => {
    const service = TestBed.inject(SpokenLanguagesOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.delete('token-123', 'spoken-language-1').subscribe((response) => {
      expect(response).toBeNull();
    });

    const request = httpTestingController.expectOne(
      buildApiUrl('/admin/spoken-languages/spoken-language-1'),
    );

    expect(request.request.method).toBe('DELETE');
    expect(request.request.headers.get('Authorization')).toBe('Bearer token-123');

    request.flush(null);
  });
});
