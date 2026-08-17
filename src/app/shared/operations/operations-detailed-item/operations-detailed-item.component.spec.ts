import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../../core/translation/translation.providers';
import { OperationsDetailedItemComponent } from './operations-detailed-item.component';

describe('OperationsDetailedItemComponent', () => {
  let fixture: ComponentFixture<OperationsDetailedItemComponent>;
  let component: OperationsDetailedItemComponent;

  beforeAll(() => {
    if (!customElements.get('hans-button')) {
      customElements.define('hans-button', class extends HTMLElement {});
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationsDetailedItemComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();

    fixture = TestBed.createComponent(OperationsDetailedItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('item', {
      id: 'item-1',
      title: 'Item',
      subtitle: 'Details',
      imageUrl: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
      imageAlt: 'Preview',
      fields: [
        {
          labelKey: 'common.fields.slug',
          value: 'long-value',
          title: 'Full value',
        },
      ],
    });
    fixture.detectChanges();
  });

  it('renders details and emits update and delete actions', () => {
    const updateSpy = jasmine.createSpy('update');
    const deleteSpy = jasmine.createSpy('delete');
    component.updateSelected.subscribe(updateSpy);
    component.deleteSelected.subscribe(deleteSpy);

    const buttons = fixture.nativeElement.querySelectorAll('hans-button');
    buttons[0].click();
    buttons[1].click();

    expect(fixture.nativeElement.querySelector('img')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[title="Full value"]')).toBeTruthy();
    expect(updateSpy).toHaveBeenCalledOnceWith('item-1');
    expect(deleteSpy).toHaveBeenCalledOnceWith('item-1');
  });
});
