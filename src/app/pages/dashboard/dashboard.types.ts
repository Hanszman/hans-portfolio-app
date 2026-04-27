import {
  DashboardHighlightsResponse,
  DashboardOverviewResponse,
  DashboardProfessionalTimelineResponse,
  DashboardProjectContextsResponse,
  DashboardStackDistributionResponse,
  DashboardTechnologyUsageResponse,
} from '../../core/api/dashboard/dashboard.types';
import { buildRelativeSkillImageAssetPath } from '../../core/api/api.config';
import { AppTranslationKey } from '../../core/translation/translation.types';

export interface DashboardPageData {
  overview: DashboardOverviewResponse;
  stackDistribution: DashboardStackDistributionResponse;
  projectContexts: DashboardProjectContextsResponse;
  technologyUsage: DashboardTechnologyUsageResponse;
  professionalTimeline: DashboardProfessionalTimelineResponse;
  highlights: DashboardHighlightsResponse;
}

export interface DashboardSummaryCardViewModel {
  label: string;
  value: string;
  iconName: string;
}

export interface DashboardStackRowViewModel {
  slug: string;
  name: string;
  projectCount: number;
  technologyCount: number;
  totalConnections: number;
  iconName: string;
}

export interface DashboardDistributionRowViewModel {
  label: string;
  count: number;
}

export interface DashboardProjectDistributionViewModel {
  featuredProjects: number;
  highlightedProjects: number;
  totalProjects: number;
  contexts: readonly DashboardDistributionRowViewModel[];
  environments: readonly DashboardDistributionRowViewModel[];
}

export interface DashboardTechnologyLeaderViewModel {
  slug: string;
  name: string;
  usageCount: number;
  iconName: string;
  visualUrl: string;
}

export interface DashboardTechnologyBreakdownViewModel {
  labelKey: AppTranslationKey;
  items: readonly DashboardDistributionRowViewModel[];
}

export interface DashboardTimelineCardViewModel {
  slug: string;
  companyName: string;
  title: string;
  periodLabel: string;
  isCurrent: boolean;
  isHighlight: boolean;
  jobs: readonly string[];
  customers: readonly string[];
  projects: readonly string[];
  technologies: readonly string[];
  imageUrl: string;
}

export interface DashboardHighlightCardViewModel {
  entity: string;
  slug: string;
  title: string;
  subtitle: string;
  featured: boolean;
  iconName: string;
  visualUrl: string;
}

export const DASHBOARD_SUMMARY_LABEL_KEYS = {
  projects: 'pages.dashboard.snapshot.metrics.projects',
  experiences: 'pages.dashboard.snapshot.metrics.experiences',
  technologies: 'pages.dashboard.snapshot.metrics.technologies',
  formations: 'pages.dashboard.snapshot.metrics.formations',
  customers: 'pages.dashboard.snapshot.metrics.customers',
  jobs: 'pages.dashboard.snapshot.metrics.jobs',
  spokenLanguages: 'pages.dashboard.snapshot.metrics.languages',
} as const satisfies Record<string, AppTranslationKey>;

export const DASHBOARD_CONTEXT_LABEL_KEYS: Record<string, AppTranslationKey> = {
  PROFESSIONAL: 'taxonomy.skills.context.professional',
  PERSONAL: 'taxonomy.skills.context.personal',
  ACADEMIC: 'taxonomy.skills.context.academic',
  STUDY: 'taxonomy.skills.context.study',
};

export const DASHBOARD_ENVIRONMENT_LABEL_KEYS: Record<
  string,
  AppTranslationKey
> = {
  FRONTEND: 'taxonomy.experiences.projectEnvironment.frontend',
  BACKEND: 'taxonomy.experiences.projectEnvironment.backend',
  FULLSTACK: 'taxonomy.experiences.projectEnvironment.fullstack',
};

export const DASHBOARD_LEVEL_LABEL_KEYS: Record<string, AppTranslationKey> = {
  ADVANCED: 'taxonomy.skills.level.advanced',
  INTERMEDIATE: 'taxonomy.skills.level.intermediate',
  BEGINNER: 'taxonomy.skills.level.beginner',
};

export const DASHBOARD_FREQUENCY_LABEL_KEYS: Record<
  string,
  AppTranslationKey
> = {
  FREQUENT: 'taxonomy.skills.frequency.frequent',
  OCCASIONAL: 'taxonomy.skills.frequency.occasional',
  RARE: 'taxonomy.skills.frequency.rare',
};

export const DASHBOARD_SOURCE_LABEL_KEYS: Record<string, AppTranslationKey> = {
  EXPERIENCE: 'taxonomy.dashboard.source.experience',
  PROJECT: 'taxonomy.dashboard.source.project',
  FORMATION: 'taxonomy.dashboard.source.formation',
};

const DASHBOARD_STACK_ICON_NAMES: Record<string, string> = {
  'front-end': 'LuMonitorSmartphone',
  frontend: 'LuMonitorSmartphone',
  'back-end': 'LuServer',
  backend: 'LuServer',
  fullstack: 'LuLayers3',
  devops: 'LuCloud',
  mobile: 'LuSmartphone',
};

const DASHBOARD_HIGHLIGHT_ICON_NAMES: Record<string, string> = {
  project: 'LuFolderKanban',
  experience: 'LuBriefcaseBusiness',
  technology: 'LuCpu',
  customer: 'LuHandshake',
  formation: 'LuGraduationCap',
  language: 'LuLanguages',
};

const DASHBOARD_TECHNOLOGY_CATEGORY_ICON_NAMES: Record<string, string> = {
  FRAMEWORK: 'LuBlocks',
  LANGUAGE: 'LuCpu',
  LIBRARY: 'LuPackage',
  DATABASE: 'LuDatabase',
  ORM: 'LuDatabase',
  DEVOPS: 'LuCloud',
};

const DASHBOARD_TECHNOLOGY_VISUAL_FILE_NAMES: Record<string, string> = {
  angular: 'angular.png',
  css: 'css.png',
  html: 'html.png',
  javascript: 'javascript.png',
  json: 'json.png',
  git: 'git.png',
  typescript: 'typescript.png',
  visualstudiocode: 'visualstudiocode.png',
  'visual-studio-code': 'visualstudiocode.png',
};

export const resolveDashboardStackIconName = (slug: string): string =>
  DASHBOARD_STACK_ICON_NAMES[slug.toLowerCase()] ?? 'LuLayers3';

export const resolveDashboardHighlightIconName = (entity: string): string =>
  DASHBOARD_HIGHLIGHT_ICON_NAMES[entity] ?? 'LuSparkles';

export const resolveDashboardTechnologyIconName = (category: string): string =>
  DASHBOARD_TECHNOLOGY_CATEGORY_ICON_NAMES[category] ?? 'LuCpu';

export const resolveDashboardTechnologyVisualPath = (slug: string): string =>
  DASHBOARD_TECHNOLOGY_VISUAL_FILE_NAMES[slug.toLowerCase()]
    ? buildRelativeSkillImageAssetPath(
        DASHBOARD_TECHNOLOGY_VISUAL_FILE_NAMES[slug.toLowerCase()],
      )
    : '';
