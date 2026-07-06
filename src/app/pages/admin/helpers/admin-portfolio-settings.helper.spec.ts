import { AdminPortfolioSettingRecord } from '../../../core/api/admin-portfolio-settings/admin-portfolio-settings-api.types';
import {
  buildAdminPortfolioSettingsFormValue,
  buildAdminPortfolioSettingsViewModels,
  parseAdminPortfolioSettingsJsonValue,
} from './admin-portfolio-settings.helper';

const createSetting = (
  overrides: Partial<AdminPortfolioSettingRecord> = {},
): AdminPortfolioSettingRecord => ({
  id: 'setting-1',
  key: 'hero.metrics',
  value: {
    projects: 12,
  },
  description: 'Controls the highlighted portfolio metrics.',
  ...overrides,
});

describe('admin portfolio settings helper', () => {
  it('should sort settings by key and format the JSON value for display', () => {
    const viewModels = buildAdminPortfolioSettingsViewModels([
      createSetting({
        id: 'setting-2',
        key: 'zeta.setting',
      }),
      createSetting({
        id: 'setting-1',
        key: 'alpha.setting',
      }),
    ]);

    expect(viewModels.map((viewModel) => viewModel.key)).toEqual([
      'alpha.setting',
      'zeta.setting',
    ]);
    expect(viewModels[0].formattedValue).toContain('"projects": 12');
  });

  it('should create an empty form value when no setting is provided', () => {
    expect(buildAdminPortfolioSettingsFormValue()).toEqual({
      key: '',
      valueText: '{\n  \n}',
      description: '',
    });
  });

  it('should map an existing setting into the form model', () => {
    expect(buildAdminPortfolioSettingsFormValue(createSetting())).toEqual({
      key: 'hero.metrics',
      valueText: '{\n  "projects": 12\n}',
      description: 'Controls the highlighted portfolio metrics.',
    });
  });

  it('should parse valid JSON values', () => {
    const result = parseAdminPortfolioSettingsJsonValue('{ "projects": 12 }');

    expect(result).toEqual({
      isValid: true,
      value: {
        projects: 12,
      },
    });
  });

  it('should return the translation key for invalid JSON values', () => {
    const result = parseAdminPortfolioSettingsJsonValue('{ invalid }');

    expect(result).toEqual({
      isValid: false,
      errorKey: 'pages.admin.portfolioSettings.feedback.invalidJson',
    });
  });
});
