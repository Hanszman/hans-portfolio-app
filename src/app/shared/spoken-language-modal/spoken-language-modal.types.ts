import { TagModalDetail, TagModalImage } from '../tag/tag-modal/tag-modal.types';

export interface SpokenLanguageModalItem {
  title: string;
  subtitle: string;
  image?: TagModalImage | null;
  details: readonly TagModalDetail[];
}
