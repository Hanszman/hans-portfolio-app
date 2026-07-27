import { ImageAssetRecord } from '../../../../../core/api/admin/image-assets/image-assets-operations.types';
import { TechnologyAdminRecord } from '../../../../../core/api/technologies/technologies.types';
import { resolveAdminImageAssetLabel } from '../../../helpers/admin.helper';
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
      };
    });
};

export { buildTechnologiesFormValue };

export { buildTechnologiesMutationPayload };

export type { TechnologiesOperationsFormValue };
