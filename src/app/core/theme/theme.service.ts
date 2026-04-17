import { DOCUMENT } from '@angular/common';
import { computed, inject, Injectable, signal } from '@angular/core';
import { DesignLibService } from '../design-lib/design-lib.service';
import {
  APP_THEMES,
  APP_THEME_STORAGE_KEY,
  DEFAULT_APP_THEME_MODE,
} from './theme.config';
import { AppThemeMode } from './theme.types';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly designLibService = inject(DesignLibService);
  private readonly modeSignal = signal<AppThemeMode>(
    this.readStoredThemeMode(),
  );

  readonly mode = this.modeSignal.asReadonly();
  readonly theme = computed(() => APP_THEMES[this.mode()]);
  readonly nextMode = computed<AppThemeMode>(() =>
    this.mode() === 'light' ? 'dark' : 'light',
  );

  constructor() {
    this.applyTheme(this.mode());
  }

  setMode(mode: AppThemeMode): void {
    this.modeSignal.set(mode);
    this.applyTheme(mode);
  }

  toggleMode(): void {
    this.setMode(this.nextMode());
  }

  private applyTheme(mode: AppThemeMode): void {
    const theme = APP_THEMES[mode];

    this.document.documentElement.setAttribute('data-app-theme', mode);
    this.document.body.setAttribute('data-app-theme', mode);
    localStorage.setItem(APP_THEME_STORAGE_KEY, mode);
    this.designLibService.applyTheme(theme);
  }

  private readStoredThemeMode(): AppThemeMode {
    const storedMode = localStorage.getItem(APP_THEME_STORAGE_KEY);

    return this.isAppThemeMode(storedMode)
      ? storedMode
      : DEFAULT_APP_THEME_MODE;
  }

  private isAppThemeMode(
    mode: string | null,
  ): mode is AppThemeMode {
    return mode === 'light' || mode === 'dark';
  }
}
