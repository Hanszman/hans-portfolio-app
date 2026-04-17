import { DOCUMENT } from '@angular/common';
import { computed, inject, Injectable, signal } from '@angular/core';
import { DesignLibService } from '../design-lib/design-lib.service';
import {
  DEFAULT_PORTFOLIO_THEME_MODE,
  PORTFOLIO_THEMES,
  PORTFOLIO_THEME_STORAGE_KEY,
} from './portfolio-theme';
import { PortfolioThemeMode } from './theme.types';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly designLibService = inject(DesignLibService);
  private readonly modeSignal = signal<PortfolioThemeMode>(
    this.readStoredThemeMode(),
  );

  readonly mode = this.modeSignal.asReadonly();
  readonly theme = computed(() => PORTFOLIO_THEMES[this.mode()]);
  readonly nextMode = computed<PortfolioThemeMode>(() =>
    this.mode() === 'light' ? 'dark' : 'light',
  );

  constructor() {
    this.applyTheme(this.mode());
  }

  setMode(mode: PortfolioThemeMode): void {
    this.modeSignal.set(mode);
    this.applyTheme(mode);
  }

  toggleMode(): void {
    this.setMode(this.nextMode());
  }

  private applyTheme(mode: PortfolioThemeMode): void {
    const theme = PORTFOLIO_THEMES[mode];

    this.document.documentElement.setAttribute('data-portfolio-theme', mode);
    this.document.body.setAttribute('data-portfolio-theme', mode);
    localStorage.setItem(PORTFOLIO_THEME_STORAGE_KEY, mode);
    this.designLibService.applyTheme(theme);
  }

  private readStoredThemeMode(): PortfolioThemeMode {
    const storedMode = localStorage.getItem(PORTFOLIO_THEME_STORAGE_KEY);

    return this.isPortfolioThemeMode(storedMode)
      ? storedMode
      : DEFAULT_PORTFOLIO_THEME_MODE;
  }

  private isPortfolioThemeMode(
    mode: string | null,
  ): mode is PortfolioThemeMode {
    return mode === 'light' || mode === 'dark';
  }
}
