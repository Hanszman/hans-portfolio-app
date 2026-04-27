import { buildAssetUrl } from '../../../core/api/api.config';
import {
  TechnologiesCollectionResponse,
  TechnologyCollectionItemResponse,
  TechnologyContextKey,
} from '../../../core/api/technologies/technologies.types';
import { AppLocale } from '../../../core/translation/translation.types';
import {
  SKILL_CATEGORY_LABELS,
  SKILL_CONTEXT_LABELS,
  SKILL_FREQUENCY_LABELS,
  SKILL_GROUP_ICON_NAMES,
  SKILL_GROUP_TONES,
  SKILL_LEVEL_LABELS,
  SKILL_VISUALS,
  SkillCardViewModel,
  SkillContextMetricViewModel,
  SkillsGroupViewModel,
  SkillsSummaryMetricViewModel,
} from '../skills.types';

const SKILL_CONTEXT_ORDER: readonly TechnologyContextKey[] = [
  'PROFESSIONAL',
  'PERSONAL',
  'ACADEMIC',
  'STUDY',
];

const normalizeLabel = (value: string): string =>
  value
    .toLowerCase()
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const resolveLocalizedLabel = (
  catalog: Record<string, Record<AppLocale, string>>,
  value: string | null,
  locale: AppLocale,
  fallback: string,
): string => {
  if (!value) {
    return fallback;
  }

  return catalog[value]?.[locale] ?? normalizeLabel(value);
};

export const resolveSkillVisualUrl = (
  slug: string,
  fallbackPath?: string,
): string => buildAssetUrl(fallbackPath ?? SKILL_VISUALS[slug.toLowerCase()] ?? '');

export const mapTechnologyToSkillCard = (
  technology: TechnologyCollectionItemResponse,
  locale: AppLocale,
): SkillCardViewModel => {
  const imageAsset =
    technology.imageAssets?.find(({ imageAsset }) => imageAsset.kind === 'ICON') ??
    technology.imageAssets?.[0];
  const contexts: SkillContextMetricViewModel[] = SKILL_CONTEXT_ORDER.map((key) => ({
    key,
    label: SKILL_CONTEXT_LABELS[key][locale],
    value:
      technology.experienceMetrics?.byContext[key].label ??
      (locale === 'pt-BR' ? '0 meses' : '0 months'),
    totalMonths: technology.experienceMetrics?.byContext[key].totalMonths ?? 0,
  })).filter((context) => context.totalMonths > 0);

  return {
    id: technology.id,
    slug: technology.slug,
    name: technology.name,
    categoryLabel: resolveLocalizedLabel(
      SKILL_CATEGORY_LABELS,
      technology.category,
      locale,
      locale === 'pt-BR' ? 'Nao categorizada' : 'Uncategorized',
    ),
    levelLabel: resolveLocalizedLabel(
      SKILL_LEVEL_LABELS,
      technology.level,
      locale,
      locale === 'pt-BR' ? 'Nivel nao informado' : 'Level not set',
    ),
    frequencyLabel: resolveLocalizedLabel(
      SKILL_FREQUENCY_LABELS,
      technology.frequency,
      locale,
      locale === 'pt-BR' ? 'Frequencia nao informada' : 'Frequency not set',
    ),
    totalExperienceLabel:
      technology.experienceMetrics?.total.label ??
      (locale === 'pt-BR' ? 'Sem periodo consolidado' : 'No duration available'),
    isHighlight: technology.highlight,
    iconName: SKILL_GROUP_ICON_NAMES[technology.category] ?? 'LuSparkles',
    visualUrl: resolveSkillVisualUrl(technology.slug, imageAsset?.imageAsset.filePath),
    contexts,
  };
};

export const buildSkillsSummaryMetrics = (
  technologies: TechnologyCollectionItemResponse[],
  locale: AppLocale,
): readonly SkillsSummaryMetricViewModel[] => {
  const highlightedCount = technologies.filter((technology) => technology.highlight).length;
  const advancedCount = technologies.filter(
    (technology) => technology.level === 'ADVANCED',
  ).length;
  const categories = new Set(technologies.map((technology) => technology.category));
  const strongestTechnology = [...technologies].sort(
    (left, right) =>
      (right.experienceMetrics?.total.totalMonths ?? 0) -
      (left.experienceMetrics?.total.totalMonths ?? 0),
  )[0];

  return [
    {
      label: locale === 'pt-BR' ? 'Tecnologias mapeadas' : 'Mapped technologies',
      value: String(technologies.length),
    },
    {
      label: locale === 'pt-BR' ? 'Destaques' : 'Highlights',
      value: String(highlightedCount),
    },
    {
      label: locale === 'pt-BR' ? 'Categorias' : 'Categories',
      value: String(categories.size),
    },
    {
      label: locale === 'pt-BR' ? 'Stack avancada' : 'Advanced stack',
      value: String(advancedCount),
    },
    {
      label: locale === 'pt-BR' ? 'Maior tempo total' : 'Longest total time',
      value: strongestTechnology?.name ?? '-',
      supportingText: strongestTechnology?.experienceMetrics?.total.label ?? '',
    },
  ];
};

export const buildSkillsGroups = (
  technologies: TechnologyCollectionItemResponse[],
  locale: AppLocale,
): readonly SkillsGroupViewModel[] => {
  const grouped = new Map<string, TechnologyCollectionItemResponse[]>();

  for (const technology of technologies) {
    const currentGroup = grouped.get(technology.category) ?? [];
    currentGroup.push(technology);
    grouped.set(technology.category, currentGroup);
  }

  return [...grouped.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([category, items]) => ({
      id: category,
      title: resolveLocalizedLabel(
        SKILL_CATEGORY_LABELS,
        category,
        locale,
        locale === 'pt-BR' ? 'Nao categorizada' : 'Uncategorized',
      ),
      description:
        locale === 'pt-BR'
          ? `${items.length} tecnologias com tempo real consolidado por contexto.`
          : `${items.length} technologies with real duration coverage by context.`,
      tone: SKILL_GROUP_TONES[category] ?? 'base',
      iconName: SKILL_GROUP_ICON_NAMES[category] ?? 'LuSparkles',
      items: [...items]
        .sort(
          (left, right) =>
            (right.experienceMetrics?.total.totalMonths ?? 0) -
            (left.experienceMetrics?.total.totalMonths ?? 0),
        )
        .map((technology) => mapTechnologyToSkillCard(technology, locale)),
    }));
};

export const extractSkillFilterValues = (
  response: TechnologiesCollectionResponse,
): {
  readonly categories: readonly string[];
  readonly levels: readonly string[];
} => {
  const categories = new Set<string>();
  const levels = new Set<string>();

  for (const technology of response.data) {
    categories.add(technology.category);

    if (technology.level) {
      levels.add(technology.level);
    }
  }

  return {
    categories: [...categories].sort((left, right) => left.localeCompare(right)),
    levels: [...levels].sort((left, right) => left.localeCompare(right)),
  };
};
