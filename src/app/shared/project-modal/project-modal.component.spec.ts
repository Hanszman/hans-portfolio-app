import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { ProjectModalComponent } from './project-modal.component';

describe('ProjectModalComponent', () => {
  let fixture: ComponentFixture<ProjectModalComponent>;
  const imageSource =
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/%3E';
  const project = {
    id: 'project',
    title: 'Portfolio',
    summary: 'Summary',
    description: 'Description',
    contextLabel: 'Personal',
    statusLabel: 'In progress',
    environmentLabel: 'Frontend',
    dateRangeLabel: '2024 - 2026',
    companyNames: ['Hans'],
    stackGroups: [
      {
        labelKey: 'common.sections.techStack' as const,
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
    galleryItems: [{ id: 'image', imageSrc: imageSource, imageAlt: 'Project' }],
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
    expect(
      fixture.nativeElement.querySelector('.project-modal-aside .project-modal-links'),
    ).toBeTruthy();
    expect(
      fixture.nativeElement.querySelector('.project-modal-content .project-modal-links'),
    ).toBeNull();

    fixture.componentRef.setInput('project', { ...project, galleryItems: [] });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('hans-modal').getAttribute('modalSize')).toBe(
      'medium',
    );
    expect(fixture.nativeElement.querySelector('hans-carousel')).toBeNull();
    expect(
      fixture.nativeElement.querySelector('.project-modal-content .project-modal-links'),
    ).toBeTruthy();
  });

  it('uses the compact size before a project is provided', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance['mediaSources']()).toEqual([]);
    expect(fixture.nativeElement.querySelector('hans-modal').getAttribute('modalSize')).toBe(
      'medium',
    );
  });

  it('renders skeletons until gallery media settles', () => {
    fixture.componentRef.setInput('project', project);
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('app-modal-skeleton').length).toBeGreaterThan(0);

    fixture.nativeElement
      .querySelector('.modal-media-preloader img')
      .dispatchEvent(new Event('error'));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('app-modal-skeleton')).toBeNull();
    expect(fixture.nativeElement.querySelector('hans-carousel')).toBeTruthy();
  });

  it('emits close and technology requests', () => {
    fixture.componentRef.setInput('project', project);
    fixture.detectChanges();
    spyOn(fixture.componentInstance.closed, 'emit');
    spyOn(fixture.componentInstance.openTechnology, 'emit');
    fixture.nativeElement.querySelector('hans-modal').dispatchEvent(new Event('close'));
    fixture.nativeElement
      .querySelector('.project-modal-tags app-tag-button')
      .dispatchEvent(
        new CustomEvent('selected', { detail: project.stackGroups[0].technologies[0].value }),
      );
    expect(fixture.componentInstance.closed.emit).toHaveBeenCalled();
    expect(fixture.componentInstance.openTechnology.emit).toHaveBeenCalled();
  });
});
