import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PortfolioNavigationItem } from './portfolio-navigation.types';

@Component({
  selector: 'app-portfolio-navigation',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './portfolio-navigation.component.html',
  styleUrl: './portfolio-navigation.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioNavigationComponent {
  readonly items = input.required<readonly PortfolioNavigationItem[]>();
}
