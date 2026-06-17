import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TagButtonComponent } from '../../../../shared/tag/tag-button/tag-button.component';
import { TechnologyModalItem } from '../../../../shared/technology-modal/technology-modal.types';
import { HomeStackChipViewModel } from '../../home.types';

@Component({
  selector: 'app-home-stack-chips',
  imports: [TagButtonComponent, TranslatePipe],
  templateUrl: './home-stack-chips.component.html',
  styleUrl: './home-stack-chips.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeStackChipsComponent {
  readonly labelKey = input.required<string>();
  readonly titleKey = input.required<string>();
  readonly descriptionKey = input.required<string>();
  readonly chips = input<readonly HomeStackChipViewModel[]>([]);
  readonly openTechnology = output<TechnologyModalItem>();

  protected requestTechnologyDetails(technology: TechnologyModalItem): void {
    this.openTechnology.emit(technology);
  }
}
