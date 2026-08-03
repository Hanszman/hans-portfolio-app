import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { SpokenLanguageModalComponent } from './spoken-language-modal.component';

describe('SpokenLanguageModalComponent', () => {
  let fixture: ComponentFixture<SpokenLanguageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpokenLanguageModalComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();
    fixture = TestBed.createComponent(SpokenLanguageModalComponent);
    fixture.componentRef.setInput('item', { title: 'Portuguese', subtitle: 'Native', details: [] });
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();
  });

  it('keeps the existing tag modal presentation', () => {
    expect(fixture.nativeElement.querySelector('app-tag-modal')).toBeTruthy();
  });

  it('forwards close requests', () => {
    spyOn(fixture.componentInstance.closed, 'emit');
    fixture.nativeElement.querySelector('app-tag-modal').dispatchEvent(new Event('closed'));
    expect(fixture.componentInstance.closed.emit).toHaveBeenCalled();
  });
});
