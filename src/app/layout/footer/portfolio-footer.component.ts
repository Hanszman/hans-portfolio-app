import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioNavigationItem } from '../navigation/portfolio-navigation.types';

@Component({
  selector: 'app-portfolio-footer',
  imports: [RouterLink],
  templateUrl: './portfolio-footer.component.html',
  styleUrl: './portfolio-footer.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioFooterComponent {
  readonly navigationItems = input.required<readonly PortfolioNavigationItem[]>();
}
