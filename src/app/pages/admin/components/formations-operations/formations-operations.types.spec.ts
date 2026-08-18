import { appConfig } from '../../../../core/api/api.config';
import {
  createEmptyFormationsOperationsFormValue,
  createFormationDegreeTypeOptions,
  createFormationImageAssetOptionViewModel,
  createFormationTechnologyOptionViewModel,
  resolveFormationImageAssetIdFromRelation,
  resolveFormationImageAssetLabel,
  resolveFormationTechnologyIdFromRelation,
} from './formations-operations.types';

describe('formations operations types', () => {
  it('should expose the empty form defaults and degree-type options', () => {
    expect(createEmptyFormationsOperationsFormValue()).toEqual({
      slug: '',
      institution: '',
      titlePt: '',
      titleEn: '',
      titleEs: '',
      degreeType: '',
      summaryPt: '',
      summaryEn: '',
      summaryEs: '',
      startDate: '',
      endDate: '',
      highlight: true,
      sortOrder: '0',
      technologyIds: [],
      imageAssetIds: [],
    });

    expect(createFormationDegreeTypeOptions()[0]).toEqual({
      id: 'TECHNICAL',
      labelKey: 'pages.admin.formations.fields.degreeType.options.TECHNICAL',
      value: 'TECHNICAL',
    });
    expect(createFormationDegreeTypeOptions().at(-1)).toEqual({
      id: 'OTHER',
      labelKey: 'common.values.other',
      value: 'OTHER',
    });
  });

  it('should build related option view-models and image labels with fallbacks', () => {
    expect(
      createFormationTechnologyOptionViewModel({
        id: 'technology-1',
        slug: 'angular',
        name: 'Angular',
        type: 'FRAMEWORKS',
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
      createFormationImageAssetOptionViewModel({
        id: 'image-asset-1',
        fileName: 'puc.svg',
        filePath: '/assets/img/formations/puc.svg',
        kind: 'ICON',
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
        kind: 'ICON',
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
