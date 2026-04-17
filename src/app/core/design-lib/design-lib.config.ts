import { DesignLibComponentTag } from './design-lib.types';

export const DESIGN_LIB_REQUIRED_COMPONENTS = [
  'hans-button',
  'hans-tag',
] as const satisfies readonly DesignLibComponentTag[];
