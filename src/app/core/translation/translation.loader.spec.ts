import { firstValueFrom } from 'rxjs';
import { EN_TRANSLATIONS } from './translations/en-us.translation';
import { PT_BR_TRANSLATIONS } from './translations/pt-br.translation';
import {
  AppTranslationLoader,
  readTranslationLanguage,
  toNestedTranslation,
} from './translation.loader';

describe('AppTranslationLoader', () => {
  it('should read a supported translation language', () => {
    expect(readTranslationLanguage('pt-BR')).toBe(PT_BR_TRANSLATIONS);
  });

  it('should fall back to the default language for unsupported locales', () => {
    expect(readTranslationLanguage('es')).toBe(EN_TRANSLATIONS);
  });

  it('should convert dot-path translation keys into nested objects', () => {
    const nestedTranslations = toNestedTranslation(EN_TRANSLATIONS) as {
      header: {
        controls: {
          language: string;
        };
      };
      pages: {
        home: {
          title: string;
        };
      };
    };

    expect(nestedTranslations.header.controls.language).toBe('Language');
    expect(nestedTranslations.pages.home.title).toBe('Home foundation');
  });

  it('should provide nested translations through the ngx loader contract', async () => {
    const loader = new AppTranslationLoader();
    const translations = (await firstValueFrom(
      loader.getTranslation('en'),
    )) as {
      shell: {
        api: {
          connected: {
            title: string;
          };
        };
      };
    };

    expect(translations.shell.api.connected.title).toBe('API connected');
  });
});
