import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { APP_THEMES } from '../theme/theme.config';
import { DesignLibService } from './design-lib.service';
import { HansWindow } from './design-lib.types';

describe('DesignLibService', () => {
  const hansWindow = window as HansWindow;

  beforeEach(() => {
    delete hansWindow.HansUI;
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
  });

  it('should apply the theme through the Hans UI CDN API when it is available', () => {
    const setTheme = jasmine.createSpy('setTheme');
    hansWindow.HansUI = {
      setTheme,
    };

    const service = TestBed.inject(DesignLibService);

    expect(service.applyTheme(APP_THEMES.light)).toBeTrue();
    expect(setTheme).toHaveBeenCalledOnceWith(APP_THEMES.light);
  });

  it('should report that theme application is pending when the CDN API is unavailable', () => {
    const service = TestBed.inject(DesignLibService);

    expect(service.applyTheme(APP_THEMES.light)).toBeFalse();
  });

  it('should expose the design-lib theme API contract status', () => {
    const service = TestBed.inject(DesignLibService);

    expect(service.readContractStatus()).toEqual({
      themeApiAvailable: false,
    });
  });

  it('should report the theme API as available when the CDN exposes it', () => {
    hansWindow.HansUI = {
      setTheme: () => undefined,
    };

    const service = TestBed.inject(DesignLibService);
    const status = service.readContractStatus();

    expect(status.themeApiAvailable).toBeTrue();
  });

  it('should resolve immediately when an element has no shadow stylesheets', async () => {
    const service = TestBed.inject(DesignLibService);

    await expectAsync(service.waitForElementStyles(document.createElement('img'))).toBeResolvedTo(
      true,
    );
  });

  it('should resolve loaded shadow stylesheets without waiting for another event', async () => {
    const service = TestBed.inject(DesignLibService);
    const element = document.createElement('div');
    const root = element.attachShadow({ mode: 'open' });
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    root.append(stylesheet);
    spyOnProperty(stylesheet, 'sheet', 'get').and.returnValue({} as CSSStyleSheet);

    await expectAsync(service.waitForElementStyles(element)).toBeResolvedTo(true);
  });

  it('should wait for pending shadow stylesheets and report load failures', async () => {
    const service = TestBed.inject(DesignLibService);
    const loadedElement = document.createElement('div');
    const loadedRoot = loadedElement.attachShadow({ mode: 'open' });
    const loadedStylesheet = document.createElement('link');
    loadedStylesheet.rel = 'stylesheet';
    loadedRoot.append(loadedStylesheet);
    const loadedResult = service.waitForElementStyles(loadedElement);
    loadedStylesheet.dispatchEvent(new Event('load'));
    await expectAsync(loadedResult).toBeResolvedTo(true);

    const failedElement = document.createElement('div');
    const failedRoot = failedElement.attachShadow({ mode: 'open' });
    const failedStylesheet = document.createElement('link');
    failedStylesheet.rel = 'stylesheet';
    failedRoot.append(failedStylesheet);
    const failedResult = service.waitForElementStyles(failedElement);
    failedStylesheet.dispatchEvent(new Event('error'));
    await expectAsync(failedResult).toBeResolvedTo(false);
  });

  it('should wait for an undefined custom element before reading its styles', async () => {
    const service = TestBed.inject(DesignLibService);
    const elementName = 'design-lib-pending-styles-test';
    const element = document.createElement(elementName);
    const result = service.waitForElementStyles(element);

    if (!customElements.get(elementName)) {
      customElements.define(
        elementName,
        class extends HTMLElement {
          constructor() {
            super();
            this.attachShadow({ mode: 'open' });
          }
        },
      );
    }

    await expectAsync(result).toBeResolvedTo(true);
  });
});
