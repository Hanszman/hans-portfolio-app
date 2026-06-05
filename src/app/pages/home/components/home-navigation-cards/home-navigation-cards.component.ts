import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { HomeNavigationCardViewModel } from '../../home.types';
import { CardComponent } from '../../../../shared/card/card.component';
import { CardViewModel } from '../../../../shared/card/card.types';

@Component({
  selector: 'app-home-navigation-cards',
  imports: [CardComponent],
  templateUrl: './home-navigation-cards.component.html',
  styleUrl: './home-navigation-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeNavigationCardsComponent {
  readonly cards = input<readonly HomeNavigationCardViewModel[]>([]);

  protected toCard(card: HomeNavigationCardViewModel): CardViewModel {
    return {
      alignment: 'start',
      eyebrowKey: card.eyebrowKey,
      titleKey: card.titleKey,
      descriptionKey: card.descriptionKey,
      route: card.route,
    };
  }
}
