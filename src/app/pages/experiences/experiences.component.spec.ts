import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { ExperiencesComponent } from './experiences.component';

describe('ExperiencesComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperiencesComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();
  });

  it('should render the experiences foundation content', () => {
    const fixture = TestBed.createComponent(ExperiencesComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Experiences foundation');
    expect(compiled.textContent).toContain('Impact timeline and leadership narrative');
    expect(compiled.textContent).toContain('Career storytelling');
  });
});
