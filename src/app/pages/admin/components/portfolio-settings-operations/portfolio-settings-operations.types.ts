import { AppTranslationKey } from '../../../../core/translation/translation.types';
import { PortfolioSettingRecord } from '../../../../core/api/admin/portfolio-settings/portfolio-settings-operations.types';
import { AdminFormFieldConfig } from '../../admin.types';

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

export const PORTFOLIO_SETTINGS_OPERATIONS_FIELDS = {
  key: {
    labelKey: 'pages.admin.portfolioSettings.fields.key.label',
    placeholderKey: 'pages.admin.portfolioSettings.fields.key.placeholder',
    required: true,
  },
  description: {
    labelKey: 'pages.admin.portfolioSettings.fields.description.label',
    placeholderKey: 'pages.admin.portfolioSettings.fields.description.placeholder',
  },
  valueText: {
    labelKey: 'pages.admin.portfolioSettings.fields.value.label',
    placeholderKey: 'pages.admin.portfolioSettings.fields.value.placeholder',
    required: true,
  },
} as const satisfies Record<string, AdminFormFieldConfig>;

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
