import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PortfolioHeaderComponent } from './portfolio-header.component';

@Component({
  template: '',
})
class TestRouteComponent {}

describe('PortfolioHeaderComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioHeaderComponent],
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

  it('should render the brand, shell message, and navigation', () => {
    const fixture = TestBed.createComponent(PortfolioHeaderComponent);
    fixture.componentRef.setInput('navigationItems', [
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

    expect(compiled.textContent).toContain('Victor Hanszman');
    expect(compiled.textContent).toContain(
      'A shell specific to the portfolio, already connected to real backend data.',
    );
    expect(compiled.querySelectorAll('hans-tag')).toHaveSize(3);
    expect(compiled.querySelector('hans-button[label="Home"]')).toBeTruthy();
    expect(compiled.querySelector('hans-button[label="Projects"]')).toBeTruthy();
  });
});
