import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PageWrapperComponent } from './page-wrapper.component';

@Component({
  imports: [PageWrapperComponent],
  template: `
    <app-page-wrapper>
      <div page-main>Main slot</div>
      <div page-sidebar>Sidebar slot</div>
      <div page-content>Content slot</div>
    </app-page-wrapper>
  `,
})
class TestHostComponent {}

describe('PageWrapperComponent', () => {
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
