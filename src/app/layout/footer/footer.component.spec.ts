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

  it('should render the footer copy, quick links, and design-lib tags', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.componentRef.setInput('navigationItems', [
      {
        path: '/home',
        label: 'Home',
      },
      {
        path: '/dashboard',
        label: 'Dashboard',
      },
    ]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain(
      'Layout foundation ready for the next page builds',
    );
    expect(compiled.querySelector('hans-button[label="Home"]')).toBeTruthy();
    expect(compiled.querySelector('hans-button[label="Dashboard"]')).toBeTruthy();
    expect(compiled.querySelectorAll('hans-tag')).toHaveSize(3);
  });
});
