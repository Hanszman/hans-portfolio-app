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
import { AppLanguageOption } from '../../core/translation/translation.types';
import { NavigationComponent } from '../navigation/navigation.component';
import { NavigationItem } from '../navigation/navigation.types';
import { SurfaceComponent } from '../surface/surface.component';

interface HansToggleElement extends HTMLElement {
  onChange?: (checked: boolean) => void;
}

interface HansDropdownElement extends HTMLElement {
  onSelect?: (option: AppLanguageOption) => void;
}

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

      if (themeToggle) {
        themeToggle.onChange = this.handleThemeChange;
      }
    });

    effect(() => {
      const languageDropdown = this.languageDropdown()?.nativeElement;

      if (languageDropdown) {
        languageDropdown.onSelect = this.selectLanguage;
      }
    });
  }

  protected readonly handleThemeChange = (): void => {
    this.theme.toggleMode();
  };

  protected readonly selectLanguage = (option: AppLanguageOption): void => {
    this.i18n.setLocale(option.value);
  };
}
