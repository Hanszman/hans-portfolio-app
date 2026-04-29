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
    companyName: 'Stefanini',
    title: 'Front-End Specialist',
    summary: 'Summary',
    description: 'Description',
    dateRangeLabel: 'Set 2021 - Atual',
    isCurrent: true,
    isHighlight: false,
    imageUrl: '',
    jobs: ['Front-End Specialist'],
    customers: ['Ford'],
    projects: [],
    technologies: ['Angular'],
    extraTechnologyCount: 0,
    galleryItems: [],
  };

  beforeAll(() => {
    for (const elementName of ['hans-avatar', 'hans-icon', 'hans-tag', 'hans-button']) {
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

  it('renders condensed timeline card', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Stefanini');
    expect(compiled.querySelector('hans-button')).toBeTruthy();
  });

  it('emits details request', () => {
    const spy = jasmine.createSpy('openDetails');
    component.openDetails.subscribe(spy);

    component['requestDetails']();

    expect(spy).toHaveBeenCalledWith(item);
  });
});
