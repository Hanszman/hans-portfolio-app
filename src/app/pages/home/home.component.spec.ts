import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { buildApiUrl } from '../../core/api/api.config';
import { DashboardOverviewResponse } from '../../core/api/dashboard/dashboard.types';
import { createDashboardOverviewResponse } from '../../core/api/mocks/dashboard.mocks';
import { APP_LOCALE_STORAGE_KEY } from '../../core/translation/translation.config';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { TranslationService } from '../../core/translation/translation.service';
import { HomeComponent } from './home.component';

interface HomeComponentTestHook {
  dashboardSignal: {
    set(value: DashboardOverviewResponse | null): void;
  };
  topTechnologyChips(): readonly unknown[];
  formatCount(value: number | undefined, fallback: string): string;
  calculateCareerYears(referenceDate?: Date): number;
}

describe('HomeComponent', () => {
  beforeAll(() => {
    const elementNames = [
      'hans-button',
      'hans-tag',
      'hans-avatar',
      'hans-icon',
      'hans-card',
      'hans-loading',
    ];

    for (const elementName of elementNames) {
      if (!customElements.get(elementName)) {
        customElements.define(elementName, class extends HTMLElement {});
      }
    }
  });

  beforeEach(async () => {
    localStorage.removeItem(APP_LOCALE_STORAGE_KEY);

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAppTranslations(),
        provideRouter([]),
      ],
    }).compileComponents();
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
    localStorage.removeItem(APP_LOCALE_STORAGE_KEY);
  });

  it('should render the hero and loading state before the dashboard response arrives', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);
    const request = httpTestingController.expectOne(buildApiUrl('/dashboard'));

    expect(compiled.textContent).toContain("Hi, I'm");
    expect(compiled.textContent).toContain('Victor Hanszman');
    expect(compiled.textContent).toContain('Connecting live portfolio data');
    expect(compiled.querySelectorAll('hans-button')).toHaveSize(6);

    request.flush(createDashboardOverviewResponse());
    fixture.detectChanges();
  });

  it('should render the redesigned home with live dashboard data', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    const request = httpTestingController.expectOne(buildApiUrl('/dashboard'));
    request.flush(createDashboardOverviewResponse());
    fixture.detectChanges();

    expect(compiled.textContent).toContain('7+');
    expect(compiled.textContent).toContain('35+');
    expect(compiled.textContent).toContain('12+');
    expect(compiled.textContent).toContain('Main Technologies');
    expect(compiled.textContent).toContain('Experiences');
    expect(compiled.textContent).toContain('Skills');
    expect(compiled.textContent).toContain('Projects');
    expect(compiled.querySelectorAll('hans-tag').length).toBeGreaterThan(3);
    expect(compiled.querySelectorAll('a')).toHaveSize(3);
  });

  it('should render localized dashboard fields in Portuguese', () => {
    TestBed.inject(TranslationService).setLocale('pt-br');

    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    const request = httpTestingController.expectOne(buildApiUrl('/dashboard'));
    request.flush(createDashboardOverviewResponse());
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Oi, eu sou');
    expect(compiled.textContent).toContain('Tecnologias principais');
    expect(compiled.textContent).toContain('Experiências');
  });

  it('should render localized dashboard fields in Spanish', () => {
    TestBed.inject(TranslationService).setLocale('es-es');

    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    const request = httpTestingController.expectOne(buildApiUrl('/dashboard'));
    request.flush(createDashboardOverviewResponse());
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Hola, soy');
    expect(compiled.textContent).toContain('Tecnologías principales');
    expect(compiled.textContent).toContain('Experiencias');
  });

  it('should render empty states when the technology list is empty', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    const request = httpTestingController.expectOne(buildApiUrl('/dashboard'));
    request.flush(
      createDashboardOverviewResponse({
        technologyUsage: {
          generatedAtUtc: '2026-04-18T12:00:00.000Z',
          totalUsageLinks: 0,
          levels: [],
          frequencies: [],
          contexts: [],
          sources: [],
          topTechnologies: [],
        },
      }),
    );
    fixture.detectChanges();

    expect(compiled.textContent).toContain(
      'No stack distribution was returned yet.',
    );
  });

  it('should render an API error state when the dashboard request fails', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    const request = httpTestingController.expectOne(buildApiUrl('/dashboard'));
    request.flush(null, {
      status: 500,
      statusText: 'Server Error',
    });
    fixture.detectChanges();

    expect(compiled.textContent).toContain(
      'The live home data is unavailable right now',
    );
  });

  it('should calculate career years around the anniversary boundary', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const httpTestingController = TestBed.inject(HttpTestingController);
    const component = fixture.componentInstance as unknown as HomeComponentTestHook;

    const request = httpTestingController.expectOne(buildApiUrl('/dashboard'));
    request.flush(createDashboardOverviewResponse());

    expect(
      component.calculateCareerYears(new Date('2026-09-03T00:00:00.000Z')),
    ).toBe(8);
    expect(
      component.calculateCareerYears(new Date('2026-09-02T00:00:00.000Z')),
    ).toBe(7);
  });

  it('should use fallback values when dashboard data is absent', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const httpTestingController = TestBed.inject(HttpTestingController);
    const component = fixture.componentInstance as unknown as HomeComponentTestHook;

    const request = httpTestingController.expectOne(buildApiUrl('/dashboard'));
    request.flush(createDashboardOverviewResponse());

    component['dashboardSignal'].set(null);

    expect(component.topTechnologyChips()).toEqual([]);
    expect(component.formatCount(undefined, 'fallback')).toBe('fallback');
  });
});

