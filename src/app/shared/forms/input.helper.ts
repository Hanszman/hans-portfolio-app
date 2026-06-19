import {
  HansFormValueElement,
  HansInputListener,
  HansInputShadowControl,
} from './input.types';

const HANS_INPUT_SHADOW_CONTROL_SELECTOR = 'input, textarea';
const HANS_INPUT_HOST_EVENTS = [
  'input',
  'change',
  'keyup',
  'valuechange',
  'valueChange',
];
const HANS_INPUT_SHADOW_EVENTS = ['input', 'change', 'keyup'];

export const readHansInputValue = (
  element: HTMLElement | null | undefined,
): string => {
  if (!element) {
    return '';
  }

  const hostValue = (element as HansFormValueElement).value;

  if (typeof hostValue === 'string') {
    return hostValue;
  }

  const attributeValue =
    typeof element.getAttribute === 'function'
      ? element.getAttribute('value')
      : null;

  if (attributeValue !== null) {
    return attributeValue;
  }

  return getHansInputShadowControl(element)?.value ?? '';
};

export const bindHansInputValue = (
  element: HTMLElement | null | undefined,
  listener: HansInputListener,
): VoidFunction => {
  if (!element) {
    return () => undefined;
  }

  const emitCurrentValue = (): void => {
    listener(readHansInputValue(element));
  };

  const emitShadowValue = (): void => {
    listener(getHansInputShadowControl(element)?.value ?? readHansInputValue(element));
  };

  const hostListener = emitCurrentValue as EventListener;
  HANS_INPUT_HOST_EVENTS.forEach((eventName) => {
    element.addEventListener(eventName, hostListener);
  });

  const shadowControl = getHansInputShadowControl(element);
  const shadowListener = emitShadowValue as EventListener;
  HANS_INPUT_SHADOW_EVENTS.forEach((eventName) => {
    shadowControl?.addEventListener(eventName, shadowListener);
  });

  return () => {
    HANS_INPUT_HOST_EVENTS.forEach((eventName) => {
      element.removeEventListener(eventName, hostListener);
    });

    HANS_INPUT_SHADOW_EVENTS.forEach((eventName) => {
      shadowControl?.removeEventListener(eventName, shadowListener);
    });
  };
};

const getHansInputShadowControl = (
  element: HTMLElement,
): HansInputShadowControl | null =>
  element.shadowRoot?.querySelector<HansInputShadowControl>(
    HANS_INPUT_SHADOW_CONTROL_SELECTOR,
  ) ?? null;
