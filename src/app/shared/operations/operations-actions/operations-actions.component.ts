import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import {
  OPERATIONS_ACTION_DEFINITIONS,
  OperationsActionDefinition,
  OperationsActionKey,
} from './operations-actions.types';

@Component({
  selector: 'app-operations-actions',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './operations-actions.component.html',
  styleUrl: './operations-actions.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperationsActionsComponent {
  readonly createDisabled = input(false);
  readonly readDisabled = input(false);
  readonly updateDisabled = input(false);
  readonly deleteDisabled = input(false);

  readonly createClicked = output<void>();
  readonly readClicked = output<void>();
  readonly updateClicked = output<void>();
  readonly deleteClicked = output<void>();

  protected readonly actions = computed(() =>
    OPERATIONS_ACTION_DEFINITIONS.map((action) => ({
      ...action,
      disabled: this.resolveActionDisabled(action.key),
    })),
  );

  protected trackByActionKey(
    index: number,
    action: OperationsActionDefinition & { disabled: boolean },
  ): OperationsActionKey {
    return action.key;
  }

  protected emitAction(actionKey: OperationsActionKey): void {
    switch (actionKey) {
      case 'create':
        this.createClicked.emit();
        return;
      case 'read':
        this.readClicked.emit();
        return;
      case 'update':
        this.updateClicked.emit();
        return;
      case 'delete':
        this.deleteClicked.emit();
    }
  }

  private resolveActionDisabled(actionKey: OperationsActionKey): boolean {
    switch (actionKey) {
      case 'create':
        return this.createDisabled();
      case 'read':
        return this.readDisabled();
      case 'update':
        return this.updateDisabled();
      case 'delete':
        return this.deleteDisabled();
    }
  }
}
