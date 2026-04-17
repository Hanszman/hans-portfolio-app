import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ProjectsPageComponent } from './projects-page.component';

describe('ProjectsPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsPageComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should render the projects foundation content', () => {
    const fixture = TestBed.createComponent(ProjectsPageComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Projects foundation');
    expect(compiled.textContent).toContain('Featured work, outcomes and linked assets');
    expect(compiled.textContent).toContain('Screenshots, links and deploy references');
  });
});
