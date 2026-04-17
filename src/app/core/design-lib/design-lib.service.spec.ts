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
});
