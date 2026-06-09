import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, provideZonelessChangeDetection } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ExpandableListToggleComponent } from './expandable-list-toggle.component';

@Pipe({
  name: 'translate',
  standalone: true,
})
class TranslatePipeStub implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

describe('ExpandableListToggleComponent', () => {
  let fixture: ComponentFixture<ExpandableListToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpandableListToggleComponent],
      providers: [provideZonelessChangeDetection()],
    })
      .overrideComponent(ExpandableListToggleComponent, {
        remove: { imports: [TranslatePipe] },
        add: { imports: [TranslatePipeStub] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ExpandableListToggleComponent);
    fixture.componentRef.setInput('expandLabelKey', 'more');
    fixture.componentRef.setInput('collapseLabelKey', 'less');
  });

  it('should hide when there are no hidden items and list is collapsed', () => {
    fixture.componentRef.setInput('hiddenCount', 0);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('button')).toBeNull();
  });

  it('should emit when toggle is clicked', () => {
    spyOn(fixture.componentInstance.toggled, 'emit');
    fixture.componentRef.setInput('hiddenCount', 3);
    fixture.detectChanges();

    fixture.nativeElement.querySelector('button').click();

    expect(fixture.componentInstance.toggled.emit).toHaveBeenCalledTimes(1);
  });
});
