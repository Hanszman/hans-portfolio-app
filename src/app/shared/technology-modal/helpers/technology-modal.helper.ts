import { TagModalDetail } from '../../tag-modal/tag-modal.types';

export const buildTechnologyModalDetail = (
  labelKey: TagModalDetail['labelKey'],
  value: string | number | undefined,
): TagModalDetail | null =>
  value === undefined || value === '' ? null : { labelKey, value };
