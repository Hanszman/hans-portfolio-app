import { appConfig } from '../../../core/api/api.config';
import { createProjectsCollectionResponse } from '../../../core/api/mocks/projects.mocks';
import { createTechnologiesCollectionResponse } from '../../../core/api/mocks/technologies.mocks';
import { TechnologyCollectionItemResponse } from '../../../core/api/technologies/technologies.types';
import {
  buildTechnologyModalDetail,
  buildTechnologyModalDetails,
  resolveTechnologyModalItem,
} from './technology-modal.helper';

const buildTechnology = (
  overrides: Partial<TechnologyCollectionItemResponse>,
): TechnologyCollectionItemResponse =>
  ({
    id: overrides.id ?? `tech-${overrides.slug ?? 'custom'}`,
    slug: overrides.slug ?? 'custom',
    name: overrides.name ?? 'Custom',
    category: overrides.category ?? 'TOOL',
    level: overrides.level ?? null,
    frequency: overrides.frequency ?? null,
    highlight: overrides.highlight ?? false,
    imageAssets: overrides.imageAssets,
    experienceMetrics: overrides.experienceMetrics,
  }) as TechnologyCollectionItemResponse;

describe('technology modal helper', () => {
  it('should build a modal detail when the value is present', () => {
    expect(buildTechnologyModalDetail('pages.experiences.technology.projects', 4)).toEqual({
      labelKey: 'pages.experiences.technology.projects',
      value: 4,
    });
  });

  it('should ignore missing detail values', () => {
    expect(
      buildTechnologyModalDetail('pages.experiences.technology.category', undefined),
    ).toBeNull();
    expect(buildTechnologyModalDetail('pages.experiences.technology.category', '')).toBeNull();
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

  it('should return null without a selected technology reference', () => {
    expect(resolveTechnologyModalItem(null, [], [], 'en-us')).toBeNull();
  });

  it('should resolve catalog technologies by normalized name when the slug changes', () => {
    const technology = resolveTechnologyModalItem(
      { slug: 'react-js', name: 'React' },
      [buildTechnology({ slug: 'react', name: 'React', category: 'LIBRARY' })],
      [],
      'en-us',
    );

    expect(technology).toEqual(
      jasmine.objectContaining({
        slug: 'react',
        name: 'React',
        category: 'Libraries',
        projectCount: undefined,
      }),
    );
  });

  it('should fallback to the selected category when the catalog category is missing', () => {
    const technology = resolveTechnologyModalItem(
      {
        slug: 'custom',
        name: 'Custom',
        category: 'Custom fallback',
      },
      [
        {
          ...buildTechnology({ slug: 'custom', name: 'Custom' }),
          category: undefined,
        } as unknown as TechnologyCollectionItemResponse,
      ],
      [],
      'en-us',
    );

    expect(technology?.category).toBe('Custom fallback');
  });

  it('should resolve stack labels from slug and category rules', () => {
    const technologies = [
      buildTechnology({ slug: 'unity', name: 'Unity' }),
      buildTechnology({ slug: 'expo', name: 'Expo' }),
      buildTechnology({ slug: 'sql-server', name: 'SQL Server', category: 'DATABASE' }),
      buildTechnology({ slug: 'node-js', name: 'Node.js' }),
      buildTechnology({ slug: 'unknown', name: 'Unknown', category: 'CUSTOM_CATEGORY' }),
    ];

    expect(
      resolveTechnologyModalItem({ slug: 'unity', name: 'Unity' }, technologies, [], 'en-us')
        ?.stack,
    ).toBe('Games');
    expect(
      resolveTechnologyModalItem({ slug: 'expo', name: 'Expo' }, technologies, [], 'en-us')?.stack,
    ).toBe('Mobile');
    expect(
      resolveTechnologyModalItem(
        { slug: 'sql-server', name: 'SQL Server' },
        technologies,
        [],
        'en-us',
      )?.stack,
    ).toBe('Databases');
    expect(
      resolveTechnologyModalItem({ slug: 'node-js', name: 'Node.js' }, technologies, [], 'en-us')
        ?.stack,
    ).toBe('Back-End');
    expect(
      resolveTechnologyModalItem({ slug: 'unknown', name: 'Unknown' }, technologies, [], 'en-us')
        ?.category,
    ).toBe('Custom Category');
  });

  it('should prefer backend images and fallback to the selected image otherwise', () => {
    const fallbackImage = { src: '/fallback.svg', alt: 'Fallback icon' };
    const withoutBackendImage = resolveTechnologyModalItem(
      { slug: 'custom', name: 'Custom', image: fallbackImage },
      [buildTechnology({ slug: 'custom', name: 'Custom' })],
      [],
      'en-us',
    );

    const withBackendImage = resolveTechnologyModalItem(
      { slug: 'custom', name: 'Custom', image: fallbackImage },
      [
        buildTechnology({
          slug: 'custom',
          name: 'Custom',
          imageAssets: [
            {
              imageAsset: {
                filePath: '/assets/img/skills/custom.svg',
                kind: 'ICON',
                altPt: null,
                altEn: null,
              },
            },
          ],
        }),
      ],
      [],
      'en-us',
    );

    expect(withoutBackendImage?.image).toEqual(fallbackImage);
    expect(withBackendImage?.image).toEqual({
      src: `${appConfig.baseUrl}/assets/img/skills/custom.svg`,
      alt: 'Custom icon',
    });
  });
});
