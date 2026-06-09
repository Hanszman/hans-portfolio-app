import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TimelineMarkerComponent } from './timeline-marker.component';

describe('TimelineMarkerComponent', () => {
  let fixture: ComponentFixture<TimelineMarkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineMarkerComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TimelineMarkerComponent);
    fixture.detectChanges();
  });

  it('renders a line for intermediate timeline items', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.timeline-marker-dot')).toBeTruthy();
    expect(compiled.querySelector('.timeline-marker-line')).toBeTruthy();
  });

  it('hides the line for the last timeline item', () => {
    fixture.componentRef.setInput('isLast', true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.timeline-marker-line')).toBeNull();
  });
});
