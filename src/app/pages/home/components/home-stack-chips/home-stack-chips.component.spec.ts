import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { HomeStackChipsComponent } from './home-stack-chips.component';

describe('HomeStackChipsComponent', () => {
  beforeAll(() => {
    if (!customElements.get('hans-tag')) {
      customElements.define('hans-tag', class extends HTMLElement {});
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeStackChipsComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();
  });

  it('should render the technology chips', () => {
    const fixture = TestBed.createComponent(HomeStackChipsComponent);

    fixture.componentRef.setInput('labelKey', 'pages.home.stack.label');
    fixture.componentRef.setInput('titleKey', 'pages.home.stack.title');
    fixture.componentRef.setInput('descriptionKey', 'pages.home.stack.description');
    fixture.componentRef.setInput('chips', [
      { slug: 'angular', label: 'Angular' },
      { slug: 'typescript', label: 'TypeScript' },
      { slug: 'git', label: 'Git' },
    ]);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Main Technologies');
    expect(compiled.querySelectorAll('hans-tag')).toHaveSize(3);
  });
});
