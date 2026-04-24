import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ContainerComponent } from './container.component';

@Component({
  imports: [ContainerComponent],
  template: `
    <app-container
      tone="info"
      spacing="compact"
      label="Signal"
      containerTitle="Container title"
      description="Container description."
    >
      Container content
    </app-container>
  `,
})
class TestHostComponent {}

describe('ContainerComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerComponent, TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should render projected content with the default container classes', () => {
    const fixture = TestBed.createComponent(ContainerComponent);
    fixture.detectChanges();

    const container = (fixture.nativeElement as HTMLElement).querySelector(
      '[data-testid="container"]',
    );

    expect(container?.className).toContain('container-base');
    expect(container?.className).toContain('container-spacing-comfortable');
  });

  it('should render projected content with the configured tone and spacing', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('[data-testid="container"]');

    expect(compiled.textContent).toContain('Container content');
    expect(compiled.textContent).toContain('Signal');
    expect(compiled.textContent).toContain('Container title');
    expect(compiled.textContent).toContain('Container description.');
    expect(container?.className).toContain('container-info');
    expect(container?.className).toContain('container-spacing-compact');
  });
});
