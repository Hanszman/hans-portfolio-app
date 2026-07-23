import { ImageAssetRecord } from '../../../../core/api/admin/image-assets/image-assets-operations.types';
import {
  createEmptyJobsOperationsFormValue,
  createJobExperienceOptionViewModel,
  createJobImageAssetOptionViewModel,
  resolveJobExperienceIdFromRelation,
  resolveJobImageAssetIdFromRelation,
  resolveJobImageAssetLabel,
} from './jobs-operations.types';

describe('jobs operations types', () => {
  it('should expose the empty form defaults', () => {
    expect(createEmptyJobsOperationsFormValue()).toEqual({
      slug: '',
      namePt: '',
      nameEn: '',
      summaryPt: '',
      summaryEn: '',
      highlight: true,
      sortOrder: '0',
      experienceIds: [],
      imageAssetIds: [],
    });
  });

  it('should map the option view-model helpers', () => {
    expect(
      createJobExperienceOptionViewModel({
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

    const imageAsset: ImageAssetRecord = {
      id: 'image-asset-1',
      fileName: 'ford.svg',
      filePath: '/assets/img/customers/ford.svg',
      folder: 'customers',
      kind: 'ICON',
      altPt: null,
      altEn: null,
      captionPt: null,
      captionEn: null,
      mimeType: 'image/svg+xml',
      width: 128,
      height: 128,
      sortOrder: 1,
      projectIds: [],
      experienceIds: [],
      technologyIds: [],
      formationIds: [],
      spokenLanguageIds: [],
      customerIds: [],
      jobIds: ['job-1'],
    };

    expect(createJobImageAssetOptionViewModel(imageAsset)).toEqual({
      id: 'image-asset-1',
      title: 'ford.svg',
      subtitle: '/assets/img/customers/ford.svg',
      imageUrl: 'http://localhost:4200/assets/img/customers/ford.svg',
    });
    expect(resolveJobImageAssetLabel(imageAsset)).toBe('ford.svg (ICON)');
  });

  it('should resolve relation identifiers from direct or nested records', () => {
    expect(
      resolveJobExperienceIdFromRelation({
        experienceId: 'experience-1',
      }),
    ).toBe('experience-1');
    expect(
      resolveJobExperienceIdFromRelation({
        experienceId: '',
        experience: {
          id: 'experience-2',
          slug: 'banking',
          companyName: 'Acme',
          titlePt: 'Consultor',
          titleEn: 'Consultant',
        },
      }),
    ).toBe('experience-2');
    expect(resolveJobExperienceIdFromRelation({})).toBeNull();
    expect(
      resolveJobImageAssetIdFromRelation({
        imageAssetId: 'image-asset-1',
      }),
    ).toBe('image-asset-1');
    expect(
      resolveJobImageAssetIdFromRelation({
        imageAssetId: '',
        imageAsset: {
          id: 'image-asset-2',
          fileName: 'acme.svg',
          filePath: '/assets/img/customers/acme.svg',
          kind: 'ICON',
        },
      }),
    ).toBe('image-asset-2');
    expect(resolveJobImageAssetIdFromRelation({})).toBeNull();
  });
});
