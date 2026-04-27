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
});
