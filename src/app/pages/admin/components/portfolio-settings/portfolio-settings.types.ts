import { AppTranslationKey } from '../../../../core/translation/translation.types';
import { PortfolioSettingRecord } from '../../../../core/api/admin/portfolio-settings/portfolio-settings-api.types';

export type PortfolioSettingsModalMode =
  | 'create'
  | 'pick-update'
  | 'pick-delete'
  | 'update'
  | 'delete';

export interface PortfolioSettingsFormValue {
  key: string;
  valueText: string;
  description: string;
}

export interface PortfolioSettingViewModel {
  id: string;
  key: string;
  description: string;
  formattedValue: string;
}

export interface PortfolioSettingsJsonParseSuccess {
  isValid: true;
  value: unknown;
}

export interface PortfolioSettingsJsonParseFailure {
  isValid: false;
  errorKey: AppTranslationKey;
}

export type PortfolioSettingsJsonParseResult =
  | PortfolioSettingsJsonParseSuccess
  | PortfolioSettingsJsonParseFailure;

export const createEmptyPortfolioSettingsFormValue =
  (): PortfolioSettingsFormValue => ({
    key: '',
    valueText: '{\n  \n}',
    description: '',
  });

export const createPortfolioSettingsViewModel = (
  setting: PortfolioSettingRecord,
): PortfolioSettingViewModel => ({
  id: setting.id,
  key: setting.key,
  description: setting.description ?? '',
  formattedValue: JSON.stringify(setting.value, null, 2),
});
