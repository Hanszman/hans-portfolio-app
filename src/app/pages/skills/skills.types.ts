import { TechnologyContextKey } from '../../core/api/technologies/technologies.types';
import { AppTranslationKey } from '../../core/translation/translation.types';
import {
  buildRelativeAssetPath,
  buildRelativeSkillImageAssetPath,
} from '../../core/api/api.config';
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
  chart: 'chart.png',
  'chart-js': 'chart.png',
  cicd: 'cicd.png',
  'ci-cd': 'cicd.png',
  composer: 'composer.png',
  css: 'css.png',
  csharp: 'csharp.png',
  'c-sharp': 'csharp.png',
  dbeaver: 'dbeaver.png',
  docker: 'docker.png',
  expo: 'expo.png',
  express: 'express.png',
  'express-js': 'express.png',
  ftp: 'ftp.png',
  gcp: 'gcp.png',
  git: 'git.png',
  github: 'github.png',
  gitlab: 'gitlab.png',
  heroku: 'heroku.png',
  html: 'html.png',
  'html-css-js': 'html-css-js.png',
  http: 'http.png',
  java: 'java.png',
  javascript: 'javascript.png',
  jenkins: 'jenkins.png',
  jest: 'jest.png',
  jquery: 'jquery.png',
  json: 'json.png',
  jsx: 'jsx.png',
  kanban: 'kanban.png',
  knex: 'knex.png',
  'knex-js': 'knex.png',
  laravel: 'laravel.png',
  lint: 'lint.png',
  mongodb: 'mongodb.png',
  mysql: 'mysql.png',
  node: 'node.png',
  'node-js': 'node.png',
  notepadplusplus: 'notepadplusplus.png',
  'notepad-plus-plus': 'notepadplusplus.png',
  npm: 'npm.png',
  php: 'php.png',
  phpstorm: 'phpstorm.png',
  'php-storm': 'phpstorm.png',
  postgresql: 'postgresql.png',
  pycharm: 'pycharm.png',
  python: 'python.png',
  react: 'react.png',
  'react-native': 'reactnative.png',
  reactnative: 'reactnative.png',
  rest: 'rest.png',
  sass: 'sass.png',
  scrum: 'scrum.png',
  soap: 'soap.png',
  socketio: 'socketio.png',
  'socket-io': 'socketio.png',
  sql: 'sql.png',
  sqlserver: 'sqlserver.png',
  'sql-server': 'sqlserver.png',
  'microsoft-sql-server': 'sqlserver.png',
  swagger: 'swagger.png',
  typescript: 'typescript.png',
  udemy: 'udemy.png',
  unity: 'unity.png',
  vercel: 'vercel.png',
  visualstudio: 'visualstudio.png',
  'visual-studio': 'visualstudio.png',
  visualstudiocode: 'visualstudiocode.png',
  'visual-studio-code': 'visualstudiocode.png',
  vscode: 'visualstudiocode.png',
  xampp: 'xampp.png',
  xml: 'xml.png',
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
  visualUrl: string;
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
    visualUrl: buildRelativeSkillImageAssetPath('puc.png'),
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
    visualUrl: buildRelativeSkillImageAssetPath('puc.png'),
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
    visualUrl: buildRelativeSkillImageAssetPath('udemy.png'),
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
    visualUrl: buildRelativeAssetPath('vendor/flag-icons/4x3/br.svg'),
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
    visualUrl: buildRelativeAssetPath('vendor/flag-icons/4x3/us.svg'),
    levelKey: 'ADVANCED',
  },
];
