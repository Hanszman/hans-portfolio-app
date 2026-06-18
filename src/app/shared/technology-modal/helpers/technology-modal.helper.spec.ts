import { createProjectsCollectionResponse } from '../../../core/api/mocks/projects.mocks';
import { createTechnologiesCollectionResponse } from '../../../core/api/mocks/technologies.mocks';
import {
  buildTechnologyModalDetail,
  buildTechnologyModalDetails,
  resolveTechnologyModalItem,
} from './technology-modal.helper';

describe('technology modal helper', () => {
  it('should build a modal detail when the value is present', () => {
    expect(
      buildTechnologyModalDetail('pages.experiences.technology.projects', 4),
    ).toEqual({
      labelKey: 'pages.experiences.technology.projects',
      value: 4,
    });
  });

  it('should ignore missing detail values', () => {
    expect(
      buildTechnologyModalDetail('pages.experiences.technology.category', undefined),
    ).toBeNull();
    expect(
      buildTechnologyModalDetail('pages.experiences.technology.category', ''),
    ).toBeNull();
  });

  it('should build the complete modal detail list from an enriched technology', () => {
    expect(
      buildTechnologyModalDetails({
        slug: 'angular',
        name: 'Angular',
        experience: '6 years',
        category: 'Frameworks',
        stack: 'Front-End',
        level: 'Advanced',
        frequency: 'Frequent',
        projectCount: 2,
      }),
    ).toEqual([
      { labelKey: 'pages.skills.detail.totalExperience', value: '6 years' },
      { labelKey: 'pages.experiences.technology.type', value: 'Frameworks' },
      { labelKey: 'pages.experiences.technology.stack', value: 'Front-End' },
      { labelKey: 'pages.experiences.technology.level', value: 'Advanced' },
      { labelKey: 'pages.experiences.technology.frequency', value: 'Frequent' },
      { labelKey: 'pages.experiences.technology.projects', value: 2 },
    ]);
  });

  it('should resolve a technology from backend catalog and count projects by slug', () => {
    const technology = resolveTechnologyModalItem(
      {
        slug: 'angular',
        name: 'Angular',
        projectCount: 99,
        image: null,
      },
      createTechnologiesCollectionResponse().data,
      createProjectsCollectionResponse().data,
      'en-us',
    );

    expect(technology).toEqual(
      jasmine.objectContaining({
        slug: 'angular',
        name: 'Angular',
        category: 'Frameworks',
        stack: 'Front-End',
        level: 'Advanced',
        frequency: 'Frequent',
        experience: '6 years 2 months',
        projectCount: 2,
      }),
    );
    expect(technology?.image?.src).toContain('/assets/img/skills/angular.png');
  });

  it('should keep fallback values when catalog and projects are not loaded yet', () => {
    expect(
      resolveTechnologyModalItem(
        {
          slug: 'custom-stack',
          name: 'Custom Stack',
          projectCount: 3,
        },
        [],
        [],
        'en-us',
      ),
    ).toEqual({
      slug: 'custom-stack',
      name: 'Custom Stack',
      projectCount: 3,
    });
  });
});
