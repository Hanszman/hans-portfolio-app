import { ProjectCollectionItemResponse } from '../../../../core/api/projects/projects.types';
import { TechnologyCollectionItemResponse } from '../../../../core/api/technologies/technologies.types';
import {
  TagMutationPayload,
  TagProjectRelationRecord,
  TagRecord,
  TagTechnologyRelationRecord,
} from '../../../../core/api/admin/tags/tags-operations.types';
import { AppTranslationKey } from '../../../../core/translation/translation.types';
import { AdminFormFieldConfig } from '../../admin.types';
import {
  AdminSelectOptionDefinition,
  AdminSelectOptionViewModel,
  createAdminSelectOptionDefinitions,
} from '../../helpers/admin.helper';

export const TAG_TYPE_VALUES = [
  'STACK',
  'DOMAIN',
  'PLATFORM',
  'HIGHLIGHT',
  'METHODOLOGY',
  'INDUSTRY',
  'OTHER',
] as const;

export type TagTypeValue = (typeof TAG_TYPE_VALUES)[number];

export type TagsOperationsModalMode =
  | 'create'
  | 'read'
  | 'pick-update'
  | 'pick-delete'
  | 'update'
  | 'delete';

export interface TagsOperationsFormValue {
  slug: string;
  namePt: string;
  nameEn: string;
  type: TagTypeValue | '';
  sortOrder: string;
  projectIds: readonly string[];
  technologyIds: readonly string[];
}

export const TAGS_OPERATIONS_FIELDS = {
  slug: {
    labelKey: 'pages.admin.tags.fields.slug.label',
    placeholderKey: 'pages.admin.tags.fields.slug.placeholder',
    required: true,
  },
  namePt: {
    labelKey: 'pages.admin.tags.fields.namePt.label',
    placeholderKey: 'pages.admin.tags.fields.namePt.placeholder',
    required: true,
  },
  nameEn: {
    labelKey: 'pages.admin.tags.fields.nameEn.label',
    placeholderKey: 'pages.admin.tags.fields.nameEn.placeholder',
    required: true,
  },
  type: {
    labelKey: 'pages.admin.tags.fields.type.label',
    required: true,
  },
  sortOrder: {
    labelKey: 'pages.admin.tags.fields.sortOrder.label',
    placeholderKey: 'pages.admin.tags.fields.sortOrder.placeholder',
    required: true,
  },
} as const satisfies Record<string, AdminFormFieldConfig>;

export interface TagCatalogOptionViewModel {
  id: string;
  title: string;
  subtitle: string;
}

export type TagTypeOptionDefinition = AdminSelectOptionDefinition<TagTypeValue>;

export type TagTypeOptionViewModel = AdminSelectOptionViewModel<TagTypeValue>;

export interface TagOperationsViewModel {
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

export const createEmptyTagsOperationsFormValue = (): TagsOperationsFormValue => ({
  slug: '',
  namePt: '',
  nameEn: '',
  type: '',
  sortOrder: '0',
  projectIds: [],
  technologyIds: [],
});

export const createTagTypeOptions = (): readonly TagTypeOptionDefinition[] =>
  createAdminSelectOptionDefinitions(
    TAG_TYPE_VALUES,
    (value) => `pages.admin.tags.fields.type.options.${value}` as AppTranslationKey,
  );

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
