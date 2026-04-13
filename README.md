# Hans Portfolio App

An **Angular + TypeScript Front-End App** to show all the projects I've already worked.

## 🚀 Features

- ⚛️ **Angular 20.3.6** with **TypeScript 5.9.2**
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
- `input()`, `output()`, and `inject()` instead of legacy patterns when applicable
- zoneless change detection kept as part of the current app base
- SCSS + TailwindCSS for styling
- `hans-ui-design-lib` consumed via CDN/web components

## 📜 Mandatory Project Rules

### Angular conventions

This project must follow the current Angular direction consistently:

- do not create feature modules
- do not use `*ngIf` or `*ngFor`
- do not fall back to older Angular APIs out of habit
- prefer signals-based state over RxJS-based local state
- keep templates simple and move view-model logic to TypeScript when useful

### Testing and quality

Every component, page, service, helper, facade, mapper, or any other file with relevant behavior must be implemented together with its unit test.

The working goal for this remake is:

- `100%` coverage for relevant files and lines
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

If a missing component would clearly be reusable in other projects, stop and align before adding or changing anything in `hans-ui-design-lib`.

Portfolio-only UI can live in this repository when it is not a good fit for the shared design library.

## 🔀 Hans UI CDN Integration

The app is currently prepared to consume the design library through the CDN entrypoints declared in [src/index.html](src/index.html).

Current setup:

- stylesheet: `https://hans-ui-design-lib-cdn.vercel.app/hans-ui-design-lib.css`
- script: `https://hans-ui-design-lib-cdn.vercel.app/hans-ui-web-components.js`

The root app also already prepares a runtime theme override through `window.HansUI.setTheme(...)`.

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

At the moment, this repository is still close to the Angular scaffold stage:

- app routes are still empty
- the root component is still a temporary shell
- the design library CDN is already wired
- the remake plan is documented in [plano-implementacao-hans-portfolio-app-final-version.md](plano-implementacao-hans-portfolio-app-final-version.md)

No functional portfolio pages should be considered finished yet.

## 📜 History of commands used to build this project:

```bash
npx @angular/cli@latest new hans-portfolio-app --style=scss --routing --standalone --strict

npm install -D tailwindcss@3.4.14 postcss autoprefixer

ng add @angular-eslint/schematics

npm install -D prettier eslint-config-prettier eslint-plugin-prettier

npm i -D @angular-architects/module-federation
```
