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

  async waitForElementStyles(element: HTMLElement): Promise<boolean> {
    const elementName = element.localName;

    if (elementName.includes('-') && !customElements.get(elementName)) {
      await customElements.whenDefined(elementName);
    }

    const stylesheets = [
      ...(element.shadowRoot?.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]') ?? []),
    ];
    const results = await Promise.all(stylesheets.map((stylesheet) => this.waitForStylesheet(stylesheet)));

    return results.every(Boolean);
  }

  private readHansUiApi() {
    return (window as HansWindow).HansUI;
  }

  private waitForStylesheet(stylesheet: HTMLLinkElement): Promise<boolean> {
    if (stylesheet.sheet) {
      return Promise.resolve(true);
    }

    return new Promise((resolve) => {
      stylesheet.addEventListener('load', () => resolve(true), { once: true });
      stylesheet.addEventListener('error', () => resolve(false), { once: true });
    });
  }
}
