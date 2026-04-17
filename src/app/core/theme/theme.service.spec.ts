import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DesignLibService } from '../design-lib/design-lib.service';
import {
  APP_THEMES,
  APP_THEME_STORAGE_KEY,
} from './theme.config';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  const createDesignLibServiceMock = () => ({
    applyTheme: jasmine.createSpy('applyTheme'),
  });

  const configureTestingModule = () => {
    const designLibService = createDesignLibServiceMock();

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: DesignLibService,
          useValue: designLibService,
        },
      ],
    });

    return designLibService;
  };

  beforeEach(() => {
    localStorage.removeItem(APP_THEME_STORAGE_KEY);
    document.documentElement.removeAttribute('data-app-theme');
    document.body.removeAttribute('data-app-theme');
  });

  afterEach(() => {
    localStorage.removeItem(APP_THEME_STORAGE_KEY);
    document.documentElement.removeAttribute('data-app-theme');
    document.body.removeAttribute('data-app-theme');
  });

  it('should start with the light theme when no persisted preference exists', () => {
    const designLibService = configureTestingModule();

    const service = TestBed.inject(ThemeService);

    expect(service.mode()).toBe('light');
    expect(service.theme()).toBe(APP_THEMES.light);
    expect(document.documentElement.getAttribute('data-app-theme')).toBe(
      'light',
    );
    expect(localStorage.getItem(APP_THEME_STORAGE_KEY)).toBe('light');
    expect(designLibService.applyTheme).toHaveBeenCalledOnceWith(
      APP_THEMES.light,
    );
  });

  it('should restore a persisted dark theme preference', () => {
    localStorage.setItem(APP_THEME_STORAGE_KEY, 'dark');
    const designLibService = configureTestingModule();

    const service = TestBed.inject(ThemeService);

    expect(service.mode()).toBe('dark');
    expect(service.nextMode()).toBe('light');
    expect(document.body.getAttribute('data-app-theme')).toBe('dark');
    expect(designLibService.applyTheme).toHaveBeenCalledOnceWith(
      APP_THEMES.dark,
    );
  });

  it('should ignore invalid persisted theme preferences', () => {
    localStorage.setItem(APP_THEME_STORAGE_KEY, 'neon');
    configureTestingModule();

    const service = TestBed.inject(ThemeService);

    expect(service.mode()).toBe('light');
  });

  it('should toggle between the light and dark theme modes', () => {
    const designLibService = configureTestingModule();
    const service = TestBed.inject(ThemeService);

    service.toggleMode();
    service.toggleMode();

    expect(service.mode()).toBe('light');
    expect(localStorage.getItem(APP_THEME_STORAGE_KEY)).toBe('light');
    expect(designLibService.applyTheme).toHaveBeenCalledWith(
      APP_THEMES.dark,
    );
    expect(designLibService.applyTheme).toHaveBeenCalledWith(
      APP_THEMES.light,
    );
  });
});
