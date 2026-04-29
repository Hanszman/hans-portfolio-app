import { AppTranslationKey } from '../../core/translation/translation.types';

export interface ProjectSummaryMetricViewModel {
  label: string;
  value: string;
  supportingText?: string;
}

export interface ProjectLinkViewModel {
  id: string;
  url: string;
  label: string;
  typeLabel: string;
}

export interface ProjectGalleryItemViewModel {
  id: string;
  imageSrc: string;
  imageAlt: string;
  title?: string;
  description?: string;
}

export interface ProjectCaseViewModel {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  contextLabel: string;
  statusLabel: string;
  environmentLabel: string;
  dateRangeLabel: string;
  isFeatured: boolean;
  isHighlight: boolean;
  companyNames: readonly string[];
  technologies: readonly string[];
  extraTechnologyCount: number;
  links: readonly ProjectLinkViewModel[];
  imageUrl: string;
  imageAlt: string;
  assetCountLabel: string;
  experienceTitles: readonly string[];
  tagLabels: readonly string[];
  galleryItems: readonly ProjectGalleryItemViewModel[];
}

export interface ProjectFilterValues {
  contexts: readonly string[];
  environments: readonly string[];
  statuses: readonly string[];
}

export interface ProjectFilterOption {
  label: string;
  value: string;
}

export interface ProjectsDropdownElement extends HTMLElement {
  options: readonly ProjectFilterOption[];
}

export interface ProjectsSelectEventDetail {
  label: string;
  value: string;
}

export interface ProjectsSelectEvent extends Event {
  detail: ProjectsSelectEventDetail;
}

export const PROJECT_FILTER_ALL_LABEL_KEYS = {
  contexts: 'taxonomy.projects.filters.allContexts',
  environments: 'taxonomy.projects.filters.allEnvironments',
  statuses: 'taxonomy.projects.filters.allStatuses',
} as const satisfies Record<string, AppTranslationKey>;

export const PROJECT_CONTEXT_LABEL_KEYS: Record<string, AppTranslationKey> = {
  PROFESSIONAL: 'taxonomy.skills.context.professional',
  PERSONAL: 'taxonomy.skills.context.personal',
  ACADEMIC: 'taxonomy.skills.context.academic',
  STUDY: 'taxonomy.skills.context.study',
};

export const PROJECT_STATUS_LABEL_KEYS: Record<string, AppTranslationKey> = {
  COMPLETED: 'taxonomy.experiences.projectStatus.completed',
  IN_PROGRESS: 'taxonomy.experiences.projectStatus.inProgress',
};

export const PROJECT_ENVIRONMENT_LABEL_KEYS: Record<string, AppTranslationKey> = {
  FRONTEND: 'taxonomy.experiences.projectEnvironment.frontend',
  BACKEND: 'taxonomy.experiences.projectEnvironment.backend',
  FULLSTACK: 'taxonomy.experiences.projectEnvironment.fullstack',
};

export const PROJECT_SORT_LABEL_KEYS = {
  FEATURED: 'taxonomy.projects.sort.featured',
  RECENT: 'taxonomy.projects.sort.recent',
  STACK: 'taxonomy.projects.sort.stack',
  LINKS: 'taxonomy.projects.sort.links',
} as const satisfies Record<string, AppTranslationKey>;

export type ProjectSortKey = keyof typeof PROJECT_SORT_LABEL_KEYS;

export const PROJECT_LINK_TYPE_LABEL_KEYS: Record<string, AppTranslationKey> = {
  GITHUB: 'taxonomy.projects.linkType.github',
  DEPLOY: 'taxonomy.projects.linkType.deploy',
  SOURCE_CODE: 'taxonomy.projects.linkType.sourceCode',
};

export const PROJECT_SUMMARY_LABEL_KEYS = {
  total: 'taxonomy.projects.summary.total',
  featured: 'taxonomy.projects.summary.featured',
  inProgress: 'taxonomy.projects.summary.inProgress',
  linkedAssets: 'taxonomy.projects.summary.linkedAssets',
  richestStack: 'taxonomy.projects.summary.richestStack',
} as const satisfies Record<string, AppTranslationKey>;

export const PROJECT_FALLBACK_LABEL_KEYS = {
  noAssets: 'taxonomy.projects.fallback.noAssets',
  noLinks: 'taxonomy.projects.fallback.noLinks',
  noCompanies: 'taxonomy.projects.fallback.noCompanies',
  untitledLink: 'taxonomy.projects.fallback.untitledLink',
} as const satisfies Record<string, AppTranslationKey>;
