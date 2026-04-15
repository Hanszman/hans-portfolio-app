import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-portfolio-page-wrapper',
  templateUrl: './portfolio-page-wrapper.component.html',
  styleUrl: './portfolio-page-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioPageWrapperComponent {}
