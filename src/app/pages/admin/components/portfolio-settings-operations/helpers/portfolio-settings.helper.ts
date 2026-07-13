import { PortfolioSettingRecord } from '../../../../../core/api/admin/portfolio-settings/portfolio-settings-api.types';
import {
  PortfolioSettingsOperationsFormValue,
  PortfolioSettingsJsonParseResult,
  PortfolioSettingOperationsViewModel,
  createEmptyPortfolioSettingsOperationsFormValue,
  createPortfolioSettingOperationsViewModel,
} from '../portfolio-settings-operations.types';

export const buildPortfolioSettingsViewModels = (
  settings: readonly PortfolioSettingRecord[],
): readonly PortfolioSettingOperationsViewModel[] =>
  [...settings]
    .sort((left, right) => left.key.localeCompare(right.key))
    .map(createPortfolioSettingOperationsViewModel);

export const buildPortfolioSettingsFormValue = (
  setting?: PortfolioSettingRecord | null,
): PortfolioSettingsOperationsFormValue => {
  if (!setting) {
    return createEmptyPortfolioSettingsOperationsFormValue();
  }

  return {
    key: setting.key,
    valueText: JSON.stringify(setting.value, null, 2),
    description: setting.description ?? '',
  };
};

export const parsePortfolioSettingsJsonValue = (
  valueText: string,
): PortfolioSettingsJsonParseResult => {
  try {
    return {
      isValid: true,
      value: JSON.parse(valueText),
    };
  } catch {
    return {
      isValid: false,
      errorKey: 'pages.admin.portfolioSettings.feedback.invalidJson',
    };
  }
};
