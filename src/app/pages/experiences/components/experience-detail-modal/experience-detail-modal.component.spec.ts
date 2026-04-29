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
    projects: [
      {
        slug: 'ford-app',
        title: 'Ford App',
        summary: 'Summary',
        statusLabel: 'Concluido',
        environmentLabel: 'Full stack',
      },
    ],
    technologies: ['Angular'],
    extraTechnologyCount: 0,
    galleryItems: [{ id: 'gallery-1', imageSrc: '/img.png', imageAlt: 'Gallery' }],
  };

  beforeAll(() => {
    for (const elementName of ['hans-modal', 'hans-tag', 'hans-chart', 'hans-carousel']) {
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

  it('renders analytics and gallery', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('hans-chart')).toBeTruthy();
    expect(compiled.querySelector('hans-carousel')).toBeTruthy();
    expect(compiled.textContent).toContain('Front-End Specialist');
  });

  it('emits close request', () => {
    const component = fixture.componentInstance;
    const spy = jasmine.createSpy('closed');
    component.closed.subscribe(spy);

    component['requestClose']();

    expect(spy).toHaveBeenCalled();
  });
});
