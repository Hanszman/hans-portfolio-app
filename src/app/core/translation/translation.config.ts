import { AppLocale, AppTranslationCatalog } from './translation.types';
import { EN_TRANSLATIONS } from './languages/en-us.translation';
import { ES_ES_TRANSLATIONS } from './languages/es-es.translation';
import { PT_BR_TRANSLATIONS } from './languages/pt-br.translation';

export const DEFAULT_APP_LOCALE: AppLocale = 'en-us';

export const APP_LOCALE_STORAGE_KEY = 'hans-portfolio-locale';

export const APP_TRANSLATIONS = {
  'en-us': EN_TRANSLATIONS,
  'pt-br': PT_BR_TRANSLATIONS,
  'es-es': ES_ES_TRANSLATIONS,
} as const satisfies AppTranslationCatalog;

export const APP_LOCALES = Object.keys(APP_TRANSLATIONS) as AppLocale[];
