import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { buildApiUrl } from '../api.config';
import { ExperiencesService } from './experiences.service';

describe('ExperiencesService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        ExperiencesService,
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }),
  );

  afterEach(() => TestBed.inject(HttpTestingController).verify());

  it('loads public experiences with paging and optional search', () => {
    const service = TestBed.inject(ExperiencesService);
    const http = TestBed.inject(HttpTestingController);
    service.getAll().subscribe();
    let request = http.expectOne(
      buildApiUrl('/experiences?page=1&pageSize=5&sortBy=startDate&sortDirection=desc'),
    );
    expect(request.request.method).toBe('GET');
    request.flush({ data: [], pagination: {} });
    service.getAll(2, 10, ' work ').subscribe();
    request = http.expectOne(
      buildApiUrl(
        '/experiences?page=2&pageSize=10&sortBy=startDate&sortDirection=desc&search=work',
      ),
    );
    request.flush({ data: [], pagination: {} });
  });

  it('creates, updates and deletes protected experiences', () => {
    const service = TestBed.inject(ExperiencesService);
    const http = TestBed.inject(HttpTestingController);
    const payload = { slug: 'x' } as never;
    service.create(payload).subscribe();
    let request = http.expectOne(buildApiUrl('/admin/experiences'));
    expect(request.request.method).toBe('POST');
    request.flush({});
    service.update('id-1', payload).subscribe();
    request = http.expectOne(buildApiUrl('/admin/experiences/id-1'));
    expect(request.request.method).toBe('PUT');
    request.flush({});
    service.delete('id-1').subscribe();
    request = http.expectOne(buildApiUrl('/admin/experiences/id-1'));
    expect(request.request.method).toBe('DELETE');
    request.flush(null);
  });
});
