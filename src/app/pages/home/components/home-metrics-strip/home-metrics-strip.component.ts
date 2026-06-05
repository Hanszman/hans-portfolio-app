import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { HomeMetricViewModel } from '../../home.types';
import { CardComponent } from '../../../../shared/card/card.component';
import { CardViewModel } from '../../../../shared/card/card.types';

@Component({
  selector: 'app-home-metrics-strip',
  imports: [TranslatePipe, CardComponent],
  templateUrl: './home-metrics-strip.component.html',
  styleUrl: './home-metrics-strip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeMetricsStripComponent {
  readonly ariaLabelKey = input.required<string>();
  readonly metrics = input<readonly HomeMetricViewModel[]>([]);

  protected toCard(metric: HomeMetricViewModel): CardViewModel {
    return {
      alignment: 'center',
      value: metric.value,
      labelKey: metric.labelKey,
      descriptionKey: metric.descriptionKey,
      iconName: metric.iconName,
    };
  }
}
