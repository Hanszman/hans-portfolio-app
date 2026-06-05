import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { LocationComponent } from './location.component';

describe('LocationComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();
  });

  it('should render the translated location', () => {
    const fixture = TestBed.createComponent(LocationComponent);
    fixture.componentRef.setInput('labelKey', 'footer.location');
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'Belo Horizonte, Brazil',
    );
  });
});
