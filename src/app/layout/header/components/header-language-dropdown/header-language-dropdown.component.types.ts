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
    case 'pt-BR':
      return 'assets/img/flags/svgs/br.svg';
    case 'es-es':
      return 'assets/img/flags/svgs/es.svg';
    default:
      return 'assets/img/flags/svgs/us.svg';
  }
};
