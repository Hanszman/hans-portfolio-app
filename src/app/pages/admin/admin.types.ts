import { AppTranslationKey } from '../../core/translation/translation.types';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../../core/api/api.types';

export interface AdminCollectionPagination {
  readonly page: number;
  readonly pageSize: number;
  readonly totalItems: number;
  readonly totalPages: number;
  readonly hasPreviousPage: boolean;
  readonly hasNextPage: boolean;
}

export interface AdminFormFieldConfig {
  readonly labelKey: AppTranslationKey;
  readonly placeholderKey?: AppTranslationKey;
  readonly required?: boolean;
  readonly multiline?: boolean;
}

export const ADMIN_MODAL_PAGE_SIZE = DEFAULT_PAGE_SIZE;
export const ADMIN_ENTITY_ENDPOINT_METHODS_LABEL = 'POST/GET/PUT/DELETE';

export const createAdminEntityEndpointLabel = (resourcePath: string): string =>
  `${ADMIN_ENTITY_ENDPOINT_METHODS_LABEL} ${resourcePath}`;

export const createAdminCollectionPagination = (
  pageSize = ADMIN_MODAL_PAGE_SIZE,
): AdminCollectionPagination => ({
  page: DEFAULT_PAGE,
  pageSize,
  totalItems: 0,
  totalPages: 0,
  hasPreviousPage: false,
  hasNextPage: false,
});
