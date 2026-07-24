import { AdminAuthenticatedUser } from '../../../core/api/admin/admin-auth/admin-auth.types';
import { ImageAssetRecord } from '../../../core/api/admin/image-assets/image-assets-operations.types';
import { buildAssetUrl } from '../../../core/api/api.config';
import { AppTranslationKey } from '../../../core/translation/translation.types';
import {
  AdminFormFieldConfig,
  AdminEntityDefinition,
  AdminEntityOperation,
  AdminSessionFactDefinition,
  asAdminTranslationKey,
} from '../admin.types';

export const formatAdminIdentity = (
  user: AdminAuthenticatedUser | null,
): string => (user ? `${user.name} · ${user.role}` : '');

export const resolveAdminFieldLabel = (
  field: AdminFormFieldConfig,
  translate: (key: AppTranslationKey) => string,
): string => {
  const label = translate(field.labelKey);

  return field.required ? `${label} *` : label;
};

export const createAdminFieldLabelResolver = <
  TFields extends Record<string, AdminFormFieldConfig>,
>(
  fields: TFields,
  translate: (key: AppTranslationKey) => string,
) => (fieldKey: keyof TFields): string =>
  resolveAdminFieldLabel(fields[fieldKey], translate);

export const resolveAdminSelectValue = (event: Event): string => {
  const customEvent = event as Event & {
    detail?: string | { value?: string };
    target: (EventTarget & { value?: string }) | null;
  };

  if (typeof customEvent.detail === 'string') {
    return customEvent.detail;
  }

  if (
    customEvent.detail &&
    typeof customEvent.detail === 'object' &&
    typeof customEvent.detail.value === 'string'
  ) {
    return customEvent.detail.value;
  }

  if (customEvent.target && typeof customEvent.target.value === 'string') {
    return customEvent.target.value;
  }

  return '';
};

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const ISO_DATETIME_PREFIX_PATTERN = /^\d{4}-\d{2}-\d{2}T/;
const LOCALIZED_DATE_PATTERN = /^(\d{2})\/(\d{2})\/(\d{4})$/;

export const normalizeAdminDateValueForPicker = (value: string | null | undefined): string => {
  const normalizedValue = value?.trim() ?? '';

  if (!normalizedValue) {
    return '';
  }

  if (ISO_DATE_PATTERN.test(normalizedValue)) {
    return normalizedValue;
  }

  if (ISO_DATETIME_PREFIX_PATTERN.test(normalizedValue)) {
    return normalizedValue.slice(0, 10);
  }

  const localizedMatch = normalizedValue.match(LOCALIZED_DATE_PATTERN);

  if (localizedMatch) {
    const [, day, month, year] = localizedMatch;
    return `${year}-${month}-${day}`;
  }

  return normalizedValue;
};

export const normalizeAdminDateValueForMutation = (
  value: string | null | undefined,
): string => {
  const normalizedValue = value?.trim() ?? '';

  if (!normalizedValue) {
    return '';
  }

  if (ISO_DATE_PATTERN.test(normalizedValue)) {
    return `${normalizedValue}T00:00:00.000Z`;
  }

  if (ISO_DATETIME_PREFIX_PATTERN.test(normalizedValue)) {
    return normalizedValue;
  }

  const localizedMatch = normalizedValue.match(LOCALIZED_DATE_PATTERN);

  if (localizedMatch) {
    const [, day, month, year] = localizedMatch;
    return `${year}-${month}-${day}T00:00:00.000Z`;
  }

  return normalizedValue;
};

export interface AdminSelectOptionDefinition<TValue extends string = string> {
  readonly id: TValue;
  readonly labelKey: AppTranslationKey;
  readonly value: TValue;
}

export interface AdminSelectOptionViewModel<TValue extends string = string> {
  readonly id: TValue;
  readonly label: string;
  readonly value: TValue;
}

export const createAdminSelectOptionDefinitions = <TValue extends string>(
  values: readonly TValue[],
  resolveLabelKey: (value: TValue) => AppTranslationKey,
): readonly AdminSelectOptionDefinition<TValue>[] =>
  values.map((value) => ({
    id: value,
    labelKey: resolveLabelKey(value),
    value,
  }));

export const translateAdminSelectOptions = <TValue extends string>(
  options: readonly AdminSelectOptionDefinition<TValue>[],
  translate: (key: AppTranslationKey) => string,
): readonly AdminSelectOptionViewModel<TValue>[] =>
  options.map((option) => ({
    id: option.id,
    label: translate(option.labelKey),
    value: option.value,
  }));

export const trackAdminItemById = (
  index: number,
  item: { id: string },
): string => item.id;

export interface AdminImageAssetOptionViewModel {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly imageUrl: string;
}

export const createAdminImageAssetOptionViewModel = (
  imageAsset: ImageAssetRecord,
): AdminImageAssetOptionViewModel => ({
  id: imageAsset.id,
  title: imageAsset.fileName,
  subtitle: imageAsset.filePath,
  imageUrl: buildAssetUrl(imageAsset.filePath),
});

export const resolveAdminImageAssetLabel = (imageAsset: ImageAssetRecord): string =>
  `${imageAsset.fileName} (${imageAsset.kind})`;

export interface AdminEntityViewModel {
  readonly id: AdminEntityDefinition['id'];
  readonly endpoint: string;
  readonly substep: string;
  readonly relationModeLabel: string;
  readonly title: string;
  readonly description: string;
  readonly operations: readonly AdminEntityOperationViewModel[];
}

export interface AdminEntityOperationViewModel {
  readonly id: AdminEntityOperation;
  readonly label: string;
}

export interface AdminSessionFactViewModel {
  readonly id: AdminSessionFactDefinition['id'];
  readonly title: string;
  readonly description: string;
}

export const buildAdminEntityViewModels = (
  entities: readonly AdminEntityDefinition[],
  translate: (key: AppTranslationKey) => string,
  operations: readonly AdminEntityOperation[],
): readonly AdminEntityViewModel[] =>
  entities.map((entity) => ({
    id: entity.id,
    endpoint: entity.endpoint,
    substep: entity.substep,
    relationModeLabel: translate(
      asAdminTranslationKey(`pages.admin.relationMode.${entity.relationMode}`),
    ),
    title: translate(
      asAdminTranslationKey(`pages.admin.entities.${entity.id}.title`),
    ),
    description: translate(
      asAdminTranslationKey(`pages.admin.entities.${entity.id}.description`),
    ),
    operations: operations.map((operation) => ({
      id: operation,
      label: translate(
        asAdminTranslationKey(`pages.admin.operations.${operation}`),
      ),
    })),
  }));

export const buildAdminSessionFactViewModels = (
  facts: readonly AdminSessionFactDefinition[],
  translate: (key: AppTranslationKey) => string,
): readonly AdminSessionFactViewModel[] =>
  facts.map((fact) => ({
    id: fact.id,
    title: translate(asAdminTranslationKey(`pages.admin.facts.${fact.id}.title`)),
    description: translate(
      asAdminTranslationKey(`pages.admin.facts.${fact.id}.description`),
    ),
  }));
