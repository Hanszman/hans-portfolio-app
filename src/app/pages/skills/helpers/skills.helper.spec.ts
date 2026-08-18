import { TechnologyCollectionItemResponse } from '../../../core/api/technologies/technologies.types';
import { createTechnologiesCollectionResponse } from '../../../core/api/mocks/technologies.mocks';
import { translateStaticKey } from '../../../core/translation/translation.service';
import { FormationRecord } from '../../../core/api/formations/formations.types';
import { SpokenLanguageRecord } from '../../../core/api/spoken-languages/spoken-languages.types';
import {
  buildEducationSkillCards,
  buildLanguageSkillCards,
  buildSkillsGroups,
  buildSkillsSummaryMetrics,
  extractSkillFilterValues,
  mapTechnologyToSkillCard,
  mapFormationToEducationModal,
  resolveSkillStackKey,
  resolveSkillTypeKey,
  resolveSkillVisualUrl,
} from './skills.helper';

const formationFixture: FormationRecord = {
  id: 'formation-information-systems',
  slug: 'information-systems',
  institution: 'PUC Minas',
  titlePt: 'Sistemas de Informação',
  titleEn: 'Information Systems',
  titleEs: 'Sistemas de Información',
  degreeType: 'BACHELOR',
  summaryPt: 'Resumo',
  summaryEn: 'Summary',
  summaryEs: 'Resumen',
  startDate: '2015-02-01',
  endDate: '2018-12-15',
  sortOrder: 1,
  imageAssets: [
    {
      imageAsset: {
        id: 'formation-icon',
        filePath: '/assets/img/skills/puc.png',
        kind: 'ICON',
      },
    },
  ],
};

const languageFixture: SpokenLanguageRecord = {
  id: 'language-portuguese',
  code: 'pt-BR',
  namePt: 'Português',
  nameEn: 'Portuguese',
  nameEs: 'Portugués',
  proficiency: 'NATIVE',
  sortOrder: 1,
  imageAssets: [
    {
      imageAsset: {
        id: 'language-icon',
        filePath: '/assets/vendor/flag-icons/4x3/br.svg',
        kind: 'ICON',
      },
    },
  ],
};

describe('skills helper', () => {
  it('should map a technology into a localized skills card', () => {
    const card = mapTechnologyToSkillCard(createTechnologiesCollectionResponse().data[0], 'en-us');

    expect(card.name).toBe('Angular');
    expect(card.subtitle).toBe('Frequent');
    expect(card.typeLabel).toBe('Frameworks');
    expect(card.stackKey).toBe('FRONT_END');
    expect(card.typeKey).toBe('FRAMEWORKS');
    expect(card.modal.stack).toBe('Front-End');
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

  it('should map fallback labels, icons and empty metrics when a technology has sparse data', () => {
    const card = mapTechnologyToSkillCard(
      {
        id: 'tech-custom',
        slug: 'custom-tool',
        name: 'Custom Tool',
        type: 'OTHERS',
        level: null,
        frequency: null,
        highlight: false,
      },
      'es-es',
    );

    expect(card.typeLabel).toBe('Otros');
    expect(card.levelLabel).toBe('Nivel no informado');
    expect(card.frequencyLabel).toBe('Frecuencia no informada');
    expect(card.totalExperienceLabel).toBe('Sin período consolidado');
    expect(card.badgeLabel).toBe('');
    expect(card.modal.level).toBeUndefined();
    expect(card.iconName).toBe('LuSparkles');
    expect(card.visualUrl).toBe('');
    expect(card.contexts).toEqual([]);
  });

  it('should map mobile technologies and native RARE/STUDYING taxonomy for the redesigned filters', () => {
    const card = mapTechnologyToSkillCard(
      {
        id: 'tech-react-native',
        slug: 'react-native',
        name: 'React Native',
        type: 'FRAMEWORKS',
        level: 'INTERMEDIATE',
        frequency: 'RARE',
        highlight: false,
      },
      'en-us',
    );

    expect(card.stackKey).toBe('MOBILE');
    expect(card.levelKey).toBe('INTERMEDIATE');
    expect(card.badgeColor).toBe('info');
    expect(card.badgeLabel).toBe('Intermediate');
    expect(card.frequencyLabel).toBe('Rare');

    const studyingCard = mapTechnologyToSkillCard(
      {
        id: 'tech-studying',
        slug: 'studying-tech',
        name: 'Studying Tech',
        type: 'FRAMEWORKS',
        level: 'STUDYING',
        frequency: null,
        highlight: false,
      },
      'en-us',
    );

    expect(studyingCard.levelKey).toBe('STUDYING');
    expect(studyingCard.badgeColor).toBe('success');
    expect(studyingCard.badgeLabel).toBe('Studying');
  });

  it('should resolve backend and database stack filters', () => {
    expect(resolveSkillStackKey({ slug: 'node-js', stack: 'BACK_END' })).toBe('BACK_END');
    expect(resolveSkillStackKey({ slug: 'mysql', stack: 'DATABASES' })).toBe('DATABASES');
    expect(resolveSkillStackKey({ slug: 'unity', stack: 'GAMES' })).toBe('GAMES');
    expect(resolveSkillStackKey({ slug: 'unknown-tool', stack: 'OTHERS' })).toBe('OTHERS');
  });

  it('should resolve legacy technology types from the old portfolio catalog', () => {
    expect(resolveSkillTypeKey({ slug: 'javascript', type: 'PROGRAMMING_LANGUAGES' })).toBe(
      'PROGRAMMING_LANGUAGES',
    );
    expect(resolveSkillTypeKey({ slug: 'css', type: 'PROGRAMMING_LANGUAGES' })).toBe(
      'PROGRAMMING_LANGUAGES',
    );
    expect(resolveSkillTypeKey({ slug: 'unity', type: 'DEVELOPMENT_PLATFORMS' })).toBe('DEVELOPMENT_PLATFORMS');
    expect(resolveSkillTypeKey({ slug: 'unknown', type: 'RELATIONAL_DATABASES' })).toBe(
      'RELATIONAL_DATABASES',
    );
  });

  it('should build dynamic education and language cards for the shared modal', () => {
    const educationCards = buildEducationSkillCards([formationFixture], 'en-us');
    const languageCards = buildLanguageSkillCards([languageFixture], 'en-us');

    expect(educationCards[0]).toEqual(
      jasmine.objectContaining({
        kind: 'education',
        name: 'Information Systems',
        modal: jasmine.objectContaining({
          type: 'Education',
          image: jasmine.objectContaining({
            src: jasmine.stringMatching(/puc\.png$/),
          }),
        }),
      }),
    );
    expect(languageCards[0]).toEqual(
      jasmine.objectContaining({
        kind: 'language',
        name: 'Portuguese',
        totalExperienceLabel: '',
        modal: jasmine.objectContaining({
          type: 'Languages',
          image: jasmine.objectContaining({
            src: jasmine.stringMatching(/br\.svg$/),
          }),
        }),
      }),
    );
  });

  it('should order sparse catalogs and normalize custom enum values', () => {
    const educationCards = buildEducationSkillCards(
      [
        { ...formationFixture, id: 'z', titleEn: 'Zulu', sortOrder: null },
        {
          ...formationFixture,
          id: 'a',
          titleEn: 'Alpha',
          degreeType: 'CUSTOM_DEGREE' as FormationRecord['degreeType'],
          sortOrder: null,
        },
        formationFixture,
      ],
      'en-us',
    );
    const languageCards = buildLanguageSkillCards(
      [
        { ...languageFixture, id: 'z', nameEn: 'Zulu', sortOrder: null },
        {
          ...languageFixture,
          id: 'a',
          nameEn: 'Alpha',
          proficiency: 'BASIC',
          sortOrder: null,
        },
        languageFixture,
      ],
      'en-us',
    );

    expect(educationCards.map(({ name }) => name)).toEqual([
      'Information Systems',
      'Alpha',
      'Zulu',
    ]);
    expect(educationCards[1].badgeLabel).toBe('Custom Degree');
    expect(languageCards.map(({ name }) => name)).toEqual(['Portuguese', 'Alpha', 'Zulu']);
    expect(languageCards[1].levelKey).toBe('BASIC');
  });

  it('should map formation content and ordered linked images into the education modal', () => {
    const fallback = buildEducationSkillCards([formationFixture], 'es-es')[0];
    const modal = mapFormationToEducationModal(
      {
        id: 'formation',
        slug: fallback.slug,
        institution: 'PUC Minas',
        titlePt: 'Sistemas de Informação',
        titleEn: 'Information Systems',
        titleEs: 'Sistemas de Información',
        degreeType: 'BACHELOR',
        summaryPt: 'Resumo',
        summaryEn: 'Summary',
        summaryEs: 'Resumen',
        startDate: '2015-02-01T00:00:00.000Z',
        endDate: '2018-12-15T00:00:00.000Z',
        imageAssets: [
          {
            sortOrder: 2,
            imageAsset: {
              id: 'second',
              fileName: 'second.png',
              filePath: '/second.png',
              kind: 'SCREENSHOT',
            },
          },
          {
            sortOrder: 3,
            imageAsset: {
              id: 'second-copy',
              fileName: 'second.png',
              filePath: '/second.png',
              kind: 'SCREENSHOT',
            },
          },
          {
            sortOrder: 1,
            imageAsset: {
              id: 'first',
              fileName: 'first.png',
              filePath: '/first.png',
              kind: 'SCREENSHOT',
              altEs: 'Primera imagen',
            },
          },
          {
            sortOrder: 0,
            imageAsset: {
              id: 'icon',
              fileName: 'icon.png',
              filePath: '/icon.png',
              kind: 'ICON',
            },
          },
          { sortOrder: 0, imageAsset: null },
        ],
        technologies: [
          { technology: { id: 'typescript', slug: 'typescript', name: 'TypeScript' } },
          { technology: { id: 'angular', slug: 'angular', name: 'Angular' } },
          { technology: null },
        ],
      },
      fallback,
      'es-es',
    );

    expect(modal.title).toBe('Sistemas de Información');
    expect(modal.subtitle).toBe('PUC Minas');
    expect(modal.galleryItems.map(({ id }) => id)).toEqual(['first', 'second']);
    expect(modal.galleryItems[0].imageAlt).toBe('Primera imagen');
    expect(modal.galleryItems[1].description).toBe('Resumen');
    expect(modal.image?.src).toContain('/icon.png');
    expect(modal.details.map(({ value }) => value)).toContain('BACHELOR');
    expect(modal.technologies).toEqual([
      { slug: 'angular', name: 'Angular' },
      { slug: 'typescript', name: 'TypeScript' },
    ]);
  });

  it('should use education fallbacks when API records or assets are absent', () => {
    const education = buildEducationSkillCards([formationFixture], 'en-us')[0];
    expect(mapFormationToEducationModal(undefined, education, 'en-us')).toEqual(
      jasmine.objectContaining({ title: education.name, galleryItems: [] }),
    );

    const educationWithoutGallery = mapFormationToEducationModal(
      {
        id: 'formation-without-gallery',
        slug: education.slug,
        institution: education.subtitle,
        titlePt: education.name,
        titleEn: education.name,
        degreeType: education.badgeLabel,
        summaryPt: '',
        summaryEn: '',
        startDate: 'invalid-date',
        endDate: null,
        imageAssets: null,
      },
      education,
      'en-us',
    );
    expect(educationWithoutGallery.galleryItems).toEqual([]);
    expect(educationWithoutGallery.image?.src).toBe(education.visualUrl);
    expect(educationWithoutGallery.details.map(({ value }) => value)).toContain('invalid-date');
  });

  it('should normalize sparse valid formation assets', () => {
    const fallback = buildEducationSkillCards([formationFixture], 'en-us')[0];
    const modal = mapFormationToEducationModal(
      {
        id: 'formation-sparse-asset',
        slug: fallback.slug,
        institution: fallback.subtitle,
        titlePt: fallback.name,
        titleEn: fallback.name,
        degreeType: fallback.badgeLabel,
        summaryPt: '',
        summaryEn: '',
        startDate: '2020-01-01',
        imageAssets: [
          {
            sortOrder: null,
            imageAsset: {
              id: 'sparse-asset',
              fileName: null,
              filePath: '/sparse.png',
              kind: 'SCREENSHOT',
              altPt: null,
              altEn: null,
              altEs: null,
            },
          },
        ],
      },
      fallback,
      'en-us',
    );

    expect(modal.galleryItems[0].imageAlt).toBe(`${fallback.name} - 1`);
    expect(modal.galleryItems[0].description).toBeUndefined();
  });

  it('should use fallback duration labels when experience labels are missing', () => {
    const card = mapTechnologyToSkillCard(
      {
        id: 'tech-weird',
        slug: 'weird-tech',
        name: 'Weird Tech',
        type: 'FRAMEWORKS',
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
      'pt-br',
    );

    expect(card.levelLabel).toBe('Expert Plus');
    expect(card.frequencyLabel).toBe('Very Frequent');
    expect(card.totalExperienceLabel).toBe('Sem período consolidado');
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
    const metrics = buildSkillsSummaryMetrics(createTechnologiesCollectionResponse().data, 'pt-br');

    expect(metrics).toEqual([
      { label: 'Tecnologias mapeadas', value: '4' },
      { label: 'Destaques', value: '2' },
      { label: 'Tipos', value: '4' },
      { label: 'Stack avançada', value: '2' },
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
          type: 'OTHERS',
          level: null,
          frequency: null,
          highlight: false,
        },
        {
          id: 'tech-ranked',
          slug: 'ranked',
          name: 'Ranked Tech',
          type: 'FRAMEWORKS',
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
      { label: 'Types', value: '2' },
      { label: 'Advanced stack', value: '1' },
      {
        label: 'Longest total time',
        value: 'Ranked Tech',
        supportingText: '8 months',
      },
    ]);
  });

  it('should summarize an empty technology collection safely', () => {
    expect(buildSkillsSummaryMetrics([], 'en-us')[4]).toEqual({
      label: 'Longest total time',
      value: '-',
      supportingText: '',
    });
  });

  it('should keep summary support text empty when the strongest technology has no duration label', () => {
    const metrics = buildSkillsSummaryMetrics(
      [
        {
          id: 'tech-empty',
          slug: 'empty',
          name: 'Empty Tech',
          type: 'OTHERS',
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
          type: 'FRAMEWORKS',
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
          type: 'LIBRARIES',
          level: null,
          frequency: null,
          highlight: false,
        },
      ],
      'en-us',
    );

    expect(metrics[4]?.value).toBe('Ranked Tech');
  });

  it('should group technologies by type and sort them by total duration', () => {
    const groups = buildSkillsGroups(createTechnologiesCollectionResponse().data, 'en-us');

    expect(groups.map((group) => group.id)).toEqual([
      'DEPLOYMENT_TOOLS',
      'FRAMEWORKS',
      'PROGRAMMING_LANGUAGES',
      'RELATIONAL_DATABASES',
    ]);
    expect(groups[1]?.items[0]?.name).toBe('Angular');
  });

  it('should group unknown types with fallback tone, icon and sorting', () => {
    const groups = buildSkillsGroups(
      [
        {
          id: 'tech-a',
          slug: 'custom-alpha',
          name: 'Custom Alpha',
          type: 'OTHERS',
          level: null,
          frequency: null,
          highlight: false,
        },
        {
          id: 'tech-b',
          slug: 'custom-beta',
          name: 'Custom Beta',
          type: 'OTHERS',
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
        id: 'OTHERS',
        title: 'Others',
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

  it('should sort unknown type groups even when the first compared item has no duration metrics', () => {
    const groups = buildSkillsGroups(
      [
        {
          id: 'tech-b',
          slug: 'custom-beta',
          name: 'Custom Beta',
          type: 'OTHERS',
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
          type: 'OTHERS',
          level: null,
          frequency: null,
          highlight: false,
        },
      ],
      'en-us',
    );

    expect(groups[0]?.items.map((item) => item.name)).toEqual(['Custom Beta', 'Custom Alpha']);
  });

  it('should extract sorted types and levels for filters', () => {
    const filters = extractSkillFilterValues(createTechnologiesCollectionResponse());

    expect(filters.types).toEqual([
      'DEPLOYMENT_TOOLS',
      'FRAMEWORKS',
      'PROGRAMMING_LANGUAGES',
      'RELATIONAL_DATABASES',
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
          type: 'LIBRARIES',
          level: null,
          frequency: 'RARE',
          highlight: false,
        },
      ],
    });

    expect(filters.types).toEqual([
      'DEPLOYMENT_TOOLS',
      'FRAMEWORKS',
      'LIBRARIES',
      'PROGRAMMING_LANGUAGES',
      'RELATIONAL_DATABASES',
    ]);
    expect(filters.levels).toEqual(['ADVANCED', 'INTERMEDIATE']);
  });

  it('should preserve stack fallbacks and default the type to OTHERS when the API omits taxonomy', () => {
    const legacyBackend = {
      id: 'tech-node',
      slug: 'node',
      name: 'Node.js',
      type: null,
      level: null,
      frequency: null,
      highlight: false,
    } as unknown as TechnologyCollectionItemResponse;
    const unknown = {
      ...legacyBackend,
      id: 'tech-unknown',
      slug: 'unknown-tool',
    } as unknown as TechnologyCollectionItemResponse;

    expect(resolveSkillStackKey(legacyBackend)).toBe('BACK_END');
    expect(resolveSkillTypeKey(legacyBackend)).toBe('OTHERS');
    expect(mapTechnologyToSkillCard(unknown, 'en-us').typeLabel).toBe('Others');
    expect(buildSkillsSummaryMetrics([unknown], 'en-us')[2]?.value).toBe('1');
    expect(buildSkillsGroups([unknown], 'en-us')[0]?.id).toBe('OTHERS');
    expect(
      extractSkillFilterValues({
        ...createTechnologiesCollectionResponse(),
        data: [unknown],
      }).types,
    ).toEqual(['OTHERS']);
  });

  it('should resolve skill visual URLs from fallback assets or return an empty string', () => {
    expect(resolveSkillVisualUrl('angular')).toContain('/assets/img/skills/angular.png');
    expect(resolveSkillVisualUrl('react-native')).toContain('/assets/img/skills/reactnative.png');
    expect(resolveSkillVisualUrl('microsoft-sql-server')).toContain(
      '/assets/img/skills/sqlserver.png',
    );
    expect(resolveSkillVisualUrl('visual-studio-code')).toContain(
      '/assets/img/skills/visualstudiocode.png',
    );
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
    ).toBe('3 technologies with real duration coverage by context.');
  });
});
