import { AppTranslationKey } from '../../../core/translation/translation.types';
import { of } from 'rxjs';
import {
  createAdminSelectOptionDefinitions,
  createAdminFieldLabelResolver,
  formatAdminDateForDisplay,
  formatAdminDateRangeForDisplay,
  formatAdminIdentity,
  formatAdminRelationLabel,
  isAdminDateRangeValid,
  normalizeAdminDateValueForMutation,
  normalizeAdminDateValueForPicker,
  resolveAdminLocalizedValue,
  resolveAdminFieldLabel,
  resolveAdminRelationLabels,
  resolveAdminSelectValue,
  trackAdminItemById,
  translateAdminSelectOptions,
  validateAdminDateRange,
  loadAllAdminCatalogItems,
} from './admin.helper';

describe('formatAdminIdentity', () => {
  it('should format the current admin identity when a user exists', () => {
    expect(
      formatAdminIdentity({
        id: '5f8e1e74-2d49-4b5c-9724-2e8c9c8b0e11',
        email: 'victor@example.com',
        name: 'Victor Hanszman',
        role: 'ADMIN',
      }),
    ).toBe('Victor Hanszman · ADMIN');
  });

  it('should return an empty string when there is no authenticated user', () => {
    expect(formatAdminIdentity(null)).toBe('');
  });

  it('should resolve plain labels while required presentation stays in the design lib', () => {
    const translate = (key: AppTranslationKey) => key;

    expect(
      resolveAdminFieldLabel(
        {
          labelKey: 'common.fields.slug',
          required: true,
        },
        translate,
      ),
    ).toBe('common.fields.slug');

    expect(
      resolveAdminFieldLabel(
        {
          labelKey: 'common.fields.portugueseName',
        },
        translate,
      ),
    ).toBe('common.fields.portugueseName');
  });

  it('should create a reusable field label resolver', () => {
    const translate = (key: AppTranslationKey) => key;
    const resolveFieldLabel = createAdminFieldLabelResolver(
      {
        slug: {
          labelKey: 'common.fields.slug',
          required: true,
        },
        namePt: {
          labelKey: 'common.fields.portugueseName',
        },
      },
      translate,
    );

    expect(resolveFieldLabel('slug')).toBe('common.fields.slug');
    expect(resolveFieldLabel('namePt')).toBe('common.fields.portugueseName');
  });

  it('should resolve select values from the event detail string', () => {
    expect(resolveAdminSelectValue({ detail: 'STACK' } as unknown as Event)).toBe('STACK');
  });

  it('should resolve select values from the event detail object', () => {
    expect(
      resolveAdminSelectValue({
        detail: { value: 'STACK' },
      } as unknown as Event),
    ).toBe('STACK');
  });

  it('should resolve select values from the event target value', () => {
    expect(
      resolveAdminSelectValue({
        target: { value: 'STACK' },
      } as unknown as Event),
    ).toBe('STACK');
  });

  it('should return an empty string when the select event does not expose a value', () => {
    expect(resolveAdminSelectValue({} as Event)).toBe('');
  });

  it('should normalize admin date values for picker usage', () => {
    expect(normalizeAdminDateValueForPicker('2026-07-24')).toBe('2026-07-24');
    expect(normalizeAdminDateValueForPicker('2026-07-24T00:00:00.000Z')).toBe('2026-07-24');
    expect(normalizeAdminDateValueForPicker('24/07/2026')).toBe('2026-07-24');
    expect(normalizeAdminDateValueForPicker('date-free-text')).toBe('date-free-text');
    expect(normalizeAdminDateValueForPicker('   ')).toBe('');
  });

  it('should format admin dates and ranges for read views', () => {
    expect(formatAdminDateForDisplay('2026-07-24T00:00:00.000Z')).toBe('24/07/2026');
    expect(formatAdminDateForDisplay('24/07/2026')).toBe('24/07/2026');
    expect(formatAdminDateForDisplay(undefined)).toBe('-');
    expect(formatAdminDateForDisplay(null, 'Not informed')).toBe('Not informed');
    expect(
      formatAdminDateRangeForDisplay('2026-07-24T00:00:00.000Z', '2026-08-01'),
    ).toBe('24/07/2026 - 01/08/2026');
  });

  it('should format every supported relation identity without duplicate secondary text', () => {
    const labelCases = [
      [{ name: 'Angular', slug: 'angular' }, 'Angular (angular)'],
      [{ namePt: 'Projeto', kind: 'PROJECT' }, 'Projeto (PROJECT)'],
      [{ titlePt: 'Experiência' }, 'Experiência'],
      [{ labelPt: 'Português' }, 'Português'],
      [{ labelEn: 'English' }, 'English'],
      [{ companyName: 'Hans' }, 'Hans'],
      [{ fileName: 'logo.svg', kind: 'ICON' }, 'logo.svg (ICON)'],
      [{ code: 'pt-BR' }, 'pt-BR'],
      [{ url: 'https://example.com' }, 'https://example.com'],
      [{ filePath: '/assets/logo.svg' }, '/assets/logo.svg'],
      [{ id: 'relation-1' }, 'relation-1'],
      [{ name: 'Angular', slug: 'Angular' }, 'Angular'],
      [{}, ''],
    ] as const;

    labelCases.forEach(([source, expected]) => {
      expect(formatAdminRelationLabel(source)).toBe(expected);
    });
  });

  it('should resolve Spanish admin values and localized relation labels from the active locale', () => {
    expect(resolveAdminLocalizedValue('es-es', 'Título PT', 'English title', 'Título ES')).toBe(
      'Título ES',
    );
    expect(resolveAdminLocalizedValue('es-es', 'Título PT', 'English title', null)).toBe(
      'English title',
    );
    expect(
      formatAdminRelationLabel(
        {
          titlePt: 'Projeto',
          titleEn: 'Project',
          titleEs: 'Proyecto',
          slug: 'portfolio',
        },
        'es-es',
      ),
    ).toBe('Proyecto (portfolio)');
  });

  it('should resolve nested and direct relation labels with stable deduplication', () => {
    expect(
      resolveAdminRelationLabels(
        [
          { technology: { name: 'Angular', slug: 'angular' } },
          { name: 'TypeScript', slug: 'typescript' },
          { technology: { name: 'Angular', slug: 'angular' } },
          null,
          'invalid',
        ],
        'technology',
      ),
    ).toEqual(['Angular (angular)', 'TypeScript (typescript)']);
    expect(resolveAdminRelationLabels(null, 'technology')).toEqual([]);
    expect(resolveAdminRelationLabels(undefined, 'technology')).toEqual([]);
  });

  it('should normalize admin date values for mutation payloads', () => {
    expect(normalizeAdminDateValueForMutation('2026-07-24')).toBe('2026-07-24T00:00:00.000Z');
    expect(normalizeAdminDateValueForMutation('2026-07-24T10:30:00.000Z')).toBe(
      '2026-07-24T10:30:00.000Z',
    );
    expect(normalizeAdminDateValueForMutation('24/07/2026')).toBe('2026-07-24T00:00:00.000Z');
    expect(normalizeAdminDateValueForMutation('date-free-text')).toBe('date-free-text');
    expect(normalizeAdminDateValueForMutation('   ')).toBe('');
    expect(normalizeAdminDateValueForMutation(undefined)).toBe('');
    expect(normalizeAdminDateValueForMutation(null)).toBe('');
  });

  it('should validate chronological admin date ranges only when both dates are parseable', () => {
    expect(isAdminDateRangeValid('2026-07-01', '2026-07-03')).toBeTrue();
    expect(isAdminDateRangeValid('2026-07-03', '2026-07-01')).toBeFalse();
    expect(isAdminDateRangeValid('2026-07-01', '')).toBeTrue();
    expect(isAdminDateRangeValid('invalid-date', '2026-07-03')).toBeTrue();
  });

  it('should return a reusable validation result for invalid admin date ranges', () => {
    expect(
      validateAdminDateRange(
        '2026-07-01',
        '2026-07-03',
        'pages.admin.formations.feedback.invalidDateRange',
      ),
    ).toEqual({ isValid: true });

    expect(
      validateAdminDateRange(
        '2026-07-03',
        '2026-07-01',
        'pages.admin.formations.feedback.invalidDateRange',
      ),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.formations.feedback.invalidDateRange',
    });
  });

  it('should create and translate reusable admin select options', () => {
    const translate = (key: AppTranslationKey) => `translated:${key}`;
    const definitions = createAdminSelectOptionDefinitions(
      ['NPM', 'DOCS'] as const,
      (value) => `pages.admin.links.fields.type.options.${value}` as AppTranslationKey,
    );

    expect(definitions).toEqual([
      {
        id: 'NPM',
        labelKey: 'pages.admin.links.fields.type.options.NPM',
        value: 'NPM',
      },
      {
        id: 'DOCS',
        labelKey: 'pages.admin.links.fields.type.options.DOCS',
        value: 'DOCS',
      },
    ]);

    expect(translateAdminSelectOptions(definitions, translate)).toEqual([
      {
        id: 'NPM',
        label: 'translated:pages.admin.links.fields.type.options.NPM',
        value: 'NPM',
      },
      {
        id: 'DOCS',
        label: 'translated:pages.admin.links.fields.type.options.DOCS',
        value: 'DOCS',
      },
    ]);
  });

  it('should track admin items by id', () => {
    expect(trackAdminItemById(0, { id: 'tag-1' })).toBe('tag-1');
  });

  it('should load and concatenate every page of an admin relation catalog', async () => {
    const loadPage = jasmine.createSpy('loadPage').and.callFake((page: number, pageSize: number) =>
      of({
        data: [`page-${page}`],
        pagination: { totalPages: 3 },
        pageSize,
      }),
    );

    await expectAsync(loadAllAdminCatalogItems(loadPage, 25)).toBeResolvedTo([
      'page-1',
      'page-2',
      'page-3',
    ]);
    expect(loadPage.calls.allArgs()).toEqual([
      [1, 25],
      [2, 25],
      [3, 25],
    ]);
  });

});
