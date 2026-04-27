import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { buildApiUrl } from '../api.config';
import { createProjectsCollectionResponse } from '../mocks/projects.mocks';
import { ProjectsService } from './projects.service';

describe('ProjectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectsService,
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('should request the public projects collection with the expected case-study query', () => {
    const service = TestBed.inject(ProjectsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.getProjects().subscribe((response) => {
      expect(response).toEqual(createProjectsCollectionResponse());
    });

    const request = httpTestingController.expectOne(
      buildApiUrl('/projects?page=1&pageSize=100&sortBy=sortOrder&sortDirection=asc'),
    );

    expect(request.request.method).toBe('GET');

    request.flush(createProjectsCollectionResponse());
  });
});
