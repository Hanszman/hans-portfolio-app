import { AppTranslationKey } from '../../core/translation/translation.types';

export type HighlightFilterValue = 'ALL' | 'HIGHLIGHTED' | 'OTHERS';

export interface HighlightFilterViewModel {
  labelKey: AppTranslationKey;
  value: HighlightFilterValue;
}

export const HIGHLIGHT_FILTERS: readonly HighlightFilterViewModel[] = [
  { labelKey: 'common.filters.all', value: 'ALL' },
  { labelKey: 'common.states.highlighted', value: 'HIGHLIGHTED' },
  { labelKey: 'common.filters.others', value: 'OTHERS' },
];
