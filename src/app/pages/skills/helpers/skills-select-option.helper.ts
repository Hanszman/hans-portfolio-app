import {
  SKILLS_SELECT_OPTION_SCROLL_PATCH_CSS,
  SKILLS_SELECT_OPTION_SCROLL_PATCH_ID,
} from '../skills.types';

export const applySkillsSelectOptionScrollPatch = (host: ParentNode): void => {
  const selectOptions = host.querySelectorAll('hans-select-option.skills-filter-select');

  selectOptions.forEach((selectOption) => {
    const shadowRoot = selectOption.shadowRoot;
    if (!shadowRoot || shadowRoot.getElementById(SKILLS_SELECT_OPTION_SCROLL_PATCH_ID)) {
      return;
    }

    const style = document.createElement('style');
    style.id = SKILLS_SELECT_OPTION_SCROLL_PATCH_ID;
    style.textContent = SKILLS_SELECT_OPTION_SCROLL_PATCH_CSS;
    shadowRoot.appendChild(style);
  });
};
