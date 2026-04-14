import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment.generated';
import { apiConfig, buildApiUrl } from './api.config';

describe('apiConfig', () => {
  it('should expose the normalized API base URL from the environment', () => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });

    expect(apiConfig.baseUrl).toBe(environment.PORTFOLIO_API_BASE_URL.replace(/\/+$/, ''));
  });

  it('should build API URLs for paths with or without a leading slash', () => {
    expect(buildApiUrl('system')).toBe(`${apiConfig.baseUrl}/system`);
    expect(buildApiUrl('/health')).toBe(`${apiConfig.baseUrl}/health`);
  });
});
