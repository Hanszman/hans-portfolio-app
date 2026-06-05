import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { IntroComponent } from './intro.component';

describe('IntroComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntroComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should render the provided page intro copy', () => {
    const fixture = TestBed.createComponent(IntroComponent);
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
