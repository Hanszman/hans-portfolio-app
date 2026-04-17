import { Injectable } from '@angular/core';
import {
  DesignLibContractStatus,
  HansThemeCombination,
  HansWindow,
} from './design-lib.types';

@Injectable({
  providedIn: 'root',
})
export class DesignLibService {
  applyTheme(theme: HansThemeCombination): boolean {
    const setTheme = this.readHansUiApi()?.setTheme;

    if (!setTheme) {
      return false;
    }

    setTheme(theme);
    return true;
  }

  readContractStatus(): DesignLibContractStatus {
    return {
      themeApiAvailable: Boolean(this.readHansUiApi()?.setTheme),
    };
  }

  private readHansUiApi() {
    return (window as HansWindow).HansUI;
  }
}
