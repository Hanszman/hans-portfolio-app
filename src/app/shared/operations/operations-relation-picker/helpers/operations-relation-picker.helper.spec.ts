import { sortOperationsRelationPickerOptions } from './operations-relation-picker.helper';

describe('sortOperationsRelationPickerOptions', () => {
  it('sorts options alphabetically by title, case-insensitively', () => {
    const sorted = sortOperationsRelationPickerOptions([
      { id: 'sql-server', title: 'Microsoft SQL Server' },
      { id: 'swagger', title: 'Swagger' },
      { id: 'sql', title: 'SQL' },
      { id: 'angular', title: 'angular' },
    ]);

    expect(sorted.map((option) => option.id)).toEqual([
      'angular',
      'sql-server',
      'sql',
      'swagger',
    ]);
  });

  it('does not mutate the input array', () => {
    const options = [
      { id: 'b', title: 'Bravo' },
      { id: 'a', title: 'Alpha' },
    ];

    sortOperationsRelationPickerOptions(options);

    expect(options.map((option) => option.id)).toEqual(['b', 'a']);
  });
});
