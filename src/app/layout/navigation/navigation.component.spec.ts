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
    const buttons = compiled.querySelectorAll('hans-button');

    expect(buttons).toHaveSize(2);
    expect(compiled.querySelector('hans-button[label="Home"]')).toBeTruthy();
    expect(compiled.querySelector('hans-button[label="Projects"]')).toBeTruthy();
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
    );

    expect(activeButton?.getAttribute('label')).toBe('Projects');
  });
});
