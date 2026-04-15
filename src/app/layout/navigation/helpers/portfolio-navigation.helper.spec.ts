import { readPortfolioNavigationItems } from './portfolio-navigation.helper';

describe('readPortfolioNavigationItems', () => {
  it('should extract navigation items from nested app routes', () => {
    expect(
      readPortfolioNavigationItems([
        {
          path: '',
          children: [
            {
              path: 'home',
              data: {
                navigationLabel: 'Home',
              },
            },
            {
              path: 'projects',
              data: {
                navigationLabel: 'Projects',
              },
            },
          ],
        },
      ]),
    ).toEqual([
      {
        path: '/home',
        label: 'Home',
      },
      {
        path: '/projects',
        label: 'Projects',
      },
    ]);
  });

  it('should ignore redirects, wildcard routes, routes without labels, and keep valid nested children', () => {
    expect(
      readPortfolioNavigationItems([
        {
          path: '',
          children: [
            {
              path: '',
              redirectTo: 'home',
            },
            {
              path: 'dashboard',
              children: [
                {
                  path: 'insights',
                  data: {
                    navigationLabel: 'Insights',
                  },
                },
              ],
            },
            {
              path: 'skills',
              data: {
                navigationLabel: '',
              },
            },
            {
              path: '**',
              redirectTo: 'home',
            },
          ],
        },
      ]),
    ).toEqual([
      {
        path: '/dashboard/insights',
        label: 'Insights',
      },
    ]);
  });
});
