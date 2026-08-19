import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { sortOperationsRelationPickerOptions } from './helpers/operations-relation-picker.helper';
import { OperationsRelationPickerOption } from './operations-relation-picker.types';

@Component({
  selector: 'app-operations-relation-picker',
  standalone: true,
  templateUrl: './operations-relation-picker.component.html',
  styleUrl: './operations-relation-picker.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperationsRelationPickerComponent {
  readonly label = input('');
  readonly description = input('');
  readonly emptyMessage = input('');
  readonly options = input<readonly OperationsRelationPickerOption[]>([]);
  readonly selectedIds = input<readonly string[]>([]);
  readonly toggled = output<string>();

  protected readonly sortedOptions = computed(() =>
    sortOperationsRelationPickerOptions(this.options()),
  );

  protected isSelected(id: string): boolean {
    return this.selectedIds().includes(id);
  }
}
