import { createTechnologiesCollectionResponse } from '../../../core/api/mocks/technologies.mocks';
import {
  buildSkillsGroups,
  buildSkillsSummaryMetrics,
  extractSkillFilterValues,
  mapTechnologyToSkillCard,
} from './skills.helper';

describe('skills helper', () => {
  it('should map a technology into a localized skills card', () => {
    const card = mapTechnologyToSkillCard(
      createTechnologiesCollectionResponse().data[0],
      'en-us',
    );

    expect(card.name).toBe('Angular');
    expect(card.categoryLabel).toBe('Framework');
    expect(card.totalExperienceLabel).toBe('6 years 2 months');
    expect(card.contexts).toEqual([
      {
        key: 'PROFESSIONAL',
        label: 'Professional',
        value: '5 years 4 months',
        totalMonths: 64,
      },
      {
        key: 'STUDY',
        label: 'Study',
        value: '10 months',
        totalMonths: 10,
      },
    ]);
    expect(card.visualUrl).toContain('/assets/img/skills/angular.png');
  });

  it('should summarize highlight density and strongest experience duration', () => {
    const metrics = buildSkillsSummaryMetrics(
      createTechnologiesCollectionResponse().data,
      'pt-BR',
    );

    expect(metrics).toEqual([
      { label: 'Tecnologias mapeadas', value: '4' },
      { label: 'Destaques', value: '2' },
      { label: 'Categorias', value: '4' },
      { label: 'Stack avancada', value: '2' },
      {
        label: 'Maior tempo total',
        value: 'Angular',
        supportingText: '6 years 2 months',
      },
    ]);
  });

  it('should group technologies by category and sort them by total duration', () => {
    const groups = buildSkillsGroups(
      createTechnologiesCollectionResponse().data,
      'en-us',
    );

    expect(groups.map((group) => group.id)).toEqual([
      'DATABASE',
      'DEVOPS',
      'FRAMEWORK',
      'LANGUAGE',
    ]);
    expect(groups[2]?.items[0]?.name).toBe('Angular');
  });

  it('should extract sorted categories and levels for filters', () => {
    const filters = extractSkillFilterValues(createTechnologiesCollectionResponse());

    expect(filters.categories).toEqual([
      'DATABASE',
      'DEVOPS',
      'FRAMEWORK',
      'LANGUAGE',
    ]);
    expect(filters.levels).toEqual(['ADVANCED', 'INTERMEDIATE']);
  });
});
