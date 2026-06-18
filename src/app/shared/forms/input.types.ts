export interface HansInputValueEvent extends Event {
  detail?: string;
  target: (EventTarget & { value?: string }) | null;
}
