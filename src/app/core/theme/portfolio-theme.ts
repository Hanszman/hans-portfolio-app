import { PortfolioThemeMap, PortfolioThemeMode } from './theme.types';

export const DEFAULT_PORTFOLIO_THEME_MODE: PortfolioThemeMode = 'light';

export const PORTFOLIO_THEME_STORAGE_KEY = 'hans-portfolio-theme';

export const PORTFOLIO_THEMES = {
  light: {
    primary: {
      strong: '#7c2d12',
      default: '#ea580c',
      neutral: '#fdba74',
    },
    secondary: {
      strong: '#581c87',
      default: '#a855f7',
      neutral: '#e9d5ff',
    },
    success: {
      strong: '#166534',
      default: '#22c55e',
      neutral: '#bbf7d0',
    },
    danger: {
      strong: '#9f1239',
      default: '#e11d48',
      neutral: '#fecdd3',
    },
    warning: {
      strong: '#9a3412',
      default: '#f97316',
      neutral: '#fdba74',
    },
    info: {
      strong: '#1d4ed8',
      default: '#3b82f6',
      neutral: '#bfdbfe',
    },
    base: {
      strong: '#431407',
      default: '#7c2d12',
      neutral: '#fed7aa',
    },
    backgroundColor: '#fff7ed',
    textColor: '#431407',
  },
  dark: {
    primary: {
      strong: '#ffedd5',
      default: '#fb923c',
      neutral: '#431407',
    },
    secondary: {
      strong: '#f5d0fe',
      default: '#d946ef',
      neutral: '#4a044e',
    },
    success: {
      strong: '#dcfce7',
      default: '#4ade80',
      neutral: '#14532d',
    },
    danger: {
      strong: '#ffe4e6',
      default: '#fb7185',
      neutral: '#881337',
    },
    warning: {
      strong: '#ffedd5',
      default: '#fdba74',
      neutral: '#7c2d12',
    },
    info: {
      strong: '#dbeafe',
      default: '#60a5fa',
      neutral: '#172554',
    },
    base: {
      strong: '#ffedd5',
      default: '#fed7aa',
      neutral: '#431407',
    },
    backgroundColor: '#160b06',
    textColor: '#ffedd5',
  },
} as const satisfies PortfolioThemeMap;

export const PORTFOLIO_THEME = PORTFOLIO_THEMES[DEFAULT_PORTFOLIO_THEME_MODE];
