import { AppTranslationKey } from '../../core/translation/translation.types';

export interface ExperienceProjectViewModel {
  slug: string;
  title: string;
  summary: string;
}

export interface ExperienceImageViewModel {
  src: string;
  alt: string;
}

export interface ExperienceCustomerViewModel {
  slug: string;
  name: string;
  image: ExperienceImageViewModel;
  companyName: string;
  projectCount: number;
}

export interface ExperienceTechnologyViewModel {
  slug: string;
  name: string;
  category: string;
  level: string;
  frequency: string;
  image: ExperienceImageViewModel;
  projectCount: number;
  experienceCount: number;
}

export interface ExperienceTechnologyGroupViewModel {
  labelKey: AppTranslationKey;
  technologies: ExperienceTechnologyViewModel[];
}

export interface ExperienceTimelineItemViewModel {
  id: string;
  slug: string;
  companyName: string;
  roleTitle: string;
  summary: string;
  description: string;
  dateRangeLabel: string;
  isCurrent: boolean;
  isHighlight: boolean;
  jobs: string[];
  companyImage: ExperienceImageViewModel;
  customers: ExperienceCustomerViewModel[];
  projects: ExperienceProjectViewModel[];
  technologies: ExperienceTechnologyViewModel[];
  extraTechnologyCount: number;
  technologyGroups: readonly ExperienceTechnologyGroupViewModel[];
}

export const INITIAL_VISIBLE_TECHNOLOGY_COUNT = 8;

export const EXPERIENCE_PROJECT_STATUS_LABEL_KEYS: Record<string, AppTranslationKey> = {
  COMPLETED: 'taxonomy.experiences.projectStatus.completed',
  IN_PROGRESS: 'taxonomy.experiences.projectStatus.inProgress',
};

export const EXPERIENCE_PROJECT_ENVIRONMENT_LABEL_KEYS: Record<
  string,
  AppTranslationKey
> = {
  FRONTEND: 'taxonomy.experiences.projectEnvironment.frontend',
  BACKEND: 'taxonomy.experiences.projectEnvironment.backend',
  FULLSTACK: 'taxonomy.experiences.projectEnvironment.fullstack',
};

export const EXPERIENCE_PRESENT_LABEL_KEY = 'taxonomy.experiences.present';

export const EXPERIENCE_TECHNOLOGY_GROUP_LABEL_KEYS = {
  frontend: 'pages.experiences.detail.stackGroups.frontend',
  backend: 'pages.experiences.detail.stackGroups.backend',
  databases: 'pages.experiences.detail.stackGroups.databases',
  others: 'pages.experiences.detail.stackGroups.others',
} as const satisfies Record<string, AppTranslationKey>;

export const EXPERIENCE_FRONTEND_TECHNOLOGY_SLUGS = new Set([
  'angular',
  'typescript',
  'javascript',
  'html',
  'css',
  'sass',
  'bootstrap',
  'jquery',
  'ajax',
  'json',
]);

export const EXPERIENCE_BACKEND_TECHNOLOGY_SLUGS = new Set([
  'node-js',
  'nodejs',
  'node',
  'knex-js',
  'knex',
  'swagger',
  'php',
  'laravel',
  'http',
]);

export const EXPERIENCE_DATABASE_TECHNOLOGY_SLUGS = new Set([
  'sql-server',
  'mysql',
  'postgresql',
  'dbeaver',
]);

export const EXPERIENCE_TECHNOLOGY_GROUP_ORDER = [
  'frontend',
  'backend',
  'databases',
  'others',
] as const;

export type ExperienceTechnologyGroupKey =
  (typeof EXPERIENCE_TECHNOLOGY_GROUP_ORDER)[number];

export const EXPERIENCE_CUSTOMER_IMAGE_FILE_BY_SLUG: Record<string, string> = {
  'costa-tavares': 'costaetavares.jpg',
};
