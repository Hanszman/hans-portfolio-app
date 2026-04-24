import { createExperiencesCollectionResponse } from '../../../core/api/mocks/experiences.mocks';
import {
  buildExperiencePortfolioSummary,
  formatExperienceDateRange,
  mapExperienceToTimelineItem,
} from './experiences.helper';

describe('experiences helper', () => {
  it('should format an experience date range for both active and finished chapters', () => {
    expect(
      formatExperienceDateRange(
        '2021-09-23T00:00:00.000Z',
        null,
        'en-us',
      ),
    ).toContain('Present');

    expect(
      formatExperienceDateRange(
        '2020-04-01T00:00:00.000Z',
        '2021-09-23T00:00:00.000Z',
        'pt-BR',
      ),
    ).toContain('2021');
  });

  it('should map an API experience to a localized timeline item', () => {
    const experience = createExperiencesCollectionResponse().data[0];

    const timelineItem = mapExperienceToTimelineItem(experience, 'pt-BR');

    expect(timelineItem.companyName).toBe('Stefanini Group');
    expect(timelineItem.title).toBe('Experiencia em Stefanini Group');
    expect(timelineItem.projects[0].statusLabel).toBe('Em andamento');
    expect(timelineItem.projects[0].environmentLabel).toBe('Full stack');
    expect(timelineItem.jobs).toEqual(['Especialista Front-End']);
    expect(timelineItem.customers).toEqual(['Ford', 'Ale']);
    expect(timelineItem.technologies).toEqual([
      'Angular',
      'TypeScript',
      'Microsoft Azure',
    ]);
    expect(timelineItem.imageUrl).toContain('/assets/img/experiences/stefanini.jpg');
  });

  it('should build the portfolio summary from all experience relationships', () => {
    const summary = buildExperiencePortfolioSummary(
      createExperiencesCollectionResponse().data,
      'en-us',
    );

    expect(summary.currentRoleTitle).toBe('Experience at Stefanini Group');
    expect(summary.currentCompanyName).toBe('Stefanini Group');
    expect(summary.experienceCount).toBe('2');
    expect(summary.projectCount).toBe('3');
    expect(summary.technologyCount).toBe('4');
    expect(summary.customerCount).toBe('3');
    expect(summary.highlightCount).toBe('1');
  });

  it('should fallback to normalized labels and the first image asset when needed', () => {
    const experience = createExperiencesCollectionResponse({
      data: [
        {
          ...createExperiencesCollectionResponse().data[0],
          imageAssets: [
            {
              ...createExperiencesCollectionResponse().data[0].imageAssets[0],
              imageAsset: {
                ...createExperiencesCollectionResponse().data[0].imageAssets[0]
                  .imageAsset,
                kind: 'SCREENSHOT',
                filePath: '/assets/img/projects/github-consumer.png',
              },
            },
          ],
          projects: [
            {
              ...createExperiencesCollectionResponse().data[0].projects[0],
              project: {
                ...createExperiencesCollectionResponse().data[0].projects[0].project,
                status: 'QA_REVIEW',
                environment: 'MOBILE_APP',
              },
            },
          ],
        },
      ],
    }).data[0];

    const timelineItem = mapExperienceToTimelineItem(experience, 'en-us');

    expect(timelineItem.imageUrl).toContain('/assets/img/projects/github-consumer.png');
    expect(timelineItem.projects[0].statusLabel).toBe('Qa Review');
    expect(timelineItem.projects[0].environmentLabel).toBe('Mobile App');
  });

  it('should fallback to a highlighted chapter when there is no current one', () => {
    const summary = buildExperiencePortfolioSummary(
      createExperiencesCollectionResponse({
        data: createExperiencesCollectionResponse().data.map((experience, index) => ({
          ...experience,
          isCurrent: false,
          highlight: index === 1,
        })),
      }).data,
      'en-us',
    );

    expect(summary.currentRoleTitle).toBe('Experience at M2M Telemetria');
    expect(summary.currentCompanyName).toBe('M2M Telemetria');
    expect(summary.highlightCount).toBe('1');
  });
});
