import { ImageAssetRecord } from '../../../../../core/api/admin/image-assets/image-assets-operations.types';
import { ExperienceCollectionItemResponse } from '../../../../../core/api/experiences/experiences.types';
import { ProjectCollectionItemResponse } from '../../../../../core/api/projects/projects.types';
import { TechnologyCollectionItemResponse } from '../../../../../core/api/technologies/technologies.types';
import {
  buildImageAssetCatalogOptions,
  buildImageAssetsFormValue,
  buildImageAssetsMutationPayload,
  buildImageAssetsViewModels,
  normalizeImageAssetExperienceIds,
  normalizeImageAssetProjectIds,
  normalizeImageAssetTechnologyIds,
} from './image-assets-operations.helper';

const createProject = (
  overrides: Partial<ProjectCollectionItemResponse> = {},
): ProjectCollectionItemResponse => ({
  id: 'project-1',
  slug: 'portfolio-remake',
  titlePt: 'Portfolio remake',
  titleEn: 'Portfolio remake',
  shortDescriptionPt: 'Resumo',
  shortDescriptionEn: 'Summary',
  fullDescriptionPt: 'Descricao',
  fullDescriptionEn: 'Description',
  context: 'personal',
  status: 'in-progress',
  environment: 'fullstack',
  featured: true,
  highlight: true,
  startDate: '2024-01-01',
  endDate: null,
  sortOrder: 1,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  technologies: [],
  experiences: [],
  tags: [],
  links: [],
  imageAssets: [],
  ...overrides,
});

const createExperience = (
  overrides: Partial<ExperienceCollectionItemResponse> = {},
): ExperienceCollectionItemResponse => ({
  id: 'experience-1',
  slug: 'stefanini-ford',
  companyName: 'Stefanini Ford',
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
  ...overrides,
});

const createTechnology = (
  overrides: Partial<TechnologyCollectionItemResponse> = {},
): TechnologyCollectionItemResponse => ({
  id: 'technology-1',
  slug: 'angular',
  name: 'Angular',
  category: 'framework',
  level: 'advanced',
  frequency: 'frequent',
  highlight: true,
  ...overrides,
});

const createImageAsset = (overrides: Partial<ImageAssetRecord> = {}): ImageAssetRecord => ({
  id: 'image-asset-1',
  fileName: 'vh_logo_blue.svg',
  filePath: '/assets/img/logo/vh_logo_blue.svg',
  folder: 'logo',
  kind: 'ICON',
  altPt: 'Logo azul da Hans',
  altEn: 'Hans blue logo',
  captionPt: 'Versao azul da marca.',
  captionEn: 'Blue brand version.',
  mimeType: 'image/svg+xml',
  width: 240,
  height: 96,
  sortOrder: 2,
  projectIds: ['project-2'],
  experienceIds: ['experience-2'],
  technologyIds: ['technology-2'],
  formationIds: ['formation-1'],
  spokenLanguageIds: ['spoken-language-1'],
  customerIds: ['customer-1'],
  jobIds: ['job-1'],
  projects: [{ projectId: 'project-3', project: { id: 'project-3', titlePt: 'Dashboard suite' } }],
  experiences: [
    {
      experienceId: 'experience-3',
      experience: { id: 'experience-3', titlePt: 'Tech lead', companyName: 'Outsourcing' },
    },
  ],
  technologies: [
    {
      technologyId: 'technology-3',
      technology: { id: 'technology-3', name: 'NestJS' },
    },
  ],
  ...overrides,
});

describe('image-assets operations helper', () => {
  it('should sort the catalog options by title', () => {
    expect(
      buildImageAssetCatalogOptions([
        createTechnology({ id: 'technology-2', name: 'React', slug: 'react' }),
        createProject({
          id: 'project-2',
          titlePt: 'Admin workspace',
          slug: 'admin-workspace',
        }),
      ]),
    ).toEqual([
      { id: 'project-2', title: 'Admin workspace', subtitle: 'admin-workspace' },
      { id: 'technology-2', title: 'React', subtitle: 'react' },
    ]);
  });

  it('should normalize relation ids from explicit ids, nested relations and public catalogs', () => {
    expect(
      normalizeImageAssetProjectIds(
        createImageAsset(),
        [
          createProject({
            id: 'project-1',
            imageAssets: [
              {
                projectId: 'project-1',
                imageAssetId: 'another-image',
                sortOrder: 1,
                imageAsset: {
                  id: 'another-image',
                  fileName: 'vh_logo_blue.svg',
                  filePath: '/assets/img/logo/vh_logo_blue.svg',
                  folder: 'logo',
                  kind: 'ICON',
                  altPt: null,
                  altEn: null,
                  captionPt: null,
                  captionEn: null,
                  mimeType: 'image/svg+xml',
                  width: 240,
                  height: 96,
                  sortOrder: 1,
                  createdAt: '2024-01-01T00:00:00.000Z',
                  updatedAt: '2024-01-01T00:00:00.000Z',
                },
              },
            ],
          }),
        ],
      ),
    ).toEqual(['project-2', 'project-3', 'project-1']);

    expect(
      normalizeImageAssetExperienceIds(
        createImageAsset(),
        [
          createExperience({
            id: 'experience-1',
            imageAssets: [
              {
                experienceId: 'experience-1',
                imageAssetId: 'fallback-image',
                sortOrder: 1,
                imageAsset: {
                  id: 'fallback-image',
                  fileName: 'vh_logo_blue.svg',
                  filePath: '/assets/img/logo/vh_logo_blue.svg',
                  folder: 'logo',
                  kind: 'ICON',
                  altPt: null,
                  altEn: null,
                  captionPt: null,
                  captionEn: null,
                  mimeType: 'image/svg+xml',
                  width: 240,
                  height: 96,
                  sortOrder: 1,
                  createdAt: '2024-01-01T00:00:00.000Z',
                  updatedAt: '2024-01-01T00:00:00.000Z',
                },
              },
            ],
          }),
        ],
      ),
    ).toEqual(['experience-2', 'experience-3', 'experience-1']);

    expect(
      normalizeImageAssetTechnologyIds(
        createImageAsset(),
        [
          createTechnology({
            id: 'technology-1',
            imageAssets: [
              {
                imageAsset: {
                  filePath: '/assets/img/logo/vh_logo_blue.svg',
                  kind: 'ICON',
                  altPt: null,
                  altEn: null,
                },
              },
            ],
          }),
        ],
      ),
    ).toEqual(['technology-2', 'technology-3', 'technology-1']);
  });

  it('should build the form model with fallbacks for optional fields', () => {
    expect(
      buildImageAssetsFormValue(
        createImageAsset({
          altPt: null,
          altEn: null,
          captionPt: null,
          captionEn: null,
          width: null,
          height: null,
          sortOrder: null,
          formationIds: undefined,
          spokenLanguageIds: undefined,
          customerIds: undefined,
          jobIds: undefined,
        }),
        [],
        [],
        [],
      ),
    ).toEqual({
      fileName: 'vh_logo_blue.svg',
      filePath: '/assets/img/logo/vh_logo_blue.svg',
      folder: 'logo',
      kind: 'ICON',
      altPt: '',
      altEn: '',
      captionPt: '',
      captionEn: '',
      mimeType: 'image/svg+xml',
      width: '',
      height: '',
      sortOrder: '0',
      projectIds: ['project-2', 'project-3'],
      experienceIds: ['experience-2', 'experience-3'],
      technologyIds: ['technology-2', 'technology-3'],
      formationIds: [],
      spokenLanguageIds: [],
      customerIds: [],
      jobIds: [],
    });
  });

  it('should normalize missing direct relation arrays from nested relations only', () => {
    expect(
      normalizeImageAssetProjectIds(
        createImageAsset({
          projectIds: undefined,
          projects: [{ project: { id: 'project-3', titlePt: 'Dashboard suite' } }],
        }),
        [],
      ),
    ).toEqual(['project-3']);

    expect(
      normalizeImageAssetExperienceIds(
        createImageAsset({
          experienceIds: undefined,
          experiences: [
            {
              experience: {
                id: 'experience-3',
                titlePt: 'Tech lead',
                companyName: 'Outsourcing',
              },
            },
          ],
        }),
        [],
      ),
    ).toEqual(['experience-3']);

    expect(
      normalizeImageAssetTechnologyIds(
        createImageAsset({
          technologyIds: undefined,
          technologies: [{ technology: { id: 'technology-3', name: 'NestJS' } }],
        }),
        [],
      ),
    ).toEqual(['technology-3']);
  });

  it('should return an empty form when the source image asset is unavailable', () => {
    expect(buildImageAssetsFormValue(null, [], [], [])).toEqual({
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

  it('should fallback the form kind when the source asset omits it', () => {
    expect(
      buildImageAssetsFormValue(
        createImageAsset({
          kind: undefined,
          projectIds: [],
          experienceIds: [],
          technologyIds: [],
          projects: [],
          experiences: [],
          technologies: [],
        }),
        [],
        [],
        [],
      ).kind,
    ).toBe('');
  });

  it('should build sorted view-models and resolve relation labels', () => {
    const viewModels = buildImageAssetsViewModels(
      [createImageAsset({ sortOrder: 1 }), createImageAsset({ id: 'image-asset-2', fileName: 'zzz.png', sortOrder: 3 })],
      [
        createProject({ id: 'project-2', titlePt: 'Admin workspace' }),
        createProject({ id: 'project-3', titlePt: 'Dashboard suite' }),
      ],
      [
        createExperience({ id: 'experience-2', titlePt: 'Arquiteto', companyName: 'Stefanini' }),
        createExperience({ id: 'experience-3', titlePt: 'Tech lead', companyName: 'Outsourcing' }),
      ],
      [
        createTechnology({ id: 'technology-2', name: 'React' }),
        createTechnology({ id: 'technology-3', name: 'NestJS' }),
      ],
    );

    expect(viewModels[0].projectLabels).toEqual(['Admin workspace', 'Dashboard suite']);
    expect(viewModels[0].experienceLabels).toEqual([
      'Arquiteto (Stefanini)',
      'Tech lead (Outsourcing)',
    ]);
    expect(viewModels[0].technologyLabels).toEqual(['React', 'NestJS']);
    expect(viewModels[0].dimensionsLabel).toBe('240 x 96');
    expect(viewModels[0].formationLabels).toEqual(['formation-1']);
  });

  it('should sort assets with equal sort order by file name', () => {
    const viewModels = buildImageAssetsViewModels(
      [
        createImageAsset({
          id: 'image-asset-b',
          fileName: 'zzz.png',
          sortOrder: null,
          projectIds: [],
          experienceIds: [],
          technologyIds: [],
          projects: [],
          experiences: [],
          technologies: [],
        }),
        createImageAsset({
          id: 'image-asset-a',
          fileName: 'aaa.png',
          sortOrder: null,
          projectIds: [],
          experienceIds: [],
          technologyIds: [],
          projects: [],
          experiences: [],
          technologies: [],
        }),
      ],
      [],
      [],
      [],
    );

    expect(viewModels.map((item) => item.fileName)).toEqual(['aaa.png', 'zzz.png']);
  });

  it('should expose fallback labels and dimensions when optional fields are unavailable', () => {
    const [viewModel] = buildImageAssetsViewModels(
      [
        createImageAsset({
          projectIds: ['project-x'],
          experienceIds: ['experience-x'],
          technologyIds: ['technology-x'],
          projects: [],
          experiences: [],
          technologies: [],
          width: null,
          height: 96,
          sortOrder: null,
          kind: undefined,
          altPt: null,
          altEn: null,
          captionPt: null,
          captionEn: null,
        }),
      ],
      [],
      [],
      [],
    );

    expect(viewModel.projectLabels).toEqual(['project-x']);
    expect(viewModel.experienceLabels).toEqual(['experience-x']);
    expect(viewModel.technologyLabels).toEqual(['technology-x']);
    expect(viewModel.dimensionsLabel).toBe('-');
    expect(viewModel.sortOrderLabel).toBe('0');
    expect(viewModel.kind).toBe('');
    expect(viewModel.altPt).toBe('');
    expect(viewModel.altEn).toBe('');
    expect(viewModel.captionPt).toBe('');
    expect(viewModel.captionEn).toBe('');
  });

  it('should build valid and invalid mutation payloads', () => {
    expect(
      buildImageAssetsMutationPayload({
        fileName: ' vh_logo_blue.svg ',
        filePath: ' /assets/img/logo/vh_logo_blue.svg ',
        folder: ' logo ',
        kind: 'icon',
        altPt: ' Logo ',
        altEn: ' Logo ',
        captionPt: ' Legenda ',
        captionEn: ' Caption ',
        mimeType: ' image/svg+xml ',
        width: '240',
        height: '96',
        sortOrder: '4',
        projectIds: ['project-1', 'project-1'],
        experienceIds: ['experience-1', 'experience-1'],
        technologyIds: ['technology-1', 'technology-1'],
        formationIds: ['formation-1', 'formation-1'],
        spokenLanguageIds: ['spoken-language-1', 'spoken-language-1'],
        customerIds: ['customer-1', 'customer-1'],
        jobIds: ['job-1', 'job-1'],
      }),
    ).toEqual({
      isValid: true,
      payload: {
        fileName: 'vh_logo_blue.svg',
        filePath: '/assets/img/logo/vh_logo_blue.svg',
        folder: 'logo',
        kind: 'ICON',
        altPt: 'Logo',
        altEn: 'Logo',
        captionPt: 'Legenda',
        captionEn: 'Caption',
        mimeType: 'image/svg+xml',
        width: 240,
        height: 96,
        sortOrder: 4,
        projectIds: ['project-1'],
        experienceIds: ['experience-1'],
        technologyIds: ['technology-1'],
        formationIds: ['formation-1'],
        spokenLanguageIds: ['spoken-language-1'],
        customerIds: ['customer-1'],
        jobIds: ['job-1'],
      },
    });

    expect(
      buildImageAssetsMutationPayload({
        ...buildImageAssetsFormValue(createImageAsset(), [], [], []),
        fileName: '',
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.imageAssets.feedback.requiredFileName',
    });

    expect(
      buildImageAssetsMutationPayload({
        ...buildImageAssetsFormValue(createImageAsset(), [], [], []),
        kind: 'INVALID',
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.imageAssets.feedback.invalidKind',
    });

    expect(
      buildImageAssetsMutationPayload({
        ...buildImageAssetsFormValue(createImageAsset(), [], [], []),
        filePath: '',
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.imageAssets.feedback.requiredFilePath',
    });

    expect(
      buildImageAssetsMutationPayload({
        ...buildImageAssetsFormValue(createImageAsset(), [], [], []),
        folder: '',
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.imageAssets.feedback.requiredFolder',
    });

    expect(
      buildImageAssetsMutationPayload({
        ...buildImageAssetsFormValue(createImageAsset(), [], [], []),
        kind: '',
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.imageAssets.feedback.requiredKind',
    });

    expect(
      buildImageAssetsMutationPayload({
        ...buildImageAssetsFormValue(createImageAsset(), [], [], []),
        mimeType: '',
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.imageAssets.feedback.requiredMimeType',
    });

    expect(
      buildImageAssetsMutationPayload({
        ...buildImageAssetsFormValue(createImageAsset(), [], [], []),
        sortOrder: 'abc',
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.imageAssets.feedback.invalidSortOrder',
    });

    expect(
      buildImageAssetsMutationPayload({
        ...buildImageAssetsFormValue(createImageAsset(), [], [], []),
        width: 'abc',
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.imageAssets.feedback.invalidDimensions',
    });
  });
});
