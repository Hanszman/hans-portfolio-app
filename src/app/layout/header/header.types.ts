import type { AppLanguageOption } from '../../core/translation/translation.types';

export type HeaderLanguageDropdownOption = AppLanguageOption & {
  readonly action?: (option: HeaderLanguageDropdownOption) => void;
};

export type HeaderLanguageSelectEvent =
  CustomEvent<HeaderLanguageDropdownOption>;

export type HeaderThemeChangeEvent = CustomEvent<boolean>;

export interface HansToggleElement extends HTMLElement {
  checked?: boolean;
}
