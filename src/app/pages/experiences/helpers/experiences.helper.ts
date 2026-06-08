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
  ExperienceProjectViewModel,
  ExperienceTechnologyGroupViewModel,
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
  technology: ExperienceTechnologyResponse,
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
  technologies: ExperienceCollectionItemResponse['technologies'],
): readonly ExperienceTechnologyGroupViewModel[] => {
  const grouped = new Map<TechnologyGroupKey, string[]>();

  for (const relation of technologies) {
    const groupKey = resolveTechnologyGroupKey(relation.technology);
    const technologyNames = grouped.get(groupKey) ?? [];

    if (!technologyNames.includes(relation.technology.name)) {
      technologyNames.push(relation.technology.name);
      grouped.set(groupKey, technologyNames);
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
  const technologies = dedupe(
    experience.technologies.map(({ technology }) => technology.name),
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
    customers: dedupe(experience.customers.map(({ customer }) => customer.name)),
    projects: experience.projects.map(({ project }) => mapProject(project, locale)),
    technologies: leadTechnologies,
    extraTechnologyCount: Math.max(0, technologies.length - leadTechnologies.length),
    technologyGroups: buildTechnologyGroups(experience.technologies),
  };
};
