import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioNavigationComponent } from '../navigation/portfolio-navigation.component';
import { PortfolioNavigationItem } from '../navigation/portfolio-navigation.types';

@Component({
  selector: 'app-portfolio-header',
  imports: [RouterLink, PortfolioNavigationComponent],
  templateUrl: './portfolio-header.component.html',
  styleUrl: './portfolio-header.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioHeaderComponent {
  readonly navigationItems = input.required<readonly PortfolioNavigationItem[]>();
}
