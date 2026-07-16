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

export const ADMIN_MODAL_PAGE_SIZE = DEFAULT_PAGE_SIZE;

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

export const ADMIN_ENTITY_DEFINITIONS: readonly AdminEntityDefinition[] = [
  {
    id: 'portfolio-settings',
    endpoint: 'POST/GET/PUT/DELETE /portfolio-settings',
    substep: 'F8.3',
    relationMode: 'owner',
  },
  {
    id: 'tags',
    endpoint: 'POST/GET/PUT/DELETE /tags',
    substep: 'F8.4',
    relationMode: 'owner',
  },
  {
    id: 'links',
    endpoint: 'POST/GET/PUT/DELETE /links',
    substep: 'F8.5',
    relationMode: 'owner',
  },
  {
    id: 'image-assets',
    endpoint: 'POST/GET/PUT/DELETE /image-assets',
    substep: 'F8.6',
    relationMode: 'owner',
  },
  {
    id: 'spoken-languages',
    endpoint: 'POST/GET/PUT/DELETE /spoken-languages',
    substep: 'F8.7',
    relationMode: 'owner',
  },
  {
    id: 'customers',
    endpoint: 'POST/GET/PUT/DELETE /customers',
    substep: 'F8.8',
    relationMode: 'owner',
  },
  {
    id: 'jobs',
    endpoint: 'POST/GET/PUT/DELETE /jobs',
    substep: 'F8.9',
    relationMode: 'owner',
  },
  {
    id: 'formations',
    endpoint: 'POST/GET/PUT/DELETE /formations',
    substep: 'F8.10',
    relationMode: 'owner',
  },
  {
    id: 'technologies',
    endpoint: 'POST/GET/PUT/DELETE /technologies',
    substep: 'F8.11',
    relationMode: 'owner',
  },
  {
    id: 'technology-contexts',
    endpoint: 'POST/GET/PUT/DELETE /technology-contexts',
    substep: 'F8.12',
    relationMode: 'dedicated',
  },
  {
    id: 'experiences',
    endpoint: 'POST/GET/PUT/DELETE /experiences',
    substep: 'F8.13',
    relationMode: 'owner',
  },
  {
    id: 'projects',
    endpoint: 'POST/GET/PUT/DELETE /projects',
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
