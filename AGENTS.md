# AGENTS.md - hans-portfolio-app

## Project purpose

`hans-portfolio-app` is the Angular frontend for the Hans Portfolio remake. It consumes `hans-portfolio-api` as its backend and uses `hans-ui-design-lib` as the official visual base.

The current focus is the public portfolio:

- Home
- Experiences
- Skills
- Projects
- Dashboard

The implementation plan lives in `plano-implementacao-hans-portfolio-app-final-version.md`. Treat it as the main execution reference together with this file and `README.md`.

## Tech stack

- Angular `20.3.6`
- TypeScript `5.9.2`
- Standalone components only
- Angular signals, `computed()` and `effect()`
- Angular new template syntax: `@if`, `@for`, `@switch`, `@defer` when appropriate
- `input()`, `output()` and `inject()`
- Zoneless-ready app base
- TailwindCSS `3.4.14` + SCSS
- Karma + Jasmine
- ESLint + Prettier
- `@ngx-translate/core`
- `hans-ui-design-lib` consumed via CDN/web components

Use Node `24.14.1` and npm `11.11.0`.

## Mandatory quality bar

Every change must follow:

- Clean Code
- DRY
- KISS
- YAGNI
- SRP
- SOLID
- clear naming
- small components
- reusable composition
- reusable and composable components
- no unnecessary abstraction
- no hidden behavior
- no duplicated UI primitives already available in the design library

Required validation before a task is done:

- `npm run lint`
- `npm run test:coverage -- --watch=false`
- `npm run build`

When useful during development, also run:

- `npm run test`
- `npm run dev`
- `npm run start`

Coverage must stay at `100%` statements, branches, functions and lines for relevant files. Lint must pass with no errors and no warnings. Builds must pass. Do not accept new warnings as "normal" without fixing or explicitly documenting why they are outside the touched scope.

## Hans UI Design Library policy

`hans-ui-design-lib` is the official visual foundation.

Before creating any visual component or control, check the library first. If the library already has the equivalent component, use it.

Common library components include:

- `hans-button`
- `hans-input`
- `hans-dropdown`
- `hans-select-option`
- `hans-toggle`
- `hans-date-picker`
- `hans-avatar`
- `hans-card`
- `hans-carousel`
- `hans-tag`
- `hans-chart`
- `hans-accordion`
- `hans-icon`
- `hans-loading`
- `hans-kanban`
- `hans-popup`
- `hans-toast`
- `hans-modal`
- `hans-table`
- `hans-tabs`

Use library primitives for loading states, modals, tags, cards, buttons, charts, tables, tabs, dropdowns and similar UI whenever possible.

Portfolio-only compositions can live in this app when they are specific to the portfolio. If a missing capability is reusable across projects, pause and align before changing `hans-ui-design-lib`.

## CDN version pinning

This app consumes `hans-ui-design-lib` through CDN assets declared in:

- `src/index.html`
- `src/index.local.html`

Rules:

- keep CSS and JS on the same library version marker
- production should use the real published library version, for example `?v=x.x.x`
- local development may temporarily append a local-only suffix, for example `?v=x.x.x-local-dev`, only to bust browser cache against a local CDN preview
- that local suffix is optional and purely descriptive; it exists only to make temporary local cache resets easier to track during debugging
- the `?v=` parameter is only a cache-busting marker; it is not interpreted by the component runtime
- whenever the library release changes and this app should consume it immediately, update both HTML entry files together or automate that replacement in the consumer deploy pipeline

## App folder structure

Use the current project structure:

- `src/app/core/` - cross-cutting infrastructure.
- `src/app/core/api/` - backend communication by domain.
- `src/app/core/api/<domain>/` - `*.service.ts`, `*.types.ts` and `*.service.spec.ts`.
- `src/app/core/api/mocks/` - shared factories and mocks for specs.
- `src/app/core/theme/` - theme service, config, types and theme tokens.
- `src/app/core/translation/` - translation loader, service, providers, config, types and language dictionaries.
- `src/app/core/design-lib/` - integration with `window.HansUI` and design library runtime theme API.
- `src/app/layout/` - app shell and structural layout components.
- `src/app/layout/header/` - header and header-local components.
- `src/app/layout/footer/` - footer and footer-local components.
- `src/app/layout/navigation/` - route-derived navigation.
- `src/app/layout/shell/` - global page shell.
- `src/app/layout/container/`, `intro/`, `wrapper/` - reusable layout primitives.
- `src/app/pages/` - route-level pages.
- `src/app/pages/<page>/components/` - components only used by that page.
- `src/app/pages/<page>/helpers/` - page-local helper functions and tests.
- `src/app/pages/<page>/<page>.types.ts` - page-local types, constants, view models and support contracts.
- `src/app/shared/` - reusable app components that are not generic enough for the design library but are shared across app pages.

Examples of shared components:

- `card`
- `info-state`
- `social-links`
- `location`
- `timeline`
- `tag-modal`
- `technology-modal`
- `expandable-list-toggle`

## Angular conventions

Use modern Angular consistently:

- Do not create feature modules.
- Do not use `*ngIf` or `*ngFor`.
- Use `@if` and `@for`.
- Prefer `signal()`, `computed()` and `effect()`.
- Prefer `input()` and `output()`.
- Prefer `inject()` instead of constructor injection when it improves clarity.
- Keep templates readable and move derived view-model logic to TypeScript.
- Use RxJS only when the problem really requires streams, cancellation, debounce, router events, or HttpClient interop.
- Do not use `BehaviorSubject` as the default local or feature state model.
- Keep state as local as possible. Promote to feature service or global singleton only when needed.

## Component file pattern

Angular components should follow this structure:

- `<name>.component.ts`
- `<name>.component.html`
- `<name>.component.scss`
- `<name>.component.spec.ts`
- `<name>.types.ts` when the component has local contracts, constants, view-models, or input models worth naming
- `helpers/<name>.helper.ts` and `helpers/<name>.helper.spec.ts` when behavior can be tested outside the component

Page-only components live under `src/app/pages/<page>/components/`.

Cross-page app components live under `src/app/shared/`.

Generic reusable UI primitives should be considered for `hans-ui-design-lib` instead of being created here.

## What belongs in component TS, types and helpers

Component `.ts` files should focus on:

- state wiring
- input/output declarations
- dependency injection
- view-model composition
- simple event handlers
- calls to services/helpers

`*.types.ts` files should contain:

- interfaces
- type aliases
- enums or enum-like unions
- view-model contracts
- API-derived local contracts
- local constants tied to the model
- declarative config for that feature/component

Helper files should contain:

- mappers
- formatters
- filters
- sorting logic
- computed input builders
- large functions
- reusable predicates
- logic that would otherwise make component files noisy

Do not leave global or feature-level constants, types, interfaces, or helper functions scattered inside component files. Move them to the nearest `*.types.ts` or `helpers/*.helper.ts`.

## Styling conventions

- Frontend styles must use SCSS with Tailwind.
- Prefer Tailwind utilities through `@apply`.
- Use plain SCSS only when Tailwind cannot express the rule cleanly.
- Use theme variables/tokens for colors. Do not hardcode colors directly in component styles.
- Component-specific styles belong in the component SCSS file.
- `src/styles.scss` must contain only truly global rules.
- Preserve the project theme. Do not change palettes unless explicitly requested.

## Translation conventions

The app supports `en-us`, `pt-br` and `es-es`.

Rules:

- Keep the same translation keys in all three languages.
- Static UI copy belongs only in language files under `src/app/core/translation/languages/`.
- TypeScript should pass translation keys, not locale-to-text maps.
- Use `TranslatePipe` in templates for static copy.
- Use `TranslationService` in TypeScript when translated labels are needed in code.
- Closed-list, enum and API-known option fields must expose translated user-facing labels through `TranslationService`; never pass raw enum values or raw translation keys directly to UI options.
- Select options whose labels depend on translation keys must be recomputed from the active locale signal so the UI updates immediately after language changes.
- When backend content has localized fields, use the centralized translation helpers/service instead of ad hoc `if`, `switch`, or ternary locale logic.
- Remove translation keys that are no longer used, but keep all language files synchronized.

## Backend communication

The frontend consumes `hans-portfolio-api`.

API rules:

- Keep HTTP contracts inside `src/app/core/api/<domain>/*.types.ts`.
- Keep HTTP calls inside domain services.
- Components should not know raw HTTP details.
- Public pages should use real backend data whenever the endpoint exists.
- Mocks are for tests and temporary isolated cases, not the main implementation path.
- Use environment config for API base URLs.
- Local API: `http://localhost:3000`.
- Production API: `https://hans-portfolio-api.vercel.app`.

Important public routes include:

- `GET /projects`
- `GET /experiences`
- `GET /technologies`
- `GET /technology-contexts`
- `GET /customers`
- `GET /jobs`
- `GET /links`
- `GET /image-assets`
- `GET /tags`
- `GET /portfolio-settings`
- `GET /dashboard`
- dashboard aggregate endpoints

Backend media is normalized through `imageAssets` relations. The frontend should use returned `filePath`, `folder`, `fileName` and `kind` metadata instead of expecting old direct scalar icon or URL fields.

## F7 redesign rules

The current public redesign phase is `F7`.

Rules:

- Redesign pages incrementally in this order: `home`, `experiences`, `skills`, `projects`, `dashboard`.
- Use the prints from `G:\Meu Drive\Victor\Projetos\Pessoais\Hans\Hans Portfolio Remake`.
- When a page has multiple prints, treat them as a vertical scroll continuation.
- Rebuild one page at a time; do not delete all pages before rebuilding.
- Keep header and footer stable unless the task explicitly says otherwise.
- Keep colors and theme tokens unchanged.
- Reuse `hans-ui-design-lib` components first.
- Preserve translations in all three languages.
- Update documentation when scope, architecture, or contracts change.
- Run quality scripts before moving to the next screen.

Current status:

- `home` redesign is complete.
- `experiences` redesign is complete.
- `skills` redesign is complete.
- `projects` redesign is complete.
- `dashboard` redesign is complete.
- F7 public redesign is complete.
- Next official target is `F8`, the final authenticated admin area.

## F8 admin rules

The current final phase is `F8`.

Rules:

- create a hidden admin login route that is not exposed in the public menu
- authenticate with the existing `POST /auth/login` endpoint
- validate authenticated sessions with `GET /admin/session`
- protect every admin route with a frontend guard
- keep the admin area visually aligned with the current app theme
- do not introduce new colors; always use theme variables/tokens
- build admin actions and forms with `hans-ui-design-lib` primitives first
- each admin entity entry should expose `create`, `update` and `delete` actions
- each action should open modal-driven flows when appropriate
- every admin form field must declare its label through field config and use the config `required` flag to append the asterisk automatically instead of hardcoding it in templates
- whenever a field represents a closed list, enum or API-known option set, use `hans-select-option` instead of `input`
- whenever a field represents date, datetime or time input, use `hans-date-picker` with the correct `pickerType` instead of `hans-input`
- when an admin date field is selection-driven, keep `hans-date-picker` with `allowInputTyping` disabled so the input stays readonly and the picker opens from the whole field interaction, matching the library behavior
- read, `pick-update` and `pick-delete` flows should keep the shared operations modal pattern, including search, shared pagination and fixed footer actions
- relation pickers for `image-assets` must show real previews in the selection cards/tags for current and future entities
- relation pickers should flow sequentially with natural wrapping instead of rigid two-column layouts that leave large empty gaps
- long secondary relation texts such as URLs, file paths and slugs must be truncated with ellipsis plus `title` tooltip support instead of overflowing the selection cards
- if a public `GET` endpoint already exists for an entity, the admin shell should reuse that public read and keep only `create`, `update` and `delete` on protected routes
- complete only one official F8 substep per delivery unless there is explicit alignment to group more than one
- model relationship CRUD according to the API contracts:
  - `technology-contexts` is the only dedicated relationship entity with its own protected CRUD
  - the other relationship tables must be managed through relation arrays in the owning entity payloads
- split F8 into substeps:
  - `F8.1` admin login
  - `F8.2` admin shell
  - next substeps one per admin entity
- update documentation after every relevant interaction in this phase
- run quality scripts after every meaningful implementation increment

## Important scripts

- `npm run dev` - local Angular dev server.
- `npm run start` - alias for dev server.
- `npm run start:dev` - development configuration.
- `npm run start:prod` - production configuration serve.
- `npm run build` - production build.
- `npm run build:dev` - development build.
- `npm run build:prod` - production build.
- `npm run watch` - development watch build.
- `npm run lint` - Angular ESLint.
- `npm run test` - Karma/Jasmine tests.
- `npm run test:coverage` - Karma/Jasmine coverage.

## Collaboration rules

- Read the relevant page, service, helper and types before changing behavior.
- Preserve user changes and do not revert unrelated work.
- Keep changes incremental and easy to review.
- Update docs when decisions, contracts, scripts, or architecture change.
- After any meaningful implementation, run lint, coverage and build.
