import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DashboardChartPanelComponent } from '../dashboard-chart-panel/dashboard-chart-panel.component';
import { DashboardChartViewModel } from '../../dashboard.types';

@Component({
  selector: 'app-dashboard-analytics-grid',
  standalone: true,
  imports: [DashboardChartPanelComponent],
  templateUrl: './dashboard-analytics-grid.component.html',
  styleUrl: './dashboard-analytics-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardAnalyticsGridComponent {
  readonly stackChart = input<DashboardChartViewModel | null>(null);
  readonly technologyLevelChart = input<DashboardChartViewModel | null>(null);
  readonly projectEnvironmentChart = input<DashboardChartViewModel | null>(null);
  readonly technologyUsageChart = input<DashboardChartViewModel | null>(null);
}
