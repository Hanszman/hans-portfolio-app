import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { RelationPickerOption } from './relation-picker.types';

@Component({
  selector: 'app-relation-picker',
  standalone: true,
  templateUrl: './relation-picker.component.html',
  styleUrl: './relation-picker.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelationPickerComponent {
  readonly label = input('');
  readonly description = input('');
  readonly emptyMessage = input('');
  readonly options = input<readonly RelationPickerOption[]>([]);
  readonly selectedIds = input<readonly string[]>([]);
  readonly toggled = output<string>();

  protected isSelected(id: string): boolean {
    return this.selectedIds().includes(id);
  }
}
