import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { createDashboardServiceMock } from './core/api/mocks/dashboard.mocks';
import { createExperiencesServiceMock } from './core/api/mocks/experiences.mocks';
import { createProjectsServiceMock } from './core/api/mocks/projects.mocks';
import { createSystemServiceMock } from './core/api/mocks/system.mocks';
import { createTechnologiesServiceMock } from './core/api/mocks/technologies.mocks';
import { DashboardService } from './core/api/dashboard/dashboard.service';
import { ExperiencesService } from './core/api/experiences/experiences.service';
import { ProjectsService } from './core/api/projects/projects.service';
import { SystemService } from './core/api/system/system.service';
import { TechnologiesService } from './core/api/technologies/technologies.service';
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
        {
          provide: ExperiencesService,
          useValue: createExperiencesServiceMock(),
        },
        {
          provide: TechnologiesService,
          useValue: createTechnologiesServiceMock(),
        },
        {
          provide: ProjectsService,
          useValue: createProjectsServiceMock(),
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

  it('should load the experiences narrative route', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/experiences');

    expect(harness.routeNativeElement?.textContent).toContain(
      'Experience narrative',
    );
  });

  it('should load the skills technology route', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/skills');

    expect(harness.routeNativeElement?.textContent).toContain('Technology depth');
  });

  it('should load the projects case-study route', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/projects');

    expect(harness.routeNativeElement?.textContent).toContain('Project case studies');
  });

  it('should redirect unknown routes to the strategic home route', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/not-found');

    expect(harness.routeNativeElement?.textContent).toContain(
      'Strategic portfolio home',
    );
  });
});
