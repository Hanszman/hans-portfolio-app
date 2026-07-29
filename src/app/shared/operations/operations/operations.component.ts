import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AppTranslationKey } from '../../../core/translation/translation.types';
import { InfoStateComponent } from '../../info-state/info-state.component';
import { OperationsActionsComponent } from '../operations-actions/operations-actions.component';

@Component({
  selector: 'app-operations',
  standalone: true,
  imports: [InfoStateComponent, OperationsActionsComponent, TranslatePipe],
  templateUrl: './operations.component.html',
  styleUrl: './operations.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperationsComponent {
  readonly kickerKey = input.required<AppTranslationKey>();
  readonly titleKey = input.required<AppTranslationKey>();
  readonly descriptionKeys = input<readonly AppTranslationKey[]>([]);
  readonly endpointLabel = input.required<string>();
  readonly hasRecords = input(false);
  readonly isLoading = input(false);
  readonly errorKey = input<AppTranslationKey | null>(null);
  readonly loadingKey = input.required<AppTranslationKey>();
  readonly emptyKey = input.required<AppTranslationKey>();
  readonly createDisabled = input(false);

  readonly createClicked = output<void>();
  readonly readClicked = output<void>();
  readonly updateClicked = output<void>();
  readonly deleteClicked = output<void>();
}
