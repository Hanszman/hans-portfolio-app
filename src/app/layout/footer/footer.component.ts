import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  computed,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { FooterSocialLinksComponent } from './components/footer-social-links/footer-social-links.component';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, TranslatePipe, FooterSocialLinksComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  protected readonly currentYear = computed(() => new Date().getFullYear());
}
