import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import {
  apiConfig,
  appConfig,
  buildAssetUrl,
  buildApiUrl,
  buildRelativeAssetPath,
  buildRelativeImageAssetPath,
  buildRelativeSkillImageAssetPath,
  IMAGE_ASSETS_ROOT_PATH,
  SKILLS_IMAGE_ASSETS_ROOT_PATH,
} from './api.config';

describe('apiConfig', () => {
  it('should expose the normalized API base URL from the environment', () => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });

    expect(apiConfig.baseUrl).toBe(environment.apiBaseUrl.replace(/\/+$/, ''));
  });

  it('should expose the normalized app base URL from the environment', () => {
    expect(appConfig.baseUrl).toBe(environment.appBaseUrl.replace(/\/+$/, ''));
  });

  it('should build API URLs for paths with or without a leading slash', () => {
    expect(buildApiUrl('system')).toBe(`${apiConfig.baseUrl}/system`);
    expect(buildApiUrl('/health')).toBe(`${apiConfig.baseUrl}/health`);
  });

  it('should build app asset URLs and keep absolute URLs untouched', () => {
    expect(buildAssetUrl('/assets/img/logo/angular.svg')).toBe(
      `${appConfig.baseUrl}/assets/img/logo/angular.svg`,
    );
    expect(buildAssetUrl('assets/img/logo/angular.svg')).toBe(
      `${appConfig.baseUrl}/assets/img/logo/angular.svg`,
    );
    expect(buildAssetUrl('img/logo/angular.svg')).toBe(
      `${appConfig.baseUrl}/assets/img/logo/angular.svg`,
    );
    expect(buildAssetUrl('https://cdn.test/avatar.png')).toBe(
      'https://cdn.test/avatar.png',
    );
    expect(buildAssetUrl(null)).toBe('');
  });

  it('should expose reusable relative asset path helpers', () => {
    expect(buildRelativeAssetPath('assets', 'img', 'logo/angular.svg')).toBe(
      '/assets/img/logo/angular.svg',
    );
    expect(buildRelativeAssetPath('', '/')).toBe('');
    expect(buildRelativeImageAssetPath('logo/angular.svg')).toBe(
      `/${IMAGE_ASSETS_ROOT_PATH}/logo/angular.svg`,
    );
    expect(buildRelativeSkillImageAssetPath('angular.png')).toBe(
      `/${SKILLS_IMAGE_ASSETS_ROOT_PATH}/angular.png`,
    );
  });
});
