import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ThemeService } from '../../core/theme/theme.service';
import { ModalSkeletonComponent } from './modal-skeleton.component';

describe('ModalSkeletonComponent', () => {
  beforeAll(() => {
    if (!customElements.get('hans-loading')) {
      customElements.define('hans-loading', class extends HTMLElement {});
    }
  });

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [ModalSkeletonComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-app-theme');
    document.body.removeAttribute('data-app-theme');
  });

  it('should use primary skeletons in light mode and neutral skeletons in dark mode', () => {
    const fixture = TestBed.createComponent(ModalSkeletonComponent);
    const themeService = TestBed.inject(ThemeService);
    fixture.componentRef.setInput('width', '8rem');
    fixture.componentRef.setInput('height', '4rem');
    fixture.componentRef.setInput('ariaLabel', 'Loading modal');
    fixture.detectChanges();

    const loading = fixture.nativeElement.querySelector('hans-loading') as HTMLElement & {
      loadingColor: string;
      ariaLabel: string;
    };
    expect(loading.loadingColor).toBe('primary');
    expect(loading.ariaLabel).toBe('Loading modal');
    expect(fixture.nativeElement.style.width).toBe('8rem');
    expect(fixture.nativeElement.style.height).toBe('4rem');

    themeService.setMode('dark');
    fixture.detectChanges();
    expect(loading.loadingColor).toBe('neutral');
  });
});
