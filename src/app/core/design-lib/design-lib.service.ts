import { Injectable } from '@angular/core';
import { DESIGN_LIB_REQUIRED_COMPONENTS } from './design-lib.config';
import {
  DesignLibComponentTag,
  DesignLibContractStatus,
  HansThemeCombination,
  HansWindow,
} from './design-lib.types';

@Injectable({
  providedIn: 'root',
})
export class DesignLibService {
  readonly requiredComponents = DESIGN_LIB_REQUIRED_COMPONENTS;

  applyTheme(theme: HansThemeCombination): boolean {
    const setTheme = this.readHansUiApi()?.setTheme;

    if (!setTheme) {
      return false;
    }

    setTheme(theme);
    return true;
  }

  isComponentRegistered(tag: DesignLibComponentTag): boolean {
    return Boolean(customElements.get(tag));
  }

  readContractStatus(): DesignLibContractStatus {
    const components = this.requiredComponents.map((tag) => ({
      tag,
      isRegistered: this.isComponentRegistered(tag),
    }));

    return {
      themeApiAvailable: Boolean(this.readHansUiApi()?.setTheme),
      components,
      missingComponents: components
        .filter((component) => !component.isRegistered)
        .map((component) => component.tag),
    };
  }

  private readHansUiApi() {
    return (window as HansWindow).HansUI;
  }
}
