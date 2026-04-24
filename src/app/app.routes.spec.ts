import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { DashboardService } from './core/api/dashboard/service';
import { SystemService } from './core/api/system/service';
import { createDashboardServiceMock } from './core/api/testing/dashboard.testing';
import { createSystemServiceMock } from './core/api/testing/system.testing';
import { provideAppTranslations } from './core/translation/translation.providers';
import { routes } from './app.routes';

describe('app routes', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        provideRouter(routes),
        {
          provide: SystemService,
          useValue: createSystemServiceMock(),
        },
        {
          provide: DashboardService,
          useValue: createDashboardServiceMock(),
        },
      ],
    }).compileComponents();
  });

  it('should redirect the empty path to the strategic home route', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/');

    expect(harness.routeNativeElement?.textContent).toContain(
      'Strategic portfolio home',
    );
  });

  it('should load the dashboard foundation route', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/dashboard');

    expect(harness.routeNativeElement?.textContent).toContain(
      'Dashboard foundation',
    );
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

  it('should redirect unknown routes to the strategic home route', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/not-found');

    expect(harness.routeNativeElement?.textContent).toContain(
      'Strategic portfolio home',
    );
  });
});
