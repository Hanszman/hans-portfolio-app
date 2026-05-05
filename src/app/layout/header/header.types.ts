import type { AppLanguageOption } from '../../core/translation/translation.types';
import type { PopupOptionItem } from '../../core/design-lib/popup-option-item.types';

export type HeaderLanguageDropdownOption = AppLanguageOption & {
  readonly action?: (option: HeaderLanguageDropdownOption) => void;
};

export type HeaderLanguageSelectEvent =
  CustomEvent<HeaderLanguageDropdownOption>;

export type HeaderThemeChangeEvent = CustomEvent<boolean>;

export interface HansToggleElement extends HTMLElement {
  checked?: boolean;
}

export interface HansDropdownElement extends HTMLElement {
  options?: readonly PopupOptionItem[];
}
