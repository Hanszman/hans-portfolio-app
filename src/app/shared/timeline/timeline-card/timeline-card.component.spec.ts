import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimelineCardComponent } from './timeline-card.component';

describe('TimelineCardComponent', () => {
  let fixture: ComponentFixture<TimelineCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineCardComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TimelineCardComponent);
  });

  it('should create timeline card shell', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should expose active state class', () => {
    fixture.componentRef.setInput('isActive', true);
    fixture.detectChanges();

    const card = fixture.nativeElement.querySelector('.timeline-card');
    expect(card.classList).toContain('timeline-card-active');
  });
});
