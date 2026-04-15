import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { PortfolioNavigationComponent } from './portfolio-navigation.component';

@Component({
  template: '',
})
class TestRouteComponent {}

describe('PortfolioNavigationComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioNavigationComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([
          {
            path: 'home',
            component: TestRouteComponent,
          },
          {
            path: 'projects',
            component: TestRouteComponent,
          },
        ]),
      ],
    }).compileComponents();
  });

  it('should render the provided navigation items', () => {
    const fixture = TestBed.createComponent(PortfolioNavigationComponent);
    fixture.componentRef.setInput('items', [
      {
        path: '/home',
        label: 'Home',
      },
      {
        path: '/projects',
        label: 'Projects',
      },
    ]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('a');

    expect(links).toHaveSize(2);
    expect(compiled.textContent).toContain('Home');
    expect(compiled.textContent).toContain('Projects');
  });

  it('should apply the active class to the current route link', async () => {
    const router = TestBed.inject(Router);
    const fixture = TestBed.createComponent(PortfolioNavigationComponent);
    fixture.componentRef.setInput('items', [
      {
        path: '/home',
        label: 'Home',
      },
      {
        path: '/projects',
        label: 'Projects',
      },
    ]);

    await router.navigateByUrl('/projects');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const activeLink = (fixture.nativeElement as HTMLElement).querySelector(
      '.portfolio-navigation-link-active',
    );

    expect(activeLink?.textContent).toContain('Projects');
  });
});
