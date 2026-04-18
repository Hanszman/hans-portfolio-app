import { AppTranslationKey } from '../../core/translation/translation.types';
import { SurfaceTone } from '../../layout/surface/surface.types';

export interface HomeMetricViewModel {
  value: string;
  labelKey: AppTranslationKey;
  descriptionKey: AppTranslationKey;
}

export interface HomeSeniorityPillar {
  labelKey: AppTranslationKey;
  titleKey: AppTranslationKey;
  descriptionKey: AppTranslationKey;
  tone: SurfaceTone;
  tags: readonly AppTranslationKey[];
}

export interface HomeHighlightViewModel {
  entity: string;
  slug: string;
  title: string;
  subtitle: string;
  featured: boolean;
}

export interface HomeStackViewModel {
  slug: string;
  name: string;
  projectCount: number;
  technologyCount: number;
}

export interface HomeCareerFocusViewModel {
  companyName: string;
  title: string;
  technologies: readonly string[];
}

export const HOME_SENIORITY_PILLARS = [
  {
    labelKey: 'pages.home.pillars.architecture.label',
    titleKey: 'pages.home.pillars.architecture.title',
    descriptionKey: 'pages.home.pillars.architecture.description',
    tone: 'primary',
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
    tags: [
      'pages.home.pillars.product.tag.dashboard',
      'pages.home.pillars.product.tag.legacy',
      'pages.home.pillars.product.tag.ux',
    ],
  },
] as const satisfies readonly HomeSeniorityPillar[];
