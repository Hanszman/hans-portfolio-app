import { TranslationService } from '../../../../../core/translation/translation.service';
import { TechnologyContextRecord } from '../../../../../core/api/admin/technology-contexts/technology-contexts-operations.types';
import { TechnologyCollectionItemResponse } from '../../../../../core/api/technologies/technologies.types';
import { buildTechnologyContextFormValue, buildTechnologyContextMutationPayload } from '../technology-contexts-operations.types';
import { buildTechnologyContextTechnologyOptions, buildTechnologyContextViewModels, formatTechnologyContextDate } from './technology-contexts-operations.helper';

const technology = (id: string, name: string, slug: string): TechnologyCollectionItemResponse => ({ id, name, slug, category: 'OTHER', level: 'BASIC', frequency: 'PREVIOUSLY_USED', highlight: true });
const context = (overrides: Partial<TechnologyContextRecord> = {}): TechnologyContextRecord => ({ id: 'context-1', technologyId: 'tech-1', context: 'PROFESSIONAL', startedAt: '2026-01-01', endedAt: null, technology: { id: 'tech-1', slug: 'angular', name: 'Angular' }, ...overrides });

describe('technology contexts operations helper', () => {
  it('sorts technology options by name', () => {
    expect(buildTechnologyContextTechnologyOptions([technology('2', 'Zeta', 'zeta'), technology('1', 'Angular', 'angular')])).toEqual([{ id: '1', label: 'Angular (angular)', value: '1' }, { id: '2', label: 'Zeta (zeta)', value: '2' }]);
  });

  it('maps records with translated context labels and scalar fallbacks', () => {
    const translation = { instant: jasmine.createSpy('instant').and.returnValue('Professional') } as unknown as TranslationService;
    expect(buildTechnologyContextViewModels([context(), context({ id: 'context-2', technology: null, technologyId: 'missing' })], translation)).toEqual([
      { id: 'context-1', technologyId: 'tech-1', context: 'PROFESSIONAL', startedAt: '2026-01-01', endedAt: '', technologyName: 'Angular', technologySlug: 'angular', contextLabel: 'Professional', dateRangeLabel: '01/01/2026 - -' },
      { id: 'context-2', technologyId: 'missing', context: 'PROFESSIONAL', startedAt: '2026-01-01', endedAt: '', technologyName: 'missing', technologySlug: 'missing', contextLabel: 'Professional', dateRangeLabel: '01/01/2026 - -' },
    ]);
  });

  it('maps a completed record and preserves a non-empty end date in valid payloads', () => {
    const completed = context({ endedAt: '2026-12-31' });
    expect(buildTechnologyContextFormValue(completed)).toEqual({ technologyId: 'tech-1', context: 'PROFESSIONAL', startedAt: '2026-01-01', endedAt: '2026-12-31' });
    expect(buildTechnologyContextMutationPayload({ technologyId: ' tech-1 ', context: 'PROFESSIONAL', startedAt: '2026-01-01', endedAt: '2026-12-31' })).toEqual({ isValid: true, payload: { technologyId: ' tech-1 ', context: 'PROFESSIONAL', startedAt: '2026-01-01T00:00:00.000Z', endedAt: '2026-12-31T00:00:00.000Z' } });
    expect(buildTechnologyContextMutationPayload({ technologyId: 'tech-1', context: 'PROFESSIONAL', startedAt: '2026-12-31', endedAt: '2026-01-01' })).toEqual({ isValid: false, errorKey: 'pages.admin.technologyContexts.feedback.invalidDateRange' });
    expect(buildTechnologyContextFormValue(null)).toEqual({ technologyId: '', context: '', startedAt: '', endedAt: '' });
    expect(buildTechnologyContextFormValue({ technologyId: undefined, technology: { id: 'tech-fallback', slug: 'fallback', name: 'Fallback' } } as unknown as TechnologyContextRecord)).toEqual({ technologyId: 'tech-fallback', context: '', startedAt: '', endedAt: '' });
    expect(buildTechnologyContextFormValue({ technologyId: undefined, technology: null } as unknown as TechnologyContextRecord)).toEqual({ technologyId: '', context: '', startedAt: '', endedAt: '' });
  });

  it('formats dates for operation summaries and preserves invalid values', () => {
    expect(formatTechnologyContextDate('2026-12-31T00:00:00.000Z')).toBe('31/12/2026');
    expect(formatTechnologyContextDate('')).toBe('-');
    expect(formatTechnologyContextDate('not-a-date')).toBe('not-a-date');
    expect(formatTechnologyContextDate('2026-12')).toBe('2026-12');
    const translation = { instant: jasmine.createSpy('instant') } as unknown as TranslationService;
    expect(buildTechnologyContextViewModels([context({ context: '' as never, technology: null, technologyId: 'fallback' })], translation)[0].contextLabel).toBe('-');
  });
});
