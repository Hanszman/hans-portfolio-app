import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
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
      category: 'Framework',
      stack: 'Front-End',
      level: 'Advanced',
      frequency: 'Frequent',
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

  it('should pass technology details to tag modal', () => {
    fixture.detectChanges();

    const modal = fixture.nativeElement.querySelector('app-tag-modal');
    expect(modal).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Front-End');
    expect(fixture.nativeElement.textContent).toContain('Advanced');
    expect(fixture.nativeElement.textContent).toContain('4');
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
    request.flush(createTechnologiesCollectionResponse());
    projectsRequest.flush(createProjectsCollectionResponse());
    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      details: () => readonly { value: string | number }[];
    };

    expect(component.details().map((detail) => detail.value)).toContain('Frameworks');
    expect(component.details().map((detail) => detail.value)).toContain('Front-End');
    expect(component.details().map((detail) => detail.value)).toContain(2);
  });

  it('should keep fallback details and avoid duplicate requests when catalog requests fail', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();

    const httpTestingController = TestBed.inject(HttpTestingController);
    httpTestingController
      .expectOne(
        buildApiUrl(
          '/technologies?page=1&pageSize=100&sortBy=sortOrder&sortDirection=asc',
        ),
      )
      .flush(null, {
        status: 500,
        statusText: 'Server Error',
      });
    httpTestingController
      .expectOne(
        buildApiUrl('/projects?page=1&pageSize=100&sortBy=sortOrder&sortDirection=asc'),
      )
      .flush(null, {
        status: 500,
        statusText: 'Server Error',
      });
    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      details: () => readonly { value: string | number }[];
    };

    expect(component.details().map((detail) => detail.value)).toContain('Framework');

    fixture.componentRef.setInput('technology', {
      slug: 'json',
      name: 'JSON',
      category: 'Object Notations',
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
  });

  it('should emit close request', () => {
    spyOn(fixture.componentInstance.closed, 'emit');
    fixture.detectChanges();

    fixture.nativeElement
      .querySelector('app-tag-modal')
      .dispatchEvent(new Event('closed'));

    expect(fixture.componentInstance.closed.emit).toHaveBeenCalledTimes(1);
  });
});
