import type { AppLanguageOption } from '../../core/translation/translation.types';
import type { HeaderLanguageDropdownItem } from './components/header-language-dropdown/header-language-dropdown.component.types';

export type HeaderLanguageDropdownOption = AppLanguageOption & {
  readonly action?: (option: HeaderLanguageDropdownOption) => void;
};

export type HeaderLanguageSelectEvent = CustomEvent<HeaderLanguageDropdownItem>;

export type HeaderThemeChangeEvent = CustomEvent<boolean>;

export interface HansToggleElement extends HTMLElement {
  checked?: boolean;
}

export interface HansDropdownElement extends HTMLElement {
  options?: readonly HeaderLanguageDropdownItem[];
}
