import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SectionHeaderComponent } from './section-header.component';

describe('SectionHeaderComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionHeaderComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should render the section label, title and description', () => {
    const fixture = TestBed.createComponent(SectionHeaderComponent);
    fixture.componentRef.setInput('sectionLabel', '// CAREER_TIMELINE');
    fixture.componentRef.setInput('title', 'Professional Experience');
    fixture.componentRef.setInput('description', 'A chronological journey through my career.');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('// CAREER_TIMELINE');
    expect(compiled.textContent).toContain('Professional Experience');
    expect(compiled.textContent).toContain('A chronological journey through my career.');
  });
});
