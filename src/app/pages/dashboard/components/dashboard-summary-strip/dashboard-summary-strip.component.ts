import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CardComponent } from '../../../../shared/card/card.component';
import { CardViewModel } from '../../../../shared/card/card.types';
import { DashboardSummaryCardViewModel } from '../../dashboard.types';

@Component({
  selector: 'app-dashboard-summary-strip',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './dashboard-summary-strip.component.html',
  styleUrl: './dashboard-summary-strip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardSummaryStripComponent {
  readonly cards = input<readonly DashboardSummaryCardViewModel[]>([]);

  protected toCard(card: DashboardSummaryCardViewModel): CardViewModel {
    return {
      alignment: 'center',
      value: card.value,
      labelKey: card.labelKey,
      iconName: card.iconName,
    };
  }
}
