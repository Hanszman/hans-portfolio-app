import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { OperationsItemViewModel } from '../operations.types';

@Component({
  selector: 'app-operations-item',
  standalone: true,
  templateUrl: './operations-item.component.html',
  styleUrl: './operations-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperationsItemComponent {
  readonly item = input.required<OperationsItemViewModel>();
  readonly interactive = input(true);
  readonly selected = output<string>();

  protected selectItem(): void {
    if (this.interactive()) this.selected.emit(this.item().id);
  }
}
