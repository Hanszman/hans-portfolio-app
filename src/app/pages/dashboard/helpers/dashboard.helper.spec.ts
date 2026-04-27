import { createDashboardOverviewResponse } from '../../../core/api/mocks/dashboard.mocks';
import {
  buildDashboardProjectDistribution,
  buildDashboardSummaryCards,
  buildDashboardTechnologyBreakdowns,
  buildDashboardTechnologyLeaders,
  mapDashboardHighlightCards,
  mapDashboardStackRows,
  mapDashboardTimelineCards,
} from './dashboard.helper';

describe('dashboard helper', () => {
  it('should build localized summary cards from dashboard counters', () => {
    const cards = buildDashboardSummaryCards(
      createDashboardOverviewResponse().summary,
      'pt-BR',
    );

    expect(cards[0]).toEqual({
      label: 'Projetos',
      value: '12',
      iconName: 'LuFolderKanban',
    });
    expect(cards[5]).toEqual({
      label: 'Formacoes / idiomas',
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
      'pt-BR',
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
