import { AppTranslationKey } from '../../core/translation/translation.types';

export type PortfolioCardVariant = 'metric' | 'navigation';

export interface PortfolioCardViewModel {
  variant: PortfolioCardVariant;
  descriptionKey: AppTranslationKey;
  iconName?: string;
  value?: string;
  labelKey?: AppTranslationKey;
  eyebrowKey?: AppTranslationKey;
  titleKey?: AppTranslationKey;
  route?: string;
}
