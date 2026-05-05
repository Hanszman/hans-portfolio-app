import { HansThemeCombination } from '../../design-lib/design-lib.types';

export const DARK_THEME = {
  primary: {
    strong: '#c4b5fd',
    default: '#7c3aed',
    neutral: '#4b1f8a',
  },
  secondary: {
    strong: '#93c5fd',
    default: '#3b82f6',
    neutral: '#1f4ba8',
  },
  success: {
    strong: '#a3f3c4',
    default: '#04d361',
    neutral: '#027a43',
  },
  danger: {
    strong: '#ff5c5c',
    default: '#ff002b',
    neutral: '#9e0018',
  },
  warning: {
    strong: '#fef08a',
    default: '#eab308',
    neutral: '#ca8a04',
  },
  info: {
    strong: '#84f3df',
    default: '#00f6db',
    neutral: '#008f82',
  },
  base: {
    strong: '#f4f4fa',
    default: '#b7b7c3',
    neutral: '#3a3a44',
  },
  backgroundColor: '#3a3a44',
  textColor: '#f4f4fa',
} as const satisfies HansThemeCombination;
