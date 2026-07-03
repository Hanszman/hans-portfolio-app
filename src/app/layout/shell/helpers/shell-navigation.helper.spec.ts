import { AppTranslationKey } from '../../../core/translation/translation.types';
import {
  buildShellNavigationItems,
  extractChildRoutes,
} from './shell-navigation.helper';

class TestRouteComponent {}

describe('shellNavigationHelper', () => {
  const navigationLabelKeyByPath = {
    '/home': 'header.navigation.home',
    '/projects': 'header.navigation.projects',
  } satisfies Record<string, AppTranslationKey>;

  it('should build translated shell navigation items from supported routes only', () => {
    const translate = (key: AppTranslationKey): string => {
      if (key === 'header.navigation.home') {
        return 'Home';
      }

      if (key === 'header.navigation.projects') {
        return 'Projects';
      }

      return key;
    };

    expect(
      buildShellNavigationItems(
        [
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
                path: 'admin',
                component: TestRouteComponent,
              },
            ],
          },
        ],
        translate,
        navigationLabelKeyByPath,
      ),
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

  it('should extract only the children from the provided parent route', () => {
    expect(
      extractChildRoutes({
        path: '',
        children: [
          {
            path: 'home',
            component: TestRouteComponent,
          },
        ],
      }),
    ).toEqual([
      {
        path: 'home',
        component: TestRouteComponent,
      },
    ]);
  });

  it('should return an empty route collection when the parent route is missing', () => {
    expect(extractChildRoutes(undefined)).toEqual([]);
  });
});
