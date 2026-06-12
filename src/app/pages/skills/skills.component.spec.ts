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
import { SkillLevelFilterValue, SkillStackFilterValue } from './skills.types';
import { SkillsComponent } from './skills.component';

const TECHNOLOGIES_REQUEST_URL = buildApiUrl(
  '/technologies?page=1&pageSize=100&sortBy=sortOrder&sortDirection=asc',
);

const flushTechnologiesRequest = (
  httpTestingController: HttpTestingController,
  response = createTechnologiesCollectionResponse(),
): void => {
  httpTestingController.expectOne(TECHNOLOGIES_REQUEST_URL).flush(response);
};

describe('SkillsComponent', () => {
  beforeAll(() => {
    const elementNames = [
      'hans-card',
      'hans-icon',
      'hans-tag',
      'hans-input',
      'hans-modal',
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

  it('should render the redesigned skills page with education, languages, and technologies', () => {
    const fixture = TestBed.createComponent(SkillsComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    expect(compiled.textContent).toContain('Skills & Technologies');
    expect(compiled.textContent).toContain('Education');
    expect(compiled.textContent).toContain('Languages');
    expect(compiled.textContent).toContain('Building technology groups...');

    flushTechnologiesRequest(httpTestingController);
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Information Systems');
    expect(compiled.textContent).toContain('Portuguese');
    expect(compiled.textContent).toContain('Technologies');
    expect(compiled.textContent).toContain('Angular');
    expect(compiled.textContent).toContain('TypeScript');
    expect(compiled.querySelectorAll('app-skill-card').length).toBeGreaterThan(5);
    expect(compiled.querySelectorAll('hans-card').length).toBeGreaterThan(5);
  });

  it('should render localized labels in Portuguese and Spanish', () => {
    const translationService = TestBed.inject(TranslationService);

    translationService.setLocale('pt-br');
    const ptFixture = TestBed.createComponent(SkillsComponent);
    ptFixture.detectChanges();
    flushTechnologiesRequest(TestBed.inject(HttpTestingController));
    ptFixture.detectChanges();

    expect(ptFixture.nativeElement.textContent).toContain(
      'Habilidades & Tecnologias',
    );
    expect(ptFixture.nativeElement.textContent).toContain('Formação');
    ptFixture.destroy();

    translationService.setLocale('es-es');
    const esFixture = TestBed.createComponent(SkillsComponent);
    esFixture.detectChanges();
    flushTechnologiesRequest(TestBed.inject(HttpTestingController));
    esFixture.detectChanges();

    expect(esFixture.nativeElement.textContent).toContain(
      'Habilidades y Tecnologías',
    );
    expect(esFixture.nativeElement.textContent).toContain('Educación');
  });

  it('should filter technologies by stack, level, and search term', () => {
    const fixture = TestBed.createComponent(SkillsComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const technologiesText = (): string =>
      compiled.querySelector('.skills-technologies')?.textContent ?? '';
    const httpTestingController = TestBed.inject(HttpTestingController);
    flushTechnologiesRequest(httpTestingController);
    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      selectStackFilter: (value: SkillStackFilterValue) => void;
      selectLevelFilter: (value: SkillLevelFilterValue) => void;
      updateSearchTerm: (event: Event) => void;
    };

    component.selectStackFilter('DATABASES');
    fixture.detectChanges();

    expect(technologiesText()).toContain('SQL');
    expect(technologiesText()).not.toContain('Angular');

    component.selectStackFilter('ALL');
    component.selectLevelFilter('INTERMEDIATE');
    fixture.detectChanges();

    expect(technologiesText()).toContain('Docker');
    expect(technologiesText()).not.toContain('TypeScript');

    component.selectLevelFilter('ALL');
    component.updateSearchTerm({
      target: { value: 'type' },
    } as unknown as Event);
    fixture.detectChanges();

    expect(technologiesText()).toContain('TypeScript');
    expect(technologiesText()).not.toContain('Angular');
  });

  it('should render empty and error states from the technologies request', () => {
    const httpTestingController = TestBed.inject(HttpTestingController);

    const emptyFixture = TestBed.createComponent(SkillsComponent);
    emptyFixture.detectChanges();

    flushTechnologiesRequest(
      httpTestingController,
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

    expect(emptyFixture.nativeElement.textContent).toContain(
      'No published technologies matched the current filters.',
    );
    emptyFixture.destroy();

    const errorFixture = TestBed.createComponent(SkillsComponent);
    errorFixture.detectChanges();

    httpTestingController.expectOne(TECHNOLOGIES_REQUEST_URL).flush(null, {
      status: 500,
      statusText: 'Server Error',
    });
    errorFixture.detectChanges();

    expect(errorFixture.nativeElement.textContent).toContain(
      'The technologies endpoint is unavailable right now.',
    );
  });

  it('should render technologies without context metrics using the fallback ordering', () => {
    const fixture = TestBed.createComponent(SkillsComponent);
    fixture.detectChanges();

    flushTechnologiesRequest(
      TestBed.inject(HttpTestingController),
      createTechnologiesCollectionResponse({
        data: [
          {
            id: 'tech-a',
            slug: 'alpha',
            name: 'Alpha',
            category: 'TOOL',
            level: null,
            frequency: null,
            highlight: false,
          },
          {
            id: 'tech-b',
            slug: 'beta',
            name: 'Beta',
            category: 'TOOL',
            level: null,
            frequency: null,
            highlight: false,
          },
        ],
        pagination: {
          page: 1,
          pageSize: 100,
          totalItems: 2,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      }),
    );
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Alpha');
    expect(fixture.nativeElement.textContent).toContain('Beta');
  });

  it('should open and close the shared technology modal for any skill card', () => {
    const fixture = TestBed.createComponent(SkillsComponent);
    fixture.detectChanges();

    const httpTestingController = TestBed.inject(HttpTestingController);
    flushTechnologiesRequest(httpTestingController);
    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      educationCards: () => readonly [{ name: string; modal: { name: string } }];
      openSkillDetails: (skill: { modal: { name: string } }) => void;
      closeSkillDetails: () => void;
      selectedSkill: () => { name: string } | null;
      isSkillModalOpen: () => boolean;
    };

    const skill = component.educationCards()[0];
    component.openSkillDetails(skill);

    expect(component.selectedSkill()?.name).toBe('Information Systems');
    expect(component.isSkillModalOpen()).toBeTrue();

    component.closeSkillDetails();

    expect(component.selectedSkill()).toBeNull();
    expect(component.isSkillModalOpen()).toBeFalse();
  });
});
