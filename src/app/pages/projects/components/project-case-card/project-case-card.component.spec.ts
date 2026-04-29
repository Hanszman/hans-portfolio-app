import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { ProjectCaseCardComponent } from './project-case-card.component';
import { ProjectCaseViewModel } from '../../projects.types';

describe('ProjectCaseCardComponent', () => {
  let fixture: ComponentFixture<ProjectCaseCardComponent>;
  let component: ProjectCaseCardComponent;

  const project: ProjectCaseViewModel = {
    id: '1',
    slug: 'project',
    title: 'Project',
    summary: 'Summary',
    description: 'Description',
    contextLabel: 'Profissional',
    statusLabel: 'Concluido',
    environmentLabel: 'Full stack',
    dateRangeLabel: 'Jan 2024 - Atual',
    isFeatured: true,
    isHighlight: false,
    companyNames: ['Company'],
    technologies: ['Angular', 'TypeScript', 'Node.js'],
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
    for (const elementName of ['hans-icon', 'hans-tag', 'hans-button']) {
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
    expect(compiled.querySelectorAll('hans-tag').length).toBeGreaterThan(2);
  });

  it('emits details request', () => {
    const spy = jasmine.createSpy('openDetails');
    component.openDetails.subscribe(spy);

    component['requestDetails']();

    expect(spy).toHaveBeenCalledWith(project);
  });
});
