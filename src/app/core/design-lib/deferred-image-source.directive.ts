import { Directive, ElementRef, effect, inject, input } from '@angular/core';
import { DesignLibService } from './design-lib.service';

@Directive({
  selector: '[appDeferredImageSource]',
  standalone: true,
  host: {
    '[style.display]': '"inline-block"',
    '[style.width]': 'deferredImageFrameWidth()',
    '[style.height]': 'deferredImageFrameHeight()',
    '[style.max-width]': '"100%"',
    '[style.overflow]': '"hidden"',
    '[style.object-fit]': 'deferredImageObjectFit()',
    '[style.contain]': '"layout paint"',
    '[style.box-sizing]': '"border-box"',
  },
})
export class DeferredImageSourceDirective {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly designLibService = inject(DesignLibService);

  readonly source = input<string | null>(null, { alias: 'appDeferredImageSource' });
  readonly deferredImageSourceAttribute = input('src');
  readonly deferredImageFrameWidth = input<string | null>(null);
  readonly deferredImageFrameHeight = input<string | null>(null);
  readonly deferredImageObjectFit = input<'contain' | 'cover'>('contain');

  constructor() {
    effect((onCleanup) => {
      const element = this.elementRef.nativeElement;
      const source = this.source();
      const sourceAttribute = this.deferredImageSourceAttribute();
      let cancelled = false;

      element.removeAttribute(sourceAttribute);
      onCleanup(() => {
        cancelled = true;
      });

      if (!source) {
        return;
      }

      void this.designLibService.waitForElementStyles(element).then((stylesReady) => {
        if (!cancelled && stylesReady) {
          element.setAttribute(sourceAttribute, source);
        }
      });
    });
  }
}
