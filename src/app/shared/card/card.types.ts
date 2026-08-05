import { AppTranslationKey } from '../../core/translation/translation.types';

export type CardAlignment = 'center' | 'start';

export interface CardViewModel {
  alignment?: CardAlignment;
  description?: string;
  descriptionKey?: AppTranslationKey;
  eyebrow?: string;
  iconName?: string;
  interactive?: boolean;
  value?: string;
  labelKey?: AppTranslationKey;
  eyebrowKey?: AppTranslationKey;
  title?: string;
  titleKey?: AppTranslationKey;
  route?: string;
}
