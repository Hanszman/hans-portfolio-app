import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { TranslationService } from '../../../../core/translation/translation.service';
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
    for (const elementName of ['hans-modal', 'hans-tag', 'hans-chart', 'hans-carousel']) {
      if (!customElements.get(elementName)) {
        customElements.define(elementName, class extends HTMLElement {});
      }
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetailModalComponent],
      providers: [
        provideAppTranslations(),
        provideZonelessChangeDetection(),
        TranslationService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDetailModalComponent);
    fixture.componentRef.setInput('project', project);
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();
  });

  it('renders modal content', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('hans-modal')).toBeTruthy();
    expect(compiled.querySelector('hans-chart')).toBeTruthy();
    expect(compiled.querySelector('hans-carousel')).toBeTruthy();
    expect(compiled.textContent).toContain('Summary');
    expect(compiled.textContent).toContain('Description');
    expect(compiled.textContent).toContain('Lead Front-End');
    expect(compiled.textContent).toContain('Company');
  });

  it('emits close request', () => {
    const component = fixture.componentInstance;
    const spy = jasmine.createSpy('closed');
    component.closed.subscribe(spy);

    component['requestClose']();

    expect(spy).toHaveBeenCalled();
  });
});
