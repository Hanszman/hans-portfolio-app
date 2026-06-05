import { AppTranslationKey } from '../../core/translation/translation.types';

export type CardAlignment = 'center' | 'start';

export interface CardViewModel {
  alignment?: CardAlignment;
  descriptionKey?: AppTranslationKey;
  iconName?: string;
  value?: string;
  labelKey?: AppTranslationKey;
  eyebrowKey?: AppTranslationKey;
  titleKey?: AppTranslationKey;
  route?: string;
}
