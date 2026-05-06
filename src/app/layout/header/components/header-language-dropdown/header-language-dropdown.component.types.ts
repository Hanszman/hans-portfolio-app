import type { AppLanguageOption } from '../../../../core/translation/translation.types';

export interface HeaderLanguageDropdownItem {
  readonly id: string;
  readonly label: string;
  readonly value: AppLanguageOption['value'];
  readonly imageAlt?: string;
  readonly imageSrc?: string;
  readonly action?: (item: HeaderLanguageDropdownItem) => void;
  readonly children?: readonly HeaderLanguageDropdownItem[];
}

export const getHeaderLanguageFlagAsset = (
  locale: HeaderLanguageDropdownItem['value'],
): string => {
  switch (locale) {
    case 'pt-br':
      return 'vendor/flag-icons/4x3/br.svg';
    case 'es-es':
      return 'vendor/flag-icons/4x3/es.svg';
    default:
      return 'vendor/flag-icons/4x3/us.svg';
  }
};
