import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { SkillCardViewModel } from '../../skills.types';
import { SkillDetailModalComponent } from './skill-detail-modal.component';

describe('SkillDetailModalComponent', () => {
  let fixture: ComponentFixture<SkillDetailModalComponent>;

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
    timelineEntries: [
      {
        key: 'PROFESSIONAL',
        label: 'Profissional',
        startedAt: '2020-01-01',
        endedAt: null,
      },
    ],
  };

  beforeAll(() => {
    for (const elementName of ['hans-modal', 'hans-avatar', 'hans-icon', 'hans-tag', 'hans-chart']) {
      if (!customElements.get(elementName)) {
        customElements.define(elementName, class extends HTMLElement {});
      }
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillDetailModalComponent],
      providers: [provideAppTranslations(), provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillDetailModalComponent);
    fixture.componentRef.setInput('item', item);
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();
  });

  it('renders chart and timeline details', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('hans-modal')).toBeTruthy();
    expect(compiled.querySelector('hans-chart')).toBeTruthy();
    expect(compiled.textContent).toContain('7 years');
    expect(compiled.textContent).toContain('Profissional');
  });

  it('emits close request', () => {
    const component = fixture.componentInstance;
    const spy = jasmine.createSpy('closed');
    component.closed.subscribe(spy);

    component['requestClose']();

    expect(spy).toHaveBeenCalled();
  });
});
