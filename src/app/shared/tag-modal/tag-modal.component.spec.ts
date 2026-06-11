import {
  CUSTOM_ELEMENTS_SCHEMA,
  Pipe,
  PipeTransform,
  provideZonelessChangeDetection,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { TagModalComponent } from './tag-modal.component';

@Pipe({
  name: 'translate',
  standalone: true,
})
class TranslatePipeStub implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

describe('TagModalComponent', () => {
  let fixture: ComponentFixture<TagModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagModalComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideZonelessChangeDetection()],
    })
      .overrideComponent(TagModalComponent, {
        remove: { imports: [TranslatePipe] },
        add: { imports: [TranslatePipeStub] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(TagModalComponent);
  });

  it('should render title image subtitle and details', () => {
    fixture.componentRef.setInput('title', 'Angular');
    fixture.componentRef.setInput('subtitle', 'Framework');
    fixture.componentRef.setInput('image', {
      src: '/assets/img/skills/angular.png',
      alt: 'Angular icon',
    });
    fixture.componentRef.setInput('details', [
      { labelKey: 'pages.experiences.technology.level', value: 'Advanced' },
    ]);
    fixture.detectChanges();

    const modal = fixture.nativeElement.querySelector('hans-modal') as HTMLElement & {
      title?: string;
    };

    expect(modal.title).toBe('Angular');
    expect(fixture.nativeElement.querySelector('img').alt).toBe('Angular icon');
    expect(fixture.nativeElement.textContent).toContain('Framework');
    expect(fixture.nativeElement.textContent).toContain('Advanced');
  });

  it('should emit close request', () => {
    spyOn(fixture.componentInstance.closed, 'emit');
    fixture.detectChanges();

    fixture.nativeElement.querySelector('hans-modal').dispatchEvent(new Event('close'));

    expect(fixture.componentInstance.closed.emit).toHaveBeenCalledTimes(1);
  });
});
