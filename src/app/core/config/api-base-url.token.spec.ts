import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { API_BASE_URL } from './api-base-url.token';

describe('API_BASE_URL', () => {
  it('should resolve the API base URL from the app environment factory', () => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });

    expect(TestBed.inject(API_BASE_URL)).toBe('http://localhost:3000');
  });
});
