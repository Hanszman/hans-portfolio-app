import { ImageAssetRecord } from '../../../../../core/api/admin/image-assets/image-assets-operations.types';
import { FormationRecord } from '../../../../../core/api/admin/formations/formations-operations.types';
import { LinkRecord } from '../../../../../core/api/admin/links/links-operations.types';
import { TechnologyCollectionItemResponse } from '../../../../../core/api/technologies/technologies.types';
import {
  normalizeAdminDateValueForMutation,
  normalizeAdminDateValueForPicker,
} from '../../../helpers/admin.helper';
import {
  FormationImageAssetOptionViewModel,
  FormationLinkOptionViewModel,
  FormationOperationsViewModel,
  FormationTechnologyOptionViewModel,
  FormationsMutationBuildResult,
  FormationsOperationsFormValue,
  createEmptyFormationsOperationsFormValue,
  createFormationImageAssetOptionViewModel,
  createFormationLinkOptionViewModel,
  createFormationTechnologyOptionViewModel,
  resolveFormationImageAssetIdFromRelation,
  resolveFormationImageAssetLabel,
  resolveFormationLinkIdFromRelation,
  resolveFormationTechnologyIdFromRelation,
} from '../formations-operations.types';

const sortTechnologyOptions = (
  left: FormationTechnologyOptionViewModel,
  right: FormationTechnologyOptionViewModel,
): number => left.title.localeCompare(right.title);

const sortLinkOptions = (
  left: FormationLinkOptionViewModel,
  right: FormationLinkOptionViewModel,
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

const createLinkMap = (links: readonly LinkRecord[]): Map<string, LinkRecord> =>
  new Map(links.map((link) => [link.id, link]));

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

const resolveLinkLabel = (
  linkId: string,
  linkMap: Map<string, LinkRecord>,
): string => {
  const link = linkMap.get(linkId);

  return link ? link.labelPt || link.labelEn || link.url : linkId;
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
  [...technologies]
    .map(createFormationTechnologyOptionViewModel)
    .sort(sortTechnologyOptions);

export const buildFormationLinkOptions = (
  links: readonly LinkRecord[],
): readonly FormationLinkOptionViewModel[] =>
  [...links].map(createFormationLinkOptionViewModel).sort(sortLinkOptions);

export const buildFormationImageAssetOptions = (
  imageAssets: readonly ImageAssetRecord[],
): readonly FormationImageAssetOptionViewModel[] =>
  [...imageAssets].map(createFormationImageAssetOptionViewModel).sort(sortImageAssetOptions);

export const normalizeFormationTechnologyIds = (
  formation: FormationRecord,
): readonly string[] => {
  const technologyIds = new Set<string>();

  for (const relation of formation.technologyRelations ?? []) {
    appendUnique(technologyIds, resolveFormationTechnologyIdFromRelation(relation));
  }

  for (const relation of formation.technologies ?? []) {
    appendUnique(technologyIds, resolveFormationTechnologyIdFromRelation(relation));
  }

  return [...technologyIds];
};

export const normalizeFormationLinkIds = (
  formation: FormationRecord,
): readonly string[] => {
  const linkIds = new Set<string>();

  for (const linkId of formation.linkIds ?? []) {
    appendUnique(linkIds, linkId);
  }

  for (const relation of formation.links ?? []) {
    appendUnique(linkIds, resolveFormationLinkIdFromRelation(relation));
  }

  return [...linkIds];
};

export const normalizeFormationImageAssetIds = (
  formation: FormationRecord,
): readonly string[] => {
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
    degreeType: formation.degreeType,
    summaryPt: formation.summaryPt,
    summaryEn: formation.summaryEn,
    startDate: normalizeAdminDateValueForPicker(formation.startDate),
    endDate: normalizeAdminDateValueForPicker(formation.endDate),
    highlight: formation.highlight ?? false,
    sortOrder: String(formation.sortOrder ?? 0),
    technologyIds: normalizeFormationTechnologyIds(formation),
    linkIds: normalizeFormationLinkIds(formation),
    imageAssetIds: normalizeFormationImageAssetIds(formation),
  };
};

export const buildFormationsViewModels = (
  formations: readonly FormationRecord[],
  technologies: readonly TechnologyCollectionItemResponse[],
  links: readonly LinkRecord[],
  imageAssets: readonly ImageAssetRecord[],
): readonly FormationOperationsViewModel[] => {
  const technologyMap = createTechnologyMap(technologies);
  const linkMap = createLinkMap(links);
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
      const linkIds = normalizeFormationLinkIds(formation);
      const imageAssetIds = normalizeFormationImageAssetIds(formation);

      return {
        id: formation.id,
        slug: formation.slug,
        institution: formation.institution,
        titlePt: formation.titlePt,
        titleEn: formation.titleEn,
        degreeType: formation.degreeType,
        summaryPt: formation.summaryPt,
        summaryEn: formation.summaryEn,
        startDate: formation.startDate,
        endDateLabel: formation.endDate ?? '-',
        highlight: formation.highlight ?? false,
        sortOrderLabel: String(formation.sortOrder ?? 0),
        technologyLabels: technologyIds.map((technologyId) =>
          resolveTechnologyLabel(technologyId, technologyMap),
        ),
        linkLabels: linkIds.map((linkId) => resolveLinkLabel(linkId, linkMap)),
        imageAssetLabels: imageAssetIds.map((imageAssetId) =>
          resolveImageAssetLabel(imageAssetId, imageAssetMap),
        ),
        technologyIds,
        linkIds,
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
  const degreeType = formValue.degreeType.trim();
  const summaryPt = formValue.summaryPt.trim();
  const summaryEn = formValue.summaryEn.trim();
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

  if (!degreeType) {
    return {
      isValid: false,
      errorKey: 'pages.admin.formations.feedback.requiredDegreeType',
    };
  }

  if (!summaryPt) {
    return {
      isValid: false,
      errorKey: 'pages.admin.formations.feedback.requiredSummaryPt',
    };
  }

  if (!summaryEn) {
    return {
      isValid: false,
      errorKey: 'pages.admin.formations.feedback.requiredSummaryEn',
    };
  }

  if (!startDate) {
    return {
      isValid: false,
      errorKey: 'pages.admin.formations.feedback.requiredStartDate',
    };
  }

  if (!Number.isInteger(sortOrder)) {
    return {
      isValid: false,
      errorKey: 'pages.admin.formations.feedback.invalidSortOrder',
    };
  }

  return {
    isValid: true,
    payload: {
      slug,
      institution,
      titlePt,
      titleEn,
      degreeType,
      summaryPt,
      summaryEn,
      startDate,
      ...(endDate ? { endDate } : {}),
      highlight: formValue.highlight,
      sortOrder,
      technologyRelations: [...new Set(formValue.technologyIds)].map((technologyId) => ({
        technologyId,
      })),
      linkIds: [...new Set(formValue.linkIds)],
      imageAssetIds: [...new Set(formValue.imageAssetIds)],
    },
  };
};
