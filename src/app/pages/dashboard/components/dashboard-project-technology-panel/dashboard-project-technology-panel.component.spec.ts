import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { DashboardProjectTechnologyPanelComponent } from './dashboard-project-technology-panel.component';

describe('DashboardProjectTechnologyPanelComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardProjectTechnologyPanelComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();
  });

  it('should resolve select values from custom event payloads and native targets', () => {
    const fixture = TestBed.createComponent(
      DashboardProjectTechnologyPanelComponent,
    );
    const component = fixture.componentInstance as unknown as {
      resolveSelectValue: (event: Event) => string;
    };

    expect(
      component.resolveSelectValue(
        new CustomEvent('change', {
          detail: 'LIBRARIES',
        }),
      ),
    ).toBe('LIBRARIES');
    expect(
      component.resolveSelectValue(
        new CustomEvent('change', {
          detail: { value: 'FRAMEWORKS' },
        }),
      ),
    ).toBe('FRAMEWORKS');
    expect(
      component.resolveSelectValue(
        {
          target: {
            value: 'PROGRAMMING_LANGUAGES',
          },
        } as unknown as Event,
      ),
    ).toBe('PROGRAMMING_LANGUAGES');
    expect(component.resolveSelectValue(new Event('change'))).toBe('');
  });
});
