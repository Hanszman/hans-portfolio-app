import { ProjectCollectionItemResponse } from '../../../core/api/projects/projects.types';
import { AppLocale } from '../../../core/translation/translation.types';
import { mapProjectToCaseCard } from '../../projects/helpers/projects.helper';
import { HomeSecondaryCardViewModel } from '../home.types';

export const formatCountInFiveStep = (value: number): string =>
  `${Math.floor(Math.max(0, value) / 5) * 5}+`;

export const mapHighlightedProjects = (
  projects: readonly ProjectCollectionItemResponse[],
  locale: AppLocale,
): readonly HomeSecondaryCardViewModel[] =>
  projects
    .filter((project) => project.highlight)
    .map((project) => {
      const mappedProject = mapProjectToCaseCard(project, locale);

      return {
        id: mappedProject.id,
        eyebrow: mappedProject.contextLabel,
        title: mappedProject.title,
        description: mappedProject.description,
        project: mappedProject,
      };
    });
