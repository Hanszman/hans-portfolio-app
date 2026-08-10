import { CUSTOM_ELEMENTS_SCHEMA, Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { DeferredImageSourceDirective } from './deferred-image-source.directive';

class DeferredImageTestElement extends HTMLElement {
  readonly stylesheet: HTMLLinkElement;

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    this.stylesheet = document.createElement('link');
    this.stylesheet.rel = 'stylesheet';
    root.append(this.stylesheet);
  }
}

@Component({
  standalone: true,
  imports: [DeferredImageSourceDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <deferred-image-test
      [appDeferredImageSource]="source()"
      deferredImageSourceAttribute="image-src"
      deferredImageFrameWidth="2rem"
      deferredImageFrameHeight="2rem"
      deferredImageObjectFit="cover"
    ></deferred-image-test>
  `,
})
class DeferredImageSourceTestHostComponent {
  readonly source = signal<string | null>('/asset.png');
}

describe('DeferredImageSourceDirective', () => {
  let fixture: ComponentFixture<DeferredImageSourceTestHostComponent>;

  const flushDeferredSource = async (): Promise<void> => {
    await new Promise<void>((resolve) => setTimeout(resolve));
  };

  beforeAll(() => {
    if (!customElements.get('deferred-image-test')) {
      customElements.define('deferred-image-test', DeferredImageTestElement);
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeferredImageSourceTestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(DeferredImageSourceTestHostComponent);
    fixture.detectChanges();
  });

  it('should reserve the frame and defer the source until shadow styles load', async () => {
    const element = fixture.nativeElement.querySelector(
      'deferred-image-test',
    ) as DeferredImageTestElement;

    expect(element.getAttribute('image-src')).toBeNull();
    expect(element.style.width).toBe('2rem');
    expect(element.style.height).toBe('2rem');
    expect(element.style.objectFit).toBe('cover');
    expect(element.style.overflow).toBe('hidden');

    element.stylesheet.dispatchEvent(new Event('load'));
    await flushDeferredSource();

    expect(element.getAttribute('image-src')).toBe('/asset.png');
  });

  it('should keep the source hidden when the component stylesheet fails', async () => {
    const element = fixture.nativeElement.querySelector(
      'deferred-image-test',
    ) as DeferredImageTestElement;

    element.stylesheet.dispatchEvent(new Event('error'));
    await flushDeferredSource();

    expect(element.getAttribute('image-src')).toBeNull();
  });

  it('should remove stale media when the source is cleared', async () => {
    const element = fixture.nativeElement.querySelector(
      'deferred-image-test',
    ) as DeferredImageTestElement;
    element.stylesheet.dispatchEvent(new Event('load'));
    await flushDeferredSource();
    expect(element.getAttribute('image-src')).toBe('/asset.png');

    fixture.componentInstance.source.set(null);
    fixture.detectChanges();

    expect(element.getAttribute('image-src')).toBeNull();
  });

  it('should ignore a completed request after the source changes', async () => {
    const element = fixture.nativeElement.querySelector(
      'deferred-image-test',
    ) as DeferredImageTestElement;

    fixture.componentInstance.source.set('/new-asset.png');
    fixture.detectChanges();
    element.stylesheet.dispatchEvent(new Event('load'));
    await flushDeferredSource();

    expect(element.getAttribute('image-src')).toBe('/new-asset.png');
  });
});
