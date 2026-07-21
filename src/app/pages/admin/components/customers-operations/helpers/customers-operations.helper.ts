import { ImageAssetRecord } from '../../../../../core/api/admin/image-assets/image-assets-operations.types';
import {
  CustomerMutationPayload,
  CustomerRecord,
} from '../../../../../core/api/admin/customers/customers-operations.types';
import { ExperienceCollectionItemResponse } from '../../../../../core/api/experiences/experiences.types';
import {
  CustomerExperienceOptionViewModel,
  CustomerImageAssetOptionViewModel,
  CustomerOperationsViewModel,
  CustomersMutationBuildResult,
  CustomersOperationsFormValue,
  createCustomerExperienceOptionViewModel,
  createCustomerImageAssetOptionViewModel,
  createEmptyCustomersOperationsFormValue,
  resolveCustomerExperienceIdFromRelation,
  resolveCustomerImageAssetIdFromRelation,
  resolveCustomerImageAssetLabel,
} from '../customers-operations.types';

const sortExperienceOptions = (
  left: CustomerExperienceOptionViewModel,
  right: CustomerExperienceOptionViewModel,
): number => left.title.localeCompare(right.title);

const sortImageAssetOptions = (
  left: CustomerImageAssetOptionViewModel,
  right: CustomerImageAssetOptionViewModel,
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

const resolveCustomerExperienceIdsFromCatalog = (
  customer: CustomerRecord,
  experiences: readonly ExperienceCollectionItemResponse[],
): readonly string[] =>
  experiences
    .filter((experience) =>
      experience.customers.some(
        (relation) =>
          relation.customerId === customer.id ||
          relation.customer.id === customer.id ||
          relation.customer.slug === customer.slug,
      ),
    )
    .map((experience) => experience.id);

const resolveCustomerImageAssetIdsFromCatalog = (
  customer: CustomerRecord,
  imageAssets: readonly ImageAssetRecord[],
): readonly string[] =>
  imageAssets
    .filter((imageAsset) => (imageAsset.customerIds ?? []).includes(customer.id))
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

  return imageAsset ? resolveCustomerImageAssetLabel(imageAsset) : imageAssetId;
};

export const buildCustomerExperienceOptions = (
  experiences: readonly ExperienceCollectionItemResponse[],
): readonly CustomerExperienceOptionViewModel[] =>
  [...experiences].map(createCustomerExperienceOptionViewModel).sort(sortExperienceOptions);

export const buildCustomerImageAssetOptions = (
  imageAssets: readonly ImageAssetRecord[],
): readonly CustomerImageAssetOptionViewModel[] =>
  [...imageAssets].map(createCustomerImageAssetOptionViewModel).sort(sortImageAssetOptions);

export const normalizeCustomerExperienceIds = (
  customer: CustomerRecord,
  experiences: readonly ExperienceCollectionItemResponse[],
): readonly string[] => {
  const experienceIds = new Set<string>();

  for (const experienceId of customer.experienceIds ?? []) {
    appendUnique(experienceIds, experienceId);
  }

  for (const relation of customer.experiences ?? []) {
    appendUnique(experienceIds, resolveCustomerExperienceIdFromRelation(relation));
  }

  for (const experienceId of resolveCustomerExperienceIdsFromCatalog(customer, experiences)) {
    appendUnique(experienceIds, experienceId);
  }

  return [...experienceIds];
};

export const normalizeCustomerImageAssetIds = (
  customer: CustomerRecord,
  imageAssets: readonly ImageAssetRecord[],
): readonly string[] => {
  const imageAssetIds = new Set<string>();

  for (const imageAssetId of customer.imageAssetIds ?? []) {
    appendUnique(imageAssetIds, imageAssetId);
  }

  for (const relation of customer.imageAssets ?? []) {
    appendUnique(imageAssetIds, resolveCustomerImageAssetIdFromRelation(relation));
  }

  for (const imageAssetId of resolveCustomerImageAssetIdsFromCatalog(customer, imageAssets)) {
    appendUnique(imageAssetIds, imageAssetId);
  }

  return [...imageAssetIds];
};

export const buildCustomersFormValue = (
  customer: CustomerRecord | null | undefined,
  experiences: readonly ExperienceCollectionItemResponse[],
  imageAssets: readonly ImageAssetRecord[],
): CustomersOperationsFormValue => {
  if (!customer) {
    return createEmptyCustomersOperationsFormValue();
  }

  return {
    slug: customer.slug,
    name: customer.name,
    summaryPt: customer.summaryPt,
    summaryEn: customer.summaryEn,
    highlight: customer.highlight ?? false,
    sortOrder: String(customer.sortOrder ?? 0),
    experienceIds: normalizeCustomerExperienceIds(customer, experiences),
    imageAssetIds: normalizeCustomerImageAssetIds(customer, imageAssets),
  };
};

export const buildCustomersViewModels = (
  customers: readonly CustomerRecord[],
  experiences: readonly ExperienceCollectionItemResponse[],
  imageAssets: readonly ImageAssetRecord[],
): readonly CustomerOperationsViewModel[] => {
  const experienceMap = createExperienceMap(experiences);
  const imageAssetMap = createImageAssetMap(imageAssets);

  return [...customers]
    .sort((left, right) => {
      const leftSortOrder = left.sortOrder ?? Number.MAX_SAFE_INTEGER;
      const rightSortOrder = right.sortOrder ?? Number.MAX_SAFE_INTEGER;

      if (leftSortOrder !== rightSortOrder) {
        return leftSortOrder - rightSortOrder;
      }

      return left.name.localeCompare(right.name);
    })
    .map((customer) => {
      const experienceIds = normalizeCustomerExperienceIds(customer, experiences);
      const imageAssetIds = normalizeCustomerImageAssetIds(customer, imageAssets);

      return {
        id: customer.id,
        slug: customer.slug,
        name: customer.name,
        summaryPt: customer.summaryPt,
        summaryEn: customer.summaryEn,
        highlight: customer.highlight ?? false,
        sortOrderLabel: String(customer.sortOrder ?? 0),
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

export const buildCustomersMutationPayload = (
  formValue: CustomersOperationsFormValue,
): CustomersMutationBuildResult => {
  const slug = formValue.slug.trim();
  const name = formValue.name.trim();
  const summaryPt = formValue.summaryPt.trim();
  const summaryEn = formValue.summaryEn.trim();
  const sortOrder = Number.parseInt(formValue.sortOrder.trim(), 10);

  if (!slug) {
    return {
      isValid: false,
      errorKey: 'pages.admin.customers.feedback.requiredSlug',
    };
  }

  if (!name) {
    return {
      isValid: false,
      errorKey: 'pages.admin.customers.feedback.requiredName',
    };
  }

  if (!summaryPt) {
    return {
      isValid: false,
      errorKey: 'pages.admin.customers.feedback.requiredSummaryPt',
    };
  }

  if (!summaryEn) {
    return {
      isValid: false,
      errorKey: 'pages.admin.customers.feedback.requiredSummaryEn',
    };
  }

  if (!Number.isInteger(sortOrder)) {
    return {
      isValid: false,
      errorKey: 'pages.admin.customers.feedback.invalidSortOrder',
    };
  }

  return {
    isValid: true,
    payload: {
      slug,
      name,
      summaryPt,
      summaryEn,
      highlight: formValue.highlight,
      sortOrder,
      experienceIds: [...new Set(formValue.experienceIds)],
      imageAssetIds: [...new Set(formValue.imageAssetIds)],
    } satisfies CustomerMutationPayload,
  };
};
