import { createDashboardOverviewResponse } from '../../../core/api/mocks/dashboard.mocks';
import { createProjectsCollectionResponse } from '../../../core/api/mocks/projects.mocks';
import {
  buildDashboardProjectDistribution,
  buildDashboardProjectEnvironmentChart,
  buildDashboardProjectTechnologyChart,
  buildDashboardSummaryCards,
  buildDashboardStackChart,
  buildDashboardTechnologyLevelChart,
  buildDashboardTechnologyBreakdowns,
  buildDashboardTechnologyLeaders,
  buildDashboardTechnologyTypeOptions,
  buildDashboardTechnologyUsageChart,
  mapDashboardHighlightCards,
  mapDashboardStackRows,
  mapDashboardTimelineCards,
} from './dashboard.helper';

describe('dashboard helper', () => {
  it('should build localized summary cards from dashboard counters', () => {
    const cards = buildDashboardSummaryCards(createDashboardOverviewResponse().summary);

    expect(cards[0]).toEqual({
      labelKey: 'pages.dashboard.snapshot.metrics.projects',
      value: '12',
      iconName: 'LuFolderKanban',
    });
    expect(cards[5]).toEqual({
      labelKey: 'pages.dashboard.snapshot.metrics.formations',
      value: '3 / 2',
      iconName: 'LuGraduationCap',
    });
  });

  it('should map stack rows with locale-aware names and total connections', () => {
    const rows = mapDashboardStackRows(
      {
        ...createDashboardOverviewResponse().stackDistribution,
        stacks: [
          ...createDashboardOverviewResponse().stackDistribution.stacks,
          {
            slug: 'custom-stack',
            namePt: 'Stack custom',
            nameEn: 'Custom stack',
            projectCount: 1,
            technologyCount: 1,
          },
        ],
      },
      'en-us',
    );

    expect(rows[0]).toEqual({
      slug: 'front-end',
      name: 'Front-End',
      projectCount: 8,
      technologyCount: 18,
      totalConnections: 26,
      iconName: 'LuMonitorSmartphone',
    });
    expect(rows.at(-1)?.iconName).toBe('LuLayers3');
  });

  it('should build project distribution groups with translated known values and normalized fallbacks', () => {
    const distribution = buildDashboardProjectDistribution(
      {
        ...createDashboardOverviewResponse().projectContexts,
        contexts: [
          {
            key: 'PROFESSIONAL',
            count: 8,
          },
          {
            key: 'OPEN_SOURCE',
            count: 2,
          },
        ],
        environments: [
          {
            key: 'FULLSTACK',
            count: 6,
          },
          {
            key: 'MOBILE_APP',
            count: 1,
          },
        ],
      },
      'es-es',
    );

    expect(distribution.contexts).toEqual([
      { label: 'Profesional', count: 8 },
      { label: 'Open Source', count: 2 },
    ]);
    expect(distribution.environments).toEqual([
      { label: 'Full stack', count: 6 },
      { label: 'Mobile App', count: 1 },
    ]);
  });

  it('should break distribution ties alphabetically when counts match', () => {
    const distribution = buildDashboardProjectDistribution(
      {
        ...createDashboardOverviewResponse().projectContexts,
        contexts: [
          { key: 'ZETA', count: 2 },
          { key: 'ALPHA', count: 2 },
        ],
        environments: [],
      },
      'en-us',
    );

    expect(distribution.contexts).toEqual([
      { label: 'Alpha', count: 2 },
      { label: 'Zeta', count: 2 },
    ]);
  });

  it('should expose technology leaders and breakdowns with visual fallbacks', () => {
    const usage = {
      ...createDashboardOverviewResponse().technologyUsage,
      topTechnologies: [
        ...createDashboardOverviewResponse().technologyUsage.topTechnologies,
        {
          slug: 'unknown-tech',
          name: 'Unknown Tech',
          category: 'CUSTOM',
          usageCount: 2,
        },
      ],
      levels: [
        {
          key: 'ADVANCED',
          count: 14,
        },
      ],
      frequencies: [
        {
          key: 'DAILY',
          count: 12,
        },
      ],
      contexts: [
        {
          key: 'PERSONAL',
          count: 6,
        },
      ],
      sources: [
        {
          key: 'PROJECT',
          count: 9,
        },
      ],
    };

    const leaders = buildDashboardTechnologyLeaders(usage);
    const breakdowns = buildDashboardTechnologyBreakdowns(usage, 'en-us');

    expect(leaders.at(-1)).toEqual({
      slug: 'unknown-tech',
      name: 'Unknown Tech',
      usageCount: 2,
      iconName: 'LuCpu',
      visualUrl: '',
    });
    expect(breakdowns).toEqual([
      {
        labelKey: 'pages.dashboard.technology.levels',
        items: [{ label: 'Advanced', count: 14 }],
      },
      {
        labelKey: 'pages.dashboard.technology.frequencies',
        items: [{ label: 'Daily', count: 12 }],
      },
      {
        labelKey: 'pages.dashboard.technology.contexts',
        items: [{ label: 'Personal', count: 6 }],
      },
      {
        labelKey: 'pages.dashboard.technology.sources',
        items: [{ label: 'Project', count: 9 }],
      },
    ]);
  });

  it('should build chart models for stack, levels, environments and top usage', () => {
    const overview = createDashboardOverviewResponse();

    const stackChart = buildDashboardStackChart(
      mapDashboardStackRows(overview.stackDistribution, 'en-us'),
      'en-us',
    );
    const levelChart = buildDashboardTechnologyLevelChart(
      overview.technologyUsage,
      'en-us',
    );
    const environmentChart = buildDashboardProjectEnvironmentChart(
      overview.projectContexts,
      'en-us',
    );
    const usageChart = buildDashboardTechnologyUsageChart(
      overview.technologyUsage,
      'en-us',
    );

    expect(stackChart).toEqual({
      chartType: 'doughnut',
      categories: ['Front-End', 'Back-End', 'DevOps', 'Mobile'],
      seriesName: 'Stack distribution',
      series: [
        {
          name: 'Stack distribution',
          type: 'doughnut',
          data: [26, 14, 9, 6],
          label: { position: 'none' },
        },
      ],
      colors: ['primary', 'secondary', 'success', 'warning'],
      height: 320,
      showLegend: true,
    });
    expect(levelChart.chartType).toBe('doughnut');
    expect(levelChart.categories).toEqual(['Advanced']);
    expect(environmentChart.categories).toEqual(['Web', 'Mobile']);
    expect(usageChart.chartType).toBe('bar');
    expect(usageChart.categories).toEqual([
      'Angular',
      'TypeScript',
      'CSS',
      'HTML',
      'JavaScript',
      'JSON',
    ]);
  });

  it('should sort technology usage ties alphabetically', () => {
    const usageChart = buildDashboardTechnologyUsageChart(
      {
        ...createDashboardOverviewResponse().technologyUsage,
        topTechnologies: [
          {
            slug: 'zulu',
            name: 'Zulu',
            category: 'LANGUAGE',
            usageCount: 7,
          },
          {
            slug: 'alpha',
            name: 'Alpha',
            category: 'LANGUAGE',
            usageCount: 7,
          },
        ],
      },
      'en-us',
    );

    expect(usageChart.categories).toEqual(['Alpha', 'Zulu']);
  });

  it('should build technology type options and project technology charts from live project relations', () => {
    const projects = createProjectsCollectionResponse();

    const options = buildDashboardTechnologyTypeOptions(projects, 'en-us');
    const chart = buildDashboardProjectTechnologyChart(
      projects,
      'PROGRAMMING_LANGUAGES',
      'en-us',
    );

    expect(options).toEqual([
      {
        label: 'Programming Languages',
        value: 'PROGRAMMING_LANGUAGES',
      },
      {
        label: 'Cloud Hosting Platforms',
        value: 'CLOUD_HOSTING_PLATFORMS',
      },
      {
        label: 'Frameworks',
        value: 'FRAMEWORKS',
      },
      {
        label: 'Libraries',
        value: 'LIBRARIES',
      },
    ]);
    expect(chart).toEqual({
      chartType: 'bar',
      categories: ['Node.js', 'PHP', 'TypeScript'],
      seriesName: 'Programming Languages',
      series: [
        {
          name: 'Programming Languages',
          type: 'bar',
          data: [2, 1, 1],
          label: { position: 'inside', formatter: '{c}' },
        },
      ],
      colors: ['primary', 'secondary', 'success'],
      height: 360,
      showLegend: false,
    });
  });

  it('should sort technology type options alphabetically when totals tie', () => {
    const projects = createProjectsCollectionResponse({
      data: [
        {
          id: 'project-alpha',
          slug: 'alpha',
          titlePt: 'Alpha',
          titleEn: 'Alpha',
          shortDescriptionPt: 'Alpha',
          shortDescriptionEn: 'Alpha',
          fullDescriptionPt: 'Alpha',
          fullDescriptionEn: 'Alpha',
          context: 'PERSONAL',
          status: 'IN_PROGRESS',
          environment: 'FULLSTACK',
          featured: false,
          highlight: false,
          startDate: '2026-01-01T00:00:00.000Z',
          endDate: null,
          sortOrder: 1,
          isPublished: true,
          createdAt: '2026-04-18T12:00:00.000Z',
          updatedAt: '2026-04-18T12:00:00.000Z',
          technologies: [
            {
              projectId: 'project-alpha',
              technologyId: 'tech-node-alpha',
              technology: {
                id: 'tech-node-alpha',
                slug: 'node',
                name: 'Node.js',
                category: 'LANGUAGE',
                level: 'ADVANCED',
                frequency: 'FREQUENT',
                highlight: true,
                sortOrder: 36,
                isPublished: true,
                createdAt: '2026-03-25T17:44:29.830Z',
                updatedAt: '2026-03-25T17:44:29.830Z',
              },
            },
            {
              projectId: 'project-alpha',
              technologyId: 'tech-vercel-alpha',
              technology: {
                id: 'tech-vercel-alpha',
                slug: 'vercel',
                name: 'Vercel',
                category: 'CLOUD',
                level: 'INTERMEDIATE',
                frequency: 'OCCASIONAL',
                highlight: false,
                sortOrder: 56,
                isPublished: true,
                createdAt: '2026-03-25T17:44:29.830Z',
                updatedAt: '2026-03-25T17:44:29.830Z',
              },
            },
          ],
          experiences: [],
          tags: [],
          links: [],
          imageAssets: [],
        },
        {
          id: 'project-beta',
          slug: 'beta',
          titlePt: 'Beta',
          titleEn: 'Beta',
          shortDescriptionPt: 'Beta',
          shortDescriptionEn: 'Beta',
          fullDescriptionPt: 'Beta',
          fullDescriptionEn: 'Beta',
          context: 'PERSONAL',
          status: 'IN_PROGRESS',
          environment: 'FRONTEND',
          featured: false,
          highlight: false,
          startDate: '2026-02-01T00:00:00.000Z',
          endDate: null,
          sortOrder: 2,
          isPublished: true,
          createdAt: '2026-04-18T12:00:00.000Z',
          updatedAt: '2026-04-18T12:00:00.000Z',
          technologies: [
            {
              projectId: 'project-beta',
              technologyId: 'tech-php-beta',
              technology: {
                id: 'tech-php-beta',
                slug: 'php',
                name: 'PHP',
                category: 'LANGUAGE',
                level: 'ADVANCED',
                frequency: 'FREQUENT',
                highlight: true,
                sortOrder: 39,
                isPublished: true,
                createdAt: '2026-03-25T17:44:29.830Z',
                updatedAt: '2026-03-25T17:44:29.830Z',
              },
            },
            {
              projectId: 'project-beta',
              technologyId: 'tech-gcp-beta',
              technology: {
                id: 'tech-gcp-beta',
                slug: 'gcp',
                name: 'Google Cloud Platform',
                category: 'CLOUD',
                level: 'INTERMEDIATE',
                frequency: 'OCCASIONAL',
                highlight: false,
                sortOrder: 7,
                isPublished: true,
                createdAt: '2026-03-25T17:44:29.830Z',
                updatedAt: '2026-03-25T17:44:29.830Z',
              },
            },
          ],
          experiences: [],
          tags: [],
          links: [],
          imageAssets: [],
        },
      ],
      pagination: {
        page: 1,
        pageSize: 100,
        totalItems: 2,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    });

    const options = buildDashboardTechnologyTypeOptions(projects, 'en-us');

    expect(options).toEqual([
      {
        label: 'Cloud Hosting Platforms',
        value: 'CLOUD_HOSTING_PLATFORMS',
      },
      {
        label: 'Programming Languages',
        value: 'PROGRAMMING_LANGUAGES',
      },
    ]);
  });

  it('should build an empty technology chart when the selected type has no matching projects', () => {
    const chart = buildDashboardProjectTechnologyChart(
      createProjectsCollectionResponse({
        data: [
          {
            id: 'project-only-languages',
            slug: 'only-languages',
            titlePt: 'Only languages',
            titleEn: 'Only languages',
            shortDescriptionPt: 'Only languages',
            shortDescriptionEn: 'Only languages',
            fullDescriptionPt: 'Only languages',
            fullDescriptionEn: 'Only languages',
            context: 'PERSONAL',
            status: 'IN_PROGRESS',
            environment: 'FULLSTACK',
            featured: false,
            highlight: false,
            startDate: '2026-01-01T00:00:00.000Z',
            endDate: null,
            sortOrder: 1,
            isPublished: true,
            createdAt: '2026-04-18T12:00:00.000Z',
            updatedAt: '2026-04-18T12:00:00.000Z',
            technologies: [
              {
                projectId: 'project-only-languages',
                technologyId: 'tech-css',
                technology: {
                  id: 'tech-css',
                  slug: 'css',
                  name: 'CSS',
                  category: 'LANGUAGE',
                  level: 'ADVANCED',
                  frequency: 'FREQUENT',
                  highlight: true,
                  sortOrder: 5,
                  isPublished: true,
                  createdAt: '2026-03-25T17:44:29.830Z',
                  updatedAt: '2026-03-25T17:44:29.830Z',
                },
              },
            ],
            experiences: [],
            tags: [],
            links: [],
            imageAssets: [],
          },
        ],
        pagination: {
          page: 1,
          pageSize: 100,
          totalItems: 1,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      }),
      'DEPLOYMENT_TOOLS',
      'en-us',
    );

    expect(chart.categories).toEqual([]);
    expect(chart.series[0].data).toEqual([]);
  });

  it('should sort timeline cards by current/highlight priority and format present ranges', () => {
    const cards = mapDashboardTimelineCards(
      {
        ...createDashboardOverviewResponse().professionalTimeline,
        items: [
          {
            ...createDashboardOverviewResponse().professionalTimeline.items[0],
          },
          {
            ...createDashboardOverviewResponse().professionalTimeline.items[0],
            slug: 'older-experience',
            companyName: 'Older Experience',
            titlePt: 'Capitulo anterior',
            titleEn: 'Previous chapter',
            isCurrent: false,
            highlight: false,
            startDate: '2018-01-01',
            endDate: '2020-01-01',
            imagePath: null,
          },
        ],
      },
      'pt-br',
    );

    expect(cards[0].companyName).toBe('Stefanini Group');
    expect(cards[0].periodLabel).toContain('Atual');
    expect(cards[1].imageUrl).toBe('');
  });

  it('should break stack and timeline ties with slug and recent start date', () => {
    const stackRows = mapDashboardStackRows(
      {
        ...createDashboardOverviewResponse().stackDistribution,
        stacks: [
          {
            slug: 'zeta',
            namePt: 'Zeta',
            nameEn: 'Zeta',
            projectCount: 1,
            technologyCount: 1,
          },
          {
            slug: 'alpha',
            namePt: 'Alpha',
            nameEn: 'Alpha',
            projectCount: 1,
            technologyCount: 1,
          },
        ],
      },
      'en-us',
    );

    const timelineCards = mapDashboardTimelineCards(
      {
        ...createDashboardOverviewResponse().professionalTimeline,
        items: [
          {
            ...createDashboardOverviewResponse().professionalTimeline.items[0],
            slug: 'older',
            companyName: 'Older',
            isCurrent: false,
            highlight: false,
            startDate: '2020-01-01',
            endDate: '2021-01-01',
          },
          {
            ...createDashboardOverviewResponse().professionalTimeline.items[0],
            slug: 'newer',
            companyName: 'Newer',
            isCurrent: false,
            highlight: false,
            startDate: '2022-01-01',
            endDate: '2023-01-01',
          },
        ],
      },
      'en-us',
    );

    expect(stackRows[0].slug).toBe('alpha');
    expect(stackRows[1].slug).toBe('zeta');
    expect(timelineCards[0].companyName).toBe('Newer');
    expect(timelineCards[1].companyName).toBe('Older');
  });

  it('should map highlight cards with localized text and visual/icon fallbacks', () => {
    const cards = mapDashboardHighlightCards(
      {
        ...createDashboardOverviewResponse().highlights,
        items: [
          {
            ...createDashboardOverviewResponse().highlights.items[0],
          },
          {
            entity: 'unknown',
            slug: 'fallback-highlight',
            titlePt: 'Fallback highlight',
            titleEn: 'Fallback highlight',
            subtitlePt: undefined,
            subtitleEn: undefined,
            featured: false,
            icon: null,
            imagePath: null,
          },
        ],
      },
      'en-us',
    );

    expect(cards[0].visualUrl).toContain('/assets/img/projects/github-consumer.png');
    expect(cards[1]).toEqual({
      entity: 'unknown',
      slug: 'fallback-highlight',
      title: 'Fallback highlight',
      subtitle: '',
      featured: false,
      iconName: 'LuSparkles',
      visualUrl: '',
    });
  });
});
