import { Component, Input, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OperationsRelationPickerComponent } from './operations-relation-picker.component';

@Component({
  standalone: true,
  imports: [OperationsRelationPickerComponent],
  template: `<app-operations-relation-picker
    [options]="options"
    [selectedIds]="selected"
    (toggled)="toggle($event)"
  />`,
})
class HostComponent {
  @Input() options = [{ id: 'one', title: 'One', subtitle: 'First' }];
  selected = ['one'];
  toggle(id: string): void {
    this.selected = [id];
  }
}

describe('OperationsRelationPickerComponent', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('renders selected options and emits toggles', () => {
    const component = fixture.debugElement.children[0]
      .componentInstance as OperationsRelationPickerComponent;
    const emit = spyOn(component.toggled, 'emit');
    expect(component['isSelected']('one')).toBeTrue();
    component.toggled.emit('one');
    expect(emit).toHaveBeenCalledWith('one');
  });

  it('supports empty options', async () => {
    fixture.componentRef.setInput('options', []);
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).not.toContain('One');
  });

  it('renders options sorted alphabetically by title', async () => {
    fixture.componentRef.setInput('options', [
      { id: 'sql-server', title: 'Microsoft SQL Server' },
      { id: 'swagger', title: 'Swagger' },
      { id: 'sql', title: 'SQL' },
    ]);
    await fixture.whenStable();

    const titles = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll(
        '.operations-relation-picker-option-copy span',
      ),
    ).map((element) => element.textContent);

    expect(titles).toEqual(['Microsoft SQL Server', 'SQL', 'Swagger']);
  });
});
