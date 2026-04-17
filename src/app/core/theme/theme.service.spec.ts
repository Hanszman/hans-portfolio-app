import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DesignLibService } from '../design-lib/design-lib.service';
import {
  PORTFOLIO_THEMES,
  PORTFOLIO_THEME_STORAGE_KEY,
} from './portfolio-theme';
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
    localStorage.removeItem(PORTFOLIO_THEME_STORAGE_KEY);
    document.documentElement.removeAttribute('data-portfolio-theme');
    document.body.removeAttribute('data-portfolio-theme');
  });

  afterEach(() => {
    localStorage.removeItem(PORTFOLIO_THEME_STORAGE_KEY);
    document.documentElement.removeAttribute('data-portfolio-theme');
    document.body.removeAttribute('data-portfolio-theme');
  });

  it('should start with the light theme when no persisted preference exists', () => {
    const designLibService = configureTestingModule();

    const service = TestBed.inject(ThemeService);

    expect(service.mode()).toBe('light');
    expect(service.theme()).toBe(PORTFOLIO_THEMES.light);
    expect(document.documentElement.getAttribute('data-portfolio-theme')).toBe(
      'light',
    );
    expect(localStorage.getItem(PORTFOLIO_THEME_STORAGE_KEY)).toBe('light');
    expect(designLibService.applyTheme).toHaveBeenCalledOnceWith(
      PORTFOLIO_THEMES.light,
    );
  });

  it('should restore a persisted dark theme preference', () => {
    localStorage.setItem(PORTFOLIO_THEME_STORAGE_KEY, 'dark');
    const designLibService = configureTestingModule();

    const service = TestBed.inject(ThemeService);

    expect(service.mode()).toBe('dark');
    expect(service.nextMode()).toBe('light');
    expect(document.body.getAttribute('data-portfolio-theme')).toBe('dark');
    expect(designLibService.applyTheme).toHaveBeenCalledOnceWith(
      PORTFOLIO_THEMES.dark,
    );
  });

  it('should ignore invalid persisted theme preferences', () => {
    localStorage.setItem(PORTFOLIO_THEME_STORAGE_KEY, 'neon');
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
    expect(localStorage.getItem(PORTFOLIO_THEME_STORAGE_KEY)).toBe('light');
    expect(designLibService.applyTheme).toHaveBeenCalledWith(
      PORTFOLIO_THEMES.dark,
    );
    expect(designLibService.applyTheme).toHaveBeenCalledWith(
      PORTFOLIO_THEMES.light,
    );
  });
});
