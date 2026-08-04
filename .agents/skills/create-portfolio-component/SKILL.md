---
name: create-portfolio-component
description: Create or refactor Angular components in hans-portfolio-app and classify them correctly as shared, layout, or page-local components. Use for requests to add reusable portfolio UI, shell/navigation structure, modals, cards, state components, or components used by a single page while preserving hans-ui-design-lib, translation, signal, styling, and test conventions.
---

# Create a Portfolio Component

## Prepare

1. Resolve the repository root from this skill directory.
2. Read `.agents/AGENTS.md`, `README.md`, the nearest existing component, and its tests before editing.
3. Inspect `git status --short` and preserve unrelated work.
4. Check `hans-ui-design-lib` before creating visual primitives. Reuse a `hans-*` component when it already owns the behavior.

## Classify the component

- Put portfolio-specific composition reused across pages in `src/app/shared/<name>/`.
- Put global structure, shell, navigation, header, footer, container, intro, or wrapper behavior in `src/app/layout/<name>/`.
- Put behavior used only by one page in `src/app/pages/<page>/components/<name>/`.
- Move a generic, cross-project primitive to `hans-ui-design-lib`; do not duplicate it in the portfolio. Follow `../hans-ui-design-lib/.agents/skills/create-design-lib-component/SKILL.md` from the portfolio repository root.
- Do not classify a component as shared merely because it might be reused someday.

State the selected category and why before implementing when the destination is not obvious.

## Create the files

Use kebab-case folders and selectors. Create:

- `<name>.component.ts`
- `<name>.component.html`
- `<name>.component.scss`
- `<name>.component.spec.ts`
- `<name>.types.ts` only for meaningful contracts, view models, constants, or declarative config
- `helpers/<name>.helper.ts` and its spec when mapping, formatting, filtering, sorting, calculations, or event normalization would make the component noisy

Do not create empty types or helper files.

## Implement

- Use a standalone Angular component, `ChangeDetectionStrategy.OnPush`, `input()`, `output()`, `signal()`, `computed()`, `effect()`, and `inject()` as applicable.
- Use `@if`, `@for`, `@switch`, and `@defer`; never add `*ngIf` or `*ngFor`.
- Keep the component class focused on state wiring, view-model composition, and small event handlers.
- Put static UI text in all three locale dictionaries and render keys through `TranslatePipe` or `TranslationService`.
- Use SCSS with Tailwind `@apply`; use theme tokens and never introduce hardcoded component colors.
- Add `CUSTOM_ELEMENTS_SCHEMA` only when the template consumes web components.
- Pass stable raw values and translated labels to closed-list `hans-select-option` controls.
- For portal/modal components, instantiate the host only while open and clear the selected item on close or replacement so projected content cannot accumulate.
- Keep accessibility semantics, keyboard behavior, labels, titles for truncation, and loading/error/empty states explicit.

## Test

- Cover required and optional inputs, outputs, rendering branches, translated content, web-component events, empty/loading/error states, and cleanup.
- Test pure helpers directly.
- Avoid asserting private implementation details when the visible contract is sufficient.
- Keep statements, branches, functions, and lines at 100% for relevant files.

## Validate

Run from the repository root:

```powershell
rtk npm run lint
rtk npm run test:coverage -- --watch=false
rtk npm run build
```

Fix all warnings in the touched scope. Update architecture documentation when the new component changes a shared composition rule.
