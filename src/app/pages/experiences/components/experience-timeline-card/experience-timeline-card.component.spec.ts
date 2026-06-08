import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { ExperienceTimelineItemViewModel } from '../../experiences.types';
import { ExperienceTimelineCardComponent } from './experience-timeline-card.component';

describe('ExperienceTimelineCardComponent', () => {
  let fixture: ComponentFixture<ExperienceTimelineCardComponent>;
  let component: ExperienceTimelineCardComponent;

  const item: ExperienceTimelineItemViewModel = {
    id: '1',
    slug: 'stefanini',
    companyName: 'Stefanini Group',
    roleTitle: 'Full Stack Developer',
    summary: 'Summary',
    description: 'Enterprise delivery for international clients.',
    dateRangeLabel: 'Sep 2021 - Present',
    isCurrent: true,
    isHighlight: true,
    jobs: ['Full Stack Developer'],
    customers: ['Ford', 'Ale'],
    projects: [],
    technologies: ['Angular', 'TypeScript'],
    extraTechnologyCount: 2,
    technologyGroups: [
      {
        labelKey: 'pages.experiences.detail.stackGroups.frontend',
        technologies: ['Angular', 'TypeScript'],
      },
    ],
  };

  beforeAll(() => {
    for (const elementName of ['hans-icon', 'hans-tag']) {
      if (!customElements.get(elementName)) {
        customElements.define(elementName, class extends HTMLElement {});
      }
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceTimelineCardComponent],
      providers: [provideAppTranslations(), provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceTimelineCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('item', item);
    fixture.detectChanges();
  });

  it('renders the redesigned timeline card', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Stefanini Group');
    expect(compiled.textContent).toContain('Full Stack Developer');
    expect(compiled.textContent).toContain('View details');
    expect(compiled.textContent).toContain('+2');
  });

  it('emits details request', () => {
    const spy = jasmine.createSpy('openDetails');
    component.openDetails.subscribe(spy);

    component['requestDetails']();

    expect(spy).toHaveBeenCalledWith(item);
  });
});
