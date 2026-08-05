import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { HomeHighlightedProjectViewModel } from '../../home.types';
import { CardComponent } from '../../../../shared/card/card.component';
import { CardViewModel } from '../../../../shared/card/card.types';
import { ProjectModalItem } from '../../../../shared/project-modal/project-modal.types';

@Component({
  selector: 'app-home-navigation-cards',
  imports: [CardComponent],
  templateUrl: './home-navigation-cards.component.html',
  styleUrl: './home-navigation-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeNavigationCardsComponent {
  readonly cards = input<readonly HomeHighlightedProjectViewModel[]>([]);
  readonly openProject = output<ProjectModalItem>();

  protected toCard(card: HomeHighlightedProjectViewModel): CardViewModel {
    return {
      alignment: 'start',
      eyebrow: card.eyebrow,
      title: card.title,
      description: card.description,
      interactive: true,
    };
  }
}
