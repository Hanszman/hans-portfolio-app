import { createExperiencesCollectionResponse } from '../../../core/api/mocks/experiences.mocks';
import { ExperienceCollectionItemResponse } from '../../../core/api/experiences/experiences.types';
import {
  formatExperienceDateRange,
  mapExperienceToTimelineItem,
} from './experiences.helper';

describe('experiences helper', () => {
  it('should fallback the customer summary to an empty string when every locale is missing', () => {
    const experience = createExperiencesCollectionResponse().data[0];
    const experienceWithoutCustomerSummary = {
      ...experience,
      customers: [
        {
          ...experience.customers[0],
          customer: {
            ...experience.customers[0].customer,
            summaryPt: undefined,
            summaryEn: undefined,
            summaryEs: undefined,
          },
        },
      ],
    } as unknown as ExperienceCollectionItemResponse;

    const timelineItem = mapExperienceToTimelineItem(
      experienceWithoutCustomerSummary,
      'en-us',
    );

    expect(timelineItem.customers[0].summary).toBe('');
  });

  it('should format an experience date range for both active and finished chapters', () => {
    expect(
      formatExperienceDateRange('2021-09-23T00:00:00.000Z', null, 'en-us'),
    ).toContain('Present');

    expect(
      formatExperienceDateRange(
        '2020-04-01T00:00:00.000Z',
        '2021-09-23T00:00:00.000Z',
        'pt-br',
      ),
    ).toContain('2021');
  });

  it('should map an API experience to a localized timeline item', () => {
    const experience = createExperiencesCollectionResponse().data[0];

    const timelineItem = mapExperienceToTimelineItem(experience, 'pt-br');

    expect(timelineItem.companyName).toBe('Stefanini Group');
    expect(timelineItem.roleTitle).toBe('Desenvolvedor Full Stack');
    expect(timelineItem.companyImage.src).toBe(
      '/assets/img/experiences/stefanini.jpg',
    );
    expect(timelineItem.customers.map((customer) => customer.name)).toEqual([
      'Ale',
      'Ford',
    ]);
    expect(timelineItem.customers[0].image.src).toBe(
      '/assets/img/experiences/ale.jpg',
    );
    expect(timelineItem.customers[0].companyName).toBe('Stefanini Group');
    expect(timelineItem.customers[0].projectCount).toBe(2);
    expect(timelineItem.technologies.map((technology) => technology.name)).toEqual([
      'Angular',
      'CSS',
      'HTML',
      'JavaScript',
      'TypeScript',
      'Bootstrap',
      'Knex.js',
      'Microsoft Azure',
      'Node.js',
      'Sass',
      'SQL Server',
      'Swagger',
    ]);
    expect(timelineItem.extraTechnologyCount).toBe(4);
  });

  it('should group technologies for the detail drawer', () => {
    const experience = createExperiencesCollectionResponse().data[0];

    const timelineItem = mapExperienceToTimelineItem(experience, 'en-us');

    expect(
      timelineItem.technologyGroups.map((group) => ({
        labelKey: group.labelKey,
        technologies: group.technologies.map((technology) => technology.name),
      })),
    ).toEqual([
      {
        labelKey: 'taxonomy.skills.stack.frontEnd',
        technologies: [
          'Angular',
          'CSS',
          'HTML',
          'JavaScript',
          'TypeScript',
          'Bootstrap',
          'Sass',
        ],
      },
      {
        labelKey: 'taxonomy.skills.stack.backEnd',
        technologies: ['Knex.js', 'Node.js', 'Swagger'],
      },
      {
        labelKey: 'taxonomy.skills.stack.databases',
        technologies: ['SQL Server'],
      },
      {
        labelKey: 'taxonomy.skills.stack.others',
        technologies: ['Microsoft Azure'],
      },
    ]);
  });

  it('should fallback to the experience title when no localized job is available', () => {
    const experience = {
      ...createExperiencesCollectionResponse().data[0],
      jobs: [],
    };

    const timelineItem = mapExperienceToTimelineItem(experience, 'en-us');

    expect(timelineItem.roleTitle).toBe('Experience at Stefanini Group');
  });

  it('should use the job with the most recent end date as the experience subtitle', () => {
    const baseExperience = createExperiencesCollectionResponse().data[0];
    const baseRelation = baseExperience.jobs[0];
    const experience = {
      ...baseExperience,
      jobs: [
        {
          ...baseRelation,
          jobId: 'recent-job',
          job: {
            ...baseRelation.job,
            id: 'recent-job',
            nameEn: 'Senior Software Engineer',
            startDate: '2020-01-02',
            endDate: null,
          },
        },
        {
          ...baseRelation,
          jobId: 'older-job',
          job: {
            ...baseRelation.job,
            id: 'older-job',
            nameEn: 'Software Engineer',
            startDate: '2019-01-01',
            endDate: '2020-01-01',
          },
        },
      ],
    };

    const timelineItem = mapExperienceToTimelineItem(experience, 'en-us');

    expect(timelineItem.roleTitle).toBe('Senior Software Engineer');
    expect(timelineItem.jobs.map(({ id }) => id)).toEqual(['recent-job', 'older-job']);

    const reverseInputTimelineItem = mapExperienceToTimelineItem(
      { ...experience, jobs: [...experience.jobs].reverse() },
      'en-us',
    );
    expect(reverseInputTimelineItem.jobs.map(({ id }) => id)).toEqual([
      'recent-job',
      'older-job',
    ]);
  });

  it('should break equal job end-date ties with the most recent start date', () => {
    const baseExperience = createExperiencesCollectionResponse().data[0];
    const baseRelation = baseExperience.jobs[0];
    const experience = {
      ...baseExperience,
      jobs: [
        {
          ...baseRelation,
          jobId: 'earlier-start',
          job: {
            ...baseRelation.job,
            id: 'earlier-start',
            startDate: '2019-01-01',
            endDate: null,
          },
        },
        {
          ...baseRelation,
          jobId: 'later-start',
          job: {
            ...baseRelation.job,
            id: 'later-start',
            startDate: '2020-01-01',
            endDate: null,
          },
        },
      ],
    };

    const timelineItem = mapExperienceToTimelineItem(experience, 'en-us');

    expect(timelineItem.jobs.map(({ id }) => id)).toEqual([
      'later-start',
      'earlier-start',
    ]);
  });

  it('should fallback to a normalized company image path when no asset is available', () => {
    const experience = {
      ...createExperiencesCollectionResponse().data[0],
      companyName: 'Empresa Ágil & Digital',
      imageAssets: [],
    };

    const timelineItem = mapExperienceToTimelineItem(experience, 'en-us');

    expect(timelineItem.companyImage).toEqual({
      src: '/assets/img/experiences/empresaagiledigital.jpg',
      alt: 'Empresa Ágil & Digital logo',
    });
  });

  it('should classify database technologies by type when the slug is not mapped', () => {
    const experience = {
      ...createExperiencesCollectionResponse().data[1],
      technologies: [
        {
          experienceId: 'experience-m2m',
          technologyId: 'tech-oracle',
          technology: {
            id: 'tech-oracle',
            slug: 'oracle-db',
            name: 'Oracle DB',
            type: 'RELATIONAL_DATABASES' as const,
            level: 'INTERMEDIATE',
            frequency: 'OCCASIONAL',
            highlight: false,
            sortOrder: 1,
            createdAt: '2026-03-25T17:44:29.830Z',
            updatedAt: '2026-03-25T17:44:29.830Z',
          },
        },
      ],
    };

    const timelineItem = mapExperienceToTimelineItem(experience, 'en-us');

    expect(
      timelineItem.technologyGroups.map((group) => ({
        labelKey: group.labelKey,
        technologies: group.technologies.map((technology) => technology.name),
      })),
    ).toEqual([
      {
        labelKey: 'taxonomy.skills.stack.databases',
        technologies: ['Oracle DB'],
      },
    ]);
  });
});
