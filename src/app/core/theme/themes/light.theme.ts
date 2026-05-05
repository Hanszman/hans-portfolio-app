import { HansThemeCombination } from '../../design-lib/design-lib.types';

export const LIGHT_THEME = {
  primary: {
    strong: '#4b1f8a',
    default: '#7c3aed',
    neutral: '#c4b5fd',
  },
  secondary: {
    strong: '#1f4ba8',
    default: '#3b82f6',
    neutral: '#93c5fd',
  },
  success: {
    strong: '#027a43',
    default: '#04d361',
    neutral: '#a3f3c4',
  },
  danger: {
    strong: '#9e0018',
    default: '#ff002b',
    neutral: '#ff5c5c',
  },
  warning: {
    strong: '#ca8a04',
    default: '#eab308',
    neutral: '#fef08a',
  },
  info: {
    strong: '#008f82',
    default: '#00f6db',
    neutral: '#84f3df',
  },
  base: {
    strong: '#7a7a85',
    default: '#b7b7c3',
    neutral: '#e6e6ee',
  },
  backgroundColor: '#f4f4fa',
  textColor: '#3a3a44',
} as const satisfies HansThemeCombination;
