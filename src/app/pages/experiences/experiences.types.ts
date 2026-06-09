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
