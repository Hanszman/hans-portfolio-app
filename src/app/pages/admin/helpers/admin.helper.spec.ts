import { AppTranslationKey } from '../../../core/translation/translation.types';
import {
  buildAdminEntityViewModels,
  buildAdminSessionFactViewModels,
  formatAdminIdentity,
} from './admin.helper';
import {
  ADMIN_ENTITY_DEFINITIONS,
  ADMIN_ENTITY_OPERATIONS,
  ADMIN_SESSION_FACT_DEFINITIONS,
} from '../admin.types';

describe('formatAdminIdentity', () => {
  it('should format the current admin identity when a user exists', () => {
    expect(
      formatAdminIdentity({
        id: '5f8e1e74-2d49-4b5c-9724-2e8c9c8b0e11',
        email: 'victor@example.com',
        name: 'Victor Hanszman',
        role: 'ADMIN',
      }),
    ).toBe('Victor Hanszman · ADMIN');
  });

  it('should return an empty string when there is no authenticated user', () => {
    expect(formatAdminIdentity(null)).toBe('');
  });

  it('should build translated admin entity view models', () => {
    const translate = (key: AppTranslationKey) => key;

    expect(
      buildAdminEntityViewModels(
        ADMIN_ENTITY_DEFINITIONS.slice(0, 1),
        translate,
        ADMIN_ENTITY_OPERATIONS,
      ),
    ).toEqual([
      {
        id: 'portfolio-settings',
        endpoint: 'POST/GET/PUT/DELETE /portfolio-settings',
        substep: 'F8.3',
        relationModeLabel: 'pages.admin.relationMode.owner',
        title: 'pages.admin.entities.portfolio-settings.title',
        description: 'pages.admin.entities.portfolio-settings.description',
        operations: [
          {
            id: 'create',
            label: 'pages.admin.operations.create',
          },
          {
            id: 'update',
            label: 'pages.admin.operations.update',
          },
          {
            id: 'delete',
            label: 'pages.admin.operations.delete',
          },
        ],
      },
    ]);
  });

  it('should build translated admin session facts', () => {
    const translate = (key: AppTranslationKey) => key;

    expect(buildAdminSessionFactViewModels(ADMIN_SESSION_FACT_DEFINITIONS, translate)).toEqual([
      {
        id: 'route',
        title: 'pages.admin.facts.route.title',
        description: 'pages.admin.facts.route.description',
      },
      {
        id: 'validation',
        title: 'pages.admin.facts.validation.title',
        description: 'pages.admin.facts.validation.description',
      },
      {
        id: 'storage',
        title: 'pages.admin.facts.storage.title',
        description: 'pages.admin.facts.storage.description',
      },
    ]);
  });
});
