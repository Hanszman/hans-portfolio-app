import { JobRecord } from '../../../../../core/api/jobs/jobs.types';
import { ExperienceCollectionItemResponse } from '../../../../../core/api/experiences/experiences.types';
import {
  buildJobExperienceOptions,
  buildJobsFormValue,
  buildJobsMutationPayload,
  buildJobsViewModels,
  normalizeJobExperienceIds,
} from './jobs-operations.helper';
import { JobsOperationsFormValue } from '../jobs-operations.types';

const buildJobMutation = (
  form: Omit<JobsOperationsFormValue, 'startDate' | 'endDate'> &
    Partial<Pick<JobsOperationsFormValue, 'startDate' | 'endDate'>>,
) =>
  buildJobsMutationPayload({
    startDate: '2021-09-23',
    endDate: '',
    ...form,
  });

const createExperience = (
  overrides: Partial<ExperienceCollectionItemResponse> = {},
): ExperienceCollectionItemResponse => ({
  id: 'experience-1',
  slug: 'ford-account',
  companyName: 'Ford',
  titlePt: 'Analista',
  titleEn: 'Analyst',
  titleEs: 'Analyst',
  summaryPt: 'Resumo',
  summaryEn: 'Summary',
  summaryEs: 'Summary',
  descriptionPt: 'Descricao',
  descriptionEn: 'Description',
  descriptionEs: 'Description',
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

const createJob = (overrides: Partial<JobRecord> = {}): JobRecord => ({
  id: 'job-1',
  slug: 'frontend-engineer',
  namePt: 'Engenheiro Front-End',
  nameEn: 'Front-End Engineer',
  nameEs: 'Front-End Engineer',
  summaryPt: 'Interfaces publicas e privadas.',
  summaryEn: 'Public and private interfaces.',
  summaryEs: 'Public and private interfaces.',
  startDate: '2021-09-23',
  endDate: null,
  highlight: true,
  sortOrder: 2,
  experienceIds: ['experience-2'],
  experiences: [
    {
      experienceId: 'experience-3',
      experience: {
        id: 'experience-3',
        slug: 'banking',
        companyName: 'Acme',
        titlePt: 'Consultor',
        titleEn: 'Consultant',
        titleEs: 'Consultant',
      },
    },
  ],
  ...overrides,
});

describe('jobs operations helper', () => {
  it('should sort experience catalog options by title', () => {
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
                nameEs: 'Front-End Engineer',
                summaryPt: 'Interfaces publicas e privadas.',
                summaryEn: 'Public and private interfaces.',
                summaryEs: 'Public and private interfaces.',
                startDate: '2021-09-23',
                endDate: null,
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
                nameEs: 'Front-End Engineer',
                summaryPt: 'Interfaces publicas e privadas.',
                summaryEn: 'Public and private interfaces.',
                summaryEs: 'Public and private interfaces.',
                startDate: '2021-09-23',
                endDate: null,
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
                nameEs: 'Front-End Engineer',
                summaryPt: 'Interfaces publicas e privadas.',
                summaryEn: 'Public and private interfaces.',
                summaryEs: 'Public and private interfaces.',
                startDate: '2021-09-23',
                endDate: null,
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
    expect(buildJobsFormValue(undefined, [])).toEqual({
      slug: '',
      namePt: '',
      nameEn: '',
      nameEs: '',
      summaryPt: '',
      summaryEn: '',
      summaryEs: '',
      startDate: '',
      endDate: '',
      highlight: true,
      sortOrder: '0',
      experienceIds: [],
    });
  });

  it('should map a selected job into the form model', () => {
    expect(
      buildJobsFormValue(createJob(), [
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
                nameEs: 'Front-End Engineer',
                summaryPt: 'Interfaces publicas e privadas.',
                summaryEn: 'Public and private interfaces.',
                summaryEs: 'Public and private interfaces.',
                startDate: '2021-09-23',
                endDate: null,
                highlight: true,
                sortOrder: 2,
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z',
              },
            },
          ],
        }),
      ]),
    ).toEqual({
      slug: 'frontend-engineer',
      namePt: 'Engenheiro Front-End',
      nameEn: 'Front-End Engineer',
      nameEs: 'Front-End Engineer',
      summaryPt: 'Interfaces publicas e privadas.',
      summaryEn: 'Public and private interfaces.',
      summaryEs: 'Public and private interfaces.',
      startDate: '2021-09-23',
      endDate: '',
      highlight: true,
      sortOrder: '2',
      experienceIds: ['experience-2', 'experience-3', 'experience-1'],
    });
  });

  it('should gracefully map nullish relation collections and fallback scalar fields', () => {
    expect(
      buildJobsFormValue(
        createJob({
          nameEs: undefined,
          summaryPt: undefined,
          summaryEn: undefined,
          summaryEs: undefined,
          experienceIds: undefined,
          experiences: undefined,
          highlight: null,
          sortOrder: null,
        }),
        [],
      ),
    ).toEqual({
      slug: 'frontend-engineer',
      namePt: 'Engenheiro Front-End',
      nameEn: 'Front-End Engineer',
      nameEs: '',
      summaryPt: '',
      summaryEn: '',
      summaryEs: '',
      startDate: '2021-09-23',
      endDate: '',
      highlight: false,
      sortOrder: '0',
      experienceIds: [],
    });

    const [legacyViewModel] = buildJobsViewModels(
      [
        createJob({
          nameEs: undefined,
          summaryPt: undefined,
          summaryEn: undefined,
          summaryEs: undefined,
        }),
      ],
      [],
    );
    expect(legacyViewModel.nameEs).toBe('');
    expect(legacyViewModel.summaryPt).toBe('');
    expect(legacyViewModel.summaryEn).toBe('');
    expect(legacyViewModel.summaryEs).toBe('');
  });

  it('should build sorted job view-models with resolved labels', () => {
    const viewModels = buildJobsViewModels(
      [
        createJob({
          id: 'job-2',
          slug: 'backend-engineer',
          namePt: 'Engenheiro Back-End',
          nameEn: 'Back-End Engineer',
          nameEs: 'Back-End Engineer',
          sortOrder: 1,
          experienceIds: ['experience-1'],
          experiences: undefined,
        }),
        createJob(),
      ],
      [
        createExperience({ id: 'experience-1', titlePt: 'Alpha', companyName: 'A Co' }),
        createExperience({ id: 'experience-2', titlePt: 'Beta', companyName: 'B Co' }),
        createExperience({ id: 'experience-3', titlePt: 'Gamma', companyName: 'C Co' }),
      ],
    );

    expect(viewModels.map((viewModel) => viewModel.slug)).toEqual([
      'backend-engineer',
      'frontend-engineer',
    ]);
    expect(viewModels[1].experienceLabels).toEqual(['Beta (B Co)', 'Gamma (C Co)']);
  });

  it('should use the Portuguese name as the tie-breaker and fallback nullish flags', () => {
    const viewModels = buildJobsViewModels(
      [
        createJob({
          id: 'job-2',
          namePt: 'Zeta Role',
          nameEn: 'Zeta Role',
          nameEs: 'Zeta Role',
          slug: 'zeta-role',
          sortOrder: 1,
          experienceIds: undefined,
          experiences: undefined,
        }),
        createJob({
          id: 'job-1',
          namePt: 'Alpha Role',
          nameEn: 'Alpha Role',
          nameEs: 'Alpha Role',
          slug: 'alpha-role',
          sortOrder: 1,
          highlight: null,
          experienceIds: ['missing-experience'],
          experiences: [],
        }),
      ],
      [],
    );

    expect(viewModels.map((viewModel) => viewModel.namePt)).toEqual(['Alpha Role', 'Zeta Role']);
    expect(viewModels[0].highlight).toBeFalse();
    expect(viewModels[0].experienceLabels).toEqual(['missing-experience']);
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
        }),
        createJob({
          id: 'job-3',
          namePt: 'Alpha Role',
          slug: 'alpha-role',
          sortOrder: 1,
          experienceIds: [],
          experiences: [],
        }),
        createJob({
          id: 'job-4',
          namePt: 'Gamma Role',
          slug: 'gamma-role',
          sortOrder: null,
          experienceIds: [],
          experiences: [],
        }),
      ],
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
      buildJobMutation({
        slug: ' frontend-engineer ',
        namePt: ' Engenheiro Front-End ',
        nameEn: ' Front-End Engineer ',
        summaryPt: ' Interfaces publicas e privadas. ',
        summaryEn: ' Public and private interfaces. ',
        highlight: true,
        sortOrder: '5',
        experienceIds: ['experience-1', 'experience-1'],
      }),
    ).toEqual({
      isValid: true,
      payload: {
        slug: 'frontend-engineer',
        namePt: 'Engenheiro Front-End',
        nameEn: 'Front-End Engineer',
        nameEs: 'Front-End Engineer',
        summaryPt: 'Interfaces publicas e privadas.',
        summaryEn: 'Public and private interfaces.',
        summaryEs: 'Public and private interfaces.',
        startDate: '2021-09-23T00:00:00.000Z',
        highlight: true,
        sortOrder: 5,
        experienceIds: ['experience-1'],
      },
    });
  });

  it('should null out blank summaries in the mutation payload', () => {
    expect(
      buildJobMutation({
        slug: 'frontend-engineer',
        namePt: 'Engenheiro Front-End',
        nameEn: 'Front-End Engineer',
        summaryPt: '   ',
        summaryEn: '   ',
        highlight: true,
        sortOrder: '5',
        experienceIds: [],
      }),
    ).toEqual({
      isValid: true,
      payload: {
        slug: 'frontend-engineer',
        namePt: 'Engenheiro Front-End',
        nameEn: 'Front-End Engineer',
        nameEs: 'Front-End Engineer',
        summaryPt: null,
        summaryEn: null,
        summaryEs: null,
        startDate: '2021-09-23T00:00:00.000Z',
        highlight: true,
        sortOrder: 5,
        experienceIds: [],
      },
    });
  });

  it('should reject invalid mutation forms with the matching translation key', () => {
    expect(
      buildJobMutation({
        slug: '',
        namePt: '',
        nameEn: '',
        nameEs: '',
        summaryPt: '',
        summaryEn: '',
        summaryEs: '',
        highlight: true,
        sortOrder: 'abc',
        experienceIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.jobs.feedback.requiredSlug',
    });

    expect(
      buildJobMutation({
        slug: 'frontend-engineer',
        namePt: '',
        nameEn: '',
        nameEs: '',
        summaryPt: '',
        summaryEn: '',
        summaryEs: '',
        highlight: true,
        sortOrder: 'abc',
        experienceIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.jobs.feedback.requiredNamePt',
    });

    expect(
      buildJobMutation({
        slug: 'frontend-engineer',
        namePt: 'Engenheiro Front-End',
        nameEn: '',
        nameEs: '',
        summaryPt: '',
        summaryEn: '',
        summaryEs: '',
        highlight: true,
        sortOrder: 'abc',
        experienceIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'pages.admin.jobs.feedback.requiredNameEn',
    });

    expect(
      buildJobMutation({
        slug: 'frontend-engineer',
        namePt: 'Engenheiro Front-End',
        nameEn: 'Front-End Engineer',
        nameEs: '',
        summaryPt: 'Interfaces publicas e privadas.',
        summaryEn: 'Public and private interfaces.',
        summaryEs: 'Interfaces publicas y privadas.',
        highlight: true,
        sortOrder: '1',
        experienceIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'common.feedback.requiredSpanishName',
    });

    expect(
      buildJobMutation({
        slug: 'frontend-engineer',
        namePt: 'Engenheiro Front-End',
        nameEn: 'Front-End Engineer',
        nameEs: 'Ingeniero Front-End',
        summaryPt: 'Interfaces publicas e privadas.',
        summaryEn: 'Public and private interfaces.',
        summaryEs: 'Interfaces publicas y privadas.',
        startDate: '',
        sortOrder: '1',
        highlight: true,
        experienceIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'common.feedback.requiredStartDate',
    });

    expect(
      buildJobMutation({
        slug: 'frontend-engineer',
        namePt: 'Engenheiro Front-End',
        nameEn: 'Front-End Engineer',
        nameEs: 'Ingeniero Front-End',
        summaryPt: 'Interfaces publicas e privadas.',
        summaryEn: 'Public and private interfaces.',
        summaryEs: 'Interfaces publicas y privadas.',
        startDate: '2021-09-23',
        endDate: '2021-09-22',
        sortOrder: '1',
        highlight: true,
        experienceIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'common.feedback.invalidDateRange',
    });

    expect(
      buildJobMutation({
        slug: 'frontend-engineer',
        namePt: 'Engenheiro Front-End',
        nameEn: 'Front-End Engineer',
        nameEs: 'Front-End Engineer',
        summaryPt: 'Interfaces publicas e privadas.',
        summaryEn: 'Public and private interfaces.',
        summaryEs: 'Public and private interfaces.',
        highlight: true,
        sortOrder: 'abc',
        experienceIds: [],
      }),
    ).toEqual({
      isValid: false,
      errorKey: 'common.feedback.invalidIntegerSortOrder',
    });
  });
});
