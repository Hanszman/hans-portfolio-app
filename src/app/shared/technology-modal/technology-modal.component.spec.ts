import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { TechnologyModalComponent } from './technology-modal.component';

describe('TechnologyModalComponent', () => {
  let fixture: ComponentFixture<TechnologyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnologyModalComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();

    fixture = TestBed.createComponent(TechnologyModalComponent);
    fixture.componentRef.setInput('technology', {
      name: 'Angular',
      category: 'Framework',
      stack: 'Front-End',
      level: 'Advanced',
      frequency: 'Frequent',
      projectCount: 4,
      image: {
        src: '/assets/img/skills/angular.png',
        alt: 'Angular icon',
      },
    });
  });

  it('should pass technology details to tag modal', () => {
    fixture.detectChanges();

    const modal = fixture.nativeElement.querySelector('app-tag-modal');
    expect(modal).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Front-End');
    expect(fixture.nativeElement.textContent).toContain('Advanced');
    expect(fixture.nativeElement.textContent).toContain('4');
  });

  it('should omit optional details when the selected item does not provide them', () => {
    fixture.componentRef.setInput('technology', {
      name: 'Portuguese',
      image: null,
    });
    fixture.componentRef.setInput('isOpen', true);

    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      details: () => readonly unknown[];
    };

    expect(component.details()).toEqual([]);
  });

  it('should emit close request', () => {
    spyOn(fixture.componentInstance.closed, 'emit');
    fixture.detectChanges();

    fixture.nativeElement
      .querySelector('app-tag-modal')
      .dispatchEvent(new Event('closed'));

    expect(fixture.componentInstance.closed.emit).toHaveBeenCalledTimes(1);
  });
});
