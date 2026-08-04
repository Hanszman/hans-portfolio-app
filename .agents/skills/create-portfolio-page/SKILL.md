---
name: create-portfolio-page
description: Create or extend a route-level Angular page in hans-portfolio-app, including routing, page-local components, view models, API integration, localized UI, responsive styling, state handling, and tests. Use when adding a public or authenticated page, route, dashboard view, or a substantial route-owned screen.
---

# Create a Portfolio Page

## Prepare

1. Read `.agents/AGENTS.md`, `README.md`, `src/app/app.routes.ts`, the closest existing page, its helper/types files, and its specs.
2. Inspect the relevant domain service and backend contracts before designing the page view model.
3. Inspect `git status --short` and preserve unrelated changes.
4. Confirm whether the route is public, hidden admin, guarded, or navigation-visible.

## Design the page boundary

- Create the route owner in `src/app/pages/<page>/`.
- Keep route-only components in `src/app/pages/<page>/components/`.
- Keep page contracts and declarative constants in `<page>.types.ts`.
- Put mapping, filtering, sorting, formatting, and derived input builders in `helpers/<page>.helper.ts` with a helper spec.
- Promote a composition to `src/app/shared/` only when multiple pages genuinely use it.
- Use layout primitives from `src/app/layout/` and UI primitives from `hans-ui-design-lib`.

## Create and wire the page

Create the component TS, HTML, SCSS, and spec. Add types/helpers only when needed.

- Register a lazy route using the existing standalone route style.
- Update navigation only when the page is intentionally public and menu-visible.
- Apply the existing guard for authenticated admin routes; never expose hidden admin routes in public navigation.
- Fetch through `src/app/core/api/<domain>/<domain>.service.ts`; do not inject `HttpClient` into a page.
- Use signals for local state and computed view models. Use RxJS for HTTP interop, cancellation, debounce, or router streams only when needed.
- Represent loading, error, empty, and success states explicitly with shared compositions.
- Keep localized API content selection in centralized translation helpers and static copy in `en-us`, `pt-br`, and `es-es` dictionaries.
- Keep responsive layout in page SCSS with Tailwind `@apply` and theme variables.
- Conditionally instantiate portal/modal hosts and clear selected state on close or when opening another item.

## Preserve contracts

- Use returned `imageAssets` metadata rather than legacy scalar image fields.
- Recompute translated enum/select labels from the active locale signal.
- Keep admin date/select/relation behavior aligned with the shared operations patterns when the page is administrative.
- Do not reproduce aggregate backend calculations in the browser when an API endpoint owns them.

## Test

- Test the initial request and loading state, success mapping, errors, empty collections, filters/search, locale changes, navigation, modal cleanup, and user events.
- Update `app.routes.spec.ts` when the route table changes.
- Test page helpers independently.
- Maintain 100% statements, branches, functions, and lines for relevant files.

## Validate

```powershell
rtk npm run lint
rtk npm run test:coverage -- --watch=false
rtk npm run build
```

Fix warnings rather than accepting them. Update README or planning documentation if route scope or architecture changes.
