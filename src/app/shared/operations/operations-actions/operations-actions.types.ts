import { AppTranslationKey } from '../../../core/translation/translation.types';

export type OperationsActionKey = 'create' | 'read' | 'update' | 'delete';

export interface OperationsActionDefinition {
  key: OperationsActionKey;
  labelKey: AppTranslationKey;
}

export const OPERATIONS_ACTION_DEFINITIONS: readonly OperationsActionDefinition[] = [
  {
    key: 'create',
    labelKey: 'pages.admin.operations.create',
  },
  {
    key: 'read',
    labelKey: 'pages.admin.operations.read',
  },
  {
    key: 'update',
    labelKey: 'pages.admin.operations.update',
  },
  {
    key: 'delete',
    labelKey: 'pages.admin.operations.delete',
  },
];
