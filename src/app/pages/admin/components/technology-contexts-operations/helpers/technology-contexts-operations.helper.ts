import { TechnologyContextRecord } from '../../../../../core/api/technology-contexts/technology-contexts.types';
import { TechnologyAdminRecord } from '../../../../../core/api/technologies/technologies.types';
import { TranslationService } from '../../../../../core/translation/translation.service';
import { formatAdminDateForDisplay } from '../../../helpers/admin.helper';
import {
  TECHNOLOGY_CONTEXT_LABEL_KEYS,
  TechnologyContextTechnologyOption,
  TechnologyContextViewModel,
  buildTechnologyContextFormValue,
} from '../technology-contexts-operations.types';

export const buildTechnologyContextTechnologyOptions = (
  technologies: readonly TechnologyAdminRecord[],
): readonly TechnologyContextTechnologyOption[] =>
  [...technologies]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((technology) => ({
      id: technology.id,
      label: `${technology.name} (${technology.slug})`,
      value: technology.id,
    }));

export const formatTechnologyContextDate = (
  value: string,
  translation?: TranslationService,
): string => {
  const locale =
    translation && typeof translation.locale === 'function' ? translation.locale() : 'pt-br';

  return formatAdminDateForDisplay(value, '-', locale);
};

export const buildTechnologyContextViewModels = (
  records: readonly TechnologyContextRecord[],
  translation: TranslationService,
): readonly TechnologyContextViewModel[] =>
  records.map((record) => {
    const form = buildTechnologyContextFormValue(record);
    return {
      ...form,
      id: record.id,
      technologyName: record.technology?.name ?? record.technologyId,
      technologySlug: record.technology?.slug ?? record.technologyId,
      contextLabel: record.context
        ? translation.instant(TECHNOLOGY_CONTEXT_LABEL_KEYS[record.context])
        : '-',
      dateRangeLabel: `${formatTechnologyContextDate(form.startedAt, translation)} - ${formatTechnologyContextDate(form.endedAt, translation)}`,
    };
  });
