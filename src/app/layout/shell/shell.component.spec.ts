import { HttpErrorResponse } from '@angular/common/http';
import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NEVER, of, throwError } from 'rxjs';
import { apiConfig } from '../../core/api/api.config';
import { SystemApiService } from '../../core/api/system-api.service';
import { ShellComponent } from './shell.component';

@Component({
  template: '',
})
class TestRouteComponent {}

describe('ShellComponent', () => {
  const createSystemApiServiceMock = (
    mode: 'success' | 'blocked' | 'generic-error' | 'loading',
  ) => ({
    apiBaseUrl: apiConfig.baseUrl,
    getHealth: () =>
      mode === 'success'
        ? of({
            status: 'healthy' as const,
            checks: {
              database: 'up' as const,
            },
            checkedAtUtc: '2026-04-14T13:00:00.000Z',
          })
        : mode === 'blocked'
          ? throwError(
              () =>
                new HttpErrorResponse({
                  status: 0,
                  statusText: 'Unknown Error',
              }),
            )
          : mode === 'loading'
            ? NEVER
            : throwError(() => new Error('health failed')),
  });

  const configureTestingModule = async (
    mode: 'success' | 'blocked' | 'generic-error' | 'loading',
  ) => {
    await TestBed.configureTestingModule({
      imports: [ShellComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([
          {
            path: '',
            children: [
              {
                path: 'home',
                component: TestRouteComponent,
              },
              {
                path: 'projects',
                component: TestRouteComponent,
              },
            ],
          },
        ]),
        {
          provide: SystemApiService,
          useValue: createSystemApiServiceMock(mode),
        },
      ],
    }).compileComponents();
  };

  it('should render the connected API status when the health check succeeds', async () => {
    await configureTestingModule('success');

    const fixture = TestBed.createComponent(ShellComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('API connected');
    expect(compiled.textContent).toContain('2026-04-14T13:00:00.000Z');
    expect(compiled.textContent).toContain(apiConfig.baseUrl);
    expect(compiled.textContent).toContain('Victor Hanszman');
    expect(compiled.querySelector('hans-button[label="Projects"]')).toBeTruthy();
  });

  it('should render the loading API status while the health check is pending', async () => {
    await configureTestingModule('loading');

    const fixture = TestBed.createComponent(ShellComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Connecting to API');
    expect(compiled.querySelector('.surface-warning')).toBeTruthy();
  });

  it('should render the error API status when the health check fails', async () => {
    await configureTestingModule('blocked');

    const fixture = TestBed.createComponent(ShellComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('API request blocked');
    expect(compiled.textContent).toContain('CORS or network policy');
    expect(compiled.textContent).toContain(apiConfig.baseUrl);
  });

  it('should render the generic API error status when the health check fails for another reason', async () => {
    await configureTestingModule('generic-error');

    const fixture = TestBed.createComponent(ShellComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('API request failed');
    expect(compiled.textContent).toContain(
      'The initial backend health check could not be completed for the current environment.',
    );
    expect(compiled.textContent).toContain(apiConfig.baseUrl);
  });
});
