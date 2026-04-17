import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PortfolioSurfaceComponent } from '../surface/portfolio-surface.component';

@Component({
  selector: 'app-portfolio-page-intro',
  imports: [PortfolioSurfaceComponent],
  templateUrl: './portfolio-page-intro.component.html',
  styleUrl: './portfolio-page-intro.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioPageIntroComponent {
  readonly sectionLabel = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
}
