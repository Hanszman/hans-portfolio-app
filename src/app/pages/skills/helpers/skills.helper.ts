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
  SKILL_STACK_LABEL_KEYS,
  SKILL_TYPE_LABEL_KEYS,
  SKILL_VISUAL_FILE_NAMES,
  SkillCardViewModel,
  SkillContextMetricViewModel,
  SkillLevelFilterValue,
  SkillStackFilterValue,
  SkillTypeFilterValue,
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

const GAME_TECHNOLOGY_SLUGS = new Set(['unity']);

const DATABASE_TECHNOLOGY_CATEGORIES = new Set(['DATABASE', 'ORM']);

const LEGACY_TYPE_BY_SLUG: Record<string, SkillTypeFilterValue> = {
  ajax: 'TECHNIQUES',
  angular: 'FRAMEWORKS',
  aws: 'CLOUD_HOSTING_PLATFORMS',
  azure: 'VERSIONING_PLATFORMS',
  bootstrap: 'FRAMEWORKS',
  chart: 'LIBRARIES',
  'chart-js': 'LIBRARIES',
  cicd: 'METHODOLOGIES',
  'ci-cd': 'METHODOLOGIES',
  composer: 'PACKAGE_MANAGERS',
  css: 'WEB_LANGUAGES',
  csharp: 'PROGRAMMING_LANGUAGES',
  'c-sharp': 'PROGRAMMING_LANGUAGES',
  dbeaver: 'DATABASES_MANAGEMENT_SYSTEMS',
  docker: 'DEPLOYMENT_TOOLS',
  expo: 'DEVELOPMENT_PLATFORMS',
  express: 'FRAMEWORKS',
  'express-js': 'FRAMEWORKS',
  ftp: 'PROTOCOLS',
  gcp: 'CLOUD_HOSTING_PLATFORMS',
  git: 'VERSIONING_PLATFORMS',
  github: 'VERSIONING_PLATFORMS',
  gitlab: 'VERSIONING_PLATFORMS',
  heroku: 'CLOUD_HOSTING_PLATFORMS',
  html: 'WEB_LANGUAGES',
  http: 'PROTOCOLS',
  java: 'PROGRAMMING_LANGUAGES',
  javascript: 'PROGRAMMING_LANGUAGES',
  jenkins: 'DEPLOYMENT_TOOLS',
  jest: 'LIBRARIES',
  jquery: 'LIBRARIES',
  json: 'OBJECT_NOTATIONS',
  jsx: 'TECHNIQUES',
  kanban: 'METHODOLOGIES',
  knex: 'LIBRARIES',
  'knex-js': 'LIBRARIES',
  laravel: 'FRAMEWORKS',
  lint: 'TECHNIQUES',
  mongodb: 'NON_RELATIONAL_DATA_BASES',
  mysql: 'RELATIONAL_DATA_BASES',
  node: 'PROGRAMMING_LANGUAGES',
  'node-js': 'PROGRAMMING_LANGUAGES',
  notepadplusplus: 'CODE_EDITORS',
  'notepad-plus-plus': 'CODE_EDITORS',
  npm: 'PACKAGE_MANAGERS',
  php: 'PROGRAMMING_LANGUAGES',
  phpstorm: 'CODE_EDITORS',
  'php-storm': 'CODE_EDITORS',
  postgresql: 'RELATIONAL_DATA_BASES',
  pycharm: 'CODE_EDITORS',
  python: 'PROGRAMMING_LANGUAGES',
  react: 'LIBRARIES',
  reactnative: 'LIBRARIES',
  'react-native': 'LIBRARIES',
  rest: 'PROTOCOLS',
  sass: 'WEB_LANGUAGES',
  scrum: 'METHODOLOGIES',
  soap: 'PROTOCOLS',
  socketio: 'LIBRARIES',
  'socket-io': 'LIBRARIES',
  sql: 'RELATIONAL_DATA_BASES',
  sqlserver: 'RELATIONAL_DATA_BASES',
  'sql-server': 'RELATIONAL_DATA_BASES',
  'microsoft-sql-server': 'RELATIONAL_DATA_BASES',
  swagger: 'LIBRARIES',
  typescript: 'PROGRAMMING_LANGUAGES',
  unity: 'DEVELOPMENT_PLATFORMS',
  vercel: 'CLOUD_HOSTING_PLATFORMS',
  visualstudio: 'CODE_EDITORS',
  'visual-studio': 'CODE_EDITORS',
  visualstudiocode: 'CODE_EDITORS',
  'visual-studio-code': 'CODE_EDITORS',
  vscode: 'CODE_EDITORS',
  xampp: 'PACKAGES',
  xml: 'OBJECT_NOTATIONS',
};

const TYPE_BY_BACKEND_CATEGORY: Record<string, SkillTypeFilterValue> = {
  FRAMEWORK: 'FRAMEWORKS',
  LANGUAGE: 'PROGRAMMING_LANGUAGES',
  LIBRARY: 'LIBRARIES',
  TOOL: 'OTHERS',
  DATABASE: 'RELATIONAL_DATA_BASES',
  CLOUD: 'CLOUD_HOSTING_PLATFORMS',
  TESTING: 'LIBRARIES',
  DEVOPS: 'DEPLOYMENT_TOOLS',
  STYLING: 'WEB_LANGUAGES',
  ARCHITECTURE: 'TECHNIQUES',
  OTHER: 'OTHERS',
  ORM: 'LIBRARIES',
};

export const resolveSkillStackKey = (
  technology: Pick<TechnologyCollectionItemResponse, 'slug' | 'category'>,
): SkillStackFilterValue => {
  const slug = technology.slug.toLowerCase();

  if (GAME_TECHNOLOGY_SLUGS.has(slug)) {
    return 'GAMES';
  }

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

export const resolveSkillTypeKey = (
  technology: Pick<TechnologyCollectionItemResponse, 'slug' | 'category'>,
): SkillTypeFilterValue =>
  LEGACY_TYPE_BY_SLUG[technology.slug.toLowerCase()] ??
  TYPE_BY_BACKEND_CATEGORY[technology.category] ??
  'OTHERS';

const resolveSkillLevelKey = (
  level: string | null,
  frequency: string | null,
): SkillLevelFilterValue => {
  if (level === 'STUDYING' || frequency === 'STUDYING' || frequency === 'RARE') {
    return 'STUDYING';
  }

  if (level === 'ADVANCED' || level === 'INTERMEDIATE' || level === 'BEGINNER') {
    return level;
  }

  return 'BEGINNER';
};

const resolveSkillLevelLabel = (
  locale: AppLocale,
  level: string | null,
  frequency: string | null,
): string => {
  const levelKey = resolveSkillLevelKey(level, frequency);

  if (levelKey === 'STUDYING') {
    return translateStaticKey(locale, SKILL_LEVEL_LABEL_KEYS['STUDYING']);
  }

  return resolveCatalogLabel(
    locale,
    SKILL_LEVEL_LABEL_KEYS,
    level,
    translateStaticKey(locale, SKILL_FALLBACK_LABEL_KEYS.levelNotSet),
  );
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

  const stackKey = resolveSkillStackKey(technology);
  const typeKey = resolveSkillTypeKey(technology);
  const levelLabel = resolveSkillLevelLabel(locale, technology.level, technology.frequency);
  const frequencyLabel = resolveCatalogLabel(
    locale,
    SKILL_FREQUENCY_LABEL_KEYS,
    technology.frequency,
    translateStaticKey(locale, SKILL_FALLBACK_LABEL_KEYS.frequencyNotSet),
  );
  const stackLabel = translateStaticKey(locale, SKILL_STACK_LABEL_KEYS[stackKey]);
  const typeLabel = translateStaticKey(locale, SKILL_TYPE_LABEL_KEYS[typeKey]);
  const shouldShowLevelBadge =
    technology.level !== null || resolveSkillLevelKey(technology.level, technology.frequency) === 'STUDYING';

  return {
    id: technology.id,
    slug: technology.slug,
    kind: 'technology',
    name: technology.name,
    subtitle: frequencyLabel,
    categoryLabel: typeLabel,
    levelLabel,
    frequencyLabel,
    totalExperienceLabel:
      technology.experienceMetrics?.total.label ??
      translateStaticKey(locale, SKILL_FALLBACK_LABEL_KEYS.noDuration),
    isHighlight: technology.highlight,
    iconName: SKILL_GROUP_ICON_NAMES[technology.category] ?? 'LuSparkles',
    visualUrl: resolveSkillVisualUrl(technology.slug, imageAsset?.imageAsset.filePath),
    badgeLabel: shouldShowLevelBadge ? levelLabel : '',
    badgeColor: resolveSkillBadgeColor(technology.level, technology.frequency),
    stackKey,
    levelKey: resolveSkillLevelKey(technology.level, technology.frequency),
    typeKey,
    contexts,
    timelineEntries: (technology.technologyContexts ?? []).map((context) => ({
      key: context.context,
      label: translateStaticKey(locale, SKILL_CONTEXT_LABEL_KEYS[context.context]),
      startedAt: context.startedAt,
      endedAt: context.endedAt,
    })),
    modal: {
      name: technology.name,
      category: typeLabel,
      stack: stackLabel,
      level: shouldShowLevelBadge ? levelLabel : undefined,
      frequency: frequencyLabel,
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
    visualUrl: config.visualUrl,
    badgeLabel,
    badgeColor: config.badgeColor,
    stackKey: 'OTHERS',
    levelKey: config.levelKey,
    typeKey: 'OTHERS',
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
      image: { src: config.visualUrl, alt: name },
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
