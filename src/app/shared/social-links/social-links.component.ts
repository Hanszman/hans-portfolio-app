import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AppTranslationKey } from '../../core/translation/translation.types';
import { PortfolioSocialLink } from './social-links.types';

@Component({
  selector: 'app-portfolio-social-links',
  imports: [TranslatePipe],
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioSocialLinksComponent {
  readonly links = input<readonly PortfolioSocialLink[]>([]);
  readonly ariaLabelKey = input.required<AppTranslationKey>();
  readonly locationKey = input.required<AppTranslationKey>();

  protected openLink(href: string): void {
    window.open(href, '_blank', 'noopener,noreferrer');
  }
}
