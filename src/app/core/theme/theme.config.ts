import { AppThemeMap, AppThemeMode } from './theme.types';
import { DARK_THEME } from './themes/dark.theme';
import { LIGHT_THEME } from './themes/light.theme';

export const DEFAULT_APP_THEME_MODE: AppThemeMode = 'light';

export const APP_THEME_STORAGE_KEY = 'hans-app-theme';

export const APP_THEMES = {
  light: LIGHT_THEME,
  dark: DARK_THEME,
} as const satisfies AppThemeMap;

export const APP_THEME = APP_THEMES[DEFAULT_APP_THEME_MODE];
