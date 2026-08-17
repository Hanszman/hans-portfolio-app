import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { buildApiUrl } from '../../core/api/api.config';
import { createProjectsCollectionResponse } from '../../core/api/mocks/projects.mocks';
import { createTechnologiesCollectionResponse } from '../../core/api/mocks/technologies.mocks';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { TechnologyModalComponent } from './technology-modal.component';

describe('TechnologyModalComponent', () => {
  let fixture: ComponentFixture<TechnologyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnologyModalComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAppTranslations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TechnologyModalComponent);
    fixture.componentRef.setInput('technology', {
      slug: 'angular',
      name: 'Angular',
      type: 'FRAMEWORKS',
      stack: 'Front-End',
      level: 'Advanced',
      levelKey: 'ADVANCED',
      frequency: 'Frequent',
      frequencyKey: 'FREQUENT',
      projectCount: 4,
      image: {
        src: '/assets/img/skills/angular.png',
        alt: 'Angular icon',
      },
    });
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('should render technology details, progress bars and radar', () => {
    fixture.detectChanges();

    const modal = fixture.nativeElement.querySelector('hans-modal');
    expect(modal).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Front-End');
    expect(fixture.nativeElement.textContent).toContain('4');
    const progressBars = fixture.nativeElement.querySelectorAll('hans-progress-bar');
    expect(progressBars.length).toBe(2);
    expect(progressBars[0].label).toBe('Knowledge level');
    expect(progressBars[0].valueLabel).toBe('Advanced');
    expect(progressBars[1].label).toBe('Usage frequency');
    expect(progressBars[1].valueLabel).toBe('Frequent');
    const chart = fixture.nativeElement.querySelector('hans-chart');
    expect(chart).toBeTruthy();
    expect(chart.colors).toEqual(['primary']);
    expect(chart.getAttribute('title')).toBeNull();
    expect(fixture.nativeElement.querySelectorAll('.technology-modal-radar > h2')).toHaveSize(1);
    expect(fixture.nativeElement.querySelector('.technology-modal-progress')).toBeTruthy();
  });

  it('should enrich the selected technology with backend catalog data when opened', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();

    const httpTestingController = TestBed.inject(HttpTestingController);
    const request = httpTestingController.expectOne(
      buildApiUrl('/technologies?page=1&pageSize=100&sortBy=sortOrder&sortDirection=asc'),
    );
    const projectsRequest = httpTestingController.expectOne(
      buildApiUrl('/projects?page=1&pageSize=100&sortBy=sortOrder&sortDirection=asc'),
    );
    expect(fixture.nativeElement.querySelector('hans-chart')).toBeNull();
    expect(fixture.nativeElement.querySelectorAll('hans-progress-bar')).toHaveSize(0);
    expect(
      fixture.nativeElement.querySelectorAll('.technology-modal-skeleton'),
    ).toHaveSize(11);
    request.flush(createTechnologiesCollectionResponse());
    projectsRequest.flush(createProjectsCollectionResponse());
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('hans-chart')).not.toBeNull();
    expect(fixture.nativeElement.querySelectorAll('hans-progress-bar')).toHaveSize(2);
    expect(fixture.nativeElement.querySelector('.technology-modal-skeleton')).toBeNull();

    const component = fixture.componentInstance as unknown as {
      details: () => readonly { value: string | number }[];
    };

    expect(component.details().map((detail) => detail.value)).toContain('Frameworks');
    expect(component.details().map((detail) => detail.value)).toContain('Front-End');
    expect(component.details().map((detail) => detail.value)).toContain(2);
    const contextItems = fixture.nativeElement.querySelectorAll('.technology-modal-contexts li');
    expect(contextItems).toHaveSize(2);
    expect(contextItems[0].textContent).toContain('Study');
    expect(contextItems[0].textContent).toContain('01/01/2019 - 12/01/2019');
    expect(contextItems[1].textContent).toContain('Professional');
    expect(contextItems[1].textContent).toContain('01/01/2020 - Present');
  });

  it('should keep fallback details and avoid duplicate requests when catalog requests fail', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();

    const httpTestingController = TestBed.inject(HttpTestingController);
    httpTestingController
      .expectOne(
        buildApiUrl('/technologies?page=1&pageSize=100&sortBy=sortOrder&sortDirection=asc'),
      )
      .flush(null, {
        status: 500,
        statusText: 'Server Error',
      });
    httpTestingController
      .expectOne(buildApiUrl('/projects?page=1&pageSize=100&sortBy=sortOrder&sortDirection=asc'))
      .flush(null, {
        status: 500,
        statusText: 'Server Error',
      });
    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      details: () => readonly { value: string | number }[];
    };

    expect(component.details().map((detail) => detail.value)).toContain('FRAMEWORKS');

    fixture.componentRef.setInput('technology', {
      slug: 'json',
      name: 'JSON',
      type: 'Object Notations',
    });
    fixture.detectChanges();
  });

  it('should omit optional details when the selected item does not provide them', () => {
    fixture.componentRef.setInput('technology', {
      slug: 'portuguese',
      name: 'Portuguese',
      image: null,
    });

    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      details: () => readonly unknown[];
    };

    expect(component.details()).toEqual([]);
    expect(fixture.nativeElement.querySelector('.technology-modal-contexts')).toBeNull();
  });

  it('should expose empty derived state and format radar durations in years and months', () => {
    fixture.componentRef.setInput('technology', null);
    fixture.detectChanges();
    const component = fixture.componentInstance as unknown as {
      details: () => readonly unknown[];
      levelProgress: () => unknown;
      frequencyProgress: () => unknown;
      radarSeries: () => readonly unknown[];
      formatRadarValue: (value: number) => string;
    };

    expect(component.details()).toEqual([]);
    expect(component.levelProgress()).toBeNull();
    expect(component.frequencyProgress()).toBeNull();
    expect(component.radarSeries()).toEqual([]);
    expect(component.formatRadarValue(1)).toBe('1 month');
    expect(component.formatRadarValue(12)).toBe('1 year');
    expect(component.formatRadarValue(76)).toBe('6 years 4 months');
    expect(component.formatRadarValue(0)).toBe('0 months');
  });

  it('should emit close request', () => {
    spyOn(fixture.componentInstance.closed, 'emit');
    fixture.detectChanges();

    fixture.nativeElement.querySelector('hans-modal').dispatchEvent(new Event('close'));

    expect(fixture.componentInstance.closed.emit).toHaveBeenCalledTimes(1);
  });
});
