import { Injectable, signal } from '@angular/core';
import {
  AppToast,
  DEFAULT_APP_TOAST_DURATION,
  ShowAppToastOptions,
} from './toast.types';
import { AppTranslationKey, AppTranslationParams } from '../translation/translation.types';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly toastsSignal = signal<readonly AppToast[]>([]);
  private nextToastId = 0;

  readonly toasts = this.toastsSignal.asReadonly();

  show(options: ShowAppToastOptions): string {
    const toast: AppToast = {
      id: `toast-${++this.nextToastId}`,
      messageKey: options.messageKey,
      messageParams: options.messageParams ?? {},
      tone: options.tone ?? 'info',
      duration: options.duration ?? DEFAULT_APP_TOAST_DURATION,
    };

    this.toastsSignal.update((currentToasts) => [...currentToasts, toast]);
    return toast.id;
  }

  showSuccess(
    messageKey: AppTranslationKey,
    messageParams: AppTranslationParams = {},
  ): string {
    return this.show({
      messageKey,
      messageParams,
      tone: 'success',
    });
  }

  showError(
    messageKey: AppTranslationKey,
    messageParams: AppTranslationParams = {},
  ): string {
    return this.show({
      messageKey,
      messageParams,
      tone: 'error',
    });
  }

  showWarning(
    messageKey: AppTranslationKey,
    messageParams: AppTranslationParams = {},
  ): string {
    return this.show({
      messageKey,
      messageParams,
      tone: 'warning',
    });
  }

  dismiss(toastId: string): void {
    this.toastsSignal.update((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== toastId),
    );
  }

  clear(): void {
    this.toastsSignal.set([]);
  }
}
