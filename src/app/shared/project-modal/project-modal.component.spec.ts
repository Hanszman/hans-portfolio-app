import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { ProjectModalComponent } from './project-modal.component';

describe('ProjectModalComponent', () => {
  let fixture: ComponentFixture<ProjectModalComponent>;
  const project = {
    id: 'project',
    title: 'Portfolio',
    summary: 'Summary',
    description: 'Description',
    contextLabel: 'Personal',
    dateRangeLabel: '2024 - 2026',
    companyNames: ['Hans'],
    stackGroups: [
      {
        labelKey: 'pages.projects.detail.techStack' as const,
        technologies: [
          {
            slug: 'angular',
            label: 'Angular',
            value: { slug: 'angular', name: 'Angular' },
          },
        ],
      },
    ],
    links: [{ id: 'link', url: 'https://example.com', label: 'Website', typeLabel: 'Web' }],
    galleryItems: [{ id: 'image', imageSrc: '/image.png', imageAlt: 'Project' }],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectModalComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();
    fixture = TestBed.createComponent(ProjectModalComponent);
  });

  it('uses a large modal and carousel only when images exist', () => {
    fixture.componentRef.setInput('project', project);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('hans-modal').getAttribute('modalSize')).toBe(
      'large',
    );
    expect(fixture.nativeElement.querySelector('hans-carousel')).toBeTruthy();

    fixture.componentRef.setInput('project', { ...project, galleryItems: [] });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('hans-modal').getAttribute('modalSize')).toBe(
      'medium',
    );
    expect(fixture.nativeElement.querySelector('hans-carousel')).toBeNull();
  });

  it('emits close and technology requests', () => {
    fixture.componentRef.setInput('project', project);
    fixture.detectChanges();
    spyOn(fixture.componentInstance.closed, 'emit');
    spyOn(fixture.componentInstance.openTechnology, 'emit');
    fixture.nativeElement.querySelector('hans-modal').dispatchEvent(new Event('close'));
    fixture.nativeElement
      .querySelector('app-tag-button')
      .dispatchEvent(
        new CustomEvent('selected', { detail: project.stackGroups[0].technologies[0].value }),
      );
    expect(fixture.componentInstance.closed.emit).toHaveBeenCalled();
    expect(fixture.componentInstance.openTechnology.emit).toHaveBeenCalled();
  });
});
