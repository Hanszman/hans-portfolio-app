import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SkillsPageComponent } from './skills-page.component';

describe('SkillsPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsPageComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should render the skills foundation content', () => {
    const fixture = TestBed.createComponent(SkillsPageComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Skills foundation');
    expect(compiled.textContent).toContain('Technology clusters and real experience metrics');
    expect(compiled.textContent).toContain('Concepts, patterns and architectures');
  });
});
