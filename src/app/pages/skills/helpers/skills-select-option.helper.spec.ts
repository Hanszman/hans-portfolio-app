import { SKILLS_SELECT_OPTION_SCROLL_PATCH_ID } from '../skills.types';
import { applySkillsSelectOptionScrollPatch } from './skills-select-option.helper';

const createSelectOption = (withShadowRoot = true): HTMLElement => {
  const selectOption = document.createElement('hans-select-option');
  selectOption.classList.add('skills-filter-select');

  if (withShadowRoot) {
    selectOption.attachShadow({ mode: 'open' });
  }

  return selectOption;
};

describe('skills-select-option.helper', () => {
  it('should inject the scroll patch inside skills select option shadow roots', () => {
    const host = document.createElement('section');
    const selectOption = createSelectOption();
    host.appendChild(selectOption);

    applySkillsSelectOptionScrollPatch(host);

    const style = selectOption.shadowRoot?.getElementById(
      SKILLS_SELECT_OPTION_SCROLL_PATCH_ID,
    );

    expect(style?.textContent).toContain('.hans-popup-panel-content');
    expect(style?.textContent).toContain('.hans-select-option-list');
  });

  it('should not inject duplicate styles when called more than once', () => {
    const host = document.createElement('section');
    const selectOption = createSelectOption();
    host.appendChild(selectOption);

    applySkillsSelectOptionScrollPatch(host);
    applySkillsSelectOptionScrollPatch(host);

    expect(
      selectOption.shadowRoot?.querySelectorAll(
        `#${SKILLS_SELECT_OPTION_SCROLL_PATCH_ID}`,
      ).length,
    ).toBe(1);
  });

  it('should ignore matching select options before their shadow root exists', () => {
    const host = document.createElement('section');
    const selectOption = createSelectOption(false);
    host.appendChild(selectOption);

    expect(() => applySkillsSelectOptionScrollPatch(host)).not.toThrow();
  });
});
