import { LinkMutationPayload } from '../../../../core/api/links/links.types';
import { ProjectCollectionItemResponse } from '../../../../core/api/projects/projects.types';
import { AppTranslationKey } from '../../../../core/translation/translation.types';
import { AdminFormFieldConfig } from '../../admin.types';
import {
  AdminSelectOptionDefinition,
  AdminSelectOptionViewModel,
  createAdminSelectOptionDefinitions,
} from '../../helpers/admin.helper';

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
  labelEs?: string;
  descriptionPt: string;
  descriptionEn: string;
  descriptionEs?: string;
  type: string;
  sortOrder: string;
  projectIds: readonly string[];
}

export const LINKS_OPERATIONS_FIELDS = {
  url: {
    labelKey: 'common.fields.url',
    placeholderKey: 'pages.admin.links.fields.url.placeholder',
    required: true,
  },
  labelPt: {
    labelKey: 'pages.admin.links.fields.labelPt.label',
    placeholderKey: 'pages.admin.links.fields.labelPt.placeholder',
    required: true,
  },
  labelEn: {
    labelKey: 'pages.admin.links.fields.labelEn.label',
    placeholderKey: 'pages.admin.links.fields.labelEn.placeholder',
    required: true,
  },
  labelEs: {
    labelKey: 'pages.admin.links.fields.labelEs.label',
    placeholderKey: 'pages.admin.links.fields.labelEs.placeholder',
    required: true,
  },
  descriptionPt: {
    labelKey: 'pages.admin.links.fields.descriptionPt.label',
    placeholderKey: 'pages.admin.links.fields.descriptionPt.placeholder',
    required: false,
  },
  descriptionEn: {
    labelKey: 'pages.admin.links.fields.descriptionEn.label',
    placeholderKey: 'pages.admin.links.fields.descriptionEn.placeholder',
    required: false,
  },
  descriptionEs: {
    labelKey: 'common.fields.spanishDescription',
    placeholderKey: 'pages.admin.links.fields.descriptionEs.placeholder',
    required: false,
  },
  type: {
    labelKey: 'common.fields.type',
    required: true,
  },
  sortOrder: {
    labelKey: 'common.fields.sortOrder',
    placeholderKey: 'pages.admin.links.fields.sortOrder.placeholder',
    required: true,
  },
} as const satisfies Record<string, AdminFormFieldConfig>;

export interface LinkCatalogOptionViewModel {
  id: string;
  title: string;
  subtitle: string;
}

export type LinkTypeOptionDefinition = AdminSelectOptionDefinition<LinkTypeValue>;

export type LinkTypeOptionViewModel = AdminSelectOptionViewModel<LinkTypeValue>;

export interface LinkOperationsViewModel {
  id: string;
  url: string;
  labelPt: string;
  labelEn: string;
  labelEs?: string;
  descriptionPt: string;
  descriptionEn: string;
  descriptionEs?: string;
  type: string;
  sortOrderLabel: string;
  projectLabels: readonly string[];
}

export interface NormalizedLinkRelations {
  projectIds: readonly string[];
}

export interface LinksMutationBuildSuccess {
  isValid: true;
  payload: LinkMutationPayload;
}

export interface LinksMutationBuildFailure {
  isValid: false;
  errorKey: AppTranslationKey;
}

export type LinksMutationBuildResult = LinksMutationBuildSuccess | LinksMutationBuildFailure;

export const createEmptyLinksOperationsFormValue = (): LinksOperationsFormValue => ({
  url: '',
  labelPt: '',
  labelEn: '',
  labelEs: '',
  descriptionPt: '',
  descriptionEn: '',
  descriptionEs: '',
  type: '',
  sortOrder: '0',
  projectIds: [],
});

export const createLinkTypeOptions = (): readonly LinkTypeOptionDefinition[] =>
  createAdminSelectOptionDefinitions(
    LINK_TYPE_VALUES,
    (value) => {
      if (value === 'GITHUB') {
        return 'taxonomy.projects.linkType.github';
      }

      if (value === 'DEPLOY') {
        return 'taxonomy.projects.linkType.deploy';
      }

      if (value === 'OTHER') {
        return 'common.values.other';
      }

      return `pages.admin.links.fields.type.options.${value}` as AppTranslationKey;
    },
  );

export const createLinkCatalogOptionViewModel = (
  item: ProjectCollectionItemResponse,
): LinkCatalogOptionViewModel => ({
  id: item.id,
  title: item.titlePt,
  subtitle: item.slug,
});
