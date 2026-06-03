import { AppTranslationKey } from '../../core/translation/translation.types';

export interface PortfolioSocialLink {
  readonly href: string;
  readonly iconName: string;
  readonly labelKey: AppTranslationKey;
}

export const PORTFOLIO_SOCIAL_LINKS: readonly PortfolioSocialLink[] = [
  {
    href: 'https://github.com/Hanszman',
    iconName: 'FaGithub',
    labelKey: 'footer.social.github',
  },
  {
    href: 'https://www.linkedin.com/in/victor-hanszman/',
    iconName: 'FaLinkedin',
    labelKey: 'footer.social.linkedin',
  },
  {
    href: 'https://wa.me/5531994533811',
    iconName: 'FaWhatsapp',
    labelKey: 'footer.social.whatsapp',
  },
  {
    href: 'mailto:victor.hanszman@hotmail.com',
    iconName: 'LuMail',
    labelKey: 'footer.social.email',
  },
] as const;
