import { readFoundationRouteData } from './route-data.helper';

describe('readFoundationRouteData', () => {
  it('should return the route data when it is valid', () => {
    expect(
      readFoundationRouteData({
        sectionLabel: 'Page',
        title: 'Projects',
        description: 'Projects route ready.',
      }),
    ).toEqual({
      sectionLabel: 'Page',
      title: 'Projects',
      description: 'Projects route ready.',
    });
  });

  it('should fall back to the home foundation copy when the route data is invalid', () => {
    expect(
      readFoundationRouteData({
        sectionLabel: '',
        title: null,
        description: 42,
      }),
    ).toEqual({
      sectionLabel: 'Foundation',
      title: 'Home foundation',
      description:
        'The home route is wired and ready for the upcoming hero, highlights, and API-driven portfolio summary.',
    });
  });
});
