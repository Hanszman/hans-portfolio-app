import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';
import { apiConfig } from './core/api/api.config';
import { SystemApiService } from './core/api/system-api.service';
import { routes } from './app.routes';

describe('app routes', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideRouter(routes),
        {
          provide: SystemApiService,
          useValue: {
            apiBaseUrl: apiConfig.baseUrl,
            getHealth: () =>
              of({
                status: 'healthy',
                checks: {
                  database: 'up',
                },
                checkedAtUtc: '2026-04-14T13:00:00.000Z',
              }),
          },
        },
      ],
    }).compileComponents();
  });

  it('should redirect the empty path to the home foundation route', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/');

    expect(harness.routeNativeElement?.textContent).toContain('Home foundation');
  });

  it('should load the dashboard foundation route', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/dashboard');

    expect(harness.routeNativeElement?.textContent).toContain('Dashboard foundation');
  });

  it('should load the experiences foundation route', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/experiences');

    expect(harness.routeNativeElement?.textContent).toContain(
      'Experiences foundation',
    );
  });

  it('should load the skills foundation route', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/skills');

    expect(harness.routeNativeElement?.textContent).toContain('Skills foundation');
  });

  it('should load the projects foundation route', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/projects');

    expect(harness.routeNativeElement?.textContent).toContain('Projects foundation');
  });

  it('should redirect unknown routes to the home foundation route', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/not-found');

    expect(harness.routeNativeElement?.textContent).toContain('Home foundation');
  });
});
