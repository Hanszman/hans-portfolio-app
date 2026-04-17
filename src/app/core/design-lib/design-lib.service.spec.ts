import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PORTFOLIO_THEMES } from '../theme/portfolio-theme';
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

    expect(service.applyTheme(PORTFOLIO_THEMES.light)).toBeTrue();
    expect(setTheme).toHaveBeenCalledOnceWith(PORTFOLIO_THEMES.light);
  });

  it('should report that theme application is pending when the CDN API is unavailable', () => {
    const service = TestBed.inject(DesignLibService);

    expect(service.applyTheme(PORTFOLIO_THEMES.light)).toBeFalse();
  });

  it('should read the required design-lib component contract', () => {
    if (!customElements.get('hans-button')) {
      customElements.define('hans-button', class extends HTMLElement {});
    }

    const service = TestBed.inject(DesignLibService);
    const status = service.readContractStatus();

    expect(status.themeApiAvailable).toBeFalse();
    expect(status.components).toContain({
      tag: 'hans-button',
      isRegistered: true,
    });
    expect(status.missingComponents).toContain('hans-tag');
  });
});
