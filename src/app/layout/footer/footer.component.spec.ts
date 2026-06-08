import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { FooterComponent } from './footer.component';

@Component({
  template: '',
})
class TestRouteComponent {}

describe('FooterComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        provideRouter([
          {
            path: 'home',
            component: TestRouteComponent,
          },
          {
            path: 'dashboard',
            component: TestRouteComponent,
          },
        ]),
      ],
    }).compileComponents();
  });

  it('should render the legacy-inspired social footer and copyright', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const copyButton = compiled.querySelector('.footer-copyright-button') as
      | (HTMLElement & { label?: string })
      | null;

    expect(compiled.querySelectorAll('app-social-links hans-button.social-links-button')).toHaveSize(4);
    expect(compiled.textContent).toContain('Belo Horizonte, Brazil');
    expect(copyButton?.label).toBe('Victor Hanszman');
    expect(compiled.textContent).toContain(String(new Date().getFullYear()));
  });

});
