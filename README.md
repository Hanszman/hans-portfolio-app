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

Run tests:

```bash
npm run test
```

Run tests with coverage:

```bash
npm run test:coverage
```

Lint code:

```bash
npm run lint
```

Build the package:

```bash
npm run build
```

Start the server:

```bash
npm run start
```

## 🛠️ Tech Stack

- **Angular 20.3.6**
- **TypeScript 5.9.2**
- **TailwindCSS**
- **SCSS**
- **Karma**
- **Jasmine**
- **React Testing Library**
- **JSDOM**
- **ESLint (flat config)**
- **Prettier**

## API Integration Notes

The backend already exposes public technology duration metrics that this frontend can consume during the integration phase.

Relevant route:

- `GET /technologies/:slug/experience-metrics`

The regular technology reads also embed the same structure:

- `GET /technologies`
- `GET /technologies/:slug`

Returned contract summary:

- `experienceMetrics.total`
- `experienceMetrics.byContext.PROFESSIONAL`
- `experienceMetrics.byContext.PERSONAL`
- `experienceMetrics.byContext.ACADEMIC`
- `experienceMetrics.byContext.STUDY`

Recommended frontend usage:

- show `experienceMetrics.total.label` on technology cards
- show the per-context breakdown in tooltips, drawers, or detail sections
- treat the total duration as overlap-safe because the backend already merges intersecting periods before calculating the final time span

## 📜 History of commands used to build this project:

```bash
npx @angular/cli@latest new hans-portfolio-app --style=scss --routing --standalone --strict

npm install -D tailwindcss@3.4.14 postcss autoprefixer

ng add @angular-eslint/schematics

npm install -D prettier eslint-config-prettier eslint-plugin-prettier

npm i -D @angular-architects/module-federation
```
