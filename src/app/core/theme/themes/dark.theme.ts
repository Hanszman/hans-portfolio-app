import { HansThemeCombination } from '../../design-lib/design-lib.types';

export const DARK_THEME = {
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
} as const satisfies HansThemeCombination;
