export interface HansInputValueEvent extends Event {
  detail?: string | HansFormValueDetail;
  target: (EventTarget & { value?: string }) | null;
}

export interface HansFormValueDetail {
  value?: string;
}
