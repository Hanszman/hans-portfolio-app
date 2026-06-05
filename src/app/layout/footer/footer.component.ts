import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppTranslationKey } from '../../core/translation/translation.types';
import { LocationComponent } from '../../shared/location/location.component';
import { SocialLinksComponent } from '../../shared/social-links/social-links.component';
import { PORTFOLIO_SOCIAL_LINKS } from '../../shared/social-links/social-links.types';
import { FooterCopyrightComponent } from './components/footer-copyright/footer-copyright.component';

@Component({
  selector: 'app-footer',
  imports: [FooterCopyrightComponent, LocationComponent, SocialLinksComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  protected readonly socialLinks = PORTFOLIO_SOCIAL_LINKS;
  protected readonly locationKey: AppTranslationKey = 'footer.location';
}
