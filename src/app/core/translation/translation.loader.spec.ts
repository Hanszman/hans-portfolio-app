import { firstValueFrom } from 'rxjs';
import { EN_TRANSLATIONS } from './languages/en-us.translation';
import { PT_BR_TRANSLATIONS } from './languages/pt-br.translation';
import {
  AppTranslationLoader,
  readTranslationLanguage,
  toNestedTranslation,
} from './translation.loader';

describe('AppTranslationLoader', () => {
  it('should read a supported translation language', () => {
    expect(readTranslationLanguage('pt-br')).toEqual(PT_BR_TRANSLATIONS);
  });

  it('should fall back to the default language for unsupported locales', () => {
    expect(readTranslationLanguage('es')).toEqual(EN_TRANSLATIONS);
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
          hero: {
            greeting: string;
          };
        };
      };
    };

    expect(nestedTranslations.header.controls.language).toBe('Language');
    expect(nestedTranslations.pages.home.hero.greeting).toBe("Hi, I'm");
  });

  it('should provide nested translations through the ngx loader contract', async () => {
    const loader = new AppTranslationLoader();
    const translations = (await firstValueFrom(
      loader.getTranslation('en-us'),
    )) as {
      footer: {
        copyright: {
          year: string;
        };
      };
    };

    expect(translations.footer.copyright.year).toBe('© {{ year }}');
  });
});
