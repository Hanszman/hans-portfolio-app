import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { ExperienceTimelineItemViewModel } from '../../experiences.types';
import { ExperienceTimelineCardComponent } from './experience-timeline-card.component';

describe('ExperienceTimelineCardComponent', () => {
  let fixture: ComponentFixture<ExperienceTimelineCardComponent>;
  let component: ExperienceTimelineCardComponent;
  const createTechnology = (index: number) => ({
    slug: `tech-${index}`,
    name: `Tech ${index}`,
    category: 'FRAMEWORK',
    level: 'ADVANCED',
    frequency: 'FREQUENT',
    image: {
      src: `/assets/img/skills/tech-${index}.png`,
      alt: `Tech ${index} icon`,
    },
    projectCount: 2,
  });

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
    companyImage: {
      src: '/assets/img/experiences/stefanini.jpg',
      alt: 'Stefanini logo',
    },
    customers: [
      {
        slug: 'ford',
        name: 'Ford',
        image: {
          src: '/assets/img/experiences/ford.jpg',
          alt: 'Ford logo',
        },
        companyName: 'Stefanini Group',
        projectCount: 2,
      },
      {
        slug: 'ale',
        name: 'Ale',
        image: {
          src: '/assets/img/experiences/ale.jpg',
          alt: 'Ale logo',
        },
        companyName: 'Stefanini Group',
        projectCount: 2,
      },
    ],
    projects: [],
    technologies: Array.from({ length: 10 }, (_, index) =>
      createTechnology(index + 1),
    ),
    extraTechnologyCount: 2,
    technologyGroups: [
      {
        labelKey: 'pages.experiences.detail.stackGroups.frontend',
        technologies: [
          {
            slug: 'tech-1',
            name: 'Tech 1',
            category: 'FRAMEWORK',
            level: 'ADVANCED',
            frequency: 'FREQUENT',
            image: {
              src: '/assets/img/skills/tech-1.png',
              alt: 'Tech 1 icon',
            },
            projectCount: 2,
          },
        ],
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
    const tags = Array.from(compiled.querySelectorAll('hans-tag'));
    expect(tags.some((tag) => tag.getAttribute('label') === 'Tech 8')).toBeTrue();
    expect(tags.some((tag) => tag.getAttribute('label') === 'Tech 9')).toBeFalse();
  });

  it('emits details request', () => {
    const spy = jasmine.createSpy('openDetails');
    component.openDetails.subscribe(spy);

    component['requestDetails']();

    expect(spy).toHaveBeenCalledWith(item);
  });

  it('emits technology details request', () => {
    const spy = jasmine.createSpy('openTechnology');
    component.openTechnology.subscribe(spy);

    component['requestTechnologyDetails'](item.technologies[0]);

    expect(spy).toHaveBeenCalledWith(item.technologies[0]);
  });

  it('emits customer details request', () => {
    const spy = jasmine.createSpy('openCustomer');
    component.openCustomer.subscribe(spy);

    component['requestCustomerDetails'](item.customers[0]);

    expect(spy).toHaveBeenCalledWith(item.customers[0]);
  });

  it('expands hidden technologies', () => {
    component['toggleTechnologyList']();
    fixture.detectChanges();

    const tags = Array.from(
      fixture.nativeElement.querySelectorAll('hans-tag'),
    ) as HTMLElement[];

    expect(tags.some((tag) => tag.getAttribute('label') === 'Tech 9')).toBeTrue();
    expect(fixture.nativeElement.textContent).toContain('Show less');
  });
});
