import { AppTranslationLanguage } from '../translation.types';

export const EN_TRANSLATIONS = {
  'shell.api.eyebrow': 'API',
  'shell.api.connected.title': 'API connected',
  'shell.api.connected.description':
    'Health check passed at {{ checkedAtUtc }}.',
  'shell.api.loading.title': 'Connecting to API',
  'shell.api.loading.description':
    'Checking the backend availability for the current environment.',
  'shell.api.blocked.title': 'API request blocked',
  'shell.api.blocked.description':
    'The browser could not complete the initial backend request from {{ origin }}. The API may be online, but the access can still be blocked by CORS or network policy.',
  'shell.api.error.title': 'API request failed',
  'shell.api.error.description':
    'The initial backend health check could not be completed for the current environment.',
  'header.brand.role': 'Full Stack Engineer | Front-End specialist',
  'header.tags.angular': 'Angular 20',
  'header.tags.signals': 'Signals first',
  'header.tags.api': 'API live',
  'header.controls.theme': 'Theme',
  'header.controls.darkTheme': 'Dark theme',
  'header.controls.lightTheme': 'Light theme',
  'header.controls.language': 'Language',
  'header.controls.noLanguages': 'No languages available',
  'header.controls.portuguese': 'Portuguese',
  'header.controls.english': 'English',
  'header.statusLabel': 'Foundation status',
  'header.eyebrow': 'Portfolio remake foundation',
  'header.title':
    'A shell specific to the portfolio, already connected to real backend data.',
  'header.description':
    'This first layout layer establishes the portfolio structure, keeps the app aligned with the design library, and prepares the next visual iterations on top of a responsive Angular shell.',
  'header.highlight.layout.label': 'Layout',
  'header.highlight.layout.title': 'Header, footer, nav and page wrappers',
  'header.highlight.layout.description':
    'Portfolio-specific composition organized inside the app layout layer.',
  'header.highlight.integration.label': 'Integration',
  'header.highlight.integration.title': 'Real API from the start',
  'header.highlight.integration.description':
    'The shell stays wired to the backend so every next page can evolve on real data.',
  'header.highlight.direction.label': 'Direction',
  'header.highlight.direction.title':
    'Design-lib first, portfolio-specific structure second',
  'header.highlight.direction.description':
    'Reusable lib components stay as the base while unique portfolio layout lives here.',
  'footer.eyebrow': 'Portfolio shell',
  'footer.title': 'Layout foundation ready for the next page builds',
  'footer.description':
    'The portfolio-specific shell now separates layout from pages, keeps navigation centralized from the route config, and stays aligned with the design library.',
  'footer.navigationLabel': 'Footer navigation',
  'footer.principlesLabel': 'Implementation principles',
  'footer.tags.standalone': 'Standalone only',
  'footer.tags.tailwind': 'Tailwind @apply',
  'footer.tags.coverage': '100% coverage',
  'pages.home.sectionLabel': 'Foundation',
  'pages.home.title': 'Home foundation',
  'pages.home.description':
    'The home route is wired and ready for the upcoming hero, highlights, and API-driven portfolio summary.',
  'pages.home.roadmap.label': 'Roadmap',
  'pages.home.roadmap.title': 'Hero, highlights and API-driven overview',
  'pages.home.roadmap.description':
    'The home page will introduce Victor, reinforce positioning, and surface the first backend-driven summary cards.',
  'pages.home.status.label': 'Status',
  'pages.home.status.title': 'Shell ready',
  'pages.home.status.description':
    'This route already sits inside the new portfolio shell and is ready for the upcoming hero, highlights, and API-driven summary implementation.',
  'pages.home.layout.label': 'Layout layer',
  'pages.home.layout.title': 'Page-specific component',
  'pages.home.layout.description':
    'The content now lives in the Home page component instead of being passed as static route data.',
  'pages.experiences.sectionLabel': 'Foundation',
  'pages.experiences.title': 'Experiences foundation',
  'pages.experiences.description':
    'The experiences route is ready for the timeline, impact narrative, and API-driven career data.',
  'pages.experiences.roadmap.label': 'Roadmap',
  'pages.experiences.roadmap.title': 'Impact timeline and leadership narrative',
  'pages.experiences.roadmap.description':
    'This page will organize career history by context, impact, stack, and relationships from the backend.',
  'pages.experiences.status.label': 'Status',
  'pages.experiences.status.title': 'Career storytelling',
  'pages.experiences.status.description':
    'The structure is ready for richer sections that make the career path easier to scan and understand.',
  'pages.experiences.layout.label': 'Layout layer',
  'pages.experiences.layout.title': 'Page-specific component',
  'pages.experiences.layout.description':
    'This page owns its own static foundation content instead of receiving it from route data.',
  'pages.skills.sectionLabel': 'Foundation',
  'pages.skills.title': 'Skills foundation',
  'pages.skills.description':
    'The skills route is ready for grouped technologies, concepts, patterns, and experience metrics.',
  'pages.skills.roadmap.label': 'Roadmap',
  'pages.skills.roadmap.title':
    'Technology clusters and real experience metrics',
  'pages.skills.roadmap.description':
    'This page will consume backend skill data and organize it into useful filters, groups, and summaries.',
  'pages.skills.status.label': 'Status',
  'pages.skills.status.title': 'Concepts, patterns and architectures',
  'pages.skills.status.description':
    'The remake will include broader technical knowledge, not only specific technologies.',
  'pages.skills.layout.label': 'Layout layer',
  'pages.skills.layout.title': 'Page-specific component',
  'pages.skills.layout.description':
    'Skills-specific composition can now evolve independently from the other routes.',
  'pages.projects.sectionLabel': 'Foundation',
  'pages.projects.title': 'Projects foundation',
  'pages.projects.description':
    'The projects route is ready for featured work, screenshots, links, and API-driven project data.',
  'pages.projects.roadmap.label': 'Roadmap',
  'pages.projects.roadmap.title': 'Featured work, outcomes and linked assets',
  'pages.projects.roadmap.description':
    'This page will connect projects to technologies, deployments, repositories, and supporting images.',
  'pages.projects.status.label': 'Status',
  'pages.projects.status.title': 'Screenshots, links and deploy references',
  'pages.projects.status.description':
    'The remake will make each project easier to evaluate with richer assets and explicit references.',
  'pages.projects.layout.label': 'Layout layer',
  'pages.projects.layout.title': 'Page-specific component',
  'pages.projects.layout.description':
    'Projects-specific content now lives inside the Projects page and can evolve without route data coupling.',
  'pages.dashboard.sectionLabel': 'Foundation',
  'pages.dashboard.title': 'Dashboard foundation',
  'pages.dashboard.description':
    'The dashboard route is ready for aggregate metrics, charts, and API-driven portfolio insights.',
  'pages.dashboard.roadmap.label': 'Roadmap',
  'pages.dashboard.roadmap.title':
    'Operational metrics and aggregate portfolio data',
  'pages.dashboard.roadmap.description':
    'This page will evolve into the visual summary layer for totals, relationships, and health indicators.',
  'pages.dashboard.status.label': 'Status',
  'pages.dashboard.status.title': 'Charts and portfolio health',
  'pages.dashboard.status.description':
    'The dashboard foundation is isolated as its own page so charts and metrics can grow cleanly.',
  'pages.dashboard.layout.label': 'Layout layer',
  'pages.dashboard.layout.title': 'Page-specific component',
  'pages.dashboard.layout.description':
    'Dashboard-specific content is now owned by the Dashboard page instead of route metadata.',
} as const satisfies AppTranslationLanguage;
