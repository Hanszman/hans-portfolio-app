import { TechnologyContextRecord } from '../../../../../core/api/admin/technology-contexts/technology-contexts-operations.types';
import { AppTranslationKey } from '../../../../../core/translation/translation.types';
import { TechnologyAdminRecord } from '../../../../../core/api/technologies/technologies.types';
import { TranslationService } from '../../../../../core/translation/translation.service';
import { TechnologyContextTechnologyOption, TechnologyContextViewModel, buildTechnologyContextFormValue } from '../technology-contexts-operations.types';

export const buildTechnologyContextTechnologyOptions = (
  technologies: readonly TechnologyAdminRecord[],
): readonly TechnologyContextTechnologyOption[] => [...technologies]
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((technology) => ({ id: technology.id, title: technology.name, subtitle: technology.slug }));

export const buildTechnologyContextViewModels = (
  records: readonly TechnologyContextRecord[],
  translation: TranslationService,
): readonly TechnologyContextViewModel[] => records.map((record) => {
  const form = buildTechnologyContextFormValue(record);
  return {
    ...form,
    id: record.id,
    technologyName: record.technology?.name ?? record.technologyId,
    technologySlug: record.technology?.slug ?? record.technologyId,
    contextLabel: translation.instant(`pages.admin.technologyContexts.options.${record.context}` as AppTranslationKey),
  };
});
