import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ExperiencesPageComponent } from './experiences-page.component';

describe('ExperiencesPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperiencesPageComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should render the experiences foundation content', () => {
    const fixture = TestBed.createComponent(ExperiencesPageComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Experiences foundation');
    expect(compiled.textContent).toContain('Impact timeline and leadership narrative');
    expect(compiled.textContent).toContain('Career storytelling');
  });
});
