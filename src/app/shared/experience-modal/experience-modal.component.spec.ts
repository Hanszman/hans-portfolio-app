import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { ExperienceModalComponent } from './experience-modal.component';

describe('ExperienceModalComponent', () => {
  let fixture: ComponentFixture<ExperienceModalComponent>;

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
      companyImage: { src: '/logo.png', alt: 'Hans' },
      projects: [{ slug: 'portfolio', title: 'Portfolio', summary: 'Website' }],
      customers: [{ slug: 'client', name: 'Client', image: { src: '/client.png', alt: 'Client' } }],
      technologyGroups: [
        {
          labelKey: 'pages.experiences.detail.techStack',
          technologies: [{ slug: 'angular', name: 'Angular' }],
        },
      ],
    });
    fixture.detectChanges();
  });

  it('renders customers and technologies with the shared tag component', () => {
    expect(fixture.nativeElement.textContent).toContain('Built products.');
    expect(fixture.nativeElement.querySelectorAll('app-tag-button').length).toBe(2);
  });

  it('emits close and technology requests', () => {
    spyOn(fixture.componentInstance.closed, 'emit');
    spyOn(fixture.componentInstance.openTechnology, 'emit');
    fixture.nativeElement.querySelector('hans-modal').dispatchEvent(new Event('close'));
    fixture.nativeElement
      .querySelectorAll('app-tag-button')[1]
      .dispatchEvent(new CustomEvent('selected', { detail: { slug: 'angular', name: 'Angular' } }));
    expect(fixture.componentInstance.closed.emit).toHaveBeenCalled();
    expect(fixture.componentInstance.openTechnology.emit).toHaveBeenCalled();
  });
});
