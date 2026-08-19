import { AppTranslationKey } from '../../core/translation/translation.types';
import { TechnologyModalItem } from '../../shared/technology-modal/technology-modal.types';

export interface ExperienceProjectViewModel {
  slug: string;
  title: string;
  summary: string;
}

export interface ExperienceJobViewModel {
  id: string;
  title: string;
  summary?: string;
  startDate: string;
  endDate: string | null;
  dateRangeLabel: string;
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
  summary: string;
}

export interface ExperienceTechnologyGroupViewModel {
  labelKey: AppTranslationKey;
  technologies: TechnologyModalItem[];
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
  jobs: ExperienceJobViewModel[];
  companyImage: ExperienceImageViewModel;
  customers: ExperienceCustomerViewModel[];
  projects: ExperienceProjectViewModel[];
  technologies: TechnologyModalItem[];
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
  FRONTEND: 'taxonomy.skills.stack.frontEnd',
  BACKEND: 'taxonomy.skills.stack.backEnd',
  FULLSTACK: 'taxonomy.experiences.projectEnvironment.fullstack',
};

export const EXPERIENCE_PRESENT_LABEL_KEY = 'taxonomy.experiences.present';

export const EXPERIENCE_TECHNOLOGY_GROUP_LABEL_KEYS = {
  FRONT_END: 'taxonomy.skills.stack.frontEnd',
  BACK_END: 'taxonomy.skills.stack.backEnd',
  MOBILE: 'taxonomy.skills.stack.mobile',
  GAMES: 'taxonomy.skills.stack.games',
  DATABASES: 'taxonomy.skills.stack.databases',
  TESTING: 'taxonomy.skills.stack.testing',
  DEVOPS: 'taxonomy.skills.stack.devops',
  CONCEPTS: 'taxonomy.skills.stack.concepts',
  OTHERS: 'taxonomy.skills.stack.others',
} as const satisfies Record<string, AppTranslationKey>;

export const EXPERIENCE_TECHNOLOGY_GROUP_ORDER = [
  'FRONT_END',
  'BACK_END',
  'MOBILE',
  'GAMES',
  'DATABASES',
  'TESTING',
  'DEVOPS',
  'CONCEPTS',
  'OTHERS',
] as const;

export type ExperienceTechnologyGroupKey =
  (typeof EXPERIENCE_TECHNOLOGY_GROUP_ORDER)[number];

export const EXPERIENCE_CUSTOMER_IMAGE_FILE_BY_SLUG: Record<string, string> = {
  'costa-tavares': 'costaetavares.jpg',
};
