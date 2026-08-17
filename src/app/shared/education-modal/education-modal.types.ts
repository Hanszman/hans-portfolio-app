import { TagModalDetail, TagModalImage } from '../tag/tag-modal/tag-modal.types';
import { TechnologyModalItem } from '../technology-modal/technology-modal.types';

export interface EducationModalGalleryItem {
  id: string;
  imageSrc: string;
  imageAlt: string;
  title?: string;
  description?: string;
}

export interface EducationModalItem {
  title: string;
  subtitle: string;
  image?: TagModalImage | null;
  details: readonly TagModalDetail[];
  galleryItems: readonly EducationModalGalleryItem[];
  technologies: readonly {
    slug: string;
    name: string;
    image?: TagModalImage | null;
    modal?: TechnologyModalItem;
  }[];
}
