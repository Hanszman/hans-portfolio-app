import { TagModalDetail } from '../../tag/tag-modal/tag-modal.types';
import { buildAssetUrl } from '../../../core/api/api.config';
import { ProjectCollectionItemResponse } from '../../../core/api/projects/projects.types';
import { TechnologyCollectionItemResponse } from '../../../core/api/technologies/technologies.types';
import {
  resolveLocalizedText,
  translateStaticKey,
} from '../../../core/translation/translation.service';
import {
  AppLocale,
  AppTranslationKey,
} from '../../../core/translation/translation.types';
import { TechnologyModalItem } from '../technology-modal.types';

const TECHNOLOGY_FRONT_END_SLUGS = new Set([
  'angular',
  'typescript',
  'javascript',
  'react',
  'react-native',
  'html',
  'css',
  'sass',
  'bootstrap',
  'jquery',
  'chart-js',
  'ajax',
  'jsx',
]);

const TECHNOLOGY_BACK_END_SLUGS = new Set([
  'node',
  'node-js',
  'express',
  'express-js',
  'php',
  'laravel',
  'java',
  'csharp',
  'c-sharp',
  'knex',
  'knex-js',
]);

const TECHNOLOGY_MOBILE_SLUGS = new Set(['react-native', 'expo']);
const TECHNOLOGY_GAME_SLUGS = new Set(['unity']);
const TECHNOLOGY_DATABASE_CATEGORIES = new Set(['DATABASE', 'ORM']);

const TECHNOLOGY_TYPE_LABEL_KEYS_BY_CATEGORY: Record<string, AppTranslationKey> = {
  FRAMEWORK: 'taxonomy.skills.type.frameworks',
  LANGUAGE: 'taxonomy.skills.type.programmingLanguages',
  LIBRARY: 'taxonomy.skills.type.libraries',
  TOOL: 'taxonomy.skills.type.others',
  DATABASE: 'taxonomy.skills.type.relationalDataBases',
  CLOUD: 'taxonomy.skills.type.cloudHostingPlatforms',
  TESTING: 'taxonomy.skills.type.libraries',
  DEVOPS: 'taxonomy.skills.type.deploymentTools',
  STYLING: 'taxonomy.skills.type.webLanguages',
  ARCHITECTURE: 'taxonomy.skills.type.techniques',
  OTHER: 'taxonomy.skills.type.others',
  ORM: 'taxonomy.skills.type.libraries',
  PROGRAMMING_LANGUAGES: 'taxonomy.skills.type.programmingLanguages',
  WEB_LANGUAGES: 'taxonomy.skills.type.webLanguages',
  LIBRARIES: 'taxonomy.skills.type.libraries',
  FRAMEWORKS: 'taxonomy.skills.type.frameworks',
  RELATIONAL_DATA_BASES: 'taxonomy.skills.type.relationalDataBases',
  NON_RELATIONAL_DATA_BASES: 'taxonomy.skills.type.nonRelationalDataBases',
  DATABASES_MANAGEMENT_SYSTEMS: 'taxonomy.skills.type.databasesManagementSystems',
  CODE_EDITORS: 'taxonomy.skills.type.codeEditors',
  TECHNIQUES: 'taxonomy.skills.type.techniques',
  METHODOLOGIES: 'taxonomy.skills.type.methodologies',
  OBJECT_NOTATIONS: 'taxonomy.skills.type.objectNotations',
  PACKAGE_MANAGERS: 'taxonomy.skills.type.packageManagers',
  PACKAGES: 'taxonomy.skills.type.packages',
  VERSIONING_PLATFORMS: 'taxonomy.skills.type.versioningPlatforms',
  CLOUD_HOSTING_PLATFORMS: 'taxonomy.skills.type.cloudHostingPlatforms',
  DEPLOYMENT_TOOLS: 'taxonomy.skills.type.deploymentTools',
  DEVELOPMENT_PLATFORMS: 'taxonomy.skills.type.developmentPlatforms',
  PROTOCOLS: 'taxonomy.skills.type.protocols',
  OTHERS: 'taxonomy.skills.type.others',
};

const TECHNOLOGY_LEVEL_LABEL_KEYS: Record<string, AppTranslationKey> = {
  ADVANCED: 'taxonomy.skills.level.advanced',
  INTERMEDIATE: 'taxonomy.skills.level.intermediate',
  BEGINNER: 'taxonomy.skills.level.beginner',
  STUDYING: 'taxonomy.skills.level.studying',
};

const TECHNOLOGY_FREQUENCY_LABEL_KEYS: Record<string, AppTranslationKey> = {
  FREQUENT: 'taxonomy.skills.frequency.frequent',
  OCCASIONAL: 'taxonomy.skills.frequency.occasional',
  RARE: 'taxonomy.skills.frequency.rare',
  PREVIOUSLY_USED: 'taxonomy.skills.frequency.previouslyUsed',
  STUDYING: 'taxonomy.skills.frequency.studying',
};

const TECHNOLOGY_STACK_LABEL_KEYS = {
  FRONT_END: 'taxonomy.skills.stack.frontEnd',
  BACK_END: 'taxonomy.skills.stack.backEnd',
  DATABASES: 'taxonomy.skills.stack.databases',
  GAMES: 'taxonomy.skills.stack.games',
  MOBILE: 'taxonomy.skills.stack.mobile',
  OTHERS: 'taxonomy.skills.stack.others',
} as const satisfies Record<string, AppTranslationKey>;

const normalizeFallbackLabel = (value: string): string =>
  value
    .toLowerCase()
    .split(/[_-]+/)
    .filter(Boolean)
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(' ');

const resolveCatalogLabel = (
  locale: AppLocale,
  catalog: Record<string, AppTranslationKey>,
  value: string | null | undefined,
): string | undefined => {
  if (!value) {
    return undefined;
  }

  const translationKey = catalog[value];

  return translationKey
    ? translateStaticKey(locale, translationKey)
    : normalizeFallbackLabel(value);
};

const resolveStackLabel = (
  technology: Pick<TechnologyCollectionItemResponse, 'slug' | 'category'>,
  locale: AppLocale,
): string => {
  const slug = technology.slug.toLowerCase();
  let stackKey: keyof typeof TECHNOLOGY_STACK_LABEL_KEYS = 'OTHERS';

  if (TECHNOLOGY_GAME_SLUGS.has(slug)) {
    stackKey = 'GAMES';
  } else if (TECHNOLOGY_MOBILE_SLUGS.has(slug)) {
    stackKey = 'MOBILE';
  } else if (TECHNOLOGY_DATABASE_CATEGORIES.has(technology.category)) {
    stackKey = 'DATABASES';
  } else if (
    TECHNOLOGY_FRONT_END_SLUGS.has(slug) ||
    technology.category === 'FRAMEWORK'
  ) {
    stackKey = 'FRONT_END';
  } else if (TECHNOLOGY_BACK_END_SLUGS.has(slug)) {
    stackKey = 'BACK_END';
  }

  return translateStaticKey(locale, TECHNOLOGY_STACK_LABEL_KEYS[stackKey]);
};

const resolveTechnologyImage = (
  technology: TechnologyCollectionItemResponse,
  locale: AppLocale,
  fallback: TechnologyModalItem,
): TechnologyModalItem['image'] => {
  const imageAsset =
    technology.imageAssets?.find(({ imageAsset }) => imageAsset.kind === 'ICON') ??
    technology.imageAssets?.[0];

  if (!imageAsset) {
    return fallback.image;
  }

  return {
    src: buildAssetUrl(imageAsset.imageAsset.filePath),
    alt: resolveLocalizedText(
      locale,
      {
        'pt-br': imageAsset.imageAsset.altPt ?? undefined,
        'en-us': imageAsset.imageAsset.altEn ?? undefined,
      },
      `${technology.name} icon`,
    ),
  };
};

const findTechnology = (
  reference: TechnologyModalItem,
  technologies: readonly TechnologyCollectionItemResponse[],
): TechnologyCollectionItemResponse | undefined =>
  technologies.find((technology) => technology.slug === reference.slug) ??
  technologies.find(
    (technology) => technology.name.toLowerCase() === reference.name.toLowerCase(),
  );

const countProjectsUsingTechnology = (
  slug: string,
  projects: readonly ProjectCollectionItemResponse[],
  fallback?: number,
): number | undefined =>
  projects.length === 0
    ? fallback
    : projects.filter((project) =>
        project.technologies.some(
          ({ technology }) =>
            technology.slug.toLowerCase() === slug.toLowerCase(),
        ),
      ).length;

export const buildTechnologyModalDetail = (
  labelKey: TagModalDetail['labelKey'],
  value: string | number | undefined,
): TagModalDetail | null =>
  value === undefined || value === '' ? null : { labelKey, value };

export const buildTechnologyModalDetails = (
  technology: TechnologyModalItem,
): readonly TagModalDetail[] => {
  const details = [
    buildTechnologyModalDetail(
      'pages.skills.detail.totalExperience',
      technology.experience,
    ),
    buildTechnologyModalDetail('pages.experiences.technology.type', technology.category),
    buildTechnologyModalDetail('pages.experiences.technology.stack', technology.stack),
    buildTechnologyModalDetail('pages.experiences.technology.level', technology.level),
    buildTechnologyModalDetail('pages.experiences.technology.frequency', technology.frequency),
    buildTechnologyModalDetail('pages.experiences.technology.projects', technology.projectCount),
  ] satisfies readonly (TagModalDetail | null)[];

  return details.filter((detail): detail is TagModalDetail => detail !== null);
};

export const resolveTechnologyModalItem = (
  reference: TechnologyModalItem | null,
  technologies: readonly TechnologyCollectionItemResponse[],
  projects: readonly ProjectCollectionItemResponse[],
  locale: AppLocale,
): TechnologyModalItem | null => {
  if (!reference) {
    return null;
  }

  const technology = findTechnology(reference, technologies);

  if (!technology) {
    return {
      ...reference,
      projectCount: countProjectsUsingTechnology(
        reference.slug,
        projects,
        reference.projectCount,
      ),
    };
  }

  const projectCount = countProjectsUsingTechnology(
    technology.slug,
    projects,
    reference.projectCount,
  );

  return {
    ...reference,
    slug: technology.slug,
    name: technology.name,
    category:
      resolveCatalogLabel(
        locale,
        TECHNOLOGY_TYPE_LABEL_KEYS_BY_CATEGORY,
        technology.category,
      ) ?? reference.category,
    stack: resolveStackLabel(technology, locale) ?? reference.stack,
    level:
      resolveCatalogLabel(locale, TECHNOLOGY_LEVEL_LABEL_KEYS, technology.level) ??
      reference.level,
    frequency:
      resolveCatalogLabel(
        locale,
        TECHNOLOGY_FREQUENCY_LABEL_KEYS,
        technology.frequency,
      ) ?? reference.frequency,
    experience: technology.experienceMetrics?.total.label ?? reference.experience,
    projectCount,
    image: resolveTechnologyImage(technology, locale, reference),
  };
};
