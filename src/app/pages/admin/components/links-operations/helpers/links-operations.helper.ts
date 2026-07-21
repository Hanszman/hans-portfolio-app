import {
  LinkExperienceRelationRecord,
  LinkFormationRelationRecord,
  LinkMutationPayload,
  LinkProjectRelationRecord,
  LinkRecord,
  LinkTechnologyRelationRecord,
} from '../../../../../core/api/admin/links/links-operations.types';
import { ExperienceCollectionItemResponse } from '../../../../../core/api/experiences/experiences.types';
import { ProjectCollectionItemResponse } from '../../../../../core/api/projects/projects.types';
import { TechnologyCollectionItemResponse } from '../../../../../core/api/technologies/technologies.types';
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

const createExperienceMap = (
  experiences: readonly ExperienceCollectionItemResponse[],
): Map<string, ExperienceCollectionItemResponse> =>
  new Map(experiences.map((experience) => [experience.id, experience]));

const createTechnologyMap = (
  technologies: readonly TechnologyCollectionItemResponse[],
): Map<string, TechnologyCollectionItemResponse> =>
  new Map(technologies.map((technology) => [technology.id, technology]));

const resolveLinkProjectIdFromRelation = (
  relation: LinkProjectRelationRecord,
): string | null => relation.projectId ?? relation.project?.id ?? null;

const resolveLinkExperienceIdFromRelation = (
  relation: LinkExperienceRelationRecord,
): string | null => relation.experienceId ?? relation.experience?.id ?? null;

const resolveLinkTechnologyIdFromRelation = (
  relation: LinkTechnologyRelationRecord,
): string | null => relation.technologyId ?? relation.technology?.id ?? null;

const resolveLinkFormationIdFromRelation = (
  relation: LinkFormationRelationRecord,
): string | null => relation.formationId ?? relation.formation?.id ?? null;

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

const resolveExperienceLabel = (
  experienceId: string,
  experienceMap: Map<string, ExperienceCollectionItemResponse>,
): string => {
  const experience = experienceMap.get(experienceId);

  return experience ? `${experience.titlePt} (${experience.companyName})` : experienceId;
};

const resolveTechnologyLabel = (
  technologyId: string,
  technologyMap: Map<string, TechnologyCollectionItemResponse>,
): string => technologyMap.get(technologyId)?.name ?? technologyId;

export const buildLinkCatalogOptions = (
  items: readonly (
    | ProjectCollectionItemResponse
    | ExperienceCollectionItemResponse
    | TechnologyCollectionItemResponse
  )[],
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

export const normalizeLinkExperienceIds = (
  link: LinkRecord,
): readonly string[] => {
  const experienceIds = new Set<string>();

  for (const experienceId of link.experienceIds ?? []) {
    appendUnique(experienceIds, experienceId);
  }

  for (const relation of link.experiences ?? []) {
    appendUnique(experienceIds, resolveLinkExperienceIdFromRelation(relation));
  }

  return [...experienceIds];
};

export const normalizeLinkTechnologyIds = (
  link: LinkRecord,
): readonly string[] => {
  const technologyIds = new Set<string>();

  for (const technologyId of link.technologyIds ?? []) {
    appendUnique(technologyIds, technologyId);
  }

  for (const relation of link.technologies ?? []) {
    appendUnique(technologyIds, resolveLinkTechnologyIdFromRelation(relation));
  }

  return [...technologyIds];
};

export const normalizeLinkFormationIds = (
  link: LinkRecord,
): readonly string[] => {
  const formationIds = new Set<string>();

  for (const formationId of link.formationIds ?? []) {
    appendUnique(formationIds, formationId);
  }

  for (const relation of link.formations ?? []) {
    appendUnique(formationIds, resolveLinkFormationIdFromRelation(relation));
  }

  return [...formationIds];
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
    descriptionPt: link.descriptionPt ?? '',
    descriptionEn: link.descriptionEn ?? '',
    type: link.type ?? '',
    sortOrder: String(link.sortOrder ?? 0),
    projectIds: normalizeLinkProjectIds(link, projects),
    experienceIds: normalizeLinkExperienceIds(link),
    technologyIds: normalizeLinkTechnologyIds(link),
    formationIds: normalizeLinkFormationIds(link),
  };
};

export const buildLinksViewModels = (
  links: readonly LinkRecord[],
  projects: readonly ProjectCollectionItemResponse[],
  experiences: readonly ExperienceCollectionItemResponse[],
  technologies: readonly TechnologyCollectionItemResponse[],
): readonly LinkOperationsViewModel[] => {
  const projectMap = createProjectMap(projects);
  const experienceMap = createExperienceMap(experiences);
  const technologyMap = createTechnologyMap(technologies);

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
      const experienceIds = normalizeLinkExperienceIds(link);
      const technologyIds = normalizeLinkTechnologyIds(link);
      const formationIds = normalizeLinkFormationIds(link);

      return {
        id: link.id,
        url: link.url,
        labelPt: link.labelPt ?? '',
        labelEn: link.labelEn ?? '',
        descriptionPt: link.descriptionPt ?? '',
        descriptionEn: link.descriptionEn ?? '',
        type: link.type ?? '',
        sortOrderLabel: String(link.sortOrder ?? 0),
        projectLabels: projectIds.map((projectId) =>
          resolveProjectLabel(projectId, projectMap),
        ),
        experienceLabels: experienceIds.map((experienceId) =>
          resolveExperienceLabel(experienceId, experienceMap),
        ),
        technologyLabels: technologyIds.map((technologyId) =>
          resolveTechnologyLabel(technologyId, technologyMap),
        ),
        formationLabels: formationIds,
      };
    });
};

export const buildLinksMutationPayload = (
  formValue: LinksOperationsFormValue,
): LinksMutationBuildResult => {
  const url = formValue.url.trim();
  const type = formValue.type.trim().toUpperCase();
  const sortOrder = Number.parseInt(formValue.sortOrder.trim(), 10);

  if (!url) {
    return {
      isValid: false,
      errorKey: 'pages.admin.links.feedback.requiredUrl',
    };
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
      errorKey: 'pages.admin.links.feedback.invalidSortOrder',
    };
  }

  return {
    isValid: true,
    payload: {
      url,
      labelPt: formValue.labelPt.trim(),
      labelEn: formValue.labelEn.trim(),
      descriptionPt: formValue.descriptionPt.trim(),
      descriptionEn: formValue.descriptionEn.trim(),
      type,
      sortOrder,
      projectIds: [...new Set(formValue.projectIds)],
      experienceIds: [...new Set(formValue.experienceIds)],
      technologyIds: [...new Set(formValue.technologyIds)],
      formationIds: [...new Set(formValue.formationIds)],
    } satisfies LinkMutationPayload,
  };
};
