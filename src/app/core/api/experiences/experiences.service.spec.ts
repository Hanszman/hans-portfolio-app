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

  it('should load paged experiences with an optional search', () => {
    const service = TestBed.inject(ExperiencesService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.getAll().subscribe();
    let request = httpTestingController.expectOne(
      buildApiUrl('/experiences?page=1&pageSize=5&sortBy=startDate&sortDirection=desc'),
    );
    expect(request.request.method).toBe('GET');
    request.flush({ data: [], pagination: {} });

    service.getAll(2, 10, ' work ').subscribe();
    request = httpTestingController.expectOne(
      buildApiUrl(
        '/experiences?page=2&pageSize=10&sortBy=startDate&sortDirection=desc&search=work',
      ),
    );
    request.flush({ data: [], pagination: {} });
  });

  it('should create, update and delete protected experiences', () => {
    const service = TestBed.inject(ExperiencesService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    const payload = { slug: 'experience' } as never;

    service.create(payload).subscribe();
    let request = httpTestingController.expectOne(buildApiUrl('/admin/experiences'));
    expect(request.request.method).toBe('POST');
    request.flush({});

    service.update('experience-1', payload).subscribe();
    request = httpTestingController.expectOne(buildApiUrl('/admin/experiences/experience-1'));
    expect(request.request.method).toBe('PUT');
    request.flush({});

    service.delete('experience-1').subscribe();
    request = httpTestingController.expectOne(buildApiUrl('/admin/experiences/experience-1'));
    expect(request.request.method).toBe('DELETE');
    request.flush(null);
  });
});
