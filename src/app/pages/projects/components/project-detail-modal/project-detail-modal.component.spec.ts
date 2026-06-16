import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { ProjectCaseViewModel } from '../../projects.types';
import { ProjectDetailModalComponent } from './project-detail-modal.component';

describe('ProjectDetailModalComponent', () => {
  let fixture: ComponentFixture<ProjectDetailModalComponent>;

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
        technologies: ['Angular', 'TypeScript'],
      },
    ],
    dateRangeLabel: 'Jan 2024 - Atual',
    isFeatured: true,
    isHighlight: false,
    companyNames: ['Company'],
    technologies: ['Angular', 'TypeScript'],
    extraTechnologyCount: 0,
    links: [{ id: '1', url: 'https://example.com', label: 'Repo', typeLabel: 'GitHub' }],
    imageUrl: '',
    imageAlt: 'Project',
    assetCountLabel: '2',
    experienceTitles: ['Lead Front-End'],
    tagLabels: ['Angular'],
    galleryItems: [
      { id: 'gallery-1', imageSrc: '/gallery.png', imageAlt: 'Gallery image' },
    ],
  };

  beforeAll(() => {
    for (const elementName of ['hans-modal', 'hans-tag']) {
      if (!customElements.get(elementName)) {
        customElements.define(elementName, class extends HTMLElement {});
      }
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetailModalComponent],
      providers: [provideAppTranslations(), provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDetailModalComponent);
    fixture.componentRef.setInput('project', project);
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();
  });

  it('renders modal content', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('hans-modal')).toBeTruthy();
    expect(compiled.textContent).toContain('Description');
    expect(compiled.textContent).toContain('// clients');
    expect(compiled.textContent).toContain('// tech_stack');
    expect(compiled.querySelector('hans-tag[label="Angular"]')).toBeTruthy();
    expect(compiled.textContent).toContain('Company');
  });

  it('emits close request', () => {
    const component = fixture.componentInstance;
    const spy = jasmine.createSpy('closed');
    component.closed.subscribe(spy);

    component['requestClose']();

    expect(spy).toHaveBeenCalled();
  });

  it('renders no projected detail body when no project is selected', () => {
    fixture.componentRef.setInput('project', null);
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).textContent).not.toContain(
      'Description',
    );
  });

  it('uses the summary when the detailed description is empty', () => {
    fixture.componentRef.setInput('project', {
      ...project,
      description: '',
    });
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Summary');
  });
});
