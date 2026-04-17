import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PortfolioSurfaceComponent } from './portfolio-surface.component';

@Component({
  imports: [PortfolioSurfaceComponent],
  template: `
    <app-portfolio-surface
      tone="info"
      spacing="compact"
      label="Signal"
      surfaceTitle="Surface title"
      description="Surface description."
    >
      Surface content
    </app-portfolio-surface>
  `,
})
class TestHostComponent {}

describe('PortfolioSurfaceComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioSurfaceComponent, TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should render projected content with the default surface classes', () => {
    const fixture = TestBed.createComponent(PortfolioSurfaceComponent);
    fixture.detectChanges();

    const surface = (fixture.nativeElement as HTMLElement).querySelector(
      '[data-testid="portfolio-surface"]',
    );

    expect(surface?.className).toContain('portfolio-surface-base');
    expect(surface?.className).toContain('portfolio-surface-spacing-comfortable');
  });

  it('should render projected content with the configured tone and spacing', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const surface = compiled.querySelector('[data-testid="portfolio-surface"]');

    expect(compiled.textContent).toContain('Surface content');
    expect(compiled.textContent).toContain('Signal');
    expect(compiled.textContent).toContain('Surface title');
    expect(compiled.textContent).toContain('Surface description.');
    expect(surface?.className).toContain('portfolio-surface-info');
    expect(surface?.className).toContain('portfolio-surface-spacing-compact');
  });
});
