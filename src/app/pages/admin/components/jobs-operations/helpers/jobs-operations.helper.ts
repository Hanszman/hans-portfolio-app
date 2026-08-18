import { JobRecord } from '../../../../../core/api/jobs/jobs.types';
import { ExperienceCollectionItemResponse } from '../../../../../core/api/experiences/experiences.types';
import {
  normalizeAdminDateValueForMutation,
  normalizeAdminDateValueForPicker,
  validateAdminDateRange,
} from '../../../helpers/admin.helper';
import {
  JobExperienceOptionViewModel,
  JobOperationsViewModel,
  JobsMutationBuildResult,
  JobsOperationsFormValue,
  createEmptyJobsOperationsFormValue,
  createJobExperienceOptionViewModel,
  resolveJobExperienceIdFromRelation,
} from '../jobs-operations.types';

const sortExperienceOptions = (
  left: JobExperienceOptionViewModel,
  right: JobExperienceOptionViewModel,
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

const resolveExperienceLabel = (
  experienceId: string,
  experienceMap: Map<string, ExperienceCollectionItemResponse>,
): string => {
  const experience = experienceMap.get(experienceId);

  return experience ? `${experience.titlePt} (${experience.companyName})` : experienceId;
};

export const buildJobExperienceOptions = (
  experiences: readonly ExperienceCollectionItemResponse[],
): readonly JobExperienceOptionViewModel[] =>
  [...experiences].map(createJobExperienceOptionViewModel).sort(sortExperienceOptions);

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

export const buildJobsFormValue = (
  job: JobRecord | null | undefined,
  experiences: readonly ExperienceCollectionItemResponse[],
): JobsOperationsFormValue => {
  if (!job) {
    return createEmptyJobsOperationsFormValue();
  }

  return {
    slug: job.slug,
    namePt: job.namePt,
    nameEn: job.nameEn,
    nameEs: job.nameEs ?? '',
    summaryPt: job.summaryPt ?? '',
    summaryEn: job.summaryEn ?? '',
    summaryEs: job.summaryEs ?? '',
    startDate: normalizeAdminDateValueForPicker(job.startDate),
    endDate: normalizeAdminDateValueForPicker(job.endDate),
    highlight: job.highlight ?? false,
    sortOrder: String(job.sortOrder ?? 0),
    experienceIds: normalizeJobExperienceIds(job, experiences),
  };
};

export const buildJobsViewModels = (
  jobs: readonly JobRecord[],
  experiences: readonly ExperienceCollectionItemResponse[],
): readonly JobOperationsViewModel[] => {
  const experienceMap = createExperienceMap(experiences);

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

      return {
        id: job.id,
        slug: job.slug,
        namePt: job.namePt,
        nameEn: job.nameEn,
        nameEs: job.nameEs ?? '',
        summaryPt: job.summaryPt ?? '',
        summaryEn: job.summaryEn ?? '',
        summaryEs: job.summaryEs ?? '',
        startDate: job.startDate,
        endDateLabel: job.endDate ?? '-',
        highlight: job.highlight ?? false,
        sortOrderLabel: String(job.sortOrder ?? 0),
        experienceLabels: experienceIds.map((experienceId) =>
          resolveExperienceLabel(experienceId, experienceMap),
        ),
        experienceIds,
      };
    });
};

export const buildJobsMutationPayload = (
  formValue: JobsOperationsFormValue,
): JobsMutationBuildResult => {
  const slug = formValue.slug.trim();
  const namePt = formValue.namePt.trim();
  const nameEn = formValue.nameEn.trim();
  const nameEs = formValue.nameEs?.trim() ?? nameEn;
  const summaryPt = formValue.summaryPt.trim();
  const summaryEn = formValue.summaryEn.trim();
  const summaryEs = formValue.summaryEs?.trim() ?? summaryEn;
  const startDate = normalizeAdminDateValueForMutation(formValue.startDate);
  const endDate = normalizeAdminDateValueForMutation(formValue.endDate);
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

  if (!nameEs) {
    return { isValid: false, errorKey: 'common.feedback.requiredSpanishName' };
  }

  if (!startDate) {
    return { isValid: false, errorKey: 'common.feedback.requiredStartDate' };
  }

  const dateRangeValidation = validateAdminDateRange(
    startDate,
    endDate,
    'common.feedback.invalidDateRange',
  );

  if (!dateRangeValidation.isValid) {
    return dateRangeValidation;
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
      namePt,
      nameEn,
      nameEs,
      summaryPt: summaryPt || null,
      summaryEn: summaryEn || null,
      summaryEs: summaryEs || null,
      startDate,
      ...(endDate ? { endDate } : {}),
      highlight: formValue.highlight,
      sortOrder,
      experienceIds: [...new Set(formValue.experienceIds)],
    },
  };
};
