import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TruncatedTextComponent } from './truncated-text.component';

describe('TruncatedTextComponent', () => {
  let fixture: ComponentFixture<TruncatedTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TruncatedTextComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TruncatedTextComponent);
  });

  it('should render the full text when it fits the limit', () => {
    fixture.componentRef.setInput('text', 'Short text');
    fixture.componentRef.setInput('maxLength', 20);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent.trim()).toBe('Short text');
    expect(fixture.nativeElement.getAttribute('title')).toBe('Short text');
  });

  it('should truncate the rendered text when it exceeds the limit', () => {
    fixture.componentRef.setInput('text', 'This is a very long text for truncation');
    fixture.componentRef.setInput('maxLength', 12);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent.trim()).toBe('This is a...');
    expect(fixture.nativeElement.getAttribute('title')).toBe(
      'This is a very long text for truncation',
    );
  });

  it('should enforce a minimum safe truncation length and allow hiding the title', () => {
    fixture.componentRef.setInput('text', 'abcdef');
    fixture.componentRef.setInput('maxLength', 1);
    fixture.componentRef.setInput('showTitle', false);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent.trim()).toBe('...');
    expect(fixture.nativeElement.getAttribute('title')).toBeNull();
  });
});
