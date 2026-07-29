import { AppTranslationKey } from '../../core/translation/translation.types';

export type OperationsModalMode =
  | 'create'
  | 'read'
  | 'pick-update'
  | 'pick-delete'
  | 'update'
  | 'delete';

export interface OperationsItemViewModel {
  readonly id: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly imageUrl?: string;
  readonly imageAlt?: string;
  readonly imageTitle?: string;
}

export interface OperationsDetailedField {
  readonly labelKey: AppTranslationKey;
  readonly value: string;
  readonly title?: string;
}

export interface OperationsDetailedItemViewModel extends OperationsItemViewModel {
  readonly fields: readonly OperationsDetailedField[];
}
