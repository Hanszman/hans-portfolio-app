import {
  buildAssetUrl,
  buildRelativeSkillImageAssetPath,
} from '../../../core/api/api.config';
import {
  TechnologiesCollectionResponse,
  TechnologyCollectionItemResponse,
} from '../../../core/api/technologies/technologies.types';
import {
  resolveLocalizedText,
  translateStaticKey,
} from '../../../core/translation/translation.service';
import {
  AppLocale,
  AppTranslationKey,
} from '../../../core/translation/translation.types';
import {
  SKILL_CATEGORY_LABEL_KEYS,
  SKILL_CONTEXT_ORDER,
  SKILL_CONTEXT_LABEL_KEYS,
  SKILL_EDUCATION_CARDS,
  SKILL_FALLBACK_LABEL_KEYS,
  SKILL_FREQUENCY_LABEL_KEYS,
  SKILL_GROUP_ICON_NAMES,
  SKILL_GROUP_TONES,
  SKILL_LANGUAGE_CARDS,
  SKILL_LEVEL_LABEL_KEYS,
  SKILL_VISUAL_FILE_NAMES,
  SkillCardViewModel,
  SkillContextMetricViewModel,
  SkillLevelFilterValue,
  SkillStackFilterValue,
  SkillsGroupViewModel,
  SkillsSummaryMetricViewModel,
  StaticSkillCardConfig,
} from '../skills.types';

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
        ? buildRelativeSkillImageAssetPath(SKILL_VISUAL_FILE_NAMES[slug.toLowerCase()])
        : ''),
  );

const FRONT_END_TECHNOLOGY_SLUGS = new Set([
  'angular',
  'typescript',
  'javascript',
  'react',
  'react-native',
  'html',
  'css',
  'sass',
  'bootstrap',
  'jquery',
  'chart-js',
  'ajax',
  'jsx',
]);

const BACK_END_TECHNOLOGY_SLUGS = new Set([
  'node',
  'node-js',
  'express',
  'express-js',
  'php',
  'laravel',
  'java',
  'csharp',
  'c-sharp',
  'knex',
  'knex-js',
]);

const MOBILE_TECHNOLOGY_SLUGS = new Set(['react-native', 'expo']);

const DATABASE_TECHNOLOGY_CATEGORIES = new Set(['DATABASE', 'ORM']);

export const resolveSkillStackKey = (
  technology: Pick<TechnologyCollectionItemResponse, 'slug' | 'category'>,
): SkillStackFilterValue => {
  const slug = technology.slug.toLowerCase();

  if (MOBILE_TECHNOLOGY_SLUGS.has(slug)) {
    return 'MOBILE';
  }

  if (DATABASE_TECHNOLOGY_CATEGORIES.has(technology.category)) {
    return 'DATABASES';
  }

  if (FRONT_END_TECHNOLOGY_SLUGS.has(slug) || technology.category === 'FRAMEWORK') {
    return 'FRONT_END';
  }

  if (BACK_END_TECHNOLOGY_SLUGS.has(slug)) {
    return 'BACK_END';
  }

  return 'OTHERS';
};

const resolveSkillLevelKey = (
  level: string | null,
  frequency: string | null,
): SkillLevelFilterValue => {
  if (frequency === 'RARE') {
    return 'STUDYING';
  }

  if (level === 'ADVANCED' || level === 'INTERMEDIATE' || level === 'BEGINNER') {
    return level;
  }

  return 'BEGINNER';
};

const resolveSkillBadgeColor = (
  level: string | null,
  frequency: string | null,
): string => {
  const levelKey = resolveSkillLevelKey(level, frequency);

  if (levelKey === 'BEGINNER') {
    return 'warning';
  }

  if (levelKey === 'STUDYING') {
    return 'success';
  }

  return 'info';
};

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
    kind: 'technology',
    name: technology.name,
    subtitle:
      technology.experienceMetrics?.total.label ??
      translateStaticKey(locale, SKILL_FALLBACK_LABEL_KEYS.noDuration),
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
    badgeLabel: resolveCatalogLabel(
      locale,
      SKILL_LEVEL_LABEL_KEYS,
      technology.level,
      translateStaticKey(locale, SKILL_FALLBACK_LABEL_KEYS.levelNotSet),
    ),
    badgeColor: resolveSkillBadgeColor(technology.level, technology.frequency),
    stackKey: resolveSkillStackKey(technology),
    levelKey: resolveSkillLevelKey(technology.level, technology.frequency),
    contexts,
    timelineEntries: (technology.technologyContexts ?? []).map((context) => ({
      key: context.context,
      label: translateStaticKey(locale, SKILL_CONTEXT_LABEL_KEYS[context.context]),
      startedAt: context.startedAt,
      endedAt: context.endedAt,
    })),
    modal: {
      name: technology.name,
      category: resolveCatalogLabel(
        locale,
        SKILL_CATEGORY_LABEL_KEYS,
        technology.category,
        translateStaticKey(locale, SKILL_FALLBACK_LABEL_KEYS.uncategorized),
      ),
      level: resolveCatalogLabel(
        locale,
        SKILL_LEVEL_LABEL_KEYS,
        technology.level,
        translateStaticKey(locale, SKILL_FALLBACK_LABEL_KEYS.levelNotSet),
      ),
      frequency: resolveCatalogLabel(
        locale,
        SKILL_FREQUENCY_LABEL_KEYS,
        technology.frequency,
        translateStaticKey(locale, SKILL_FALLBACK_LABEL_KEYS.frequencyNotSet),
      ),
      experience:
        technology.experienceMetrics?.total.label ??
        translateStaticKey(locale, SKILL_FALLBACK_LABEL_KEYS.noDuration),
      image: {
        src: resolveSkillVisualUrl(technology.slug, imageAsset?.imageAsset.filePath),
        alt: resolveLocalizedText(
          locale,
          {
            'pt-br': imageAsset?.imageAsset.altPt ?? undefined,
            'en-us': imageAsset?.imageAsset.altEn ?? undefined,
          },
          `${technology.name} icon`,
        ),
      },
    },
  };
};

const mapStaticSkillCard = (
  config: StaticSkillCardConfig,
  locale: AppLocale,
): SkillCardViewModel => {
  const name = translateStaticKey(locale, config.nameKey);
  const subtitle = translateStaticKey(locale, config.subtitleKey);
  const meta = translateStaticKey(locale, config.metaKey);
  const badgeLabel = translateStaticKey(locale, config.badgeKey);

  return {
    id: config.id,
    slug: config.slug,
    kind: config.kind,
    name,
    subtitle,
    categoryLabel: subtitle,
    levelLabel: badgeLabel,
    frequencyLabel: meta,
    totalExperienceLabel: meta,
    isHighlight: false,
    iconName: config.iconName,
    visualUrl: '',
    badgeLabel,
    badgeColor: config.badgeColor,
    stackKey: 'OTHERS',
    levelKey: config.levelKey,
    contexts: [],
    timelineEntries: [],
    modal: {
      name,
      category:
        config.kind === 'education'
          ? translateStaticKey(locale, 'pages.skills.education.title')
          : translateStaticKey(locale, 'pages.skills.languages.title'),
      level: badgeLabel,
      frequency: meta,
      image: null,
    },
  };
};

export const buildEducationSkillCards = (
  locale: AppLocale,
): readonly SkillCardViewModel[] =>
  SKILL_EDUCATION_CARDS.map((config) => mapStaticSkillCard(config, locale));

export const buildLanguageSkillCards = (
  locale: AppLocale,
): readonly SkillCardViewModel[] =>
  SKILL_LANGUAGE_CARDS.map((config) => mapStaticSkillCard(config, locale));

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
