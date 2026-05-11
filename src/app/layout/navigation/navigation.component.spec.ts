import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { NavigationComponent } from './navigation.component';

@Component({
  template: '',
})
class TestRouteComponent {}

describe('NavigationComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationComponent],
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
    const fixture = TestBed.createComponent(NavigationComponent);
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
    const buttons = Array.from(compiled.querySelectorAll('hans-button')) as (
      HTMLElement & { label?: string }
    )[];

    expect(buttons).toHaveSize(2);
    expect(buttons.map((button) => button.label)).toEqual(['Home', 'Projects']);
  });

  it('should expose the mobile open state class when requested', () => {
    const fixture = TestBed.createComponent(NavigationComponent);
    fixture.componentRef.setInput('items', []);
    fixture.componentRef.setInput('menuOpen', true);
    fixture.detectChanges();

    const navigation = (fixture.nativeElement as HTMLElement).querySelector('nav');

    expect(navigation?.classList.contains('navigation-open')).toBeTrue();
  });

  it('should apply the active class to the current route link', async () => {
    const router = TestBed.inject(Router);
    const fixture = TestBed.createComponent(NavigationComponent);
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

    const activeButton = (fixture.nativeElement as HTMLElement).querySelector(
      '.navigation-button-active',
    ) as (HTMLElement & { label?: string }) | null;

    expect(activeButton?.label).toBe('Projects');
  });
});
