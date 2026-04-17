import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import {
  PortfolioSurfaceSpacing,
  PortfolioSurfaceTone,
} from './portfolio-surface.types';

@Component({
  selector: 'app-portfolio-surface',
  templateUrl: './portfolio-surface.component.html',
  styleUrl: './portfolio-surface.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioSurfaceComponent {
  readonly tone = input<PortfolioSurfaceTone>('base');
  readonly spacing = input<PortfolioSurfaceSpacing>('comfortable');
  readonly label = input('');
  readonly surfaceTitle = input('');
  readonly description = input('');

  protected readonly surfaceClassName = computed(() =>
    [
      'portfolio-surface',
      `portfolio-surface-${this.tone()}`,
      `portfolio-surface-spacing-${this.spacing()}`,
    ].join(' '),
  );

  protected readonly hasHeader = computed(
    () =>
      this.label().trim().length > 0 ||
      this.surfaceTitle().trim().length > 0 ||
      this.description().trim().length > 0,
  );
}
