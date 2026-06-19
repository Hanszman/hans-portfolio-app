import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-expandable-list-toggle',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './expandable-list-toggle.component.html',
  styleUrl: './expandable-list-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandableListToggleComponent {
  readonly isExpanded = input(false);
  readonly hiddenCount = input(0);
  readonly toggled = output<void>();

  protected readonly shouldShow = computed(
    () => this.isExpanded() || this.hiddenCount() > 0,
  );

  protected requestToggle(event: MouseEvent): void {
    event.stopPropagation();
    this.toggled.emit();
  }
}
