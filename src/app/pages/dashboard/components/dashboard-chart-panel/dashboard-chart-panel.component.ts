import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SurfaceCardComponent } from '../../../../shared/surface-card/surface-card.component';
import { InfoStateComponent } from '../../../../shared/info-state/info-state.component';
import { AppTranslationKey } from '../../../../core/translation/translation.types';
import { DashboardChartViewModel } from '../../dashboard.types';

@Component({
  selector: 'app-dashboard-chart-panel',
  standalone: true,
  imports: [SurfaceCardComponent, InfoStateComponent, TranslatePipe],
  templateUrl: './dashboard-chart-panel.component.html',
  styleUrl: './dashboard-chart-panel.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardChartPanelComponent {
  readonly labelKey = input.required<AppTranslationKey>();
  readonly titleKey = input.required<AppTranslationKey>();
  readonly descriptionKey = input.required<AppTranslationKey>();
  readonly emptyMessageKey = input.required<AppTranslationKey>();
  readonly chart = input<DashboardChartViewModel | null>(null);
  readonly scrollable = input(true);
}
