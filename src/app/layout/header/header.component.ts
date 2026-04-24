import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  ElementRef,
  effect,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ThemeService } from '../../core/theme/theme.service';
import { TranslationService } from '../../core/translation/translation.service';
import { NavigationComponent } from '../navigation/navigation.component';
import { NavigationItem } from '../navigation/navigation.types';
import { ContainerComponent } from '../container/container.component';
import {
  HansDropdownElement,
  HansToggleElement,
  HeaderLanguageDropdownOption,
  HeaderLanguageSelectEvent,
  HeaderThemeChangeEvent,
} from './header.types';

@Component({
  selector: 'app-header',
  imports: [RouterLink, TranslatePipe, NavigationComponent, ContainerComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly navigationItems = input.required<readonly NavigationItem[]>();
  private readonly themeToggle = viewChild<ElementRef<HansToggleElement>>('themeToggle');
  private readonly languageDropdown =
    viewChild<ElementRef<HansDropdownElement>>('languageDropdown');
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  protected readonly translation = inject(TranslationService);
  protected readonly theme = inject(ThemeService);
  protected readonly languageOptions = computed(() =>
    this.translation.languageOptions().map((option) => ({
      ...option,
      action: () => this.setLanguage(option),
    })),
  );

  constructor() {
    effect(() => {
      const themeToggle = this.themeToggle()?.nativeElement;
      const checked = this.theme.mode() === 'dark';

      if (themeToggle) {
        themeToggle.checked = checked;
      }
    });

    effect((onCleanup) => {
      const languageDropdown = this.languageDropdown()?.nativeElement;
      const languageOptions = this.languageOptions();

      /* istanbul ignore next -- viewChild is only absent during Angular's pre-render effect pass. */
      if (!languageDropdown) return;

      let isCleanedUp = false;
      const applyLanguageOptions = (): void => {
        if (!isCleanedUp) {
          languageDropdown.options = languageOptions;
        }
      };
      /* istanbul ignore else -- custom elements cannot be unregistered in the browser test runtime. */
      if (customElements.get('hans-dropdown')) {
        applyLanguageOptions();
      } else {
        void customElements.whenDefined('hans-dropdown').then(applyLanguageOptions);
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

  protected selectLanguage(event: Event): void {
    const { detail: option } = event as HeaderLanguageSelectEvent;

    this.setLanguage(option);
  }

  private setLanguage(option: HeaderLanguageDropdownOption): void {
    this.translation.setLocale(option.value);
    this.changeDetectorRef.markForCheck();
  }
}
