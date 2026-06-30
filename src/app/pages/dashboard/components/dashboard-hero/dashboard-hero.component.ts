import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AppTranslationKey } from '../../../../core/translation/translation.types';

@Component({
  selector: 'app-dashboard-hero',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './dashboard-hero.component.html',
  styleUrl: './dashboard-hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardHeroComponent {
  readonly sectionLabelKey = input.required<AppTranslationKey>();
  readonly titleKey = input.required<AppTranslationKey>();
  readonly descriptionKey = input.required<AppTranslationKey>();
}
