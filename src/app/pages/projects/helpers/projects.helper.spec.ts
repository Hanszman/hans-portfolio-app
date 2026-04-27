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
    const card = mapProjectToCaseCard(
      createProjectsCollectionResponse().data[0],
      'en-us',
    );

    expect(card.title).toBe("Github's API Consumer");
    expect(card.contextLabel).toBe('Personal');
    expect(card.statusLabel).toBe('In progress');
    expect(card.environmentLabel).toBe('Full stack');
    expect(card.links[0]).toEqual({
      id: 'link-deploy-1',
      url: 'https://github-consumer-frontend.vercel.app/',
      label: 'Front-End Deploy',
      typeLabel: 'Deploy',
    });
    expect(card.imageUrl).toContain('/assets/img/projects/github-consumer.png');
    expect(card.assetCountLabel).toBe('3');
  });

  it('should use localized fallbacks for unknown labels, empty companies, and missing alt text', () => {
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
      'pt-BR',
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

  it('should summarize featured density, in-progress work, linked assets, and richest stack', () => {
    const metrics = buildProjectsSummaryMetrics(
      createProjectsCollectionResponse().data,
      'pt-BR',
    );

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

  it('should extract sorted contexts, environments, and statuses for filters', () => {
    const filters = extractProjectFilterValues(createProjectsCollectionResponse());

    expect(filters).toEqual({
      contexts: ['ACADEMIC', 'PERSONAL', 'PROFESSIONAL'],
      environments: ['FRONTEND', 'FULLSTACK'],
      statuses: ['COMPLETED', 'IN_PROGRESS'],
    });
  });

  it('should expose localized empty-state helpers for companies, links, and assets', () => {
    expect(resolveProjectEmptyCompanyLabel('en-us')).toBe('No linked companies yet.');
    expect(resolveProjectEmptyLinksLabel('pt-BR')).toBe(
      'Nenhum link publicado foi vinculado ainda.',
    );
    expect(resolveProjectEmptyAssetsLabel('es-es')).toBe(
      'Todavia no se publico ningun asset visual vinculado.',
    );
  });
});
