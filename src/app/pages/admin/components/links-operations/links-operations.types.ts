import { ExperienceCollectionItemResponse } from '../../../../core/api/experiences/experiences.types';
import { LinkMutationPayload } from '../../../../core/api/admin/links/links-operations.types';
import { ProjectCollectionItemResponse } from '../../../../core/api/projects/projects.types';
import { TechnologyCollectionItemResponse } from '../../../../core/api/technologies/technologies.types';
import { AppTranslationKey } from '../../../../core/translation/translation.types';
import { AdminFormFieldConfig } from '../../admin.types';

export const LINK_TYPE_VALUES = [
  'GITHUB',
  'DEPLOY',
  'NPM',
  'DOCS',
  'LINKEDIN',
  'WEBSITE',
  'ARTICLE',
  'FIGMA',
  'OTHER',
] as const;

export type LinkTypeValue = (typeof LINK_TYPE_VALUES)[number];

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
  projectIds: readonly string[];
  experienceIds: readonly string[];
  technologyIds: readonly string[];
  formationIds: readonly string[];
}

export const LINKS_OPERATIONS_FIELDS = {
  url: {
    labelKey: 'pages.admin.links.fields.url.label',
    placeholderKey: 'pages.admin.links.fields.url.placeholder',
    required: true,
  },
  labelPt: {
    labelKey: 'pages.admin.links.fields.labelPt.label',
    placeholderKey: 'pages.admin.links.fields.labelPt.placeholder',
  },
  labelEn: {
    labelKey: 'pages.admin.links.fields.labelEn.label',
    placeholderKey: 'pages.admin.links.fields.labelEn.placeholder',
  },
  descriptionPt: {
    labelKey: 'pages.admin.links.fields.descriptionPt.label',
    placeholderKey: 'pages.admin.links.fields.descriptionPt.placeholder',
  },
  descriptionEn: {
    labelKey: 'pages.admin.links.fields.descriptionEn.label',
    placeholderKey: 'pages.admin.links.fields.descriptionEn.placeholder',
  },
  type: {
    labelKey: 'pages.admin.links.fields.type.label',
    required: true,
  },
  sortOrder: {
    labelKey: 'pages.admin.links.fields.sortOrder.label',
    placeholderKey: 'pages.admin.links.fields.sortOrder.placeholder',
    required: true,
  },
} as const satisfies Record<string, AdminFormFieldConfig>;

export interface LinkCatalogOptionViewModel {
  id: string;
  title: string;
  subtitle: string;
}

export interface LinkTypeOptionViewModel {
  id: LinkTypeValue;
  label: string;
  value: LinkTypeValue;
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
  projectIds: [],
  experienceIds: [],
  technologyIds: [],
  formationIds: [],
});

export const createLinkTypeOptions = (): readonly LinkTypeOptionViewModel[] =>
  LINK_TYPE_VALUES.map((value) => ({
    id: value,
    label: value,
    value,
  }));

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
