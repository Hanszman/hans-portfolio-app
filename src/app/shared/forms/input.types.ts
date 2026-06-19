export interface HansInputValueEvent extends Event {
  detail?: string | HansFormValueDetail;
  target: (EventTarget & { value?: string }) | null;
}

export interface HansFormValueDetail {
  value?: string;
}

export interface HansFormValueElement extends HTMLElement {
  value?: string;
}

export type HansInputShadowControl = HTMLInputElement | HTMLTextAreaElement;

export type HansInputListener = (value: string) => void;
