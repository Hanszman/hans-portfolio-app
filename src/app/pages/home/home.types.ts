import { buildRelativeImageAssetPath } from '../../core/api/api.config';
import { AppTranslationKey } from '../../core/translation/translation.types';
import { PortfolioSocialLink, PORTFOLIO_SOCIAL_LINKS } from '../../shared/social-links/social-links.types';
import { TechnologyModalItem } from '../../shared/technology-modal/technology-modal.types';

export const HOME_PROFILE_IMAGE_SRC = buildRelativeImageAssetPath('profile/vh_profile.png');
export const CAREER_START_DATE = new Date('2018-09-03T00:00:00.000Z');

export interface HomeHeroViewModel {
  availabilityKey: AppTranslationKey;
  greetingKey: AppTranslationKey;
  name: string;
  subtitleKey: AppTranslationKey;
  descriptionKey: AppTranslationKey;
  locationKey: AppTranslationKey;
  primaryActionLabelKey: AppTranslationKey;
  primaryActionRoute: string;
  secondaryActionLabelKey: AppTranslationKey;
  secondaryActionRoute: string;
  socialLinks: readonly PortfolioSocialLink[];
  imageSrc: string;
}

export interface HomeMetricViewModel {
  value: string;
  labelKey: AppTranslationKey;
  descriptionKey: AppTranslationKey;
  iconName: string;
}

export interface HomeStackChipViewModel {
  slug: string;
  label: string;
  modal: TechnologyModalItem;
}

export interface HomeNavigationCardViewModel {
  eyebrowKey: AppTranslationKey;
  titleKey: AppTranslationKey;
  descriptionKey: AppTranslationKey;
  route: string;
}

export const HOME_HERO: HomeHeroViewModel = {
  availabilityKey: 'pages.home.hero.availability',
  greetingKey: 'pages.home.hero.greeting',
  name: 'Victor Hanszman',
  subtitleKey: 'pages.home.hero.subtitle',
  descriptionKey: 'pages.home.hero.description',
  locationKey: 'pages.home.hero.location',
  primaryActionLabelKey: 'pages.home.hero.cta.projects',
  primaryActionRoute: '/projects',
  secondaryActionLabelKey: 'pages.home.hero.cta.experiences',
  secondaryActionRoute: '/experiences',
  socialLinks: PORTFOLIO_SOCIAL_LINKS,
  imageSrc: HOME_PROFILE_IMAGE_SRC,
} as const;

export const HOME_NAVIGATION_CARDS = [
  {
    eyebrowKey: 'pages.home.navigation.experiences.eyebrow',
    titleKey: 'pages.home.navigation.experiences.title',
    descriptionKey: 'pages.home.navigation.experiences.description',
    route: '/experiences',
  },
  {
    eyebrowKey: 'pages.home.navigation.skills.eyebrow',
    titleKey: 'pages.home.navigation.skills.title',
    descriptionKey: 'pages.home.navigation.skills.description',
    route: '/skills',
  },
  {
    eyebrowKey: 'pages.home.navigation.projects.eyebrow',
    titleKey: 'pages.home.navigation.projects.title',
    descriptionKey: 'pages.home.navigation.projects.description',
    route: '/projects',
  },
] as const satisfies readonly HomeNavigationCardViewModel[];
