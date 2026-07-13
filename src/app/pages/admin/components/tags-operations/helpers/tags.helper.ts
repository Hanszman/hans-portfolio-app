import { ProjectCollectionItemResponse } from '../../../../../core/api/projects/projects.types';
import { TechnologyCollectionItemResponse } from '../../../../../core/api/technologies/technologies.types';
import { TagMutationPayload, TagRecord } from '../../../../../core/api/admin/tags/tags-api.types';
import {
  TAG_TYPE_VALUES,
  TagCatalogOptionViewModel,
  TagOperationsViewModel,
  TagsOperationsFormValue,
  TagsMutationBuildResult,
  createEmptyTagsOperationsFormValue,
  createTagCatalogOptionViewModel,
  resolveTagNameEn,
  resolveTagNamePt,
  resolveTagProjectIdFromRelation,
  resolveTagTechnologyIdFromRelation,
} from '../tags-operations.types';

const sortCatalogOptions = (
  left: TagCatalogOptionViewModel,
  right: TagCatalogOptionViewModel,
): number => left.title.localeCompare(right.title);

const createProjectMap = (
  projects: readonly ProjectCollectionItemResponse[],
): Map<string, ProjectCollectionItemResponse> =>
  new Map(projects.map((project) => [project.id, project]));

const createTechnologyMap = (
  technologies: readonly TechnologyCollectionItemResponse[],
): Map<string, TechnologyCollectionItemResponse> =>
  new Map(technologies.map((technology) => [technology.id, technology]));

const appendUnique = (collection: Set<string>, value: string | null | undefined): void => {
  if (value) {
    collection.add(value);
  }
};

const resolveProjectIdsFromCatalog = (
  tag: TagRecord,
  projects: readonly ProjectCollectionItemResponse[],
): readonly string[] =>
  projects
    .filter((project) =>
      project.tags.some(
        (relation) =>
          relation.tagId === tag.id ||
          relation.tag.id === tag.id ||
          relation.tag.slug === tag.slug,
      ),
    )
    .map((project) => project.id);

const resolveProjectLabel = (
  projectId: string,
  projectMap: Map<string, ProjectCollectionItemResponse>,
): string => projectMap.get(projectId)?.titlePt ?? projectId;

const resolveTechnologyLabel = (
  technologyId: string,
  technologyMap: Map<string, TechnologyCollectionItemResponse>,
): string => technologyMap.get(technologyId)?.name ?? technologyId;

export const buildTagCatalogOptions = (
  items: readonly (ProjectCollectionItemResponse | TechnologyCollectionItemResponse)[],
): readonly TagCatalogOptionViewModel[] =>
  [...items].map(createTagCatalogOptionViewModel).sort(sortCatalogOptions);

export const normalizeTagProjectIds = (
  tag: TagRecord,
  projects: readonly ProjectCollectionItemResponse[],
): readonly string[] => {
  const projectIds = new Set<string>();

  for (const projectId of tag.projectIds ?? []) {
    appendUnique(projectIds, projectId);
  }

  for (const relation of tag.projects ?? []) {
    appendUnique(projectIds, resolveTagProjectIdFromRelation(relation));
  }

  for (const projectId of resolveProjectIdsFromCatalog(tag, projects)) {
    appendUnique(projectIds, projectId);
  }

  return [...projectIds];
};

export const normalizeTagTechnologyIds = (
  tag: TagRecord,
): readonly string[] => {
  const technologyIds = new Set<string>();

  for (const technologyId of tag.technologyIds ?? []) {
    appendUnique(technologyIds, technologyId);
  }

  for (const relation of tag.technologies ?? []) {
    appendUnique(technologyIds, resolveTagTechnologyIdFromRelation(relation));
  }

  return [...technologyIds];
};

export const buildTagsFormValue = (
  tag: TagRecord | null | undefined,
  projects: readonly ProjectCollectionItemResponse[],
): TagsOperationsFormValue => {
  if (!tag) {
    return createEmptyTagsOperationsFormValue();
  }

  return {
    slug: tag.slug,
    namePt: resolveTagNamePt(tag),
    nameEn: resolveTagNameEn(tag),
    type: (tag.type?.toUpperCase() as TagsOperationsFormValue['type']) ?? '',
    sortOrder: String(tag.sortOrder ?? 0),
    projectIds: normalizeTagProjectIds(tag, projects),
    technologyIds: normalizeTagTechnologyIds(tag),
  };
};

export const buildTagsViewModels = (
  tags: readonly TagRecord[],
  projects: readonly ProjectCollectionItemResponse[],
  technologies: readonly TechnologyCollectionItemResponse[],
): readonly TagOperationsViewModel[] => {
  const projectMap = createProjectMap(projects);
  const technologyMap = createTechnologyMap(technologies);

  return [...tags]
    .sort((left, right) => {
      const leftSortOrder = left.sortOrder ?? Number.MAX_SAFE_INTEGER;
      const rightSortOrder = right.sortOrder ?? Number.MAX_SAFE_INTEGER;

      if (leftSortOrder !== rightSortOrder) {
        return leftSortOrder - rightSortOrder;
      }

      return left.slug.localeCompare(right.slug);
    })
    .map((tag) => {
      const projectIds = normalizeTagProjectIds(tag, projects);
      const technologyIds = normalizeTagTechnologyIds(tag);

      return {
        id: tag.id,
        slug: tag.slug,
        namePt: resolveTagNamePt(tag),
        nameEn: resolveTagNameEn(tag),
        type: tag.type?.toUpperCase() ?? '',
        sortOrderLabel: String(tag.sortOrder ?? 0),
        projectLabels: projectIds.map((projectId) =>
          resolveProjectLabel(projectId, projectMap),
        ),
        technologyLabels: technologyIds.map((technologyId) =>
          resolveTechnologyLabel(technologyId, technologyMap),
        ),
        projectIds,
        technologyIds,
      };
    });
};

export const buildTagsMutationPayload = (
  formValue: TagsOperationsFormValue,
): TagsMutationBuildResult => {
  const slug = formValue.slug.trim();
  const namePt = formValue.namePt.trim();
  const nameEn = formValue.nameEn.trim();
  const type = formValue.type.trim().toUpperCase();
  const sortOrder = Number.parseInt(formValue.sortOrder.trim(), 10);

  if (!slug) {
    return {
      isValid: false,
      errorKey: 'pages.admin.tags.feedback.requiredSlug',
    };
  }

  if (!namePt) {
    return {
      isValid: false,
      errorKey: 'pages.admin.tags.feedback.requiredNamePt',
    };
  }

  if (!nameEn) {
    return {
      isValid: false,
      errorKey: 'pages.admin.tags.feedback.requiredNameEn',
    };
  }

  if (!type) {
    return {
      isValid: false,
      errorKey: 'pages.admin.tags.feedback.requiredType',
    };
  }

  if (!TAG_TYPE_VALUES.includes(type as (typeof TAG_TYPE_VALUES)[number])) {
    return {
      isValid: false,
      errorKey: 'pages.admin.tags.feedback.invalidType',
    };
  }

  if (!Number.isInteger(sortOrder)) {
    return {
      isValid: false,
      errorKey: 'pages.admin.tags.feedback.invalidSortOrder',
    };
  }

  return {
    isValid: true,
    payload: {
      slug,
      namePt,
      nameEn,
      type,
      sortOrder,
      projectIds: [...new Set(formValue.projectIds)],
      technologyIds: [...new Set(formValue.technologyIds)],
    } satisfies TagMutationPayload,
  };
};
