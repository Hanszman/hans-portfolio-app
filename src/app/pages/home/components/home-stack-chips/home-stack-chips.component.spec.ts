import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { HomeStackChipsComponent } from './home-stack-chips.component';

describe('HomeStackChipsComponent', () => {
  const chips = [
    {
      slug: 'angular',
      label: 'Angular',
      image: null,
      value: { name: 'Angular', category: 'Framework' },
    },
    {
      slug: 'typescript',
      label: 'TypeScript',
      image: null,
      value: { name: 'TypeScript', category: 'Language' },
    },
    {
      slug: 'git',
      label: 'Git',
      image: null,
      value: { name: 'Git', category: 'DevOps' },
    },
  ];

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
    fixture.componentRef.setInput('chips', chips);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Main Technologies');
    expect(compiled.querySelectorAll('hans-tag')).toHaveSize(3);
  });

  it('should emit the selected chip when a tag is clicked', () => {
    const fixture = TestBed.createComponent(HomeStackChipsComponent);
    const spy = jasmine.createSpy('openTechnology');

    fixture.componentRef.setInput('labelKey', 'pages.home.stack.label');
    fixture.componentRef.setInput('titleKey', 'pages.home.stack.title');
    fixture.componentRef.setInput('descriptionKey', 'pages.home.stack.description');
    fixture.componentRef.setInput('chips', chips);
    fixture.componentInstance.openTechnology.subscribe(spy);
    fixture.detectChanges();

    const firstButton = fixture.nativeElement.querySelector(
      '.home-stack-tag-button button',
    ) as HTMLButtonElement;
    firstButton.click();

    expect(spy).toHaveBeenCalledOnceWith(chips[0].value);
  });
});
