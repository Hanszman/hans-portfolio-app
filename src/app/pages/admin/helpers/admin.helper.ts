import { AdminAuthenticatedUser } from '../../../core/api/admin-auth/admin-auth.types';
import { ImageAssetRecord } from '../../../core/api/image-assets/image-assets.types';
import { buildAssetUrl } from '../../../core/api/api.config';
import { resolveLocalizedText } from '../../../core/translation/translation.service';
import { AppLocale, AppTranslationKey } from '../../../core/translation/translation.types';
import { formatAppDate } from '../../../core/date/app-date.helper';
import { firstValueFrom, Observable } from 'rxjs';
import {
  AdminFormFieldConfig,
  AdminEntityDefinition,
  AdminEntityOperation,
  AdminSessionFactDefinition,
  asAdminTranslationKey,
} from '../admin.types';

export const formatAdminIdentity = (user: AdminAuthenticatedUser | null): string =>
  user ? `${user.name} · ${user.role}` : '';

export const resolveAdminFieldLabel = (
  field: AdminFormFieldConfig,
  translate: (key: AppTranslationKey) => string,
): string => translate(field.labelKey);

export const createAdminFieldLabelResolver =
  <TFields extends Record<string, AdminFormFieldConfig>>(
    fields: TFields,
    translate: (key: AppTranslationKey) => string,
  ) =>
  (fieldKey: keyof TFields): string =>
    resolveAdminFieldLabel(fields[fieldKey], translate);

export const resolveAdminLocalizedValue = (
  locale: AppLocale,
  pt: string | null | undefined,
  en: string | null | undefined,
  es: string | null | undefined,
  fallback = '',
): string =>
  resolveLocalizedText(
    locale,
    {
      'pt-br': pt ?? undefined,
      'en-us': en ?? undefined,
      'es-es': es ?? undefined,
    },
    fallback,
  );

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

export const formatAdminDateForDisplay = (
  value: string | null | undefined,
  emptyValue = '-',
  locale: AppLocale = 'pt-br',
): string => {
  const normalizedValue = normalizeAdminDateValueForPicker(value);

  if (!normalizedValue) {
    return emptyValue;
  }

  return formatAppDate(normalizedValue, locale, emptyValue);
};

export const formatAdminDateRangeForDisplay = (
  startDate: string | null | undefined,
  endDate: string | null | undefined,
  locale: AppLocale = 'pt-br',
): string =>
  `${formatAdminDateForDisplay(startDate, '-', locale)} - ${formatAdminDateForDisplay(endDate, '-', locale)}`;

export interface AdminRelationLabelSource {
  readonly id?: string | null;
  readonly slug?: string | null;
  readonly name?: string | null;
  readonly namePt?: string | null;
  readonly nameEn?: string | null;
  readonly nameEs?: string | null;
  readonly titlePt?: string | null;
  readonly titleEn?: string | null;
  readonly titleEs?: string | null;
  readonly labelPt?: string | null;
  readonly labelEn?: string | null;
  readonly labelEs?: string | null;
  readonly companyName?: string | null;
  readonly fileName?: string | null;
  readonly filePath?: string | null;
  readonly url?: string | null;
  readonly kind?: string | null;
  readonly code?: string | null;
}

export const formatAdminRelationLabel = (
  relation: AdminRelationLabelSource,
  locale: AppLocale = 'pt-br',
): string => {
  const localized =
    resolveAdminLocalizedValue(locale, relation.namePt, relation.nameEn, relation.nameEs) ||
    resolveAdminLocalizedValue(locale, relation.titlePt, relation.titleEn, relation.titleEs) ||
    resolveAdminLocalizedValue(locale, relation.labelPt, relation.labelEn, relation.labelEs);
  const primary =
    relation.name ||
    localized ||
    relation.companyName ||
    relation.fileName ||
    relation.code ||
    relation.url ||
    relation.filePath ||
    relation.id ||
    '';
  const secondary = relation.slug ?? relation.kind;

  return secondary && secondary !== primary ? `${primary} (${secondary})` : primary;
};

export const resolveAdminRelationLabels = (
  relations: readonly unknown[] | null | undefined,
  nestedKey: string,
  locale: AppLocale = 'pt-br',
): readonly string[] => [
  ...new Set(
    (relations ?? [])
      .map((relation) => {
        if (!relation || typeof relation !== 'object') {
          return '';
        }

        const record = relation as Record<string, unknown>;
        const nested = record[nestedKey];
        const labelSource =
          nested && typeof nested === 'object'
            ? (nested as AdminRelationLabelSource)
            : (record as AdminRelationLabelSource);

        return formatAdminRelationLabel(labelSource, locale);
      })
      .filter(Boolean),
  ),
];

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

export const normalizeAdminDateValueForMutation = (value: string | null | undefined): string => {
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

const parseAdminDateValue = (value: string | null | undefined): number | null => {
  const normalizedValue = normalizeAdminDateValueForMutation(value);

  if (!normalizedValue) {
    return null;
  }

  const timestamp = Date.parse(normalizedValue);

  return Number.isNaN(timestamp) ? null : timestamp;
};

export const isAdminDateRangeValid = (
  startDate: string | null | undefined,
  endDate: string | null | undefined,
): boolean => {
  const startTimestamp = parseAdminDateValue(startDate);
  const endTimestamp = parseAdminDateValue(endDate);

  if (startTimestamp === null || endTimestamp === null) {
    return true;
  }

  return endTimestamp >= startTimestamp;
};

export const validateAdminDateRange = (
  startDate: string | null | undefined,
  endDate: string | null | undefined,
  errorKey: AppTranslationKey,
):
  | { readonly isValid: true }
  | { readonly isValid: false; readonly errorKey: AppTranslationKey } =>
  isAdminDateRangeValid(startDate, endDate) ? { isValid: true } : { isValid: false, errorKey };

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

export const trackAdminItemById = (index: number, item: { id: string }): string => item.id;

interface AdminPaginatedCatalog<T> {
  readonly data: readonly T[];
  readonly pagination: {
    readonly totalPages: number;
  };
}

export const loadAllAdminCatalogItems = async <T>(
  loadPage: (page: number, pageSize: number) => Observable<AdminPaginatedCatalog<T>>,
  pageSize = 100,
): Promise<readonly T[]> => {
  const firstPage = await firstValueFrom(loadPage(1, pageSize));
  const remainingPages = Array.from(
    { length: Math.max(firstPage.pagination.totalPages - 1, 0) },
    (_, index) => index + 2,
  );
  const remainingResponses = await Promise.all(
    remainingPages.map((page) => firstValueFrom(loadPage(page, pageSize))),
  );

  return [firstPage, ...remainingResponses].flatMap((response) => response.data);
};

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

const ADMIN_ENTITY_TITLE_KEYS: Record<AdminEntityDefinition['id'], AppTranslationKey> = {
  links: 'common.entities.links',
  'image-assets': 'common.entities.imageAssets',
  'spoken-languages': 'common.entities.languages',
  customers: 'common.entities.customers',
  jobs: 'common.entities.jobs',
  formations: 'common.entities.formations',
  technologies: 'common.entities.technologies',
  'technology-contexts': 'common.entities.technologyContexts',
  experiences: 'common.entities.experiences',
  projects: 'common.entities.projects',
};

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
    title: translate(ADMIN_ENTITY_TITLE_KEYS[entity.id]),
    description: translate(asAdminTranslationKey(`pages.admin.entities.${entity.id}.description`)),
    operations: operations.map((operation) => ({
      id: operation,
      label: translate(asAdminTranslationKey(`pages.admin.operations.${operation}`)),
    })),
  }));

export const buildAdminSessionFactViewModels = (
  facts: readonly AdminSessionFactDefinition[],
  translate: (key: AppTranslationKey) => string,
): readonly AdminSessionFactViewModel[] =>
  facts.map((fact) => ({
    id: fact.id,
    title: translate(asAdminTranslationKey(`pages.admin.facts.${fact.id}.title`)),
    description: translate(asAdminTranslationKey(`pages.admin.facts.${fact.id}.description`)),
  }));
