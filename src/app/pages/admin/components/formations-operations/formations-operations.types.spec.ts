import { appConfig } from '../../../../core/api/api.config';
import {
  createEmptyFormationsOperationsFormValue,
  createFormationDegreeTypeOptions,
  createFormationImageAssetOptionViewModel,
  createFormationLinkOptionViewModel,
  createFormationTechnologyOptionViewModel,
  resolveFormationImageAssetIdFromRelation,
  resolveFormationImageAssetLabel,
  resolveFormationLinkIdFromRelation,
  resolveFormationTechnologyIdFromRelation,
} from './formations-operations.types';

describe('formations operations types', () => {
  it('should expose the empty form defaults and degree-type options', () => {
    expect(createEmptyFormationsOperationsFormValue()).toEqual({
      slug: '',
      institution: '',
      titlePt: '',
      titleEn: '',
      degreeType: '',
      summaryPt: '',
      summaryEn: '',
      startDate: '',
      endDate: '',
      highlight: true,
      sortOrder: '0',
      technologyIds: [],
      linkIds: [],
      imageAssetIds: [],
    });

    expect(createFormationDegreeTypeOptions()[0]).toEqual({
      id: 'TECHNICAL',
      labelKey: 'pages.admin.formations.fields.degreeType.options.TECHNICAL',
      value: 'TECHNICAL',
    });
    expect(createFormationDegreeTypeOptions().at(-1)).toEqual({
      id: 'OTHER',
      labelKey: 'pages.admin.formations.fields.degreeType.options.OTHER',
      value: 'OTHER',
    });
  });

  it('should build related option view-models and image labels with fallbacks', () => {
    expect(
      createFormationTechnologyOptionViewModel({
        id: 'technology-1',
        slug: 'angular',
        name: 'Angular',
        category: 'framework',
        level: 'advanced',
        frequency: 'frequent',
        highlight: true,
      }),
    ).toEqual({
      id: 'technology-1',
      title: 'Angular',
      subtitle: 'angular',
    });

    expect(
      createFormationLinkOptionViewModel({
        id: 'link-1',
        url: 'https://example.com/pt',
        labelPt: 'Portal PT',
      }),
    ).toEqual({
      id: 'link-1',
      title: 'Portal PT',
      subtitle: 'https://example.com/pt',
    });

    expect(
      createFormationLinkOptionViewModel({
        id: 'link-2',
        url: 'https://example.com/en',
        labelPt: '',
        labelEn: 'Portal EN',
      }),
    ).toEqual({
      id: 'link-2',
      title: 'Portal EN',
      subtitle: 'https://example.com/en',
    });

    expect(
      createFormationLinkOptionViewModel({
        id: 'link-3',
        url: 'https://example.com/url',
        labelPt: '',
        labelEn: '',
      }),
    ).toEqual({
      id: 'link-3',
      title: 'https://example.com/url',
      subtitle: 'https://example.com/url',
    });

    expect(
      createFormationImageAssetOptionViewModel({
        id: 'image-asset-1',
        fileName: 'puc.svg',
        filePath: '/assets/img/formations/puc.svg',
        folder: 'formations',
        kind: 'ICON',
        mimeType: 'image/svg+xml',
      }),
    ).toEqual({
      id: 'image-asset-1',
      title: 'puc.svg',
      subtitle: '/assets/img/formations/puc.svg',
      imageUrl: `${appConfig.baseUrl}/assets/img/formations/puc.svg`,
    });

    expect(
      resolveFormationImageAssetLabel({
        id: 'image-asset-1',
        fileName: 'puc.svg',
        filePath: '/assets/img/formations/puc.svg',
        folder: 'formations',
        kind: 'ICON',
        mimeType: 'image/svg+xml',
      }),
    ).toBe('puc.svg (ICON)');
  });

  it('should resolve relation ids from direct, nested and empty relation records', () => {
    expect(
      resolveFormationTechnologyIdFromRelation({
        technologyId: 'technology-1',
      }),
    ).toBe('technology-1');
    expect(
      resolveFormationTechnologyIdFromRelation({
        technologyId: '',
        technology: {
          id: 'technology-2',
          slug: 'nestjs',
          name: 'NestJS',
        },
      }),
    ).toBe('technology-2');
    expect(resolveFormationTechnologyIdFromRelation({})).toBeNull();

    expect(
      resolveFormationLinkIdFromRelation({
        linkId: 'link-1',
      }),
    ).toBe('link-1');
    expect(
      resolveFormationLinkIdFromRelation({
        linkId: '',
        link: {
          id: 'link-2',
          url: 'https://example.com/details',
          labelPt: 'Detalhes',
        },
      }),
    ).toBe('link-2');
    expect(resolveFormationLinkIdFromRelation({})).toBeNull();

    expect(
      resolveFormationImageAssetIdFromRelation({
        imageAssetId: 'image-asset-1',
      }),
    ).toBe('image-asset-1');
    expect(
      resolveFormationImageAssetIdFromRelation({
        imageAssetId: '',
        imageAsset: {
          id: 'image-asset-2',
          fileName: 'campus.png',
          filePath: '/assets/img/formations/campus.png',
          kind: 'COVER',
        },
      }),
    ).toBe('image-asset-2');
    expect(resolveFormationImageAssetIdFromRelation({})).toBeNull();
  });
});
