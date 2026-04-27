import { AppLocale } from '../../core/translation/translation.types';

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

export const EXPERIENCE_PROJECT_STATUS_LABELS: Record<
  string,
  Record<AppLocale, string>
> = {
  COMPLETED: {
    'en-us': 'Completed',
    'pt-BR': 'Concluido',
    'es-es': 'Completado',
  },
  IN_PROGRESS: {
    'en-us': 'In progress',
    'pt-BR': 'Em andamento',
    'es-es': 'En progreso',
  },
};

export const EXPERIENCE_PROJECT_ENVIRONMENT_LABELS: Record<
  string,
  Record<AppLocale, string>
> = {
  FRONTEND: {
    'en-us': 'Front-end',
    'pt-BR': 'Front-end',
    'es-es': 'Front-end',
  },
  BACKEND: {
    'en-us': 'Back-end',
    'pt-BR': 'Back-end',
    'es-es': 'Back-end',
  },
  FULLSTACK: {
    'en-us': 'Full stack',
    'pt-BR': 'Full stack',
    'es-es': 'Full stack',
  },
};

export const EXPERIENCE_PRESENT_LABELS: Record<AppLocale, string> = {
  'en-us': 'Present',
  'pt-BR': 'Atual',
  'es-es': 'Actual',
};

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
