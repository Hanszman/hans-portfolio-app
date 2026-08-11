---
name: add-portfolio-translation-key
description: Add, rename, consolidate, or remove static UI translation keys in hans-portfolio-app while keeping en-us, pt-br, and es-es synchronized, reusing canonical common or taxonomy keys, preserving reactive locale behavior, and validating tests and duplicate-key hygiene. Use whenever portfolio interface copy, labels, placeholders, feedback, enum labels, accessibility text, or translation namespaces change without introducing a new locale or persisted localized database field.
---

# Add a portfolio translation key

Read `.agents/AGENTS.md`, especially **Translation conventions**, before editing. Use
`add-portfolio-language-frontend` instead when adding a locale or persisted localized API field.

## Classify the message

1. Inventory every current and expected consumer.
2. Search `translation.types.ts` and all files under `core/translation/languages/` by key fragment
   and by the intended English, Portuguese and Spanish values.
3. Reuse an existing key when the triplet has the same meaning.
4. Choose the canonical namespace:
   - reusable action/entity/field/feedback/state/placeholder/empty/relation copy: `common.*`
   - reusable enum or closed-list label: `taxonomy.<domain>.*`
   - shell-only copy: `header.*` or `footer.*`
   - genuinely page-local copy: `pages.<page>.*`
5. Treat capitalization as presentation. Reuse the key and apply Tailwind `uppercase`,
   `lowercase`, `capitalize` or `normal-case` at the consumer.

## Change the contracts atomically

Add, rename or remove the key in the same change across:

- `src/app/core/translation/translation.types.ts`
- `src/app/core/translation/languages/en-us.translation.ts`
- `src/app/core/translation/languages/pt-br.translation.ts`
- `src/app/core/translation/languages/es-es.translation.ts`
- every template, TypeScript consumer and affected spec

Keep the three translations natural and semantically equivalent. Preserve identical interpolation
parameter names. Never translate raw enum values, API properties, IDs or parameter names.

When consolidating keys, replace every consumer first and delete every obsolete catalog/type entry.
Do not leave aliases, unused entries or duplicate translation triplets.

## Consume the key correctly

- Use `TranslatePipe` for template copy.
- Use `AppTranslationKey` plus `TranslationService` when TypeScript needs a concrete label.
- Keep stable raw select values separate from translated labels.
- Read the active locale inside computed option/view-model builders that call `instant()`.
- Pass the active locale to locale-aware design-library components.
- Translate accessibility labels, placeholders, validation, empty/loading states, modals and toasts.
- Resolve API-backed `*Pt`, `*En` and `*Es` fields through localized-content helpers, not UI keys.

## Audit

Search for:

- the old key after a rename or removal
- missing catalog siblings
- duplicate keys or identical translation triplets
- unused keys
- raw `pages.`, `common.`, `taxonomy.`, `header.` or `footer.` text rendered in UI
- raw enum values passed as option labels
- locale-dependent options that do not recompute after switching language

Verify all three locales in the browser. If the copy appears in an open modal, picker or select,
switch languages without closing it and confirm the label updates immediately.

## Validate

Run from `hans-portfolio-app`:

```text
npm run lint
npm run test:coverage -- --watch=false
npm run build
```

Do not finish with missing keys, duplicate catalog entries, unused translation aliases, raw keys in
the UI, warnings, or coverage below 100%.
