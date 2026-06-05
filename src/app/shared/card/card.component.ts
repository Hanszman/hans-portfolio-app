import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CardViewModel } from './card.types';

@Component({
  selector: 'app-card',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  readonly card = input.required<CardViewModel>();
}
