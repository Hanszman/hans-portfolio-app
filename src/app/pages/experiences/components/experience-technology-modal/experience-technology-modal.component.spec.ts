import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { ExperienceTechnologyViewModel } from '../../experiences.types';
import { ExperienceTechnologyModalComponent } from './experience-technology-modal.component';

describe('ExperienceTechnologyModalComponent', () => {
  let fixture: ComponentFixture<ExperienceTechnologyModalComponent>;

  const technology: ExperienceTechnologyViewModel = {
    slug: 'angular',
    name: 'Angular',
    category: 'FRAMEWORK',
    level: 'ADVANCED',
    frequency: 'FREQUENT',
    image: {
      src: '/assets/img/skills/angular.png',
      alt: 'Angular icon',
    },
    projectCount: 2,
    experienceCount: 1,
  };

  beforeAll(() => {
    if (!customElements.get('hans-modal')) {
      customElements.define('hans-modal', class extends HTMLElement {});
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceTechnologyModalComponent],
      providers: [provideAppTranslations(), provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceTechnologyModalComponent);
    fixture.componentRef.setInput('technology', technology);
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();
  });

  it('renders technology details inside a hans modal', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('hans-modal')).toBeTruthy();
    expect(compiled.textContent).toContain('ADVANCED');
    expect(compiled.textContent).toContain('2');
  });

  it('emits close request', () => {
    const component = fixture.componentInstance;
    const spy = jasmine.createSpy('closed');
    component.closed.subscribe(spy);

    component['requestClose']();

    expect(spy).toHaveBeenCalled();
  });
});
