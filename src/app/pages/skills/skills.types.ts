import { TechnologyContextKey } from '../../core/api/technologies/technologies.types';
import { AppTranslationKey } from '../../core/translation/translation.types';
import { ContainerTone } from '../../layout/container/container.types';
import { TechnologyModalItem } from '../../shared/technology-modal/technology-modal.types';

export type SkillCardKind = 'technology' | 'education' | 'language';

export type SkillStackFilterValue =
  | 'ALL'
  | 'FRONT_END'
  | 'BACK_END'
  | 'DATABASES'
  | 'MOBILE'
  | 'OTHERS';

export type SkillLevelFilterValue =
  | 'ALL'
  | 'ADVANCED'
  | 'INTERMEDIATE'
  | 'BEGINNER'
  | 'STUDYING';

export interface SkillFilterChipViewModel<TValue extends string = string> {
  labelKey: AppTranslationKey;
  value: TValue;
}

export interface SkillFilterOption {
  label: string;
  value: string;
  action?: (option: SkillFilterOption) => void;
}

export interface SkillsDropdownElement extends HTMLElement {
  options?: readonly SkillFilterOption[];
}

export type SkillsSelectEvent = CustomEvent<SkillFilterOption>;

export interface SkillsSummaryMetricViewModel {
  label: string;
  value: string;
  supportingText?: string;
}

export interface SkillContextMetricViewModel {
  key: TechnologyContextKey;
  label: string;
  value: string;
  totalMonths: number;
}

export interface SkillChartSeries {
  name: string;
  data: number[];
}

export interface SkillTimelineEntryViewModel {
  key: TechnologyContextKey;
  label: string;
  startedAt: string;
  endedAt: string | null;
}

export interface SkillCardViewModel {
  id: string;
  slug: string;
  kind: SkillCardKind;
  name: string;
  subtitle: string;
  categoryLabel: string;
  levelLabel: string;
  frequencyLabel: string;
  totalExperienceLabel: string;
  isHighlight: boolean;
  iconName: string;
  visualUrl: string;
  badgeLabel: string;
  badgeColor: string;
  stackKey: SkillStackFilterValue;
  levelKey: SkillLevelFilterValue;
  contexts: readonly SkillContextMetricViewModel[];
  timelineEntries: readonly SkillTimelineEntryViewModel[];
  modal: TechnologyModalItem;
}

export interface SkillsGroupViewModel {
  id: string;
  title: string;
  description: string;
  tone: ContainerTone;
  iconName: string;
  items: readonly SkillCardViewModel[];
}

export const SKILL_FILTER_ALL_LABEL_KEYS = {
  categories: 'taxonomy.skills.filters.allCategories',
  levels: 'taxonomy.skills.filters.allLevels',
  contexts: 'taxonomy.skills.filters.allContexts',
} as const satisfies Record<string, AppTranslationKey>;

export const SKILL_STACK_FILTERS: readonly SkillFilterChipViewModel<SkillStackFilterValue>[] =
  [
    { labelKey: 'taxonomy.skills.stack.all', value: 'ALL' },
    { labelKey: 'taxonomy.skills.stack.frontEnd', value: 'FRONT_END' },
    { labelKey: 'taxonomy.skills.stack.backEnd', value: 'BACK_END' },
    { labelKey: 'taxonomy.skills.stack.databases', value: 'DATABASES' },
    { labelKey: 'taxonomy.skills.stack.mobile', value: 'MOBILE' },
    { labelKey: 'taxonomy.skills.stack.others', value: 'OTHERS' },
  ];

export const SKILL_LEVEL_FILTERS: readonly SkillFilterChipViewModel<SkillLevelFilterValue>[] =
  [
    { labelKey: 'taxonomy.skills.level.all', value: 'ALL' },
    { labelKey: 'taxonomy.skills.level.advanced', value: 'ADVANCED' },
    { labelKey: 'taxonomy.skills.level.intermediate', value: 'INTERMEDIATE' },
    { labelKey: 'taxonomy.skills.level.beginner', value: 'BEGINNER' },
    { labelKey: 'taxonomy.skills.level.studying', value: 'STUDYING' },
  ];

export const SKILL_FALLBACK_LABEL_KEYS = {
  uncategorized: 'taxonomy.skills.fallback.uncategorized',
  levelNotSet: 'taxonomy.skills.fallback.levelNotSet',
  frequencyNotSet: 'taxonomy.skills.fallback.frequencyNotSet',
  noDuration: 'taxonomy.skills.fallback.noDuration',
  zeroMonths: 'taxonomy.skills.fallback.zeroMonths',
  summaryMapped: 'taxonomy.skills.summary.mapped',
  summaryHighlights: 'taxonomy.skills.summary.highlights',
  summaryCategories: 'taxonomy.skills.summary.categories',
  summaryAdvanced: 'taxonomy.skills.summary.advanced',
  summaryLongest: 'taxonomy.skills.summary.longest',
  groupDescription: 'taxonomy.skills.group.description',
} as const satisfies Record<string, AppTranslationKey>;

export const SKILL_CATEGORY_LABEL_KEYS: Record<string, AppTranslationKey> = {
  FRAMEWORK: 'taxonomy.skills.category.framework',
  LANGUAGE: 'taxonomy.skills.category.language',
  LIBRARY: 'taxonomy.skills.category.library',
  DATABASE: 'taxonomy.skills.category.database',
  DEVOPS: 'taxonomy.skills.category.devops',
  ORM: 'taxonomy.skills.category.orm',
};

export const SKILL_LEVEL_LABEL_KEYS: Record<string, AppTranslationKey> = {
  ADVANCED: 'taxonomy.skills.level.advanced',
  INTERMEDIATE: 'taxonomy.skills.level.intermediate',
  BEGINNER: 'taxonomy.skills.level.beginner',
  STUDYING: 'taxonomy.skills.level.studying',
};

export const SKILL_FREQUENCY_LABEL_KEYS: Record<string, AppTranslationKey> = {
  FREQUENT: 'taxonomy.skills.frequency.frequent',
  OCCASIONAL: 'taxonomy.skills.frequency.occasional',
  RARE: 'taxonomy.skills.frequency.rare',
};

export const SKILL_CONTEXT_LABEL_KEYS: Record<TechnologyContextKey, AppTranslationKey> =
  {
    PROFESSIONAL: 'taxonomy.skills.context.professional',
    PERSONAL: 'taxonomy.skills.context.personal',
    ACADEMIC: 'taxonomy.skills.context.academic',
    STUDY: 'taxonomy.skills.context.study',
  };

export const SKILL_GROUP_TONES: Record<string, ContainerTone> = {
  FRAMEWORK: 'primary',
  LANGUAGE: 'success',
  DATABASE: 'warning',
  DEVOPS: 'info',
  LIBRARY: 'secondary',
  ORM: 'base',
};

export const SKILL_GROUP_ICON_NAMES: Record<string, string> = {
  FRAMEWORK: 'LuBlocks',
  LANGUAGE: 'LuCpu',
  LIBRARY: 'LuPackage',
  DATABASE: 'LuDatabase',
  DEVOPS: 'LuCloud',
  ORM: 'LuDatabase',
};

export const SKILL_CONTEXT_ORDER: readonly TechnologyContextKey[] = [
  'PROFESSIONAL',
  'PERSONAL',
  'ACADEMIC',
  'STUDY',
];

export const SKILL_VISUAL_FILE_NAMES: Record<string, string> = {
  ajax: 'ajax.png',
  angular: 'angular.png',
  aws: 'aws.png',
  azure: 'azure.png',
  bootstrap: 'bootstrap.png',
  css: 'css.png',
  docker: 'docker.png',
  express: 'express.png',
  git: 'git.png',
  html: 'html.png',
  javascript: 'javascript.png',
  json: 'json.png',
  laravel: 'laravel.png',
  mysql: 'mysql.png',
  node: 'node.png',
  php: 'php.png',
  postgresql: 'postgresql.png',
  react: 'react.png',
  sql: 'sql.png',
  swagger: 'swagger.png',
  typescript: 'typescript.png',
};

export interface StaticSkillCardConfig {
  id: string;
  slug: string;
  kind: Exclude<SkillCardKind, 'technology'>;
  nameKey: AppTranslationKey;
  subtitleKey: AppTranslationKey;
  metaKey: AppTranslationKey;
  badgeKey: AppTranslationKey;
  badgeColor: string;
  iconName: string;
  levelKey: SkillLevelFilterValue;
}

export const SKILL_EDUCATION_CARDS: readonly StaticSkillCardConfig[] = [
  {
    id: 'education-information-systems',
    slug: 'information-systems',
    kind: 'education',
    nameKey: 'pages.skills.education.informationSystems.title',
    subtitleKey: 'pages.skills.education.informationSystems.institution',
    metaKey: 'pages.skills.education.informationSystems.period',
    badgeKey: 'pages.skills.education.informationSystems.badge',
    badgeColor: 'info',
    iconName: 'LuGraduationCap',
    levelKey: 'ADVANCED',
  },
  {
    id: 'education-fullstack-web-development',
    slug: 'fullstack-web-development',
    kind: 'education',
    nameKey: 'pages.skills.education.fullStackWeb.title',
    subtitleKey: 'pages.skills.education.fullStackWeb.institution',
    metaKey: 'pages.skills.education.fullStackWeb.period',
    badgeKey: 'pages.skills.education.fullStackWeb.badge',
    badgeColor: 'info',
    iconName: 'LuCode2',
    levelKey: 'ADVANCED',
  },
  {
    id: 'education-angular-node',
    slug: 'angular-node-programmer',
    kind: 'education',
    nameKey: 'pages.skills.education.angularNode.title',
    subtitleKey: 'pages.skills.education.angularNode.institution',
    metaKey: 'pages.skills.education.angularNode.period',
    badgeKey: 'pages.skills.education.angularNode.badge',
    badgeColor: 'info',
    iconName: 'LuBadgeCheck',
    levelKey: 'INTERMEDIATE',
  },
];

export const SKILL_LANGUAGE_CARDS: readonly StaticSkillCardConfig[] = [
  {
    id: 'language-portuguese',
    slug: 'portuguese',
    kind: 'language',
    nameKey: 'pages.skills.languages.portuguese.title',
    subtitleKey: 'pages.skills.languages.portuguese.subtitle',
    metaKey: 'pages.skills.languages.portuguese.meta',
    badgeKey: 'pages.skills.languages.portuguese.badge',
    badgeColor: 'info',
    iconName: 'LuLanguages',
    levelKey: 'ADVANCED',
  },
  {
    id: 'language-english',
    slug: 'english',
    kind: 'language',
    nameKey: 'pages.skills.languages.english.title',
    subtitleKey: 'pages.skills.languages.english.subtitle',
    metaKey: 'pages.skills.languages.english.meta',
    badgeKey: 'pages.skills.languages.english.badge',
    badgeColor: 'info',
    iconName: 'LuLanguages',
    levelKey: 'ADVANCED',
  },
];
