import { TagModalImage } from '../tag/tag-modal/tag-modal.types';

export interface TechnologyModalItem {
  name: string;
  category?: string;
  stack?: string;
  level?: string;
  frequency?: string;
  projectCount?: number;
  experience?: string;
  image?: TagModalImage | null;
}
