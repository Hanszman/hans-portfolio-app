import { TechnologyContextKey } from '../../core/api/technologies/technologies.types';
import { AppTranslationKey } from '../../core/translation/translation.types';
import { ContainerTone } from '../../layout/container/container.types';

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

export interface SkillCardViewModel {
  id: string;
  slug: string;
  name: string;
  categoryLabel: string;
  levelLabel: string;
  frequencyLabel: string;
  totalExperienceLabel: string;
  isHighlight: boolean;
  iconName: string;
  visualUrl: string;
  contexts: readonly SkillContextMetricViewModel[];
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

export const SKILL_VISUALS: Record<string, string> = {
  ajax: '/assets/img/skills/ajax.png',
  angular: '/assets/img/skills/angular.png',
  aws: '/assets/img/skills/aws.png',
  azure: '/assets/img/skills/azure.png',
  bootstrap: '/assets/img/skills/bootstrap.png',
  css: '/assets/img/skills/css.png',
  docker: '/assets/img/skills/docker.png',
  express: '/assets/img/skills/express.png',
  git: '/assets/img/skills/git.png',
  html: '/assets/img/skills/html.png',
  javascript: '/assets/img/skills/javascript.png',
  json: '/assets/img/skills/json.png',
  laravel: '/assets/img/skills/laravel.png',
  mysql: '/assets/img/skills/mysql.png',
  node: '/assets/img/skills/node.png',
  php: '/assets/img/skills/php.png',
  postgresql: '/assets/img/skills/postgresql.png',
  react: '/assets/img/skills/react.png',
  sql: '/assets/img/skills/sql.png',
  swagger: '/assets/img/skills/swagger.png',
  typescript: '/assets/img/skills/typescript.png',
};
