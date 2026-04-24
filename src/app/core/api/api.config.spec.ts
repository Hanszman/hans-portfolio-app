import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { apiConfig, buildApiAssetUrl, buildApiUrl } from './api.config';

describe('apiConfig', () => {
  it('should expose the normalized API base URL from the environment', () => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });

    expect(apiConfig.baseUrl).toBe(environment.apiBaseUrl.replace(/\/+$/, ''));
  });

  it('should build API URLs for paths with or without a leading slash', () => {
    expect(buildApiUrl('system')).toBe(`${apiConfig.baseUrl}/system`);
    expect(buildApiUrl('/health')).toBe(`${apiConfig.baseUrl}/health`);
  });

  it('should build API asset URLs and keep absolute URLs untouched', () => {
    expect(buildApiAssetUrl('/assets/img/logo/angular.svg')).toBe(
      `${apiConfig.baseUrl}/assets/img/logo/angular.svg`,
    );
    expect(buildApiAssetUrl('assets/img/logo/angular.svg')).toBe(
      `${apiConfig.baseUrl}/assets/img/logo/angular.svg`,
    );
    expect(buildApiAssetUrl('https://cdn.test/avatar.png')).toBe(
      'https://cdn.test/avatar.png',
    );
    expect(buildApiAssetUrl(null)).toBe('');
  });
});
