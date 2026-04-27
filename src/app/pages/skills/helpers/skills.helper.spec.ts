import { TechnologyCollectionItemResponse } from '../../../core/api/technologies/technologies.types';
import { createTechnologiesCollectionResponse } from '../../../core/api/mocks/technologies.mocks';
import { translateStaticKey } from '../../../core/translation/translation.service';
import {
  buildSkillsGroups,
  buildSkillsSummaryMetrics,
  extractSkillFilterValues,
  mapTechnologyToSkillCard,
  resolveSkillVisualUrl,
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

  it('should map fallback labels, icons, and empty metrics when a technology has sparse data', () => {
    const card = mapTechnologyToSkillCard(
      {
        id: 'tech-custom',
        slug: 'custom-tool',
        name: 'Custom Tool',
        category: 'CUSTOM_STACK',
        level: null,
        frequency: null,
        highlight: false,
      },
      'es-es',
    );

    expect(card.categoryLabel).toBe('Custom Stack');
    expect(card.levelLabel).toBe('Nivel no informado');
    expect(card.frequencyLabel).toBe('Frecuencia no informada');
    expect(card.totalExperienceLabel).toBe('Sin periodo consolidado');
    expect(card.iconName).toBe('LuSparkles');
    expect(card.visualUrl).toBe('');
    expect(card.contexts).toEqual([]);
  });

  it('should use fallback duration labels when experience labels are missing', () => {
    const card = mapTechnologyToSkillCard(
      {
        id: 'tech-weird',
        slug: 'weird-tech',
        name: 'Weird Tech',
        category: 'FRAMEWORK',
        level: 'EXPERT_PLUS',
        frequency: 'VERY_FREQUENT',
        highlight: false,
        experienceMetrics: {
          total: {
            totalMonths: 5,
            years: 0,
            months: 5,
            label: undefined as unknown as string,
            startedAt: '2026-01-01',
            endedAt: '2026-06-01',
          },
          byContext: {
            PROFESSIONAL: {
              totalMonths: 5,
              years: 0,
              months: 5,
              label: undefined as unknown as string,
              startedAt: '2026-01-01',
              endedAt: '2026-06-01',
            },
            PERSONAL: {
              totalMonths: 0,
              years: 0,
              months: 0,
              label: '0 months',
              startedAt: null,
              endedAt: null,
            },
            ACADEMIC: {
              totalMonths: 0,
              years: 0,
              months: 0,
              label: '0 months',
              startedAt: null,
              endedAt: null,
            },
            STUDY: {
              totalMonths: 0,
              years: 0,
              months: 0,
              label: '0 months',
              startedAt: null,
              endedAt: null,
            },
          },
        },
      } as TechnologyCollectionItemResponse,
      'pt-BR',
    );

    expect(card.levelLabel).toBe('Expert Plus');
    expect(card.frequencyLabel).toBe('Very Frequent');
    expect(card.totalExperienceLabel).toBe('Sem periodo consolidado');
    expect(card.contexts).toEqual([
      {
        key: 'PROFESSIONAL',
        label: 'Profissional',
        value: '0 meses',
        totalMonths: 5,
      },
    ]);
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

  it('should fall back when summary technologies have no consolidated metrics', () => {
    const metrics = buildSkillsSummaryMetrics(
      [
        {
          id: 'tech-empty',
          slug: 'empty',
          name: 'Empty Tech',
          category: 'CUSTOM_STACK',
          level: null,
          frequency: null,
          highlight: false,
        },
        {
          id: 'tech-ranked',
          slug: 'ranked',
          name: 'Ranked Tech',
          category: 'FRAMEWORK',
          level: 'ADVANCED',
          frequency: 'FREQUENT',
          highlight: true,
          experienceMetrics: {
            total: {
              totalMonths: 8,
              years: 0,
              months: 8,
              label: '8 months',
              startedAt: '2025-01-01',
              endedAt: '2025-09-01',
            },
            byContext: {
              PROFESSIONAL: {
                totalMonths: 8,
                years: 0,
                months: 8,
                label: '8 months',
                startedAt: '2025-01-01',
                endedAt: '2025-09-01',
              },
              PERSONAL: {
                totalMonths: 0,
                years: 0,
                months: 0,
                label: '0 months',
                startedAt: null,
                endedAt: null,
              },
              ACADEMIC: {
                totalMonths: 0,
                years: 0,
                months: 0,
                label: '0 months',
                startedAt: null,
                endedAt: null,
              },
              STUDY: {
                totalMonths: 0,
                years: 0,
                months: 0,
                label: '0 months',
                startedAt: null,
                endedAt: null,
              },
            },
          },
        },
      ],
      'en-us',
    );

    expect(metrics).toEqual([
      { label: 'Mapped technologies', value: '2' },
      { label: 'Highlights', value: '1' },
      { label: 'Categories', value: '2' },
      { label: 'Advanced stack', value: '1' },
      {
        label: 'Longest total time',
        value: 'Ranked Tech',
        supportingText: '8 months',
      },
    ]);
  });

  it('should keep summary support text empty when the strongest technology has no duration label', () => {
    const metrics = buildSkillsSummaryMetrics(
      [
        {
          id: 'tech-empty',
          slug: 'empty',
          name: 'Empty Tech',
          category: 'CUSTOM_STACK',
          level: null,
          frequency: null,
          highlight: false,
        },
      ],
      'en-us',
    );

    expect(metrics[4]).toEqual({
      label: 'Longest total time',
      value: 'Empty Tech',
      supportingText: '',
    });
  });

  it('should compare summary durations safely when the left item has no metrics', () => {
    const metrics = buildSkillsSummaryMetrics(
      [
        {
          id: 'tech-ranked',
          slug: 'ranked',
          name: 'Ranked Tech',
          category: 'FRAMEWORK',
          level: 'ADVANCED',
          frequency: 'FREQUENT',
          highlight: false,
          experienceMetrics: {
            total: {
              totalMonths: 8,
              years: 0,
              months: 8,
              label: '8 months',
              startedAt: '2025-01-01',
              endedAt: '2025-09-01',
            },
            byContext: {
              PROFESSIONAL: {
                totalMonths: 8,
                years: 0,
                months: 8,
                label: '8 months',
                startedAt: '2025-01-01',
                endedAt: '2025-09-01',
              },
              PERSONAL: {
                totalMonths: 0,
                years: 0,
                months: 0,
                label: '0 months',
                startedAt: null,
                endedAt: null,
              },
              ACADEMIC: {
                totalMonths: 0,
                years: 0,
                months: 0,
                label: '0 months',
                startedAt: null,
                endedAt: null,
              },
              STUDY: {
                totalMonths: 0,
                years: 0,
                months: 0,
                label: '0 months',
                startedAt: null,
                endedAt: null,
              },
            },
          },
        },
        {
          id: 'tech-empty-left',
          slug: 'empty-left',
          name: 'Empty Left',
          category: 'LIBRARY',
          level: null,
          frequency: null,
          highlight: false,
        },
      ],
      'en-us',
    );

    expect(metrics[4]?.value).toBe('Ranked Tech');
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

  it('should group unknown categories with fallback tone, icon, and sorting', () => {
    const groups = buildSkillsGroups(
      [
        {
          id: 'tech-a',
          slug: 'custom-alpha',
          name: 'Custom Alpha',
          category: 'CUSTOM_STACK',
          level: null,
          frequency: null,
          highlight: false,
        },
        {
          id: 'tech-b',
          slug: 'custom-beta',
          name: 'Custom Beta',
          category: 'CUSTOM_STACK',
          level: null,
          frequency: null,
          highlight: false,
          experienceMetrics: {
            total: {
              totalMonths: 3,
              years: 0,
              months: 3,
              label: '3 months',
              startedAt: '2026-01-01',
              endedAt: '2026-04-01',
            },
            byContext: {
              PROFESSIONAL: {
                totalMonths: 3,
                years: 0,
                months: 3,
                label: '3 months',
                startedAt: '2026-01-01',
                endedAt: '2026-04-01',
              },
              PERSONAL: {
                totalMonths: 0,
                years: 0,
                months: 0,
                label: '0 months',
                startedAt: null,
                endedAt: null,
              },
              ACADEMIC: {
                totalMonths: 0,
                years: 0,
                months: 0,
                label: '0 months',
                startedAt: null,
                endedAt: null,
              },
              STUDY: {
                totalMonths: 0,
                years: 0,
                months: 0,
                label: '0 months',
                startedAt: null,
                endedAt: null,
              },
            },
          },
        },
      ],
      'en-us',
    );

    expect(groups).toEqual([
      {
        id: 'CUSTOM_STACK',
        title: 'Custom Stack',
        description: '2 technologies with real duration coverage by context.',
        tone: 'base',
        iconName: 'LuSparkles',
        items: [
          jasmine.objectContaining({ name: 'Custom Beta' }),
          jasmine.objectContaining({ name: 'Custom Alpha' }),
        ],
      },
    ]);
  });

  it('should sort unknown category groups even when the first compared item has no duration metrics', () => {
    const groups = buildSkillsGroups(
      [
        {
          id: 'tech-b',
          slug: 'custom-beta',
          name: 'Custom Beta',
          category: 'CUSTOM_STACK',
          level: null,
          frequency: null,
          highlight: false,
          experienceMetrics: {
            total: {
              totalMonths: 3,
              years: 0,
              months: 3,
              label: '3 months',
              startedAt: '2026-01-01',
              endedAt: '2026-04-01',
            },
            byContext: {
              PROFESSIONAL: {
                totalMonths: 3,
                years: 0,
                months: 3,
                label: '3 months',
                startedAt: '2026-01-01',
                endedAt: '2026-04-01',
              },
              PERSONAL: {
                totalMonths: 0,
                years: 0,
                months: 0,
                label: '0 months',
                startedAt: null,
                endedAt: null,
              },
              ACADEMIC: {
                totalMonths: 0,
                years: 0,
                months: 0,
                label: '0 months',
                startedAt: null,
                endedAt: null,
              },
              STUDY: {
                totalMonths: 0,
                years: 0,
                months: 0,
                label: '0 months',
                startedAt: null,
                endedAt: null,
              },
            },
          },
        },
        {
          id: 'tech-a',
          slug: 'custom-alpha',
          name: 'Custom Alpha',
          category: 'CUSTOM_STACK',
          level: null,
          frequency: null,
          highlight: false,
        },
      ],
      'en-us',
    );

    expect(groups[0]?.items.map((item) => item.name)).toEqual([
      'Custom Beta',
      'Custom Alpha',
    ]);
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

  it('should ignore null levels while extracting filters', () => {
    const filters = extractSkillFilterValues({
      ...createTechnologiesCollectionResponse(),
      data: [
        ...createTechnologiesCollectionResponse().data,
        {
          id: 'tech-null-level',
          slug: 'null-level',
          name: 'Null Level',
          category: 'LIBRARY',
          level: null,
          frequency: 'RARE',
          highlight: false,
        },
      ],
    });

    expect(filters.categories).toEqual([
      'DATABASE',
      'DEVOPS',
      'FRAMEWORK',
      'LANGUAGE',
      'LIBRARY',
    ]);
    expect(filters.levels).toEqual(['ADVANCED', 'INTERMEDIATE']);
  });

  it('should resolve skill visual URLs from fallback assets or return an empty string', () => {
    expect(resolveSkillVisualUrl('angular')).toContain('/assets/img/skills/angular.png');
    expect(resolveSkillVisualUrl('external', 'https://cdn.example.com/external.png')).toBe(
      'https://cdn.example.com/external.png',
    );
    expect(resolveSkillVisualUrl('unknown-skill')).toBe('');
  });

  it('should fall back to the English group description when a locale key is missing', () => {
    expect(
      translateStaticKey('fr-fr' as never, 'taxonomy.skills.group.description', {
        count: '3',
      }),
    ).toBe(
      '3 technologies with real duration coverage by context.',
    );
  });
});
