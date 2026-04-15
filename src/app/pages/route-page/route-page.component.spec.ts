import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RoutePageComponent } from './route-page.component';

describe('RoutePageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutePageComponent],
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                sectionLabel: 'Foundation',
                title: 'Projects foundation',
                description: 'Projects route ready for case studies.',
                summaryLabel: 'Case studies',
                summaryTitle: 'Featured work, outcomes and linked assets',
                summaryDescription: 'A curated project space.',
                statusLabel: 'Status',
                statusDescription: 'This route is ready for the next implementation step.',
              },
            },
          },
        },
      ],
    }).compileComponents();
  });

  it('should render the route intro, summary, and status sections', () => {
    const fixture = TestBed.createComponent(RoutePageComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Projects foundation');
    expect(compiled.textContent).toContain(
      'Featured work, outcomes and linked assets',
    );
    expect(compiled.textContent).toContain(
      'This route is ready for the next implementation step.',
    );
    expect(compiled.textContent).toContain('Layout layer');
  });
});
