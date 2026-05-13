import type { AppLanguageOption } from '../../core/translation/translation.types';
import type { HeaderLanguageDropdownItem } from './components/header-language-dropdown/header-language-dropdown.component.types';
import type { NavigationItem } from '../navigation/navigation.types';

export type HeaderLanguageDropdownOption = AppLanguageOption & {
  readonly action?: (option: HeaderLanguageDropdownOption) => void;
};

export type HeaderLanguageSelectEvent = CustomEvent<HeaderLanguageDropdownItem>;
export type HeaderNavigationDropdownItem = NavigationItem & {
  readonly value: NavigationItem['path'];
  readonly action?: (item: HeaderNavigationDropdownItem) => void;
};
export type HeaderNavigationSelectEvent = CustomEvent<HeaderNavigationDropdownItem>;

export type HeaderThemeChangeEvent = CustomEvent<boolean>;

export interface HansToggleElement extends HTMLElement {
  checked?: boolean;
}

export interface HansDropdownElement extends HTMLElement {
  options?: readonly unknown[];
  open?: boolean;
}
