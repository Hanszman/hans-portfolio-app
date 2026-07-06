import { AppTranslationKey } from '../../../../core/translation/translation.types';
import { AdminPortfolioSettingRecord } from '../../../../core/api/admin-portfolio-settings/admin-portfolio-settings-api.types';

export type AdminPortfolioSettingsModalMode =
  | 'create'
  | 'pick-update'
  | 'pick-delete'
  | 'update'
  | 'delete';

export interface AdminPortfolioSettingsFormValue {
  key: string;
  valueText: string;
  description: string;
}

export interface AdminPortfolioSettingViewModel {
  id: string;
  key: string;
  description: string;
  formattedValue: string;
}

export interface AdminPortfolioSettingsJsonParseSuccess {
  isValid: true;
  value: unknown;
}

export interface AdminPortfolioSettingsJsonParseFailure {
  isValid: false;
  errorKey: AppTranslationKey;
}

export type AdminPortfolioSettingsJsonParseResult =
  | AdminPortfolioSettingsJsonParseSuccess
  | AdminPortfolioSettingsJsonParseFailure;

export const createEmptyAdminPortfolioSettingsFormValue =
  (): AdminPortfolioSettingsFormValue => ({
    key: '',
    valueText: '{\n  \n}',
    description: '',
  });

export const createAdminPortfolioSettingsViewModel = (
  setting: AdminPortfolioSettingRecord,
): AdminPortfolioSettingViewModel => ({
  id: setting.id,
  key: setting.key,
  description: setting.description,
  formattedValue: JSON.stringify(setting.value, null, 2),
});
