export interface FooterSocialLink {
  readonly href: string;
  readonly iconName: string;
  readonly labelKey:
    | 'footer.social.github'
    | 'footer.social.linkedin'
    | 'footer.social.whatsapp';
}

export const FOOTER_SOCIAL_LINKS: readonly FooterSocialLink[] = [
  {
    href: 'https://github.com/Hanszman',
    iconName: 'FaGithub',
    labelKey: 'footer.social.github',
  },
  {
    href: 'https://www.linkedin.com/in/victor-hanszman-b1362215b/',
    iconName: 'FaLinkedin',
    labelKey: 'footer.social.linkedin',
  },
  {
    href: 'https://wa.me/5531994533811',
    iconName: 'FaWhatsapp',
    labelKey: 'footer.social.whatsapp',
  },
];
