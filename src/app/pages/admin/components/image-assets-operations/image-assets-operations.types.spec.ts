import { ExperienceCollectionItemResponse } from '../../../../core/api/experiences/experiences.types';
import { ProjectCollectionItemResponse } from '../../../../core/api/projects/projects.types';
import { TechnologyCollectionItemResponse } from '../../../../core/api/technologies/technologies.types';
import {
  IMAGE_ASSET_KIND_VALUES,
  createEmptyImageAssetsOperationsFormValue,
  createImageAssetCatalogOptionViewModel,
  createImageAssetKindOptions,
  resolveImageAssetAltEn,
  resolveImageAssetAltPt,
  resolveImageAssetCaptionEn,
  resolveImageAssetCaptionPt,
  resolveImageAssetExperienceIdFromRelation,
  resolveImageAssetProjectIdFromRelation,
  resolveImageAssetTechnologyIdFromRelation,
} from './image-assets-operations.types';

describe('image-assets operations types', () => {
  it('should expose the supported image-asset kind values and options', () => {
    expect(IMAGE_ASSET_KIND_VALUES).toEqual(['ICON', 'SCREENSHOT']);
    expect(createImageAssetKindOptions()).toEqual([
      { id: 'ICON', label: 'ICON', value: 'ICON' },
      { id: 'SCREENSHOT', label: 'SCREENSHOT', value: 'SCREENSHOT' },
    ]);
  });

  it('should create an empty form model', () => {
    expect(createEmptyImageAssetsOperationsFormValue()).toEqual({
      fileName: '',
      filePath: '',
      folder: '',
      kind: '',
      altPt: '',
      altEn: '',
      captionPt: '',
      captionEn: '',
      mimeType: '',
      width: '',
      height: '',
      sortOrder: '0',
      projectIds: [],
      experienceIds: [],
      technologyIds: [],
      formationIds: [],
      spokenLanguageIds: [],
      customerIds: [],
      jobIds: [],
    });
  });

  it('should build the catalog view-model for each supported relation source', () => {
    const project = {
      id: 'project-1',
      slug: 'portfolio-remake',
      titlePt: 'Portfolio remake',
    } as ProjectCollectionItemResponse;
    const experience = {
      id: 'experience-1',
      titlePt: 'Analista',
      companyName: 'Stefanini Ford',
    } as ExperienceCollectionItemResponse;
    const technology = {
      id: 'technology-1',
      slug: 'angular',
      name: 'Angular',
    } as TechnologyCollectionItemResponse;

    expect(createImageAssetCatalogOptionViewModel(project)).toEqual({
      id: 'project-1',
      title: 'Portfolio remake',
      subtitle: 'portfolio-remake',
    });
    expect(createImageAssetCatalogOptionViewModel(experience)).toEqual({
      id: 'experience-1',
      title: 'Analista',
      subtitle: 'Stefanini Ford',
    });
    expect(createImageAssetCatalogOptionViewModel(technology)).toEqual({
      id: 'technology-1',
      title: 'Angular',
      subtitle: 'angular',
    });
  });

  it('should resolve optional text fallbacks and relation ids', () => {
    expect(
      resolveImageAssetProjectIdFromRelation({ project: { id: 'project-1' } }),
    ).toBe('project-1');
    expect(resolveImageAssetProjectIdFromRelation({ projectId: 'project-2' })).toBe(
      'project-2',
    );
    expect(resolveImageAssetProjectIdFromRelation({})).toBeNull();
    expect(
      resolveImageAssetExperienceIdFromRelation({
        experience: { id: 'experience-1' },
      }),
    ).toBe('experience-1');
    expect(
      resolveImageAssetExperienceIdFromRelation({ experienceId: 'experience-2' }),
    ).toBe('experience-2');
    expect(resolveImageAssetExperienceIdFromRelation({})).toBeNull();
    expect(
      resolveImageAssetTechnologyIdFromRelation({
        technology: { id: 'technology-1' },
      }),
    ).toBe('technology-1');
    expect(
      resolveImageAssetTechnologyIdFromRelation({ technologyId: 'technology-2' }),
    ).toBe('technology-2');
    expect(resolveImageAssetTechnologyIdFromRelation({})).toBeNull();

    expect(resolveImageAssetAltPt({ altPt: null } as never)).toBe('');
    expect(resolveImageAssetAltPt({ altPt: 'Logo PT' } as never)).toBe('Logo PT');
    expect(resolveImageAssetAltEn({ altEn: null } as never)).toBe('');
    expect(resolveImageAssetAltEn({ altEn: 'Logo EN' } as never)).toBe('Logo EN');
    expect(resolveImageAssetCaptionPt({ captionPt: null } as never)).toBe('');
    expect(resolveImageAssetCaptionPt({ captionPt: 'Legenda PT' } as never)).toBe(
      'Legenda PT',
    );
    expect(resolveImageAssetCaptionEn({ captionEn: null } as never)).toBe('');
    expect(resolveImageAssetCaptionEn({ captionEn: 'Caption EN' } as never)).toBe(
      'Caption EN',
    );
  });
});
