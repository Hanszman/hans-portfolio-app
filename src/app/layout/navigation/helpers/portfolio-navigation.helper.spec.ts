import { readPortfolioNavigationItems } from './portfolio-navigation.helper';

class TestRouteComponent {}

describe('readPortfolioNavigationItems', () => {
  it('should extract navigation items from nested app routes', () => {
    expect(
      readPortfolioNavigationItems([
        {
          path: '',
          children: [
            {
              path: 'home',
              component: TestRouteComponent,
            },
            {
              path: 'projects',
              component: TestRouteComponent,
            },
            {
              path: 'case-studies',
              component: TestRouteComponent,
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
      {
        path: '/case-studies',
        label: 'Case Studies',
      },
    ]);
  });

  it('should ignore redirects, wildcard routes, and dynamic detail routes while keeping nested static children', () => {
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
                  component: TestRouteComponent,
                },
              ],
            },
            {
              path: ':projectId',
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
