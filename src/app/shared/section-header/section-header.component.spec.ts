import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SectionHeaderComponent } from './section-header.component';

@Component({
  imports: [SectionHeaderComponent],
  template: `
    <app-section-header
      [sectionLabel]="'// CAREER_TIMELINE'"
      [title]="'Professional Experience'"
      [description]="'A chronological journey through my career.'"
    >
      <button sectionHeaderActions type="button">Action</button>
    </app-section-header>
  `,
})
class SectionHeaderHostComponent {}

describe('SectionHeaderComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionHeaderComponent, SectionHeaderHostComponent],
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

  it('should project top-right actions when provided', () => {
    const fixture = TestBed.createComponent(SectionHeaderHostComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(
      compiled.querySelector('.app-section-header-actions')?.textContent,
    ).toContain('Action');
  });
});
