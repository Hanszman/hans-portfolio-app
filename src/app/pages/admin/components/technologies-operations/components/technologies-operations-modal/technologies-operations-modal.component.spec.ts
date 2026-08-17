import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../../../../../core/translation/translation.providers';
import { TechnologiesOperationsModalComponent } from './technologies-operations-modal.component';

describe('TechnologiesOperationsModalComponent', () => {
  let fixture: ComponentFixture<TechnologiesOperationsModalComponent>;
  interface ModalTestApi {
    change(field: string, event: Event): void;
    toggleHighlight(event: Event): void;
    submit(): void;
    fieldChanged: { subscribe(callback: (value: unknown) => void): void };
    imageAssetToggled: {
      emit(value: string): void;
      subscribe(callback: (value: unknown) => void): void;
    };
    submitted: { subscribe(callback: () => void): void };
  }

  beforeAll(() => {
    for (const tag of [
      'hans-button',
      'hans-input',
      'hans-select-option',
      'hans-toggle',
      'hans-modal',
      'hans-loading',
    ])
      if (!customElements.get(tag)) customElements.define(tag, class extends HTMLElement {});
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnologiesOperationsModalComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();
    fixture = TestBed.createComponent(TechnologiesOperationsModalComponent);
  });

  it('renders form modes and emits field, image and submit events', () => {
    const component = fixture.componentInstance as unknown as ModalTestApi;
    const fieldSpy = jasmine.createSpy('field');
    component.fieldChanged.subscribe(fieldSpy);
    const imageSpy = jasmine.createSpy('image');
    component.imageAssetToggled.subscribe(imageSpy);
    const submitSpy = jasmine.createSpy('submit');
    component.submitted.subscribe(submitSpy);
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('modalMode', 'create');
    fixture.componentRef.setInput('imageOptions', [
      {
        id: 'image-1',
        title: 'Image',
        subtitle: '/assets/img/logo/vh_logo_blue.svg',
        imageUrl: '/assets/img/logo/vh_logo_blue.svg',
      },
    ]);
    fixture.detectChanges();
    component.change('category', new Event('change'));
    const inputEvent = new Event('input');
    Object.defineProperty(inputEvent, 'target', { value: { value: 'Name' } });
    component.change('name', inputEvent);
    const detailEvent = new Event('change');
    Object.defineProperty(detailEvent, 'detail', { value: false });
    component.toggleHighlight(detailEvent);
    const toggleEvent = new Event('change');
    Object.defineProperty(toggleEvent, 'target', { value: { checked: true } });
    component.toggleHighlight(toggleEvent);
    component.submit();
    component.imageAssetToggled.emit('image-1');
    expect(fieldSpy).toHaveBeenCalled();
    expect(imageSpy).toHaveBeenCalledWith('image-1');
    expect(submitSpy).toHaveBeenCalled();
  });

  it('renders read and picker modes with pagination state', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('modalMode', 'read');
    fixture.componentRef.setInput('technologies', [
      {
        id: 'technology-1',
        name: 'Angular',
        slug: 'angular',
        category: 'FRAMEWORK',
        level: 'ADVANCED',
        frequency: 'FREQUENT',
        highlight: true,
        sortOrder: 1,
        technologyContexts: [
          {
            context: 'PROFESSIONAL',
            startedAt: '2020-01-01T00:00:00.000Z',
            endedAt: '2021-01-01T00:00:00.000Z',
          },
        ],
        projectLabels: ['Portfolio'],
        experienceLabels: ['Company'],
        formationLabels: ['Course'],
        tagLabels: ['Framework'],
        linkLabels: ['Documentation'],
        imageAssetLabels: ['angular.svg'],
      },
      {
        id: 'technology-2',
        name: 'Unknown',
        slug: 'unknown',
        category: 'OTHER',
        level: '',
        frequency: '',
        highlight: false,
        sortOrder: '2',
        projectIds: [],
        experienceIds: [],
        formationIds: [],
        linkIds: [],
        imageAssetIds: [],
        imageAssetLabels: ['unknown.svg'],
      },
    ]);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Angular');
    fixture.componentRef.setInput('modalMode', 'pick-update');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Angular');
    fixture.componentRef.setInput('modalMode', 'pick-delete');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Angular');
    fixture.componentRef.setInput('modalMode', 'delete');
    fixture.componentRef.setInput('selectedTechnology', {
      id: 'technology-1',
      name: 'Angular',
      slug: 'angular',
      category: 'FRAMEWORK',
      level: null,
      frequency: null,
      highlight: true,
    });
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('angular');
  });
});
