import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { buildApiUrl } from '../../core/api/api.config';
import { createTechnologiesCollectionResponse } from '../../core/api/mocks/technologies.mocks';
import { APP_LOCALE_STORAGE_KEY } from '../../core/translation/translation.config';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { TranslationService } from '../../core/translation/translation.service';
import { SkillsComponent } from './skills.component';

describe('SkillsComponent', () => {
  beforeAll(() => {
    const elementNames = ['hans-avatar', 'hans-icon', 'hans-tag', 'hans-dropdown'];

    for (const elementName of elementNames) {
      if (!customElements.get(elementName)) {
        customElements.define(elementName, class extends HTMLElement {});
      }
    }
  });

  beforeEach(async () => {
    localStorage.removeItem(APP_LOCALE_STORAGE_KEY);

    await TestBed.configureTestingModule({
      imports: [SkillsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAppTranslations(),
      ],
    }).compileComponents();
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
    localStorage.removeItem(APP_LOCALE_STORAGE_KEY);
  });

  it('should render the technologies page with live experience metrics', () => {
    const fixture = TestBed.createComponent(SkillsComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    expect(compiled.textContent).toContain('Technology depth');
    expect(compiled.textContent).toContain('Loading technology experience metrics...');

    const request = httpTestingController.expectOne(
      buildApiUrl(
        '/technologies?page=1&pageSize=100&sortBy=sortOrder&sortDirection=asc',
      ),
    );
    request.flush(createTechnologiesCollectionResponse());
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Technology clarity from live API metrics');
    expect(compiled.textContent).toContain('Angular');
    expect(compiled.textContent).toContain('TypeScript');
    expect(compiled.textContent).toContain('6 years 2 months');
    expect(compiled.querySelectorAll('hans-dropdown').length).toBe(3);
    expect(compiled.querySelectorAll('hans-tag').length).toBeGreaterThan(6);
  });

  it('should render localized labels in Portuguese', () => {
    TestBed.inject(TranslationService).setLocale('pt-BR');

    const fixture = TestBed.createComponent(SkillsComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    const request = httpTestingController.expectOne(
      buildApiUrl(
        '/technologies?page=1&pageSize=100&sortBy=sortOrder&sortDirection=asc',
      ),
    );
    request.flush(createTechnologiesCollectionResponse());
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Profundidade tecnica');
    expect(compiled.textContent).toContain('Tecnologias com metricao real por contexto');
    expect(compiled.textContent).toContain('Profissional');
    expect(compiled.querySelector('hans-tag[label="Avancado"]')).toBeTruthy();
  });

  it('should filter the catalog through dropdown selections and render empty and error states', () => {
    const fixture = TestBed.createComponent(SkillsComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    const request = httpTestingController.expectOne(
      buildApiUrl(
        '/technologies?page=1&pageSize=100&sortBy=sortOrder&sortDirection=asc',
      ),
    );
    request.flush(createTechnologiesCollectionResponse());
    fixture.detectChanges();

    const dropdowns = compiled.querySelectorAll('hans-dropdown');
    dropdowns[0]?.dispatchEvent(
      new CustomEvent('select', {
        detail: {
          label: 'Framework',
          value: 'FRAMEWORK',
        },
      }),
    );
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Angular');
    expect(compiled.textContent).not.toContain('TypeScript');

    fixture.destroy();

    const emptyFixture = TestBed.createComponent(SkillsComponent);
    emptyFixture.detectChanges();

    const emptyCompiled = emptyFixture.nativeElement as HTMLElement;
    const emptyRequest = httpTestingController.expectOne(
      buildApiUrl(
        '/technologies?page=1&pageSize=100&sortBy=sortOrder&sortDirection=asc',
      ),
    );
    emptyRequest.flush(
      createTechnologiesCollectionResponse({
        data: [],
        pagination: {
          page: 1,
          pageSize: 100,
          totalItems: 0,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      }),
    );
    emptyFixture.detectChanges();

    expect(emptyCompiled.textContent).toContain(
      'No published technologies matched the current filters.',
    );

    emptyFixture.destroy();

    const errorFixture = TestBed.createComponent(SkillsComponent);
    errorFixture.detectChanges();

    const errorCompiled = errorFixture.nativeElement as HTMLElement;
    const errorRequest = httpTestingController.expectOne(
      buildApiUrl(
        '/technologies?page=1&pageSize=100&sortBy=sortOrder&sortDirection=asc',
      ),
    );
    errorRequest.flush(null, {
      status: 500,
      statusText: 'Server Error',
    });
    errorFixture.detectChanges();

    expect(errorCompiled.textContent).toContain(
      'The technologies endpoint is unavailable right now.',
    );
  });
});
