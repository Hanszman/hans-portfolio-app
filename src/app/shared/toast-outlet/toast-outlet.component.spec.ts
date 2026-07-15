import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { ToastService } from '../../core/toast/toast.service';
import { ToastOutletComponent } from './toast-outlet.component';

describe('ToastOutletComponent', () => {
  let fixture: ComponentFixture<ToastOutletComponent>;
  let toastService: ToastService;

  beforeAll(() => {
    if (!customElements.get('hans-toast')) {
      customElements.define('hans-toast', class extends HTMLElement {});
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastOutletComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();

    toastService = TestBed.inject(ToastService);
    fixture = TestBed.createComponent(ToastOutletComponent);
  });

  it('should render translated toast notifications and dismiss them', () => {
    const toastId = toastService.showError('pages.login.feedback.invalidCredentials');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const toastElement = compiled.querySelector('hans-toast') as
      | (HTMLElement & {
          message?: string;
          toastColor?: string;
          iconName?: string;
          toastVariant?: string;
        })
      | null;

    expect(toastElement?.message).toBe(
      'The admin credentials are invalid or the session could not be started.',
    );
    expect(toastElement?.toastColor).toBe('danger');
    expect(toastElement?.iconName).toBe('MdError');
    expect(toastElement?.toastVariant).toBe('default');

    toastElement?.dispatchEvent(
      new CustomEvent('close', {
        bubbles: true,
        composed: true,
      }),
    );
    fixture.detectChanges();

    expect(toastService.toasts()).toEqual([]);
    expect(toastId).toBe('toast-1');
  });

  it('should expose semantic mapping helpers for every supported tone', () => {
    const component = fixture.componentInstance as unknown as {
      resolveToastColor(tone: 'success' | 'error' | 'info' | 'warning'): string;
      resolveToastIconName(tone: 'success' | 'error' | 'info' | 'warning'): string;
    };

    expect(component.resolveToastColor('success')).toBe('success');
    expect(component.resolveToastColor('error')).toBe('danger');
    expect(component.resolveToastColor('warning')).toBe('warning');
    expect(component.resolveToastColor('info')).toBe('info');
    expect(component.resolveToastIconName('success')).toBe('MdCheckCircle');
    expect(component.resolveToastIconName('error')).toBe('MdError');
    expect(component.resolveToastIconName('warning')).toBe('MdWarning');
    expect(component.resolveToastIconName('info')).toBe('MdInfo');
  });
});
