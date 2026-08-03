import { AppTranslationKey } from '../../core/translation/translation.types';
import { TagButtonViewModel } from '../tag/tag-button/tag-button.types';
import { TechnologyModalItem } from '../technology-modal/technology-modal.types';

export interface ExperienceModalItem {
  companyName: string;
  roleTitle: string;
  description: string;
  dateRangeLabel: string;
  companyImage: { src: string; alt: string };
  projects: readonly { slug: string; title: string; summary: string }[];
  customers: readonly {
    slug: string;
    name: string;
    image: { src: string; alt: string };
  }[];
  technologyGroups: readonly {
    labelKey: AppTranslationKey;
    technologies: readonly TechnologyModalItem[];
  }[];
}

export type ExperienceTechnologyTag = TagButtonViewModel<TechnologyModalItem>;
