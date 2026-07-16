import { ExperienceCollectionItemResponse } from '../../../../core/api/experiences/experiences.types';
import { LinkMutationPayload } from '../../../../core/api/admin/links/links-operations.types';
import { ProjectCollectionItemResponse } from '../../../../core/api/projects/projects.types';
import { TechnologyCollectionItemResponse } from '../../../../core/api/technologies/technologies.types';
import { AppTranslationKey } from '../../../../core/translation/translation.types';

export type LinksOperationsModalMode =
  | 'create'
  | 'read'
  | 'pick-update'
  | 'pick-delete'
  | 'update'
  | 'delete';

export interface LinksOperationsFormValue {
  url: string;
  labelPt: string;
  labelEn: string;
  descriptionPt: string;
  descriptionEn: string;
  type: string;
  sortOrder: string;
  isPublished: boolean;
  projectIds: readonly string[];
  experienceIds: readonly string[];
  technologyIds: readonly string[];
  formationIds: readonly string[];
}

export interface LinkCatalogOptionViewModel {
  id: string;
  title: string;
  subtitle: string;
}

export interface LinkOperationsViewModel {
  id: string;
  url: string;
  labelPt: string;
  labelEn: string;
  descriptionPt: string;
  descriptionEn: string;
  type: string;
  sortOrderLabel: string;
  isPublished: boolean;
  projectLabels: readonly string[];
  experienceLabels: readonly string[];
  technologyLabels: readonly string[];
  formationLabels: readonly string[];
}

export interface NormalizedLinkRelations {
  projectIds: readonly string[];
  experienceIds: readonly string[];
  technologyIds: readonly string[];
  formationIds: readonly string[];
}

export interface LinksMutationBuildSuccess {
  isValid: true;
  payload: LinkMutationPayload;
}

export interface LinksMutationBuildFailure {
  isValid: false;
  errorKey: AppTranslationKey;
}

export type LinksMutationBuildResult =
  | LinksMutationBuildSuccess
  | LinksMutationBuildFailure;

export const createEmptyLinksOperationsFormValue = (): LinksOperationsFormValue => ({
  url: '',
  labelPt: '',
  labelEn: '',
  descriptionPt: '',
  descriptionEn: '',
  type: '',
  sortOrder: '0',
  isPublished: true,
  projectIds: [],
  experienceIds: [],
  technologyIds: [],
  formationIds: [],
});

export const createLinkCatalogOptionViewModel = (
  item:
    | ProjectCollectionItemResponse
    | ExperienceCollectionItemResponse
    | TechnologyCollectionItemResponse,
): LinkCatalogOptionViewModel => {
  if ('companyName' in item) {
    return {
      id: item.id,
      title: item.titlePt,
      subtitle: item.companyName,
    };
  }

  if ('titlePt' in item) {
    return {
      id: item.id,
      title: item.titlePt,
      subtitle: item.slug,
    };
  }

  return {
    id: item.id,
    title: item.name,
    subtitle: item.slug,
  };
};
