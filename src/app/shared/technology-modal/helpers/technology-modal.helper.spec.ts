import { buildTechnologyModalDetail } from './technology-modal.helper';

describe('technology modal helper', () => {
  it('should build a modal detail when the value is present', () => {
    expect(
      buildTechnologyModalDetail('pages.experiences.technology.projects', 4),
    ).toEqual({
      labelKey: 'pages.experiences.technology.projects',
      value: 4,
    });
  });

  it('should ignore missing detail values', () => {
    expect(
      buildTechnologyModalDetail('pages.experiences.technology.category', undefined),
    ).toBeNull();
    expect(
      buildTechnologyModalDetail('pages.experiences.technology.category', ''),
    ).toBeNull();
  });
});
