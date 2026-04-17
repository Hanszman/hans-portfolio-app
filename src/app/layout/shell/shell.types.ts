import {
  AppTranslationKey,
  AppTranslationParams,
} from '../../core/translation/translation.types';

export interface ShellApiStatusViewModel {
  readonly state: 'loading' | 'connected' | 'error';
  readonly titleKey: AppTranslationKey;
  readonly descriptionKey: AppTranslationKey;
  readonly descriptionParams?: AppTranslationParams;
  readonly baseUrl: string;
}
