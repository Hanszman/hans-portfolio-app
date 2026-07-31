import { TechnologyContextRecord } from '../../../../../core/api/technology-contexts/technology-contexts.types';
import { AppTranslationKey } from '../../../../../core/translation/translation.types';
import { TechnologyAdminRecord } from '../../../../../core/api/technologies/technologies.types';
import { TranslationService } from '../../../../../core/translation/translation.service';
import { formatAdminDateForDisplay } from '../../../helpers/admin.helper';
import {
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

export const formatTechnologyContextDate = (value: string): string => {
  return formatAdminDateForDisplay(value);
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
        ? translation.instant(
            `pages.admin.technologyContexts.options.${record.context}` as AppTranslationKey,
          )
        : '-',
      dateRangeLabel: `${formatTechnologyContextDate(form.startedAt)} - ${formatTechnologyContextDate(form.endedAt)}`,
    };
  });
