import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OperationsItemComponent } from './operations-item.component';

describe('OperationsItemComponent', () => {
  let fixture: ComponentFixture<OperationsItemComponent>;
  let component: OperationsItemComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationsItemComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(OperationsItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('item', {
      id: 'item-1',
      title: 'Item',
      subtitle: 'Details',
      imageUrl: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
      imageAlt: 'Preview',
      imageTitle: 'Image title',
    });
    fixture.detectChanges();
  });

  it('renders an optional preview and emits its id when interactive', () => {
    const selectedSpy = jasmine.createSpy('selected');
    component.selected.subscribe(selectedSpy);

    expect(fixture.nativeElement.querySelector('img')?.alt).toBe('Preview');
    fixture.nativeElement.querySelector('button').click();

    expect(selectedSpy).toHaveBeenCalledOnceWith('item-1');
  });

  it('does not emit when used as a delete summary', () => {
    const selectedSpy = jasmine.createSpy('selected');
    component.selected.subscribe(selectedSpy);
    fixture.componentRef.setInput('interactive', false);
    fixture.componentRef.setInput('item', { id: 'item-1', title: 'Item' });
    fixture.detectChanges();

    fixture.nativeElement.querySelector('button').click();

    expect(selectedSpy).not.toHaveBeenCalled();
    expect(fixture.nativeElement.querySelector('img')).toBeNull();
  });
});
