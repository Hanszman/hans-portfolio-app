export interface HansInputValueEvent extends Event {
  detail?: string | HansFormValueDetail;
  target: (EventTarget & { value?: string }) | null;
}

export interface HansFormValueDetail {
  value?: string;
}

export interface HansInputHostElement extends HTMLElement {
  value?: string;
  shadowRoot: ShadowRoot | null;
}

export type HansInputValueListener = (value: string) => void;

export const HANS_INPUT_VALUE_EVENT_NAMES = [
  'input',
  'change',
  'valueChange',
  'valuechange',
  'value-change',
] as const;
