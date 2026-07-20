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
