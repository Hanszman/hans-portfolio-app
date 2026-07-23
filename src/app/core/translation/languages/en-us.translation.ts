import { AppTranslationLanguage } from '../translation.types';

export const EN_TRANSLATIONS = {
  'header.brand.home': 'Go to home',
  'header.brand.role': 'Full Stack Engineer | Front-End specialist',
  'header.tags.angular': 'Angular 20',
  'header.tags.signals': 'Signals first',
  'header.tags.api': 'API live',
  'header.controls.theme': 'Theme',
  'header.controls.darkMode': 'Dark mode',
  'header.controls.darkTheme': 'Dark theme',
  'header.controls.lightTheme': 'Light theme',
  'header.controls.language': 'Language',
  'header.controls.navigation': 'Navigation menu',
  'header.controls.noLanguages': 'No languages available',
  'header.controls.portuguese': 'Portuguese',
  'header.controls.english': 'English',
  'header.controls.spanish': 'Spanish',
  'header.navigation.home': 'Home',
  'header.navigation.experiences': 'Experiences',
  'header.navigation.skills': 'Skills',
  'header.navigation.projects': 'Projects',
  'header.navigation.dashboard': 'Dashboard',
  'header.statusLabel': 'Foundation status',
  'header.eyebrow': 'Portfolio foundation',
  'header.title': 'A shell specific to the portfolio, already connected to real backend data.',
  'header.description':
    'This first layout layer establishes the portfolio structure, keeps the app aligned with the design library and prepares the next visual iterations on top of a responsive Angular shell.',
  'header.highlight.layout.label': 'Layout',
  'header.highlight.layout.title': 'Header, footer, nav and page wrappers',
  'header.highlight.layout.description':
    'Portfolio-specific composition organized inside the app layout layer.',
  'header.highlight.integration.label': 'Integration',
  'header.highlight.integration.title': 'Real API from the start',
  'header.highlight.integration.description':
    'The shell stays wired to the backend so every next page can evolve on real data.',
  'header.highlight.direction.label': 'Direction',
  'header.highlight.direction.title': 'Design-lib first, portfolio-specific structure second',
  'header.highlight.direction.description':
    'Reusable lib components stay as the base while unique portfolio layout lives here.',
  'footer.eyebrow': 'Portfolio shell',
  'footer.title': 'Layout foundation ready for the next page builds',
  'footer.description':
    'The portfolio-specific shell now separates layout from pages, keeps navigation centralized from the route config and stays aligned with the design library.',
  'footer.navigationLabel': 'Footer navigation',
  'footer.principlesLabel': 'Implementation principles',
  'footer.tags.standalone': 'Standalone only',
  'footer.tags.tailwind': 'Tailwind @apply',
  'footer.tags.coverage': '100% coverage',
  'footer.social.navigation': 'Social links',
  'footer.social.github': 'Open GitHub profile',
  'footer.social.linkedin': 'Open LinkedIn profile',
  'footer.social.whatsapp': 'Open WhatsApp contact',
  'footer.social.email': 'Send an email',
  'footer.location': 'Belo Horizonte, Brazil',
  'footer.copyright.name': 'Victor Hanszman',
  'footer.copyright.year': '© {{ year }}',
  'common.actions.viewDetails': 'View details',
  'common.actions.close': 'Close',
  'common.actions.save': 'Save',
  'common.actions.applyFilters': 'Apply filters',
  'common.actions.showMore': 'Show more',
  'common.actions.showLess': 'Show less',
  'common.search.label': 'Search',
  'common.search.placeholder': 'Search records',
  'common.pagination.navigation': 'Pagination',
  'common.pagination.first': 'First',
  'common.pagination.previous': 'Previous',
  'common.pagination.next': 'Next',
  'common.pagination.last': 'Last',
  'common.pagination.pageLabel': 'Page',
  'common.pagination.page': 'Go to page {{ page }}',
  'pages.home.hero.availability': 'Available for work',
  'pages.home.hero.greeting': "Hi, I'm",
  'pages.home.hero.subtitle': 'Full Stack Software Engineer',
  'pages.home.hero.description':
    'Full Stack Software Engineer specializing in Front-End and Back-End. Based in Belo Horizonte, Minas Gerais, Brazil. Currently working remotely and open to new opportunities in software development.',
  'pages.home.hero.location': 'Belo Horizonte, Brazil',
  'pages.home.hero.cta.projects': 'View projects',
  'pages.home.hero.cta.experiences': 'My Experience',
  'pages.home.hero.social.navigation': 'Social links',
  'pages.home.metrics.years.label': 'Years of Experience',
  'pages.home.metrics.years.description': 'Years building web products',
  'pages.home.metrics.projects.label': 'Projects Delivered',
  'pages.home.metrics.projects.description': 'Cases published in the portfolio',
  'pages.home.metrics.technologies.label': 'Technologies',
  'pages.home.metrics.technologies.description': 'Mapped stack signals',
  'pages.home.metrics.ariaLabel': 'Portfolio metrics',
  'pages.home.loading': 'Connecting live portfolio data...',
  'pages.home.error': 'The live home data is unavailable right now.',
  'pages.home.stack.label': '// CORE_STACK',
  'pages.home.stack.title': 'Main Technologies',
  'pages.home.stack.description':
    'The most visible stack signals collected from the live dashboard aggregate.',
  'pages.home.stack.projects': 'projects',
  'pages.home.stack.technologies': 'technologies',
  'pages.home.stack.empty': 'No stack distribution was returned yet.',
  'pages.home.navigation.experiences.eyebrow': '// career',
  'pages.home.navigation.experiences.title': 'Experiences',
  'pages.home.navigation.experiences.description': 'Professional journey and career timeline.',
  'pages.home.navigation.skills.eyebrow': '// arsenal',
  'pages.home.navigation.skills.title': 'Skills',
  'pages.home.navigation.skills.description': 'Technologies, formations and languages.',
  'pages.home.navigation.projects.eyebrow': '// builds',
  'pages.home.navigation.projects.title': 'Projects',
  'pages.home.navigation.projects.description': 'Real-world applications and case studies.',
  'pages.experiences.sectionLabel': '// CAREER_TIMELINE',
  'pages.experiences.title': 'Professional Experience',
  'pages.experiences.description':
    'A chronological journey through my career building impactful software solutions.',
  'pages.experiences.snapshot.label': 'Career snapshot',
  'pages.experiences.snapshot.title': 'Trajectory coverage from the live API',
  'pages.experiences.snapshot.description':
    'Counts, current role signal and relationship breadth are derived from the published experiences collection.',
  'pages.experiences.snapshot.loading': 'Loading live experience relationships...',
  'pages.experiences.snapshot.error': 'The experiences endpoint is unavailable right now.',
  'pages.experiences.snapshot.metrics.currentRole': 'Current role',
  'pages.experiences.snapshot.metrics.experiences': 'Chapters',
  'pages.experiences.snapshot.metrics.projects': 'Projects',
  'pages.experiences.snapshot.metrics.technologies': 'Technologies',
  'pages.experiences.snapshot.metrics.customers': 'Customers',
  'pages.experiences.snapshot.metrics.highlights': 'Highlights',
  'pages.experiences.timeline.label': 'Career narrative',
  'pages.experiences.timeline.title': 'Timeline, context and impact in the same reading flow',
  'pages.experiences.timeline.description':
    'Each chapter connects company, role, customers, projects and stack signals so the professional story reads as a system instead of a flat list.',
  'pages.experiences.timeline.loading': 'Loading live experience relationships...',
  'pages.experiences.timeline.error': 'The experiences endpoint is unavailable right now.',
  'pages.experiences.timeline.empty': 'No published experience chapters were returned yet.',
  'pages.experiences.timeline.current': 'Current',
  'pages.experiences.timeline.highlight': 'Highlight',
  'pages.experiences.timeline.roles': 'Roles',
  'pages.experiences.timeline.customers': 'Customers',
  'pages.experiences.timeline.emptyCustomers': 'No linked customers yet.',
  'pages.experiences.timeline.technologyStack': 'Technology stack',
  'pages.experiences.timeline.relatedProjects': 'Related projects',
  'pages.experiences.timeline.moreTechnologies': 'more',
  'pages.experiences.timeline.emptyProjects': 'No related projects were returned for this chapter.',
  'pages.experiences.detail.projectsCount': 'projects',
  'pages.experiences.detail.analytics': 'Experience analytics',
  'pages.experiences.detail.gallery': 'Linked gallery',
  'pages.experiences.detail.chart.jobs': 'Roles',
  'pages.experiences.detail.chart.customers': 'Customers',
  'pages.experiences.detail.chart.projects': 'Projects',
  'pages.experiences.detail.chart.technologies': 'Technologies',
  'pages.experiences.detail.chart.series': 'Connections',
  'pages.experiences.detail.projects': '// projects',
  'pages.experiences.detail.clients': '// clients',
  'pages.experiences.detail.techStack': '// tech_stack',
  'pages.experiences.detail.stackGroups.frontend': 'Front-end',
  'pages.experiences.detail.stackGroups.backend': 'Back-end',
  'pages.experiences.detail.stackGroups.databases': 'Databases',
  'pages.experiences.detail.stackGroups.others': 'Others',
  'pages.experiences.technology.category': 'Category',
  'pages.experiences.technology.type': 'Type',
  'pages.experiences.technology.stack': 'Stack',
  'pages.experiences.technology.level': 'Knowledge level',
  'pages.experiences.technology.frequency': 'Usage frequency',
  'pages.experiences.technology.projects': 'Projects used',
  'pages.experiences.customer.company': 'Related company',
  'pages.experiences.customer.projects': 'Related projects',
  'pages.skills.sectionLabel': '// SKILLS_ARSENAL',
  'pages.skills.title': 'Skills & Technologies',
  'pages.skills.description':
    'A comprehensive view of my technical arsenal, education and language proficiencies.',
  'pages.skills.snapshot.label': 'Portfolio snapshot',
  'pages.skills.snapshot.title': 'Technology clarity from live API metrics',
  'pages.skills.snapshot.description':
    'The sidebar summarizes category breadth, highlight density and the strongest duration signal already published by the backend.',
  'pages.skills.snapshot.loading': 'Loading technology experience metrics...',
  'pages.skills.snapshot.error': 'The technologies endpoint is unavailable right now.',
  'pages.skills.filters.label': 'Catalog filters',
  'pages.skills.filters.title': 'Slice the stack by category, level and context',
  'pages.skills.filters.description':
    'Filters stay lightweight in the UI while the real technology durations still come from the backend contracts.',
  'pages.skills.filters.category': 'Category',
  'pages.skills.filters.type': 'Type',
  'pages.skills.filters.stack': 'Stack',
  'pages.skills.filters.level': 'Level',
  'pages.skills.filters.context': 'Context',
  'pages.skills.filters.total': 'Filtered technologies',
  'pages.skills.education.title': 'Education',
  'pages.skills.education.informationSystems.title': 'Information Systems',
  'pages.skills.education.informationSystems.institution':
    'Pontifical Catholic University of Minas Gerais',
  'pages.skills.education.informationSystems.period': '02/2015 - 12/2018',
  'pages.skills.education.informationSystems.badge': 'Bachelor',
  'pages.skills.education.fullStackWeb.title': 'FullStack Web Development',
  'pages.skills.education.fullStackWeb.institution':
    'Pontifical Catholic University of Minas Gerais',
  'pages.skills.education.fullStackWeb.period': '03/2019 - 06/2021',
  'pages.skills.education.fullStackWeb.badge': 'Specialist',
  'pages.skills.education.angularNode.title': 'FullStack Angular & Node Programmer',
  'pages.skills.education.angularNode.institution': 'Udemy',
  'pages.skills.education.angularNode.period': '03/2020 - 04/2020',
  'pages.skills.education.angularNode.badge': 'Certified',
  'pages.skills.languages.title': 'Languages',
  'pages.skills.languages.portuguese.title': 'Portuguese',
  'pages.skills.languages.portuguese.subtitle': 'Native communication',
  'pages.skills.languages.portuguese.meta': 'Brazilian Portuguese',
  'pages.skills.languages.portuguese.badge': 'Native',
  'pages.skills.languages.english.title': 'English',
  'pages.skills.languages.english.subtitle': 'Professional communication',
  'pages.skills.languages.english.meta': 'Reading, writing and conversation',
  'pages.skills.languages.english.badge': 'Fluent',
  'pages.skills.technologies.title': 'Technologies',
  'pages.skills.search.placeholder': 'Search technology...',
  'pages.skills.catalog.label': 'Technology groups',
  'pages.skills.catalog.title': 'Grouped reading for the current filter set',
  'pages.skills.catalog.description':
    'Each technology card highlights total experience plus the contexts where that stack has already been used.',
  'pages.skills.catalog.loading': 'Building technology groups...',
  'pages.skills.catalog.error': 'The technologies endpoint is unavailable right now.',
  'pages.skills.catalog.empty': 'No published technologies matched the current filters.',
  'pages.skills.card.highlight': 'Highlight',
  'pages.skills.card.totalExperience': 'Total experience',
  'pages.skills.card.contexts': 'Context coverage',
  'pages.skills.detail.totalExperience': 'Consolidated experience',
  'pages.skills.detail.contextChart': 'Context distribution',
  'pages.skills.detail.chartSeries': 'Months',
  'pages.skills.detail.coverage': 'Detailed coverage',
  'pages.skills.detail.timeline': 'Context timeline',
  'pages.skills.detail.noTimeline': 'No published time ranges were returned.',
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
  'taxonomy.skills.level.studying': 'Studying',
  'taxonomy.skills.level.all': 'All',
  'taxonomy.skills.stack.all': 'All',
  'taxonomy.skills.stack.frontEnd': 'Front-End',
  'taxonomy.skills.stack.backEnd': 'Back-End',
  'taxonomy.skills.stack.databases': 'Databases',
  'taxonomy.skills.stack.games': 'Games',
  'taxonomy.skills.stack.mobile': 'Mobile',
  'taxonomy.skills.stack.others': 'Others',
  'taxonomy.skills.type.all': 'All',
  'taxonomy.skills.type.programmingLanguages': 'Programming Languages',
  'taxonomy.skills.type.webLanguages': 'Web Languages',
  'taxonomy.skills.type.libraries': 'Libraries',
  'taxonomy.skills.type.frameworks': 'Frameworks',
  'taxonomy.skills.type.relationalDataBases': 'Relational Data Bases',
  'taxonomy.skills.type.nonRelationalDataBases': 'Non-Relational Data Bases',
  'taxonomy.skills.type.databasesManagementSystems': 'Databases Management Systems',
  'taxonomy.skills.type.codeEditors': 'Code Editors',
  'taxonomy.skills.type.techniques': 'Techniques',
  'taxonomy.skills.type.methodologies': 'Methodologies',
  'taxonomy.skills.type.objectNotations': 'Object Notations',
  'taxonomy.skills.type.packageManagers': 'Package Managers',
  'taxonomy.skills.type.packages': 'Packages',
  'taxonomy.skills.type.versioningPlatforms': 'Versioning Platforms',
  'taxonomy.skills.type.cloudHostingPlatforms': 'Cloud Hosting Platforms',
  'taxonomy.skills.type.deploymentTools': 'Deployment Tools',
  'taxonomy.skills.type.developmentPlatforms': 'Development Platforms',
  'taxonomy.skills.type.protocols': 'Protocols',
  'taxonomy.skills.type.others': 'Others',
  'taxonomy.skills.frequency.frequent': 'Frequent',
  'taxonomy.skills.frequency.occasional': 'Occasional',
  'taxonomy.skills.frequency.rare': 'Rare',
  'taxonomy.skills.frequency.previouslyUsed': 'Previously used',
  'taxonomy.skills.frequency.studying': 'Studying',
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
  'pages.projects.sectionLabel': '// PROJECTS_SHOWCASE',
  'pages.projects.title': 'Projects',
  'pages.projects.description':
    'A collection of real-world applications, academic works and personal experiments.',
  'pages.projects.snapshot.label': 'Cases snapshot',
  'pages.projects.snapshot.title': 'Published work with real linked assets',
  'pages.projects.snapshot.description':
    'The sidebar summarizes featured density, linked references and the broadest stack signal already exposed by the public projects endpoint.',
  'pages.projects.snapshot.loading': 'Loading live project cases...',
  'pages.projects.snapshot.error': 'The projects endpoint is unavailable right now.',
  'pages.projects.filters.label': 'Case filters',
  'pages.projects.filters.title':
    'Slice the portfolio by context, environment, status and reading order',
  'pages.projects.filters.description':
    'The page stays lightweight in the UI while the project, experience, image and link relationships come directly from the backend.',
  'pages.projects.filters.context': 'Context',
  'pages.projects.filters.environment': 'Environment',
  'pages.projects.filters.status': 'Status',
  'pages.projects.filters.sort': 'Sort by',
  'pages.projects.filters.total': 'projects',
  'pages.projects.search.placeholder': 'Search projects...',
  'pages.projects.catalog.label': 'Case studies',
  'pages.projects.catalog.title': 'Projects as cases, not just entries',
  'pages.projects.catalog.description':
    'Each case connects timing, stack, delivery context, companies, deploys, repositories and screenshots in the same reading block.',
  'pages.projects.catalog.loading': 'Building project case studies...',
  'pages.projects.catalog.error': 'The projects endpoint is unavailable right now.',
  'pages.projects.catalog.empty': 'No published projects matched the current filters.',
  'pages.projects.card.featured': 'Featured',
  'pages.projects.card.highlight': 'Highlight',
  'pages.projects.card.technologies': 'Technologies',
  'pages.projects.card.companies': 'Companies',
  'pages.projects.card.emptyCompanies': 'No linked companies yet.',
  'pages.projects.card.links': 'Links and references',
  'pages.projects.card.emptyLinks': 'No published links were attached to this case yet.',
  'pages.projects.card.assets': 'Linked assets',
  'pages.projects.detail.linksCount': 'links',
  'pages.projects.detail.imagesCount': 'images',
  'pages.projects.detail.relatedExperiences': 'Related experiences',
  'pages.projects.detail.noExperiences': 'No related experience has been published yet.',
  'pages.projects.detail.tags': 'Case tags',
  'pages.projects.detail.noTags': 'No published tags were attached.',
  'pages.projects.detail.clients': '// clients',
  'pages.projects.detail.techStack': '// tech_stack',
  'pages.projects.detail.analytics': 'Case analytics',
  'pages.projects.detail.gallery': 'Expanded gallery',
  'pages.projects.detail.chart.series': 'Density',
  'pages.projects.detail.chart.technologies': 'Technologies',
  'pages.projects.detail.chart.companies': 'Companies',
  'pages.projects.detail.chart.links': 'Links',
  'pages.projects.detail.chart.images': 'Images',
  'taxonomy.projects.filters.allContexts': 'All',
  'taxonomy.projects.filters.allEnvironments': 'All environments',
  'taxonomy.projects.filters.allStatuses': 'All statuses',
  'taxonomy.projects.context.formation': 'Formation',
  'taxonomy.projects.sort.featured': 'Featured first',
  'taxonomy.projects.sort.recent': 'Most recent start',
  'taxonomy.projects.sort.stack': 'Largest stack',
  'taxonomy.projects.sort.links': 'Most linked assets',
  'taxonomy.projects.linkType.github': 'GitHub',
  'taxonomy.projects.linkType.deploy': 'Deploy',
  'taxonomy.projects.linkType.sourceCode': 'Source code',
  'taxonomy.projects.summary.total': 'Published cases',
  'taxonomy.projects.summary.featured': 'Featured',
  'taxonomy.projects.summary.inProgress': 'In progress',
  'taxonomy.projects.summary.linkedAssets': 'Linked assets',
  'taxonomy.projects.summary.richestStack': 'Richest stack',
  'taxonomy.projects.fallback.noAssets': 'No linked visual assets yet.',
  'taxonomy.projects.fallback.noLinks': 'No published links were attached yet.',
  'taxonomy.projects.fallback.noCompanies': 'No linked companies yet.',
  'taxonomy.projects.fallback.untitledLink': 'Untitled link',
  'pages.dashboard.sectionLabel': 'Foundation',
  'pages.dashboard.title': 'Portfolio analytics dashboard',
  'pages.dashboard.description':
    'Aggregate signals across projects, stack and career now live in their own route, fed by the public dashboard endpoints.',
  'pages.dashboard.snapshot.label': 'Snapshot',
  'pages.dashboard.snapshot.title': 'Published footprint in one glance',
  'pages.dashboard.snapshot.description':
    'The sidebar concentrates the live headline counters that summarize the current public dataset.',
  'pages.dashboard.snapshot.loading': 'Loading dashboard aggregates...',
  'pages.dashboard.snapshot.error': 'The dashboard aggregate endpoints are unavailable right now.',
  'pages.dashboard.snapshot.metrics.projects': 'Projects',
  'pages.dashboard.snapshot.metrics.experiences': 'Experiences',
  'pages.dashboard.snapshot.metrics.technologies': 'Technologies',
  'pages.dashboard.snapshot.metrics.formations': 'Formations / languages',
  'pages.dashboard.snapshot.metrics.customers': 'Customers',
  'pages.dashboard.snapshot.metrics.jobs': 'Roles',
  'pages.dashboard.snapshot.metrics.languages': 'Languages',
  'pages.dashboard.stacks.label': 'Stack distribution',
  'pages.dashboard.stacks.title': 'Where the portfolio carries the most technical weight',
  'pages.dashboard.stacks.description':
    'Each stack area combines linked projects and mapped technologies so the strongest zones are obvious at a glance.',
  'pages.dashboard.stacks.loading': 'Loading stack distribution...',
  'pages.dashboard.stacks.error': 'The dashboard aggregate endpoints are unavailable right now.',
  'pages.dashboard.stacks.empty': 'No stack distribution was returned yet.',
  'pages.dashboard.stacks.projects': 'projects',
  'pages.dashboard.stacks.technologies': 'technologies',
  'pages.dashboard.distribution.label': 'Project footprint',
  'pages.dashboard.distribution.title':
    'Delivery context, environment spread and highlight density',
  'pages.dashboard.distribution.description':
    'This block keeps the project catalog readable by separating featured volume from context and environment patterns.',
  'pages.dashboard.distribution.loading': 'Loading project distribution aggregates...',
  'pages.dashboard.distribution.error':
    'The dashboard aggregate endpoints are unavailable right now.',
  'pages.dashboard.distribution.empty': 'No project distribution data was returned yet.',
  'pages.dashboard.distribution.featured': 'Featured',
  'pages.dashboard.distribution.highlighted': 'Highlighted',
  'pages.dashboard.distribution.total': 'Total projects',
  'pages.dashboard.distribution.contexts': 'Contexts',
  'pages.dashboard.distribution.environments': 'Environments',
  'pages.dashboard.technology.label': 'Technology usage',
  'pages.dashboard.technology.title': 'Technology usage signals',
  'pages.dashboard.technology.description':
    'Top technologies and their frequency, context and source patterns come straight from the aggregate API relations.',
  'pages.dashboard.technology.loading': 'Loading technology usage aggregates...',
  'pages.dashboard.technology.error':
    'The dashboard aggregate endpoints are unavailable right now.',
  'pages.dashboard.technology.empty': 'No technology usage aggregates were returned yet.',
  'pages.dashboard.technology.levels': 'Levels',
  'pages.dashboard.technology.frequencies': 'Frequencies',
  'pages.dashboard.technology.contexts': 'Contexts',
  'pages.dashboard.technology.sources': 'Sources',
  'pages.dashboard.technology.links': 'linked signals',
  'pages.dashboard.projectsByType.label': 'Projects by technology type',
  'pages.dashboard.projectsByType.title': 'Projects by type of technologies',
  'pages.dashboard.projectsByType.description':
    'The final chart keeps the old dashboard pattern alive by grouping published projects by the technology family they actually use.',
  'pages.dashboard.projectsByType.loading': 'Loading project technology breakdown...',
  'pages.dashboard.projectsByType.error':
    'The project technology breakdown is unavailable right now.',
  'pages.dashboard.projectsByType.empty': 'No project technology breakdown was returned yet.',
  'pages.dashboard.projectsByType.selectLabel': 'Technology type',
  'pages.dashboard.timeline.label': 'Career',
  'pages.dashboard.timeline.title': 'Career focus timeline',
  'pages.dashboard.timeline.description':
    'The public professional timeline becomes an analytical layer that shows active chapters, highlight density and project/customer spread.',
  'pages.dashboard.timeline.loading': 'Loading professional timeline aggregates...',
  'pages.dashboard.timeline.error': 'The dashboard aggregate endpoints are unavailable right now.',
  'pages.dashboard.timeline.empty': 'No professional timeline items were returned yet.',
  'pages.dashboard.timeline.current': 'Current',
  'pages.dashboard.timeline.highlight': 'Highlight',
  'pages.dashboard.timeline.customers': 'Customers',
  'pages.dashboard.timeline.emptyCustomers': 'No linked customers yet.',
  'pages.dashboard.timeline.projects': 'Projects',
  'pages.dashboard.timeline.emptyProjects': 'No linked projects yet.',
  'pages.dashboard.timeline.technologies': 'Technologies',
  'pages.dashboard.highlights.label': 'Highlights',
  'pages.dashboard.highlights.title': 'Portfolio highlights',
  'pages.dashboard.highlights.description':
    'Featured entities from the backend stay visible here as proof points across projects, experience and technology.',
  'pages.dashboard.highlights.loading': 'Loading highlighted portfolio entities...',
  'pages.dashboard.highlights.error':
    'The dashboard aggregate endpoints are unavailable right now.',
  'pages.dashboard.highlights.empty': 'No highlighted portfolio items were returned yet.',
  'pages.dashboard.highlights.featured': 'Featured',
  'pages.login.sectionLabel': '// ADMIN_ACCESS',
  'pages.login.title': 'Admin access',
  'pages.login.description':
    'A protected, non-public route for managing the portfolio through the authenticated admin flow.',
  'pages.login.security.title': 'Protected route',
  'pages.login.security.description':
    'Use the existing admin account from the API to unlock the next administrative steps of the portfolio.',
  'pages.login.form.title': 'Authenticate admin session',
  'pages.login.form.description':
    'This login is intentionally hidden from the public navigation and is only available through its direct URL.',
  'pages.login.form.emailLabel': 'Admin email',
  'pages.login.form.emailPlaceholder': 'Enter your email',
  'pages.login.form.passwordLabel': 'Admin password',
  'pages.login.form.passwordPlaceholder': 'Enter your password',
  'pages.login.form.passwordVisibility.show': 'Show password',
  'pages.login.form.passwordVisibility.hide': 'Hide password',
  'pages.login.form.submit': 'Enter',
  'pages.login.feedback.invalidCredentials':
    'The admin credentials are invalid or the session could not be started.',
  'pages.admin.shell.eyebrow': '// ADMIN_WORKSPACE',
  'pages.admin.shell.title': 'Admin workspace',
  'pages.admin.shell.description':
    'Protected operational shell for the final F8 flows, already aligned with hidden routing, authenticated session handling and the entity roadmap.',
  'pages.admin.shell.actions.logout': 'Log out',
  'pages.admin.shell.session.kicker': 'Authenticated session',
  'pages.admin.shell.registry.kicker': 'Entity registry',
  'pages.admin.shell.registry.title': '{{count}} entity workflows',
  'pages.admin.shell.registry.description':
    'The administrative shell now centralizes every protected domain planned for the remaining CRUD substeps.',
  'pages.admin.facts.route.title': 'Hidden route confirmed',
  'pages.admin.facts.route.description':
    'The public menu stays untouched while /admin remains available only through direct access and guard enforcement.',
  'pages.admin.facts.validation.title': 'Session validation active',
  'pages.admin.facts.validation.description':
    'Every protected entry still depends on a valid bearer token plus server confirmation through GET /admin/session.',
  'pages.admin.facts.storage.title': 'Scoped persistence',
  'pages.admin.facts.storage.description':
    'The current admin session continues isolated in sessionStorage to avoid unnecessary long-lived access.',
  'pages.admin.entitiesSection.eyebrow': '// NEXT_SUBSTEPS',
  'pages.admin.entitiesSection.title': 'Protected entities roadmap',
  'pages.admin.entitiesSection.description':
    'Each card below marks the official F8 order, its protected endpoint family and the create, update and delete actions that will be enabled in the following deliveries.',
  'pages.admin.operations.create': 'Create',
  'pages.admin.operations.read': 'Read',
  'pages.admin.operations.update': 'Update',
  'pages.admin.operations.delete': 'Delete',
  'pages.admin.relationMode.owner': 'Owned relationships',
  'pages.admin.relationMode.dedicated': 'Dedicated relationship entity',
  'pages.admin.entities.portfolio-settings.title': 'Portfolio settings',
  'pages.admin.entities.portfolio-settings.description':
    'Global configuration, highlighted content and structured settings that drive the portfolio shell.',
  'pages.admin.portfolioSettings.sectionLabel': '// PORTFOLIO_SETTINGS',
  'pages.admin.portfolioSettings.title': 'Portfolio settings',
  'pages.admin.portfolioSettings.description':
    'Live protected CRUD for the JSON-based settings that shape the shell, highlights and structured content.',
  'pages.admin.portfolioSettings.actions.create': 'Create',
  'pages.admin.portfolioSettings.actions.submit': 'Save',
  'pages.admin.portfolioSettings.states.loading':
    'Loading the protected portfolio settings collection...',
  'pages.admin.portfolioSettings.states.empty':
    'No protected portfolio setting has been registered yet.',
  'pages.admin.portfolioSettings.card.key': 'Setting key',
  'pages.admin.portfolioSettings.card.description': 'Description',
  'pages.admin.portfolioSettings.card.emptyDescription':
    'No description was registered for this setting yet.',
  'pages.admin.portfolioSettings.card.value': 'JSON value',
  'pages.admin.portfolioSettings.fields.key.label': 'Setting key',
  'pages.admin.portfolioSettings.fields.key.placeholder':
    'Enter the unique setting key',
  'pages.admin.portfolioSettings.fields.description.label': 'Description',
  'pages.admin.portfolioSettings.fields.description.placeholder':
    'Describe the responsibility of this setting',
  'pages.admin.portfolioSettings.fields.value.label': 'JSON value',
  'pages.admin.portfolioSettings.fields.value.placeholder':
    'Enter a valid JSON object, array or scalar value',
  'pages.admin.portfolioSettings.modal.create.title':
    'Create portfolio setting',
  'pages.admin.portfolioSettings.modal.read.title':
    'Read portfolio settings',
  'pages.admin.portfolioSettings.modal.read.description':
    'Review the current protected JSON settings and jump directly to update or delete from each record.',
  'pages.admin.portfolioSettings.modal.pickUpdate.title':
    'Select a setting to update',
  'pages.admin.portfolioSettings.modal.pickUpdate.description':
    'Choose one of the current protected settings to open its update form.',
  'pages.admin.portfolioSettings.modal.pickDelete.title':
    'Select a setting to delete',
  'pages.admin.portfolioSettings.modal.pickDelete.description':
    'Choose one of the current protected settings to confirm its removal.',
  'pages.admin.portfolioSettings.modal.update.title':
    'Update portfolio setting',
  'pages.admin.portfolioSettings.modal.delete.title':
    'Delete portfolio setting',
  'pages.admin.portfolioSettings.modal.delete.description':
    'This action permanently removes the selected protected setting from the portfolio configuration.',
  'pages.admin.portfolioSettings.feedback.created':
    'Portfolio setting created successfully.',
  'pages.admin.portfolioSettings.feedback.updated':
    'Portfolio setting updated successfully.',
  'pages.admin.portfolioSettings.feedback.deleted':
    'Portfolio setting deleted successfully.',
  'pages.admin.portfolioSettings.feedback.requiredKey':
    'The setting key is required before submitting.',
  'pages.admin.portfolioSettings.feedback.invalidJson':
    'The JSON value is invalid. Review the structure before submitting.',
  'pages.admin.portfolioSettings.feedback.missingSession':
    'The authenticated admin session is unavailable. Log in again to continue.',
  'pages.admin.portfolioSettings.feedback.selectionRequired':
    'Select a portfolio setting before continuing with this action.',
  'pages.admin.portfolioSettings.feedback.loadError':
    'The protected portfolio settings collection could not be loaded right now.',
  'pages.admin.portfolioSettings.feedback.saveError':
    'The portfolio setting could not be saved right now.',
  'pages.admin.portfolioSettings.feedback.deleteError':
    'The portfolio setting could not be deleted right now.',
  'pages.admin.entities.tags.title': 'Tags',
  'pages.admin.entities.tags.description':
    'Reusable classification labels shared across projects, technologies and future editorial flows.',
  'pages.admin.tags.sectionLabel': '// TAGS',
  'pages.admin.tags.description':
    'Protected CRUD for reusable labels that classify projects and technologies through relation arrays owned by each tag.',
  'pages.admin.tags.actions.submit': 'Save',
  'pages.admin.tags.states.loading':
    'Loading the protected tags collection...',
  'pages.admin.tags.states.empty':
    'No protected tag has been registered yet.',
  'pages.admin.tags.card.slug': 'Tag slug',
  'pages.admin.tags.card.namePt': 'Portuguese name',
  'pages.admin.tags.card.nameEn': 'English name',
  'pages.admin.tags.card.type': 'Type',
  'pages.admin.tags.card.sortOrder': 'Sort order',
  'pages.admin.tags.card.projects': 'Projects',
  'pages.admin.tags.card.technologies': 'Technologies',
  'pages.admin.tags.card.emptyRelations':
    'No related records are currently linked to this tag.',
  'pages.admin.tags.fields.slug.label': 'Tag slug',
  'pages.admin.tags.fields.slug.placeholder':
    'Enter the unique tag slug',
  'pages.admin.tags.fields.namePt.label': 'Portuguese name',
  'pages.admin.tags.fields.namePt.placeholder':
    'Enter the Portuguese tag name',
  'pages.admin.tags.fields.nameEn.label': 'English name',
  'pages.admin.tags.fields.nameEn.placeholder':
    'Enter the English tag name',
  'pages.admin.tags.fields.type.label': 'Type',
  'pages.admin.tags.fields.type.placeholder':
    'Select the tag type',
  'pages.admin.tags.fields.type.empty':
    'No tag type is available right now.',
  'pages.admin.tags.fields.sortOrder.label': 'Sort order',
  'pages.admin.tags.fields.sortOrder.placeholder':
    'Enter the integer sort order',
  'pages.admin.tags.fields.projects.label': 'Related projects',
  'pages.admin.tags.fields.projects.description':
    'Select every project that should expose this tag in its public relationships.',
  'pages.admin.tags.fields.projects.empty':
    'No public project is available to relate right now.',
  'pages.admin.tags.fields.technologies.label': 'Related technologies',
  'pages.admin.tags.fields.technologies.description':
    'Select every technology that should keep this tag in its relationship arrays.',
  'pages.admin.tags.fields.technologies.empty':
    'No public technology is available to relate right now.',
  'pages.admin.tags.modal.create.title': 'Create tag',
  'pages.admin.tags.modal.read.title': 'Read tags',
  'pages.admin.tags.modal.read.description':
    'Review the current protected tags and open update or delete flows directly from each record.',
  'pages.admin.tags.modal.pickUpdate.title':
    'Select a tag to update',
  'pages.admin.tags.modal.pickUpdate.description':
    'Choose one of the current protected tags to open its update form.',
  'pages.admin.tags.modal.pickDelete.title':
    'Select a tag to delete',
  'pages.admin.tags.modal.pickDelete.description':
    'Choose one of the current protected tags to confirm its removal.',
  'pages.admin.tags.modal.update.title': 'Update tag',
  'pages.admin.tags.modal.delete.title': 'Delete tag',
  'pages.admin.tags.modal.delete.description':
    'This action permanently removes the selected protected tag and its current relations from the portfolio.',
  'pages.admin.tags.feedback.created':
    'Protected tag created successfully.',
  'pages.admin.tags.feedback.updated':
    'Protected tag updated successfully.',
  'pages.admin.tags.feedback.deleted':
    'Protected tag deleted successfully.',
  'pages.admin.tags.feedback.requiredSlug':
    'The tag slug is required before submitting.',
  'pages.admin.tags.feedback.requiredNamePt':
    'The Portuguese tag name is required before submitting.',
  'pages.admin.tags.feedback.requiredNameEn':
    'The English tag name is required before submitting.',
  'pages.admin.tags.feedback.requiredType':
    'The tag type is required before submitting.',
  'pages.admin.tags.feedback.invalidType':
    'Select one of the supported tag types before submitting.',
  'pages.admin.tags.feedback.invalidSortOrder':
    'The sort order must be a valid integer number.',
  'pages.admin.tags.feedback.missingSession':
    'The authenticated admin session is unavailable. Log in again to continue.',
  'pages.admin.tags.feedback.selectionRequired':
    'Select a protected tag before continuing with this action.',
  'pages.admin.tags.feedback.loadError':
    'The protected tags collection could not be loaded right now.',
  'pages.admin.tags.feedback.saveError':
    'The protected tag could not be saved right now.',
  'pages.admin.tags.feedback.deleteError':
    'The protected tag could not be deleted right now.',
  'pages.admin.entities.links.title': 'Links',
  'pages.admin.entities.links.description':
    'External references such as repositories, live demos, documents and complementary navigation targets.',
  'pages.admin.links.sectionLabel': '// LINKS',
  'pages.admin.links.description':
    'Protected CRUD for reusable external references connected to projects, experiences, technologies and future formation records through owned relationship arrays.',
  'pages.admin.links.actions.submit': 'Save',
  'pages.admin.links.states.loading': 'Loading the protected links collection...',
  'pages.admin.links.states.empty':
    'No protected link has been registered yet.',
  'pages.admin.links.card.url': 'URL',
  'pages.admin.links.card.labelPt': 'Portuguese label',
  'pages.admin.links.card.labelEn': 'English label',
  'pages.admin.links.card.descriptionPt': 'Portuguese description',
  'pages.admin.links.card.descriptionEn': 'English description',
  'pages.admin.links.card.type': 'Type',
  'pages.admin.links.card.sortOrder': 'Sort order',
  'pages.admin.links.card.projects': 'Projects',
  'pages.admin.links.card.experiences': 'Experiences',
  'pages.admin.links.card.technologies': 'Technologies',
  'pages.admin.links.card.formations': 'Formations',
  'pages.admin.links.card.emptyRelations':
    'No related records are currently linked to this link.',
  'pages.admin.links.card.emptyText': 'No text was registered yet.',
  'pages.admin.links.fields.url.label': 'URL',
  'pages.admin.links.fields.url.placeholder': 'Enter the public link URL',
  'pages.admin.links.fields.labelPt.label': 'Portuguese label',
  'pages.admin.links.fields.labelPt.placeholder':
    'Enter the Portuguese label shown to visitors',
  'pages.admin.links.fields.labelEn.label': 'English label',
  'pages.admin.links.fields.labelEn.placeholder':
    'Enter the English label shown to visitors',
  'pages.admin.links.fields.descriptionPt.label': 'Portuguese description',
  'pages.admin.links.fields.descriptionPt.placeholder':
    'Describe this link in Portuguese',
  'pages.admin.links.fields.descriptionEn.label': 'English description',
  'pages.admin.links.fields.descriptionEn.placeholder':
    'Describe this link in English',
  'pages.admin.links.fields.type.label': 'Type',
  'pages.admin.links.fields.type.placeholder':
    'Select the link type',
  'pages.admin.links.fields.type.empty':
    'No link type is available right now.',
  'pages.admin.links.fields.sortOrder.label': 'Sort order',
  'pages.admin.links.fields.sortOrder.placeholder':
    'Enter the integer sort order',
  'pages.admin.links.fields.projects.label': 'Related projects',
  'pages.admin.links.fields.projects.description':
    'Select every project that should expose this link in its public references.',
  'pages.admin.links.fields.projects.empty':
    'No public project is available to relate right now.',
  'pages.admin.links.fields.experiences.label': 'Related experiences',
  'pages.admin.links.fields.experiences.description':
    'Select every experience that should keep this link in its relationship arrays.',
  'pages.admin.links.fields.experiences.empty':
    'No public experience is available to relate right now.',
  'pages.admin.links.fields.technologies.label': 'Related technologies',
  'pages.admin.links.fields.technologies.description':
    'Select every technology that should expose this link in future public contexts.',
  'pages.admin.links.fields.technologies.empty':
    'No public technology is available to relate right now.',
  'pages.admin.links.fields.formations.label': 'Related formations',
  'pages.admin.links.fields.formations.description':
    'Formation relationships are already supported in the payload and will become selectable as soon as the dedicated public catalog is available.',
  'pages.admin.links.fields.formations.empty':
    'No public formation catalog is available yet for relationship selection.',
  'pages.admin.links.modal.create.title': 'Create link',
  'pages.admin.links.modal.read.title': 'Read links',
  'pages.admin.links.modal.read.description':
    'Review the current protected links and open update or delete flows directly from each record.',
  'pages.admin.links.modal.pickUpdate.title': 'Select a link to update',
  'pages.admin.links.modal.pickUpdate.description':
    'Choose one of the current protected links to open its update form.',
  'pages.admin.links.modal.pickDelete.title': 'Select a link to delete',
  'pages.admin.links.modal.pickDelete.description':
    'Choose one of the current protected links to confirm its removal.',
  'pages.admin.links.modal.update.title': 'Update link',
  'pages.admin.links.modal.delete.title': 'Delete link',
  'pages.admin.links.modal.delete.description':
    'This action permanently removes the selected protected link from the portfolio.',
  'pages.admin.links.feedback.created': 'Protected link created successfully.',
  'pages.admin.links.feedback.updated': 'Protected link updated successfully.',
  'pages.admin.links.feedback.deleted': 'Protected link deleted successfully.',
  'pages.admin.links.feedback.requiredUrl':
    'The link URL is required before submitting.',
  'pages.admin.links.feedback.requiredType':
    'The link type is required before submitting.',
  'pages.admin.links.feedback.invalidType':
    'Select one of the supported link types before submitting.',
  'pages.admin.links.feedback.invalidSortOrder':
    'The sort order must be a valid integer number.',
  'pages.admin.links.feedback.missingSession':
    'The authenticated admin session is unavailable. Log in again to continue.',
  'pages.admin.links.feedback.selectionRequired':
    'Select a protected link before continuing with this action.',
  'pages.admin.links.feedback.loadError':
    'The protected links collection could not be loaded right now.',
  'pages.admin.links.feedback.saveError':
    'The protected link could not be saved right now.',
  'pages.admin.links.feedback.deleteError':
    'The protected link could not be deleted right now.',
  'pages.admin.imageAssets.sectionLabel': '// IMAGE_ASSETS',
  'pages.admin.imageAssets.description':
    'Protected CRUD for normalized media files connected to projects, experiences and technologies through owned relationship arrays.',
  'pages.admin.imageAssets.states.loading':
    'Loading the protected image assets collection...',
  'pages.admin.imageAssets.states.empty':
    'No protected image asset has been registered yet.',
  'pages.admin.imageAssets.card.fileName': 'File name',
  'pages.admin.imageAssets.card.filePath': 'File path',
  'pages.admin.imageAssets.card.folder': 'Folder',
  'pages.admin.imageAssets.card.kind': 'Kind',
  'pages.admin.imageAssets.card.mimeType': 'MIME type',
  'pages.admin.imageAssets.card.dimensions': 'Dimensions',
  'pages.admin.imageAssets.card.sortOrder': 'Sort order',
  'pages.admin.imageAssets.card.altPt': 'Portuguese alt text',
  'pages.admin.imageAssets.card.altEn': 'English alt text',
  'pages.admin.imageAssets.card.captionPt': 'Portuguese caption',
  'pages.admin.imageAssets.card.captionEn': 'English caption',
  'pages.admin.imageAssets.card.projects': 'Projects',
  'pages.admin.imageAssets.card.experiences': 'Experiences',
  'pages.admin.imageAssets.card.technologies': 'Technologies',
  'pages.admin.imageAssets.card.emptyRelations':
    'No related records are currently linked to this image asset.',
  'pages.admin.imageAssets.card.emptyText': 'No text was registered yet.',
  'pages.admin.imageAssets.fields.fileName.label': 'File name',
  'pages.admin.imageAssets.fields.fileName.placeholder':
    'Enter the unique asset file name',
  'pages.admin.imageAssets.fields.filePath.label': 'File path',
  'pages.admin.imageAssets.fields.filePath.placeholder':
    'Enter the public file path used by the portfolio',
  'pages.admin.imageAssets.fields.folder.label': 'Folder',
  'pages.admin.imageAssets.fields.folder.placeholder':
    'Enter the asset folder',
  'pages.admin.imageAssets.fields.kind.label': 'Kind',
  'pages.admin.imageAssets.fields.kind.placeholder':
    'Select the asset kind',
  'pages.admin.imageAssets.fields.kind.empty':
    'No image asset kind is available right now.',
  'pages.admin.imageAssets.fields.altPt.label': 'Portuguese alt text',
  'pages.admin.imageAssets.fields.altPt.placeholder':
    'Describe the asset in Portuguese for accessibility',
  'pages.admin.imageAssets.fields.altEn.label': 'English alt text',
  'pages.admin.imageAssets.fields.altEn.placeholder':
    'Describe the asset in English for accessibility',
  'pages.admin.imageAssets.fields.captionPt.label': 'Portuguese caption',
  'pages.admin.imageAssets.fields.captionPt.placeholder':
    'Enter the Portuguese caption shown with this asset',
  'pages.admin.imageAssets.fields.captionEn.label': 'English caption',
  'pages.admin.imageAssets.fields.captionEn.placeholder':
    'Enter the English caption shown with this asset',
  'pages.admin.imageAssets.fields.mimeType.label': 'MIME type',
  'pages.admin.imageAssets.fields.mimeType.placeholder':
    'Enter the asset MIME type',
  'pages.admin.imageAssets.fields.width.label': 'Width',
  'pages.admin.imageAssets.fields.width.placeholder':
    'Enter the asset width in pixels',
  'pages.admin.imageAssets.fields.height.label': 'Height',
  'pages.admin.imageAssets.fields.height.placeholder':
    'Enter the asset height in pixels',
  'pages.admin.imageAssets.fields.sortOrder.label': 'Sort order',
  'pages.admin.imageAssets.fields.sortOrder.placeholder':
    'Enter the integer sort order',
  'pages.admin.imageAssets.fields.projects.label': 'Related projects',
  'pages.admin.imageAssets.fields.projects.description':
    'Select every project that should expose this media file in its public gallery.',
  'pages.admin.imageAssets.fields.projects.empty':
    'No public project is available to relate right now.',
  'pages.admin.imageAssets.fields.experiences.label': 'Related experiences',
  'pages.admin.imageAssets.fields.experiences.description':
    'Select every experience that should keep this media file in its relationship arrays.',
  'pages.admin.imageAssets.fields.experiences.empty':
    'No public experience is available to relate right now.',
  'pages.admin.imageAssets.fields.technologies.label': 'Related technologies',
  'pages.admin.imageAssets.fields.technologies.description':
    'Select every technology that should expose this media file in its public references.',
  'pages.admin.imageAssets.fields.technologies.empty':
    'No public technology is available to relate right now.',
  'pages.admin.imageAssets.modal.create.title': 'Create image asset',
  'pages.admin.imageAssets.modal.read.title': 'Read image assets',
  'pages.admin.imageAssets.modal.read.description':
    'Review the current protected image assets and open update or delete flows directly from each record.',
  'pages.admin.imageAssets.modal.pickUpdate.title':
    'Select an image asset to update',
  'pages.admin.imageAssets.modal.pickUpdate.description':
    'Choose one of the current protected image assets to open its update form.',
  'pages.admin.imageAssets.modal.pickDelete.title':
    'Select an image asset to delete',
  'pages.admin.imageAssets.modal.pickDelete.description':
    'Choose one of the current protected image assets to confirm its removal.',
  'pages.admin.imageAssets.modal.update.title': 'Update image asset',
  'pages.admin.imageAssets.modal.delete.title': 'Delete image asset',
  'pages.admin.imageAssets.modal.delete.description':
    'This action permanently removes the selected protected image asset from the portfolio.',
  'pages.admin.imageAssets.feedback.created':
    'Protected image asset created successfully.',
  'pages.admin.imageAssets.feedback.updated':
    'Protected image asset updated successfully.',
  'pages.admin.imageAssets.feedback.deleted':
    'Protected image asset deleted successfully.',
  'pages.admin.imageAssets.feedback.requiredFileName':
    'The file name is required before submitting.',
  'pages.admin.imageAssets.feedback.requiredFilePath':
    'The file path is required before submitting.',
  'pages.admin.imageAssets.feedback.requiredFolder':
    'The folder is required before submitting.',
  'pages.admin.imageAssets.feedback.requiredKind':
    'The image asset kind is required before submitting.',
  'pages.admin.imageAssets.feedback.invalidKind':
    'Select one of the supported image asset kinds before submitting.',
  'pages.admin.imageAssets.feedback.requiredMimeType':
    'The MIME type is required before submitting.',
  'pages.admin.imageAssets.feedback.invalidSortOrder':
    'The sort order must be a valid integer number.',
  'pages.admin.imageAssets.feedback.invalidDimensions':
    'Width and height must be valid integer numbers when informed.',
  'pages.admin.imageAssets.feedback.missingSession':
    'The authenticated admin session is unavailable. Log in again to continue.',
  'pages.admin.imageAssets.feedback.selectionRequired':
    'Select a protected image asset before continuing with this action.',
  'pages.admin.imageAssets.feedback.loadError':
    'The protected image assets collection could not be loaded right now.',
  'pages.admin.imageAssets.feedback.saveError':
    'The protected image asset could not be saved right now.',
  'pages.admin.imageAssets.feedback.deleteError':
    'The protected image asset could not be deleted right now.',
  'pages.admin.spokenLanguages.sectionLabel': '// SPOKEN_LANGUAGES',
  'pages.admin.spokenLanguages.description':
    'Protected CRUD for the language proficiency entries shown throughout the portfolio profile and skills flows.',
  'pages.admin.spokenLanguages.states.loading':
    'Loading the protected spoken languages collection...',
  'pages.admin.spokenLanguages.states.empty':
    'No protected spoken language has been registered yet.',
  'pages.admin.spokenLanguages.card.code': 'Code',
  'pages.admin.spokenLanguages.card.namePt': 'Portuguese name',
  'pages.admin.spokenLanguages.card.nameEn': 'English name',
  'pages.admin.spokenLanguages.card.proficiency': 'Proficiency',
  'pages.admin.spokenLanguages.card.highlight': 'Highlight',
  'pages.admin.spokenLanguages.card.sortOrder': 'Sort order',
  'pages.admin.spokenLanguages.card.imageAssets': 'Image assets',
  'pages.admin.spokenLanguages.card.emptyRelations':
    'No related image asset is currently linked to this language entry.',
  'pages.admin.spokenLanguages.fields.code.label': 'Code',
  'pages.admin.spokenLanguages.fields.code.placeholder':
    'Enter the language code',
  'pages.admin.spokenLanguages.fields.namePt.label': 'Portuguese name',
  'pages.admin.spokenLanguages.fields.namePt.placeholder':
    'Enter the Portuguese language name',
  'pages.admin.spokenLanguages.fields.nameEn.label': 'English name',
  'pages.admin.spokenLanguages.fields.nameEn.placeholder':
    'Enter the English language name',
  'pages.admin.spokenLanguages.fields.proficiency.label': 'Proficiency',
  'pages.admin.spokenLanguages.fields.proficiency.empty':
    'No proficiency option is available right now.',
  'pages.admin.spokenLanguages.fields.highlight.label': 'Highlight status',
  'pages.admin.spokenLanguages.fields.highlight.description':
    'Control whether this spoken language should stay emphasized in the public portfolio.',
  'pages.admin.spokenLanguages.fields.highlight.enabled': 'Highlighted',
  'pages.admin.spokenLanguages.fields.highlight.disabled': 'Not highlighted',
  'pages.admin.spokenLanguages.fields.sortOrder.label': 'Sort order',
  'pages.admin.spokenLanguages.fields.sortOrder.placeholder':
    'Enter the integer sort order',
  'pages.admin.spokenLanguages.fields.imageAssets.label': 'Related image assets',
  'pages.admin.spokenLanguages.fields.imageAssets.description':
    'Select every image asset that should visually represent this language in the public portfolio.',
  'pages.admin.spokenLanguages.fields.imageAssets.empty':
    'No public image asset is available to relate right now.',
  'pages.admin.spokenLanguages.modal.create.title': 'Create spoken language',
  'pages.admin.spokenLanguages.modal.read.title': 'Read spoken languages',
  'pages.admin.spokenLanguages.modal.read.description':
    'Review the current protected spoken languages and open update or delete flows directly from each record.',
  'pages.admin.spokenLanguages.modal.pickUpdate.title':
    'Select a spoken language to update',
  'pages.admin.spokenLanguages.modal.pickUpdate.description':
    'Choose one of the current protected spoken languages to open its update form.',
  'pages.admin.spokenLanguages.modal.pickDelete.title':
    'Select a spoken language to delete',
  'pages.admin.spokenLanguages.modal.pickDelete.description':
    'Choose one of the current protected spoken languages to confirm its removal.',
  'pages.admin.spokenLanguages.modal.update.title': 'Update spoken language',
  'pages.admin.spokenLanguages.modal.delete.title': 'Delete spoken language',
  'pages.admin.spokenLanguages.modal.delete.description':
    'This action permanently removes the selected protected language entry from the portfolio.',
  'pages.admin.spokenLanguages.feedback.created':
    'Protected spoken language created successfully.',
  'pages.admin.spokenLanguages.feedback.updated':
    'Protected spoken language updated successfully.',
  'pages.admin.spokenLanguages.feedback.deleted':
    'Protected spoken language deleted successfully.',
  'pages.admin.spokenLanguages.feedback.requiredCode':
    'The language code is required before submitting.',
  'pages.admin.spokenLanguages.feedback.requiredNamePt':
    'The Portuguese language name is required before submitting.',
  'pages.admin.spokenLanguages.feedback.requiredNameEn':
    'The English language name is required before submitting.',
  'pages.admin.spokenLanguages.feedback.requiredProficiency':
    'The language proficiency is required before submitting.',
  'pages.admin.spokenLanguages.feedback.invalidProficiency':
    'Select one of the supported proficiency levels before submitting.',
  'pages.admin.spokenLanguages.feedback.invalidSortOrder':
    'The sort order must be a valid integer number.',
  'pages.admin.spokenLanguages.feedback.missingSession':
    'The authenticated admin session is unavailable. Log in again to continue.',
  'pages.admin.spokenLanguages.feedback.selectionRequired':
    'Select a protected spoken language before continuing with this action.',
  'pages.admin.spokenLanguages.feedback.loadError':
    'The protected spoken languages collection could not be loaded right now.',
  'pages.admin.spokenLanguages.feedback.saveError':
    'The protected spoken language could not be saved right now.',
  'pages.admin.spokenLanguages.feedback.deleteError':
    'The protected spoken language could not be deleted right now.',
  'pages.admin.customers.sectionLabel': '// CUSTOMERS',
  'pages.admin.customers.description':
    'Protected CRUD for customer records associated with portfolio experiences and media relationships.',
  'pages.admin.customers.states.loading':
    'Loading the protected customers collection...',
  'pages.admin.customers.states.empty':
    'No protected customer has been registered yet.',
  'pages.admin.customers.card.slug': 'Slug',
  'pages.admin.customers.card.name': 'Name',
  'pages.admin.customers.card.summaryPt': 'Portuguese summary',
  'pages.admin.customers.card.summaryEn': 'English summary',
  'pages.admin.customers.card.highlight': 'Highlight',
  'pages.admin.customers.card.sortOrder': 'Sort order',
  'pages.admin.customers.card.experiences': 'Experiences',
  'pages.admin.customers.card.imageAssets': 'Image assets',
  'pages.admin.customers.card.emptyRelations':
    'No linked record is currently connected to this customer.',
  'pages.admin.customers.fields.slug.label': 'Slug',
  'pages.admin.customers.fields.slug.placeholder':
    'Enter the unique customer slug',
  'pages.admin.customers.fields.name.label': 'Name',
  'pages.admin.customers.fields.name.placeholder': 'Enter the customer name',
  'pages.admin.customers.fields.summaryPt.label': 'Portuguese summary',
  'pages.admin.customers.fields.summaryPt.placeholder':
    'Enter the Portuguese customer summary',
  'pages.admin.customers.fields.summaryEn.label': 'English summary',
  'pages.admin.customers.fields.summaryEn.placeholder':
    'Enter the English customer summary',
  'pages.admin.customers.fields.highlight.label': 'Highlight status',
  'pages.admin.customers.fields.highlight.description':
    'Control whether this customer should stay highlighted in public portfolio sections.',
  'pages.admin.customers.fields.highlight.enabled': 'Highlighted',
  'pages.admin.customers.fields.highlight.disabled': 'Not highlighted',
  'pages.admin.customers.fields.sortOrder.label': 'Sort order',
  'pages.admin.customers.fields.sortOrder.placeholder':
    'Enter the integer sort order',
  'pages.admin.customers.fields.experiences.label': 'Related experiences',
  'pages.admin.customers.fields.experiences.description':
    'Select every experience that should expose this customer in public storytelling.',
  'pages.admin.customers.fields.experiences.empty':
    'No experience is available to relate right now.',
  'pages.admin.customers.fields.imageAssets.label': 'Related image assets',
  'pages.admin.customers.fields.imageAssets.description':
    'Select every image asset linked to this customer.',
  'pages.admin.customers.fields.imageAssets.empty':
    'No image asset is available to relate right now.',
  'pages.admin.customers.modal.create.title': 'Create customer',
  'pages.admin.customers.modal.read.title': 'Read customers',
  'pages.admin.customers.modal.read.description':
    'Review the current protected customers and open update or delete flows directly from each record.',
  'pages.admin.customers.modal.pickUpdate.title':
    'Select a customer to update',
  'pages.admin.customers.modal.pickUpdate.description':
    'Choose one of the current protected customers to open its update form.',
  'pages.admin.customers.modal.pickDelete.title':
    'Select a customer to delete',
  'pages.admin.customers.modal.pickDelete.description':
    'Choose one of the current protected customers to confirm its removal.',
  'pages.admin.customers.modal.update.title': 'Update customer',
  'pages.admin.customers.modal.delete.title': 'Delete customer',
  'pages.admin.customers.modal.delete.description':
    'This action permanently removes the selected protected customer from the portfolio.',
  'pages.admin.customers.feedback.created':
    'Protected customer created successfully.',
  'pages.admin.customers.feedback.updated':
    'Protected customer updated successfully.',
  'pages.admin.customers.feedback.deleted':
    'Protected customer deleted successfully.',
  'pages.admin.customers.feedback.requiredSlug':
    'The customer slug is required before submitting.',
  'pages.admin.customers.feedback.requiredName':
    'The customer name is required before submitting.',
  'pages.admin.customers.feedback.requiredSummaryPt':
    'The Portuguese summary is required before submitting.',
  'pages.admin.customers.feedback.requiredSummaryEn':
    'The English summary is required before submitting.',
  'pages.admin.customers.feedback.invalidSortOrder':
    'The sort order must be a valid integer number.',
  'pages.admin.customers.feedback.missingSession':
    'The authenticated admin session is unavailable. Log in again to continue.',
  'pages.admin.customers.feedback.selectionRequired':
    'Select a protected customer before continuing with this action.',
  'pages.admin.customers.feedback.loadError':
    'The protected customers collection could not be loaded right now.',
  'pages.admin.customers.feedback.saveError':
    'The protected customer could not be saved right now.',
  'pages.admin.customers.feedback.deleteError':
    'The protected customer could not be deleted right now.',
  'pages.admin.jobs.sectionLabel': '// JOBS',
  'pages.admin.jobs.description':
    'Protected CRUD for role catalog records used to normalize experience positions and media relationships.',
  'pages.admin.jobs.states.loading': 'Loading the protected jobs collection...',
  'pages.admin.jobs.states.empty': 'No protected job has been registered yet.',
  'pages.admin.jobs.card.slug': 'Slug',
  'pages.admin.jobs.card.namePt': 'Portuguese name',
  'pages.admin.jobs.card.nameEn': 'English name',
  'pages.admin.jobs.card.summaryPt': 'Portuguese summary',
  'pages.admin.jobs.card.summaryEn': 'English summary',
  'pages.admin.jobs.card.highlight': 'Highlight',
  'pages.admin.jobs.card.sortOrder': 'Sort order',
  'pages.admin.jobs.card.experiences': 'Experiences',
  'pages.admin.jobs.card.imageAssets': 'Image assets',
  'pages.admin.jobs.card.emptyRelations':
    'No linked record is currently connected to this job.',
  'pages.admin.jobs.fields.slug.label': 'Slug',
  'pages.admin.jobs.fields.slug.placeholder': 'Enter the unique job slug',
  'pages.admin.jobs.fields.namePt.label': 'Portuguese name',
  'pages.admin.jobs.fields.namePt.placeholder':
    'Enter the Portuguese job name',
  'pages.admin.jobs.fields.nameEn.label': 'English name',
  'pages.admin.jobs.fields.nameEn.placeholder': 'Enter the English job name',
  'pages.admin.jobs.fields.summaryPt.label': 'Portuguese summary',
  'pages.admin.jobs.fields.summaryPt.placeholder':
    'Enter the Portuguese job summary',
  'pages.admin.jobs.fields.summaryEn.label': 'English summary',
  'pages.admin.jobs.fields.summaryEn.placeholder':
    'Enter the English job summary',
  'pages.admin.jobs.fields.highlight.label': 'Highlight status',
  'pages.admin.jobs.fields.highlight.description':
    'Control whether this job should stay highlighted in public portfolio sections.',
  'pages.admin.jobs.fields.highlight.enabled': 'Highlighted',
  'pages.admin.jobs.fields.highlight.disabled': 'Not highlighted',
  'pages.admin.jobs.fields.sortOrder.label': 'Sort order',
  'pages.admin.jobs.fields.sortOrder.placeholder':
    'Enter the integer sort order',
  'pages.admin.jobs.fields.experiences.label': 'Related experiences',
  'pages.admin.jobs.fields.experiences.description':
    'Select every experience that should expose this job in public storytelling.',
  'pages.admin.jobs.fields.experiences.empty':
    'No experience is available to relate right now.',
  'pages.admin.jobs.fields.imageAssets.label': 'Related image assets',
  'pages.admin.jobs.fields.imageAssets.description':
    'Select every image asset linked to this job.',
  'pages.admin.jobs.fields.imageAssets.empty':
    'No image asset is available to relate right now.',
  'pages.admin.jobs.modal.create.title': 'Create job',
  'pages.admin.jobs.modal.read.title': 'Read jobs',
  'pages.admin.jobs.modal.read.description':
    'Review the current protected jobs and open update or delete flows directly from each record.',
  'pages.admin.jobs.modal.pickUpdate.title': 'Select a job to update',
  'pages.admin.jobs.modal.pickUpdate.description':
    'Choose one of the current protected jobs to open its update form.',
  'pages.admin.jobs.modal.pickDelete.title': 'Select a job to delete',
  'pages.admin.jobs.modal.pickDelete.description':
    'Choose one of the current protected jobs to confirm its removal.',
  'pages.admin.jobs.modal.update.title': 'Update job',
  'pages.admin.jobs.modal.delete.title': 'Delete job',
  'pages.admin.jobs.modal.delete.description':
    'This action permanently removes the selected protected job from the portfolio.',
  'pages.admin.jobs.feedback.created': 'Protected job created successfully.',
  'pages.admin.jobs.feedback.updated': 'Protected job updated successfully.',
  'pages.admin.jobs.feedback.deleted': 'Protected job deleted successfully.',
  'pages.admin.jobs.feedback.requiredSlug':
    'The job slug is required before submitting.',
  'pages.admin.jobs.feedback.requiredNamePt':
    'The Portuguese job name is required before submitting.',
  'pages.admin.jobs.feedback.requiredNameEn':
    'The English job name is required before submitting.',
  'pages.admin.jobs.feedback.requiredSummaryPt':
    'The Portuguese summary is required before submitting.',
  'pages.admin.jobs.feedback.requiredSummaryEn':
    'The English summary is required before submitting.',
  'pages.admin.jobs.feedback.invalidSortOrder':
    'The sort order must be a valid integer number.',
  'pages.admin.jobs.feedback.missingSession':
    'The authenticated admin session is unavailable. Log in again to continue.',
  'pages.admin.jobs.feedback.selectionRequired':
    'Select a protected job before continuing with this action.',
  'pages.admin.jobs.feedback.loadError':
    'The protected jobs collection could not be loaded right now.',
  'pages.admin.jobs.feedback.saveError':
    'The protected job could not be saved right now.',
  'pages.admin.jobs.feedback.deleteError':
    'The protected job could not be deleted right now.',
  'pages.admin.formations.sectionLabel': '// FORMATIONS',
  'pages.admin.formations.description':
    'Protected CRUD for academic and professional education records, including stack relations, supporting links and image assets.',
  'pages.admin.formations.states.loading':
    'Loading the protected formations collection...',
  'pages.admin.formations.states.empty':
    'No protected formation has been registered yet.',
  'pages.admin.formations.card.slug': 'Slug',
  'pages.admin.formations.card.institution': 'Institution',
  'pages.admin.formations.card.titlePt': 'Portuguese title',
  'pages.admin.formations.card.titleEn': 'English title',
  'pages.admin.formations.card.degreeType': 'Degree type',
  'pages.admin.formations.card.summaryPt': 'Portuguese summary',
  'pages.admin.formations.card.summaryEn': 'English summary',
  'pages.admin.formations.card.startDate': 'Start date',
  'pages.admin.formations.card.endDate': 'End date',
  'pages.admin.formations.card.highlight': 'Highlight',
  'pages.admin.formations.card.sortOrder': 'Sort order',
  'pages.admin.formations.card.technologies': 'Technologies',
  'pages.admin.formations.card.links': 'Links',
  'pages.admin.formations.card.imageAssets': 'Image assets',
  'pages.admin.formations.card.emptyRelations':
    'No linked record is currently connected to this formation.',
  'pages.admin.formations.fields.slug.label': 'Slug',
  'pages.admin.formations.fields.slug.placeholder':
    'Enter the unique formation slug',
  'pages.admin.formations.fields.institution.label': 'Institution',
  'pages.admin.formations.fields.institution.placeholder':
    'Enter the institution name',
  'pages.admin.formations.fields.titlePt.label': 'Portuguese title',
  'pages.admin.formations.fields.titlePt.placeholder':
    'Enter the Portuguese formation title',
  'pages.admin.formations.fields.titleEn.label': 'English title',
  'pages.admin.formations.fields.titleEn.placeholder':
    'Enter the English formation title',
  'pages.admin.formations.fields.degreeType.label': 'Degree type',
  'pages.admin.formations.fields.degreeType.empty':
    'No degree type is available right now.',
  'pages.admin.formations.fields.degreeType.options.TECHNICAL': 'Technical',
  'pages.admin.formations.fields.degreeType.options.BACHELOR': 'Bachelor',
  'pages.admin.formations.fields.degreeType.options.POSTGRADUATE': 'Postgraduate',
  'pages.admin.formations.fields.degreeType.options.MBA': 'MBA',
  'pages.admin.formations.fields.degreeType.options.MASTER': 'Master',
  'pages.admin.formations.fields.degreeType.options.DOCTORATE': 'Doctorate',
  'pages.admin.formations.fields.degreeType.options.BOOTCAMP': 'Bootcamp',
  'pages.admin.formations.fields.degreeType.options.CERTIFICATION': 'Certification',
  'pages.admin.formations.fields.degreeType.options.COURSE': 'Course',
  'pages.admin.formations.fields.degreeType.options.OTHER': 'Other',
  'pages.admin.formations.fields.summaryPt.label': 'Portuguese summary',
  'pages.admin.formations.fields.summaryPt.placeholder':
    'Enter the Portuguese formation summary',
  'pages.admin.formations.fields.summaryEn.label': 'English summary',
  'pages.admin.formations.fields.summaryEn.placeholder':
    'Enter the English formation summary',
  'pages.admin.formations.fields.startDate.label': 'Start date',
  'pages.admin.formations.fields.startDate.placeholder': 'Enter the ISO start date',
  'pages.admin.formations.fields.endDate.label': 'End date',
  'pages.admin.formations.fields.endDate.placeholder':
    'Enter the ISO end date when applicable',
  'pages.admin.formations.fields.highlight.label': 'Highlight status',
  'pages.admin.formations.fields.highlight.description':
    'Control whether this formation should stay highlighted in public portfolio sections.',
  'pages.admin.formations.fields.highlight.enabled': 'Highlighted',
  'pages.admin.formations.fields.highlight.disabled': 'Not highlighted',
  'pages.admin.formations.fields.sortOrder.label': 'Sort order',
  'pages.admin.formations.fields.sortOrder.placeholder':
    'Enter the integer sort order',
  'pages.admin.formations.fields.technologies.label': 'Related technologies',
  'pages.admin.formations.fields.technologies.description':
    'Select every technology that should remain related to this formation.',
  'pages.admin.formations.fields.technologies.empty':
    'No technology is available to relate right now.',
  'pages.admin.formations.fields.links.label': 'Related links',
  'pages.admin.formations.fields.links.description':
    'Select every supporting link connected to this formation.',
  'pages.admin.formations.fields.links.empty':
    'No link is available to relate right now.',
  'pages.admin.formations.fields.imageAssets.label': 'Related image assets',
  'pages.admin.formations.fields.imageAssets.description':
    'Select every image asset linked to this formation.',
  'pages.admin.formations.fields.imageAssets.empty':
    'No image asset is available to relate right now.',
  'pages.admin.formations.modal.create.title': 'Create formation',
  'pages.admin.formations.modal.read.title': 'Read formations',
  'pages.admin.formations.modal.read.description':
    'Review the current protected formations and open update or delete flows directly from each record.',
  'pages.admin.formations.modal.pickUpdate.title':
    'Select a formation to update',
  'pages.admin.formations.modal.pickUpdate.description':
    'Choose one of the current protected formations to open its update form.',
  'pages.admin.formations.modal.pickDelete.title':
    'Select a formation to delete',
  'pages.admin.formations.modal.pickDelete.description':
    'Choose one of the current protected formations to confirm its removal.',
  'pages.admin.formations.modal.update.title': 'Update formation',
  'pages.admin.formations.modal.delete.title': 'Delete formation',
  'pages.admin.formations.modal.delete.description':
    'This action permanently removes the selected protected formation from the portfolio.',
  'pages.admin.formations.feedback.created':
    'Protected formation created successfully.',
  'pages.admin.formations.feedback.updated':
    'Protected formation updated successfully.',
  'pages.admin.formations.feedback.deleted':
    'Protected formation deleted successfully.',
  'pages.admin.formations.feedback.requiredSlug':
    'The formation slug is required before submitting.',
  'pages.admin.formations.feedback.requiredInstitution':
    'The institution is required before submitting.',
  'pages.admin.formations.feedback.requiredTitlePt':
    'The Portuguese formation title is required before submitting.',
  'pages.admin.formations.feedback.requiredTitleEn':
    'The English formation title is required before submitting.',
  'pages.admin.formations.feedback.requiredDegreeType':
    'The degree type is required before submitting.',
  'pages.admin.formations.feedback.requiredSummaryPt':
    'The Portuguese summary is required before submitting.',
  'pages.admin.formations.feedback.requiredSummaryEn':
    'The English summary is required before submitting.',
  'pages.admin.formations.feedback.requiredStartDate':
    'The start date is required before submitting.',
  'pages.admin.formations.feedback.invalidSortOrder':
    'The sort order must be a valid integer number.',
  'pages.admin.formations.feedback.missingSession':
    'The authenticated admin session is unavailable. Log in again to continue.',
  'pages.admin.formations.feedback.selectionRequired':
    'Select a protected formation before continuing with this action.',
  'pages.admin.formations.feedback.loadError':
    'The protected formations collection could not be loaded right now.',
  'pages.admin.formations.feedback.saveError':
    'The protected formation could not be saved right now.',
  'pages.admin.formations.feedback.deleteError':
    'The protected formation could not be deleted right now.',
  'pages.admin.entities.image-assets.title': 'Image assets',
  'pages.admin.entities.image-assets.description':
    'Normalized media records used by the portfolio through image asset relations instead of direct file fields.',
  'pages.admin.entities.spoken-languages.title': 'Spoken languages',
  'pages.admin.entities.spoken-languages.description':
    'Administrative control of language proficiency entries displayed in the profile and skills contexts.',
  'pages.admin.entities.customers.title': 'Customers',
  'pages.admin.entities.customers.description':
    'Customer organizations referenced by experience histories and relationship-based storytelling.',
  'pages.admin.entities.jobs.title': 'Jobs',
  'pages.admin.entities.jobs.description':
    'Role catalog entries that support consistent job naming and relation mapping across experiences.',
  'pages.admin.entities.formations.title': 'Formations',
  'pages.admin.entities.formations.description':
    'Academic and professional education records, including their supporting links, images and stack relations.',
  'pages.admin.entities.technologies.title': 'Technologies',
  'pages.admin.entities.technologies.description':
    'Core stack catalog with highlight rules, metrics, tags and relationship arrays owned by the technology entity.',
  'pages.admin.entities.technology-contexts.title': 'Technology contexts',
  'pages.admin.entities.technology-contexts.description':
    'The only dedicated relationship entity, used to register contextual usage windows for each technology.',
  'pages.admin.entities.experiences.title': 'Experiences',
  'pages.admin.entities.experiences.description':
    'Professional history records with company, role, chronology, customers, projects and stack relationships.',
  'pages.admin.entities.projects.title': 'Projects',
  'pages.admin.entities.projects.description':
    'Case-study style project entries with environment, status, date range and owned relationship arrays.',
  'taxonomy.dashboard.source.experience': 'Experience',
  'taxonomy.dashboard.source.project': 'Project',
  'taxonomy.dashboard.source.formation': 'Formation',
} as const satisfies AppTranslationLanguage;
