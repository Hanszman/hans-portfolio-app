import { OperationsRelationPickerOption } from '../operations-relation-picker.types';

export const sortOperationsRelationPickerOptions = (
  options: readonly OperationsRelationPickerOption[],
): readonly OperationsRelationPickerOption[] =>
  [...options].sort((left, right) =>
    left.title.localeCompare(right.title, undefined, { sensitivity: 'base' }),
  );
