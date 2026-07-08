import { AppTranslationKey } from '../../../core/translation/translation.types';
import { AdminAuthenticatedUser } from '../../../core/api/admin/admin-auth/admin-auth-api.types';
import {
  AdminEntityDefinition,
  AdminEntityOperation,
  AdminSessionFactDefinition,
  asAdminTranslationKey,
} from '../admin.types';

export const formatAdminIdentity = (
  user: AdminAuthenticatedUser | null,
): string => (user ? `${user.name} · ${user.role}` : '');

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
