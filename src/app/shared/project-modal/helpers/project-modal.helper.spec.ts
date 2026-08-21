import { resolveProjectCompanyLogoUrl } from './project-modal.helper';

describe('resolveProjectCompanyLogoUrl', () => {
  it('should normalize the company name into a logo asset path', () => {
    expect(resolveProjectCompanyLogoUrl('Pathbit')).toContain(
      '/assets/img/experiences/pathbit.jpg',
    );
  });

  it('should strip diacritics, ampersands and punctuation from the company name', () => {
    expect(resolveProjectCompanyLogoUrl('Costa & Tavares Ltda.')).toContain(
      '/assets/img/experiences/costaetavaresltda.jpg',
    );
  });
});
