import { AppTranslationKey } from '../../core/translation/translation.types';

export interface TagModalImage {
  src: string;
  alt: string;
}

export interface TagModalDetail {
  labelKey: AppTranslationKey;
  value: string | number;
}
