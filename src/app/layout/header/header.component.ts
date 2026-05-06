import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ThemeService } from '../../core/theme/theme.service';
import { NavigationComponent } from '../navigation/navigation.component';
import { NavigationItem } from '../navigation/navigation.types';
import { HeaderLanguageDropdownComponent } from './components/header-language-dropdown/header-language-dropdown.component';
import {
  HansToggleElement,
  HeaderThemeChangeEvent,
} from './header.types';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    TranslatePipe,
    NavigationComponent,
    HeaderLanguageDropdownComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly navigationItems = input.required<readonly NavigationItem[]>();
  private readonly themeToggle = viewChild<ElementRef<HansToggleElement>>('themeToggle');
  protected readonly theme = inject(ThemeService);
  protected readonly isMobileMenuOpen = signal(false);
  protected readonly brandLogoBluePath = 'assets/img/logo/vh_logo_blue.png';
  protected readonly brandLogoWhitePath = 'assets/img/logo/vh_logo_white.png';
  protected readonly themeIconName = 'FaAdjust';

  constructor() {
    effect(() => {
      const themeToggle = this.themeToggle()?.nativeElement;
      const checked = this.theme.mode() === 'dark';

      if (themeToggle) {
        themeToggle.checked = checked;
      }
    });
  }

  protected setThemeMode(event: Event): void {
    const { detail: checked } = event as HeaderThemeChangeEvent;

    this.theme.setMode(checked ? 'dark' : 'light');
  }

  protected toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((isOpen) => !isOpen);
  }

  protected closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
}
