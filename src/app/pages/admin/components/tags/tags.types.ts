import { ProjectCollectionItemResponse } from '../../../../core/api/projects/projects.types';
import { TechnologyCollectionItemResponse } from '../../../../core/api/technologies/technologies.types';
import {
  TagMutationPayload,
  TagProjectRelationRecord,
  TagRecord,
  TagTechnologyRelationRecord,
} from '../../../../core/api/admin/tags/tags-api.types';
import { AppTranslationKey } from '../../../../core/translation/translation.types';

export type TagsModalMode =
  | 'create'
  | 'pick-update'
  | 'pick-delete'
  | 'update'
  | 'delete';

export interface TagsFormValue {
  slug: string;
  namePt: string;
  nameEn: string;
  type: string;
  sortOrder: string;
  projectIds: readonly string[];
  technologyIds: readonly string[];
}

export interface TagCatalogOptionViewModel {
  id: string;
  title: string;
  subtitle: string;
}

export interface TagViewModel {
  id: string;
  slug: string;
  namePt: string;
  nameEn: string;
  type: string;
  sortOrderLabel: string;
  projectLabels: readonly string[];
  technologyLabels: readonly string[];
  projectIds: readonly string[];
  technologyIds: readonly string[];
}

export interface NormalizedTagRelations {
  projectIds: readonly string[];
  technologyIds: readonly string[];
}

export interface TagsMutationBuildSuccess {
  isValid: true;
  payload: TagMutationPayload;
}

export interface TagsMutationBuildFailure {
  isValid: false;
  errorKey: AppTranslationKey;
}

export type TagsMutationBuildResult =
  | TagsMutationBuildSuccess
  | TagsMutationBuildFailure;

export const createEmptyTagsFormValue = (): TagsFormValue => ({
  slug: '',
  namePt: '',
  nameEn: '',
  type: '',
  sortOrder: '0',
  projectIds: [],
  technologyIds: [],
});

export const resolveTagNamePt = (tag: TagRecord): string =>
  tag.namePt ?? tag.labelPt ?? '';

export const resolveTagNameEn = (tag: TagRecord): string =>
  tag.nameEn ?? tag.labelEn ?? '';

export const resolveTagProjectIdFromRelation = (
  relation: TagProjectRelationRecord,
): string | null => relation.projectId ?? relation.project?.id ?? null;

export const resolveTagTechnologyIdFromRelation = (
  relation: TagTechnologyRelationRecord,
): string | null => relation.technologyId ?? relation.technology?.id ?? null;

export const createTagCatalogOptionViewModel = (
  item: ProjectCollectionItemResponse | TechnologyCollectionItemResponse,
): TagCatalogOptionViewModel =>
  'titlePt' in item
    ? {
        id: item.id,
        title: item.titlePt,
        subtitle: item.slug,
      }
    : {
        id: item.id,
        title: item.name,
        subtitle: item.slug,
      };
