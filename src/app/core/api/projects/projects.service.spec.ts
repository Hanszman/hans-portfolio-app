import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
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
    expect(request.request.headers.get('Cache-Control')).toBe('no-cache');
    expect(request.request.headers.get('Pragma')).toBe('no-cache');

    request.flush(createProjectsCollectionResponse());
  });

  it('should load paged projects with an optional search', () => {
    const service = TestBed.inject(ProjectsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.getAll().subscribe();
    let request = httpTestingController.expectOne(
      buildApiUrl('/projects?page=1&pageSize=5&sortBy=sortOrder&sortDirection=asc'),
    );
    expect(request.request.method).toBe('GET');
    request.flush({ data: [], pagination: {} });

    service.getAll(2, 10, ' app ').subscribe();
    request = httpTestingController.expectOne(
      buildApiUrl('/projects?page=2&pageSize=10&sortBy=sortOrder&sortDirection=asc&search=app'),
    );
    request.flush({ data: [], pagination: {} });
  });

  it('should load a public project by its encoded slug', () => {
    const service = TestBed.inject(ProjectsService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    const project = createProjectsCollectionResponse().data[0];

    service.getBySlug('portfolio app').subscribe((response) => {
      expect(response).toEqual(project);
    });

    const request = httpTestingController.expectOne(
      buildApiUrl('/projects/portfolio%20app'),
    );

    expect(request.request.method).toBe('GET');
    expect(request.request.headers.get('Cache-Control')).toBe('no-cache');
    request.flush(project);
  });

  it('should create, update and delete protected projects', () => {
    const service = TestBed.inject(ProjectsService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    const payload = { slug: 'project' } as never;

    service.create(payload).subscribe();
    let request = httpTestingController.expectOne(buildApiUrl('/admin/projects'));
    expect(request.request.method).toBe('POST');
    request.flush({});

    service.update('project-1', payload).subscribe();
    request = httpTestingController.expectOne(buildApiUrl('/admin/projects/project-1'));
    expect(request.request.method).toBe('PUT');
    request.flush({});

    service.delete('project-1').subscribe();
    request = httpTestingController.expectOne(buildApiUrl('/admin/projects/project-1'));
    expect(request.request.method).toBe('DELETE');
    request.flush(null);
  });
});
