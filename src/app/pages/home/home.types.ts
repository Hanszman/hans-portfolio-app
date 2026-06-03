import { buildRelativeImageAssetPath } from '../../core/api/api.config';
import { AppTranslationKey } from '../../core/translation/translation.types';

export const HOME_PROFILE_IMAGE_SRC = buildRelativeImageAssetPath('profile/vh_profile.png');

export interface HomeHeroSocialLinkViewModel {
  labelKey: AppTranslationKey;
  href: string;
  iconName: string;
}

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
  socialLinks: readonly HomeHeroSocialLinkViewModel[];
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
  socialLinks: [
    {
      labelKey: 'pages.home.hero.social.github',
      href: 'https://github.com/Hanszman',
      iconName: 'LuGithub',
    },
    {
      labelKey: 'pages.home.hero.social.linkedin',
      href: 'https://www.linkedin.com/in/victor-hanszman/',
      iconName: 'LuLinkedin',
    },
    {
      labelKey: 'pages.home.hero.social.email',
      href: 'mailto:victor.hanszman@hotmail.com',
      iconName: 'LuMail',
    },
  ],
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
