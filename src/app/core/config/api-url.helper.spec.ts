import { buildApiUrl } from './api-url.helper';

describe('buildApiUrl', () => {
  it('should join the base URL and path without duplicating slashes', () => {
    expect(buildApiUrl('http://localhost:3000/', '/health')).toBe(
      'http://localhost:3000/health',
    );
  });

  it('should preserve the path when the base URL already has no trailing slash', () => {
    expect(buildApiUrl('https://hans-portfolio-api.vercel.app', 'system')).toBe(
      'https://hans-portfolio-api.vercel.app/system',
    );
  });
});
