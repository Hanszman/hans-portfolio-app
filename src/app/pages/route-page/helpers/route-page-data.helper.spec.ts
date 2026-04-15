import { readRoutePageData } from './route-page-data.helper';

describe('readRoutePageData', () => {
  it('should return the route data when it is valid', () => {
    expect(
      readRoutePageData({
        sectionLabel: 'Page',
        title: 'Projects',
        description: 'Projects route ready.',
        summaryLabel: 'Summary',
        summaryTitle: 'Project overview',
        summaryDescription: 'A curated case-study space.',
        statusLabel: 'State',
        statusDescription: 'Everything is wired.',
      }),
    ).toEqual({
      sectionLabel: 'Page',
      title: 'Projects',
      description: 'Projects route ready.',
      summaryLabel: 'Summary',
      summaryTitle: 'Project overview',
      summaryDescription: 'A curated case-study space.',
      statusLabel: 'State',
      statusDescription: 'Everything is wired.',
    });
  });

  it('should fall back to the home foundation copy when the route data is invalid', () => {
    expect(
      readRoutePageData({
        sectionLabel: '',
        title: null,
        description: 42,
        summaryLabel: false,
        summaryTitle: undefined,
        summaryDescription: [],
        statusLabel: {},
        statusDescription: '',
      }),
    ).toEqual({
      sectionLabel: 'Foundation',
      title: 'Home foundation',
      description:
        'The home route is wired and ready for the upcoming hero, highlights, and API-driven portfolio summary.',
      summaryLabel: 'Roadmap',
      summaryTitle: 'Hero, highlights and API-driven overview',
      summaryDescription:
        'The home route will introduce Victor, reinforce positioning, and surface the first backend-driven summary cards.',
      statusLabel: 'Status',
      statusDescription:
        'This route already sits inside the new portfolio shell and is ready for the upcoming hero, highlights, and API-driven summary implementation.',
    });
  });
});
