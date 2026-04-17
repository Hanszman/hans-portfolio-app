export type HansThemeTone = 'strong' | 'default' | 'neutral';

export type HansThemeSemanticKey =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'base';

export type HansThemeSemanticScale = Record<HansThemeTone, string>;

export type HansThemeCombination = Record<
  HansThemeSemanticKey,
  HansThemeSemanticScale
> & {
  backgroundColor: string;
  textColor: string;
};

export interface HansThemeApi {
  setTheme?: (theme: HansThemeCombination) => void;
  resetTheme?: () => void;
  getThemeVars?: (theme: HansThemeCombination) => Record<string, string>;
}

export interface HansWindow extends Window {
  HansUI?: HansThemeApi;
}

export interface DesignLibContractStatus {
  themeApiAvailable: boolean;
}
