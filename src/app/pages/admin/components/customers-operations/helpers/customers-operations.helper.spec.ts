import { ImageAssetRecord } from '../../../../../core/api/admin/image-assets/image-assets-operations.types';
import { CustomerRecord } from '../../../../../core/api/admin/customers/customers-operations.types';
import { ExperienceCollectionItemResponse } from '../../../../../core/api/experiences/experiences.types';
import {
  buildCustomerExperienceOptions,
  buildCustomerImageAssetOptions,
  buildCustomersFormValue,
  buildCustomersMutationPayload,
  buildCustomersViewModels,
  normalizeCustomerExperienceIds,
  normalizeCustomerImageAssetIds,
} from './customers-operations.helper';

const createExperience = (
  overrides: Partial<ExperienceCollectionItemResponse> = {},
): ExperienceCollectionItemResponse => ({
  id: 'experience-1',
  slug: 'ford-account',
  companyName: 'Ford',
  titlePt: 'Analista',
  titleEn: 'Analyst',
  summaryPt: 'Resumo',
  summaryEn: 'Summary',
  descriptionPt: 'Descricao',
  descriptionEn: 'Description',
  startDate: '2024-01-01',
  endDate: null,
  isCurrent: true,
  highlight: true,
  sortOrder: 1,
  isPublished: true,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  technologies: [],
  projects: [],
  customers: [],
  jobs: [],
  links: [],
  imageAssets: [],
  ...overrides,
});

const createImageAsset = (overrides: Partial<ImageAssetRecord> = {}): ImageAssetRecord => ({
  id: 'image-asset-1',
  fileName: 'ford.svg',
  filePath: '/assets/img/customers/ford.svg',
  folder: 'customers',
  kind: 'ICON',
  mimeType: 'image/svg+xml',
  customerIds: [],
  ...overrides,
});

const createCustomer = (overrides: Partial<CustomerRecord> = {}): CustomerRecord => ({
  id: 'customer-1',
  slug: 'enterprise-client',
  name: 'Enterprise Client',
  summaryPt: 'Cliente corporativo',
  summaryEn: 'Corporate client',
  highlight: true,
  sortOrder: 2,
  isPublished: true,
  experienceIds: ['experience-2'],
  imageAssetIds: ['image-asset-2'],
  experiences: [
    {
      experienceId: 'experience-3',
      experience: {
        id: 'experience-3',
        slug: 'banking',
        companyName: 'Acme',
        titlePt: 'Consultor',
        titleEn: 'Consultant',
      },
    },
  ],
  imageAssets: [
    {
      imageAssetId: 'image-asset-3',
      imageAsset: {
        id: 'image-asset-3',
        fileName: 'acme.svg',
        filePath: '/assets/img/customers/acme.svg',
        kind: 'ICON',
      },
    },
  ],
  ...overrides,
});

describe('customers operations helper', () => {
  it('should sort experience and image asset catalog options by title', () => {
    expect(
      buildCustomerExperienceOptions([
        createExperience({ id: 'experience-2', titlePt: 'Zeta', companyName: 'Z Co' }),
        createExperience({ id: 'experience-1', titlePt: 'Alpha', companyName: 'A Co' }),
      ]),
    ).toEqual([
      {
        id: 'experience-1',
        title: 'Alpha',
        subtitle: 'A Co',
      },
      {
        id: 'experience-2',
        title: 'Zeta',
        subtitle: 'Z Co',
      },
    ]);

    expect(
      buildCustomerImageAssetOptions([
        createImageAsset({ id: 'image-asset-2', fileName: 'zeta.svg' }),
        createImageAsset({ id: 'image-asset-1', fileName: 'alpha.svg' }),
      ]),
    ).toEqual([
      {
        id: 'image-asset-1',
        title: 'alpha.svg',
        subtitle: '/assets/img/customers/ford.svg',
      },
      {
        id: 'image-asset-2',
        title: 'zeta.svg',
        subtitle: '/assets/img/customers/ford.svg',
      },
    ]);
  });

  it('should normalize relations from explicit ids, nested records and public catalogs', () => {
    const customer = createCustomer();

    expect(
      normalizeCustomerExperienceIds(customer, [
        createExperience({
          id: 'experience-1',
          customers: [
            {
              customerId: 'customer-1',
              customer: {
                id: 'customer-1',
                slug: 'enterprise-client',
                name: 'Enterprise Client',
              },
            },
          ],
        }),
      ]),
    ).toEqual(['experience-2', 'experience-3', 'experience-1']);

    expect(
      normalizeCustomerImageAssetIds(customer, [
        createImageAsset({
          id: 'image-asset-1',
          customerIds: ['customer-1'],
        }),
      ]),
    ).toEqual(['image-asset-2', 'image-asset-3', 'image-asset-1']);
  });

  it('should build an empty form when no customer is selected', () => {
    expect(buildCustomersFormValue(undefined, [], [])).toEqual({
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
  });

  it('should map a selected customer into the form model', () => {
    expect(
      buildCustomersFormValue(
        createCustomer(),
        [
          createExperience({
            id: 'experience-1',
            customers: [
              {
                customerId: 'customer-1',
                customer: {
                  id: 'customer-1',
                  slug: 'enterprise-client',
                  name: 'Enterprise Client',
                },
              },
            ],
          }),
        ],
        [
          createImageAsset({
            id: 'image-asset-1',
            customerIds: ['customer-1'],
          }),
        ],
      ),
    ).toEqual({
      slug: 'enterprise-client',
      name: 'Enterprise Client',
      summaryPt: 'Cliente corporativo',
      summaryEn: 'Corporate client',
      highlight: true,
      sortOrder: '2',
      isPublished: true,
      experienceIds: ['experience-2', 'experience-3', 'experience-1'],
      imageAssetIds: ['image-asset-2', 'image-asset-3', 'image-asset-1'],
    });
  });

  it('should gracefully map nullish relation collections and fallback scalar fields', () => {
    expect(
      buildCustomersFormValue(
        createCustomer({
          experienceIds: undefined,
          imageAssetIds: undefined,
          experiences: undefined,
          imageAssets: undefined,
          highlight: null,
          sortOrder: null,
          isPublished: null,
        }),
        [],
        [],
      ),
    ).toEqual({
      slug: 'enterprise-client',
      name: 'Enterprise Client',
      summaryPt: 'Cliente corporativo',
      summaryEn: 'Corporate client',
      highlight: false,
      sortOrder: '0',
      isPublished: true,
      experienceIds: [],
      imageAssetIds: [],
    });
  });

  it('should build sorted customer view-models with resolved labels', () => {
    const viewModels = buildCustomersViewModels(
      [
        createCustomer({
          id: 'customer-2',
          slug: 'startup-client',
          name: 'Startup Client',
          sortOrder: 1,
          experienceIds: ['experience-1'],
          experiences: undefined,
          imageAssetIds: ['image-asset-1'],
          imageAssets: undefined,
        }),
        createCustomer(),
      ],
      [
        createExperience({ id: 'experience-1', titlePt: 'Alpha', companyName: 'A Co' }),
        createExperience({ id: 'experience-2', titlePt: 'Beta', companyName: 'B Co' }),
        createExperience({ id: 'experience-3', titlePt: 'Gamma', companyName: 'C Co' }),
      ],
      [
        createImageAsset({ id: 'image-asset-1', fileName: 'alpha.svg' }),
        createImageAsset({ id: 'image-asset-2', fileName: 'beta.svg' }),
        createImageAsset({ id: 'image-asset-3', fileName: 'gamma.svg' }),
      ],
    );

    expect(viewModels.map((viewModel) => viewModel.slug)).toEqual([
      'startup-client',
      'enterprise-client',
    ]);
    expect(viewModels[1].experienceLabels).toEqual(['Beta (B Co)', 'Gamma (C Co)']);
    expect(viewModels[1].imageAssetLabels).toEqual(['beta.svg (ICON)', 'gamma.svg (ICON)']);
  });

  it('should use the name as the tie-breaker and fallback nullish flags in the view-model mapper', () => {
    const viewModels = buildCustomersViewModels(
      [
        createCustomer({
          id: 'customer-2',
          name: 'Zeta Client',
          slug: 'zeta-client',
          sortOrder: 1,
          experienceIds: undefined,
          experiences: undefined,
          imageAssetIds: undefined,
          imageAssets: undefined,
        }),
        createCustomer({
          id: 'customer-1',
          name: 'Alpha Client',
          slug: 'alpha-client',
          sortOrder: 1,
          highlight: null,
          isPublished: null,
          experienceIds: ['missing-experience'],
          experiences: [],
          imageAssetIds: ['missing-image-asset'],
          imageAssets: [],
        }),
      ],
      [],
      [],
    );

    expect(viewModels.map((viewModel) => viewModel.name)).toEqual(['Alpha Client', 'Zeta Client']);
    expect(viewModels[0].highlight).toBeFalse();
    expect(viewModels[0].isPublished).toBeTrue();
    expect(viewModels[0].experienceLabels).toEqual(['missing-experience']);
    expect(viewModels[0].imageAssetLabels).toEqual(['missing-image-asset']);
  });

  it('should build a valid mutation payload with deduplicated relations', () => {
    expect(
      buildCustomersMutationPayload({
        slug: ' enterprise-client ',
        name: ' Enterprise Client ',
        summaryPt: ' Cliente corporativo ',
        summaryEn: ' Corporate client ',
        highlight: true,
        sortOrder: '5',
        isPublished: false,
        experienceIds: ['experience-1', 'experience-1'],
        imageAssetIds: ['image-asset-1', 'image-asset-1'],
      }),
    ).toEqual({
      isValid: true,
      payload: {
        slug: 'enterprise-client',
        name: 'Enterprise Client',
        summaryPt: 'Cliente corporativo',
        summaryEn: 'Corporate client',
        highlight: true,
        sortOrder: 5,
        isPublished: false,
        experienceIds: ['experience-1'],
        imageAssetIds: ['image-asset-1'],
      },
    });
  });

  it('should reject invalid mutation forms with the matching translation key', () => {
    expect(
      buildCustomersMutationPayload({
        slug: '',
        name: '',
        summaryPt: '',
        summaryEn: '',
        highlight: true,
        sortOrder: 'abc',
        isPublished: true,
        experienceIds: [],
        imageAssetIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.customers.feedback.requiredSlug',
    });

    expect(
      buildCustomersMutationPayload({
        slug: 'enterprise-client',
        name: '',
        summaryPt: '',
        summaryEn: '',
        highlight: true,
        sortOrder: 'abc',
        isPublished: true,
        experienceIds: [],
        imageAssetIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.customers.feedback.requiredName',
    });

    expect(
      buildCustomersMutationPayload({
        slug: 'enterprise-client',
        name: 'Enterprise Client',
        summaryPt: '',
        summaryEn: '',
        highlight: true,
        sortOrder: 'abc',
        isPublished: true,
        experienceIds: [],
        imageAssetIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.customers.feedback.requiredSummaryPt',
    });

    expect(
      buildCustomersMutationPayload({
        slug: 'enterprise-client',
        name: 'Enterprise Client',
        summaryPt: 'Cliente corporativo',
        summaryEn: '',
        highlight: true,
        sortOrder: 'abc',
        isPublished: true,
        experienceIds: [],
        imageAssetIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.customers.feedback.requiredSummaryEn',
    });

    expect(
      buildCustomersMutationPayload({
        slug: 'enterprise-client',
        name: 'Enterprise Client',
        summaryPt: 'Cliente corporativo',
        summaryEn: 'Corporate client',
        highlight: true,
        sortOrder: 'abc',
        isPublished: true,
        experienceIds: [],
        imageAssetIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.customers.feedback.invalidSortOrder',
    });
  });
});
