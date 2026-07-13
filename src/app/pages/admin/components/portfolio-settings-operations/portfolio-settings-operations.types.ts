import { AppTranslationKey } from '../../../../core/translation/translation.types';
import { PortfolioSettingRecord } from '../../../../core/api/admin/portfolio-settings/portfolio-settings-api.types';

export type PortfolioSettingsOperationsModalMode =
  | 'create'
  | 'read'
  | 'pick-update'
  | 'pick-delete'
  | 'update'
  | 'delete';

export interface PortfolioSettingsOperationsFormValue {
  key: string;
  valueText: string;
  description: string;
}

export interface PortfolioSettingOperationsViewModel {
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

export const createEmptyPortfolioSettingsOperationsFormValue =
  (): PortfolioSettingsOperationsFormValue => ({
    key: '',
    valueText: '{\n  \n}',
    description: '',
  });

export const createPortfolioSettingOperationsViewModel = (
  setting: PortfolioSettingRecord,
): PortfolioSettingOperationsViewModel => ({
  id: setting.id,
  key: setting.key,
  description: setting.description ?? '',
  formattedValue: JSON.stringify(setting.value, null, 2),
});
