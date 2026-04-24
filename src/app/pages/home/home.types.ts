import { AppTranslationKey } from '../../core/translation/translation.types';
import { ContainerTone } from '../../layout/container/container.types';

export interface HomeMetricViewModel {
  value: string;
  labelKey: AppTranslationKey;
  descriptionKey: AppTranslationKey;
  iconName: string;
}

export interface HomeSeniorityPillar {
  labelKey: AppTranslationKey;
  titleKey: AppTranslationKey;
  descriptionKey: AppTranslationKey;
  tone: ContainerTone;
  iconName: string;
  tags: readonly AppTranslationKey[];
}

export interface HomeHighlightViewModel {
  entity: string;
  slug: string;
  title: string;
  subtitle: string;
  featured: boolean;
  visualUrl: string;
  iconName: string;
}

export interface HomeStackViewModel {
  slug: string;
  name: string;
  projectCount: number;
  technologyCount: number;
  iconName: string;
}

export interface HomeCareerFocusViewModel {
  companyName: string;
  title: string;
  technologies: readonly string[];
  customers: readonly string[];
  projects: readonly string[];
  imageUrl: string;
}

export interface HomeTechnologyViewModel {
  slug: string;
  name: string;
  usageCount: number;
  iconName: string;
}

export interface HomeVisualViewModel {
  id: string;
  alt: string;
  src: string;
}

export interface HomeApiSnapshotMetricViewModel {
  labelKey: AppTranslationKey;
  value: string;
  iconName: string;
}

export const HOME_SENIORITY_PILLARS = [
  {
    labelKey: 'pages.home.pillars.architecture.label',
    titleKey: 'pages.home.pillars.architecture.title',
    descriptionKey: 'pages.home.pillars.architecture.description',
    tone: 'primary',
    iconName: 'LuBlocks',
    tags: [
      'pages.home.pillars.architecture.tag.angular',
      'pages.home.pillars.architecture.tag.signals',
      'pages.home.pillars.architecture.tag.designSystem',
    ],
  },
  {
    labelKey: 'pages.home.pillars.delivery.label',
    titleKey: 'pages.home.pillars.delivery.title',
    descriptionKey: 'pages.home.pillars.delivery.description',
    tone: 'success',
    iconName: 'LuWorkflow',
    tags: [
      'pages.home.pillars.delivery.tag.tdd',
      'pages.home.pillars.delivery.tag.ci',
      'pages.home.pillars.delivery.tag.api',
    ],
  },
  {
    labelKey: 'pages.home.pillars.product.label',
    titleKey: 'pages.home.pillars.product.title',
    descriptionKey: 'pages.home.pillars.product.description',
    tone: 'info',
    iconName: 'LuChartColumn',
    tags: [
      'pages.home.pillars.product.tag.dashboard',
      'pages.home.pillars.product.tag.legacy',
      'pages.home.pillars.product.tag.ux',
    ],
  },
] as const satisfies readonly HomeSeniorityPillar[];
