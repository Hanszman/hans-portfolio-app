import { ImageAssetRecord } from '../../../../core/api/admin/image-assets/image-assets-operations.types';
import {
  CustomerExperienceRelationRecord,
  CustomerImageAssetRelationRecord,
  CustomerMutationPayload,
} from '../../../../core/api/admin/customers/customers-operations.types';
import { ExperienceCollectionItemResponse } from '../../../../core/api/experiences/experiences.types';
import { AppTranslationKey } from '../../../../core/translation/translation.types';
import { AdminFormFieldConfig } from '../../admin.types';
import {
  AdminImageAssetOptionViewModel,
  createAdminImageAssetOptionViewModel,
  resolveAdminImageAssetLabel,
} from '../../helpers/admin.helper';

export type CustomersOperationsModalMode =
  | 'create'
  | 'read'
  | 'pick-update'
  | 'pick-delete'
  | 'update'
  | 'delete';

export interface CustomersOperationsFormValue {
  slug: string;
  name: string;
  summaryPt: string;
  summaryEn: string;
  highlight: boolean;
  sortOrder: string;
  isPublished: boolean;
  experienceIds: readonly string[];
  imageAssetIds: readonly string[];
}

export const CUSTOMERS_OPERATIONS_FIELDS = {
  slug: {
    labelKey: 'pages.admin.customers.fields.slug.label',
    placeholderKey: 'pages.admin.customers.fields.slug.placeholder',
    required: true,
  },
  name: {
    labelKey: 'pages.admin.customers.fields.name.label',
    placeholderKey: 'pages.admin.customers.fields.name.placeholder',
    required: true,
  },
  summaryPt: {
    labelKey: 'pages.admin.customers.fields.summaryPt.label',
    placeholderKey: 'pages.admin.customers.fields.summaryPt.placeholder',
    required: true,
  },
  summaryEn: {
    labelKey: 'pages.admin.customers.fields.summaryEn.label',
    placeholderKey: 'pages.admin.customers.fields.summaryEn.placeholder',
    required: true,
  },
  sortOrder: {
    labelKey: 'pages.admin.customers.fields.sortOrder.label',
    placeholderKey: 'pages.admin.customers.fields.sortOrder.placeholder',
    required: true,
  },
} as const satisfies Record<string, AdminFormFieldConfig>;

export interface CustomerExperienceOptionViewModel {
  id: string;
  title: string;
  subtitle: string;
}

export type CustomerImageAssetOptionViewModel = AdminImageAssetOptionViewModel;

export interface CustomerOperationsViewModel {
  id: string;
  slug: string;
  name: string;
  summaryPt: string;
  summaryEn: string;
  highlight: boolean;
  isPublished: boolean;
  sortOrderLabel: string;
  experienceLabels: readonly string[];
  imageAssetLabels: readonly string[];
  experienceIds: readonly string[];
  imageAssetIds: readonly string[];
}

export interface CustomersMutationBuildSuccess {
  isValid: true;
  payload: CustomerMutationPayload;
}

export interface CustomersMutationBuildFailure {
  isValid: false;
  errorKey: AppTranslationKey;
}

export type CustomersMutationBuildResult =
  | CustomersMutationBuildSuccess
  | CustomersMutationBuildFailure;

export const createEmptyCustomersOperationsFormValue =
  (): CustomersOperationsFormValue => ({
    slug: '',
    name: '',
    summaryPt: '',
    summaryEn: '',
    highlight: true,
    sortOrder: '0',
    isPublished: true,
    experienceIds: [],
    imageAssetIds: [],
  });

export const createCustomerExperienceOptionViewModel = (
  experience: ExperienceCollectionItemResponse,
): CustomerExperienceOptionViewModel => ({
  id: experience.id,
  title: experience.titlePt,
  subtitle: experience.companyName,
});

export const createCustomerImageAssetOptionViewModel = (
  imageAsset: ImageAssetRecord,
): CustomerImageAssetOptionViewModel => createAdminImageAssetOptionViewModel(imageAsset);

export const resolveCustomerExperienceIdFromRelation = (
  relation: CustomerExperienceRelationRecord,
): string | null => relation.experienceId ?? relation.experience?.id ?? null;

export const resolveCustomerImageAssetIdFromRelation = (
  relation: CustomerImageAssetRelationRecord,
): string | null => relation.imageAssetId ?? relation.imageAsset?.id ?? null;

export const resolveCustomerImageAssetLabel = (imageAsset: ImageAssetRecord): string =>
  resolveAdminImageAssetLabel(imageAsset);
