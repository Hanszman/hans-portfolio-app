import { AdminPortfolioSettingRecord } from '../../../core/api/admin-portfolio-settings/admin-portfolio-settings-api.types';
import {
  AdminPortfolioSettingsFormValue,
  AdminPortfolioSettingsJsonParseResult,
  AdminPortfolioSettingViewModel,
  createAdminPortfolioSettingsViewModel,
  createEmptyAdminPortfolioSettingsFormValue,
} from '../components/admin-portfolio-settings-workspace/admin-portfolio-settings-workspace.types';

export const buildAdminPortfolioSettingsViewModels = (
  settings: readonly AdminPortfolioSettingRecord[],
): readonly AdminPortfolioSettingViewModel[] =>
  [...settings]
    .sort((left, right) => left.key.localeCompare(right.key))
    .map(createAdminPortfolioSettingsViewModel);

export const buildAdminPortfolioSettingsFormValue = (
  setting?: AdminPortfolioSettingRecord | null,
): AdminPortfolioSettingsFormValue => {
  if (!setting) {
    return createEmptyAdminPortfolioSettingsFormValue();
  }

  return {
    key: setting.key,
    valueText: JSON.stringify(setting.value, null, 2),
    description: setting.description,
  };
};

export const parseAdminPortfolioSettingsJsonValue = (
  valueText: string,
): AdminPortfolioSettingsJsonParseResult => {
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
