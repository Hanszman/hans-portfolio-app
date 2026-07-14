import { AppTranslationKey, AppTranslationParams } from '../translation/translation.types';

export type AppToastTone = 'success' | 'error' | 'info' | 'warning';

export interface AppToast {
  readonly id: string;
  readonly messageKey: AppTranslationKey;
  readonly messageParams: AppTranslationParams;
  readonly tone: AppToastTone;
  readonly duration: number;
}

export interface ShowAppToastOptions {
  readonly messageKey: AppTranslationKey;
  readonly messageParams?: AppTranslationParams;
  readonly tone?: AppToastTone;
  readonly duration?: number;
}

export const DEFAULT_APP_TOAST_DURATION = 4000;
