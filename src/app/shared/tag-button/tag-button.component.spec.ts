import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TagButtonComponent } from './tag-button.component';

describe('TagButtonComponent', () => {
  let fixture: ComponentFixture<TagButtonComponent<string>>;
  let component: TagButtonComponent<string>;

  beforeAll(() => {
    if (!customElements.get('hans-tag')) {
      customElements.define('hans-tag', class extends HTMLElement {});
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagButtonComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent<TagButtonComponent<string>>(TagButtonComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('tag', {
      label: 'Angular',
      image: { src: '/angular.png', alt: 'Angular icon' },
      value: 'angular',
    });
    fixture.detectChanges();
  });

  it('renders the tag label and image attributes', () => {
    const tag = (fixture.nativeElement as HTMLElement).querySelector('hans-tag');

    expect(tag?.getAttribute('label')).toBe('Angular');
    expect(tag?.getAttribute('image-src')).toBe('/angular.png');
    expect(tag?.getAttribute('image-alt')).toBe('Angular icon');
  });

  it('emits the selected value and stops event propagation', () => {
    const event = new MouseEvent('click');
    spyOn(event, 'stopPropagation');
    const spy = jasmine.createSpy('selected');
    component.selected.subscribe(spy);

    component['requestSelection'](event);

    expect(event.stopPropagation).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('angular');
  });
});
