import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { buildApiUrl } from '../../api.config';
import { TagsOperationsService } from './tags-operations.service';
import {
  TagMutationPayload,
  TagRecord,
  TagsCollectionResponse,
} from './tags-operations.types';

const createTag = (): TagRecord => ({
  id: 'tag-1',
  slug: 'frontend',
  namePt: 'Front-End',
  nameEn: 'Front-End',
  type: 'STACK',
  sortOrder: 1,
  projectIds: ['project-1'],
  technologyIds: ['technology-1'],
  createdAt: '2026-07-10T00:00:00.000Z',
  updatedAt: '2026-07-10T00:00:00.000Z',
});

const createTagsCollectionResponse = (): TagsCollectionResponse => ({
  data: [createTag()],
  pagination: {
    page: 1,
    pageSize: 5,
    totalItems: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  },
});

const createTagPayload = (): TagMutationPayload => ({
  slug: 'frontend',
  namePt: 'Front-End',
  nameEn: 'Front-End',
  type: 'STACK',
  sortOrder: 1,
  projectIds: ['project-1'],
  technologyIds: ['technology-1'],
});

describe('TagsOperationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TagsOperationsService,
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('should load the tags collection', () => {
    const service = TestBed.inject(TagsOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.getAll().subscribe((response) => {
      expect(response).toEqual(createTagsCollectionResponse());
    });

    const request = httpTestingController.expectOne(
      buildApiUrl('/tags?page=1&pageSize=5&sortBy=sortOrder&sortDirection=asc'),
    );

    expect(request.request.method).toBe('GET');
    expect(request.request.headers.has('Authorization')).toBeFalse();

    request.flush(createTagsCollectionResponse());
  });

  it('should allow custom paging when loading the collection', () => {
    const service = TestBed.inject(TagsOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.getAll(2, 4).subscribe();

    const request = httpTestingController.expectOne(
      buildApiUrl('/tags?page=2&pageSize=4&sortBy=sortOrder&sortDirection=asc'),
    );

    expect(request.request.method).toBe('GET');

    request.flush(createTagsCollectionResponse());
  });

  it('should append the search term when loading the collection', () => {
    const service = TestBed.inject(TagsOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.getAll(1, 5, 'angular').subscribe();

    const request = httpTestingController.expectOne(
      buildApiUrl('/tags?page=1&pageSize=5&sortBy=sortOrder&sortDirection=asc&search=angular'),
    );

    expect(request.request.method).toBe('GET');

    request.flush(createTagsCollectionResponse());
  });

  it('should create a protected tag', () => {
    const service = TestBed.inject(TagsOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.create(createTagPayload()).subscribe((response) => {
      expect(response).toEqual(createTag());
    });

    const request = httpTestingController.expectOne(buildApiUrl('/admin/tags'));

    expect(request.request.method).toBe('POST');
    expect(request.request.headers.has('Authorization')).toBeFalse();
    expect(request.request.body).toEqual(createTagPayload());

    request.flush(createTag());
  });

  it('should update a protected tag through PUT', () => {
    const service = TestBed.inject(TagsOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.update('tag-1', createTagPayload()).subscribe((response) => {
      expect(response).toEqual(createTag());
    });

    const request = httpTestingController.expectOne(buildApiUrl('/admin/tags/tag-1'));

    expect(request.request.method).toBe('PUT');
    expect(request.request.headers.has('Authorization')).toBeFalse();
    expect(request.request.body).toEqual(createTagPayload());

    request.flush(createTag());
  });

  it('should delete a protected tag', () => {
    const service = TestBed.inject(TagsOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.delete('tag-1').subscribe((response) => {
      expect(response).toBeNull();
    });

    const request = httpTestingController.expectOne(buildApiUrl('/admin/tags/tag-1'));

    expect(request.request.method).toBe('DELETE');
    expect(request.request.headers.has('Authorization')).toBeFalse();

    request.flush(null);
  });
});
