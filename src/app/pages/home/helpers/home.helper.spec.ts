import { createProjectsCollectionResponse } from '../../../core/api/mocks/projects.mocks';
import { mapHighlightedProjects, formatCountInFiveStep } from './home.helper';

describe('home helpers', () => {
  it('should floor non-negative counts to a multiple of five', () => {
    expect(formatCountInFiveStep(64)).toBe('60+');
    expect(formatCountInFiveStep(25)).toBe('25+');
    expect(formatCountInFiveStep(3)).toBe('0+');
    expect(formatCountInFiveStep(-4)).toBe('0+');
  });

  it('should map only highlighted projects with localized card and modal content', () => {
    const response = createProjectsCollectionResponse();
    const highlightedProjects = mapHighlightedProjects(response.data, 'en-us');

    expect(highlightedProjects.length).toBeGreaterThan(0);
    expect(highlightedProjects.every(({ project }) => project.title.length > 0)).toBeTrue();
    expect(highlightedProjects.map(({ id }) => id)).toEqual(
      response.data.filter(({ highlight }) => highlight).map(({ id }) => id),
    );
  });
});
