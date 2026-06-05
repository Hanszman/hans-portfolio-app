import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { WrapperComponent } from './wrapper.component';

@Component({
  imports: [WrapperComponent],
  template: `
    <app-wrapper>
      <div page-main>Main slot</div>
      <div page-sidebar>Sidebar slot</div>
      <div page-content>Content slot</div>
    </app-wrapper>
  `,
})
class TestHostComponent {}

describe('WrapperComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should project the expected page slots', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Main slot');
    expect(compiled.textContent).toContain('Sidebar slot');
    expect(compiled.textContent).toContain('Content slot');
  });
});
