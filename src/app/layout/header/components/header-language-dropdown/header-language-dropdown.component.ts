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
import { PopupOptionItem } from '../../../../core/design-lib/popup-option-item.types';
import { TranslationService } from '../../../../core/translation/translation.service';
import {
  HansDropdownElement,
  HeaderLanguageDropdownOption,
  HeaderLanguageSelectEvent,
} from '../../header.types';

const getLanguageFlagAsset = (
  locale: HeaderLanguageDropdownOption['value'],
): string => {
  switch (locale) {
    case 'pt-BR':
      return 'assets/flags/4x3/br.svg';
    case 'es-es':
      return 'assets/flags/4x3/es.svg';
    default:
      return 'assets/flags/4x3/us.svg';
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
  protected readonly languageOptions = computed<readonly PopupOptionItem[]>(() =>
    this.translation.languageOptions().map((option) => ({
      id: option.id,
      label: option.label,
      value: option.value,
      imageAlt: option.label,
      imageSrc: getLanguageFlagAsset(option.value),
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
