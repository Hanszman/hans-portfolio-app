import { PortfolioSettingRecord } from '../../../../../core/api/admin/portfolio-settings/portfolio-settings-api.types';
import {
  PortfolioSettingsFormValue,
  PortfolioSettingsJsonParseResult,
  PortfolioSettingViewModel,
  createEmptyPortfolioSettingsFormValue,
  createPortfolioSettingsViewModel,
} from '../portfolio-settings.types';

export const buildPortfolioSettingsViewModels = (
  settings: readonly PortfolioSettingRecord[],
): readonly PortfolioSettingViewModel[] =>
  [...settings]
    .sort((left, right) => left.key.localeCompare(right.key))
    .map(createPortfolioSettingsViewModel);

export const buildPortfolioSettingsFormValue = (
  setting?: PortfolioSettingRecord | null,
): PortfolioSettingsFormValue => {
  if (!setting) {
    return createEmptyPortfolioSettingsFormValue();
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
