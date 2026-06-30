import { firstValueFrom } from 'rxjs';
import { createDashboardServiceMock, createDashboardOverviewResponse } from './dashboard.mocks';

describe('dashboard mocks', () => {
  it('should expose all dashboard endpoints with the same overview payload', async () => {
    const serviceMock = createDashboardServiceMock();

    await expectAsync(firstValueFrom(serviceMock.getOverview())).toBeResolvedTo(
      createDashboardOverviewResponse(),
    );
    await expectAsync(
      firstValueFrom(serviceMock.getStackDistribution()),
    ).toBeResolvedTo(createDashboardOverviewResponse().stackDistribution);
    await expectAsync(firstValueFrom(serviceMock.getProjectContexts())).toBeResolvedTo(
      createDashboardOverviewResponse().projectContexts,
    );
    await expectAsync(firstValueFrom(serviceMock.getTechnologyUsage())).toBeResolvedTo(
      createDashboardOverviewResponse().technologyUsage,
    );
    await expectAsync(
      firstValueFrom(serviceMock.getProfessionalTimeline()),
    ).toBeResolvedTo(createDashboardOverviewResponse().professionalTimeline);
    await expectAsync(firstValueFrom(serviceMock.getHighlights())).toBeResolvedTo(
      createDashboardOverviewResponse().highlights,
    );
  });

  it('should propagate overrides to every mock endpoint', async () => {
    const serviceMock = createDashboardServiceMock({
      summary: {
        ...createDashboardOverviewResponse().summary,
        projects: 99,
      },
    });

    await expectAsync(firstValueFrom(serviceMock.getOverview())).toBeResolvedTo(
      createDashboardOverviewResponse({
        summary: {
          ...createDashboardOverviewResponse().summary,
          projects: 99,
        },
      }),
    );
    await expectAsync(
      firstValueFrom(serviceMock.getStackDistribution()),
    ).toBeResolvedTo(createDashboardOverviewResponse({
      summary: {
        ...createDashboardOverviewResponse().summary,
        projects: 99,
      },
    }).stackDistribution);
  });
});
