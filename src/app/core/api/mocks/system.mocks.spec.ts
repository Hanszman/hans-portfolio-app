import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import {
  createHealthResponse,
  createSystemOverviewResponse,
  createSystemServiceMock,
} from './system.mocks';
import { apiConfig } from '../api.config';

describe('system.mocks', () => {
  it('should create the default health response and apply overrides', () => {
    expect(createHealthResponse()).toEqual({
      status: 'healthy',
      checks: {
        database: 'up',
      },
      checkedAtUtc: '2026-04-14T13:00:00.000Z',
    });
    expect(
      createHealthResponse({
        checkedAtUtc: '2026-01-01T00:00:00.000Z',
      }),
    ).toEqual({
      status: 'healthy',
      checks: {
        database: 'up',
      },
      checkedAtUtc: '2026-01-01T00:00:00.000Z',
    });
  });

  it('should create the default system overview response and apply overrides', () => {
    expect(createSystemOverviewResponse()).toEqual({
      name: 'Hans Portfolio API',
      module: 'system',
      status: 'operational',
      routes: ['/system/ping'],
    });
    expect(
      createSystemOverviewResponse({
        name: 'Hans Portfolio API - Beta',
      }),
    ).toEqual({
      name: 'Hans Portfolio API - Beta',
      module: 'system',
      status: 'operational',
      routes: ['/system/ping'],
    });
  });

  it('should create a success system service mock', async () => {
    const mock = createSystemServiceMock();

    expect(mock.apiBaseUrl).toBe(apiConfig.baseUrl);

    await expectAsync(firstValueFrom(mock.getHealth())).toBeResolvedTo(
      createHealthResponse(),
    );
  });

  it('should create a blocked system service mock', async () => {
    const mock = createSystemServiceMock('blocked');

    try {
      await firstValueFrom(mock.getHealth());
      fail('Expected the blocked health request to fail');
    } catch (error) {
      expect(error).toEqual(jasmine.objectContaining({ status: 0, statusText: 'Unknown Error' }));
      expect(error).toEqual(jasmine.any(HttpErrorResponse));
    }
  });

  it('should create a loading system service mock', () => {
    const mock = createSystemServiceMock('loading');

    expect(mock.getHealth()).toBeDefined();
  });

  it('should create a generic-error system service mock', async () => {
    const mock = createSystemServiceMock('generic-error');

    try {
      await firstValueFrom(mock.getHealth());
      fail('Expected the generic health request to fail');
    } catch (error) {
      expect(error).toEqual(jasmine.any(Error));
      expect((error as Error).message).toBe('health failed');
    }
  });
});
