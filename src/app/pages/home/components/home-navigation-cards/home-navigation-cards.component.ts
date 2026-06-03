import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { HomeNavigationCardViewModel } from '../../home.types';
import { PortfolioCardComponent } from '../../../../shared/portfolio-card/portfolio-card.component';
import { PortfolioCardViewModel } from '../../../../shared/portfolio-card/portfolio-card.types';

@Component({
  selector: 'app-home-navigation-cards',
  imports: [PortfolioCardComponent],
  templateUrl: './home-navigation-cards.component.html',
  styleUrl: './home-navigation-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeNavigationCardsComponent {
  readonly cards = input<readonly HomeNavigationCardViewModel[]>([]);

  protected toCard(card: HomeNavigationCardViewModel): PortfolioCardViewModel {
    return {
      variant: 'navigation',
      eyebrowKey: card.eyebrowKey,
      titleKey: card.titleKey,
      descriptionKey: card.descriptionKey,
      route: card.route,
    };
  }
}
