import { createExperiencesCollectionResponse } from '../../../core/api/mocks/experiences.mocks';
import {
  formatExperienceDateRange,
  mapExperienceToTimelineItem,
} from './experiences.helper';

describe('experiences helper', () => {
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
      'Ford',
      'Ale',
    ]);
    expect(timelineItem.customers[0].image.src).toBe(
      '/assets/img/experiences/ford.jpg',
    );
    expect(timelineItem.customers[0].companyName).toBe('Stefanini Group');
    expect(timelineItem.customers[0].projectCount).toBe(2);
    expect(timelineItem.technologies.map((technology) => technology.name)).toEqual([
      'Angular',
      'TypeScript',
      'Microsoft Azure',
      'JavaScript',
      'HTML',
      'CSS',
      'Sass',
      'Bootstrap',
      'Node.js',
      'Knex.js',
      'Swagger',
      'SQL Server',
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
        labelKey: 'pages.experiences.detail.stackGroups.frontend',
        technologies: [
          'Angular',
          'TypeScript',
          'JavaScript',
          'HTML',
          'CSS',
          'Sass',
          'Bootstrap',
        ],
      },
      {
        labelKey: 'pages.experiences.detail.stackGroups.backend',
        technologies: ['Node.js', 'Knex.js', 'Swagger'],
      },
      {
        labelKey: 'pages.experiences.detail.stackGroups.databases',
        technologies: ['SQL Server'],
      },
      {
        labelKey: 'pages.experiences.detail.stackGroups.others',
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

  it('should classify database technologies by category when the slug is not mapped', () => {
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
            category: 'DATABASE',
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
        labelKey: 'pages.experiences.detail.stackGroups.databases',
        technologies: ['Oracle DB'],
      },
    ]);
  });
});
