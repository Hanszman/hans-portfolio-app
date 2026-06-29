import { buildAssetUrl } from '../../../core/api/api.config';
import {
  DashboardDistributionEntryResponse,
  DashboardHighlightItemResponse,
  DashboardHighlightsResponse,
  DashboardProfessionalTimelineResponse,
  DashboardProjectContextsResponse,
  DashboardStackDistributionResponse,
  DashboardSummaryCountersResponse,
  DashboardTechnologyUsageResponse,
} from '../../../core/api/dashboard/dashboard.types';
import { ProjectsCollectionResponse } from '../../../core/api/projects/projects.types';
import {
  resolveLocalizedText,
  translateStaticKey,
} from '../../../core/translation/translation.service';
import {
  AppLocale,
  AppTranslationKey,
} from '../../../core/translation/translation.types';
import {
  SKILL_TYPE_FILTERS,
  SKILL_TYPE_LABEL_KEYS,
  type SkillTypeFilterValue,
} from '../../skills/skills.types';
import { resolveSkillTypeKey } from '../../skills/helpers/skills.helper';
import {
  DASHBOARD_CONTEXT_LABEL_KEYS,
  DASHBOARD_ENVIRONMENT_LABEL_KEYS,
  DASHBOARD_FREQUENCY_LABEL_KEYS,
  DASHBOARD_LEVEL_LABEL_KEYS,
  DASHBOARD_SOURCE_LABEL_KEYS,
  DASHBOARD_SUMMARY_ICON_NAMES,
  DASHBOARD_SUMMARY_LABEL_KEYS,
  DashboardChartViewModel,
  DashboardDistributionRowViewModel,
  DashboardHighlightCardViewModel,
  DashboardProjectDistributionViewModel,
  DashboardStackRowViewModel,
  DashboardSummaryCardViewModel,
  DashboardTechnologyBreakdownViewModel,
  DashboardTechnologyLeaderViewModel,
  DashboardTechnologyTypeOptionViewModel,
  DashboardTimelineCardViewModel,
  resolveDashboardHighlightIconName,
  resolveDashboardStackIconName,
  resolveDashboardTechnologyIconName,
  resolveDashboardTechnologyVisualPath,
} from '../dashboard.types';

const DASHBOARD_CHART_COLORS = [
  'primary',
  'secondary',
  'success',
  'warning',
  'info',
  'danger',
] as const;

const buildChartColors = (size: number): readonly string[] =>
  DASHBOARD_CHART_COLORS.slice(0, Math.max(size, 1));

const normalizeLabel = (value: string): string =>
  value
    .toLowerCase()
    .split(/[_-]+/)
    .filter(Boolean)
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(' ');

const translateEnumValue = (
  locale: AppLocale,
  value: string,
  translationKeys: Record<string, AppTranslationKey>,
): string =>
  translationKeys[value]
    ? translateStaticKey(locale, translationKeys[value])
    : normalizeLabel(value);

const mapDistributionEntries = (
  entries: readonly DashboardDistributionEntryResponse[],
  locale: AppLocale,
  translationKeys: Record<string, AppTranslationKey>,
): readonly DashboardDistributionRowViewModel[] =>
  [...entries]
    .sort(
      (left, right) =>
        right.count - left.count || left.key.localeCompare(right.key),
    )
    .map((entry) => ({
      label: translateEnumValue(locale, entry.key, translationKeys),
      count: entry.count,
    }));

const formatMonthYear = (dateIso: string, locale: AppLocale): string =>
  new Intl.DateTimeFormat(locale, {
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateIso));

const formatTimelinePeriod = (
  startDate: string,
  endDate: string | null,
  locale: AppLocale,
): string => {
  const startLabel = formatMonthYear(startDate, locale);
  const endLabel = endDate
    ? formatMonthYear(endDate, locale)
    : translateStaticKey(locale, 'taxonomy.experiences.present');

  return `${startLabel} - ${endLabel}`;
};

const buildDashboardChartModel = (
  chartType: DashboardChartViewModel['chartType'],
  seriesName: string,
  categories: readonly string[],
  values: readonly number[],
): DashboardChartViewModel => ({
  chartType,
  categories,
  seriesName,
  series: [
    {
      name: seriesName,
      type: chartType,
      data: values,
      label:
        chartType === 'bar'
          ? { position: 'inside', formatter: '{c}' }
          : { position: 'none' },
    },
  ],
  colors: buildChartColors(categories.length),
  height: chartType === 'bar' ? 360 : 320,
  showLegend: chartType === 'doughnut',
});

const getProjectTechnologyCounts = (
  projects: ProjectsCollectionResponse,
): Map<SkillTypeFilterValue, Map<string, { name: string; count: number }>> => {
  const grouped = new Map<
    SkillTypeFilterValue,
    Map<string, { name: string; count: number }>
  >();

  for (const project of projects.data) {
    for (const relation of project.technologies) {
      const typeKey = resolveSkillTypeKey(relation.technology);
      const typeGroup =
        grouped.get(typeKey) ??
        new Map<string, { name: string; count: number }>();
      const current = typeGroup.get(relation.technology.slug) ?? {
        name: relation.technology.name,
        count: 0,
      };

      current.count += 1;
      typeGroup.set(relation.technology.slug, current);
      grouped.set(typeKey, typeGroup);
    }
  }

  return grouped;
};

export const buildDashboardSummaryCards = (
  summary: DashboardSummaryCountersResponse,
  locale: AppLocale,
): readonly DashboardSummaryCardViewModel[] => [
  {
    label: translateStaticKey(locale, DASHBOARD_SUMMARY_LABEL_KEYS.projects),
    value: String(summary.projects),
    iconName: DASHBOARD_SUMMARY_ICON_NAMES.projects,
  },
  {
    label: translateStaticKey(locale, DASHBOARD_SUMMARY_LABEL_KEYS.experiences),
    value: String(summary.experiences),
    iconName: DASHBOARD_SUMMARY_ICON_NAMES.experiences,
  },
  {
    label: translateStaticKey(locale, DASHBOARD_SUMMARY_LABEL_KEYS.technologies),
    value: String(summary.technologies),
    iconName: DASHBOARD_SUMMARY_ICON_NAMES.technologies,
  },
  {
    label: translateStaticKey(locale, DASHBOARD_SUMMARY_LABEL_KEYS.customers),
    value: String(summary.customers),
    iconName: DASHBOARD_SUMMARY_ICON_NAMES.customers,
  },
  {
    label: translateStaticKey(locale, DASHBOARD_SUMMARY_LABEL_KEYS.jobs),
    value: String(summary.jobs),
    iconName: DASHBOARD_SUMMARY_ICON_NAMES.jobs,
  },
  {
    label: translateStaticKey(locale, DASHBOARD_SUMMARY_LABEL_KEYS.formations),
    value: `${summary.formations} / ${summary.spokenLanguages}`,
    iconName: DASHBOARD_SUMMARY_ICON_NAMES.formations,
  },
];

export const buildDashboardStackChart = (
  stacks: readonly DashboardStackRowViewModel[],
  locale: AppLocale,
): DashboardChartViewModel =>
  buildDashboardChartModel(
    'doughnut',
    translateStaticKey(locale, 'pages.dashboard.stacks.label'),
    stacks.map((stack) => stack.name),
    stacks.map((stack) => stack.totalConnections),
  );

export const buildDashboardTechnologyLevelChart = (
  technologyUsage: DashboardTechnologyUsageResponse,
  locale: AppLocale,
): DashboardChartViewModel =>
  buildDashboardChartModel(
    'doughnut',
    translateStaticKey(locale, 'pages.dashboard.technology.levels'),
    technologyUsage.levels.map((level) =>
      translateEnumValue(locale, level.key, DASHBOARD_LEVEL_LABEL_KEYS),
    ),
    technologyUsage.levels.map((level) => level.count),
  );

export const buildDashboardProjectEnvironmentChart = (
  projectContexts: DashboardProjectContextsResponse,
  locale: AppLocale,
): DashboardChartViewModel =>
  buildDashboardChartModel(
    'doughnut',
    translateStaticKey(locale, 'pages.dashboard.distribution.environments'),
    projectContexts.environments.map((environment) =>
      translateEnumValue(locale, environment.key, DASHBOARD_ENVIRONMENT_LABEL_KEYS),
    ),
    projectContexts.environments.map((environment) => environment.count),
  );

export const buildDashboardTechnologyUsageChart = (
  technologyUsage: DashboardTechnologyUsageResponse,
  locale: AppLocale,
): DashboardChartViewModel => {
  const topTechnologies = [...technologyUsage.topTechnologies]
    .sort(
      (left, right) =>
        right.usageCount - left.usageCount || left.name.localeCompare(right.name),
    )
    .slice(0, 10);

  return buildDashboardChartModel(
    'bar',
    translateStaticKey(locale, 'pages.dashboard.technology.links'),
    topTechnologies.map((technology) => technology.name),
    topTechnologies.map((technology) => technology.usageCount),
  );
};

export const buildDashboardTechnologyTypeOptions = (
  projects: ProjectsCollectionResponse,
  locale: AppLocale,
): readonly DashboardTechnologyTypeOptionViewModel[] => {
  const grouped = getProjectTechnologyCounts(projects);
  const typeCounts = new Map<SkillTypeFilterValue, number>();

  for (const [typeKey, technologyCounts] of grouped.entries()) {
    let totalCount = 0;

    for (const item of technologyCounts.values()) {
      totalCount += item.count;
    }

    typeCounts.set(typeKey, totalCount);
  }

  return SKILL_TYPE_FILTERS.filter(({ value }) => value !== 'ALL' && typeCounts.has(value))
    .sort(
      (left, right) =>
        (typeCounts.get(right.value) ?? 0) - (typeCounts.get(left.value) ?? 0) ||
        translateStaticKey(locale, left.labelKey).localeCompare(
          translateStaticKey(locale, right.labelKey),
        ),
    )
    .map((filter) => ({
      label: translateStaticKey(locale, filter.labelKey),
      value: filter.value,
    }));
};

export const buildDashboardProjectTechnologyChart = (
  projects: ProjectsCollectionResponse,
  selectedType: SkillTypeFilterValue,
  locale: AppLocale,
): DashboardChartViewModel => {
  const grouped = getProjectTechnologyCounts(projects);
  const technologies = [...(grouped.get(selectedType) ?? new Map()).values()]
    .sort(
      (left, right) => right.count - left.count || left.name.localeCompare(right.name),
    )
    .slice(0, 10);

  return buildDashboardChartModel(
    'bar',
    translateStaticKey(locale, SKILL_TYPE_LABEL_KEYS[selectedType]),
    technologies.map((technology) => technology.name),
    technologies.map((technology) => technology.count),
  );
};

export const mapDashboardStackRows = (
  stackDistribution: DashboardStackDistributionResponse,
  locale: AppLocale,
): readonly DashboardStackRowViewModel[] =>
  [...stackDistribution.stacks]
    .sort(
      (left, right) =>
        right.projectCount +
          right.technologyCount -
          (left.projectCount + left.technologyCount) ||
        left.slug.localeCompare(right.slug),
    )
    .map((stack) => ({
      slug: stack.slug,
      name: resolveLocalizedText(
        locale,
        {
          'pt-br': stack.namePt,
          'en-us': stack.nameEn,
        },
        stack.nameEn,
      ),
      projectCount: stack.projectCount,
      technologyCount: stack.technologyCount,
      totalConnections: stack.projectCount + stack.technologyCount,
      iconName: resolveDashboardStackIconName(stack.slug),
    }));

export const buildDashboardProjectDistribution = (
  projectContexts: DashboardProjectContextsResponse,
  locale: AppLocale,
): DashboardProjectDistributionViewModel => ({
  featuredProjects: projectContexts.featuredProjects,
  highlightedProjects: projectContexts.highlightedProjects,
  totalProjects: projectContexts.totalProjects,
  contexts: mapDistributionEntries(
    projectContexts.contexts,
    locale,
    DASHBOARD_CONTEXT_LABEL_KEYS,
  ),
  environments: mapDistributionEntries(
    projectContexts.environments,
    locale,
    DASHBOARD_ENVIRONMENT_LABEL_KEYS,
  ),
});

export const buildDashboardTechnologyLeaders = (
  technologyUsage: DashboardTechnologyUsageResponse,
): readonly DashboardTechnologyLeaderViewModel[] =>
  technologyUsage.topTechnologies.map((technology) => ({
    slug: technology.slug,
    name: technology.name,
    usageCount: technology.usageCount,
    iconName: resolveDashboardTechnologyIconName(technology.category),
    visualUrl: buildAssetUrl(
      resolveDashboardTechnologyVisualPath(technology.slug),
    ),
  }));

export const buildDashboardTechnologyBreakdowns = (
  technologyUsage: DashboardTechnologyUsageResponse,
  locale: AppLocale,
): readonly DashboardTechnologyBreakdownViewModel[] => [
  {
    labelKey: 'pages.dashboard.technology.levels',
    items: mapDistributionEntries(
      technologyUsage.levels,
      locale,
      DASHBOARD_LEVEL_LABEL_KEYS,
    ),
  },
  {
    labelKey: 'pages.dashboard.technology.frequencies',
    items: mapDistributionEntries(
      technologyUsage.frequencies,
      locale,
      DASHBOARD_FREQUENCY_LABEL_KEYS,
    ),
  },
  {
    labelKey: 'pages.dashboard.technology.contexts',
    items: mapDistributionEntries(
      technologyUsage.contexts,
      locale,
      DASHBOARD_CONTEXT_LABEL_KEYS,
    ),
  },
  {
    labelKey: 'pages.dashboard.technology.sources',
    items: mapDistributionEntries(
      technologyUsage.sources,
      locale,
      DASHBOARD_SOURCE_LABEL_KEYS,
    ),
  },
];

const mapDashboardHighlightCard = (
  highlight: DashboardHighlightItemResponse,
  locale: AppLocale,
): DashboardHighlightCardViewModel => ({
  entity: highlight.entity,
  slug: highlight.slug,
  title: resolveLocalizedText(
    locale,
    {
      'pt-br': highlight.titlePt,
      'en-us': highlight.titleEn,
    },
    highlight.titleEn,
  ),
  subtitle: resolveLocalizedText(
    locale,
    {
      'pt-br': highlight.subtitlePt ?? undefined,
      'en-us': highlight.subtitleEn ?? undefined,
    },
    highlight.subtitleEn ?? '',
  ),
  featured: highlight.featured === true,
  iconName: resolveDashboardHighlightIconName(highlight.entity),
  visualUrl: buildAssetUrl(highlight.imagePath ?? highlight.icon),
});

export const mapDashboardTimelineCards = (
  professionalTimeline: DashboardProfessionalTimelineResponse,
  locale: AppLocale,
): readonly DashboardTimelineCardViewModel[] =>
  [...professionalTimeline.items]
    .sort((left, right) => {
      const leftPriority = Number(left.isCurrent) + Number(left.highlight);
      const rightPriority = Number(right.isCurrent) + Number(right.highlight);

      return (
        rightPriority - leftPriority ||
        new Date(right.startDate).getTime() - new Date(left.startDate).getTime()
      );
    })
    .map((item) => ({
      slug: item.slug,
      companyName: item.companyName,
      title: resolveLocalizedText(
        locale,
        {
          'pt-br': item.titlePt,
          'en-us': item.titleEn,
        },
        item.titleEn,
      ),
      periodLabel: formatTimelinePeriod(item.startDate, item.endDate, locale),
      isCurrent: item.isCurrent,
      isHighlight: item.highlight,
      jobs: item.jobs,
      customers: item.customers,
      projects: item.projects,
      technologies: item.technologies,
      imageUrl: buildAssetUrl(item.imagePath),
    }));

export const mapDashboardHighlightCards = (
  highlights: DashboardHighlightsResponse,
  locale: AppLocale,
): readonly DashboardHighlightCardViewModel[] =>
  highlights.items.map((highlight) => mapDashboardHighlightCard(highlight, locale));
