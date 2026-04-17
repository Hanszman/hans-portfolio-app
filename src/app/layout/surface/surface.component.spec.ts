import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SurfaceComponent } from './surface.component';

@Component({
  imports: [SurfaceComponent],
  template: `
    <app-surface
      tone="info"
      spacing="compact"
      label="Signal"
      surfaceTitle="Surface title"
      description="Surface description."
    >
      Surface content
    </app-surface>
  `,
})
class TestHostComponent {}

describe('SurfaceComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurfaceComponent, TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should render projected content with the default surface classes', () => {
    const fixture = TestBed.createComponent(SurfaceComponent);
    fixture.detectChanges();

    const surface = (fixture.nativeElement as HTMLElement).querySelector(
      '[data-testid="surface"]',
    );

    expect(surface?.className).toContain('surface-base');
    expect(surface?.className).toContain('surface-spacing-comfortable');
  });

  it('should render projected content with the configured tone and spacing', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const surface = compiled.querySelector('[data-testid="surface"]');

    expect(compiled.textContent).toContain('Surface content');
    expect(compiled.textContent).toContain('Signal');
    expect(compiled.textContent).toContain('Surface title');
    expect(compiled.textContent).toContain('Surface description.');
    expect(surface?.className).toContain('surface-info');
    expect(surface?.className).toContain('surface-spacing-compact');
  });
});
