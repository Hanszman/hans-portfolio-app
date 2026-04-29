import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { PortfolioStateMode } from './portfolio-state.types';

@Component({
  selector: 'app-portfolio-state',
  standalone: true,
  templateUrl: './portfolio-state.component.html',
  styleUrl: './portfolio-state.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioStateComponent {
  readonly mode = input.required<PortfolioStateMode>();
  readonly message = input.required<string>();
}

