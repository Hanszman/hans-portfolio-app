import { ImageAssetRecord } from '../../../../../core/api/image-assets/image-assets.types';
import { FormationRecord } from '../../../../../core/api/formations/formations.types';
import { TechnologyCollectionItemResponse } from '../../../../../core/api/technologies/technologies.types';
import {
  normalizeAdminDateValueForMutation,
  normalizeAdminDateValueForPicker,
  validateAdminDateRange,
} from '../../../helpers/admin.helper';
import {
  FormationImageAssetOptionViewModel,
  FormationOperationsViewModel,
  FormationTechnologyOptionViewModel,
  FormationsMutationBuildResult,
  FormationsOperationsFormValue,
  createEmptyFormationsOperationsFormValue,
  createFormationImageAssetOptionViewModel,
  createFormationTechnologyOptionViewModel,
  resolveFormationImageAssetIdFromRelation,
  resolveFormationImageAssetLabel,
  resolveFormationTechnologyIdFromRelation,
} from '../formations-operations.types';

const sortTechnologyOptions = (
  left: FormationTechnologyOptionViewModel,
  right: FormationTechnologyOptionViewModel,
): number => left.title.localeCompare(right.title);

const sortImageAssetOptions = (
  left: FormationImageAssetOptionViewModel,
  right: FormationImageAssetOptionViewModel,
): number => left.title.localeCompare(right.title);

const appendUnique = (collection: Set<string>, value: string | null | undefined): void => {
  if (value) {
    collection.add(value);
  }
};

const createTechnologyMap = (
  technologies: readonly TechnologyCollectionItemResponse[],
): Map<string, TechnologyCollectionItemResponse> =>
  new Map(technologies.map((technology) => [technology.id, technology]));

const createImageAssetMap = (
  imageAssets: readonly ImageAssetRecord[],
): Map<string, ImageAssetRecord> =>
  new Map(imageAssets.map((imageAsset) => [imageAsset.id, imageAsset]));

const resolveTechnologyLabel = (
  technologyId: string,
  technologyMap: Map<string, TechnologyCollectionItemResponse>,
): string => {
  const technology = technologyMap.get(technologyId);

  return technology ? `${technology.name} (${technology.slug})` : technologyId;
};

const resolveImageAssetLabel = (
  imageAssetId: string,
  imageAssetMap: Map<string, ImageAssetRecord>,
): string => {
  const imageAsset = imageAssetMap.get(imageAssetId);

  return imageAsset ? resolveFormationImageAssetLabel(imageAsset) : imageAssetId;
};

export const buildFormationTechnologyOptions = (
  technologies: readonly TechnologyCollectionItemResponse[],
): readonly FormationTechnologyOptionViewModel[] =>
  [...technologies].map(createFormationTechnologyOptionViewModel).sort(sortTechnologyOptions);

export const buildFormationImageAssetOptions = (
  imageAssets: readonly ImageAssetRecord[],
): readonly FormationImageAssetOptionViewModel[] =>
  [...imageAssets].map(createFormationImageAssetOptionViewModel).sort(sortImageAssetOptions);

export const normalizeFormationTechnologyIds = (formation: FormationRecord): readonly string[] => {
  const technologyIds = new Set<string>();

  for (const relation of formation.technologyRelations ?? []) {
    appendUnique(technologyIds, resolveFormationTechnologyIdFromRelation(relation));
  }

  for (const relation of formation.technologies ?? []) {
    appendUnique(technologyIds, resolveFormationTechnologyIdFromRelation(relation));
  }

  return [...technologyIds];
};

export const normalizeFormationImageAssetIds = (formation: FormationRecord): readonly string[] => {
  const imageAssetIds = new Set<string>();

  for (const imageAssetId of formation.imageAssetIds ?? []) {
    appendUnique(imageAssetIds, imageAssetId);
  }

  for (const relation of formation.imageAssets ?? []) {
    appendUnique(imageAssetIds, resolveFormationImageAssetIdFromRelation(relation));
  }

  return [...imageAssetIds];
};

export const buildFormationsFormValue = (
  formation: FormationRecord | null | undefined,
): FormationsOperationsFormValue => {
  if (!formation) {
    return createEmptyFormationsOperationsFormValue();
  }

  return {
    slug: formation.slug,
    institution: formation.institution,
    titlePt: formation.titlePt,
    titleEn: formation.titleEn,
    titleEs: formation.titleEs ?? '',
    degreeType: formation.degreeType,
    summaryPt: formation.summaryPt,
    summaryEn: formation.summaryEn,
    summaryEs: formation.summaryEs ?? '',
    startDate: normalizeAdminDateValueForPicker(formation.startDate),
    endDate: normalizeAdminDateValueForPicker(formation.endDate),
    highlight: formation.highlight ?? false,
    sortOrder: String(formation.sortOrder ?? 0),
    technologyIds: normalizeFormationTechnologyIds(formation),
    imageAssetIds: normalizeFormationImageAssetIds(formation),
  };
};

export const buildFormationsViewModels = (
  formations: readonly FormationRecord[],
  technologies: readonly TechnologyCollectionItemResponse[],
  imageAssets: readonly ImageAssetRecord[],
): readonly FormationOperationsViewModel[] => {
  const technologyMap = createTechnologyMap(technologies);
  const imageAssetMap = createImageAssetMap(imageAssets);

  return [...formations]
    .sort((left, right) => {
      const leftSortOrder = left.sortOrder ?? Number.MAX_SAFE_INTEGER;
      const rightSortOrder = right.sortOrder ?? Number.MAX_SAFE_INTEGER;

      if (leftSortOrder !== rightSortOrder) {
        return leftSortOrder - rightSortOrder;
      }

      return left.institution.localeCompare(right.institution);
    })
    .map((formation) => {
      const technologyIds = normalizeFormationTechnologyIds(formation);
      const imageAssetIds = normalizeFormationImageAssetIds(formation);

      return {
        id: formation.id,
        slug: formation.slug,
        institution: formation.institution,
        titlePt: formation.titlePt,
        titleEn: formation.titleEn,
        titleEs: formation.titleEs ?? '',
        degreeType: formation.degreeType,
        summaryPt: formation.summaryPt,
        summaryEn: formation.summaryEn,
        summaryEs: formation.summaryEs ?? '',
        startDate: formation.startDate,
        endDateLabel: formation.endDate ?? '-',
        highlight: formation.highlight ?? false,
        sortOrderLabel: String(formation.sortOrder ?? 0),
        technologyLabels: technologyIds.map((technologyId) =>
          resolveTechnologyLabel(technologyId, technologyMap),
        ),
        imageAssetLabels: imageAssetIds.map((imageAssetId) =>
          resolveImageAssetLabel(imageAssetId, imageAssetMap),
        ),
        technologyIds,
        imageAssetIds,
      };
    });
};

export const buildFormationsMutationPayload = (
  formValue: FormationsOperationsFormValue,
): FormationsMutationBuildResult => {
  const slug = formValue.slug.trim();
  const institution = formValue.institution.trim();
  const titlePt = formValue.titlePt.trim();
  const titleEn = formValue.titleEn.trim();
  const titleEs = formValue.titleEs?.trim() ?? titleEn;
  const degreeType = formValue.degreeType.trim();
  const summaryPt = formValue.summaryPt.trim();
  const summaryEn = formValue.summaryEn.trim();
  const summaryEs = formValue.summaryEs?.trim() ?? summaryEn;
  const startDate = normalizeAdminDateValueForMutation(formValue.startDate);
  const endDate = normalizeAdminDateValueForMutation(formValue.endDate);
  const sortOrder = Number.parseInt(formValue.sortOrder.trim(), 10);

  if (!slug) {
    return { isValid: false, errorKey: 'pages.admin.formations.feedback.requiredSlug' };
  }

  if (!institution) {
    return {
      isValid: false,
      errorKey: 'pages.admin.formations.feedback.requiredInstitution',
    };
  }

  if (!titlePt) {
    return {
      isValid: false,
      errorKey: 'pages.admin.formations.feedback.requiredTitlePt',
    };
  }

  if (!titleEn) {
    return {
      isValid: false,
      errorKey: 'pages.admin.formations.feedback.requiredTitleEn',
    };
  }

  if (!titleEs) {
    return { isValid: false, errorKey: 'common.feedback.requiredTitleEs' };
  }

  if (!degreeType) {
    return {
      isValid: false,
      errorKey: 'pages.admin.formations.feedback.requiredDegreeType',
    };
  }

  if (!summaryPt) {
    return {
      isValid: false,
      errorKey: 'common.feedback.requiredPortugueseSummary',
    };
  }

  if (!summaryEn) {
    return {
      isValid: false,
      errorKey: 'common.feedback.requiredEnglishSummary',
    };
  }

  if (!summaryEs) {
    return { isValid: false, errorKey: 'common.feedback.requiredSummaryEs' };
  }

  if (!startDate) {
    return {
      isValid: false,
      errorKey: 'pages.admin.formations.feedback.requiredStartDate',
    };
  }

  const dateRangeValidationResult = validateAdminDateRange(
    startDate,
    endDate,
    'pages.admin.formations.feedback.invalidDateRange',
  );

  if (!dateRangeValidationResult.isValid) {
    return dateRangeValidationResult;
  }

  if (!Number.isInteger(sortOrder)) {
    return {
      isValid: false,
      errorKey: 'common.feedback.invalidIntegerSortOrder',
    };
  }

  return {
    isValid: true,
    payload: {
      slug,
      institution,
      titlePt,
      titleEn,
      titleEs,
      degreeType,
      summaryPt,
      summaryEn,
      summaryEs,
      startDate,
      ...(endDate ? { endDate } : {}),
      highlight: formValue.highlight,
      sortOrder,
      technologyRelations: [...new Set(formValue.technologyIds)].map((technologyId) => ({
        technologyId,
      })),
      imageAssetIds: [...new Set(formValue.imageAssetIds)],
    },
  };
};
