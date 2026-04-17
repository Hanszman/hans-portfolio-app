import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ProjectsComponent } from './projects.component';

describe('ProjectsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should render the projects foundation content', () => {
    const fixture = TestBed.createComponent(ProjectsComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Projects foundation');
    expect(compiled.textContent).toContain('Featured work, outcomes and linked assets');
    expect(compiled.textContent).toContain('Screenshots, links and deploy references');
  });
});
