import { ImageAssetRecord } from '../../../../../core/api/image-assets/image-assets.types';
import { TechnologyAdminRecord } from '../../../../../core/api/technologies/technologies.types';
import {
  resolveAdminImageAssetLabel,
  resolveAdminRelationLabels,
} from '../../../helpers/admin.helper';
import {
  TechnologyImageAssetOptionViewModel,
  TechnologyOperationsViewModel,
  TechnologiesOperationsFormValue,
  buildTechnologiesFormValue,
  buildTechnologiesMutationPayload,
  createTechnologyImageAssetOptionViewModel,
} from '../technologies-operations.types';

export const buildTechnologyImageAssetOptions = (
  items: readonly ImageAssetRecord[],
): readonly TechnologyImageAssetOptionViewModel[] =>
  [...items]
    .map(createTechnologyImageAssetOptionViewModel)
    .sort((a, b) => a.title.localeCompare(b.title));

export const buildTechnologiesViewModels = (
  items: readonly TechnologyAdminRecord[],
  images: readonly ImageAssetRecord[],
): readonly TechnologyOperationsViewModel[] => {
  const imageMap = new Map(images.map((item) => [item.id, item]));
  return [...items]
    .sort(
      (a, b) =>
        ((a as TechnologyAdminRecord & { sortOrder?: number }).sortOrder ?? 999) -
        ((b as TechnologyAdminRecord & { sortOrder?: number }).sortOrder ?? 999),
    )
    .map((item) => {
      const form = buildTechnologiesFormValue(item);
      return {
        ...form,
        id: item.id,
        imageAssetLabels: form.imageAssetIds.map((id) =>
          imageMap.has(id) ? resolveAdminImageAssetLabel(imageMap.get(id)!) : id,
        ),
        projectLabels: resolveAdminRelationLabels(
          item.projectUsages ?? item.projectRelations,
          'project',
        ),
        experienceLabels: resolveAdminRelationLabels(
          item.experienceUses ?? item.experienceRelations,
          'experience',
        ),
        formationLabels: resolveAdminRelationLabels(
          item.formationUses ?? item.formationRelations,
          'formation',
        ),
        technologyContexts: item.technologyContexts ?? [],
      };
    });
};

export { buildTechnologiesFormValue };

export { buildTechnologiesMutationPayload };

export type { TechnologiesOperationsFormValue };
