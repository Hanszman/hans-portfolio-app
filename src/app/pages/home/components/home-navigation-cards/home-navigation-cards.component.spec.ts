import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { HomeNavigationCardsComponent } from './home-navigation-cards.component';

describe('HomeNavigationCardsComponent', () => {
  beforeAll(() => {
    if (!customElements.get('hans-card')) {
      customElements.define('hans-card', class extends HTMLElement {});
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeNavigationCardsComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations(), provideRouter([])],
    }).compileComponents();
  });

  it('should render highlighted projects and emit the selected modal item', () => {
    const fixture = TestBed.createComponent(HomeNavigationCardsComponent);
    const openProjectSpy = jasmine.createSpy('openProject');
    fixture.componentInstance.openProject.subscribe(openProjectSpy);
    const project = {
      id: 'project-1',
      title: 'Portfolio',
      summary: 'Summary',
      description: 'Description',
      contextLabel: 'Professional',
      dateRangeLabel: 'Jan 2025 - Present',
      companyNames: [],
      stackGroups: [],
      links: [],
      galleryItems: [],
    };

    fixture.componentRef.setInput('cards', [
      {
        id: project.id,
        eyebrow: project.contextLabel,
        title: project.title,
        description: project.description,
        project,
      },
    ]);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Professional');
    expect(compiled.textContent).toContain('Portfolio');
    expect(compiled.querySelectorAll('a')).toHaveSize(0);
    expect(compiled.querySelectorAll('hans-card')).toHaveSize(1);

    compiled.querySelector('hans-card')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(openProjectSpy).toHaveBeenCalledWith(project);
  });
});
