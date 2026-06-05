import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { FooterCopyrightComponent } from './footer-copyright.component';

@Component({ template: '' })
class TestRouteComponent {}

describe('FooterCopyrightComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterCopyrightComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        provideRouter([{ path: 'home', component: TestRouteComponent }]),
      ],
    }).compileComponents();
  });

  it('should render copyright and navigate home', async () => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigateByUrl').and.resolveTo(true);
    const fixture = TestBed.createComponent(FooterCopyrightComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(String(new Date().getFullYear()));

    (compiled.querySelector('hans-button') as HTMLElement).click();
    await fixture.whenStable();

    expect(navigateSpy).toHaveBeenCalledWith('/home');
  });
});
