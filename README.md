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
- ♾️ Deployed by **Vercel** at https://hans-portfolio-app.vercel.app/
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
- selection-only admin date fields must keep `allowInputTyping` disabled so the field stays readonly and opens the picker from the full input area, matching the design-library behavior
- admin forms with combined `startDate` and `endDate` fields must reuse the shared date-range validator and block submission when `endDate` is earlier than `startDate`
- admin relation selectors should wrap sequentially instead of staying in rigid two-column tracks, and long secondary texts such as URLs, paths and slugs must be truncated with ellipsis plus tooltip support

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

## 📜 History of commands used to build this project:

```bash
npx @angular/cli@latest new hans-portfolio-app --style=scss --routing --standalone --strict

npm install -D tailwindcss@3.4.14 postcss autoprefixer

ng add @angular-eslint/schematics

npm install -D prettier eslint-config-prettier eslint-plugin-prettier

npm i -D @angular-architects/module-federation
```
