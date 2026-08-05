import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { EducationModalComponent } from './education-modal.component';

describe('EducationModalComponent', () => {
  let fixture: ComponentFixture<EducationModalComponent>;
  const imageSource =
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/%3E';
  const item = {
    title: 'Information Systems',
    subtitle: 'University',
    image: null,
    details: [{ labelKey: 'pages.skills.education.detail.summary' as const, value: 'Degree' }],
    galleryItems: [{ id: 'image', imageSrc: imageSource, imageAlt: 'Degree' }],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationModalComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();
    fixture = TestBed.createComponent(EducationModalComponent);
  });

  it('changes size and carousel presence according to linked images', () => {
    fixture.componentRef.setInput('item', item);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('hans-modal').getAttribute('modalSize')).toBe(
      'large',
    );
    expect(fixture.nativeElement.querySelector('hans-carousel')).toBeTruthy();
    fixture.componentRef.setInput('item', { ...item, galleryItems: [] });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('hans-modal').getAttribute('modalSize')).toBe(
      'small',
    );
    expect(fixture.nativeElement.querySelector('hans-carousel')).toBeNull();
  });

  it('uses the compact size before an education item is provided', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('hans-modal').getAttribute('modalSize')).toBe(
      'small',
    );
  });

  it('renders skeletons until linked media settles', () => {
    fixture.componentRef.setInput('item', {
      ...item,
      image: { src: `${imageSource}#logo`, alt: 'University' },
    });
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('app-modal-skeleton').length).toBeGreaterThan(0);

    fixture.nativeElement
      .querySelectorAll('.modal-media-preloader img')
      .forEach((image: HTMLImageElement) => image.dispatchEvent(new Event('load')));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('app-modal-skeleton')).toBeNull();
    expect(fixture.nativeElement.querySelector('hans-carousel')).toBeTruthy();
  });

  it('emits close requests', () => {
    fixture.componentRef.setInput('item', item);
    fixture.detectChanges();
    spyOn(fixture.componentInstance.closed, 'emit');
    fixture.nativeElement.querySelector('hans-modal').dispatchEvent(new Event('close'));
    expect(fixture.componentInstance.closed.emit).toHaveBeenCalled();
  });
});
