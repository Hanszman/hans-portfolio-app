import { ExperienceCollectionItemResponse } from '../../../../../core/api/experiences/experiences.types';
import { ProjectCollectionItemResponse } from '../../../../../core/api/projects/projects.types';
import { TechnologyCollectionItemResponse } from '../../../../../core/api/technologies/technologies.types';
import { FormationRecord } from '../../../../../core/api/formations/formations.types';
import { SpokenLanguageRecord } from '../../../../../core/api/spoken-languages/spoken-languages.types';
import { CustomerRecord } from '../../../../../core/api/customers/customers.types';
import { JobRecord } from '../../../../../core/api/jobs/jobs.types';
import {
  ImageAssetCatalogOptionViewModel,
  IMAGE_ASSET_KIND_VALUES,
  ImageAssetOperationsViewModel,
  ImageAssetsMutationBuildResult,
  ImageAssetsOperationsFormValue,
  createEmptyImageAssetsOperationsFormValue,
  createImageAssetCatalogOptionViewModel,
  resolveImageAssetAltEn,
  resolveImageAssetAltEs,
  resolveImageAssetAltPt,
  resolveImageAssetCaptionEn,
  resolveImageAssetCaptionEs,
  resolveImageAssetCaptionPt,
  resolveImageAssetExperienceIdFromRelation,
  resolveImageAssetFormationIdFromRelation,
  resolveImageAssetSpokenLanguageIdFromRelation,
  resolveImageAssetCustomerIdFromRelation,
  resolveImageAssetJobIdFromRelation,
  resolveImageAssetProjectIdFromRelation,
  resolveImageAssetTechnologyIdFromRelation,
} from '../image-assets-operations.types';
import { ImageAssetRecord } from '../../../../../core/api/image-assets/image-assets.types';

const sortCatalogOptions = (
  left: ImageAssetCatalogOptionViewModel,
  right: ImageAssetCatalogOptionViewModel,
): number => left.title.localeCompare(right.title);

const appendUnique = (collection: Set<string>, value: string | null | undefined): void => {
  if (value) {
    collection.add(value);
  }
};

const createProjectMap = (
  projects: readonly ProjectCollectionItemResponse[],
): Map<string, ProjectCollectionItemResponse> =>
  new Map(projects.map((project) => [project.id, project]));

const createExperienceMap = (
  experiences: readonly ExperienceCollectionItemResponse[],
): Map<string, ExperienceCollectionItemResponse> =>
  new Map(experiences.map((experience) => [experience.id, experience]));

const createTechnologyMap = (
  technologies: readonly TechnologyCollectionItemResponse[],
): Map<string, TechnologyCollectionItemResponse> =>
  new Map(technologies.map((technology) => [technology.id, technology]));

const resolveImageAssetIdsFromProjectCatalog = (
  imageAsset: ImageAssetRecord,
  projects: readonly ProjectCollectionItemResponse[],
): readonly string[] =>
  projects
    .filter((project) =>
      project.imageAssets.some(
        (relation) =>
          relation.imageAssetId === imageAsset.id ||
          relation.imageAsset.id === imageAsset.id ||
          relation.imageAsset.filePath === imageAsset.filePath,
      ),
    )
    .map((project) => project.id);

const resolveImageAssetIdsFromExperienceCatalog = (
  imageAsset: ImageAssetRecord,
  experiences: readonly ExperienceCollectionItemResponse[],
): readonly string[] =>
  experiences
    .filter((experience) =>
      experience.imageAssets.some(
        (relation) =>
          relation.imageAssetId === imageAsset.id ||
          relation.imageAsset.id === imageAsset.id ||
          relation.imageAsset.filePath === imageAsset.filePath,
      ),
    )
    .map((experience) => experience.id);

const resolveImageAssetIdsFromTechnologyCatalog = (
  imageAsset: ImageAssetRecord,
  technologies: readonly TechnologyCollectionItemResponse[],
): readonly string[] =>
  technologies
    .filter((technology) =>
      (technology.imageAssets ?? []).some(
        (relation) => relation.imageAsset.filePath === imageAsset.filePath,
      ),
    )
    .map((technology) => technology.id);

const resolveProjectLabel = (
  projectId: string,
  projectMap: Map<string, ProjectCollectionItemResponse>,
): string => projectMap.get(projectId)?.titlePt ?? projectId;

const resolveExperienceLabel = (
  experienceId: string,
  experienceMap: Map<string, ExperienceCollectionItemResponse>,
): string => {
  const experience = experienceMap.get(experienceId);

  return experience ? `${experience.titlePt} (${experience.companyName})` : experienceId;
};

const resolveTechnologyLabel = (
  technologyId: string,
  technologyMap: Map<string, TechnologyCollectionItemResponse>,
): string => technologyMap.get(technologyId)?.name ?? technologyId;

const normalizeOptionalRelationIds = (
  relationIds: readonly string[],
): readonly string[] => [...new Set(relationIds)];

export const buildImageAssetCatalogOptions = (
  items: readonly (
    | ProjectCollectionItemResponse
    | ExperienceCollectionItemResponse
    | TechnologyCollectionItemResponse
    | FormationRecord
    | SpokenLanguageRecord
    | CustomerRecord
    | JobRecord
  )[],
): readonly ImageAssetCatalogOptionViewModel[] =>
  [...items].map(createImageAssetCatalogOptionViewModel).sort(sortCatalogOptions);

export const normalizeImageAssetProjectIds = (
  imageAsset: ImageAssetRecord,
  projects: readonly ProjectCollectionItemResponse[],
): readonly string[] => {
  const projectIds = new Set<string>();

  for (const projectId of imageAsset.projectIds ?? []) {
    appendUnique(projectIds, projectId);
  }

  for (const relation of imageAsset.projects ?? []) {
    appendUnique(projectIds, resolveImageAssetProjectIdFromRelation(relation));
  }

  for (const projectId of resolveImageAssetIdsFromProjectCatalog(imageAsset, projects)) {
    appendUnique(projectIds, projectId);
  }

  return [...projectIds];
};

export const normalizeImageAssetExperienceIds = (
  imageAsset: ImageAssetRecord,
  experiences: readonly ExperienceCollectionItemResponse[],
): readonly string[] => {
  const experienceIds = new Set<string>();

  for (const experienceId of imageAsset.experienceIds ?? []) {
    appendUnique(experienceIds, experienceId);
  }

  for (const relation of imageAsset.experiences ?? []) {
    appendUnique(experienceIds, resolveImageAssetExperienceIdFromRelation(relation));
  }

  for (const experienceId of resolveImageAssetIdsFromExperienceCatalog(imageAsset, experiences)) {
    appendUnique(experienceIds, experienceId);
  }

  return [...experienceIds];
};

export const normalizeImageAssetTechnologyIds = (
  imageAsset: ImageAssetRecord,
  technologies: readonly TechnologyCollectionItemResponse[],
): readonly string[] => {
  const technologyIds = new Set<string>();

  for (const technologyId of imageAsset.technologyIds ?? []) {
    appendUnique(technologyIds, technologyId);
  }

  for (const relation of imageAsset.technologies ?? []) {
    appendUnique(technologyIds, resolveImageAssetTechnologyIdFromRelation(relation));
  }

  for (const technologyId of resolveImageAssetIdsFromTechnologyCatalog(imageAsset, technologies)) {
    appendUnique(technologyIds, technologyId);
  }

  return [...technologyIds];
};

export const buildImageAssetsFormValue = (
  imageAsset: ImageAssetRecord | null | undefined,
  projects: readonly ProjectCollectionItemResponse[],
  experiences: readonly ExperienceCollectionItemResponse[],
  technologies: readonly TechnologyCollectionItemResponse[],
): ImageAssetsOperationsFormValue => {
  if (!imageAsset) {
    return createEmptyImageAssetsOperationsFormValue();
  }

  return {
    fileName: imageAsset.fileName,
    filePath: imageAsset.filePath,
    folder: imageAsset.folder,
    kind: imageAsset.kind ?? '',
    altPt: resolveImageAssetAltPt(imageAsset),
    altEn: resolveImageAssetAltEn(imageAsset),
    altEs: resolveImageAssetAltEs(imageAsset),
    captionPt: resolveImageAssetCaptionPt(imageAsset),
    captionEn: resolveImageAssetCaptionEn(imageAsset),
    captionEs: resolveImageAssetCaptionEs(imageAsset),
    mimeType: imageAsset.mimeType,
    width:
      imageAsset.width === null || imageAsset.width === undefined ? '' : String(imageAsset.width),
    height:
      imageAsset.height === null || imageAsset.height === undefined
        ? ''
        : String(imageAsset.height),
    sortOrder: String(imageAsset.sortOrder ?? 0),
    projectIds: normalizeImageAssetProjectIds(imageAsset, projects),
    experienceIds: normalizeImageAssetExperienceIds(imageAsset, experiences),
    technologyIds: normalizeImageAssetTechnologyIds(imageAsset, technologies),
    formationIds: normalizeOptionalRelationIds([
      ...(imageAsset.formationIds ?? []),
      ...(imageAsset.formations ?? []).map(resolveImageAssetFormationIdFromRelation).filter((id): id is string => !!id),
    ]),
    spokenLanguageIds: normalizeOptionalRelationIds([
      ...(imageAsset.spokenLanguageIds ?? []),
      ...(imageAsset.spokenLanguages ?? []).map(resolveImageAssetSpokenLanguageIdFromRelation).filter((id): id is string => !!id),
    ]),
    customerIds: normalizeOptionalRelationIds([
      ...(imageAsset.customerIds ?? []),
      ...(imageAsset.customers ?? []).map(resolveImageAssetCustomerIdFromRelation).filter((id): id is string => !!id),
    ]),
    jobIds: normalizeOptionalRelationIds([
      ...(imageAsset.jobIds ?? []),
      ...(imageAsset.jobs ?? []).map(resolveImageAssetJobIdFromRelation).filter((id): id is string => !!id),
    ]),
  };
};

export const buildImageAssetsViewModels = (
  imageAssets: readonly ImageAssetRecord[],
  projects: readonly ProjectCollectionItemResponse[],
  experiences: readonly ExperienceCollectionItemResponse[],
  technologies: readonly TechnologyCollectionItemResponse[],
  formations: readonly FormationRecord[] = [],
  spokenLanguages: readonly SpokenLanguageRecord[] = [],
  customers: readonly CustomerRecord[] = [],
  jobs: readonly JobRecord[] = [],
): readonly ImageAssetOperationsViewModel[] => {
  const projectMap = createProjectMap(projects);
  const experienceMap = createExperienceMap(experiences);
  const technologyMap = createTechnologyMap(technologies);
  const formationMap = new Map(formations.map((formation) => [formation.id, formation]));
  const spokenLanguageMap = new Map(spokenLanguages.map((language) => [language.id, language]));
  const customerMap = new Map(customers.map((customer) => [customer.id, customer]));
  const jobMap = new Map(jobs.map((job) => [job.id, job]));

  return [...imageAssets]
    .sort((left, right) => {
      const leftSortOrder = left.sortOrder ?? Number.MAX_SAFE_INTEGER;
      const rightSortOrder = right.sortOrder ?? Number.MAX_SAFE_INTEGER;

      if (leftSortOrder !== rightSortOrder) {
        return leftSortOrder - rightSortOrder;
      }

      return left.fileName.localeCompare(right.fileName);
    })
    .map((imageAsset) => {
      const projectIds = normalizeImageAssetProjectIds(imageAsset, projects);
      const experienceIds = normalizeImageAssetExperienceIds(imageAsset, experiences);
      const technologyIds = normalizeImageAssetTechnologyIds(imageAsset, technologies);
      const formationIds = normalizeOptionalRelationIds([
        ...(imageAsset.formationIds ?? []),
        ...(imageAsset.formations ?? [])
          .map(resolveImageAssetFormationIdFromRelation)
          .filter((id): id is string => !!id),
      ]);
      const spokenLanguageIds = normalizeOptionalRelationIds([
        ...(imageAsset.spokenLanguageIds ?? []),
        ...(imageAsset.spokenLanguages ?? [])
          .map(resolveImageAssetSpokenLanguageIdFromRelation)
          .filter((id): id is string => !!id),
      ]);
      const customerIds = normalizeOptionalRelationIds([
        ...(imageAsset.customerIds ?? []),
        ...(imageAsset.customers ?? [])
          .map(resolveImageAssetCustomerIdFromRelation)
          .filter((id): id is string => !!id),
      ]);
      const jobIds = normalizeOptionalRelationIds([
        ...(imageAsset.jobIds ?? []),
        ...(imageAsset.jobs ?? [])
          .map(resolveImageAssetJobIdFromRelation)
          .filter((id): id is string => !!id),
      ]);

      return {
        id: imageAsset.id,
        fileName: imageAsset.fileName,
        filePath: imageAsset.filePath,
        folder: imageAsset.folder,
        kind: imageAsset.kind ?? '',
        altPt: resolveImageAssetAltPt(imageAsset),
        altEn: resolveImageAssetAltEn(imageAsset),
        altEs: resolveImageAssetAltEs(imageAsset),
        captionPt: resolveImageAssetCaptionPt(imageAsset),
        captionEn: resolveImageAssetCaptionEn(imageAsset),
        captionEs: resolveImageAssetCaptionEs(imageAsset),
        mimeType: imageAsset.mimeType,
        dimensionsLabel:
          imageAsset.width && imageAsset.height
            ? `${imageAsset.width} x ${imageAsset.height}`
            : '-',
        sortOrderLabel: String(imageAsset.sortOrder ?? 0),
        projectLabels: projectIds.map((projectId) => resolveProjectLabel(projectId, projectMap)),
        experienceLabels: experienceIds.map((experienceId) =>
          resolveExperienceLabel(experienceId, experienceMap),
        ),
        technologyLabels: technologyIds.map((technologyId) =>
          resolveTechnologyLabel(technologyId, technologyMap),
        ),
        formationLabels: formationIds.map((id) => formationMap.get(id)?.titlePt ?? id),
        spokenLanguageLabels: spokenLanguageIds.map(
          (id) => spokenLanguageMap.get(id)?.namePt ?? id,
        ),
        customerLabels: customerIds.map((id) => customerMap.get(id)?.name ?? id),
        jobLabels: jobIds.map((id) => jobMap.get(id)?.namePt ?? id),
      };
    });
};

const parseOptionalNumber = (value: string): number | null | 'invalid' => {
  const normalized = value.trim();

  if (!normalized) {
    return null;
  }

  const parsed = Number.parseInt(normalized, 10);
  return Number.isInteger(parsed) ? parsed : 'invalid';
};

export const buildImageAssetsMutationPayload = (
  formValue: ImageAssetsOperationsFormValue,
): ImageAssetsMutationBuildResult => {
  const fileName = formValue.fileName.trim();
  const filePath = formValue.filePath.trim();
  const folder = formValue.folder.trim();
  const kind = formValue.kind.trim().toUpperCase();
  const mimeType = formValue.mimeType.trim();
  const sortOrder = Number.parseInt(formValue.sortOrder.trim(), 10);
  const width = parseOptionalNumber(formValue.width);
  const height = parseOptionalNumber(formValue.height);

  if (!fileName) {
    return {
      isValid: false,
      errorKey: 'pages.admin.imageAssets.feedback.requiredFileName',
    };
  }

  if (!filePath) {
    return {
      isValid: false,
      errorKey: 'pages.admin.imageAssets.feedback.requiredFilePath',
    };
  }

  if (!folder) {
    return {
      isValid: false,
      errorKey: 'pages.admin.imageAssets.feedback.requiredFolder',
    };
  }

  if (!kind) {
    return {
      isValid: false,
      errorKey: 'pages.admin.imageAssets.feedback.requiredKind',
    };
  }

  if (!IMAGE_ASSET_KIND_VALUES.includes(kind as (typeof IMAGE_ASSET_KIND_VALUES)[number])) {
    return {
      isValid: false,
      errorKey: 'pages.admin.imageAssets.feedback.invalidKind',
    };
  }

  if (!mimeType) {
    return {
      isValid: false,
      errorKey: 'pages.admin.imageAssets.feedback.requiredMimeType',
    };
  }

  if (!Number.isInteger(sortOrder)) {
    return {
      isValid: false,
      errorKey: 'common.feedback.invalidIntegerSortOrder',
    };
  }

  if (width === 'invalid' || height === 'invalid') {
    return {
      isValid: false,
      errorKey: 'pages.admin.imageAssets.feedback.invalidDimensions',
    };
  }

  return {
    isValid: true,
    payload: {
      fileName,
      filePath,
      folder,
      kind,
      altPt: formValue.altPt.trim(),
      altEn: formValue.altEn.trim(),
      altEs: formValue.altEs?.trim() ?? '',
      captionPt: formValue.captionPt.trim(),
      captionEn: formValue.captionEn.trim(),
      captionEs: formValue.captionEs?.trim() ?? '',
      mimeType,
      width,
      height,
      sortOrder,
      projectIds: [...new Set(formValue.projectIds)],
      experienceIds: [...new Set(formValue.experienceIds)],
      technologyIds: [...new Set(formValue.technologyIds)],
      formationIds: [...new Set(formValue.formationIds)],
      spokenLanguageIds: [...new Set(formValue.spokenLanguageIds)],
      customerIds: [...new Set(formValue.customerIds)],
      jobIds: [...new Set(formValue.jobIds)],
    },
  };
};
