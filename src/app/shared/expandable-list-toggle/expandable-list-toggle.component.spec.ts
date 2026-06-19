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

  it('should render the internal show more and show less labels', () => {
    fixture.componentRef.setInput('hiddenCount', 2);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain(
      '+2 common.actions.showMore',
    );

    fixture.componentRef.setInput('isExpanded', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('common.actions.showLess');
  });
});
