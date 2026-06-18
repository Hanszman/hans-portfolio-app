import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { ProjectCaseCardComponent } from './project-case-card.component';
import { ProjectCaseViewModel } from '../../projects.types';

describe('ProjectCaseCardComponent', () => {
  let fixture: ComponentFixture<ProjectCaseCardComponent>;
  let component: ProjectCaseCardComponent;
  const buildTechnologyTag = (slug: string, label: string) => ({
    slug,
    label,
    value: { slug, name: label },
  });

  const project: ProjectCaseViewModel = {
    id: '1',
    slug: 'project',
    title: 'Project',
    summary: 'Summary',
    description: 'Description',
    contextLabel: 'Profissional',
    statusLabel: 'Concluido',
    environmentLabel: 'Full stack',
    filterContext: 'PROFESSIONAL',
    stackGroups: [
      {
        labelKey: 'pages.experiences.detail.stackGroups.frontend',
        technologies: [
          buildTechnologyTag('angular', 'Angular'),
          buildTechnologyTag('typescript', 'TypeScript'),
        ],
      },
    ],
    dateRangeLabel: 'Jan 2024 - Atual',
    isFeatured: true,
    isHighlight: false,
    companyNames: ['Company'],
    technologies: [
      buildTechnologyTag('angular', 'Angular'),
      buildTechnologyTag('typescript', 'TypeScript'),
      buildTechnologyTag('node-js', 'Node.js'),
      buildTechnologyTag('html', 'HTML'),
      buildTechnologyTag('css', 'CSS'),
      buildTechnologyTag('sass', 'Sass'),
    ],
    extraTechnologyCount: 1,
    links: [{ id: '1', url: 'https://example.com', label: 'Repo', typeLabel: 'GitHub' }],
    imageUrl: '',
    imageAlt: 'Project',
    assetCountLabel: '2',
    experienceTitles: ['Lead Front-End'],
    tagLabels: ['Angular'],
    galleryItems: [],
  };

  beforeAll(() => {
    for (const elementName of ['hans-card', 'hans-icon', 'hans-tag']) {
      if (!customElements.get(elementName)) {
        customElements.define(elementName, class extends HTMLElement {});
      }
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCaseCardComponent],
      providers: [provideAppTranslations(), provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCaseCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('project', project);
    fixture.detectChanges();
  });

  it('renders compact project information', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Project');
    expect(compiled.textContent).toContain('Summary');
    expect(compiled.textContent).toContain('+1');
    expect(compiled.querySelectorAll('hans-tag').length).toBeGreaterThan(2);
  });

  it('emits details request', () => {
    const spy = jasmine.createSpy('openDetails');
    component.openDetails.subscribe(spy);

    component['requestDetails']();

    expect(spy).toHaveBeenCalledWith(project);
  });

  it('emits details request from keyboard activation', () => {
    const spy = jasmine.createSpy('openDetails');
    component.openDetails.subscribe(spy);
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    spyOn(event, 'preventDefault');

    component['requestDetailsFromKeyboard'](event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(project);
  });

  it('ignores unrelated keyboard events', () => {
    const spy = jasmine.createSpy('openDetails');
    component.openDetails.subscribe(spy);

    component['requestDetailsFromKeyboard'](
      new KeyboardEvent('keydown', { key: 'Escape' }),
    );

    expect(spy).not.toHaveBeenCalled();
  });

  it('emits technology detail requests', () => {
    const spy = jasmine.createSpy('openTechnology');
    component.openTechnology.subscribe(spy);

    component['requestTechnologyDetails']({ slug: 'angular', name: 'Angular' });

    expect(spy).toHaveBeenCalledWith({ slug: 'angular', name: 'Angular' });
  });
});
