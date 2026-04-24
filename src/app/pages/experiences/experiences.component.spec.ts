import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { buildApiUrl } from '../../core/api/api.config';
import { createExperiencesCollectionResponse } from '../../core/api/mocks/experiences.mocks';
import { APP_LOCALE_STORAGE_KEY } from '../../core/translation/translation.config';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { TranslationService } from '../../core/translation/translation.service';
import { ExperiencesComponent } from './experiences.component';

describe('ExperiencesComponent', () => {
  beforeAll(() => {
    const elementNames = ['hans-avatar', 'hans-icon', 'hans-tag'];

    for (const elementName of elementNames) {
      if (!customElements.get(elementName)) {
        customElements.define(elementName, class extends HTMLElement {});
      }
    }
  });

  beforeEach(async () => {
    localStorage.removeItem(APP_LOCALE_STORAGE_KEY);

    await TestBed.configureTestingModule({
      imports: [ExperiencesComponent],
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

  it('should render the experience timeline with live API data', () => {
    const fixture = TestBed.createComponent(ExperiencesComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    expect(compiled.textContent).toContain('Career narrative');
    expect(compiled.textContent).toContain('Loading live experience relationships...');

    const request = httpTestingController.expectOne(
      buildApiUrl(
        '/experiences?page=1&pageSize=20&sortBy=startDate&sortDirection=desc',
      ),
    );
    request.flush(createExperiencesCollectionResponse());
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Experience narrative');
    expect(compiled.textContent).toContain('Stefanini Group');
    expect(compiled.textContent).toContain('Customer & Dealer Transformation App');
    expect(compiled.textContent).toContain('Front-End Specialist');
    expect(compiled.textContent).toContain('Ford');
    expect(compiled.querySelectorAll('hans-avatar').length).toBeGreaterThan(1);
    expect(compiled.querySelectorAll('hans-tag').length).toBeGreaterThan(4);
  });

  it('should render localized experience labels in Portuguese', () => {
    TestBed.inject(TranslationService).setLocale('pt-BR');

    const fixture = TestBed.createComponent(ExperiencesComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    const request = httpTestingController.expectOne(
      buildApiUrl(
        '/experiences?page=1&pageSize=20&sortBy=startDate&sortDirection=desc',
      ),
    );
    request.flush(createExperiencesCollectionResponse());
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Narrativa de carreira');
    expect(compiled.textContent).toContain('Experiencia em Stefanini Group');
    expect(compiled.textContent).toContain('Atual');
    expect(compiled.textContent).toContain('Clientes');
  });

  it('should render empty and error states for the experiences page', () => {
    const fixture = TestBed.createComponent(ExperiencesComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    const request = httpTestingController.expectOne(
      buildApiUrl(
        '/experiences?page=1&pageSize=20&sortBy=startDate&sortDirection=desc',
      ),
    );
    request.flush(
      createExperiencesCollectionResponse({
        data: [],
        pagination: {
          page: 1,
          pageSize: 20,
          totalItems: 0,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      }),
    );
    fixture.detectChanges();

    expect(compiled.textContent).toContain(
      'No published experience chapters were returned yet.',
    );

    fixture.destroy();

    const errorFixture = TestBed.createComponent(ExperiencesComponent);
    errorFixture.detectChanges();

    const errorCompiled = errorFixture.nativeElement as HTMLElement;
    const errorRequest = httpTestingController.expectOne(
      buildApiUrl(
        '/experiences?page=1&pageSize=20&sortBy=startDate&sortDirection=desc',
      ),
    );
    errorRequest.flush(null, {
      status: 500,
      statusText: 'Server Error',
    });
    errorFixture.detectChanges();

    expect(errorCompiled.textContent).toContain(
      'The experiences endpoint is unavailable right now.',
    );
  });
});
