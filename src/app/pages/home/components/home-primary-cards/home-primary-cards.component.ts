import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CardComponent } from '../../../../shared/card/card.component';
import { CardViewModel } from '../../../../shared/card/card.types';
import { HomePrimaryCardViewModel } from '../../home.types';

@Component({
  selector: 'app-home-primary-cards',
  imports: [TranslatePipe, CardComponent],
  templateUrl: './home-primary-cards.component.html',
  styleUrl: './home-primary-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePrimaryCardsComponent {
  readonly ariaLabelKey = input.required<string>();
  readonly cards = input<readonly HomePrimaryCardViewModel[]>([]);

  protected toCard(card: HomePrimaryCardViewModel): CardViewModel {
    return {
      alignment: 'center',
      variant: 'primary',
      value: card.value,
      labelKey: card.labelKey,
      descriptionKey: card.descriptionKey,
      descriptionMaxLength: 96,
      iconName: card.iconName,
    };
  }
}
