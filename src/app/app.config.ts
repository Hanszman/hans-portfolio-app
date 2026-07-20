import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { adminSessionAuthInterceptor } from './core/admin-session/admin-session-auth.interceptor';
import { provideAppTranslations } from './core/translation/translation.providers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([adminSessionAuthInterceptor])),
    provideAppTranslations(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
  ],
};
