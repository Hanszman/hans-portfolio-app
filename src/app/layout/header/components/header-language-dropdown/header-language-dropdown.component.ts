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
  HeaderLanguageSelectEvent,
} from '../../header.types';
import {
  getHeaderLanguageFlagAsset,
  HeaderLanguageDropdownItem,
} from './header-language-dropdown.component.types';

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
  protected readonly triggerLabel = '\u200B';
  protected readonly languageOptions = computed<readonly HeaderLanguageDropdownItem[]>(() =>
    this.translation.languageOptions().map((option) => ({
      id: option.id,
      label: option.label,
      value: option.value,
      imageAlt: option.label,
      imageSrc: getHeaderLanguageFlagAsset(option.value),
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

  private setLanguage(locale: HeaderLanguageDropdownItem['value']): void {
    this.translation.setLocale(locale);
    this.changeDetectorRef.markForCheck();
  }
}
