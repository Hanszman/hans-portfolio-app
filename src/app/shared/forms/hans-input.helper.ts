import {
  HANS_INPUT_VALUE_EVENT_NAMES,
  HansInputHostElement,
  HansInputValueEvent,
  HansInputValueListener,
} from './input.types';

export const syncHansInputDisplayedValue = (
  host: HansInputHostElement | null | undefined,
  value: string,
): void => {
  if (!host) {
    return;
  }

  if (host.value !== value) {
    host.value = value;
  }

  const nativeInput = host.shadowRoot?.querySelector('input');

  if (nativeInput instanceof HTMLInputElement && nativeInput.value !== value) {
    nativeInput.value = value;
  }

  if (host.getAttribute('value') !== null) {
    host.removeAttribute('value');
  }
};

export const bindHansInputValueListener = (
  host: HansInputHostElement | null | undefined,
  listener: HansInputValueListener,
): (() => void) => {
  if (!host) {
    return () => undefined;
  }

  const handleValueChange = (event: Event): void => {
    listener(resolveHansInputValue(host, event));
  };

  HANS_INPUT_VALUE_EVENT_NAMES.forEach((eventName) => {
    host.addEventListener(eventName, handleValueChange);
  });

  return () => {
    HANS_INPUT_VALUE_EVENT_NAMES.forEach((eventName) => {
      host.removeEventListener(eventName, handleValueChange);
    });
  };
};

const resolveHansInputValue = (
  host: HansInputHostElement,
  event: Event,
): string => {
  const inputEvent = event as HansInputValueEvent;

  if (typeof inputEvent.detail === 'string') {
    return inputEvent.detail;
  }

  if (typeof inputEvent.detail?.value === 'string') {
    return inputEvent.detail.value;
  }

  if (typeof inputEvent.target?.value === 'string') {
    return inputEvent.target.value;
  }

  if ('value' in host && typeof host.value === 'string') {
    return host.value;
  }

  const nativeInput = host.shadowRoot?.querySelector('input');

  if (nativeInput instanceof HTMLInputElement) {
    return nativeInput.value;
  }

  return '';
};
