import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { buildApiUrl } from '../api.config';
import { createTechnologiesCollectionResponse } from '../mocks/technologies.mocks';
import { TechnologiesService } from './technologies.service';

const payload = {
  slug: 'angular',
  name: 'Angular',
  category: 'FRAMEWORK',
  highlight: true,
  sortOrder: 1,
  projectRelations: [],
  experienceRelations: [],
  formationRelations: [],
  tagIds: [],
  linkIds: [],
  imageAssetIds: [],
};

describe('TechnologiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TechnologiesService,
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('should request the public technologies collection with the expected catalog query', () => {
    const service = TestBed.inject(TechnologiesService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.getTechnologies().subscribe((response) => {
      expect(response).toEqual(createTechnologiesCollectionResponse());
    });

    const request = httpTestingController.expectOne(
      buildApiUrl(
        '/technologies?page=1&pageSize=100&sortBy=sortOrder&sortDirection=asc',
      ),
    );

    expect(request.request.method).toBe('GET');

    request.flush(createTechnologiesCollectionResponse());
  });

  it('should support the admin collection query with and without search', () => {
    const service = TestBed.inject(TechnologiesService);
    const controller = TestBed.inject(HttpTestingController);
    service.getAll().subscribe();
    const request = controller.expectOne(buildApiUrl('/technologies?page=1&pageSize=5&sortBy=sortOrder&sortDirection=asc'));
    expect(request.request.method).toBe('GET');
    request.flush(createTechnologiesCollectionResponse());

    service.getAll(2, 10, ' angular ').subscribe();
    const searched = controller.expectOne(buildApiUrl('/technologies?page=2&pageSize=10&sortBy=sortOrder&sortDirection=asc&search=angular'));
    expect(searched.request.method).toBe('GET');
    searched.flush(createTechnologiesCollectionResponse());
  });

  it('should execute protected create, update and delete requests', () => {
    const service = TestBed.inject(TechnologiesService);
    const controller = TestBed.inject(HttpTestingController);
    service.create(payload).subscribe();
    const createRequest = controller.expectOne(buildApiUrl('/admin/technologies'));
    expect(createRequest.request.method).toBe('POST');
    expect(createRequest.request.body).toEqual(payload);
    createRequest.flush({});

    service.update('technology-1', payload).subscribe();
    const updateRequest = controller.expectOne(buildApiUrl('/admin/technologies/technology-1'));
    expect(updateRequest.request.method).toBe('PUT');
    expect(updateRequest.request.body).toEqual(payload);
    updateRequest.flush({});

    service.delete('technology-1').subscribe();
    const deleteRequest = controller.expectOne(buildApiUrl('/admin/technologies/technology-1'));
    expect(deleteRequest.request.method).toBe('DELETE');
    deleteRequest.flush(null);
  });

});
