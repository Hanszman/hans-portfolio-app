import { InjectionToken } from '@angular/core';
import { appEnvironment } from './app-environment';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL', {
  factory: () => appEnvironment.apiBaseUrl,
});
