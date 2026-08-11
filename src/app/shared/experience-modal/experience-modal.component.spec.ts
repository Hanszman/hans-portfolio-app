import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { ExperienceModalComponent } from './experience-modal.component';

describe('ExperienceModalComponent', () => {
  let fixture: ComponentFixture<ExperienceModalComponent>;
  const imageSource =
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/%3E';

  const settleMedia = (): void => {
    fixture.nativeElement
      .querySelectorAll('.modal-media-preloader img')
      .forEach((image: HTMLImageElement) => image.dispatchEvent(new Event('load')));
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceModalComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();
    fixture = TestBed.createComponent(ExperienceModalComponent);
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('item', {
      companyName: 'Hans',
      roleTitle: 'Developer',
      description: 'Built products.',
      dateRangeLabel: '2024 - 2026',
      jobs: [
        {
          id: 'job-1',
          title: 'Developer',
          summary: 'Built products.',
          startDate: '2024-01-01',
          endDate: '2026-01-01',
          dateRangeLabel: '01/01/2024 - 01/01/2026',
        },
      ],
      companyImage: { src: `${imageSource}#company`, alt: 'Hans' },
      projects: [{ slug: 'portfolio', title: 'Portfolio', summary: 'Website' }],
      customers: [
        {
          slug: 'client',
          name: 'Client',
          image: { src: `${imageSource}#client`, alt: 'Client' },
          companyName: 'Hans',
          projectCount: 1,
        },
      ],
      technologyGroups: [
        {
          labelKey: 'common.sections.techStack',
          technologies: [{ slug: 'angular', name: 'Angular' }],
        },
      ],
    });
    fixture.detectChanges();
  });

  it('renders skeletons until the modal media settles', () => {
    expect(fixture.nativeElement.querySelectorAll('app-modal-skeleton').length).toBeGreaterThan(0);

    settleMedia();

    expect(fixture.nativeElement.textContent).toContain('Built products.');
    expect(fixture.nativeElement.querySelectorAll('app-tag-button').length).toBe(2);
  });

  it('emits close and related entity requests', () => {
    settleMedia();
    spyOn(fixture.componentInstance.closed, 'emit');
    spyOn(fixture.componentInstance.openTechnology, 'emit');
    spyOn(fixture.componentInstance.openCustomer, 'emit');
    spyOn(fixture.componentInstance.openProject, 'emit');
    fixture.nativeElement.querySelector('hans-modal').dispatchEvent(new Event('close'));
    const tagButtons = fixture.nativeElement.querySelectorAll('app-tag-button');
    tagButtons[0].dispatchEvent(
      new CustomEvent('selected', { detail: fixture.componentInstance.item()?.customers[0] }),
    );
    fixture.nativeElement
      .querySelectorAll('app-tag-button')[1]
      .dispatchEvent(new CustomEvent('selected', { detail: { slug: 'angular', name: 'Angular' } }));
    fixture.nativeElement.querySelector('.experience-modal-project-card').click();
    expect(fixture.componentInstance.closed.emit).toHaveBeenCalled();
    expect(fixture.componentInstance.openTechnology.emit).toHaveBeenCalled();
    expect(fixture.componentInstance.openCustomer.emit).toHaveBeenCalled();
    expect(fixture.componentInstance.openProject.emit).toHaveBeenCalledOnceWith('portfolio');
  });

  it('stays ready when the selected experience is cleared', () => {
    fixture.componentRef.setInput('item', null);
    fixture.detectChanges();

    expect(fixture.componentInstance['mediaSources']()).toEqual([]);
    expect(fixture.nativeElement.querySelector('app-modal-skeleton')).toBeNull();
  });
});
