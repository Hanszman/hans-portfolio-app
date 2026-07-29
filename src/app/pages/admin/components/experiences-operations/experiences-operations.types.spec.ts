import {
  buildExperiencesFormValue,
  buildExperiencesMutationPayload,
  createEmptyExperiencesOperationsFormValue,
  createExperienceImageAssetOption,
  normalizeRelationIds,
  relationId,
} from './experiences-operations.types';

const form = () => ({
  ...createEmptyExperiencesOperationsFormValue(),
  slug: 'slug',
  companyName: 'Company',
  titlePt: 'Titulo',
  titleEn: 'Title',
  summaryPt: 'Resumo',
  summaryEn: 'Summary',
  descriptionPt: 'Descricao',
  descriptionEn: 'Description',
  startDate: '2026-01-01',
  endDate: '2026-02-01',
  sortOrder: '1',
  technologyIds: ['t-1', 't-1'],
  projectIds: ['p-1', 'p-1'],
  customerIds: ['c-1'],
  jobIds: ['j-1'],
  linkIds: ['l-1'],
  imageAssetIds: ['i-1', 'i-1'],
});

const record = () =>
  ({
    id: 'e-1',
    slug: 'slug',
    companyName: 'Company',
    titlePt: 'Titulo',
    titleEn: 'Title',
    summaryPt: 'Resumo',
    summaryEn: 'Summary',
    descriptionPt: 'Descricao',
    descriptionEn: 'Description',
    startDate: '2026-01-01',
    endDate: null,
    isCurrent: false,
    highlight: true,
    sortOrder: 2,
    technologyRelations: [{ technologyId: 't-1' }],
    projectIds: ['p-1'],
    customerIds: ['c-1'],
    jobIds: ['j-1'],
    linkIds: ['l-1'],
    imageAssetIds: ['i-1'],
  }) as never;

describe('experiences operations types', () => {
  it('creates defaults and maps direct and nested technology relations', () => {
    expect(createEmptyExperiencesOperationsFormValue().sortOrder).toBe('0');
    expect(
      createExperienceImageAssetOption({
        id: 'image-1',
        fileName: 'logo.png',
        filePath: '/assets/logo.png',
        folder: 'assets',
        kind: 'PNG',
        mimeType: 'image/png',
      } as never).id,
    ).toBe('image-1');
    expect(relationId({ technologyId: 't-1' } as never, 'technologyId')).toBe('t-1');
    expect(
      relationId({ technologyId: '', technology: { id: 't-2' } } as never, 'technologyId'),
    ).toBe('t-2');
    expect(relationId({} as never, 'technologyId')).toBeNull();
    expect(normalizeRelationIds(record(), 'technologyId')).toEqual(['t-1']);
    expect(normalizeRelationIds(record(), 'projectId')).toEqual(['p-1']);
    expect(normalizeRelationIds(record(), 'customerId')).toEqual(['c-1']);
    expect(normalizeRelationIds(record(), 'jobId')).toEqual(['j-1']);
    expect(normalizeRelationIds(record(), 'linkId')).toEqual(['l-1']);
    expect(normalizeRelationIds(record(), 'imageAssetId')).toEqual(['i-1']);
  });

  it('builds form values and a deduplicated payload', () => {
    expect(buildExperiencesFormValue(null).slug).toBe('');
    expect(buildExperiencesFormValue(record()).endDate).toBe('');
    expect(
      buildExperiencesFormValue({
        ...(record() as object),
        endDate: '2026-03-01',
        isCurrent: undefined,
        highlight: undefined,
        sortOrder: undefined,
      } as never).endDate,
    ).toBe('2026-03-01');
    const result = buildExperiencesMutationPayload(form());
    expect(result.isValid).toBeTrue();
    if (result.isValid) {
      expect(result.payload.technologyRelations).toEqual([{ technologyId: 't-1' }]);
      expect(result.payload.projectIds).toEqual(['p-1']);
      expect(result.payload.endDate).toBe('2026-02-01T00:00:00.000Z');
    }
  });

  it('normalizes missing direct relation arrays and public nested relations', () => {
    const publicRecord = {
      ...(record() as object),
      technologyRelations: [],
      projectIds: undefined,
      customerIds: undefined,
      jobIds: undefined,
      linkIds: undefined,
      imageAssetIds: undefined,
      projects: [{ projectId: 'p-2' }],
      customers: [{ customerId: 'c-2' }],
      jobs: [{ jobId: 'j-2' }],
      links: [{ linkId: 'l-2' }],
      imageAssets: [{ imageAssetId: 'i-2' }],
    } as never;
    expect(normalizeRelationIds(publicRecord, 'projectId')).toEqual(['p-2']);
    expect(normalizeRelationIds(publicRecord, 'customerId')).toEqual(['c-2']);
    expect(normalizeRelationIds(publicRecord, 'jobId')).toEqual(['j-2']);
    expect(normalizeRelationIds(publicRecord, 'linkId')).toEqual(['l-2']);
    expect(normalizeRelationIds(publicRecord, 'imageAssetId')).toEqual(['i-2']);
  });

  it('normalizes every public relation shape and keeps stable unique ids', () => {
    const publicRecord = {
      ...(record() as object),
      technologyIds: ['t-direct'],
      technologyRelations: [{ technologyId: 't-relation' }, { technology: { id: 't-nested' } }],
      technologies: ['t-string', { id: 't-public' }, { technologyId: 't-direct' }],
      projectIds: ['p-direct'],
      projects: [{ projectId: 'p-relation' }, { project: { id: 'p-nested' } }],
      customerIds: ['c-direct'],
      customers: [{ customer: { id: 'c-nested' } }],
      jobIds: ['j-direct'],
      jobs: [{ id: 'j-public' }],
      linkIds: ['l-direct'],
      links: [{ linkId: 'l-relation' }],
      imageAssetIds: ['i-direct'],
      imageAssets: [{ imageAsset: { id: 'i-nested' } }],
    } as never;

    expect(normalizeRelationIds(publicRecord, 'technologyId')).toEqual([
      't-direct',
      't-relation',
      't-nested',
      't-string',
      't-public',
    ]);
    expect(normalizeRelationIds(publicRecord, 'projectId')).toEqual([
      'p-direct',
      'p-relation',
      'p-nested',
    ]);
    expect(normalizeRelationIds(publicRecord, 'customerId')).toEqual(['c-direct', 'c-nested']);
    expect(normalizeRelationIds(publicRecord, 'jobId')).toEqual(['j-direct', 'j-public']);
    expect(normalizeRelationIds(publicRecord, 'linkId')).toEqual(['l-direct', 'l-relation']);
    expect(normalizeRelationIds(publicRecord, 'imageAssetId')).toEqual(['i-direct', 'i-nested']);
  });

  it('rejects each missing required field and invalid values', () => {
    for (const key of [
      'slug',
      'companyName',
      'titlePt',
      'titleEn',
      'summaryPt',
      'summaryEn',
      'descriptionPt',
      'descriptionEn',
    ] as const)
      expect(buildExperiencesMutationPayload({ ...form(), [key]: '' }).isValid).toBeFalse();
    expect(buildExperiencesMutationPayload({ ...form(), startDate: '' }).isValid).toBeFalse();
    expect(buildExperiencesMutationPayload({ ...form(), sortOrder: 'x' }).isValid).toBeFalse();
    expect(
      buildExperiencesMutationPayload({
        ...form(),
        startDate: '2026-03-01',
        endDate: '2026-02-01',
      }).isValid,
    ).toBeFalse();
  });
});
