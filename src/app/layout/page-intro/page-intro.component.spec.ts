import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PageIntroComponent } from './page-intro.component';

describe('PageIntroComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageIntroComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should render the provided page intro copy', () => {
    const fixture = TestBed.createComponent(PageIntroComponent);
    fixture.componentRef.setInput('sectionLabel', 'Foundation');
    fixture.componentRef.setInput('title', 'Home page');
    fixture.componentRef.setInput('description', 'Home page description.');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Foundation');
    expect(compiled.textContent).toContain('Home page');
    expect(compiled.textContent).toContain('Home page description.');
  });
});
