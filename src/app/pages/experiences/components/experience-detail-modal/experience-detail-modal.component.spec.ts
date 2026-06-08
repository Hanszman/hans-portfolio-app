import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { ExperienceTimelineItemViewModel } from '../../experiences.types';
import { ExperienceDetailModalComponent } from './experience-detail-modal.component';

describe('ExperienceDetailModalComponent', () => {
  let fixture: ComponentFixture<ExperienceDetailModalComponent>;

  const item: ExperienceTimelineItemViewModel = {
    id: '1',
    slug: 'stefanini',
    companyName: 'Stefanini Group',
    roleTitle: 'Full Stack Developer',
    summary: 'Summary',
    description: 'Description',
    dateRangeLabel: 'Sep 2021 - Present',
    isCurrent: true,
    isHighlight: false,
    jobs: ['Full Stack Developer'],
    customers: ['Ford'],
    projects: [
      {
        slug: 'ford-app',
        title: 'Customer & Dealer Transformation App',
        summary: 'Scheduling and service flows.',
      },
    ],
    technologies: ['Angular'],
    extraTechnologyCount: 0,
    technologyGroups: [
      {
        labelKey: 'pages.experiences.detail.stackGroups.frontend',
        technologies: ['Angular'],
      },
    ],
  };

  beforeAll(() => {
    for (const elementName of ['hans-button', 'hans-tag']) {
      if (!customElements.get(elementName)) {
        customElements.define(elementName, class extends HTMLElement {});
      }
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceDetailModalComponent],
      providers: [provideAppTranslations(), provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceDetailModalComponent);
    fixture.componentRef.setInput('item', item);
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();
  });

  it('renders the detail drawer content', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Stefanini Group');
    expect(compiled.textContent).toContain('Customer & Dealer Transformation App');
    expect(compiled.textContent).toContain('Front-end');
  });

  it('emits close request', () => {
    const component = fixture.componentInstance;
    const spy = jasmine.createSpy('closed');
    component.closed.subscribe(spy);

    component['requestClose']();

    expect(spy).toHaveBeenCalled();
  });

  it('does not render the drawer when it is closed', () => {
    fixture.componentRef.setInput('isOpen', false);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('[role="dialog"]')).toBeNull();
  });
});
