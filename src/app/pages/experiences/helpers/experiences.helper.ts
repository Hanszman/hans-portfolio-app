import {
  ExperienceCollectionItemResponse,
  ExperienceTechnologyResponse,
} from '../../../core/api/experiences/experiences.types';
import {
  resolveLocalizedText,
  translateStaticKey,
} from '../../../core/translation/translation.service';
import { AppLocale } from '../../../core/translation/translation.types';
import { TechnologyModalItem } from '../../../shared/technology-modal/technology-modal.types';
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
  ExperienceProjectViewModel,
  ExperienceTechnologyGroupKey,
  ExperienceTechnologyGroupViewModel,
  ExperienceTimelineItemViewModel,
} from '../experiences.types';

const dedupe = (values: string[]): string[] => [...new Set(values)];

const formatMonthYear = (dateIso: string, locale: AppLocale): string =>
  new Intl.DateTimeFormat(locale, {
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateIso));

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
  companyName: string,
  projectCount: number,
): ExperienceCustomerViewModel => ({
  slug: customer.slug,
  name: customer.name,
  companyName,
  projectCount,
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
  category: technology.category,
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
  technology: Pick<TechnologyModalItem, 'slug' | 'category'>,
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

  return technology.category === 'DATABASE' ? 'databases' : 'others';
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
    customers: experience.customers.map(({ customer }) =>
      mapCustomer(customer, experience.companyName, projects.length),
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
