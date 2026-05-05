export interface PopupOptionItem {
  readonly id?: string;
  readonly label: string;
  readonly value: string;
  readonly disabled?: boolean;
  readonly iconName?: string;
  readonly imageSrc?: string;
  readonly imageAlt?: string;
  readonly action?: (item: PopupOptionItem) => void;
  readonly children?: readonly PopupOptionItem[];
}
