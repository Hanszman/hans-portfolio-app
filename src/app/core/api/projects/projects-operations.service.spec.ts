import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { buildApiUrl } from '../api.config';
import { ProjectsService } from './projects.service';

describe('ProjectsService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        ProjectsService,
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }),
  );

  afterEach(() => TestBed.inject(HttpTestingController).verify());

  it('loads public projects with paging and optional search', () => {
    const service = TestBed.inject(ProjectsService);
    const http = TestBed.inject(HttpTestingController);
    service.getAll().subscribe();
    let request = http.expectOne(
      buildApiUrl('/projects?page=1&pageSize=5&sortBy=sortOrder&sortDirection=asc'),
    );
    expect(request.request.method).toBe('GET');
    request.flush({ data: [], pagination: {} });
    service.getAll(2, 10, ' app ').subscribe();
    request = http.expectOne(
      buildApiUrl('/projects?page=2&pageSize=10&sortBy=sortOrder&sortDirection=asc&search=app'),
    );
    request.flush({ data: [], pagination: {} });
  });

  it('creates, updates and deletes protected projects', () => {
    const service = TestBed.inject(ProjectsService);
    const http = TestBed.inject(HttpTestingController);
    const payload = { slug: 'x' } as never;
    service.create(payload).subscribe();
    let request = http.expectOne(buildApiUrl('/admin/projects'));
    expect(request.request.method).toBe('POST');
    request.flush({});
    service.update('id-1', payload).subscribe();
    request = http.expectOne(buildApiUrl('/admin/projects/id-1'));
    expect(request.request.method).toBe('PUT');
    request.flush({});
    service.delete('id-1').subscribe();
    request = http.expectOne(buildApiUrl('/admin/projects/id-1'));
    expect(request.request.method).toBe('DELETE');
    request.flush(null);
  });
});
