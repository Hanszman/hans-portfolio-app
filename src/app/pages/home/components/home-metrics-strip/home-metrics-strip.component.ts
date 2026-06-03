import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { HomeMetricViewModel } from '../../home.types';
import { PortfolioCardComponent } from '../../../../shared/portfolio-card/portfolio-card.component';
import { PortfolioCardViewModel } from '../../../../shared/portfolio-card/portfolio-card.types';

@Component({
  selector: 'app-home-metrics-strip',
  imports: [TranslatePipe, PortfolioCardComponent],
  templateUrl: './home-metrics-strip.component.html',
  styleUrl: './home-metrics-strip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeMetricsStripComponent {
  readonly ariaLabelKey = input.required<string>();
  readonly metrics = input<readonly HomeMetricViewModel[]>([]);

  protected toCard(metric: HomeMetricViewModel): PortfolioCardViewModel {
    return {
      variant: 'metric',
      value: metric.value,
      labelKey: metric.labelKey,
      descriptionKey: metric.descriptionKey,
      iconName: metric.iconName,
    };
  }
}
