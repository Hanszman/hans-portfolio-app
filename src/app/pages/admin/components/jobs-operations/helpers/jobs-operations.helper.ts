import { ImageAssetRecord } from '../../../../../core/api/admin/image-assets/image-assets-operations.types';
import { JobRecord } from '../../../../../core/api/admin/jobs/jobs-operations.types';
import { ExperienceCollectionItemResponse } from '../../../../../core/api/experiences/experiences.types';
import {
  JobExperienceOptionViewModel,
  JobImageAssetOptionViewModel,
  JobOperationsViewModel,
  JobsMutationBuildResult,
  JobsOperationsFormValue,
  createEmptyJobsOperationsFormValue,
  createJobExperienceOptionViewModel,
  createJobImageAssetOptionViewModel,
  resolveJobExperienceIdFromRelation,
  resolveJobImageAssetIdFromRelation,
  resolveJobImageAssetLabel,
} from '../jobs-operations.types';

const sortExperienceOptions = (
  left: JobExperienceOptionViewModel,
  right: JobExperienceOptionViewModel,
): number => left.title.localeCompare(right.title);

const sortImageAssetOptions = (
  left: JobImageAssetOptionViewModel,
  right: JobImageAssetOptionViewModel,
): number => left.title.localeCompare(right.title);

const appendUnique = (collection: Set<string>, value: string | null | undefined): void => {
  if (value) {
    collection.add(value);
  }
};

const createExperienceMap = (
  experiences: readonly ExperienceCollectionItemResponse[],
): Map<string, ExperienceCollectionItemResponse> =>
  new Map(experiences.map((experience) => [experience.id, experience]));

const createImageAssetMap = (
  imageAssets: readonly ImageAssetRecord[],
): Map<string, ImageAssetRecord> =>
  new Map(imageAssets.map((imageAsset) => [imageAsset.id, imageAsset]));

const resolveJobExperienceIdsFromCatalog = (
  job: JobRecord,
  experiences: readonly ExperienceCollectionItemResponse[],
): readonly string[] =>
  experiences
    .filter((experience) =>
      experience.jobs.some(
        (relation) =>
          relation.jobId === job.id ||
          relation.job.id === job.id ||
          relation.job.slug === job.slug,
      ),
    )
    .map((experience) => experience.id);

const resolveJobImageAssetIdsFromCatalog = (
  job: JobRecord,
  imageAssets: readonly ImageAssetRecord[],
): readonly string[] =>
  imageAssets
    .filter((imageAsset) => (imageAsset.jobIds ?? []).includes(job.id))
    .map((imageAsset) => imageAsset.id);

const resolveExperienceLabel = (
  experienceId: string,
  experienceMap: Map<string, ExperienceCollectionItemResponse>,
): string => {
  const experience = experienceMap.get(experienceId);

  return experience ? `${experience.titlePt} (${experience.companyName})` : experienceId;
};

const resolveImageAssetLabel = (
  imageAssetId: string,
  imageAssetMap: Map<string, ImageAssetRecord>,
): string => {
  const imageAsset = imageAssetMap.get(imageAssetId);

  return imageAsset ? resolveJobImageAssetLabel(imageAsset) : imageAssetId;
};

export const buildJobExperienceOptions = (
  experiences: readonly ExperienceCollectionItemResponse[],
): readonly JobExperienceOptionViewModel[] =>
  [...experiences].map(createJobExperienceOptionViewModel).sort(sortExperienceOptions);

export const buildJobImageAssetOptions = (
  imageAssets: readonly ImageAssetRecord[],
): readonly JobImageAssetOptionViewModel[] =>
  [...imageAssets].map(createJobImageAssetOptionViewModel).sort(sortImageAssetOptions);

export const normalizeJobExperienceIds = (
  job: JobRecord,
  experiences: readonly ExperienceCollectionItemResponse[],
): readonly string[] => {
  const experienceIds = new Set<string>();

  for (const experienceId of job.experienceIds ?? []) {
    appendUnique(experienceIds, experienceId);
  }

  for (const relation of job.experiences ?? []) {
    appendUnique(experienceIds, resolveJobExperienceIdFromRelation(relation));
  }

  for (const experienceId of resolveJobExperienceIdsFromCatalog(job, experiences)) {
    appendUnique(experienceIds, experienceId);
  }

  return [...experienceIds];
};

export const normalizeJobImageAssetIds = (
  job: JobRecord,
  imageAssets: readonly ImageAssetRecord[],
): readonly string[] => {
  const imageAssetIds = new Set<string>();

  for (const imageAssetId of job.imageAssetIds ?? []) {
    appendUnique(imageAssetIds, imageAssetId);
  }

  for (const relation of job.imageAssets ?? []) {
    appendUnique(imageAssetIds, resolveJobImageAssetIdFromRelation(relation));
  }

  for (const imageAssetId of resolveJobImageAssetIdsFromCatalog(job, imageAssets)) {
    appendUnique(imageAssetIds, imageAssetId);
  }

  return [...imageAssetIds];
};

export const buildJobsFormValue = (
  job: JobRecord | null | undefined,
  experiences: readonly ExperienceCollectionItemResponse[],
  imageAssets: readonly ImageAssetRecord[],
): JobsOperationsFormValue => {
  if (!job) {
    return createEmptyJobsOperationsFormValue();
  }

  return {
    slug: job.slug,
    namePt: job.namePt,
    nameEn: job.nameEn,
    summaryPt: job.summaryPt,
    summaryEn: job.summaryEn,
    highlight: job.highlight ?? false,
    sortOrder: String(job.sortOrder ?? 0),
    experienceIds: normalizeJobExperienceIds(job, experiences),
    imageAssetIds: normalizeJobImageAssetIds(job, imageAssets),
  };
};

export const buildJobsViewModels = (
  jobs: readonly JobRecord[],
  experiences: readonly ExperienceCollectionItemResponse[],
  imageAssets: readonly ImageAssetRecord[],
): readonly JobOperationsViewModel[] => {
  const experienceMap = createExperienceMap(experiences);
  const imageAssetMap = createImageAssetMap(imageAssets);

  return [...jobs]
    .sort((left, right) => {
      const leftSortOrder = left.sortOrder ?? Number.MAX_SAFE_INTEGER;
      const rightSortOrder = right.sortOrder ?? Number.MAX_SAFE_INTEGER;

      if (leftSortOrder !== rightSortOrder) {
        return leftSortOrder - rightSortOrder;
      }

      return left.namePt.localeCompare(right.namePt);
    })
    .map((job) => {
      const experienceIds = normalizeJobExperienceIds(job, experiences);
      const imageAssetIds = normalizeJobImageAssetIds(job, imageAssets);

      return {
        id: job.id,
        slug: job.slug,
        namePt: job.namePt,
        nameEn: job.nameEn,
        summaryPt: job.summaryPt,
        summaryEn: job.summaryEn,
        highlight: job.highlight ?? false,
        sortOrderLabel: String(job.sortOrder ?? 0),
        experienceLabels: experienceIds.map((experienceId) =>
          resolveExperienceLabel(experienceId, experienceMap),
        ),
        imageAssetLabels: imageAssetIds.map((imageAssetId) =>
          resolveImageAssetLabel(imageAssetId, imageAssetMap),
        ),
        experienceIds,
        imageAssetIds,
      };
    });
};

export const buildJobsMutationPayload = (
  formValue: JobsOperationsFormValue,
): JobsMutationBuildResult => {
  const slug = formValue.slug.trim();
  const namePt = formValue.namePt.trim();
  const nameEn = formValue.nameEn.trim();
  const summaryPt = formValue.summaryPt.trim();
  const summaryEn = formValue.summaryEn.trim();
  const sortOrder = Number.parseInt(formValue.sortOrder.trim(), 10);

  if (!slug) {
    return {
      isValid: false,
      errorKey: 'pages.admin.jobs.feedback.requiredSlug',
    };
  }

  if (!namePt) {
    return {
      isValid: false,
      errorKey: 'pages.admin.jobs.feedback.requiredNamePt',
    };
  }

  if (!nameEn) {
    return {
      isValid: false,
      errorKey: 'pages.admin.jobs.feedback.requiredNameEn',
    };
  }

  if (!summaryPt) {
    return {
      isValid: false,
      errorKey: 'pages.admin.jobs.feedback.requiredSummaryPt',
    };
  }

  if (!summaryEn) {
    return {
      isValid: false,
      errorKey: 'pages.admin.jobs.feedback.requiredSummaryEn',
    };
  }

  if (!Number.isInteger(sortOrder)) {
    return {
      isValid: false,
      errorKey: 'pages.admin.jobs.feedback.invalidSortOrder',
    };
  }

  return {
    isValid: true,
    payload: {
      slug,
      namePt,
      nameEn,
      summaryPt,
      summaryEn,
      highlight: formValue.highlight,
      sortOrder,
      experienceIds: [...new Set(formValue.experienceIds)],
      imageAssetIds: [...new Set(formValue.imageAssetIds)],
    },
  };
};
