import { AppTranslationKey } from '../../core/translation/translation.types';
import { TechnologyModalItem } from '../technology-modal/technology-modal.types';

export interface ProjectModalItem {
  id: string;
  title: string;
  summary: string;
  description: string;
  contextLabel: string;
  dateRangeLabel: string;
  companyNames: readonly string[];
  stackGroups: readonly {
    labelKey: AppTranslationKey;
    technologies: readonly {
      slug: string;
      label: string;
      image?: { src: string; alt: string } | null;
      value: TechnologyModalItem;
    }[];
  }[];
  links: readonly { id: string; url: string; label: string; typeLabel: string }[];
  galleryItems: readonly {
    id: string;
    imageSrc: string;
    imageAlt: string;
    title?: string;
    description?: string;
  }[];
}
