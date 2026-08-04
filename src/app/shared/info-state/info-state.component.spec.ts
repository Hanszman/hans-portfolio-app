import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoStateComponent } from './info-state.component';

describe('InfoStateComponent', () => {
  let fixture: ComponentFixture<InfoStateComponent>;

  beforeAll(() => {
    if (!customElements.get('hans-loading')) {
      customElements.define('hans-loading', class extends HTMLElement {});
    }
    if (!customElements.get('hans-message')) {
      customElements.define('hans-message', class extends HTMLElement {});
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoStateComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoStateComponent);
  });

  it('renders loading state with hans loading', () => {
    fixture.componentRef.setInput('mode', 'loading');
    fixture.componentRef.setInput('message', 'Loading...');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('hans-loading')).toBeTruthy();
    expect(compiled.textContent).not.toContain('Loading...');
    expect(
      (compiled.querySelector('hans-loading') as HTMLElement & { spinnerThickness: number })
        .spinnerThickness,
    ).toBe(4);
  });

  it('renders non-loading states without spinner', () => {
    fixture.componentRef.setInput('mode', 'error');
    fixture.componentRef.setInput('message', 'Something went wrong.');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const message = compiled.querySelector('hans-message') as HTMLElement & {
      message: string;
    };
    expect(compiled.querySelector('hans-loading')).toBeFalsy();
    expect(message.message).toBe('Something went wrong.');
    expect(message.getAttribute('messageColor')).toBe('danger');
    expect(compiled.querySelector('[data-mode="error"]')).toBeTruthy();
  });

  it('renders empty states as warning messages', () => {
    fixture.componentRef.setInput('mode', 'empty');
    fixture.componentRef.setInput('message', 'Nothing here.');
    fixture.detectChanges();

    const message = fixture.nativeElement.querySelector('hans-message');
    expect(message.message).toBe('Nothing here.');
    expect(message.getAttribute('messageColor')).toBe('warning');
  });
});
