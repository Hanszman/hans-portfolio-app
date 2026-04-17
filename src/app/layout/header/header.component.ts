import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
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
import { SurfaceComponent } from '../surface/surface.component';
import {
  HansDropdownElement,
  HansToggleElement,
  HeaderLanguageSelectEvent,
  HeaderThemeChangeEvent,
} from './header.types';

@Component({
  selector: 'app-header',
  imports: [RouterLink, TranslatePipe, NavigationComponent, SurfaceComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly navigationItems = input.required<readonly NavigationItem[]>();

  private readonly themeToggle =
    viewChild<ElementRef<HansToggleElement>>('themeToggle');
  private readonly languageDropdown =
    viewChild<ElementRef<HansDropdownElement>>('languageDropdown');
  protected readonly i18n = inject(TranslationService);
  protected readonly theme = inject(ThemeService);
  protected readonly languageOptions = this.i18n.languageOptions;

  constructor() {
    effect(() => {
      const themeToggle = this.themeToggle()?.nativeElement;
      const checked = this.theme.mode() === 'dark';

      if (themeToggle) {
        themeToggle.checked = checked;
      }
    });

    effect(() => {
      const languageDropdown = this.languageDropdown()?.nativeElement;
      const languageOptions = this.languageOptions();

      if (languageDropdown) {
        languageDropdown.options = languageOptions;
      }
    });
  }

  protected setThemeMode(event: Event): void {
    const { detail: checked } = event as HeaderThemeChangeEvent;

    this.theme.setMode(checked ? 'dark' : 'light');
  }

  protected selectLanguage(event: Event): void {
    const { detail: option } = event as HeaderLanguageSelectEvent;

    this.i18n.setLocale(option.value);
  }
}
