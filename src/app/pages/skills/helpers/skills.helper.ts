import {
  buildAssetUrl,
  buildRelativeSkillImageAssetPath,
} from '../../../core/api/api.config';
import {
  TechnologiesCollectionResponse,
  TechnologyCollectionItemResponse,
  TechnologyContextKey,
} from '../../../core/api/technologies/technologies.types';
import {
  translateStaticKey,
} from '../../../core/translation/translation.service';
import {
  AppLocale,
  AppTranslationKey,
} from '../../../core/translation/translation.types';
import {
  SKILL_CATEGORY_LABEL_KEYS,
  SKILL_CONTEXT_LABEL_KEYS,
  SKILL_FALLBACK_LABEL_KEYS,
  SKILL_FREQUENCY_LABEL_KEYS,
  SKILL_GROUP_ICON_NAMES,
  SKILL_GROUP_TONES,
  SKILL_LEVEL_LABEL_KEYS,
  SKILL_VISUAL_FILE_NAMES,
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

const resolveCatalogLabel = (
  locale: AppLocale,
  catalog: Record<string, AppTranslationKey>,
  value: string | null,
  fallback: string,
): string => {
  if (!value) {
    return fallback;
  }

  const translationKey = catalog[value];

  return translationKey ? translateStaticKey(locale, translationKey) : normalizeLabel(value);
};

export const resolveSkillVisualUrl = (
  slug: string,
  fallbackPath?: string,
): string =>
  buildAssetUrl(
    fallbackPath ??
      (SKILL_VISUAL_FILE_NAMES[slug.toLowerCase()]
        ? buildRelativeSkillImageAssetPath(
            `${SKILL_VISUAL_FILE_NAMES[slug.toLowerCase()]}.png`,
          )
        : ''),
  );

export const mapTechnologyToSkillCard = (
  technology: TechnologyCollectionItemResponse,
  locale: AppLocale,
): SkillCardViewModel => {
  const imageAsset =
    technology.imageAssets?.find(({ imageAsset }) => imageAsset.kind === 'ICON') ??
    technology.imageAssets?.[0];
  const contexts: SkillContextMetricViewModel[] = SKILL_CONTEXT_ORDER.map((key) => ({
    key,
    label: translateStaticKey(locale, SKILL_CONTEXT_LABEL_KEYS[key]),
    value:
      technology.experienceMetrics?.byContext[key].label ??
      translateStaticKey(locale, SKILL_FALLBACK_LABEL_KEYS.zeroMonths),
    totalMonths: technology.experienceMetrics?.byContext[key].totalMonths ?? 0,
  })).filter((context) => context.totalMonths > 0);

  return {
    id: technology.id,
    slug: technology.slug,
    name: technology.name,
    categoryLabel: resolveCatalogLabel(
      locale,
      SKILL_CATEGORY_LABEL_KEYS,
      technology.category,
      translateStaticKey(locale, SKILL_FALLBACK_LABEL_KEYS.uncategorized),
    ),
    levelLabel: resolveCatalogLabel(
      locale,
      SKILL_LEVEL_LABEL_KEYS,
      technology.level,
      translateStaticKey(locale, SKILL_FALLBACK_LABEL_KEYS.levelNotSet),
    ),
    frequencyLabel: resolveCatalogLabel(
      locale,
      SKILL_FREQUENCY_LABEL_KEYS,
      technology.frequency,
      translateStaticKey(locale, SKILL_FALLBACK_LABEL_KEYS.frequencyNotSet),
    ),
    totalExperienceLabel:
      technology.experienceMetrics?.total.label ??
      translateStaticKey(locale, SKILL_FALLBACK_LABEL_KEYS.noDuration),
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
      label: translateStaticKey(locale, SKILL_FALLBACK_LABEL_KEYS.summaryMapped),
      value: String(technologies.length),
    },
    {
      label: translateStaticKey(locale, SKILL_FALLBACK_LABEL_KEYS.summaryHighlights),
      value: String(highlightedCount),
    },
    {
      label: translateStaticKey(locale, SKILL_FALLBACK_LABEL_KEYS.summaryCategories),
      value: String(categories.size),
    },
    {
      label: translateStaticKey(locale, SKILL_FALLBACK_LABEL_KEYS.summaryAdvanced),
      value: String(advancedCount),
    },
    {
      label: translateStaticKey(locale, SKILL_FALLBACK_LABEL_KEYS.summaryLongest),
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
      title: resolveCatalogLabel(
        locale,
        SKILL_CATEGORY_LABEL_KEYS,
        category,
        translateStaticKey(locale, SKILL_FALLBACK_LABEL_KEYS.uncategorized),
      ),
      description: translateStaticKey(
        locale,
        SKILL_FALLBACK_LABEL_KEYS.groupDescription,
        {
          count: String(items.length),
        },
      ),
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
