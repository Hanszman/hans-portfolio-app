import { TranslationService } from '../../../../../core/translation/translation.service';
import { TechnologyContextRecord } from '../../../../../core/api/admin/technology-contexts/technology-contexts-operations.types';
import { TechnologyCollectionItemResponse } from '../../../../../core/api/technologies/technologies.types';
import { buildTechnologyContextFormValue, buildTechnologyContextMutationPayload } from '../technology-contexts-operations.types';
import { buildTechnologyContextTechnologyOptions, buildTechnologyContextViewModels } from './technology-contexts-operations.helper';

const technology = (id: string, name: string, slug: string): TechnologyCollectionItemResponse => ({ id, name, slug, category: 'OTHER', level: 'BASIC', frequency: 'PREVIOUSLY_USED', highlight: true });
const context = (overrides: Partial<TechnologyContextRecord> = {}): TechnologyContextRecord => ({ id: 'context-1', technologyId: 'tech-1', context: 'PROFESSIONAL', startedAt: '2026-01-01', endedAt: null, technology: { id: 'tech-1', slug: 'angular', name: 'Angular' }, ...overrides });

describe('technology contexts operations helper', () => {
  it('sorts technology options by name', () => {
    expect(buildTechnologyContextTechnologyOptions([technology('2', 'Zeta', 'zeta'), technology('1', 'Angular', 'angular')])).toEqual([{ id: '1', title: 'Angular', subtitle: 'angular' }, { id: '2', title: 'Zeta', subtitle: 'zeta' }]);
  });

  it('maps records with translated context labels and scalar fallbacks', () => {
    const translation = { instant: jasmine.createSpy('instant').and.returnValue('Professional') } as unknown as TranslationService;
    expect(buildTechnologyContextViewModels([context(), context({ id: 'context-2', technology: null, technologyId: 'missing' })], translation)).toEqual([
      { id: 'context-1', technologyId: 'tech-1', context: 'PROFESSIONAL', startedAt: '2026-01-01', endedAt: '', technologyName: 'Angular', technologySlug: 'angular', contextLabel: 'Professional' },
      { id: 'context-2', technologyId: 'missing', context: 'PROFESSIONAL', startedAt: '2026-01-01', endedAt: '', technologyName: 'missing', technologySlug: 'missing', contextLabel: 'Professional' },
    ]);
  });

  it('maps a completed record and preserves a non-empty end date in valid payloads', () => {
    const completed = context({ endedAt: '2026-12-31' });
    expect(buildTechnologyContextFormValue(completed)).toEqual({ technologyId: 'tech-1', context: 'PROFESSIONAL', startedAt: '2026-01-01', endedAt: '2026-12-31' });
    expect(buildTechnologyContextMutationPayload({ technologyId: ' tech-1 ', context: 'PROFESSIONAL', startedAt: '2026-01-01', endedAt: '2026-12-31' })).toEqual({ isValid: true, payload: { technologyId: ' tech-1 ', context: 'PROFESSIONAL', startedAt: '2026-01-01', endedAt: '2026-12-31' } });
    expect(buildTechnologyContextFormValue(null)).toEqual({ technologyId: '', context: '', startedAt: '', endedAt: '' });
  });
});
