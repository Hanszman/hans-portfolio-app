import { AppTranslationKey } from '../../../core/translation/translation.types';
import {
  buildAdminEntityViewModels,
  buildAdminSessionFactViewModels,
  createAdminFieldLabelResolver,
  formatAdminIdentity,
  resolveAdminFieldLabel,
  resolveAdminSelectValue,
  trackAdminItemById,
} from './admin.helper';
import {
  ADMIN_ENTITY_DEFINITIONS,
  ADMIN_ENTITY_OPERATIONS,
  ADMIN_SESSION_FACT_DEFINITIONS,
  createAdminEntityEndpointLabel,
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

  it('should append the required suffix only when the field is mandatory', () => {
    const translate = (key: AppTranslationKey) => key;

    expect(
      resolveAdminFieldLabel(
        {
          labelKey: 'pages.admin.tags.fields.slug.label',
          required: true,
        },
        translate,
      ),
    ).toBe('pages.admin.tags.fields.slug.label *');

    expect(
      resolveAdminFieldLabel(
        {
          labelKey: 'pages.admin.tags.fields.namePt.label',
        },
        translate,
      ),
    ).toBe('pages.admin.tags.fields.namePt.label');
  });

  it('should create a reusable field label resolver', () => {
    const translate = (key: AppTranslationKey) => key;
    const resolveFieldLabel = createAdminFieldLabelResolver(
      {
        slug: {
          labelKey: 'pages.admin.tags.fields.slug.label',
          required: true,
        },
        namePt: {
          labelKey: 'pages.admin.tags.fields.namePt.label',
        },
      },
      translate,
    );

    expect(resolveFieldLabel('slug')).toBe('pages.admin.tags.fields.slug.label *');
    expect(resolveFieldLabel('namePt')).toBe('pages.admin.tags.fields.namePt.label');
  });

  it('should resolve select values from the event detail string', () => {
    expect(resolveAdminSelectValue({ detail: 'STACK' } as unknown as Event)).toBe(
      'STACK',
    );
  });

  it('should resolve select values from the event detail object', () => {
    expect(
      resolveAdminSelectValue({
        detail: { value: 'STACK' },
      } as unknown as Event),
    ).toBe('STACK');
  });

  it('should resolve select values from the event target value', () => {
    expect(
      resolveAdminSelectValue({
        target: { value: 'STACK' },
      } as unknown as Event),
    ).toBe('STACK');
  });

  it('should return an empty string when the select event does not expose a value', () => {
    expect(resolveAdminSelectValue({} as Event)).toBe('');
  });

  it('should track admin items by id', () => {
    expect(trackAdminItemById(0, { id: 'tag-1' })).toBe('tag-1');
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
        endpoint: createAdminEntityEndpointLabel('/portfolio-settings'),
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
