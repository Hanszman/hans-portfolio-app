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

export interface SkillTimelineEntryViewModel {
  key: TechnologyContextKey;
  label: string;
  startedAt: string;
  endedAt: string | null;
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
  timelineEntries: readonly SkillTimelineEntryViewModel[];
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
