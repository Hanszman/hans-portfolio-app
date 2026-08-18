import {
  TechnologyContextKey,
  TechnologyType,
} from '../../core/api/technologies/technologies.types';
import { AppTranslationKey } from '../../core/translation/translation.types';
import { ContainerTone } from '../../layout/container/container.types';
import { TechnologyModalItem } from '../../shared/technology-modal/technology-modal.types';

export type SkillCardKind = 'technology' | 'education' | 'language';

export type SkillStackFilterValue =
  | 'ALL'
  | 'FRONT_END'
  | 'BACK_END'
  | 'MOBILE'
  | 'GAMES'
  | 'DATABASES'
  | 'TESTING'
  | 'DEVOPS'
  | 'CONCEPTS'
  | 'OTHERS';

export type SkillLevelFilterValue = 'ALL' | 'ADVANCED' | 'INTERMEDIATE' | 'BASIC' | 'STUDYING';

export type SkillFrequencyFilterValue = 'ALL' | 'FREQUENT' | 'OCCASIONAL' | 'RARE';

export type SkillTypeFilterValue = 'ALL' | TechnologyType;

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

export type SkillsSelectEvent<TValue extends string = string> = CustomEvent<TValue>;

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
  typeLabel: string;
  levelLabel: string;
  frequencyLabel: string;
  frequencyKey: SkillFrequencyFilterValue;
  totalExperienceLabel: string;
  isHighlight: boolean;
  iconName: string;
  visualUrl: string;
  badgeLabel: string;
  badgeColor: string;
  stackKey: SkillStackFilterValue;
  levelKey: SkillLevelFilterValue;
  typeKey: SkillTypeFilterValue;
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
  types: 'taxonomy.skills.filters.allTypes',
  levels: 'taxonomy.skills.filters.allLevels',
  contexts: 'taxonomy.skills.filters.allContexts',
} as const satisfies Record<string, AppTranslationKey>;

export const SKILL_STACK_FILTERS: readonly SkillFilterChipViewModel<SkillStackFilterValue>[] = [
  { labelKey: 'common.filters.all', value: 'ALL' },
  { labelKey: 'taxonomy.skills.stack.frontEnd', value: 'FRONT_END' },
  { labelKey: 'taxonomy.skills.stack.backEnd', value: 'BACK_END' },
  { labelKey: 'taxonomy.skills.stack.mobile', value: 'MOBILE' },
  { labelKey: 'taxonomy.skills.stack.games', value: 'GAMES' },
  { labelKey: 'taxonomy.skills.stack.databases', value: 'DATABASES' },
  { labelKey: 'taxonomy.skills.stack.testing', value: 'TESTING' },
  { labelKey: 'taxonomy.skills.stack.devops', value: 'DEVOPS' },
  { labelKey: 'taxonomy.skills.stack.concepts', value: 'CONCEPTS' },
  { labelKey: 'taxonomy.skills.stack.others', value: 'OTHERS' },
];

export const SKILL_LEVEL_FILTERS: readonly SkillFilterChipViewModel<SkillLevelFilterValue>[] = [
  { labelKey: 'common.filters.all', value: 'ALL' },
  { labelKey: 'taxonomy.skills.level.advanced', value: 'ADVANCED' },
  { labelKey: 'taxonomy.skills.level.intermediate', value: 'INTERMEDIATE' },
  { labelKey: 'taxonomy.skills.level.basic', value: 'BASIC' },
  { labelKey: 'common.states.studying', value: 'STUDYING' },
];

export const SKILL_FREQUENCY_FILTERS: readonly SkillFilterChipViewModel<SkillFrequencyFilterValue>[] = [
  { labelKey: 'common.filters.all', value: 'ALL' },
  { labelKey: 'taxonomy.skills.frequency.frequent', value: 'FREQUENT' },
  { labelKey: 'taxonomy.skills.frequency.occasional', value: 'OCCASIONAL' },
  { labelKey: 'taxonomy.skills.frequency.rare', value: 'RARE' },
];

export const SKILL_TYPE_FILTERS: readonly SkillFilterChipViewModel<SkillTypeFilterValue>[] = [
  { labelKey: 'common.filters.all', value: 'ALL' },
  {
    labelKey: 'taxonomy.skills.type.programmingLanguages',
    value: 'PROGRAMMING_LANGUAGES',
  },
  { labelKey: 'taxonomy.skills.type.webLanguages', value: 'WEB_LANGUAGES' },
  { labelKey: 'taxonomy.skills.type.libraries', value: 'LIBRARIES' },
  { labelKey: 'taxonomy.skills.type.frameworks', value: 'FRAMEWORKS' },
  {
    labelKey: 'taxonomy.skills.type.relationalDataBases',
    value: 'RELATIONAL_DATABASES',
  },
  {
    labelKey: 'taxonomy.skills.type.nonRelationalDataBases',
    value: 'NON_RELATIONAL_DATABASES',
  },
  {
    labelKey: 'taxonomy.skills.type.databasesManagementSystems',
    value: 'DATABASES_MANAGEMENT_SYSTEMS',
  },
  { labelKey: 'taxonomy.skills.type.orms', value: 'ORMS' },
  { labelKey: 'taxonomy.skills.type.codeEditors', value: 'CODE_EDITORS' },
  { labelKey: 'taxonomy.skills.type.techniques', value: 'TECHNIQUES' },
  { labelKey: 'taxonomy.skills.type.methodologies', value: 'METHODOLOGIES' },
  {
    labelKey: 'taxonomy.skills.type.markupAndFormatSyntaxes',
    value: 'MARKUP_AND_FORMAT_SYNTAXES',
  },
  { labelKey: 'taxonomy.skills.type.packageManagers', value: 'PACKAGE_MANAGERS' },
  { labelKey: 'taxonomy.skills.type.packages', value: 'PACKAGES' },
  {
    labelKey: 'taxonomy.skills.type.versioningPlatforms',
    value: 'VERSIONING_PLATFORMS',
  },
  {
    labelKey: 'taxonomy.skills.type.cloudHostingPlatforms',
    value: 'CLOUD_HOSTING_PLATFORMS',
  },
  { labelKey: 'taxonomy.skills.type.deploymentTools', value: 'DEPLOYMENT_TOOLS' },
  {
    labelKey: 'taxonomy.skills.type.developmentPlatforms',
    value: 'DEVELOPMENT_PLATFORMS',
  },
  { labelKey: 'taxonomy.skills.type.runtimeEnvironments', value: 'RUNTIME_ENVIRONMENTS' },
  { labelKey: 'taxonomy.skills.type.testingTools', value: 'TESTING_TOOLS' },
  { labelKey: 'taxonomy.skills.type.buildTools', value: 'BUILD_TOOLS' },
  { labelKey: 'taxonomy.skills.type.documentationTools', value: 'DOCUMENTATION_TOOLS' },
  { labelKey: 'taxonomy.skills.type.preprocessors', value: 'PREPROCESSORS' },
  { labelKey: 'taxonomy.skills.type.protocols', value: 'PROTOCOLS' },
  { labelKey: 'taxonomy.skills.type.artificialIntelligences', value: 'ARTIFICIAL_INTELLIGENCES' },
  { labelKey: 'taxonomy.skills.type.designPatterns', value: 'DESIGN_PATTERNS' },
  { labelKey: 'taxonomy.skills.type.programmingParadigms', value: 'PROGRAMMING_PARADIGMS' },
  { labelKey: 'taxonomy.skills.type.architectures', value: 'ARCHITECTURES' },
  { labelKey: 'taxonomy.skills.type.principles', value: 'PRINCIPLES' },
  { labelKey: 'taxonomy.skills.stack.others', value: 'OTHERS' },
];

export const SKILL_FALLBACK_LABEL_KEYS = {
  untyped: 'taxonomy.skills.fallback.untyped',
  levelNotSet: 'taxonomy.skills.fallback.levelNotSet',
  frequencyNotSet: 'taxonomy.skills.fallback.frequencyNotSet',
  noDuration: 'taxonomy.skills.fallback.noDuration',
  zeroMonths: 'taxonomy.skills.fallback.zeroMonths',
  summaryMapped: 'taxonomy.skills.summary.mapped',
  summaryHighlights: 'taxonomy.skills.summary.highlights',
  summaryTypes: 'taxonomy.skills.summary.types',
  summaryAdvanced: 'taxonomy.skills.summary.advanced',
  summaryLongest: 'taxonomy.skills.summary.longest',
  groupDescription: 'taxonomy.skills.group.description',
} as const satisfies Record<string, AppTranslationKey>;

export const SKILL_STACK_LABEL_KEYS: Record<SkillStackFilterValue, AppTranslationKey> = {
  ALL: 'common.filters.all',
  FRONT_END: 'taxonomy.skills.stack.frontEnd',
  BACK_END: 'taxonomy.skills.stack.backEnd',
  DATABASES: 'taxonomy.skills.stack.databases',
  GAMES: 'taxonomy.skills.stack.games',
  MOBILE: 'taxonomy.skills.stack.mobile',
  TESTING: 'taxonomy.skills.stack.testing',
  DEVOPS: 'taxonomy.skills.stack.devops',
  CONCEPTS: 'taxonomy.skills.stack.concepts',
  OTHERS: 'taxonomy.skills.stack.others',
};

export const SKILL_TYPE_LABEL_KEYS: Record<SkillTypeFilterValue, AppTranslationKey> = {
  ALL: 'common.filters.all',
  PROGRAMMING_LANGUAGES: 'taxonomy.skills.type.programmingLanguages',
  WEB_LANGUAGES: 'taxonomy.skills.type.webLanguages',
  LIBRARIES: 'taxonomy.skills.type.libraries',
  FRAMEWORKS: 'taxonomy.skills.type.frameworks',
  RELATIONAL_DATABASES: 'taxonomy.skills.type.relationalDataBases',
  NON_RELATIONAL_DATABASES: 'taxonomy.skills.type.nonRelationalDataBases',
  DATABASES_MANAGEMENT_SYSTEMS: 'taxonomy.skills.type.databasesManagementSystems',
  ORMS: 'taxonomy.skills.type.orms',
  CODE_EDITORS: 'taxonomy.skills.type.codeEditors',
  TECHNIQUES: 'taxonomy.skills.type.techniques',
  METHODOLOGIES: 'taxonomy.skills.type.methodologies',
  MARKUP_AND_FORMAT_SYNTAXES: 'taxonomy.skills.type.markupAndFormatSyntaxes',
  PACKAGE_MANAGERS: 'taxonomy.skills.type.packageManagers',
  PACKAGES: 'taxonomy.skills.type.packages',
  VERSIONING_PLATFORMS: 'taxonomy.skills.type.versioningPlatforms',
  CLOUD_HOSTING_PLATFORMS: 'taxonomy.skills.type.cloudHostingPlatforms',
  DEPLOYMENT_TOOLS: 'taxonomy.skills.type.deploymentTools',
  DEVELOPMENT_PLATFORMS: 'taxonomy.skills.type.developmentPlatforms',
  RUNTIME_ENVIRONMENTS: 'taxonomy.skills.type.runtimeEnvironments',
  TESTING_TOOLS: 'taxonomy.skills.type.testingTools',
  BUILD_TOOLS: 'taxonomy.skills.type.buildTools',
  DOCUMENTATION_TOOLS: 'taxonomy.skills.type.documentationTools',
  PREPROCESSORS: 'taxonomy.skills.type.preprocessors',
  PROTOCOLS: 'taxonomy.skills.type.protocols',
  ARTIFICIAL_INTELLIGENCES: 'taxonomy.skills.type.artificialIntelligences',
  DESIGN_PATTERNS: 'taxonomy.skills.type.designPatterns',
  PROGRAMMING_PARADIGMS: 'taxonomy.skills.type.programmingParadigms',
  ARCHITECTURES: 'taxonomy.skills.type.architectures',
  PRINCIPLES: 'taxonomy.skills.type.principles',
  OTHERS: 'taxonomy.skills.stack.others',
};

export const SKILL_LEVEL_LABEL_KEYS: Record<string, AppTranslationKey> = {
  ADVANCED: 'taxonomy.skills.level.advanced',
  INTERMEDIATE: 'taxonomy.skills.level.intermediate',
  BASIC: 'taxonomy.skills.level.basic',
  STUDYING: 'common.states.studying',
};

export const SKILL_FREQUENCY_LABEL_KEYS: Record<string, AppTranslationKey> = {
  FREQUENT: 'taxonomy.skills.frequency.frequent',
  OCCASIONAL: 'taxonomy.skills.frequency.occasional',
  RARE: 'taxonomy.skills.frequency.rare',
};

export const SKILL_CONTEXT_LABEL_KEYS: Record<TechnologyContextKey, AppTranslationKey> = {
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

