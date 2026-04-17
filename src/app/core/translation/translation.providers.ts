import {
  provideTranslateLoader,
  provideTranslateService,
} from '@ngx-translate/core';
import { DEFAULT_APP_LOCALE } from './translation.config';
import { AppTranslationLoader } from './translation.loader';

export const provideAppTranslations = () =>
  provideTranslateService({
    loader: provideTranslateLoader(AppTranslationLoader),
    fallbackLang: DEFAULT_APP_LOCALE,
    lang: DEFAULT_APP_LOCALE,
  });
