import {
  buildProjectsFormValue,
  buildProjectsMutationPayload,
  createEmptyProjectsOperationsFormValue,
  createProjectImageAssetOption,
  normalizeProjectRelationIds,
  projectRelationId,
} from './projects-operations.types';
import { ProjectsOperationsFormValue } from './projects-operations.types';

const form = (): ProjectsOperationsFormValue => ({
  ...createEmptyProjectsOperationsFormValue(),
  slug: 'slug',
  titlePt: 'Titulo',
  titleEn: 'Title',
  shortDescriptionPt: 'Resumo',
  shortDescriptionEn: 'Summary',
  fullDescriptionPt: 'Descricao',
  fullDescriptionEn: 'Description',
  context: 'PROFESSIONAL',
  status: 'COMPLETED',
  environment: 'FRONTEND',
  startDate: '2026-01-01',
  endDate: '2026-02-01',
  sortOrder: '1',
  technologyIds: ['t-1', 't-1'],
  experienceIds: ['e-1', 'e-1'],
  tagIds: ['tag-1'],
  linkIds: ['l-1'],
  imageAssetIds: ['i-1'],
});

const record = () =>
  ({
    id: 'p-1',
    slug: 'slug',
    titlePt: 'Titulo',
    titleEn: 'Title',
    shortDescriptionPt: 'Resumo',
    shortDescriptionEn: 'Summary',
    fullDescriptionPt: 'Descricao',
    fullDescriptionEn: 'Description',
    context: 'PROFESSIONAL',
    status: 'COMPLETED',
    environment: 'FRONTEND',
    featured: false,
    highlight: true,
    startDate: null,
    endDate: null,
    sortOrder: 1,
    technologyRelations: [{ technologyId: 't-1' }],
    experienceIds: ['e-1'],
    tagIds: ['tag-1'],
    linkIds: ['l-1'],
    imageAssetIds: ['i-1'],
  }) as never;

describe('projects operations types', () => {
  it('creates defaults, resolves relations and maps records', () => {
    expect(createEmptyProjectsOperationsFormValue().sortOrder).toBe('0');
    expect(
      createProjectImageAssetOption({
        id: 'image-1',
        fileName: 'logo.png',
        filePath: '/assets/logo.png',
        folder: 'assets',
        kind: 'PNG',
        mimeType: 'image/png',
      } as never).id,
    ).toBe('image-1');
    expect(projectRelationId({ technologyId: 't-1' } as never, 'technology')).toBe('t-1');
    expect(projectRelationId({ technology: { id: 't-2' } } as never, 'technology')).toBe('t-2');
    expect(projectRelationId({} as never, 'technology')).toBeNull();
    for (const key of ['technology', 'experience', 'tag', 'link', 'imageAsset'] as const)
      expect(normalizeProjectRelationIds(record(), key).length).toBe(1);
    expect(buildProjectsFormValue(null).slug).toBe('');
    expect(buildProjectsFormValue(record()).startDate).toBe('');
    expect(
      buildProjectsFormValue({
        ...(record() as object),
        startDate: '2026-01-01',
        endDate: '2026-02-01',
        featured: undefined,
        highlight: undefined,
        sortOrder: undefined,
      } as never).startDate,
    ).toBe('2026-01-01');
  });

  it('builds a valid deduplicated mutation payload', () => {
    const result = buildProjectsMutationPayload(form());
    expect(result.isValid).toBeTrue();
    if (result.isValid) {
      expect(result.payload.experienceIds).toEqual(['e-1']);
      expect(result.payload.technologyRelations).toEqual([{ technologyId: 't-1' }]);
    }
  });

  it('normalizes all project relation response shapes', () => {
    const publicRecord = {
      ...(record() as object),
      technologyIds: ['t-direct'],
      technologyRelations: [{ technologyId: 't-relation' }],
      technologies: ['t-string', { technology: { id: 't-nested' } }, { id: 't-public' }],
      experienceIds: ['e-direct'],
      experiences: [{ experienceId: 'e-relation' }, { experience: { id: 'e-nested' } }],
      tagIds: ['tag-direct'],
      tags: [{ tag: { id: 'tag-nested' } }],
      linkIds: ['link-direct'],
      links: [{ id: 'link-public' }],
      imageAssetIds: ['image-direct'],
      imageAssets: [{ imageAssetId: 'image-relation' }],
    } as never;

    expect(normalizeProjectRelationIds(publicRecord, 'technology')).toEqual([
      't-direct',
      't-relation',
      't-string',
      't-nested',
      't-public',
    ]);
    expect(normalizeProjectRelationIds(publicRecord, 'experience')).toEqual([
      'e-direct',
      'e-relation',
      'e-nested',
    ]);
    expect(normalizeProjectRelationIds(publicRecord, 'tag')).toEqual(['tag-direct', 'tag-nested']);
    expect(normalizeProjectRelationIds(publicRecord, 'link')).toEqual([
      'link-direct',
      'link-public',
    ]);
    expect(normalizeProjectRelationIds(publicRecord, 'imageAsset')).toEqual([
      'image-direct',
      'image-relation',
    ]);
  });

  it('rejects missing fields, options and invalid sort order', () => {
    for (const key of [
      'slug',
      'titlePt',
      'titleEn',
      'shortDescriptionPt',
      'shortDescriptionEn',
      'fullDescriptionPt',
      'fullDescriptionEn',
    ] as const)
      expect(buildProjectsMutationPayload({ ...form(), [key]: '' }).isValid).toBeFalse();
    expect(buildProjectsMutationPayload({ ...form(), sortOrder: 'x' }).isValid).toBeFalse();
    for (const key of ['context', 'status', 'environment'] as const)
      expect(buildProjectsMutationPayload({ ...form(), [key]: '' }).isValid).toBeFalse();
    expect(
      buildProjectsMutationPayload({
        ...form(),
        context: 'INVALID' as never,
      }).isValid,
    ).toBeFalse();
    expect(
      buildProjectsMutationPayload({
        ...form(),
        startDate: '2026-03-01',
        endDate: '2026-02-01',
      }).isValid,
    ).toBeFalse();
  });
});
