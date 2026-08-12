import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormattedTextComponent } from './formatted-text.component';

describe('FormattedTextComponent', () => {
  let fixture: ComponentFixture<FormattedTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormattedTextComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
    fixture = TestBed.createComponent(FormattedTextComponent);
  });

  it('renders supported formatting and lists without binding HTML', () => {
    fixture.componentRef.setInput(
      'text',
      '<script>unsafe()</script>\n- **Bold**\n- *Italic* and __underline__',
    );
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('script')).toBeNull();
    expect(element.textContent).toContain('<script>unsafe()</script>');
    expect(element.querySelector('strong')?.textContent).toBe('Bold');
    expect(element.querySelector('em')?.textContent).toBe('Italic');
    expect(element.querySelector('u')?.textContent).toBe('underline');
    expect(element.querySelectorAll('li')).toHaveSize(2);
  });
});
