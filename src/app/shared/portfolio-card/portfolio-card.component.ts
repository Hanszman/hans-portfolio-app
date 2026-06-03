import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { PortfolioCardViewModel } from './portfolio-card.types';

@Component({
  selector: 'app-portfolio-card',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './portfolio-card.component.html',
  styleUrl: './portfolio-card.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioCardComponent {
  readonly card = input.required<PortfolioCardViewModel>();
}
