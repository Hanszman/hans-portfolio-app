---
name: add-portfolio-language-frontend
description: Add or extend a content language in hans-portfolio-app, including locale catalogs, API contracts, localized public rendering, every affected admin CRUD form, locale-aware admin reads, tests, and coordination with hans-portfolio-api. Use whenever a new locale or localized database-backed field is introduced in the portfolio Front-End.
---

# Add a portfolio language in the Front-End

Coordinate this work with the Back-End skill at `../../../../hans-portfolio-api/.agents/skills/add-portfolio-language-backend/SKILL.md`. Read that skill before changing API contracts. The Back-End schema and response contract are the source of truth for persisted localized fields.

## Establish the locale contract

1. Choose the canonical BCP 47 locale and field suffix, such as `fr-fr` and `Fr`.
2. Inventory every persisted field that already has language variants. Treat the existing `Pt`, `En`, and `Es` siblings as the complete pattern unless the Back-End inventory proves otherwise.
3. Add the locale to translation types, configuration, dropdown options, loader coverage, and the locale catalog.
4. Preserve a deterministic fallback chain. Prefer the selected locale, then the project's documented fallback locale, then the first non-empty supported value.
5. Keep UI-copy translation keys separate from content returned by the API.

## Extend API contracts and public rendering

1. Add the new localized properties to entity response and mutation types in `src/app/core/api/<entity>/<entity>.types.ts`.
2. Update mock records and fixtures with meaningful translated content.
3. Update every mapper, resolver, card, page section, search label, accessibility label, and metadata builder that selects localized API content.
4. Search for direct `*Pt`, `*En`, and `*Es` reads and replace closed locale branches with the shared locale resolver when appropriate.
5. Test the selected value and every fallback branch.

## Extend all affected admin CRUD forms

For each localized entity, inspect create, update, validation, payload construction, edit hydration, read view-model mapping, mocks, and specs. Do not assume that changing a shared type automatically updates the form.

1. Add one input per localized field to create and update. Follow the existing field order: the language variants of one concept stay adjacent before moving to the next concept.
2. Add translated label, placeholder, validation, success, and error keys to every supported UI catalog.
3. Mark the new input `required` only when the Back-End DTO and database constraint require it. Let `hans-ui-design-lib` render the required marker.
4. Initialize the form value, hydrate it from the selected record, trim or normalize it consistently, and include it exactly once in create and update payloads.
5. Update tests proving hydration, required validation, emitted form values, create payloads, update payloads, and HTTP error behavior.
6. Audit these admin domains explicitly: portfolio settings, tags, links, image assets, spoken languages, customers, jobs, formations, technologies, technology contexts, experiences, and projects.

## Keep admin Read locale-aware

Read cards must show only the value for the language selected in the global language dropdown.

1. Map each multilingual concept to one neutral field label such as `Title`, `Summary`, or `Description`.
2. Resolve its value through the shared admin localized-value helper using the active locale.
3. Omit the parallel Portuguese, English, Spanish, and new-language rows.
4. Recompute detailed item view models when the active language changes; reopening the modal must not be required.
5. Keep nonlocalized identifiers and relations unchanged.
6. Test every locale and fallback, and prove that only one row per multilingual concept is rendered.

## Verify

Run from `hans-portfolio-app`:

```text
npm run lint
npm run test:coverage -- --watch=false
npm run build
```

Then validate the public pages and all six admin CRUD modes in Chrome for each locale. Confirm translated content, reactive language switching, request payloads, required markers, accessibility text, and absence of raw translation keys or console errors.

Before finishing, search for the old closed locale set and document any intentional exceptions. Do not declare the Front-End complete until the linked Back-End skill has completed its schema, data, API, and snapshot checks.
