export interface TagButtonImageViewModel {
  src: string;
  alt: string;
}

export interface TagButtonViewModel<TValue = unknown> {
  label: string;
  image?: TagButtonImageViewModel | null;
  value: TValue;
}
