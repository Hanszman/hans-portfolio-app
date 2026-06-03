import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AppTranslationKey } from '../../core/translation/translation.types';
import { PortfolioSocialLinksComponent } from '../../shared/social-links/social-links.component';
import { PORTFOLIO_SOCIAL_LINKS } from '../../shared/social-links/social-links.types';

@Component({
  selector: 'app-footer',
  imports: [TranslatePipe, PortfolioSocialLinksComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  private readonly router = inject(Router);
  protected readonly currentYear = computed(() => new Date().getFullYear());
  protected readonly socialLinks = PORTFOLIO_SOCIAL_LINKS;
  protected readonly locationKey: AppTranslationKey = 'footer.location';

  protected navigateHome(): void {
    void this.router.navigateByUrl('/home');
  }
}
