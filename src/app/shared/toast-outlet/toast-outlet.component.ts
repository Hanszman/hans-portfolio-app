import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ToastService } from '../../core/toast/toast.service';
import { AppToast, AppToastTone } from '../../core/toast/toast.types';

@Component({
  selector: 'app-toast-outlet',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './toast-outlet.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastOutletComponent {
  private readonly toastService = inject(ToastService);

  protected readonly toasts = this.toastService.toasts;

  protected dismiss(toastId: string): void {
    this.toastService.dismiss(toastId);
  }

  protected resolveToastColor(tone: AppToastTone): string {
    switch (tone) {
      case 'success':
        return 'success';
      case 'error':
        return 'danger';
      case 'warning':
        return 'warning';
      default:
        return 'info';
    }
  }

  protected resolveToastIconName(tone: AppToastTone): string {
    switch (tone) {
      case 'success':
        return 'MdCheckCircle';
      case 'error':
        return 'MdError';
      case 'warning':
        return 'MdWarning';
      default:
        return 'MdInfo';
    }
  }

  protected trackToastById(index: number, toast: AppToast): string {
    return toast.id;
  }
}
