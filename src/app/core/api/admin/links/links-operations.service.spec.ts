import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { buildApiUrl } from '../../api.config';
import { LinksOperationsService } from './links-operations.service';
import {
  LinkMutationPayload,
  LinkRecord,
  LinksCollectionResponse,
} from './links-operations.types';

const createLink = (): LinkRecord => ({
  id: 'link-1',
  url: 'https://github.com/victor/hans',
  labelPt: 'Repositorio',
  labelEn: 'Repository',
  descriptionPt: 'Codigo fonte',
  descriptionEn: 'Source code',
  type: 'GITHUB',
  sortOrder: 1,
  projectIds: ['project-1'],
  experienceIds: ['experience-1'],
  technologyIds: ['technology-1'],
  formationIds: ['formation-1'],
  createdAt: '2026-07-12T00:00:00.000Z',
  updatedAt: '2026-07-12T00:00:00.000Z',
});

const createLinksCollectionResponse = (): LinksCollectionResponse => ({
  data: [createLink()],
  pagination: {
    page: 1,
    pageSize: 5,
    totalItems: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  },
});

const createLinkPayload = (): LinkMutationPayload => ({
  url: 'https://github.com/victor/hans',
  labelPt: 'Repositorio',
  labelEn: 'Repository',
  descriptionPt: 'Codigo fonte',
  descriptionEn: 'Source code',
  type: 'GITHUB',
  sortOrder: 1,
  isPublished: true,
  projectIds: ['project-1'],
  experienceIds: ['experience-1'],
  technologyIds: ['technology-1'],
  formationIds: ['formation-1'],
});

describe('LinksOperationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LinksOperationsService,
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('should load the links collection', () => {
    const service = TestBed.inject(LinksOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.getAll().subscribe((response) => {
      expect(response).toEqual(createLinksCollectionResponse());
    });

    const request = httpTestingController.expectOne(
      buildApiUrl('/links?page=1&pageSize=5&sortBy=sortOrder&sortDirection=asc'),
    );

    expect(request.request.method).toBe('GET');
    expect(request.request.headers.has('Authorization')).toBeFalse();

    request.flush(createLinksCollectionResponse());
  });

  it('should allow custom paging when loading the collection', () => {
    const service = TestBed.inject(LinksOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.getAll(2, 4).subscribe();

    const request = httpTestingController.expectOne(
      buildApiUrl('/links?page=2&pageSize=4&sortBy=sortOrder&sortDirection=asc'),
    );

    expect(request.request.method).toBe('GET');

    request.flush(createLinksCollectionResponse());
  });

  it('should append the search term when loading the collection', () => {
    const service = TestBed.inject(LinksOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.getAll(1, 5, 'github').subscribe();

    const request = httpTestingController.expectOne(
      buildApiUrl('/links?page=1&pageSize=5&sortBy=sortOrder&sortDirection=asc&search=github'),
    );

    expect(request.request.method).toBe('GET');

    request.flush(createLinksCollectionResponse());
  });

  it('should create a protected link', () => {
    const service = TestBed.inject(LinksOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.create(createLinkPayload()).subscribe((response) => {
      expect(response).toEqual(createLink());
    });

    const request = httpTestingController.expectOne(buildApiUrl('/admin/links'));

    expect(request.request.method).toBe('POST');
    expect(request.request.headers.has('Authorization')).toBeFalse();
    expect(request.request.body).toEqual(createLinkPayload());

    request.flush(createLink());
  });

  it('should update a protected link through PUT', () => {
    const service = TestBed.inject(LinksOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.update('link-1', createLinkPayload()).subscribe((response) => {
      expect(response).toEqual(createLink());
    });

    const request = httpTestingController.expectOne(buildApiUrl('/admin/links/link-1'));

    expect(request.request.method).toBe('PUT');
    expect(request.request.headers.has('Authorization')).toBeFalse();
    expect(request.request.body).toEqual(createLinkPayload());

    request.flush(createLink());
  });

  it('should delete a protected link', () => {
    const service = TestBed.inject(LinksOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.delete('link-1').subscribe((response) => {
      expect(response).toBeNull();
    });

    const request = httpTestingController.expectOne(buildApiUrl('/admin/links/link-1'));

    expect(request.request.method).toBe('DELETE');
    expect(request.request.headers.has('Authorization')).toBeFalse();

    request.flush(null);
  });
});

