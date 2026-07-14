import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    service = new ToastService();
  });

  it('should enqueue semantic toasts with stable ids and defaults', () => {
    const firstToastId = service.showSuccess('pages.admin.tags.feedback.created');
    const secondToastId = service.showError('pages.login.feedback.invalidCredentials');

    expect(firstToastId).toBe('toast-1');
    expect(secondToastId).toBe('toast-2');
    expect(service.toasts()).toEqual([
      {
        id: 'toast-1',
        messageKey: 'pages.admin.tags.feedback.created',
        messageParams: {},
        tone: 'success',
        duration: 4000,
      },
      {
        id: 'toast-2',
        messageKey: 'pages.login.feedback.invalidCredentials',
        messageParams: {},
        tone: 'error',
        duration: 4000,
      },
    ]);
  });

  it('should support custom options and dismiss individual or all toasts', () => {
    const toastId = service.show({
      messageKey: 'pages.admin.portfolioSettings.feedback.loadError',
      messageParams: {
        page: '1',
      },
      tone: 'warning',
      duration: 6000,
    });

    expect(service.toasts()).toEqual([
      {
        id: toastId,
        messageKey: 'pages.admin.portfolioSettings.feedback.loadError',
        messageParams: {
          page: '1',
        },
        tone: 'warning',
        duration: 6000,
      },
    ]);

    service.dismiss(toastId);
    expect(service.toasts()).toEqual([]);

    service.showWarning('pages.admin.tags.feedback.loadError');
    service.clear();

    expect(service.toasts()).toEqual([]);
  });

  it('should apply info defaults in direct show calls and keep unrelated toasts on dismiss', () => {
    const firstToastId = service.show({
      messageKey: 'pages.admin.tags.feedback.loadError',
    });
    const secondToastId = service.showWarning(
      'pages.admin.portfolioSettings.feedback.deleteError',
      {
        entity: 'portfolio-setting',
      },
    );

    expect(service.toasts()).toEqual([
      {
        id: firstToastId,
        messageKey: 'pages.admin.tags.feedback.loadError',
        messageParams: {},
        tone: 'info',
        duration: 4000,
      },
      {
        id: secondToastId,
        messageKey: 'pages.admin.portfolioSettings.feedback.deleteError',
        messageParams: {
          entity: 'portfolio-setting',
        },
        tone: 'warning',
        duration: 4000,
      },
    ]);

    service.dismiss(firstToastId);

    expect(service.toasts()).toEqual([
      {
        id: secondToastId,
        messageKey: 'pages.admin.portfolioSettings.feedback.deleteError',
        messageParams: {
          entity: 'portfolio-setting',
        },
        tone: 'warning',
        duration: 4000,
      },
    ]);
  });
});
