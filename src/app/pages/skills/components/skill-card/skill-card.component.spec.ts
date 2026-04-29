import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { SkillCardViewModel } from '../../skills.types';
import { SkillCardComponent } from './skill-card.component';

describe('SkillCardComponent', () => {
  let fixture: ComponentFixture<SkillCardComponent>;
  let component: SkillCardComponent;

  const item: SkillCardViewModel = {
    id: '1',
    slug: 'angular',
    name: 'Angular',
    categoryLabel: 'Framework',
    levelLabel: 'Avancado',
    frequencyLabel: 'Frequente',
    totalExperienceLabel: '7 years',
    isHighlight: true,
    iconName: 'LuBlocks',
    visualUrl: '',
    contexts: [
      {
        key: 'PROFESSIONAL',
        label: 'Profissional',
        value: '6 years',
        totalMonths: 72,
      },
    ],
    timelineEntries: [],
  };

  beforeAll(() => {
    for (const elementName of ['hans-avatar', 'hans-icon', 'hans-tag', 'hans-button']) {
      if (!customElements.get(elementName)) {
        customElements.define(elementName, class extends HTMLElement {});
      }
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillCardComponent],
      providers: [provideAppTranslations(), provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('item', item);
    fixture.detectChanges();
  });

  it('renders condensed skill data', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Angular');
    expect(compiled.querySelectorAll('hans-tag').length).toBeGreaterThan(1);
  });

  it('emits details request', () => {
    const spy = jasmine.createSpy('openDetails');
    component.openDetails.subscribe(spy);

    component['requestDetails']();

    expect(spy).toHaveBeenCalledWith(item);
  });
});
