import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import {
  SurfaceSpacing,
  SurfaceTone,
} from './surface.types';

@Component({
  selector: 'app-surface',
  templateUrl: './surface.component.html',
  styleUrl: './surface.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurfaceComponent {
  readonly tone = input<SurfaceTone>('base');
  readonly spacing = input<SurfaceSpacing>('comfortable');
  readonly label = input('');
  readonly surfaceTitle = input('');
  readonly description = input('');

  protected readonly surfaceClassName = computed(() =>
    [
      'surface',
      `surface-${this.tone()}`,
      `surface-spacing-${this.spacing()}`,
    ].join(' '),
  );

  protected readonly hasHeader = computed(
    () =>
      this.label().trim().length > 0 ||
      this.surfaceTitle().trim().length > 0 ||
      this.description().trim().length > 0,
  );
}
