import { HansThemeCombination } from '../design-lib/design-lib.types';

export type AppThemeMode = 'light' | 'dark';

export type AppThemeMap = Record<AppThemeMode, HansThemeCombination>;
