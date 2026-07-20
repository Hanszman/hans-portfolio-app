import {
  createCustomerExperienceOptionViewModel,
  createCustomerImageAssetOptionViewModel,
  createEmptyCustomersOperationsFormValue,
  resolveCustomerExperienceIdFromRelation,
  resolveCustomerImageAssetIdFromRelation,
  resolveCustomerImageAssetLabel,
} from './customers-operations.types';

describe('customers operations types helpers', () => {
  it('should create the empty customers form value', () => {
    expect(createEmptyCustomersOperationsFormValue()).toEqual({
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

  it('should build related option view-models and image asset labels', () => {
    expect(
      createCustomerExperienceOptionViewModel({
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
      }),
    ).toEqual({
      id: 'experience-1',
      title: 'Analista',
      subtitle: 'Ford',
    });

    expect(
      createCustomerImageAssetOptionViewModel({
        id: 'image-asset-1',
        fileName: 'ford.svg',
        filePath: '/assets/img/customers/ford.svg',
        folder: 'customers',
        kind: 'ICON',
        mimeType: 'image/svg+xml',
      }),
    ).toEqual({
      id: 'image-asset-1',
      title: 'ford.svg',
      subtitle: '/assets/img/customers/ford.svg',
      imageUrl: 'http://localhost:4200/assets/img/customers/ford.svg',
    });

    expect(
      resolveCustomerImageAssetLabel({
        id: 'image-asset-1',
        fileName: 'ford.svg',
        filePath: '/assets/img/customers/ford.svg',
        folder: 'customers',
        kind: 'ICON',
        mimeType: 'image/svg+xml',
      }),
    ).toBe('ford.svg (ICON)');
  });

  it('should resolve relation ids from explicit ids, nested records and null fallbacks', () => {
    expect(
      resolveCustomerExperienceIdFromRelation({
        experienceId: 'experience-1',
      }),
    ).toBe('experience-1');

    expect(
      resolveCustomerExperienceIdFromRelation({
        experience: {
          id: 'experience-2',
          slug: 'account-2',
          companyName: 'Acme',
          titlePt: 'Consultor',
        },
      }),
    ).toBe('experience-2');

    expect(resolveCustomerExperienceIdFromRelation({})).toBeNull();

    expect(
      resolveCustomerImageAssetIdFromRelation({
        imageAssetId: 'image-asset-1',
      }),
    ).toBe('image-asset-1');

    expect(
      resolveCustomerImageAssetIdFromRelation({
        imageAsset: {
          id: 'image-asset-2',
          fileName: 'logo.svg',
          filePath: '/assets/img/customers/logo.svg',
          kind: 'ICON',
        },
      }),
    ).toBe('image-asset-2');

    expect(resolveCustomerImageAssetIdFromRelation({})).toBeNull();
  });
});
