import { AppTranslationKey } from '../../core/translation/translation.types';

export interface ButtonFilterOption<T extends string = string> {
  labelKey: AppTranslationKey;
  value: T;
}
