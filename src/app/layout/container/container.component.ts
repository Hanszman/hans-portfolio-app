import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import {
  ContainerSpacing,
  ContainerTone,
} from './container.types';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerComponent {
  readonly tone = input<ContainerTone>('base');
  readonly spacing = input<ContainerSpacing>('comfortable');
  readonly label = input('');
  readonly containerTitle = input('');
  readonly description = input('');

  protected readonly containerClassName = computed(() =>
    [
      'container',
      `container-${this.tone()}`,
      `container-spacing-${this.spacing()}`,
    ].join(' '),
  );

  protected readonly hasHeader = computed(
    () =>
      this.label().trim().length > 0 ||
      this.containerTitle().trim().length > 0 ||
      this.description().trim().length > 0,
  );
}
