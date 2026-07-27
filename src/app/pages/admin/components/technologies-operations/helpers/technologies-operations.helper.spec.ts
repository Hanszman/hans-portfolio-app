import { appConfig } from '../../../../../core/api/api.config';
import { ImageAssetRecord } from '../../../../../core/api/admin/image-assets/image-assets-operations.types';
import { TechnologyAdminRecord } from '../../../../../core/api/technologies/technologies.types';
import {
  buildTechnologiesFormValue,
  buildTechnologiesMutationPayload,
  buildTechnologiesViewModels,
  buildTechnologyImageAssetOptions,
} from './technologies-operations.helper';

const technology = (overrides: Partial<TechnologyAdminRecord> = {}): TechnologyAdminRecord => ({
  id: 'technology-1',
  slug: 'angular',
  name: 'Angular',
  category: 'FRAMEWORK',
  level: 'ADVANCED',
  frequency: 'FREQUENT',
  highlight: true,
  sortOrder: 2,
  imageAssetIds: ['image-1'],
  ...overrides,
});
const image = (overrides: Partial<ImageAssetRecord> = {}): ImageAssetRecord => ({
  id: 'image-1',
  fileName: 'angular.png',
  filePath: '/assets/img/skills/angular.png',
  folder: 'skills',
  kind: 'ICON',
  mimeType: 'image/png',
  ...overrides,
});

describe('technologies operations helper', () => {
  it('builds an empty and a populated form', () => {
    expect(buildTechnologiesFormValue(undefined)).toEqual({
      slug: '',
      name: '',
      category: '',
      level: '',
      frequency: '',
      highlight: true,
      sortOrder: '0',
      imageAssetIds: [],
    });
    expect(buildTechnologiesFormValue(technology())).toEqual({
      slug: 'angular',
      name: 'Angular',
      category: 'FRAMEWORK',
      level: 'ADVANCED',
      frequency: 'FREQUENT',
      highlight: true,
      sortOrder: '2',
      imageAssetIds: ['image-1'],
    });
    expect(
      buildTechnologiesFormValue(
        technology({
          level: null,
          frequency: null,
          sortOrder: undefined,
          imageAssetIds: undefined,
        }),
      ),
    ).toEqual({
      slug: 'angular',
      name: 'Angular',
      category: 'FRAMEWORK',
      level: '',
      frequency: '',
      highlight: true,
      sortOrder: '0',
      imageAssetIds: [],
    });
  });

  it('sorts image options and maps technology view models', () => {
    expect(
      buildTechnologyImageAssetOptions([
        image(),
        image({ id: 'image-2', fileName: 'alpha.png' }),
      ])[0],
    ).toEqual({
      id: 'image-2',
      title: 'alpha.png',
      subtitle: '/assets/img/skills/angular.png',
      imageUrl: `${appConfig.baseUrl}/assets/img/skills/angular.png`,
    });
    expect(
      buildTechnologiesViewModels(
        [
          technology(),
          technology({ id: 'technology-2', sortOrder: 1, imageAssetIds: ['missing'] }),
          technology({ id: 'technology-3', sortOrder: undefined, imageAssetIds: [] }),
        ],
        [image()],
      ).map((item) => item.id),
    ).toEqual(['technology-2', 'technology-1', 'technology-3']);
    expect(
      buildTechnologiesViewModels(
        [
          technology({ id: 'technology-4', sortOrder: undefined }),
          technology({ id: 'technology-5', sortOrder: undefined }),
        ],
        [],
      ),
    ).toHaveSize(2);
    expect(buildTechnologiesViewModels([technology()], [image()])[0].imageAssetLabels).toEqual([
      'angular.png (ICON)',
    ]);
  });

  it('builds a valid mutation payload and rejects invalid forms', () => {
    const form = {
      slug: ' angular ',
      name: ' Angular ',
      category: ' FRAMEWORK ',
      level: 'ADVANCED',
      frequency: 'FREQUENT',
      highlight: false,
      sortOrder: '3',
      imageAssetIds: ['image-1', 'image-1'],
    };
    expect(buildTechnologiesMutationPayload(form)).toEqual({
      isValid: true,
      payload: {
        slug: 'angular',
        name: 'Angular',
        category: 'FRAMEWORK',
        level: 'ADVANCED',
        frequency: 'FREQUENT',
        highlight: false,
        sortOrder: 3,
        projectRelations: [],
        experienceRelations: [],
        formationRelations: [],
        tagIds: [],
        linkIds: [],
        imageAssetIds: ['image-1'],
      },
    });
    expect(buildTechnologiesMutationPayload({ ...form, slug: '' })).toEqual({
      isValid: false,
      errorKey: 'pages.admin.technologies.feedback.requiredSlug',
    });
    expect(buildTechnologiesMutationPayload({ ...form, slug: 'angular', name: '' })).toEqual({
      isValid: false,
      errorKey: 'pages.admin.technologies.feedback.requiredName',
    });
    expect(buildTechnologiesMutationPayload({ ...form, name: 'Angular', category: '' })).toEqual({
      isValid: false,
      errorKey: 'pages.admin.technologies.feedback.requiredCategory',
    });
    expect(buildTechnologiesMutationPayload({ ...form, sortOrder: 'bad' })).toEqual({
      isValid: false,
      errorKey: 'pages.admin.technologies.feedback.invalidSortOrder',
    });
    expect(buildTechnologiesMutationPayload({ ...form, level: '', frequency: '' })).toEqual(
      jasmine.objectContaining({ isValid: true }),
    );
  });
});
