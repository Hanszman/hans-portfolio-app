import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { OperationsDetailedItemViewModel } from '../operations.types';

@Component({
  selector: 'app-operations-detailed-item',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './operations-detailed-item.component.html',
  styleUrl: './operations-detailed-item.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperationsDetailedItemComponent {
  readonly item = input.required<OperationsDetailedItemViewModel>();
  readonly updateSelected = output<string>();
  readonly deleteSelected = output<string>();
}
