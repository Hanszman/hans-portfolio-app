import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { FooterSocialLinksComponent } from './components/footer-social-links/footer-social-links.component';

@Component({
  selector: 'app-footer',
  imports: [TranslatePipe, FooterSocialLinksComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  private readonly router = inject(Router);
  protected readonly currentYear = computed(() => new Date().getFullYear());

  protected navigateHome(): void {
    void this.router.navigateByUrl('/home');
  }
}
