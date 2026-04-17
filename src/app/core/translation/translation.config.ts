import { AppLocale, AppTranslationCatalog } from './translation.types';
import { EN_TRANSLATIONS } from './translations/en-us.translation';
import { PT_BR_TRANSLATIONS } from './translations/pt-br.translation';

export const DEFAULT_APP_LOCALE: AppLocale = 'en-us';

export const APP_LOCALE_STORAGE_KEY = 'hans-portfolio-locale';

export const APP_TRANSLATIONS = {
  'en-us': EN_TRANSLATIONS,
  'pt-BR': PT_BR_TRANSLATIONS,
} as const satisfies AppTranslationCatalog;

export const APP_LOCALES = Object.keys(APP_TRANSLATIONS) as AppLocale[];
