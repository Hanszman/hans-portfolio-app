import { buildAssetUrl } from '../../../core/api/api.config';
import {
  ExperienceCollectionItemResponse,
  ExperienceProjectResponse,
} from '../../../core/api/experiences/experiences.types';
import {
  resolveLocalizedText,
  translateStaticKey,
} from '../../../core/translation/translation.service';
import { AppLocale } from '../../../core/translation/translation.types';
import {
  EXPERIENCE_MONTH_FORMATTERS,
  EXPERIENCE_PRESENT_LABEL_KEY,
  EXPERIENCE_PROJECT_ENVIRONMENT_LABEL_KEYS,
  EXPERIENCE_PROJECT_STATUS_LABEL_KEYS,
  ExperiencePortfolioSummaryViewModel,
  ExperienceProjectViewModel,
  ExperienceTimelineItemViewModel,
} from '../experiences.types';

const dedupe = (values: string[]): string[] => [...new Set(values)];

const normalizeLabel = (value: string): string =>
  value
    .toLowerCase()
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const formatMonthYear = (dateIso: string, locale: AppLocale): string =>
  EXPERIENCE_MONTH_FORMATTERS[locale].format(new Date(dateIso));

const resolveProjectStatusLabel = (
  status: string,
  locale: AppLocale,
): string =>
  EXPERIENCE_PROJECT_STATUS_LABEL_KEYS[status]
    ? translateStaticKey(locale, EXPERIENCE_PROJECT_STATUS_LABEL_KEYS[status])
    : normalizeLabel(status);

const resolveProjectEnvironmentLabel = (
  environment: string,
  locale: AppLocale,
): string =>
  EXPERIENCE_PROJECT_ENVIRONMENT_LABEL_KEYS[environment]
    ? translateStaticKey(locale, EXPERIENCE_PROJECT_ENVIRONMENT_LABEL_KEYS[environment])
    : normalizeLabel(environment);

const resolveApiText = (
  locale: AppLocale,
  portuguese: string,
  english: string,
): string =>
  resolveLocalizedText(
    locale,
    {
      'en-us': english,
      'pt-BR': portuguese,
      'es-es': english,
    },
    english,
  );

const mapProject = (
  project: ExperienceProjectResponse,
  locale: AppLocale,
): ExperienceProjectViewModel => ({
  slug: project.slug,
  title: resolveApiText(locale, project.titlePt, project.titleEn),
  summary: resolveApiText(
    locale,
    project.shortDescriptionPt,
    project.shortDescriptionEn,
  ),
  statusLabel: resolveProjectStatusLabel(project.status, locale),
  environmentLabel: resolveProjectEnvironmentLabel(project.environment, locale),
});

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
  const primaryImage =
    experience.imageAssets.find(({ imageAsset }) => imageAsset.kind === 'ICON') ??
    experience.imageAssets[0];

  return {
    id: experience.id,
    companyName: experience.companyName,
    title: resolveApiText(locale, experience.titlePt, experience.titleEn),
    summary: resolveApiText(locale, experience.summaryPt, experience.summaryEn),
    description: resolveApiText(
      locale,
      experience.descriptionPt,
      experience.descriptionEn,
    ),
    dateRangeLabel: formatExperienceDateRange(
      experience.startDate,
      experience.endDate,
      locale,
    ),
    isCurrent: experience.isCurrent,
    isHighlight: experience.highlight,
    imageUrl: buildAssetUrl(primaryImage?.imageAsset.filePath),
    jobs: dedupe(
      experience.jobs.map(({ job }) =>
        resolveApiText(locale, job.namePt, job.nameEn),
      ),
    ),
    customers: dedupe(experience.customers.map(({ customer }) => customer.name)),
    projects: experience.projects.map(({ project }) => mapProject(project, locale)),
    technologies: leadTechnologies,
    extraTechnologyCount: Math.max(0, technologies.length - leadTechnologies.length),
  };
};

export const buildExperiencePortfolioSummary = (
  experiences: ExperienceCollectionItemResponse[],
  locale: AppLocale,
): ExperiencePortfolioSummaryViewModel => {
  const currentExperience =
    experiences.find((experience) => experience.isCurrent) ??
    experiences.find((experience) => experience.highlight) ??
    experiences[0];

  const uniqueProjectSlugs = new Set<string>();
  const uniqueTechnologySlugs = new Set<string>();
  const uniqueCustomerSlugs = new Set<string>();

  for (const experience of experiences) {
    for (const relation of experience.projects) {
      uniqueProjectSlugs.add(relation.project.slug);
    }

    for (const relation of experience.technologies) {
      uniqueTechnologySlugs.add(relation.technology.slug);
    }

    for (const relation of experience.customers) {
      uniqueCustomerSlugs.add(relation.customer.slug);
    }
  }

  return {
    currentRoleTitle: currentExperience
      ? resolveApiText(locale, currentExperience.titlePt, currentExperience.titleEn)
      : '',
    currentCompanyName: currentExperience?.companyName ?? '',
    experienceCount: String(experiences.length),
    projectCount: String(uniqueProjectSlugs.size),
    technologyCount: String(uniqueTechnologySlugs.size),
    customerCount: String(uniqueCustomerSlugs.size),
    highlightCount: String(
      experiences.filter((experience) => experience.highlight).length,
    ),
  };
};
