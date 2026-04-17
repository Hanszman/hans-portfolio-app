import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SkillsComponent } from './skills.component';

describe('SkillsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should render the skills foundation content', () => {
    const fixture = TestBed.createComponent(SkillsComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Skills foundation');
    expect(compiled.textContent).toContain('Technology clusters and real experience metrics');
    expect(compiled.textContent).toContain('Concepts, patterns and architectures');
  });
});
