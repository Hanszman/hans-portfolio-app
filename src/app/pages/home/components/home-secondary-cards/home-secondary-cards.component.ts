import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CardComponent } from '../../../../shared/card/card.component';
import { CardViewModel } from '../../../../shared/card/card.types';
import { ProjectModalItem } from '../../../../shared/project-modal/project-modal.types';
import { HomeSecondaryCardViewModel } from '../../home.types';

@Component({
  selector: 'app-home-secondary-cards',
  imports: [CardComponent],
  templateUrl: './home-secondary-cards.component.html',
  styleUrl: './home-secondary-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeSecondaryCardsComponent {
  readonly cards = input<readonly HomeSecondaryCardViewModel[]>([]);
  readonly openProject = output<ProjectModalItem>();

  protected toCard(card: HomeSecondaryCardViewModel): CardViewModel {
    return {
      alignment: 'start',
      variant: 'secondary',
      eyebrow: card.eyebrow,
      title: card.title,
      description: card.description,
      descriptionMaxLength: 150,
      interactive: true,
    };
  }
}
