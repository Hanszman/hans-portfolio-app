import { buildAssetUrl } from '../../../core/api/api.config';
import {
  ProjectCollectionItemResponse,
  ProjectsCollectionResponse,
} from '../../../core/api/projects/projects.types';
import {
  resolveLocalizedText,
  translateStaticKey,
} from '../../../core/translation/translation.service';
import {
  AppLocale,
  AppTranslationKey,
} from '../../../core/translation/translation.types';
import {
  PROJECT_CONTEXT_LABEL_KEYS,
  PROJECT_ENVIRONMENT_LABEL_KEYS,
  PROJECT_FALLBACK_LABEL_KEYS,
  PROJECT_LINK_TYPE_LABEL_KEYS,
  PROJECT_STATUS_LABEL_KEYS,
  PROJECT_SUMMARY_LABEL_KEYS,
  ProjectCaseViewModel,
  ProjectFilterValues,
  ProjectLinkViewModel,
  ProjectSummaryMetricViewModel,
} from '../projects.types';

const normalizeLabel = (value: string): string =>
  value
    .toLowerCase()
    .split(/[_-]+/)
    .filter(Boolean)
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(' ');

const dedupe = (values: readonly string[]): readonly string[] => [...new Set(values)];

const formatMonthYear = (dateIso: string, locale: AppLocale): string =>
  new Intl.DateTimeFormat(locale, {
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateIso));

const resolveCatalogLabel = (
  locale: AppLocale,
  value: string,
  translationKeys: Record<string, AppTranslationKey>,
): string => {
  const translationKey = translationKeys[value];

  return translationKey ? translateStaticKey(locale, translationKey) : normalizeLabel(value);
};

const formatProjectDateRange = (
  startDate: string,
  endDate: string | null,
  locale: AppLocale,
): string => {
  const startLabel = formatMonthYear(startDate, locale);
  const endLabel = endDate
    ? formatMonthYear(endDate, locale)
    : translateStaticKey(locale, 'taxonomy.experiences.present');

  return `${startLabel} - ${endLabel}`;
};

const mapProjectLink = (
  relation: ProjectCollectionItemResponse['links'][number],
  locale: AppLocale,
): ProjectLinkViewModel => ({
  id: relation.link.id,
  url: relation.link.url,
  label:
    resolveLocalizedText(
      locale,
      {
        'pt-BR': relation.link.labelPt ?? undefined,
        'en-us': relation.link.labelEn ?? undefined,
      },
      '',
    ) ||
    resolveCatalogLabel(locale, relation.link.type, PROJECT_LINK_TYPE_LABEL_KEYS) ||
    translateStaticKey(locale, PROJECT_FALLBACK_LABEL_KEYS.untitledLink),
  typeLabel: resolveCatalogLabel(locale, relation.link.type, PROJECT_LINK_TYPE_LABEL_KEYS),
});

export const mapProjectToCaseCard = (
  project: ProjectCollectionItemResponse,
  locale: AppLocale,
): ProjectCaseViewModel => {
  const projectImage = [...project.imageAssets].sort((left, right) => left.sortOrder - right.sortOrder)[0];
  const technologies = dedupe(project.technologies.map(({ technology }) => technology.name));
  const companyNames = dedupe(
    project.experiences.map(({ experience }) => experience.companyName),
  );
  const experienceTitles = dedupe(
    project.experiences.map(({ experience }) =>
      resolveLocalizedText(
        locale,
        {
          'pt-BR': experience.titlePt,
          'en-us': experience.titleEn,
        },
        experience.titleEn,
      ),
    ),
  );
  const localizedTitle = resolveLocalizedText(
    locale,
    {
      'pt-BR': project.titlePt,
      'en-us': project.titleEn,
    },
    project.titleEn,
  );

  return {
    id: project.id,
    slug: project.slug,
    title: localizedTitle,
    summary: resolveLocalizedText(
      locale,
      {
        'pt-BR': project.shortDescriptionPt,
        'en-us': project.shortDescriptionEn,
      },
      project.shortDescriptionEn,
    ),
    description: resolveLocalizedText(
      locale,
      {
        'pt-BR': project.fullDescriptionPt,
        'en-us': project.fullDescriptionEn,
      },
      project.fullDescriptionEn,
    ),
    contextLabel: resolveCatalogLabel(locale, project.context, PROJECT_CONTEXT_LABEL_KEYS),
    statusLabel: resolveCatalogLabel(locale, project.status, PROJECT_STATUS_LABEL_KEYS),
    environmentLabel: resolveCatalogLabel(
      locale,
      project.environment,
      PROJECT_ENVIRONMENT_LABEL_KEYS,
    ),
    dateRangeLabel: formatProjectDateRange(project.startDate, project.endDate, locale),
    isFeatured: project.featured,
    isHighlight: project.highlight,
    companyNames,
    technologies: technologies.slice(0, 8),
    extraTechnologyCount: Math.max(technologies.length - 8, 0),
    links: project.links.map((relation) => mapProjectLink(relation, locale)),
    imageUrl: buildAssetUrl(projectImage?.imageAsset.filePath),
    imageAlt:
      resolveLocalizedText(
        locale,
        {
          'pt-BR': projectImage?.imageAsset.altPt ?? undefined,
          'en-us': projectImage?.imageAsset.altEn ?? undefined,
        },
        localizedTitle,
      ) || localizedTitle,
    assetCountLabel: String(project.links.length + project.imageAssets.length),
    experienceTitles,
    tagLabels: dedupe(
      project.tags.map(({ tag }) =>
        resolveLocalizedText(
          locale,
          {
            'pt-BR': tag.labelPt,
            'en-us': tag.labelEn,
          },
          tag.labelEn,
        ),
      ),
    ),
    galleryItems: [...project.imageAssets]
      .sort((left, right) => left.sortOrder - right.sortOrder)
      .map(({ imageAsset }) => ({
        id: imageAsset.id,
        imageSrc: buildAssetUrl(imageAsset.filePath),
        imageAlt:
          resolveLocalizedText(
            locale,
            {
              'pt-BR': imageAsset.altPt ?? undefined,
              'en-us': imageAsset.altEn ?? undefined,
            },
            localizedTitle,
          ) || localizedTitle,
        title: localizedTitle,
        description:
          resolveLocalizedText(
            locale,
            {
              'pt-BR': imageAsset.captionPt ?? undefined,
              'en-us': imageAsset.captionEn ?? undefined,
            },
            '',
          ) || undefined,
      })),
  };
};

export const buildProjectsSummaryMetrics = (
  projects: readonly ProjectCollectionItemResponse[],
  locale: AppLocale,
): readonly ProjectSummaryMetricViewModel[] => {
  const featuredCount = projects.filter((project) => project.featured).length;
  const inProgressCount = projects.filter(
    (project) => project.status === 'IN_PROGRESS',
  ).length;
  const linkedAssetsCount = projects.reduce(
    (total, project) => total + project.links.length + project.imageAssets.length,
    0,
  );
  const richestStackProject =
    [...projects].sort(
      (left, right) =>
        right.technologies.length - left.technologies.length || left.sortOrder - right.sortOrder,
    )[0] ?? null;

  return [
    {
      label: translateStaticKey(locale, PROJECT_SUMMARY_LABEL_KEYS.total),
      value: String(projects.length),
    },
    {
      label: translateStaticKey(locale, PROJECT_SUMMARY_LABEL_KEYS.featured),
      value: String(featuredCount),
    },
    {
      label: translateStaticKey(locale, PROJECT_SUMMARY_LABEL_KEYS.inProgress),
      value: String(inProgressCount),
    },
    {
      label: translateStaticKey(locale, PROJECT_SUMMARY_LABEL_KEYS.linkedAssets),
      value: String(linkedAssetsCount),
    },
    {
      label: translateStaticKey(locale, PROJECT_SUMMARY_LABEL_KEYS.richestStack),
      value: richestStackProject
        ? resolveLocalizedText(
            locale,
            {
              'pt-BR': richestStackProject.titlePt,
              'en-us': richestStackProject.titleEn,
            },
            richestStackProject.titleEn,
          )
        : '',
      supportingText: richestStackProject
        ? `${richestStackProject.technologies.length} ${translateStaticKey(locale, 'pages.projects.card.technologies')}`
        : '',
    },
  ];
};

export const extractProjectFilterValues = (
  response: ProjectsCollectionResponse,
): ProjectFilterValues => ({
  contexts: [...new Set(response.data.map((project) => project.context))].sort(),
  environments: [...new Set(response.data.map((project) => project.environment))].sort(),
  statuses: [...new Set(response.data.map((project) => project.status))].sort(),
});

export const resolveProjectEmptyCompanyLabel = (locale: AppLocale): string =>
  translateStaticKey(locale, PROJECT_FALLBACK_LABEL_KEYS.noCompanies);

export const resolveProjectEmptyLinksLabel = (locale: AppLocale): string =>
  translateStaticKey(locale, PROJECT_FALLBACK_LABEL_KEYS.noLinks);

export const resolveProjectEmptyAssetsLabel = (locale: AppLocale): string =>
  translateStaticKey(locale, PROJECT_FALLBACK_LABEL_KEYS.noAssets);
