import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { PORTFOLIO_THEME } from './core/config/portfolio-theme';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should apply the portfolio theme when the app initializes', () => {
    const setTheme = jasmine.createSpy('setTheme');
    (
      window as Window & {
        HansUI?: {
          setTheme?: (theme: typeof PORTFOLIO_THEME) => void;
        };
      }
    ).HansUI = {
      setTheme,
    };

    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    expect(setTheme).toHaveBeenCalledOnceWith(PORTFOLIO_THEME);
  });
});
