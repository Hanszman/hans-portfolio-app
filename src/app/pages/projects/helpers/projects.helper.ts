import { buildAssetUrl } from '../../../core/api/api.config';
import {
  ProjectCollectionItemResponse,
  ProjectTechnologyResponse,
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
  resolveSkillStackKey,
  resolveSkillTypeKey,
  resolveSkillVisualUrl,
} from '../../skills/helpers/skills.helper';
import {
  SKILL_FREQUENCY_LABEL_KEYS,
  SKILL_LEVEL_LABEL_KEYS,
  SKILL_STACK_LABEL_KEYS,
  SKILL_TYPE_LABEL_KEYS,
} from '../../skills/skills.types';
import {
  PROJECT_CONTEXT_LABEL_KEYS,
  PROJECT_ENVIRONMENT_LABEL_KEYS,
  PROJECT_FALLBACK_LABEL_KEYS,
  PROJECT_LINK_TYPE_LABEL_KEYS,
  PROJECT_STACK_GROUP_LABEL_KEYS,
  PROJECT_STATUS_LABEL_KEYS,
  PROJECT_SUMMARY_LABEL_KEYS,
  PROJECT_TECHNOLOGY_STACK_GROUPS,
  PROJECT_VISIBLE_TECHNOLOGY_COUNT,
  ProjectCaseViewModel,
  ProjectFilterValues,
  ProjectLinkViewModel,
  ProjectStackGroupViewModel,
  ProjectSummaryMetricViewModel,
  ProjectTechnologyTagViewModel,
} from '../projects.types';

const normalizeLabel = (value: string): string =>
  value
    .toLowerCase()
    .split(/[_-]+/)
    .filter(Boolean)
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(' ');

const dedupe = (values: readonly string[]): readonly string[] => [...new Set(values)];

const dedupeProjectTechnologies = (
  technologies: readonly ProjectTechnologyTagViewModel[],
): readonly ProjectTechnologyTagViewModel[] => [
  ...new Map(technologies.map((technology) => [technology.slug, technology])).values(),
];

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
        'pt-br': relation.link.labelPt ?? undefined,
        'en-us': relation.link.labelEn ?? undefined,
      },
      '',
    ) ||
    resolveCatalogLabel(locale, relation.link.type, PROJECT_LINK_TYPE_LABEL_KEYS) ||
    translateStaticKey(locale, PROJECT_FALLBACK_LABEL_KEYS.untitledLink),
  typeLabel: resolveCatalogLabel(locale, relation.link.type, PROJECT_LINK_TYPE_LABEL_KEYS),
});

const resolveTechnologyStackGroup = (
  technologySlug: string,
  technologyCategory: string,
): keyof typeof PROJECT_STACK_GROUP_LABEL_KEYS => {
  const slugGroup = PROJECT_TECHNOLOGY_STACK_GROUPS[technologySlug];

  if (slugGroup) {
    return slugGroup;
  }

  if (technologyCategory === 'DATABASE') {
    return 'databases';
  }

  return 'others';
};

const buildProjectStackGroups = (
  relations: ProjectCollectionItemResponse['technologies'],
  locale: AppLocale,
): readonly ProjectStackGroupViewModel[] => {
  const groupedTechnologies = new Map<
    keyof typeof PROJECT_STACK_GROUP_LABEL_KEYS,
    ProjectTechnologyTagViewModel[]
  >([
    ['frontend', []],
    ['backend', []],
    ['databases', []],
    ['others', []],
  ]);

  for (const { technology } of relations) {
    groupedTechnologies
      .get(resolveTechnologyStackGroup(technology.slug, technology.category))
      ?.push(mapProjectTechnologyTag(technology, locale));
  }

  return [...groupedTechnologies.entries()]
    .map(([group, technologies]) => ({
      labelKey: PROJECT_STACK_GROUP_LABEL_KEYS[group],
      technologies: dedupeProjectTechnologies(technologies),
    }))
    .filter((group) => group.technologies.length > 0);
};

const resolveProjectFilterContext = (
  context: string,
): ProjectCaseViewModel['filterContext'] =>
  context === 'PROFESSIONAL' || context === 'ACADEMIC' || context === 'PERSONAL'
    ? context
    : 'ALL';

const resolveNullableCatalogLabel = (
  locale: AppLocale,
  catalog: Record<string, AppTranslationKey>,
  value: string | null,
): string | undefined => {
  if (!value) {
    return undefined;
  }

  return catalog[value] ? translateStaticKey(locale, catalog[value]) : normalizeLabel(value);
};

const mapProjectTechnologyTag = (
  technology: ProjectTechnologyResponse,
  locale: AppLocale,
): ProjectTechnologyTagViewModel => {
  const imageSrc = resolveSkillVisualUrl(technology.slug);
  const stackKey = resolveSkillStackKey(technology);
  const typeKey = resolveSkillTypeKey(technology);

  return {
    slug: technology.slug,
    label: technology.name,
    image: imageSrc
      ? {
          src: imageSrc,
          alt: `${technology.name} icon`,
        }
      : null,
    value: {
      name: technology.name,
      category: translateStaticKey(locale, SKILL_TYPE_LABEL_KEYS[typeKey]),
      stack: translateStaticKey(locale, SKILL_STACK_LABEL_KEYS[stackKey]),
      level: resolveNullableCatalogLabel(locale, SKILL_LEVEL_LABEL_KEYS, technology.level),
      frequency: resolveNullableCatalogLabel(
        locale,
        SKILL_FREQUENCY_LABEL_KEYS,
        technology.frequency,
      ),
      image: imageSrc
        ? {
            src: imageSrc,
            alt: `${technology.name} icon`,
          }
        : null,
    },
  };
};

export const mapProjectToCaseCard = (
  project: ProjectCollectionItemResponse,
  locale: AppLocale,
): ProjectCaseViewModel => {
  const projectImage = [...project.imageAssets].sort((left, right) => left.sortOrder - right.sortOrder)[0];
  const technologies = dedupeProjectTechnologies(
    project.technologies.map(({ technology }) =>
      mapProjectTechnologyTag(technology, locale),
    ),
  );
  const companyNames = dedupe(
    project.experiences.map(({ experience }) => experience.companyName),
  );
  const experienceTitles = dedupe(
    project.experiences.map(({ experience }) =>
      resolveLocalizedText(
        locale,
        {
          'pt-br': experience.titlePt,
          'en-us': experience.titleEn,
        },
        experience.titleEn,
      ),
    ),
  );
  const localizedTitle = resolveLocalizedText(
    locale,
    {
      'pt-br': project.titlePt,
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
        'pt-br': project.shortDescriptionPt,
        'en-us': project.shortDescriptionEn,
      },
      project.shortDescriptionEn,
    ),
    description: resolveLocalizedText(
      locale,
      {
        'pt-br': project.fullDescriptionPt,
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
    filterContext: resolveProjectFilterContext(project.context),
    stackGroups: buildProjectStackGroups(project.technologies, locale),
    dateRangeLabel: formatProjectDateRange(project.startDate, project.endDate, locale),
    isFeatured: project.featured,
    isHighlight: project.highlight,
    companyNames,
    technologies: technologies.slice(0, PROJECT_VISIBLE_TECHNOLOGY_COUNT),
    extraTechnologyCount: Math.max(
      technologies.length - PROJECT_VISIBLE_TECHNOLOGY_COUNT,
      0,
    ),
    links: project.links.map((relation) => mapProjectLink(relation, locale)),
    imageUrl: buildAssetUrl(projectImage?.imageAsset.filePath),
    imageAlt:
      resolveLocalizedText(
        locale,
        {
          'pt-br': projectImage?.imageAsset.altPt ?? undefined,
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
            'pt-br': tag.labelPt,
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
              'pt-br': imageAsset.altPt ?? undefined,
              'en-us': imageAsset.altEn ?? undefined,
            },
            localizedTitle,
          ) || localizedTitle,
        title: localizedTitle,
        description:
          resolveLocalizedText(
            locale,
            {
              'pt-br': imageAsset.captionPt ?? undefined,
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
              'pt-br': richestStackProject.titlePt,
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
