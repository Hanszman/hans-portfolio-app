import { formatAppDate, formatAppDateRange, resolveDatePickerFormat } from './app-date.helper';

describe('app date helpers', () => {
  it('formats calendar dates with the locale order and keeps the day', () => {
    expect(formatAppDate('2026-12-23T00:00:00.000Z', 'en-us')).toBe('12/23/2026');
    expect(formatAppDate('2026-12-23', 'pt-br')).toBe('23/12/2026');
    expect(formatAppDate('2026-12-23', 'es-es')).toBe('23/12/2026');
  });

  it('handles ranges, fallbacks and invalid values', () => {
    expect(formatAppDateRange('2026-01-02', null, 'en-us', 'Present')).toBe('01/02/2026 - Present');
    expect(formatAppDate(null, 'pt-br', 'N/A')).toBe('N/A');
    expect(formatAppDate('invalid', 'pt-br')).toBe('invalid');
  });

  it('resolves display and date-picker formats', () => {
    expect(resolveDatePickerFormat('en-us')).toBe('MM/DD/YYYY');
    expect(resolveDatePickerFormat('es-es')).toBe('DD/MM/YYYY');
    expect(resolveDatePickerFormat('pt-br')).toBe('DD/MM/YYYY');
  });
});
