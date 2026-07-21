import { createProjectsCollectionResponse } from '../../../core/api/mocks/projects.mocks';
import {
  buildProjectsSummaryMetrics,
  extractProjectFilterValues,
  mapProjectToCaseCard,
  resolveProjectEmptyAssetsLabel,
  resolveProjectEmptyCompanyLabel,
  resolveProjectEmptyLinksLabel,
} from './projects.helper';

describe('projects helper', () => {
  it('should map a project into a localized case-study card', () => {
    const card = mapProjectToCaseCard(createProjectsCollectionResponse().data[0], 'en-us');

    expect(card.title).toBe("Github's API Consumer");
    expect(card.contextLabel).toBe('Personal');
    expect(card.filterContext).toBe('PERSONAL');
    expect(card.statusLabel).toBe('In progress');
    expect(card.environmentLabel).toBe('Full stack');
    expect(card.stackGroups).toEqual([
      {
        labelKey: 'pages.experiences.detail.stackGroups.frontend',
        technologies: [
          jasmine.objectContaining({
            slug: 'react',
            label: 'React',
            value: jasmine.objectContaining({
              name: 'React',
              stack: 'Front-End',
            }),
          }),
        ],
      },
      {
        labelKey: 'pages.experiences.detail.stackGroups.backend',
        technologies: [
          jasmine.objectContaining({
            slug: 'node',
            label: 'Node.js',
            value: jasmine.objectContaining({
              name: 'Node.js',
              stack: 'Back-End',
            }),
          }),
        ],
      },
      {
        labelKey: 'pages.experiences.detail.stackGroups.others',
        technologies: [
          jasmine.objectContaining({
            slug: 'vercel',
            label: 'Vercel',
            value: jasmine.objectContaining({
              name: 'Vercel',
              stack: 'Others',
            }),
          }),
        ],
      },
    ]);
    expect(card.links[0]).toEqual({
      id: 'link-deploy-1',
      url: 'https://github-consumer-frontend.vercel.app/',
      label: 'Front-End Deploy',
      typeLabel: 'Deploy',
    });
    expect(card.imageUrl).toContain('/assets/img/projects/github-consumer.png');
    expect(card.assetCountLabel).toBe('3');
  });

  it('should use localized fallbacks for unknown labels, empty companies and missing alt text', () => {
    const card = mapProjectToCaseCard(
      {
        ...createProjectsCollectionResponse().data[3],
        context: 'OPEN_SOURCE',
        status: 'QA_REVIEW',
        environment: 'MOBILE_APP',
        links: [
          {
            projectId: 'project-portfolio',
            linkId: 'link-portfolio',
            sortOrder: 1,
            link: {
              ...createProjectsCollectionResponse().data[3].links[0].link,
              labelPt: null,
              labelEn: null,
              type: 'CUSTOM_LINK',
            },
          },
        ],
      },
      'pt-br',
    );

    expect(card.contextLabel).toBe('Open Source');
    expect(card.statusLabel).toBe('Qa Review');
    expect(card.environmentLabel).toBe('Mobile App');
    expect(card.links[0]).toEqual({
      id: 'link-portfolio',
      url: 'https://github.com/Hanszman/hans-portfolio-app',
      label: 'Custom Link',
      typeLabel: 'Custom Link',
    });
    expect(card.companyNames).toEqual([]);
    expect(card.imageAlt).toBe('Portfolio');
  });

  it('should map localized tag labels when tags are linked to the project', () => {
    const card = mapProjectToCaseCard(
      {
        ...createProjectsCollectionResponse().data[0],
        tags: [
          {
            projectId: 'project-consumer',
            tagId: 'tag-angular',
            sortOrder: 1,
            tag: {
              id: 'tag-angular',
              slug: 'angular',
              labelPt: 'Angular PT',
              labelEn: 'Angular EN',
              color: '#dd0031',
              sortOrder: 1,
              createdAt: '2026-01-01T00:00:00.000Z',
              updatedAt: '2026-01-01T00:00:00.000Z',
            },
          },
        ],
      },
      'pt-br',
    );

    expect(card.tagLabels).toEqual(['Angular PT']);
  });

  it('should group unmapped database technologies as databases', () => {
    const card = mapProjectToCaseCard(
      {
        ...createProjectsCollectionResponse().data[0],
        technologies: [
          {
            projectId: 'project-consumer',
            technologyId: 'tech-custom-database',
            technology: {
              ...createProjectsCollectionResponse().data[0].technologies[0].technology,
              id: 'tech-custom-database',
              slug: 'custom-database',
              name: 'Custom DB',
              category: 'DATABASE',
            },
          },
        ],
      },
      'en-us',
    );

    expect(card.stackGroups).toEqual([
      {
        labelKey: 'pages.experiences.detail.stackGroups.databases',
        technologies: [
          jasmine.objectContaining({
            slug: 'custom-database',
            label: 'Custom DB',
            value: jasmine.objectContaining({
              name: 'Custom DB',
              stack: 'Databases',
            }),
          }),
        ],
      },
    ]);
  });

  it('should omit nullable technology labels when backend values are not available', () => {
    const card = mapProjectToCaseCard(
      {
        ...createProjectsCollectionResponse().data[0],
        technologies: [
          {
            projectId: 'project-consumer',
            technologyId: 'tech-unknown',
            technology: {
              ...createProjectsCollectionResponse().data[0].technologies[0].technology,
              id: 'tech-unknown',
              slug: 'unknown-technology',
              name: 'Unknown Technology',
              level: null,
              frequency: null,
            },
          },
        ],
      },
      'en-us',
    );

    expect(card.technologies[0].value).toEqual(
      jasmine.objectContaining({
        name: 'Unknown Technology',
        level: undefined,
        frequency: undefined,
      }),
    );
  });

  it('should use the untitled-link fallback and sort project images by relation order', () => {
    const card = mapProjectToCaseCard(
      {
        ...createProjectsCollectionResponse().data[0],
        imageAssets: [
          {
            ...createProjectsCollectionResponse().data[0].imageAssets[0],
            sortOrder: 2,
            imageAsset: {
              ...createProjectsCollectionResponse().data[0].imageAssets[0].imageAsset,
              filePath: '/assets/img/projects/late-image.png',
            },
          },
          {
            ...createProjectsCollectionResponse().data[0].imageAssets[0],
            imageAssetId: 'image-first',
            sortOrder: 1,
            imageAsset: {
              ...createProjectsCollectionResponse().data[0].imageAssets[0].imageAsset,
              filePath: '/assets/img/projects/first-image.png',
              altPt: '',
              altEn: '',
            },
          },
        ],
        links: [
          {
            ...createProjectsCollectionResponse().data[0].links[0],
            link: {
              ...createProjectsCollectionResponse().data[0].links[0].link,
              labelPt: null,
              labelEn: null,
              type: '',
            },
          },
        ],
      },
      'en-us',
    );

    expect(card.links[0]).toEqual({
      id: 'link-deploy-1',
      url: 'https://github-consumer-frontend.vercel.app/',
      label: 'Untitled link',
      typeLabel: '',
    });
    expect(card.imageUrl).toContain('/assets/img/projects/first-image.png');
    expect(card.imageAlt).toBe("Github's API Consumer");
  });

  it('should fallback gallery alt text and keep descriptions undefined when captions are not available', () => {
    const card = mapProjectToCaseCard(
      {
        ...createProjectsCollectionResponse().data[0],
        imageAssets: [
          {
            ...createProjectsCollectionResponse().data[0].imageAssets[0],
            imageAsset: {
              ...createProjectsCollectionResponse().data[0].imageAssets[0].imageAsset,
              altPt: '',
              altEn: '',
              captionPt: null,
              captionEn: null,
            },
          },
        ],
      },
      'en-us',
    );

    expect(card.galleryItems[0].imageAlt).toBe("Github's API Consumer");
    expect(card.galleryItems[0].description).toBeUndefined();
  });

  it('should summarize featured density, in-progress work, linked assets and richest stack', () => {
    const metrics = buildProjectsSummaryMetrics(createProjectsCollectionResponse().data, 'pt-br');

    expect(metrics).toEqual([
      { label: 'Cases publicados', value: '4' },
      { label: 'Em destaque', value: '2' },
      { label: 'Em andamento', value: '2' },
      { label: 'Assets vinculados', value: '5' },
      {
        label: 'Stack mais ampla',
        value: 'Portfolio',
        supportingText: '3 Tecnologias',
      },
    ]);
  });

  it('should keep the richest-stack support text empty when no cases are available', () => {
    const metrics = buildProjectsSummaryMetrics([], 'en-us');

    expect(metrics[4]).toEqual({
      label: 'Richest stack',
      value: '',
      supportingText: '',
    });
  });

  it('should extract sorted contexts, environments and statuses for filters', () => {
    const filters = extractProjectFilterValues(createProjectsCollectionResponse());

    expect(filters).toEqual({
      contexts: ['ACADEMIC', 'PERSONAL', 'PROFESSIONAL'],
      environments: ['FRONTEND', 'FULLSTACK'],
      statuses: ['COMPLETED', 'IN_PROGRESS'],
    });
  });

  it('should expose localized empty-state helpers for companies, links and assets', () => {
    expect(resolveProjectEmptyCompanyLabel('en-us')).toBe('No linked companies yet.');
    expect(resolveProjectEmptyLinksLabel('pt-br')).toBe(
      'Nenhum link publicado foi vinculado ainda.',
    );
    expect(resolveProjectEmptyAssetsLabel('es-es')).toBe(
      'Todavía no se publicó ningún asset visual vinculado.',
    );
  });
});
