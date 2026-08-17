import { buildAssetUrl, buildRelativeSkillImageAssetPath } from '../../../core/api/api.config';
import {
  TechnologiesCollectionResponse,
  TechnologyCollectionItemResponse,
} from '../../../core/api/technologies/technologies.types';
import { FormationRecord } from '../../../core/api/formations/formations.types';
import { SpokenLanguageRecord } from '../../../core/api/spoken-languages/spoken-languages.types';
import { EducationModalItem } from '../../../shared/education-modal/education-modal.types';
import { SpokenLanguageModalItem } from '../../../shared/spoken-language-modal/spoken-language-modal.types';
import { mapTechnologyContextPeriods } from '../../../shared/technology-modal/helpers/technology-modal.helper';
import {
  resolveLocalizedText,
  translateStaticKey,
} from '../../../core/translation/translation.service';
import { AppLocale, AppTranslationKey } from '../../../core/translation/translation.types';
import { formatAppDateRange } from '../../../core/date/app-date.helper';
import { sortTagItems } from '../../../shared/tag/helpers/tag-order.helper';
import {
  SKILL_CATEGORY_LABEL_KEYS,
  SKILL_CONTEXT_ORDER,
  SKILL_CONTEXT_LABEL_KEYS,
  SKILL_FALLBACK_LABEL_KEYS,
  SKILL_FREQUENCY_LABEL_KEYS,
  SKILL_GROUP_ICON_NAMES,
  SKILL_GROUP_TONES,
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

export const resolveSkillVisualUrl = (slug: string, fallbackPath?: string): string =>
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

const resolveSkillBadgeColor = (level: string | null, frequency: string | null): string => {
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
  const contextPeriods = mapTechnologyContextPeriods(technology.technologyContexts ?? [], locale);
  const allContexts: SkillContextMetricViewModel[] = SKILL_CONTEXT_ORDER.map((key) => ({
    key,
    label: translateStaticKey(locale, SKILL_CONTEXT_LABEL_KEYS[key]),
    value:
      (technology.experienceMetrics
        ? resolveLocalizedText(
            locale,
            {
              'pt-br': technology.experienceMetrics.byContext[key].labelPt,
              'en-us': technology.experienceMetrics.byContext[key].labelEn,
              'es-es': technology.experienceMetrics.byContext[key].labelEs,
            },
            technology.experienceMetrics.byContext[key].label,
          )
        : '') || translateStaticKey(locale, SKILL_FALLBACK_LABEL_KEYS.zeroMonths),
    totalMonths: technology.experienceMetrics?.byContext[key].totalMonths ?? 0,
  }));
  const contexts = allContexts.filter((context) => context.totalMonths > 0);

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
    technology.level !== null ||
    resolveSkillLevelKey(technology.level, technology.frequency) === 'STUDYING';

  return {
    id: technology.id,
    slug: technology.slug,
    kind: 'technology',
    name: technology.name,
    subtitle: frequencyLabel,
    categoryLabel: typeLabel,
    levelLabel,
    frequencyLabel,
    frequencyKey:
      technology.frequency === 'FREQUENT' ||
      technology.frequency === 'OCCASIONAL' ||
      technology.frequency === 'PREVIOUSLY_USED' ||
      technology.frequency === 'RARE' ||
      technology.frequency === 'STUDYING'
        ? technology.frequency
        : 'STUDYING',
    totalExperienceLabel:
      (technology.experienceMetrics
        ? resolveLocalizedText(
            locale,
            {
              'pt-br': technology.experienceMetrics.total.labelPt,
              'en-us': technology.experienceMetrics.total.labelEn,
              'es-es': technology.experienceMetrics.total.labelEs,
            },
            technology.experienceMetrics.total.label,
          )
        : '') || translateStaticKey(locale, SKILL_FALLBACK_LABEL_KEYS.noDuration),
    isHighlight: technology.highlight,
    iconName: SKILL_GROUP_ICON_NAMES[technology.category] ?? 'LuSparkles',
    visualUrl: resolveSkillVisualUrl(technology.slug, imageAsset?.imageAsset.filePath),
    badgeLabel: shouldShowLevelBadge ? levelLabel : '',
    badgeColor: resolveSkillBadgeColor(technology.level, technology.frequency),
    stackKey,
    levelKey: resolveSkillLevelKey(technology.level, technology.frequency),
    typeKey,
    contexts,
    timelineEntries: contextPeriods,
    modal: {
      slug: technology.slug,
      name: technology.name,
      category: typeLabel,
      stack: stackLabel,
      level: shouldShowLevelBadge ? levelLabel : undefined,
      frequency: frequencyLabel,
      levelKey:
        technology.level === 'BASIC' ||
        technology.level === 'INTERMEDIATE' ||
        technology.level === 'ADVANCED'
          ? technology.level
          : undefined,
      frequencyKey:
        technology.frequency === 'STUDYING' ||
        technology.frequency === 'PREVIOUSLY_USED' ||
        technology.frequency === 'OCCASIONAL' ||
        technology.frequency === 'FREQUENT'
          ? technology.frequency
          : undefined,
      contextMetrics: allContexts.map(({ key, label, totalMonths }) => ({
        key,
        label,
        totalMonths,
      })),
      contextPeriods,
      experience:
        (technology.experienceMetrics
          ? resolveLocalizedText(
              locale,
              {
                'pt-br': technology.experienceMetrics.total.labelPt,
                'en-us': technology.experienceMetrics.total.labelEn,
                'es-es': technology.experienceMetrics.total.labelEs,
              },
              technology.experienceMetrics.total.label,
            )
          : '') || translateStaticKey(locale, SKILL_FALLBACK_LABEL_KEYS.noDuration),
      image: {
        src: resolveSkillVisualUrl(technology.slug, imageAsset?.imageAsset.filePath),
        alt: resolveLocalizedText(
          locale,
          {
            'pt-br': imageAsset?.imageAsset.altPt ?? undefined,
            'en-us': imageAsset?.imageAsset.altEn ?? undefined,
            'es-es': imageAsset?.imageAsset.altEs ?? undefined,
          },
          `${technology.name} icon`,
        ),
      },
    },
  };
};

const resolveEnumTranslation = (
  locale: AppLocale,
  namespace: string,
  value: string,
): string => {
  const key = `${namespace}.${value}` as AppTranslationKey;
  const translated = translateStaticKey(locale, key);

  return translated === key ? normalizeLabel(value) : translated;
};

const resolveRelatedIcon = (
  imageAssets:
    | readonly { imageAsset?: { filePath?: string | null; kind?: string | null } | null }[]
    | null
    | undefined,
): string => {
  const icon = imageAssets?.find(
    ({ imageAsset }) => imageAsset?.kind === 'ICON' && imageAsset.filePath,
  )?.imageAsset?.filePath;

  return icon ? buildAssetUrl(icon) : '';
};

export const buildEducationSkillCards = (
  formations: readonly FormationRecord[],
  locale: AppLocale,
): readonly SkillCardViewModel[] =>
  [...formations]
    .sort(
      (left, right) =>
        (left.sortOrder ?? Number.MAX_SAFE_INTEGER) -
          (right.sortOrder ?? Number.MAX_SAFE_INTEGER) ||
        left.titleEn.localeCompare(right.titleEn),
    )
    .map((formation) => {
      const name = resolveLocalizedText(
        locale,
        {
          'pt-br': formation.titlePt,
          'en-us': formation.titleEn,
          'es-es': formation.titleEs,
        },
        formation.titleEn,
      );
      const badgeLabel = resolveEnumTranslation(
        locale,
        'pages.admin.formations.fields.degreeType.options',
        formation.degreeType,
      );
      const period = formatAppDateRange(formation.startDate, formation.endDate, locale);
      const visualUrl = resolveRelatedIcon(formation.imageAssets);

      return {
        id: formation.id,
        slug: formation.slug,
        kind: 'education',
        name,
        subtitle: formation.institution,
        categoryLabel: formation.institution,
        levelLabel: badgeLabel,
        frequencyLabel: period,
        frequencyKey: 'ALL',
        totalExperienceLabel: period,
        isHighlight: Boolean(formation.highlight),
        iconName: 'LuGraduationCap',
        visualUrl,
        badgeLabel,
        badgeColor: 'info',
        stackKey: 'OTHERS',
        levelKey: 'ADVANCED',
        typeKey: 'OTHERS',
        contexts: [],
        timelineEntries: [],
        modal: {
          slug: formation.slug,
          name,
          category: translateStaticKey(locale, 'pages.skills.education.title'),
          level: badgeLabel,
          frequency: period,
          image: { src: visualUrl, alt: name },
        },
      } satisfies SkillCardViewModel;
    });

export const buildLanguageSkillCards = (
  languages: readonly SpokenLanguageRecord[],
  locale: AppLocale,
): readonly SkillCardViewModel[] =>
  [...languages]
    .sort(
      (left, right) =>
        (left.sortOrder ?? Number.MAX_SAFE_INTEGER) -
          (right.sortOrder ?? Number.MAX_SAFE_INTEGER) ||
        left.nameEn.localeCompare(right.nameEn),
    )
    .map((language) => {
      const name = resolveLocalizedText(
        locale,
        {
          'pt-br': language.namePt,
          'en-us': language.nameEn,
          'es-es': language.nameEs,
        },
        language.nameEn,
      );
      const badgeLabel = resolveEnumTranslation(
        locale,
        'pages.admin.spokenLanguages.fields.proficiency.options',
        language.proficiency,
      );
      const visualUrl = resolveRelatedIcon(language.imageAssets);
      const normalizedLevel = language.proficiency.toUpperCase();
      const levelKey: SkillLevelFilterValue = ['BASIC', 'INTERMEDIATE', 'ADVANCED'].includes(
        normalizedLevel,
      )
        ? (normalizedLevel as SkillLevelFilterValue)
        : 'ADVANCED';

      return {
        id: language.id,
        slug: language.code,
        kind: 'language',
        name,
        subtitle: '',
        categoryLabel: translateStaticKey(locale, 'common.entities.languages'),
        levelLabel: badgeLabel,
        frequencyLabel: '',
        frequencyKey: 'ALL',
        totalExperienceLabel: '',
        isHighlight: Boolean(language.highlight),
        iconName: 'LuLanguages',
        visualUrl,
        badgeLabel,
        badgeColor: 'info',
        stackKey: 'OTHERS',
        levelKey,
        typeKey: 'OTHERS',
        contexts: [],
        timelineEntries: [],
        modal: {
          slug: language.code,
          name,
          category: translateStaticKey(locale, 'common.entities.languages'),
          level: badgeLabel,
          frequency: '',
          image: { src: visualUrl, alt: name },
        },
      } satisfies SkillCardViewModel;
    });

export const mapFormationToEducationModal = (
  formation: FormationRecord | undefined,
  fallback: SkillCardViewModel,
  locale: AppLocale,
): EducationModalItem => {
  if (!formation) {
    return {
      title: fallback.name,
      subtitle: fallback.subtitle,
      image: { src: fallback.visualUrl, alt: fallback.name },
      details: [
        { labelKey: 'pages.skills.education.detail.degree', value: fallback.badgeLabel },
        { labelKey: 'common.fields.date', value: fallback.totalExperienceLabel },
      ],
      galleryItems: [],
      technologies: [],
    };
  }

  const title = resolveLocalizedText(
    locale,
    {
      'pt-br': formation.titlePt,
      'en-us': formation.titleEn,
      'es-es': formation.titleEs,
    },
    fallback.name,
  );
  const summary = resolveLocalizedText(
    locale,
    {
      'pt-br': formation.summaryPt,
      'en-us': formation.summaryEn,
      'es-es': formation.summaryEs,
    },
    '',
  );
  const seenImageIds = new Set<string>();
  const seenImagePaths = new Set<string>();
  const galleryItems = (formation.imageAssets ?? [])
    .flatMap(({ imageAsset, sortOrder }) => {
      const filePath = imageAsset?.filePath;
      return imageAsset?.kind === 'SCREENSHOT' && filePath
        ? [{ imageAsset: { ...imageAsset, filePath }, sortOrder: sortOrder ?? 0 }]
        : [];
    })
    .sort((left, right) => left.sortOrder - right.sortOrder)
    .filter(({ imageAsset }) => {
      const { id, filePath } = imageAsset;
      if (seenImageIds.has(id) || seenImagePaths.has(filePath)) return false;
      seenImageIds.add(id);
      seenImagePaths.add(filePath);
      return true;
    })
    .map(({ imageAsset }, index) => ({
      id: imageAsset.id,
      imageSrc: buildAssetUrl(imageAsset.filePath),
      imageAlt: resolveLocalizedText(
        locale,
        {
          'pt-br': imageAsset.altPt ?? undefined,
          'en-us': imageAsset.altEn ?? undefined,
          'es-es': imageAsset.altEs ?? undefined,
        },
        `${title} - ${imageAsset.fileName ?? index + 1}`,
      ),
      title,
      description: summary || undefined,
    }));
  const dateRange = formatAppDateRange(formation.startDate, formation.endDate, locale);
  const iconPath = formation.imageAssets?.find(
    ({ imageAsset }) => imageAsset?.kind === 'ICON' && imageAsset.filePath,
  )?.imageAsset?.filePath;
  const technologies = sortTagItems(
    (formation.technologies ?? formation.technologyRelations ?? [])
    .flatMap(({ technology }) =>
      technology?.slug && technology.name
        ? [{ slug: technology.slug, name: technology.name, highlight: technology.highlight }]
        : [],
    ),
    ({ name }) => name,
    locale,
  ).map(({ slug, name }) => ({ slug, name }));

  return {
    title,
    subtitle: formation.institution,
    image: { src: iconPath ? buildAssetUrl(iconPath) : fallback.visualUrl, alt: title },
    details: [
      { labelKey: 'pages.skills.education.detail.degree', value: formation.degreeType },
      { labelKey: 'common.fields.date', value: dateRange },
      { labelKey: 'common.fields.summary', value: summary },
    ].filter(({ value }) => Boolean(value)),
    galleryItems,
    technologies,
  };
};

export const mapSpokenLanguageToModal = (
  language: SpokenLanguageRecord | undefined,
  fallback: SkillCardViewModel,
  locale: AppLocale,
): SpokenLanguageModalItem => {
  const title = language
    ? resolveLocalizedText(
        locale,
        {
          'pt-br': language.namePt,
          'en-us': language.nameEn,
          'es-es': language.nameEs,
        },
        fallback.name,
      )
    : fallback.name;
  const imageAsset = language?.imageAssets?.find(({ imageAsset }) => imageAsset?.filePath);

  return {
    title,
    subtitle: fallback.subtitle,
    image: imageAsset?.imageAsset?.filePath
      ? {
          src: buildAssetUrl(imageAsset.imageAsset.filePath),
          alt: resolveLocalizedText(
            locale,
            {
              'pt-br': imageAsset.imageAsset.altPt ?? undefined,
              'en-us': imageAsset.imageAsset.altEn ?? undefined,
              'es-es': imageAsset.imageAsset.altEs ?? undefined,
            },
            title,
          ),
        }
      : { src: fallback.visualUrl, alt: title },
    details: [
      {
        labelKey: 'pages.skills.languages.detail.proficiency',
        value: language?.proficiency ?? fallback.badgeLabel,
      },
      {
        labelKey: 'common.fields.code',
        value: language?.code ?? fallback.slug,
      },
    ],
  };
};

export const buildSkillsSummaryMetrics = (
  technologies: TechnologyCollectionItemResponse[],
  locale: AppLocale,
): readonly SkillsSummaryMetricViewModel[] => {
  const highlightedCount = technologies.filter((technology) => technology.highlight).length;
  const advancedCount = technologies.filter((technology) => technology.level === 'ADVANCED').length;
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
      supportingText: strongestTechnology?.experienceMetrics
        ? resolveLocalizedText(
            locale,
            {
              'pt-br': strongestTechnology.experienceMetrics.total.labelPt,
              'en-us': strongestTechnology.experienceMetrics.total.labelEn,
              'es-es': strongestTechnology.experienceMetrics.total.labelEs,
            },
            strongestTechnology.experienceMetrics.total.label,
          )
        : '',
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
      description: translateStaticKey(locale, SKILL_FALLBACK_LABEL_KEYS.groupDescription, {
        count: String(items.length),
      }),
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
