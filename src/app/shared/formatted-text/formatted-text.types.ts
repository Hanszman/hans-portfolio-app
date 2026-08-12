export type FormattedTextStyle = 'plain' | 'bold' | 'italic' | 'underline';

export interface FormattedTextSegment {
  readonly text: string;
  readonly style: FormattedTextStyle;
}

export type FormattedTextBlock =
  | { readonly type: 'paragraph'; readonly segments: readonly FormattedTextSegment[] }
  | { readonly type: 'list'; readonly items: readonly (readonly FormattedTextSegment[])[] };
