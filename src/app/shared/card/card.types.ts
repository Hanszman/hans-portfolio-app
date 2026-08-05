import { AppTranslationKey } from '../../core/translation/translation.types';

export type CardAlignment = 'center' | 'start';
export type CardVariant = 'primary' | 'secondary';

export interface CardViewModel {
  alignment?: CardAlignment;
  variant?: CardVariant;
  description?: string;
  descriptionKey?: AppTranslationKey;
  descriptionMaxLength?: number;
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
