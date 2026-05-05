import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  viewChild,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslationService } from '../../../../core/translation/translation.service';
import {
  HansDropdownElement,
  HeaderLanguageDropdownOption,
  HeaderLanguageSelectEvent,
} from '../../header.types';

const getLanguageEmoji = (
  locale: HeaderLanguageDropdownOption['value'],
): string => {
  switch (locale) {
    case 'pt-BR':
      return '🇧🇷';
    case 'es-es':
      return '🇪🇸';
    default:
      return '🇺🇸';
  }
};

@Component({
  selector: 'app-header-language-dropdown',
  imports: [TranslatePipe],
  templateUrl: './header-language-dropdown.component.html',
  styleUrl: './header-language-dropdown.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderLanguageDropdownComponent {
  private readonly languageDropdown =
    viewChild<ElementRef<HansDropdownElement>>('languageDropdown');
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  protected readonly translation = inject(TranslationService);
  protected readonly triggerLabel = computed(
    () => `${getLanguageEmoji(this.translation.locale())} ${this.translation.instant('header.controls.language')}`,
  );
  protected readonly languageOptions = computed<
    readonly HeaderLanguageDropdownOption[]
  >(() =>
    this.translation.languageOptions().map((option) => ({
      ...option,
      label: `${getLanguageEmoji(option.value)} ${option.label}`,
      action: () => this.setLanguage(option.value),
    })),
  );

  constructor() {
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

  protected selectLanguage(event: Event): void {
    const { detail: option } = event as HeaderLanguageSelectEvent;

    this.setLanguage(option.value);
  }

  private setLanguage(locale: HeaderLanguageDropdownOption['value']): void {
    this.translation.setLocale(locale);
    this.changeDetectorRef.markForCheck();
  }
}
