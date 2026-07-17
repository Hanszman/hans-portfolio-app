import { AppTranslationKey } from '../../core/translation/translation.types';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../../core/api/api.types';

export type AdminEntityOperation = 'create' | 'update' | 'delete';

export interface AdminEntityDefinition {
  readonly id:
    | 'portfolio-settings'
    | 'tags'
    | 'links'
    | 'image-assets'
    | 'spoken-languages'
    | 'customers'
    | 'jobs'
    | 'formations'
    | 'technologies'
    | 'technology-contexts'
    | 'experiences'
    | 'projects';
  readonly endpoint: string;
  readonly substep: string;
  readonly relationMode: 'owner' | 'dedicated';
}

export interface AdminSessionFactDefinition {
  readonly id: 'route' | 'validation' | 'storage';
}

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
}

export const ADMIN_MODAL_PAGE_SIZE = DEFAULT_PAGE_SIZE;
export const ADMIN_ENTITY_ENDPOINT_METHODS_LABEL = 'POST/GET/PUT/DELETE';

export type AdminEntityRelationMode = AdminEntityDefinition['relationMode'];

export type AdminEntityTitleTranslationKey =
  `pages.admin.entities.${AdminEntityDefinition['id']}.title`;

export type AdminEntityDescriptionTranslationKey =
  `pages.admin.entities.${AdminEntityDefinition['id']}.description`;

export type AdminEntityOperationTranslationKey = `pages.admin.operations.${AdminEntityOperation}`;

export type AdminSessionFactTitleTranslationKey =
  `pages.admin.facts.${AdminSessionFactDefinition['id']}.title`;

export type AdminSessionFactDescriptionTranslationKey =
  `pages.admin.facts.${AdminSessionFactDefinition['id']}.description`;

export type AdminRelationModeTranslationKey = `pages.admin.relationMode.${AdminEntityRelationMode}`;

export type AdminTranslationKey =
  | AdminEntityTitleTranslationKey
  | AdminEntityDescriptionTranslationKey
  | AdminEntityOperationTranslationKey
  | AdminSessionFactTitleTranslationKey
  | AdminSessionFactDescriptionTranslationKey
  | AdminRelationModeTranslationKey;

export const asAdminTranslationKey = <TKey extends AdminTranslationKey>(
  key: TKey,
): AppTranslationKey => key;

export const ADMIN_ENTITY_OPERATIONS: readonly AdminEntityOperation[] = [
  'create',
  'update',
  'delete',
] as const;

export const createAdminEntityEndpointLabel = (resourcePath: string): string =>
  `${ADMIN_ENTITY_ENDPOINT_METHODS_LABEL} ${resourcePath}`;

export const ADMIN_ENTITY_DEFINITIONS: readonly AdminEntityDefinition[] = [
  {
    id: 'portfolio-settings',
    endpoint: createAdminEntityEndpointLabel('/portfolio-settings'),
    substep: 'F8.3',
    relationMode: 'owner',
  },
  {
    id: 'tags',
    endpoint: createAdminEntityEndpointLabel('/tags'),
    substep: 'F8.4',
    relationMode: 'owner',
  },
  {
    id: 'links',
    endpoint: createAdminEntityEndpointLabel('/links'),
    substep: 'F8.5',
    relationMode: 'owner',
  },
  {
    id: 'image-assets',
    endpoint: createAdminEntityEndpointLabel('/image-assets'),
    substep: 'F8.6',
    relationMode: 'owner',
  },
  {
    id: 'spoken-languages',
    endpoint: createAdminEntityEndpointLabel('/spoken-languages'),
    substep: 'F8.7',
    relationMode: 'owner',
  },
  {
    id: 'customers',
    endpoint: createAdminEntityEndpointLabel('/customers'),
    substep: 'F8.8',
    relationMode: 'owner',
  },
  {
    id: 'jobs',
    endpoint: createAdminEntityEndpointLabel('/jobs'),
    substep: 'F8.9',
    relationMode: 'owner',
  },
  {
    id: 'formations',
    endpoint: createAdminEntityEndpointLabel('/formations'),
    substep: 'F8.10',
    relationMode: 'owner',
  },
  {
    id: 'technologies',
    endpoint: createAdminEntityEndpointLabel('/technologies'),
    substep: 'F8.11',
    relationMode: 'owner',
  },
  {
    id: 'technology-contexts',
    endpoint: createAdminEntityEndpointLabel('/technology-contexts'),
    substep: 'F8.12',
    relationMode: 'dedicated',
  },
  {
    id: 'experiences',
    endpoint: createAdminEntityEndpointLabel('/experiences'),
    substep: 'F8.13',
    relationMode: 'owner',
  },
  {
    id: 'projects',
    endpoint: createAdminEntityEndpointLabel('/projects'),
    substep: 'F8.14',
    relationMode: 'owner',
  },
] as const;

export const ADMIN_SESSION_FACT_DEFINITIONS: readonly AdminSessionFactDefinition[] = [
  {
    id: 'route',
  },
  {
    id: 'validation',
  },
  {
    id: 'storage',
  },
] as const;

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
