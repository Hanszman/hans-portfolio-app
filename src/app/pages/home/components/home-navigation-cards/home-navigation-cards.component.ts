import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { HomeNavigationCardViewModel } from '../../home.types';

@Component({
  selector: 'app-home-navigation-cards',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './home-navigation-cards.component.html',
  styleUrl: './home-navigation-cards.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeNavigationCardsComponent {
  readonly cards = input<readonly HomeNavigationCardViewModel[]>([]);
}
