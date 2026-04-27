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
  'header.controls.darkMode': 'Dark mode',
  'header.controls.darkTheme': 'Dark theme',
  'header.controls.lightTheme': 'Light theme',
  'header.controls.language': 'Language',
  'header.controls.noLanguages': 'No languages available',
  'header.controls.portuguese': 'Portuguese',
  'header.controls.english': 'English',
  'header.controls.spanish': 'Spanish',
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
  'pages.home.hero.eyebrow': 'Strategic portfolio home',
  'pages.home.hero.title':
    'Victor Hanszman builds front-end platforms that turn complex products into clear, durable experiences.',
  'pages.home.hero.description':
    'A full stack engineer with strong front-end specialization, focused on Angular, TypeScript, design systems, analytical dashboards, legacy modernization, and API-driven product surfaces.',
  'pages.home.cta.projects': 'View projects',
  'pages.home.cta.dashboard': 'Open dashboard',
  'pages.home.metrics.years.label': 'Experience',
  'pages.home.metrics.years.description': 'Years building web products',
  'pages.home.metrics.projects.label': 'Projects',
  'pages.home.metrics.projects.description': 'Published portfolio cases',
  'pages.home.metrics.technologies.label': 'Technologies',
  'pages.home.metrics.technologies.description': 'Mapped stack signals',
  'pages.home.metrics.experiences.label': 'Experiences',
  'pages.home.metrics.experiences.description': 'Career chapters in the API',
  'pages.home.api.label': 'Live API',
  'pages.home.api.title': 'Real data from the first screen',
  'pages.home.api.description':
    'The home already reads the dashboard aggregate endpoint, so the portfolio grows from the backend instead of static mock data.',
  'pages.home.api.loading': 'Connecting live portfolio data...',
  'pages.home.api.error':
    'The dashboard endpoint is unavailable right now, but the page keeps its strategic content ready.',
  'pages.home.api.featuredProjects': 'Featured',
  'pages.home.api.highlightedProjects': 'Highlighted',
  'pages.home.api.usageLinks': 'Stack links',
  'pages.home.pillars.label': 'Positioning',
  'pages.home.pillars.title': 'Senior front-end craft with full stack context',
  'pages.home.pillars.description':
    'The home starts by making the professional signal obvious: architecture, delivery quality, and product clarity.',
  'pages.home.pillars.architecture.label': 'Architecture',
  'pages.home.pillars.architecture.title': 'Angular-first front-end foundations',
  'pages.home.pillars.architecture.description':
    'Component strategy, state boundaries, typed contracts, and UI systems designed to scale without becoming opaque.',
  'pages.home.pillars.architecture.tag.angular': 'Angular',
  'pages.home.pillars.architecture.tag.signals': 'Signals',
  'pages.home.pillars.architecture.tag.designSystem': 'Design Systems',
  'pages.home.pillars.delivery.label': 'Delivery',
  'pages.home.pillars.delivery.title': 'Quality habits that survive release pressure',
  'pages.home.pillars.delivery.description':
    'Test-first discipline, linted code, CI/CD awareness, and backend contracts that keep product work predictable.',
  'pages.home.pillars.delivery.tag.tdd': 'TDD',
  'pages.home.pillars.delivery.tag.ci': 'CI/CD',
  'pages.home.pillars.delivery.tag.api': 'REST APIs',
  'pages.home.pillars.product.label': 'Product',
  'pages.home.pillars.product.title': 'Interfaces that make business logic readable',
  'pages.home.pillars.product.description':
    'Dashboards, legacy migrations, and enterprise workflows shaped into screens people can scan and trust.',
  'pages.home.pillars.product.tag.dashboard': 'Dashboards',
  'pages.home.pillars.product.tag.legacy': 'Legacy modernization',
  'pages.home.pillars.product.tag.ux': 'UX clarity',
  'pages.home.highlights.label': 'Highlights',
  'pages.home.highlights.title': 'Featured signals from the portfolio API',
  'pages.home.highlights.description':
    'Projects, experiences, technologies, and career assets marked as highlights in the backend.',
  'pages.home.highlights.featured': 'Featured',
  'pages.home.highlights.empty': 'No highlighted portfolio items were returned yet.',
  'pages.home.stack.label': 'Stack',
  'pages.home.stack.title': 'Stack areas with real portfolio links',
  'pages.home.stack.description':
    'The strongest groups come from project and technology relationships already modeled by the API.',
  'pages.home.stack.projects': 'projects',
  'pages.home.stack.technologies': 'technologies',
  'pages.home.stack.empty': 'No stack distribution was returned yet.',
  'pages.home.career.label': 'Career',
  'pages.home.career.title': 'Current professional focus',
  'pages.home.career.description':
    'The first career signal comes from the public professional timeline endpoint.',
  'pages.home.career.empty': 'No professional timeline items were returned yet.',
  'pages.home.topTechnologies.label': 'Technology usage',
  'pages.home.topTechnologies.title': 'Most connected technologies',
  'pages.home.topTechnologies.description':
    'Top technologies are ranked by their usage relationships across projects, experiences, and formations.',
  'pages.home.topTechnologies.empty': 'No technology usage data was returned yet.',
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
  'pages.experiences.sectionLabel': 'Career',
  'pages.experiences.title': 'Experience narrative',
  'pages.experiences.description':
    'Career chapters now read the public experiences endpoint and turn relationships into a scannable professional timeline.',
  'pages.experiences.snapshot.label': 'Career snapshot',
  'pages.experiences.snapshot.title': 'Trajectory coverage from the live API',
  'pages.experiences.snapshot.description':
    'Counts, current role signal, and relationship breadth are derived from the published experiences collection.',
  'pages.experiences.snapshot.loading':
    'Loading live experience relationships...',
  'pages.experiences.snapshot.error':
    'The experiences endpoint is unavailable right now.',
  'pages.experiences.snapshot.metrics.currentRole': 'Current role',
  'pages.experiences.snapshot.metrics.experiences': 'Chapters',
  'pages.experiences.snapshot.metrics.projects': 'Projects',
  'pages.experiences.snapshot.metrics.technologies': 'Technologies',
  'pages.experiences.snapshot.metrics.customers': 'Customers',
  'pages.experiences.snapshot.metrics.highlights': 'Highlights',
  'pages.experiences.timeline.label': 'Career narrative',
  'pages.experiences.timeline.title':
    'Timeline, context, and impact in the same reading flow',
  'pages.experiences.timeline.description':
    'Each chapter connects company, role, customers, projects, and stack signals so the professional story reads as a system instead of a flat list.',
  'pages.experiences.timeline.loading':
    'Loading live experience relationships...',
  'pages.experiences.timeline.error':
    'The experiences endpoint is unavailable right now.',
  'pages.experiences.timeline.empty':
    'No published experience chapters were returned yet.',
  'pages.experiences.timeline.current': 'Current',
  'pages.experiences.timeline.highlight': 'Highlight',
  'pages.experiences.timeline.roles': 'Roles',
  'pages.experiences.timeline.customers': 'Customers',
  'pages.experiences.timeline.emptyCustomers': 'No linked customers yet.',
  'pages.experiences.timeline.technologyStack': 'Technology stack',
  'pages.experiences.timeline.relatedProjects': 'Related projects',
  'pages.experiences.timeline.emptyProjects':
    'No related projects were returned for this chapter.',
  'pages.skills.sectionLabel': 'Technology',
  'pages.skills.title': 'Technology depth',
  'pages.skills.description':
    'The skills page now turns live `experienceMetrics` into a clearer technology catalog, with useful filters and context-based reading.',
  'pages.skills.snapshot.label': 'Portfolio snapshot',
  'pages.skills.snapshot.title': 'Technology clarity from live API metrics',
  'pages.skills.snapshot.description':
    'The sidebar summarizes category breadth, highlight density, and the strongest duration signal already published by the backend.',
  'pages.skills.snapshot.loading': 'Loading technology experience metrics...',
  'pages.skills.snapshot.error':
    'The technologies endpoint is unavailable right now.',
  'pages.skills.filters.label': 'Catalog filters',
  'pages.skills.filters.title': 'Slice the stack by category, level, and context',
  'pages.skills.filters.description':
    'Filters stay lightweight in the UI while the real technology durations still come from the backend contracts.',
  'pages.skills.filters.category': 'Category',
  'pages.skills.filters.level': 'Level',
  'pages.skills.filters.context': 'Context',
  'pages.skills.filters.total': 'Filtered technologies',
  'pages.skills.catalog.label': 'Technology groups',
  'pages.skills.catalog.title': 'Grouped reading for the current filter set',
  'pages.skills.catalog.description':
    'Each technology card highlights total experience plus the contexts where that stack has already been used.',
  'pages.skills.catalog.loading': 'Building technology groups...',
  'pages.skills.catalog.error':
    'The technologies endpoint is unavailable right now.',
  'pages.skills.catalog.empty':
    'No published technologies matched the current filters.',
  'pages.skills.card.highlight': 'Highlight',
  'pages.skills.card.totalExperience': 'Total experience',
  'pages.skills.card.contexts': 'Context coverage',
  'taxonomy.skills.filters.allCategories': 'All categories',
  'taxonomy.skills.filters.allLevels': 'All levels',
  'taxonomy.skills.filters.allContexts': 'All contexts',
  'taxonomy.skills.fallback.uncategorized': 'Uncategorized',
  'taxonomy.skills.fallback.levelNotSet': 'Level not set',
  'taxonomy.skills.fallback.frequencyNotSet': 'Frequency not set',
  'taxonomy.skills.fallback.noDuration': 'No duration available',
  'taxonomy.skills.fallback.zeroMonths': '0 months',
  'taxonomy.skills.summary.mapped': 'Mapped technologies',
  'taxonomy.skills.summary.highlights': 'Highlights',
  'taxonomy.skills.summary.categories': 'Categories',
  'taxonomy.skills.summary.advanced': 'Advanced stack',
  'taxonomy.skills.summary.longest': 'Longest total time',
  'taxonomy.skills.group.description':
    '{{count}} technologies with real duration coverage by context.',
  'taxonomy.skills.category.framework': 'Framework',
  'taxonomy.skills.category.language': 'Language',
  'taxonomy.skills.category.library': 'Library',
  'taxonomy.skills.category.database': 'Database',
  'taxonomy.skills.category.devops': 'DevOps',
  'taxonomy.skills.category.orm': 'ORM',
  'taxonomy.skills.level.advanced': 'Advanced',
  'taxonomy.skills.level.intermediate': 'Intermediate',
  'taxonomy.skills.level.beginner': 'Beginner',
  'taxonomy.skills.frequency.frequent': 'Frequent',
  'taxonomy.skills.frequency.occasional': 'Occasional',
  'taxonomy.skills.frequency.rare': 'Rare',
  'taxonomy.skills.context.professional': 'Professional',
  'taxonomy.skills.context.personal': 'Personal',
  'taxonomy.skills.context.academic': 'Academic',
  'taxonomy.skills.context.study': 'Study',
  'taxonomy.experiences.projectStatus.completed': 'Completed',
  'taxonomy.experiences.projectStatus.inProgress': 'In progress',
  'taxonomy.experiences.projectEnvironment.frontend': 'Front-end',
  'taxonomy.experiences.projectEnvironment.backend': 'Back-end',
  'taxonomy.experiences.projectEnvironment.fullstack': 'Full stack',
  'taxonomy.experiences.present': 'Present',
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
