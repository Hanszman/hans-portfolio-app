import {
  createEmptyJobsOperationsFormValue,
  createJobExperienceOptionViewModel,
  resolveJobExperienceIdFromRelation,
} from './jobs-operations.types';

describe('jobs operations types', () => {
  it('should expose the empty form defaults', () => {
    expect(createEmptyJobsOperationsFormValue()).toEqual({
      slug: '',
      namePt: '',
      nameEn: '',
      nameEs: '',
      summaryPt: '',
      summaryEn: '',
      summaryEs: '',
      startDate: '',
      endDate: '',
      highlight: true,
      sortOrder: '0',
      experienceIds: [],
    });
  });

  it('should map the option view-model helpers', () => {
    expect(
      createJobExperienceOptionViewModel({
        id: 'experience-1',
        slug: 'ford-account',
        companyName: 'Ford',
        titlePt: 'Analista',
        titleEn: 'Analyst',
        titleEs: 'Analyst',
        summaryPt: 'Resumo',
        summaryEn: 'Summary',
        summaryEs: 'Summary',
        descriptionPt: 'Descricao',
        descriptionEn: 'Description',
        descriptionEs: 'Description',
        startDate: '2024-01-01',
        endDate: null,
        isCurrent: true,
        highlight: true,
        sortOrder: 1,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        technologies: [],
        projects: [],
        customers: [],
        jobs: [],
        links: [],
        imageAssets: [],
      }),
    ).toEqual({
      id: 'experience-1',
      title: 'Analista',
      subtitle: 'Ford',
    });
  });

  it('should resolve relation identifiers from direct or nested records', () => {
    expect(
      resolveJobExperienceIdFromRelation({
        experienceId: 'experience-1',
      }),
    ).toBe('experience-1');
    expect(
      resolveJobExperienceIdFromRelation({
        experienceId: '',
        experience: {
          id: 'experience-2',
          slug: 'banking',
          companyName: 'Acme',
          titlePt: 'Consultor',
          titleEn: 'Consultant',
          titleEs: 'Consultant',
        },
      }),
    ).toBe('experience-2');
    expect(resolveJobExperienceIdFromRelation({})).toBeNull();
  });
});
