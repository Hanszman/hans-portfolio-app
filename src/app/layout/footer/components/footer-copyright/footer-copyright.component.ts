import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-footer-copyright',
  imports: [TranslatePipe],
  templateUrl: './footer-copyright.component.html',
  styleUrl: './footer-copyright.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterCopyrightComponent {
  private readonly router = inject(Router);
  protected readonly currentYear = computed(() => new Date().getFullYear());

  protected navigateHome(): void {
    void this.router.navigateByUrl('/home');
  }
}
