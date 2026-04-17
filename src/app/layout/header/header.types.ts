import { AppLanguageOption } from '../../core/translation/translation.types';

export interface HeaderLanguageDropdownOption extends AppLanguageOption {
  action: (option: HeaderLanguageDropdownOption) => void;
}

export interface HansToggleElement extends HTMLElement {
  checked?: boolean;
}

export interface HansDropdownElement extends HTMLElement {
  options?: readonly HeaderLanguageDropdownOption[];
}
