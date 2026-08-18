import {
  ExperienceCollectionItemResponse,
  ExperienceTechnologyResponse,
} from '../../../core/api/experiences/experiences.types';
import {
  resolveLocalizedText,
  translateStaticKey,
} from '../../../core/translation/translation.service';
import { AppLocale } from '../../../core/translation/translation.types';
import { formatAppDateRange } from '../../../core/date/app-date.helper';
import { TechnologyModalItem } from '../../../shared/technology-modal/technology-modal.types';
import { sortTagItems } from '../../../shared/tag/helpers/tag-order.helper';
import {
  EXPERIENCE_BACKEND_TECHNOLOGY_SLUGS,
  EXPERIENCE_CUSTOMER_IMAGE_FILE_BY_SLUG,
  EXPERIENCE_DATABASE_TECHNOLOGY_SLUGS,
  EXPERIENCE_FRONTEND_TECHNOLOGY_SLUGS,
  EXPERIENCE_TECHNOLOGY_GROUP_ORDER,
  EXPERIENCE_TECHNOLOGY_GROUP_LABEL_KEYS,
  EXPERIENCE_PRESENT_LABEL_KEY,
  INITIAL_VISIBLE_TECHNOLOGY_COUNT,
  ExperienceCustomerViewModel,
  ExperienceImageViewModel,
  ExperienceJobViewModel,
  ExperienceProjectViewModel,
  ExperienceTechnologyGroupKey,
  ExperienceTechnologyGroupViewModel,
  ExperienceTimelineItemViewModel,
} from '../experiences.types';

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
        'es-es': imageAsset?.altEs ?? undefined,
      },
      `${experience.companyName} logo`,
    ),
  };
};

const mapCustomer = (
  customer: ExperienceCollectionItemResponse['customers'][number]['customer'],
  companyName: string,
  projectCount: number,
  locale: AppLocale,
): ExperienceCustomerViewModel => ({
  slug: customer.slug,
  name: customer.name,
  companyName,
  projectCount,
  summary: resolveLocalizedText(
    locale,
    { 'pt-br': customer.summaryPt, 'en-us': customer.summaryEn, 'es-es': customer.summaryEs },
    customer.summaryEn ?? '',
  ),
  image: {
    src: buildExperienceAssetPath(
      EXPERIENCE_CUSTOMER_IMAGE_FILE_BY_SLUG[customer.slug] ?? `${customer.slug}.jpg`,
    ),
    alt: `${customer.name} logo`,
  },
});

const mapTechnology = (
  technology: ExperienceTechnologyResponse,
  projectCount: number,
): TechnologyModalItem => ({
  slug: technology.slug,
  name: technology.name,
  type: technology.type,
  level: technology.level,
  frequency: technology.frequency,
  image: {
    src: buildSkillAssetPath(technology.slug),
    alt: `${technology.name} icon`,
  },
  projectCount,
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
      'es-es': project.titleEs,
    },
    project.titleEn,
  ),
  summary: resolveLocalizedText(
    locale,
    {
      'pt-br': project.summaryPt,
      'en-us': project.summaryEn,
      'es-es': project.summaryEs,
    },
    project.summaryEn,
  ),
});

const mapJob = (
  job: ExperienceCollectionItemResponse['jobs'][number]['job'],
  locale: AppLocale,
): ExperienceJobViewModel => ({
  id: job.id,
  title: resolveLocalizedText(
    locale,
    { 'pt-br': job.namePt, 'en-us': job.nameEn, 'es-es': job.nameEs },
    job.nameEn,
  ),
  summary: resolveLocalizedText(
    locale,
    { 'pt-br': job.summaryPt, 'en-us': job.summaryEn, 'es-es': job.summaryEs },
    job.summaryEn,
  ),
  startDate: job.startDate,
  endDate: job.endDate,
  dateRangeLabel: formatExperienceDateRange(job.startDate, job.endDate, locale),
});

const sortJobsByMostRecentEndDate = (
  left: ExperienceJobViewModel,
  right: ExperienceJobViewModel,
): number => {
  const leftEnd = left.endDate ? Date.parse(left.endDate) : Number.POSITIVE_INFINITY;
  const rightEnd = right.endDate ? Date.parse(right.endDate) : Number.POSITIVE_INFINITY;

  return rightEnd - leftEnd || Date.parse(right.startDate) - Date.parse(left.startDate);
};

const resolveTechnologyGroupKey = (
  technology: Pick<TechnologyModalItem, 'slug' | 'type'>,
): ExperienceTechnologyGroupKey => {
  if (EXPERIENCE_FRONTEND_TECHNOLOGY_SLUGS.has(technology.slug)) {
    return 'frontend';
  }

  if (EXPERIENCE_BACKEND_TECHNOLOGY_SLUGS.has(technology.slug)) {
    return 'backend';
  }

  if (EXPERIENCE_DATABASE_TECHNOLOGY_SLUGS.has(technology.slug)) {
    return 'databases';
  }

  return technology.type === 'RELATIONAL_DATABASES' ||
    technology.type === 'NON_RELATIONAL_DATABASES'
    ? 'databases'
    : 'others';
};

const buildTechnologyGroups = (
  technologies: readonly TechnologyModalItem[],
): readonly ExperienceTechnologyGroupViewModel[] => {
  const grouped = new Map<ExperienceTechnologyGroupKey, TechnologyModalItem[]>();

  for (const technology of technologies) {
    const groupKey = resolveTechnologyGroupKey(technology);
    const groupTechnologies = grouped.get(groupKey) ?? [];

    if (!groupTechnologies.some((item) => item.slug === technology.slug)) {
      groupTechnologies.push(technology);
      grouped.set(groupKey, groupTechnologies);
    }
  }

  return EXPERIENCE_TECHNOLOGY_GROUP_ORDER.flatMap((groupKey) => {
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
  return formatAppDateRange(
    startDate,
    endDate,
    locale,
    translateStaticKey(locale, EXPERIENCE_PRESENT_LABEL_KEY),
  );
};

export const mapExperienceToTimelineItem = (
  experience: ExperienceCollectionItemResponse,
  locale: AppLocale,
): ExperienceTimelineItemViewModel => {
  const projects = experience.projects.map(({ project }) => mapProject(project, locale));
  const technologies = sortTagItems(
    experience.technologies.map(({ technology }) => technology),
    ({ name }) => name,
    locale,
  ).map((technology) => mapTechnology(technology, projects.length));
  const jobs = experience.jobs
    .map(({ job }) => mapJob(job, locale))
    .sort(sortJobsByMostRecentEndDate);
  const fallbackRoleTitle = resolveLocalizedText(
    locale,
    {
      'pt-br': experience.titlePt,
      'en-us': experience.titleEn,
      'es-es': experience.titleEs,
    },
    experience.titleEn,
  );

  return {
    id: experience.id,
    slug: experience.slug,
    companyName: experience.companyName,
    roleTitle: jobs[0]?.title ?? fallbackRoleTitle,
    summary: resolveLocalizedText(
      locale,
      {
        'pt-br': experience.summaryPt,
        'en-us': experience.summaryEn,
        'es-es': experience.summaryEs,
      },
      experience.summaryEn,
    ),
    description: resolveLocalizedText(
      locale,
      {
        'pt-br': experience.descriptionPt,
        'en-us': experience.descriptionEn,
        'es-es': experience.descriptionEs,
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
    customers: sortTagItems(
      experience.customers.map(({ customer }) => customer),
      ({ name }) => name,
      locale,
    ).map((customer) =>
      mapCustomer(customer, experience.companyName, projects.length, locale),
    ),
    projects,
    technologies,
    extraTechnologyCount: Math.max(
      0,
      technologies.length - INITIAL_VISIBLE_TECHNOLOGY_COUNT,
    ),
    technologyGroups: buildTechnologyGroups(technologies),
  };
};
