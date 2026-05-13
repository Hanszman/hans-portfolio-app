import {
  AppLocale,
  AppTranslationCatalog,
  AppTranslationLanguage,
} from './translation.types';
import { EN_TRANSLATIONS } from './languages/en-us.translation';
import { ES_ES_TRANSLATIONS } from './languages/es-es.translation';
import { PT_BR_TRANSLATIONS } from './languages/pt-br.translation';

export const DEFAULT_APP_LOCALE: AppLocale = 'en-us';

export const APP_LOCALE_STORAGE_KEY = 'hans-portfolio-locale';

const NAVIGATION_TRANSLATIONS = {
  'en-us': {
    'header.navigation.home': 'Home',
    'header.navigation.experiences': 'Experiences',
    'header.navigation.skills': 'Skills',
    'header.navigation.projects': 'Projects',
    'header.navigation.dashboard': 'Dashboard',
  },
  'pt-br': {
    'header.navigation.home': 'Home',
    'header.navigation.experiences': 'Experiências',
    'header.navigation.skills': 'Skills',
    'header.navigation.projects': 'Projetos',
    'header.navigation.dashboard': 'Dashboard',
  },
  'es-es': {
    'header.navigation.home': 'Home',
    'header.navigation.experiences': 'Experiencias',
    'header.navigation.skills': 'Skills',
    'header.navigation.projects': 'Proyectos',
    'header.navigation.dashboard': 'Dashboard',
  },
} as const satisfies Record<
  AppLocale,
  Pick<
    AppTranslationLanguage,
    | 'header.navigation.home'
    | 'header.navigation.experiences'
    | 'header.navigation.skills'
    | 'header.navigation.projects'
    | 'header.navigation.dashboard'
  >
>;

export const APP_TRANSLATIONS = {
  'en-us': {
    ...EN_TRANSLATIONS,
    ...NAVIGATION_TRANSLATIONS['en-us'],
  },
  'pt-br': {
    ...PT_BR_TRANSLATIONS,
    ...NAVIGATION_TRANSLATIONS['pt-br'],
  },
  'es-es': {
    ...ES_ES_TRANSLATIONS,
    ...NAVIGATION_TRANSLATIONS['es-es'],
  },
} as const satisfies AppTranslationCatalog;

export const APP_LOCALES = Object.keys(APP_TRANSLATIONS) as AppLocale[];
