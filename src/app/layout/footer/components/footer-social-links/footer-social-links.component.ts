import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FOOTER_SOCIAL_LINKS } from './footer-social-links.types';

@Component({
  selector: 'app-footer-social-links',
  imports: [TranslatePipe],
  templateUrl: './footer-social-links.component.html',
  styleUrl: './footer-social-links.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterSocialLinksComponent {
  protected readonly links = FOOTER_SOCIAL_LINKS;
}
