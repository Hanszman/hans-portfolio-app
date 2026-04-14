import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { SystemApiService } from '../../core/api/system-api.service';
import { AppShellComponent } from './app-shell.component';

describe('AppShellComponent', () => {
  const createSystemApiServiceMock = (mode: 'success' | 'error') => ({
    apiBaseUrl: 'http://localhost:3000',
    getHealth: () =>
      mode === 'success'
        ? of({
            status: 'healthy' as const,
            checks: {
              database: 'up' as const,
            },
            checkedAtUtc: '2026-04-14T13:00:00.000Z',
          })
        : throwError(() => new Error('health failed')),
  });

  const configureTestingModule = async (mode: 'success' | 'error') => {
    await TestBed.configureTestingModule({
      imports: [AppShellComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        {
          provide: SystemApiService,
          useValue: createSystemApiServiceMock(mode),
        },
      ],
    }).compileComponents();
  };

  it('should render the connected API status when the health check succeeds', async () => {
    await configureTestingModule('success');

    const fixture = TestBed.createComponent(AppShellComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('API connected');
    expect(compiled.textContent).toContain('2026-04-14T13:00:00.000Z');
    expect(compiled.textContent).toContain('http://localhost:3000');
  });

  it('should render the error API status when the health check fails', async () => {
    await configureTestingModule('error');

    const fixture = TestBed.createComponent(AppShellComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('API unavailable');
    expect(compiled.textContent).toContain('http://localhost:3000');
  });
});
