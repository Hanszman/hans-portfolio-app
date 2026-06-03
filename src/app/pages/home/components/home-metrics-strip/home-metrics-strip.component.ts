import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { HomeMetricViewModel } from '../../home.types';

@Component({
  selector: 'app-home-metrics-strip',
  imports: [TranslatePipe],
  templateUrl: './home-metrics-strip.component.html',
  styleUrl: './home-metrics-strip.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeMetricsStripComponent {
  readonly ariaLabelKey = input.required<string>();
  readonly metrics = input<readonly HomeMetricViewModel[]>([]);
}
