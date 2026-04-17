import type { AppLanguageOption } from '../../core/translation/translation.types';

export type HeaderLanguageDropdownOption = AppLanguageOption;

export type HeaderLanguageSelectEvent =
  CustomEvent<HeaderLanguageDropdownOption>;

export type HeaderThemeChangeEvent = CustomEvent<boolean>;

export interface HansToggleElement extends HTMLElement {
  checked?: boolean;
}

export interface HansDropdownElement extends HTMLElement {
  options?: readonly HeaderLanguageDropdownOption[];
}
