import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PortfolioPageWrapperComponent } from './portfolio-page-wrapper.component';

@Component({
  imports: [PortfolioPageWrapperComponent],
  template: `
    <app-portfolio-page-wrapper>
      <div page-main>Main slot</div>
      <div page-sidebar>Sidebar slot</div>
      <div page-content>Content slot</div>
    </app-portfolio-page-wrapper>
  `,
})
class TestHostComponent {}

describe('PortfolioPageWrapperComponent', () => {
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
