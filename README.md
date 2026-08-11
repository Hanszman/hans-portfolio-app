# Hans Portfolio App

An **Angular + TypeScript Front-End App** to show all the projects I've already worked.

## 🚀 Features

- ⚙️ **Angular 20.3.6** with **TypeScript 5.9.2**
- 🏠 Strategic home already hydrated by the public dashboard endpoint
- 💼 Experiences page already rendered as a live career timeline from `GET /experiences`
- 🧠 Skills page now grouped by real `GET /technologies` experience metrics
- 🎨 **TailwindCSS + SCSS** for styling flexibility
- ✅ **Karma + Jasmine** for unit and integration testing
- 📊 **Test Coverage** with HTML reports
- 🧹 **ESLint + Prettier** for code quality and formatting
- ♾️ Deployed by **Vercel** at https://victor-hanszman-portfolio.vercel.app/
- **Node Version to build this project: 24.14.1 and npm 11.11.0**

## 🧑‍💻 Development

Clone the repo and install dependencies:

```bash
git clone https://github.com/Hanszman/hans-portfolio-app.git
cd hans-portfolio-app
npm install
```

Start the dev server:

```bash
npm run dev
```

Start the app:

```bash
npm run start
```

Run unit tests:

```bash
npm run test
```

Run tests with coverage:

```bash
npm run test:coverage
```

Lint the code:

```bash
npm run lint
```

Build the project:

```bash
npm run build
```

## 🛠️ Tech Stack

- Angular `20.3.6`
- TypeScript `5.9.2`
- TailwindCSS
- SCSS
- Karma
- Jasmine
- ESLint
- Prettier

## 🔀 Current Direction

- Angular `20.3.6`
- TypeScript `5.9.2`
- standalone components only
- modern Angular APIs only when available and appropriate
- signals as the default state model
- `computed()` and `effect()` as primary reactive tools
- RxJS only when it is truly necessary
- new template syntax with `@if` and `@for`
- `input()`, `output()` and `inject()` instead of legacy patterns when applicable
- zoneless change detection kept as part of the current app base
- SCSS + TailwindCSS for styling
- `hans-ui-design-lib` consumed via CDN/web components
- public pages should be progressively refactored into smaller page-local or shared components as the portfolio grows
- page-only components belong inside the owning page folder; cross-page reusable components belong in `src/app/shared/`
- public entity cards should stay concise in the page flow and expand deeper relationships and analytics inside detail modals when appropriate

## 📜 Mandatory Project Rules

### Angular conventions

This project must follow the current Angular direction consistently:

- do not create feature modules
- do not use `*ngIf` or `*ngFor`
- do not fall back to older Angular APIs out of habit
- prefer signals-based state over RxJS-based local state
- keep templates simple and move view-model logic to TypeScript when useful
- feature-specific helpers must live inside a local `helpers/` folder near the component, page, or domain they support
- every feature-local typing structure must live in that feature's own `*.types.ts` file, including interfaces, type aliases, view-models, local aggregate contracts and component/page support constants tied to that model
- component/page `.ts` and local helper files must not keep inline interfaces or type aliases when those structures belong to the feature's code model; move them to the owning `*.types.ts` file
- helpers should keep only helper functions and should not become a mixed file for contracts/constants
- stylesheets must prefer Tailwind utilities through `@apply`; plain CSS/SCSS should only be used when there is no adequate Tailwind utility for that rule
- when TypeScript needs translated labels, pass translation keys only and resolve them through `TranslationService`; do not keep locale-to-text maps in `types`, helpers, or components
- translated select options must be recomputed from the active locale so enum and dropdown labels update immediately after language changes
- when API/domain content arrives with localized fields, resolve it through the centralized translation helpers instead of ad hoc `if`/ternary checks
- admin closed-list fields must use `hans-select-option`, and date, datetime or time fields must use `hans-date-picker` with the correct mode instead of plain text inputs
- live CRUD entity cards must replace their roadmap cards and use the same visual composition as Jobs and Formations in both themes: `//` kicker, bold title, theme-token border/background, description, endpoint and shared operations actions
- translated `hans-select-option` values must preserve the library option contract with stable raw `value` and translated `label`; do not pass plain translated string arrays
- selection-only admin date fields must keep `allowInputTyping` disabled so the field stays readonly and opens the picker from the full input area, matching the design-library behavior
- admin forms with combined `startDate` and `endDate` fields must reuse the shared date-range validator and block submission when `endDate` is earlier than `startDate`
- date-only values from admin date pickers must be serialized as ISO datetimes before protected mutation requests
- modal body scrolling and top/bottom content padding are provided by `hans-ui-design-lib`; app CRUD wrappers must not create nested scroll or duplicate modal padding
- dynamic relation and select catalogs are refreshed through their public GET whenever a CRUD form or picker opens, keeping newly created records available without a full page reload
- admin relation selectors should wrap sequentially instead of staying in rigid two-column tracks, and long secondary texts such as URLs, paths and slugs must be truncated with ellipsis plus tooltip support

### Shared admin operations composition

The twelve authenticated CRUD workspaces share the same composition under
`src/app/shared/operations/`:

- `app-operations` owns the entity shell, operation actions and loading, error and empty states
- `app-operations-modal` owns modal chrome, search, pagination and the shared read, selection and delete-confirmation modes; operation feedback is emitted exclusively through the global toast service
- `app-operations-item` renders update/delete picker rows and the static delete summary
- `app-operations-detailed-item` renders read cards and emits direct update/delete actions
- `app-operations-relation-picker` renders relation catalogs, including optional image previews

Entity components remain responsible for API calls, signals, form controls and
domain-specific view-model mapping. The semantic
`--app-operations-surface-color` theme token is the common background for
operation items, relation pickers and admin toggle wrappers in light and dark
themes.

Admin reads refresh their public collection whenever the read modal opens, so
inverse relation lists reflect mutations made from either owning side. Detailed
cards render identity fields through the same labeled field composition as every
other value, format date ranges as a single translated `Date` field and expose
all returned relations as comma-separated labels.

API services are organized directly by domain under `src/app/core/api/<domain>/`.
Authentication lives in `core/api/admin-auth`, while Experiences and Projects
each use one merged domain service for their public GET and protected create,
update and delete requests. Each of those domains now keeps only its canonical
service, types and service-spec files; the obsolete `*-operations` API variants
and the `core/api/admin/` intermediate folder are intentionally absent.

### Localized portfolio content

Static interface copy and API-backed portfolio content support `pt-br`, `en-us`
and `es-es`. Public mappers always provide all three variants to the centralized
localization resolver. Admin create/update forms intentionally show Pt, En and Es
together, while admin read cards show only the active locale under neutral labels
such as `Title`, `Summary` and `Description`. Changing the global language updates
an open read modal reactively without fetching the same record again.

Translation keys use one canonical semantic namespace: reusable copy belongs under
`common.*`, enum and closed-list labels under `taxonomy.*`, shell copy under
`header.*` or `footer.*`, and only truly local copy under `pages.<page>.*`. Before
creating a key, search all catalogs and reuse an existing key when the same English,
Portuguese and Spanish message already exists. Case-only differences use Tailwind
text-transform utilities rather than duplicate keys.

Every key change must update `AppTranslationKey`, the `en-us`, `pt-br` and `es-es`
catalogs, all consumers and their tests atomically. The catalogs must keep identical
key sets, interpolation parameters and intent, with no unused keys or duplicate
translation triplets. Templates use `TranslatePipe`; TypeScript uses
`TranslationService`; locale-reactive options and view-models must recompute when the
selected language changes. API-backed fields such as `titlePt`, `titleEn` and
`titleEs` remain localized content and are resolved by shared content helpers instead
of being copied into UI catalogs.

The operational checklist for adding, renaming or removing UI keys is available in
`.agents/skills/add-portfolio-translation-key/SKILL.md`. New locales or persisted
localized fields continue to follow the broader language skills for Front-End and
Back-End.

When adding another language:

1. Add the locale to the translation types/configuration, language catalog and
   selector options.
2. Add the corresponding API properties to domain, nested-relation, dashboard,
   mutation, mock and fixture types.
3. Extend every `resolveLocalizedText` map and the shared admin localized-value
   helper; do not add locale conditionals in components.
4. Add create/update inputs after the existing localized group, including
   library `required`, hydration, reset, validation, payload and toast copy.
5. Keep read mode to one neutral field per localized concept and verify that the
   open modal reacts to locale changes, including nested relations and media text.
6. Cover public mapping, CRUD payloads, fallback behavior and locale switching,
   then run lint, coverage and build together with the backend contract checks.

### Testing and quality

Every component, page, service, helper, facade, mapper, or any other file with relevant behavior must be implemented together with its unit test.

The working goal for this remake is:

- `100%` coverage for relevant files and lines
- `100%` statements, branches, functions and lines for each file with relevant behavior
- explicit exclusions only for configuration, generated files, or trivial framework glue that adds no real value to execution-based coverage

For implementation steps, always validate the repo with the relevant scripts:

- `npm run test`
- `npm run test:coverage`
- `npm run lint`
- `npm run build`

### Hans UI Design Library policy

`hans-ui-design-lib` is the official visual base of this project.

Always check the design library before creating a new UI component in this app. If a reusable component already exists there, use it here instead of recreating it.

Common components already available in the library include:

- button
- input
- dropdown
- select-option
- toggle
- date-picker
- avatar
- card
- carousel
- tag
- chart
- accordion
- icon
- loading
- kanban
- popup
- toast
- modal
- table
- tabs

For the current public-portfolio refinement stage, the default preference is to reach first for library primitives such as:

- `hans-loading` for loading states
- `hans-modal` for entity details
- `hans-carousel` for larger image galleries
- `hans-chart` and `hans-table` for analytics/details
- `hans-card` for reusable card surfaces when the library contract fits the need

If a missing component would clearly be reusable in other projects, stop and align before adding or changing anything in `hans-ui-design-lib`.

Portfolio-only UI can live in this repository when it is not a good fit for the shared design library.

## 🔀 Hans UI CDN Integration

The app is currently prepared to consume the design library through the CDN entrypoints declared in [src/index.html](src/index.html).

This section documents the integration behavior used by this app. The canonical explanation of shared CDN parameters should also exist in `hans-ui-design-lib`, because other consumers may need the same guidance.

Current setup:

- stylesheet: `https://hans-ui-design-lib-cdn.vercel.app/hans-ui-design-lib.css?v=x.x.x`
- script: `https://hans-ui-design-lib-cdn.vercel.app/hans-ui-web-components.js?v=x.x.x`

The root app also already prepares a runtime theme override through `window.HansUI.setTheme(...)`.

### CDN cache busting

The optional `?v=` query string used in local and production HTML files is a browser cache-busting marker, not a runtime option consumed by the library.

Use it when you need to force the browser to fetch a fresh CDN asset after a local or published library rebuild. Keep the same value on both the CSS and JS files so both assets come from the same library build.

Examples:

- local validation: `?v=1.0.25-local-dev`
- production release: `?v=<published-version-or-build-id>`

Use a local-only suffix only when you need to invalidate browser cache against a local CDN preview while keeping the underlying library release clear, for example `1.0.25-local-dev`.

That suffix is not mandatory and is not a special library feature. It was chosen only to make local cache resets easy to identify during debugging. Production should not use a local suffix; it should use the real published library version or a CI-injected build identifier.

When a new `hans-ui-design-lib` version is published and the app should consume it immediately, update both files together or automate that replacement in the consumer deploy pipeline.

The recommended production strategy is to inject the same release identifier into both assets at deploy time, for example:

- the npm package version
- a git SHA
- a CI build id

That automation belongs to the consuming app deployment, because the consuming app decides which library build it wants to pin.

### Shared public detail modals

Public details use shared modal adapters instead of page-local shells:

- `app-technology-modal` uses a large responsive two-column layout, ordinal `hans-progress-bar` fields and a `hans-chart` radar whose tooltip reports each context in months.
- `app-experience-modal` renders customers and technologies through `app-tag-button`; customer tags are static and technology tags keep navigation behavior.
- `app-project-modal` and `app-education-modal` render `hans-carousel` only when valid linked images exist and increase the modal size only in that case.
- `app-spoken-language-modal` preserves the established small language modal presentation.
- Public detail modals use `app-modal-skeleton` while their visual media settles. The adapter delegates to `hans-loading`, uses `primary` in the light theme and `neutral` in the dark theme, and releases the content on both media load and error.

### Deferred media inside web components

Web components whose image dimensions depend on a stylesheet linked inside their Shadow DOM must not receive their media source before that stylesheet is ready. Otherwise, slow connections can briefly paint the intrinsic image at full size.

Use the standalone `appDeferredImageSource` directive for those integrations. It reserves a constrained frame immediately and assigns `src` or another configured source attribute only after the component's internal stylesheets finish loading. `app-tag-button` owns this behavior centrally for every `hans-tag`, so page and modal consumers must continue to provide image data through the shared tag component instead of binding `image-src` directly.

Gallery mapping must sort by relation order, ignore missing paths and deduplicate repeated assets by ID or path. When a modal can open another modal, close the current overlay first so focus trapping and scrolling remain owned by a single dialog.

## 🔀 API Integration Notes

The backend already exposes the public content and dashboard routes that this frontend will consume in the integration phase.

Important public routes include:

- `GET /projects`
- `GET /experiences`
- `GET /technologies`
- `GET /technology-contexts`
- `GET /formations`
- `GET /spoken-languages`
- `GET /customers`
- `GET /jobs`
- `GET /links`
- `GET /image-assets`
- `GET /tags`
- `GET /portfolio-settings`
- `GET /dashboard`
- `GET /dashboard/stack-distribution`
- `GET /dashboard/project-contexts`
- `GET /dashboard/technology-usage`
- `GET /dashboard/professional-timeline`
- `GET /dashboard/highlights`

Technology responses already expose normalized `experienceMetrics`, including:

- `experienceMetrics.total`
- `experienceMetrics.byContext.PROFESSIONAL`
- `experienceMetrics.byContext.PERSONAL`
- `experienceMetrics.byContext.ACADEMIC`
- `experienceMetrics.byContext.STUDY`

The backend also normalizes media and URLs through relations, so the frontend should consume linked `image_asset` and `link` data instead of expecting old direct scalar fields such as `icon`, `repositoryUrl`, `deployUrl`, `docsUrl`, `npmUrl`, or `officialUrl`.

## ♾️ Current Repo State

At the moment, this repository already has the first public pages evolving on real backend data:

- the app shell, strategic home and experiences timeline are implemented
- the skills route now consumes the public `GET /technologies` collection with real `experienceMetrics`
- the projects route now consumes the public `GET /projects` collection with linked technologies, links, screenshots and related experiences
- home consumes the public dashboard aggregate endpoints
- dashboard now consumes `GET /dashboard` plus the specialized aggregate endpoints for stack distribution, project contexts, technology usage, professional timeline and highlights
- experiences consumes the public `GET /experiences` collection with related projects, customers, jobs, technologies and image assets
- the design library CDN is already wired
- the remake plan is documented in [plano-implementacao-hans-portfolio-app-final-version.md](plano-implementacao-hans-portfolio-app-final-version.md)

The next official frontend step after the current implementation is `F8`, focused on the authenticated administrative area of the portfolio.

That step includes:

- hidden admin login route reached only by URL
- real authentication through `POST /auth/login`
- protected admin session flow validated by `GET /admin/session`
- non-public admin routes guarded in the frontend
- entity management UI with create, update and delete operations backed by `/admin/<resource>`
- modal-based admin forms built primarily with `hans-ui-design-lib`
- F8.12 (`technology-contexts`) is complete with public read reuse, grouped-response normalization in the domain service, protected create/update/delete flows, translated context options, themed date pickers and the shared operations modal pattern

F8.13 (`experiences`) and F8.14 (`projects`) are complete. The authenticated admin CRUD sequence planned for F8 is now finished, with public GET reuse, protected CUD operations, shared operations modals/actions, translated closed-list fields, dynamic relation catalogs, image previews and the established date-field behavior.

## 📜 History of commands used to build this project:

```bash
npx @angular/cli@latest new hans-portfolio-app --style=scss --routing --standalone --strict

npm install -D tailwindcss@3.4.14 postcss autoprefixer

ng add @angular-eslint/schematics

npm install -D prettier eslint-config-prettier eslint-plugin-prettier

npm i -D @angular-architects/module-federation
```
