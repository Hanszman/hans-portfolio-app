import { AppLocale, AppTranslationKey } from '../../core/translation/translation.types';

export interface ExperienceProjectViewModel {
  slug: string;
  title: string;
  summary: string;
  statusLabel: string;
  environmentLabel: string;
}

export interface ExperienceTimelineItemViewModel {
  id: string;
  companyName: string;
  title: string;
  summary: string;
  description: string;
  dateRangeLabel: string;
  isCurrent: boolean;
  isHighlight: boolean;
  imageUrl: string;
  jobs: string[];
  customers: string[];
  projects: ExperienceProjectViewModel[];
  technologies: string[];
  extraTechnologyCount: number;
}

export interface ExperiencePortfolioSummaryViewModel {
  currentRoleTitle: string;
  currentCompanyName: string;
  experienceCount: string;
  projectCount: string;
  technologyCount: string;
  customerCount: string;
  highlightCount: string;
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

export const EXPERIENCE_MONTH_FORMATTERS: Record<AppLocale, Intl.DateTimeFormat> = {
  'en-us': new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }),
  'pt-BR': new Intl.DateTimeFormat('pt-BR', {
    month: 'short',
    year: 'numeric',
  }),
  'es-es': new Intl.DateTimeFormat('es-ES', {
    month: 'short',
    year: 'numeric',
  }),
};
