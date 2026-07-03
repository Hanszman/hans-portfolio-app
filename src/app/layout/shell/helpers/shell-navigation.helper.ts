import { Route, Routes } from '@angular/router';
import { AppTranslationKey } from '../../../core/translation/translation.types';
import { readNavigationItems } from '../../navigation/helpers/navigation.helper';
import { NavigationItem } from '../../navigation/navigation.types';

const hasNavigationLabelKey = (
  path: string,
  navigationLabelKeyByPath: Readonly<Record<string, AppTranslationKey>>,
): path is keyof typeof navigationLabelKeyByPath => path in navigationLabelKeyByPath;

export const buildShellNavigationItems = (
  routes: Routes,
  translate: (key: AppTranslationKey) => string,
  navigationLabelKeyByPath: Readonly<Record<string, AppTranslationKey>>,
): NavigationItem[] =>
  readNavigationItems(routes)
    .filter((item) => hasNavigationLabelKey(item.path, navigationLabelKeyByPath))
    .map((item) => ({
      ...item,
      label: translate(navigationLabelKeyByPath[item.path]),
    }));

export const extractChildRoutes = (route: Route | undefined): Routes =>
  route?.children ?? [];
