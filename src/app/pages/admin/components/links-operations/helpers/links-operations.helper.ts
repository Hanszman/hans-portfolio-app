import {
  LinkMutationPayload,
  LinkProjectRelationRecord,
  LinkRecord,
} from '../../../../../core/api/links/links.types';
import { ProjectCollectionItemResponse } from '../../../../../core/api/projects/projects.types';
import {
  LinkCatalogOptionViewModel,
  LINK_TYPE_VALUES,
  LinkOperationsViewModel,
  LinksOperationsFormValue,
  LinksMutationBuildResult,
  createEmptyLinksOperationsFormValue,
  createLinkCatalogOptionViewModel,
} from '../links-operations.types';

const sortCatalogOptions = (
  left: LinkCatalogOptionViewModel,
  right: LinkCatalogOptionViewModel,
): number => left.title.localeCompare(right.title);

const appendUnique = (collection: Set<string>, value: string | null | undefined): void => {
  if (value) {
    collection.add(value);
  }
};

const createProjectMap = (
  projects: readonly ProjectCollectionItemResponse[],
): Map<string, ProjectCollectionItemResponse> =>
  new Map(projects.map((project) => [project.id, project]));

const resolveLinkProjectIdFromRelation = (relation: LinkProjectRelationRecord): string | null =>
  relation.projectId ?? relation.project?.id ?? null;

const resolveProjectIdsFromCatalog = (
  link: LinkRecord,
  projects: readonly ProjectCollectionItemResponse[],
): readonly string[] =>
  projects
    .filter((project) =>
      project.links.some(
        (relation) =>
          relation.linkId === link.id ||
          relation.link.id === link.id ||
          relation.link.url === link.url,
      ),
    )
    .map((project) => project.id);

const resolveProjectLabel = (
  projectId: string,
  projectMap: Map<string, ProjectCollectionItemResponse>,
): string => projectMap.get(projectId)?.titlePt ?? projectId;

export const buildLinkCatalogOptions = (
  items: readonly ProjectCollectionItemResponse[],
): readonly LinkCatalogOptionViewModel[] =>
  [...items].map(createLinkCatalogOptionViewModel).sort(sortCatalogOptions);

export const normalizeLinkProjectIds = (
  link: LinkRecord,
  projects: readonly ProjectCollectionItemResponse[],
): readonly string[] => {
  const projectIds = new Set<string>();

  for (const projectId of link.projectIds ?? []) {
    appendUnique(projectIds, projectId);
  }

  for (const relation of link.projects ?? []) {
    appendUnique(projectIds, resolveLinkProjectIdFromRelation(relation));
  }

  for (const projectId of resolveProjectIdsFromCatalog(link, projects)) {
    appendUnique(projectIds, projectId);
  }

  return [...projectIds];
};

export const buildLinksFormValue = (
  link: LinkRecord | null | undefined,
  projects: readonly ProjectCollectionItemResponse[],
): LinksOperationsFormValue => {
  if (!link) {
    return createEmptyLinksOperationsFormValue();
  }

  return {
    url: link.url,
    labelPt: link.labelPt ?? '',
    labelEn: link.labelEn ?? '',
    labelEs: link.labelEs ?? '',
    type: link.type ?? '',
    sortOrder: String(link.sortOrder ?? 0),
    projectIds: normalizeLinkProjectIds(link, projects),
  };
};

export const buildLinksViewModels = (
  links: readonly LinkRecord[],
  projects: readonly ProjectCollectionItemResponse[],
): readonly LinkOperationsViewModel[] => {
  const projectMap = createProjectMap(projects);

  return [...links]
    .sort((left, right) => {
      const leftSortOrder = left.sortOrder ?? Number.MAX_SAFE_INTEGER;
      const rightSortOrder = right.sortOrder ?? Number.MAX_SAFE_INTEGER;

      if (leftSortOrder !== rightSortOrder) {
        return leftSortOrder - rightSortOrder;
      }

      return left.url.localeCompare(right.url);
    })
    .map((link) => {
      const projectIds = normalizeLinkProjectIds(link, projects);

      return {
        id: link.id,
        url: link.url,
        labelPt: link.labelPt ?? '',
        labelEn: link.labelEn ?? '',
        labelEs: link.labelEs ?? '',
        type: link.type ?? '',
        sortOrderLabel: String(link.sortOrder ?? 0),
        projectLabels: projectIds.map((projectId) => resolveProjectLabel(projectId, projectMap)),
      };
    });
};

export const buildLinksMutationPayload = (
  formValue: LinksOperationsFormValue,
): LinksMutationBuildResult => {
  const url = formValue.url.trim();
  const labelPt = formValue.labelPt.trim();
  const labelEn = formValue.labelEn.trim();
  const labelEs = formValue.labelEs?.trim() ?? labelEn;
  const type = formValue.type.trim().toUpperCase();
  const sortOrder = Number.parseInt(formValue.sortOrder.trim(), 10);

  if (!url) {
    return {
      isValid: false,
      errorKey: 'pages.admin.links.feedback.requiredUrl',
    };
  }

  if (!labelPt) {
    return { isValid: false, errorKey: 'pages.admin.links.feedback.requiredLabelPt' };
  }

  if (!labelEn) {
    return { isValid: false, errorKey: 'pages.admin.links.feedback.requiredLabelEn' };
  }

  if (!labelEs) {
    return { isValid: false, errorKey: 'pages.admin.links.feedback.requiredLabelEs' };
  }

  if (!type) {
    return {
      isValid: false,
      errorKey: 'pages.admin.links.feedback.requiredType',
    };
  }

  if (!LINK_TYPE_VALUES.includes(type as (typeof LINK_TYPE_VALUES)[number])) {
    return {
      isValid: false,
      errorKey: 'pages.admin.links.feedback.invalidType',
    };
  }

  if (!Number.isInteger(sortOrder)) {
    return {
      isValid: false,
      errorKey: 'common.feedback.invalidIntegerSortOrder',
    };
  }

  return {
    isValid: true,
    payload: {
      url,
      labelPt,
      labelEn,
      labelEs,
      type,
      sortOrder,
      projectIds: [...new Set(formValue.projectIds)],
    } satisfies LinkMutationPayload,
  };
};
