import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { buildApiUrl } from '../api.config';
import { createExperiencesCollectionResponse } from '../mocks/experiences.mocks';
import { ExperiencesService } from './experiences.service';

describe('ExperiencesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('should request the public experiences collection with the expected timeline query', () => {
    const service = TestBed.inject(ExperiencesService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    let response: unknown = null;

    service.getExperiences().subscribe((value) => {
      response = value;
    });

    const request = httpTestingController.expectOne(
      buildApiUrl(
        '/experiences?page=1&pageSize=20&sortBy=startDate&sortDirection=desc',
      ),
    );

    expect(request.request.method).toBe('GET');

    request.flush(createExperiencesCollectionResponse());

    expect(response).toEqual(createExperiencesCollectionResponse());
  });
});
