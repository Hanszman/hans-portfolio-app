import { Pipe, PipeTransform, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonFilterComponent } from './button-filter.component';

@Pipe({ name: 'translate' })
class TranslatePipeStub implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

describe('ButtonFilterComponent', () => {
  let fixture: ComponentFixture<ButtonFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonFilterComponent],
      providers: [provideZonelessChangeDetection()],
    })
      .overrideComponent(ButtonFilterComponent, {
        remove: { imports: [TranslatePipe] },
        add: { imports: [TranslatePipeStub] },
      })
      .compileComponents();
    fixture = TestBed.createComponent(ButtonFilterComponent);
    fixture.componentRef.setInput('labelKey', 'common.fields.highlight');
    fixture.componentRef.setInput('selectedValue', 'ALL');
    fixture.componentRef.setInput('options', [
      { value: 'ALL', labelKey: 'common.filters.all' },
      { value: 'OTHERS', labelKey: 'common.filters.others' },
    ]);
    fixture.detectChanges();
  });

  it('renders translated options and marks the active option', () => {
    const buttons = fixture.debugElement.queryAll(By.css('hans-button'));
    expect(buttons.length).toBe(2);
    expect(buttons[0].attributes['aria-pressed']).toBe('true');
    expect(buttons[1].attributes['aria-pressed']).toBe('false');
  });

  it('emits the selected raw value', () => {
    const selected = jasmine.createSpy('selected');
    fixture.componentInstance.valueSelected.subscribe(selected);
    fixture.debugElement.queryAll(By.css('hans-button'))[1].triggerEventHandler('click');
    expect(selected).toHaveBeenCalledOnceWith('OTHERS');
  });
});
