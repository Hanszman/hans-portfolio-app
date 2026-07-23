import { appConfig } from '../../../../../core/api/api.config';
import { ImageAssetRecord } from '../../../../../core/api/admin/image-assets/image-assets-operations.types';
import { JobRecord } from '../../../../../core/api/admin/jobs/jobs-operations.types';
import { ExperienceCollectionItemResponse } from '../../../../../core/api/experiences/experiences.types';
import {
  buildJobExperienceOptions,
  buildJobImageAssetOptions,
  buildJobsFormValue,
  buildJobsMutationPayload,
  buildJobsViewModels,
  normalizeJobExperienceIds,
  normalizeJobImageAssetIds,
} from './jobs-operations.helper';

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
  filePath: '/assets/img/jobs/ford.svg',
  folder: 'jobs',
  kind: 'ICON',
  mimeType: 'image/svg+xml',
  jobIds: [],
  ...overrides,
});

const createJob = (overrides: Partial<JobRecord> = {}): JobRecord => ({
  id: 'job-1',
  slug: 'frontend-engineer',
  namePt: 'Engenheiro Front-End',
  nameEn: 'Front-End Engineer',
  summaryPt: 'Interfaces publicas e privadas.',
  summaryEn: 'Public and private interfaces.',
  highlight: true,
  sortOrder: 2,
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
        filePath: '/assets/img/jobs/acme.svg',
        kind: 'ICON',
      },
    },
  ],
  ...overrides,
});

describe('jobs operations helper', () => {
  it('should sort experience and image asset catalog options by title', () => {
    expect(
      buildJobExperienceOptions([
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
      buildJobImageAssetOptions([
        createImageAsset({ id: 'image-asset-2', fileName: 'zeta.svg' }),
        createImageAsset({ id: 'image-asset-1', fileName: 'alpha.svg' }),
      ]),
    ).toEqual([
      {
        id: 'image-asset-1',
        title: 'alpha.svg',
        subtitle: '/assets/img/jobs/ford.svg',
        imageUrl: `${appConfig.baseUrl}/assets/img/jobs/ford.svg`,
      },
      {
        id: 'image-asset-2',
        title: 'zeta.svg',
        subtitle: '/assets/img/jobs/ford.svg',
        imageUrl: `${appConfig.baseUrl}/assets/img/jobs/ford.svg`,
      },
    ]);
  });

  it('should normalize relations from explicit ids, nested records and public catalogs', () => {
    const job = createJob();

    expect(
      normalizeJobExperienceIds(job, [
        createExperience({
          id: 'experience-1',
          jobs: [
            {
              experienceId: 'experience-1',
              jobId: 'job-1',
              sortOrder: 1,
              job: {
                id: 'job-1',
                slug: 'frontend-engineer',
                namePt: 'Engenheiro Front-End',
                nameEn: 'Front-End Engineer',
                summaryPt: 'Interfaces publicas e privadas.',
                summaryEn: 'Public and private interfaces.',
                highlight: true,
                sortOrder: 2,
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z',
              },
            },
          ],
        }),
      ]),
    ).toEqual(['experience-2', 'experience-3', 'experience-1']);

    expect(
      normalizeJobImageAssetIds(job, [
        createImageAsset({
          id: 'image-asset-1',
          jobIds: ['job-1'],
        }),
        createImageAsset({
          id: 'image-asset-4',
          jobIds: undefined,
        }),
      ]),
    ).toEqual(['image-asset-2', 'image-asset-3', 'image-asset-1']);
  });

  it('should resolve catalog relations through nested job identifiers when the explicit jobId is absent', () => {
    const job = createJob();

    expect(
      normalizeJobExperienceIds(job, [
        createExperience({
          id: 'experience-4',
          jobs: [
            {
              experienceId: 'experience-4',
              jobId: '',
              sortOrder: 1,
              job: {
                id: 'job-1',
                slug: 'different-slug',
                namePt: 'Engenheiro Front-End',
                nameEn: 'Front-End Engineer',
                summaryPt: 'Interfaces publicas e privadas.',
                summaryEn: 'Public and private interfaces.',
                highlight: true,
                sortOrder: 2,
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z',
              },
            },
          ],
        }),
        createExperience({
          id: 'experience-5',
          jobs: [
            {
              experienceId: 'experience-5',
              jobId: '',
              sortOrder: 1,
              job: {
                id: 'another-job',
                slug: 'frontend-engineer',
                namePt: 'Engenheiro Front-End',
                nameEn: 'Front-End Engineer',
                summaryPt: 'Interfaces publicas e privadas.',
                summaryEn: 'Public and private interfaces.',
                highlight: true,
                sortOrder: 2,
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z',
              },
            },
          ],
        }),
      ]),
    ).toEqual(['experience-2', 'experience-3', 'experience-4', 'experience-5']);
  });

  it('should build an empty form when no job is selected', () => {
    expect(buildJobsFormValue(undefined, [], [])).toEqual({
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

  it('should map a selected job into the form model', () => {
    expect(
      buildJobsFormValue(
        createJob(),
        [
          createExperience({
            id: 'experience-1',
            jobs: [
              {
                experienceId: 'experience-1',
                jobId: 'job-1',
                sortOrder: 1,
                job: {
                  id: 'job-1',
                  slug: 'frontend-engineer',
                  namePt: 'Engenheiro Front-End',
                  nameEn: 'Front-End Engineer',
                  summaryPt: 'Interfaces publicas e privadas.',
                  summaryEn: 'Public and private interfaces.',
                  highlight: true,
                  sortOrder: 2,
                  createdAt: '2024-01-01T00:00:00.000Z',
                  updatedAt: '2024-01-01T00:00:00.000Z',
                },
              },
            ],
          }),
        ],
        [
          createImageAsset({
            id: 'image-asset-1',
            jobIds: ['job-1'],
          }),
        ],
      ),
    ).toEqual({
      slug: 'frontend-engineer',
      namePt: 'Engenheiro Front-End',
      nameEn: 'Front-End Engineer',
      summaryPt: 'Interfaces publicas e privadas.',
      summaryEn: 'Public and private interfaces.',
      highlight: true,
      sortOrder: '2',
      experienceIds: ['experience-2', 'experience-3', 'experience-1'],
      imageAssetIds: ['image-asset-2', 'image-asset-3', 'image-asset-1'],
    });
  });

  it('should gracefully map nullish relation collections and fallback scalar fields', () => {
    expect(
      buildJobsFormValue(
        createJob({
          experienceIds: undefined,
          imageAssetIds: undefined,
          experiences: undefined,
          imageAssets: undefined,
          highlight: null,
          sortOrder: null,
        }),
        [],
        [],
      ),
    ).toEqual({
      slug: 'frontend-engineer',
      namePt: 'Engenheiro Front-End',
      nameEn: 'Front-End Engineer',
      summaryPt: 'Interfaces publicas e privadas.',
      summaryEn: 'Public and private interfaces.',
      highlight: false,
      sortOrder: '0',
      experienceIds: [],
      imageAssetIds: [],
    });
  });

  it('should build sorted job view-models with resolved labels', () => {
    const viewModels = buildJobsViewModels(
      [
        createJob({
          id: 'job-2',
          slug: 'backend-engineer',
          namePt: 'Engenheiro Back-End',
          nameEn: 'Back-End Engineer',
          sortOrder: 1,
          experienceIds: ['experience-1'],
          experiences: undefined,
          imageAssetIds: ['image-asset-1'],
          imageAssets: undefined,
        }),
        createJob(),
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
      'backend-engineer',
      'frontend-engineer',
    ]);
    expect(viewModels[1].experienceLabels).toEqual(['Beta (B Co)', 'Gamma (C Co)']);
    expect(viewModels[1].imageAssetLabels).toEqual(['beta.svg (ICON)', 'gamma.svg (ICON)']);
  });

  it('should use the Portuguese name as the tie-breaker and fallback nullish flags', () => {
    const viewModels = buildJobsViewModels(
      [
        createJob({
          id: 'job-2',
          namePt: 'Zeta Role',
          nameEn: 'Zeta Role',
          slug: 'zeta-role',
          sortOrder: 1,
          experienceIds: undefined,
          experiences: undefined,
          imageAssetIds: undefined,
          imageAssets: undefined,
        }),
        createJob({
          id: 'job-1',
          namePt: 'Alpha Role',
          nameEn: 'Alpha Role',
          slug: 'alpha-role',
          sortOrder: 1,
          highlight: null,
          experienceIds: ['missing-experience'],
          experiences: [],
          imageAssetIds: ['missing-image-asset'],
          imageAssets: [],
        }),
      ],
      [],
      [],
    );

    expect(viewModels.map((viewModel) => viewModel.namePt)).toEqual(['Alpha Role', 'Zeta Role']);
    expect(viewModels[0].highlight).toBeFalse();
    expect(viewModels[0].experienceLabels).toEqual(['missing-experience']);
    expect(viewModels[0].imageAssetLabels).toEqual(['missing-image-asset']);
  });

  it('should fallback nullish sort orders to zero in labels and ordering comparisons', () => {
    const viewModels = buildJobsViewModels(
      [
        createJob({
          id: 'job-2',
          namePt: 'Beta Role',
          slug: 'beta-role',
          sortOrder: null,
          experienceIds: [],
          experiences: [],
          imageAssetIds: [],
          imageAssets: [],
        }),
        createJob({
          id: 'job-3',
          namePt: 'Alpha Role',
          slug: 'alpha-role',
          sortOrder: 1,
          experienceIds: [],
          experiences: [],
          imageAssetIds: [],
          imageAssets: [],
        }),
        createJob({
          id: 'job-4',
          namePt: 'Gamma Role',
          slug: 'gamma-role',
          sortOrder: null,
          experienceIds: [],
          experiences: [],
          imageAssetIds: [],
          imageAssets: [],
        }),
      ],
      [],
      [],
    );

    expect(viewModels.map((viewModel) => viewModel.slug)).toEqual([
      'alpha-role',
      'beta-role',
      'gamma-role',
    ]);
    expect(viewModels[1].sortOrderLabel).toBe('0');
    expect(viewModels[2].sortOrderLabel).toBe('0');
    expect(viewModels[0].sortOrderLabel).toBe('1');
  });

  it('should build a valid mutation payload with deduplicated relations', () => {
    expect(
      buildJobsMutationPayload({
        slug: ' frontend-engineer ',
        namePt: ' Engenheiro Front-End ',
        nameEn: ' Front-End Engineer ',
        summaryPt: ' Interfaces publicas e privadas. ',
        summaryEn: ' Public and private interfaces. ',
        highlight: true,
        sortOrder: '5',
        experienceIds: ['experience-1', 'experience-1'],
        imageAssetIds: ['image-asset-1', 'image-asset-1'],
      }),
    ).toEqual({
      isValid: true,
      payload: {
        slug: 'frontend-engineer',
        namePt: 'Engenheiro Front-End',
        nameEn: 'Front-End Engineer',
        summaryPt: 'Interfaces publicas e privadas.',
        summaryEn: 'Public and private interfaces.',
        highlight: true,
        sortOrder: 5,
        experienceIds: ['experience-1'],
        imageAssetIds: ['image-asset-1'],
      },
    });
  });

  it('should reject invalid mutation forms with the matching translation key', () => {
    expect(
      buildJobsMutationPayload({
        slug: '',
        namePt: '',
        nameEn: '',
        summaryPt: '',
        summaryEn: '',
        highlight: true,
        sortOrder: 'abc',
        experienceIds: [],
        imageAssetIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.jobs.feedback.requiredSlug',
    });

    expect(
      buildJobsMutationPayload({
        slug: 'frontend-engineer',
        namePt: '',
        nameEn: '',
        summaryPt: '',
        summaryEn: '',
        highlight: true,
        sortOrder: 'abc',
        experienceIds: [],
        imageAssetIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.jobs.feedback.requiredNamePt',
    });

    expect(
      buildJobsMutationPayload({
        slug: 'frontend-engineer',
        namePt: 'Engenheiro Front-End',
        nameEn: '',
        summaryPt: '',
        summaryEn: '',
        highlight: true,
        sortOrder: 'abc',
        experienceIds: [],
        imageAssetIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.jobs.feedback.requiredNameEn',
    });

    expect(
      buildJobsMutationPayload({
        slug: 'frontend-engineer',
        namePt: 'Engenheiro Front-End',
        nameEn: 'Front-End Engineer',
        summaryPt: '',
        summaryEn: '',
        highlight: true,
        sortOrder: 'abc',
        experienceIds: [],
        imageAssetIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.jobs.feedback.requiredSummaryPt',
    });

    expect(
      buildJobsMutationPayload({
        slug: 'frontend-engineer',
        namePt: 'Engenheiro Front-End',
        nameEn: 'Front-End Engineer',
        summaryPt: 'Interfaces publicas e privadas.',
        summaryEn: '',
        highlight: true,
        sortOrder: 'abc',
        experienceIds: [],
        imageAssetIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.jobs.feedback.requiredSummaryEn',
    });

    expect(
      buildJobsMutationPayload({
        slug: 'frontend-engineer',
        namePt: 'Engenheiro Front-End',
        nameEn: 'Front-End Engineer',
        summaryPt: 'Interfaces publicas e privadas.',
        summaryEn: 'Public and private interfaces.',
        highlight: true,
        sortOrder: 'abc',
        experienceIds: [],
        imageAssetIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.jobs.feedback.invalidSortOrder',
    });
  });
});
