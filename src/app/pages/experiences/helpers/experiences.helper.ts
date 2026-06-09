import {
  ExperienceCollectionItemResponse,
  ExperienceTechnologyResponse,
} from '../../../core/api/experiences/experiences.types';
import {
  resolveLocalizedText,
  translateStaticKey,
} from '../../../core/translation/translation.service';
import { AppLocale } from '../../../core/translation/translation.types';
import {
  EXPERIENCE_TECHNOLOGY_GROUP_LABEL_KEYS,
  EXPERIENCE_PRESENT_LABEL_KEY,
  ExperienceCustomerViewModel,
  ExperienceImageViewModel,
  ExperienceProjectViewModel,
  ExperienceTechnologyGroupViewModel,
  ExperienceTechnologyViewModel,
  ExperienceTimelineItemViewModel,
} from '../experiences.types';

const dedupe = (values: string[]): string[] => [...new Set(values)];

const formatMonthYear = (dateIso: string, locale: AppLocale): string =>
  new Intl.DateTimeFormat(locale, {
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateIso));

const FRONTEND_TECHNOLOGY_SLUGS = new Set([
  'angular',
  'typescript',
  'javascript',
  'html',
  'css',
  'sass',
  'bootstrap',
  'jquery',
  'ajax',
  'json',
]);

const BACKEND_TECHNOLOGY_SLUGS = new Set([
  'node-js',
  'nodejs',
  'node',
  'knex-js',
  'knex',
  'swagger',
  'php',
  'laravel',
  'http',
]);

const DATABASE_TECHNOLOGY_SLUGS = new Set([
  'sql-server',
  'mysql',
  'postgresql',
  'dbeaver',
]);

const TECHNOLOGY_GROUP_ORDER = ['frontend', 'backend', 'databases', 'others'] as const;
type TechnologyGroupKey = (typeof TECHNOLOGY_GROUP_ORDER)[number];

const CUSTOMER_IMAGE_FILE_BY_SLUG: Record<string, string> = {
  'costa-tavares': 'costaetavares.jpg',
};

const normalizeAssetName = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, 'e')
    .replace(/[^a-z0-9]+/g, '');

const buildExperienceAssetPath = (fileName: string): string =>
  `/assets/img/experiences/${fileName}`;

const buildSkillAssetPath = (slug: string): string =>
  `/assets/img/skills/${slug.replace(/-js$/, '').replace(/-/g, '')}.png`;

const resolveCompanyImage = (
  experience: ExperienceCollectionItemResponse,
  locale: AppLocale,
): ExperienceImageViewModel => {
  const imageAsset = experience.imageAssets[0]?.imageAsset;

  return {
    src:
      imageAsset?.filePath ??
      buildExperienceAssetPath(`${normalizeAssetName(experience.companyName)}.jpg`),
    alt: resolveLocalizedText(
      locale,
      {
        'pt-br': imageAsset?.altPt ?? undefined,
        'en-us': imageAsset?.altEn ?? undefined,
      },
      `${experience.companyName} logo`,
    ),
  };
};

const mapCustomer = (
  customer: ExperienceCollectionItemResponse['customers'][number]['customer'],
): ExperienceCustomerViewModel => ({
  slug: customer.slug,
  name: customer.name,
  image: {
    src: buildExperienceAssetPath(
      CUSTOMER_IMAGE_FILE_BY_SLUG[customer.slug] ?? `${customer.slug}.jpg`,
    ),
    alt: `${customer.name} logo`,
  },
});

const mapTechnology = (
  technology: ExperienceTechnologyResponse,
  projectCount: number,
): ExperienceTechnologyViewModel => ({
  slug: technology.slug,
  name: technology.name,
  category: technology.category,
  level: technology.level,
  frequency: technology.frequency,
  image: {
    src: buildSkillAssetPath(technology.slug),
    alt: `${technology.name} icon`,
  },
  projectCount,
  experienceCount: 1,
});

const mapProject = (
  project: ExperienceCollectionItemResponse['projects'][number]['project'],
  locale: AppLocale,
): ExperienceProjectViewModel => ({
  slug: project.slug,
  title: resolveLocalizedText(
    locale,
    {
      'pt-br': project.titlePt,
      'en-us': project.titleEn,
    },
    project.titleEn,
  ),
  summary: resolveLocalizedText(
    locale,
    {
      'pt-br': project.shortDescriptionPt,
      'en-us': project.shortDescriptionEn,
    },
    project.shortDescriptionEn,
  ),
});

const resolveTechnologyGroupKey = (
  technology: Pick<ExperienceTechnologyResponse, 'slug' | 'category'>,
): TechnologyGroupKey => {
  if (FRONTEND_TECHNOLOGY_SLUGS.has(technology.slug)) {
    return 'frontend';
  }

  if (BACKEND_TECHNOLOGY_SLUGS.has(technology.slug)) {
    return 'backend';
  }

  if (DATABASE_TECHNOLOGY_SLUGS.has(technology.slug)) {
    return 'databases';
  }

  return technology.category === 'DATABASE' ? 'databases' : 'others';
};

const buildTechnologyGroups = (
  technologies: readonly ExperienceTechnologyViewModel[],
): readonly ExperienceTechnologyGroupViewModel[] => {
  const grouped = new Map<TechnologyGroupKey, ExperienceTechnologyViewModel[]>();

  for (const technology of technologies) {
    const groupKey = resolveTechnologyGroupKey(technology);
    const groupTechnologies = grouped.get(groupKey) ?? [];

    if (!groupTechnologies.some((item) => item.slug === technology.slug)) {
      groupTechnologies.push(technology);
      grouped.set(groupKey, groupTechnologies);
    }
  }

  return TECHNOLOGY_GROUP_ORDER.flatMap((groupKey) => {
    const groupTechnologies = grouped.get(groupKey);

    if (!groupTechnologies?.length) {
      return [];
    }

    return [
      {
        labelKey: EXPERIENCE_TECHNOLOGY_GROUP_LABEL_KEYS[groupKey],
        technologies: groupTechnologies,
      },
    ];
  });
};

export const formatExperienceDateRange = (
  startDate: string,
  endDate: string | null,
  locale: AppLocale,
): string => {
  const startLabel = formatMonthYear(startDate, locale);
  const endLabel = endDate
    ? formatMonthYear(endDate, locale)
    : translateStaticKey(locale, EXPERIENCE_PRESENT_LABEL_KEY);

  return `${startLabel} - ${endLabel}`;
};

export const mapExperienceToTimelineItem = (
  experience: ExperienceCollectionItemResponse,
  locale: AppLocale,
): ExperienceTimelineItemViewModel => {
  const projects = experience.projects.map(({ project }) => mapProject(project, locale));
  const technologies = experience.technologies.map(({ technology }) =>
    mapTechnology(technology, projects.length),
  );
  const leadTechnologies = technologies.slice(0, 8);
  const jobs = dedupe(
    experience.jobs.map(({ job }) =>
      resolveLocalizedText(
        locale,
        {
          'pt-br': job.namePt,
          'en-us': job.nameEn,
        },
        job.nameEn,
      ),
    ),
  );
  const fallbackRoleTitle = resolveLocalizedText(
    locale,
    {
      'pt-br': experience.titlePt,
      'en-us': experience.titleEn,
    },
    experience.titleEn,
  );

  return {
    id: experience.id,
    slug: experience.slug,
    companyName: experience.companyName,
    roleTitle: jobs[0] ?? fallbackRoleTitle,
    summary: resolveLocalizedText(
      locale,
      {
        'pt-br': experience.summaryPt,
        'en-us': experience.summaryEn,
      },
      experience.summaryEn,
    ),
    description: resolveLocalizedText(
      locale,
      {
        'pt-br': experience.descriptionPt,
        'en-us': experience.descriptionEn,
      },
      experience.descriptionEn,
    ),
    dateRangeLabel: formatExperienceDateRange(
      experience.startDate,
      experience.endDate,
      locale,
    ),
    isCurrent: experience.isCurrent,
    isHighlight: experience.highlight,
    jobs,
    companyImage: resolveCompanyImage(experience, locale),
    customers: experience.customers.map(({ customer }) => mapCustomer(customer)),
    projects,
    technologies: leadTechnologies,
    extraTechnologyCount: Math.max(0, technologies.length - leadTechnologies.length),
    technologyGroups: buildTechnologyGroups(technologies),
  };
};
