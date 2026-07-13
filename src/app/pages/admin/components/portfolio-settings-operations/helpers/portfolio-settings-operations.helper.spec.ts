import { PortfolioSettingRecord } from '../../../../../core/api/admin/portfolio-settings/portfolio-settings-operations.types';
import {
  buildPortfolioSettingsFormValue,
  buildPortfolioSettingsViewModels,
  parsePortfolioSettingsJsonValue,
} from './portfolio-settings-operations.helper';
import { createPortfolioSettingOperationsViewModel } from '../portfolio-settings-operations.types';

const createSetting = (
  overrides: Partial<PortfolioSettingRecord> = {},
): PortfolioSettingRecord => ({
  id: 'setting-1',
  key: 'hero.metrics',
  value: {
    projects: 12,
  },
  description: 'Controls the highlighted portfolio metrics.',
  ...overrides,
});

describe('portfolio settings helper', () => {
  it('should sort settings by key and format the JSON value for display', () => {
    const viewModels = buildPortfolioSettingsViewModels([
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
    expect(buildPortfolioSettingsFormValue()).toEqual({
      key: '',
      valueText: '{\n  \n}',
      description: '',
    });
  });

  it('should map an existing setting into the form model', () => {
    expect(buildPortfolioSettingsFormValue(createSetting())).toEqual({
      key: 'hero.metrics',
      valueText: '{\n  "projects": 12\n}',
      description: 'Controls the highlighted portfolio metrics.',
    });
  });

  it('should map null descriptions into an empty string', () => {
    expect(
      buildPortfolioSettingsFormValue(
        createSetting({
          description: null,
        }),
      ),
    ).toEqual({
      key: 'hero.metrics',
      valueText: '{\n  "projects": 12\n}',
      description: '',
    });
  });

  it('should map null descriptions into an empty string in the view-model factory', () => {
    expect(
      createPortfolioSettingOperationsViewModel(
        createSetting({
          description: null,
        }),
      ),
    ).toEqual({
      id: 'setting-1',
      key: 'hero.metrics',
      description: '',
      formattedValue: '{\n  "projects": 12\n}',
    });
  });

  it('should parse valid JSON values', () => {
    const result = parsePortfolioSettingsJsonValue('{ "projects": 12 }');

    expect(result).toEqual({
      isValid: true,
      value: {
        projects: 12,
      },
    });
  });

  it('should return the translation key for invalid JSON values', () => {
    const result = parsePortfolioSettingsJsonValue('{ invalid }');

    expect(result).toEqual({
      isValid: false,
      errorKey: 'pages.admin.portfolioSettings.feedback.invalidJson',
    });
  });
});
