import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ThemeService } from '../../core/theme/theme.service';
import { NavigationComponent } from '../navigation/navigation.component';
import { NavigationItem } from '../navigation/navigation.types';
import { HeaderLanguageDropdownComponent } from './components/header-language-dropdown/header-language-dropdown.component';
import {
  HansDropdownElement,
  HeaderNavigationDropdownItem,
  HeaderNavigationSelectEvent,
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
  private readonly mobileMenuDropdown =
    viewChild<ElementRef<HansDropdownElement>>('mobileMenuDropdown');
  private readonly router = inject(Router);
  protected readonly theme = inject(ThemeService);
  protected readonly isMobileMenuOpen = signal(false);
  protected readonly mobileMenuOptions = computed<readonly HeaderNavigationDropdownItem[]>(
    () =>
      this.navigationItems().map((item) => ({
        ...item,
        value: item.path,
      })),
  );
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

    effect((onCleanup) => {
      const mobileMenuDropdown = this.mobileMenuDropdown()?.nativeElement;
      const mobileMenuOptions = this.mobileMenuOptions();

      /* istanbul ignore next -- viewChild is only absent during Angular's pre-render effect pass. */
      if (!mobileMenuDropdown) return;

      let isCleanedUp = false;
      const applyMobileMenuOptions = (): void => {
        if (!isCleanedUp) {
          mobileMenuDropdown.options = mobileMenuOptions;
        }
      };

      /* istanbul ignore else -- custom elements cannot be unregistered in the browser test runtime. */
      if (customElements.get('hans-dropdown')) {
        applyMobileMenuOptions();
      } else {
        void customElements.whenDefined('hans-dropdown').then(applyMobileMenuOptions);
      }

      onCleanup(() => {
        isCleanedUp = true;
      });
    });
  }

  protected setThemeMode(event: Event): void {
    const { detail: checked } = event as HeaderThemeChangeEvent;

    this.theme.setMode(checked ? 'dark' : 'light');
  }

  protected closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  protected setMobileMenuOpen(event: Event): void {
    const { detail: isOpen } = event as CustomEvent<boolean>;

    this.isMobileMenuOpen.set(Boolean(isOpen));
  }

  protected selectMobileNavigation(event: Event): void {
    const { detail: option } = event as HeaderNavigationSelectEvent;

    this.closeMobileMenu();
    void this.router.navigateByUrl(option.value);
  }
}
