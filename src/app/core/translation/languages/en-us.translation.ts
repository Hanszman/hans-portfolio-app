import { AppTranslationLanguage } from '../translation.types';

export const EN_TRANSLATIONS = {
  'header.brand.home': 'Go to home',
  'header.controls.theme': 'Theme',
  'header.controls.darkTheme': 'Dark theme',
  'header.controls.lightTheme': 'Light theme',
  'header.controls.language': 'Language',
  'header.controls.navigation': 'Navigation menu',
  'header.controls.noLanguages': 'No languages available',
  'footer.social.navigation': 'Social links',
  'footer.social.github': 'Open GitHub profile',
  'footer.social.linkedin': 'Open LinkedIn profile',
  'footer.social.whatsapp': 'Open WhatsApp contact',
  'footer.social.email': 'Send an email',
  'footer.copyright.name': 'Victor Hanszman',
  'footer.copyright.year': '© {{ year }}',
  'common.actions.viewDetails': 'View details',
  'common.actions.close': 'Close',
  'common.actions.save': 'Save',
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
  'common.entities.projects': 'Projects',
  'common.entities.technologies': 'Technologies',
  'common.fields.slug': 'Slug',
  'common.fields.sortOrder': 'Sort order',
  'common.empty.linkedCompanies': 'No linked companies yet.',
  'common.entities.portfolioSettings': 'Portfolio settings',
  'common.entities.links': 'Links',
  'common.entities.formation': 'Formation',
  'common.fields.startDate': 'Start date',
  'common.fields.endDate': 'End date',
  'common.fields.stack': 'Stack',
  'common.relations.imageAssets': 'Related image assets',
  'common.relations.experiences': 'Related experiences',
  'common.relations.customers': 'Related customers',
  'common.feedback.requiredEnglishSummary': 'The English summary is required before submitting.',
  'common.feedback.requiredPortugueseSummary':
    'The Portuguese summary is required before submitting.',
  'common.feedback.invalidSortOrder': 'The sort order must be a valid number.',
  'common.feedback.missingAdminSessionShort': 'The authenticated admin session is unavailable.',
  'common.placeholders.displayOrder': 'Enter the display order',
  'common.placeholders.spanishSummary': 'Enter the Spanish summary',
  'common.empty.imageAssets': 'No image assets are available.',
  'common.empty.links': 'No links are available.',
  'common.empty.technologies': 'No technologies are available.',
  'common.empty.formations': 'No formations are available.',
  'common.empty.imageAssetsForRelation': 'No image asset is available to relate right now.',
  'common.empty.experiencesForRelation': 'No public experience is available to relate right now.',
  'common.empty.unregisteredText': 'No text was registered yet.',
  'common.empty.stackDistribution': 'No stack distribution was returned yet.',
  'common.filters.all': 'All',
  'common.states.highlighted': 'Highlighted',
  'common.states.notHighlighted': 'Not highlighted',
  'common.location.beloHorizonteBrazil': 'Belo Horizonte, Brazil',
  'common.sections.clients': '// clients',
  'common.sections.projects': '// projects',
  'common.sections.techStack': '// tech_stack',
  'common.sections.rolesHeld': '// roles_held',
  'common.sections.description': '// description',
  'common.states.studying': 'Studying',
  'common.entities.home': 'Home',
  'common.entities.skills': 'Skills',
  'common.entities.dashboard': 'Dashboard',
  'common.entities.experiences': 'Experiences',
  'common.entities.formations': 'Formations',
  'common.entities.customers': 'Customers',
  'common.entities.languages': 'Languages',
  'common.entities.tags': 'Tags',
  'common.entities.jobs': 'Jobs',
  'common.entities.technologyContexts': 'Technology contexts',
  'common.languages.english': 'English',
  'common.languages.portuguese': 'Portuguese',
  'common.languages.spanish': 'Spanish',
  'common.values.other': 'Other',
  'common.entities.imageAssets': 'Image assets',
  'common.fields.type': 'Type',
  'common.fields.name': 'Name',
  'common.fields.description': 'Description',
  'common.fields.summary': 'Summary',
  'common.fields.date': 'Date',
  'common.fields.code': 'Code',
  'common.fields.url': 'URL',
  'common.fields.category': 'Category',
  'common.fields.frequency': 'Frequency',
  'common.fields.level': 'Level',
  'common.fields.technology': 'Technology',
  'common.fields.environment': 'Environment',
  'common.fields.spanishName': 'Spanish name',
  'common.fields.spanishTitle': 'Spanish title',
  'common.fields.spanishSummary': 'Spanish summary',
  'common.fields.spanishDescription': 'Spanish description',
  'common.fields.fileName': 'File name',
  'common.fields.filePath': 'File path',
  'common.fields.folder': 'Folder',
  'common.fields.kind': 'Kind',
  'common.fields.mimeType': 'MIME type',
  'common.fields.degreeType': 'Degree type',
  'common.fields.institution': 'Institution',
  'common.fields.settingKey': 'Setting key',
  'common.fields.jsonValue': 'JSON value',
  'common.fields.proficiency': 'Proficiency',
  'common.fields.highlightStatus': 'Highlight status',
  'common.fields.highlight': 'Highlight',
  'common.fields.totalCompanyPeriod': 'Total period at the company:',
  'common.relations.technologies': 'Related technologies',
  'common.relations.formations': 'Related formations',
  'common.relations.links': 'Related links',
  'common.feedback.missingAdminSession':
    'The authenticated admin session is unavailable. Log in again to continue.',
  'common.feedback.invalidIntegerSortOrder': 'The sort order must be a valid integer number.',
  'common.feedback.invalidDateRange': 'The end date cannot be earlier than the start date.',
  'common.feedback.requiredStartDate': 'The start date is required before submitting.',
  'common.feedback.requiredSpanishName': 'The Spanish name is required.',
  'common.feedback.requiredSlug': 'The slug is required.',
  'common.feedback.requiredTitlePt': 'The Portuguese title is required.',
  'common.feedback.requiredTitleEn': 'The English title is required.',
  'common.feedback.requiredTitleEs': 'The Spanish title is required.',
  'common.feedback.requiredSummaryEs': 'The Spanish summary is required.',
  'common.placeholders.integerSortOrder': 'Enter the integer sort order',
  'common.empty.projectsForRelation': 'No public project is available to relate right now.',
  'common.empty.technologiesForRelation': 'No public technology is available to relate right now.',
  'pages.home.hero.availability': 'Available for work',
  'pages.home.hero.greeting': "Hi, I'm",
  'pages.home.hero.subtitle': 'Senior Full Stack Software Engineer',
  'pages.home.hero.description':
    'Senior Software Engineer with experience in both Front-End and Back-End development. Based in Belo Horizonte, Minas Gerais, Brazil. I am currently working remotely and open to new opportunities in software development.',
  'pages.home.hero.cta.projects': 'View Projects',
  'pages.home.hero.cta.experiences': 'My Experience',
  'pages.home.hero.social.navigation': 'Social links',
  'pages.home.metrics.years.label': 'Years of Experience',
  'pages.home.metrics.years.description':
    'Building high-quality web products for the market for many years.',
  'pages.home.metrics.projects.label': 'Projects Delivered',
  'pages.home.metrics.projects.description':
    'Experience with many professional, personal, and academic projects.',
  'pages.home.metrics.technologies.description':
    'A wide range of tools already used for development and studies.',
  'pages.home.metrics.ariaLabel': 'Portfolio metrics',
  'pages.home.loading': 'Connecting live portfolio data...',
  'pages.home.error': 'The live home data is unavailable right now.',
  'pages.home.stack.label': '// CORE_STACK',
  'pages.home.stack.title': 'Main Technologies',
  'pages.home.stack.description':
    'Currently, these are the main technology stacks I have mastered and gained the most practical experience with throughout my software development career.',
  'pages.home.stack.moreSkills': 'Check out more skills',
  'pages.home.highlightedProjects.label': '// MAIN_ACHIEVEMENTS',
  'pages.home.highlightedProjects.title': 'Highlighted Projects',
  'pages.home.highlightedProjects.description':
    'A selection of projects that represent my most relevant work and technical challenges.',
  'pages.home.highlightedProjects.moreProjects': 'Check out more projects',
  'pages.experiences.sectionLabel': '// CAREER_TIMELINE',
  'pages.experiences.title': 'Professional Experience',
  'pages.experiences.description':
    'A chronological journey through my career building impactful software solutions.',
  'pages.experiences.timeline.loading': 'Loading live experience relationships...',
  'pages.experiences.timeline.error': 'The experiences endpoint is unavailable right now.',
  'pages.experiences.timeline.empty': 'No published experience chapters were returned yet.',
  'pages.experiences.timeline.emptyCustomers': 'No linked customers yet.',
  'pages.experiences.timeline.emptyProjects': 'No related projects were returned for this chapter.',

  'pages.experiences.technology.category': 'Category',
  'pages.experiences.technology.level': 'Knowledge level',
  'pages.experiences.technology.frequency': 'Usage frequency',
  'pages.experiences.technology.projects': 'Projects used',
  'pages.experiences.customer.company': 'Related company',
  'pages.experiences.customer.projects': 'Related projects',
  'pages.skills.sectionLabel': '// SKILLS_ARSENAL',
  'pages.skills.title': 'Skills & Technologies',
  'pages.skills.description':
    'A comprehensive overview of my technical arsenal, education and language proficiencies.',
  'pages.skills.filters.level': 'Level',
  'pages.skills.education.title': 'Education',
  'pages.skills.search.placeholder': 'Search technology...',
  'pages.skills.catalog.loading': 'Building technology groups...',
  'pages.skills.catalog.error': 'The technologies endpoint is unavailable right now.',
  'pages.skills.catalog.empty': 'No published technologies matched the current filters.',
  'pages.skills.detail.totalExperience': 'Consolidated experience',
  'pages.skills.detail.technologyContexts': 'Technology Contexts',
  'pages.skills.detail.contextExperience': 'Experience by context',
  'pages.skills.education.detail.degree': 'Degree',

  'pages.skills.education.detail.gallery': 'Images',
  'pages.skills.languages.detail.proficiency': 'Proficiency',
  'pages.projects.detail.emptyGallery': 'No linked images',
  'common.time.month': '{{count}} month',
  'common.time.months': '{{count}} months',
  'common.time.year': '{{count}} year',
  'common.time.years': '{{count}} years',
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
  'taxonomy.skills.level.basic': 'Basic',

  'taxonomy.skills.stack.frontEnd': 'Front-End',
  'taxonomy.skills.stack.backEnd': 'Back-End',
  'taxonomy.skills.stack.databases': 'Databases',
  'taxonomy.skills.stack.games': 'Games',
  'taxonomy.skills.stack.mobile': 'Mobile',
  'taxonomy.skills.stack.others': 'Others',
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
  'taxonomy.skills.frequency.frequent': 'Frequent',
  'taxonomy.skills.frequency.occasional': 'Occasional',
  'taxonomy.skills.frequency.rare': 'Rare',
  'taxonomy.skills.frequency.previouslyUsed': 'Previously used',
  'taxonomy.skills.context.professional': 'Professional',
  'taxonomy.skills.context.personal': 'Personal',
  'taxonomy.skills.context.academic': 'Academic',
  'taxonomy.skills.context.study': 'Study',
  'taxonomy.experiences.projectStatus.completed': 'Completed',
  'taxonomy.experiences.projectStatus.inProgress': 'In progress',

  'taxonomy.experiences.projectEnvironment.fullstack': 'Full stack',
  'taxonomy.experiences.present': 'Present',
  'pages.projects.sectionLabel': '// PROJECTS_SHOWCASE',
  'pages.projects.description':
    'A collection of real-world applications, professional, academic works and personal experiments.',
  'pages.projects.filters.label': 'Case filters',
  'pages.projects.search.placeholder': 'Search projects...',
  'pages.projects.catalog.loading': 'Building project case studies...',
  'pages.projects.catalog.error': 'The projects endpoint is unavailable right now.',
  'pages.projects.catalog.empty': 'No published projects matched the current filters.',

  'pages.projects.card.links': 'Links and references',
  'pages.projects.detail.gallery': 'Expanded gallery',
  'taxonomy.projects.filters.allEnvironments': 'All environments',
  'taxonomy.projects.filters.allStatuses': 'All statuses',
  'taxonomy.projects.sort.featured': 'Featured first',
  'taxonomy.projects.sort.recent': 'Most recent start',
  'taxonomy.projects.sort.stack': 'Largest stack',
  'taxonomy.projects.sort.links': 'Most linked assets',
  'taxonomy.projects.linkType.github': 'GitHub',
  'taxonomy.projects.linkType.deploy': 'Deploy',
  'taxonomy.projects.linkType.sourceCode': 'Source code',
  'taxonomy.projects.summary.total': 'Published cases',
  'taxonomy.projects.summary.featured': 'Featured',
  'taxonomy.projects.summary.linkedAssets': 'Linked assets',
  'taxonomy.projects.summary.richestStack': 'Richest stack',
  'taxonomy.projects.fallback.noAssets': 'No linked visual assets yet.',
  'taxonomy.projects.fallback.noLinks': 'No published links were attached yet.',
  'taxonomy.projects.fallback.untitledLink': 'Untitled link',
  'pages.dashboard.sectionLabel': '// DASHBOARD',
  'pages.dashboard.title': 'Analytics Dashboard',
  'pages.dashboard.description':
    'Aggregated analysis of career stacks, tools and projects, presented on a dashboard with informative charts.',
  'pages.dashboard.snapshot.loading': 'Loading dashboard aggregates...',
  'pages.dashboard.snapshot.error': 'The dashboard aggregate endpoints are unavailable right now.',
  'pages.dashboard.snapshot.metrics.formations': 'Formations / languages',
  'pages.dashboard.snapshot.metrics.jobs': 'Roles',
  'pages.dashboard.stacks.label': 'Stack distribution',
  'pages.dashboard.stacks.title': 'Where the portfolio carries the most technical weight',
  'pages.dashboard.stacks.description':
    'Each stack area combines linked projects and mapped technologies so the strongest zones are obvious at a glance.',
  'pages.dashboard.distribution.label': 'Project footprint',
  'pages.dashboard.distribution.title':
    'Delivery context, environment spread and highlight density',
  'pages.dashboard.distribution.description':
    'This block keeps the project catalog readable by separating featured volume from context and environment patterns.',
  'pages.dashboard.distribution.empty': 'No project distribution data was returned yet.',
  'pages.dashboard.distribution.environments': 'Environments',
  'pages.dashboard.technology.label': 'Technology usage',
  'pages.dashboard.technology.title': 'Technology usage signals',
  'pages.dashboard.technology.description':
    'Top technologies and their frequency, context and source patterns come straight from the aggregate API relations.',
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
  'pages.dashboard.projectsByType.empty': 'No project technology breakdown was returned yet.',
  'pages.dashboard.projectsByType.selectLabel': 'Technology type',
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
  'pages.admin.operations.yes': 'Yes',
  'pages.admin.operations.no': 'No',
  'pages.admin.operations.emptyRelations': 'No related records are currently linked.',
  'pages.admin.relationMode.owner': 'Owned relationships',
  'pages.admin.relationMode.dedicated': 'Dedicated relationship entity',
  'pages.admin.entities.portfolio-settings.description':
    'Global configuration, highlighted content and structured settings that drive the portfolio shell.',
  'pages.admin.portfolioSettings.sectionLabel': '// PORTFOLIO_SETTINGS',
  'pages.admin.portfolioSettings.description':
    'Live protected CRUD for the JSON-based settings that shape the shell, highlights and structured content.',
  'pages.admin.portfolioSettings.states.loading':
    'Loading the protected portfolio settings collection...',
  'pages.admin.portfolioSettings.states.empty':
    'No protected portfolio setting has been registered yet.',

  'pages.admin.portfolioSettings.card.emptyDescription':
    'No description was registered for this setting yet.',

  'pages.admin.portfolioSettings.fields.key.placeholder': 'Enter the unique setting key',
  'pages.admin.portfolioSettings.fields.description.placeholder':
    'Describe the responsibility of this setting',
  'pages.admin.portfolioSettings.fields.value.placeholder':
    'Enter a valid JSON object, array or scalar value',
  'pages.admin.portfolioSettings.modal.create.title': 'Create portfolio setting',
  'pages.admin.portfolioSettings.modal.read.title': 'Read portfolio settings',
  'pages.admin.portfolioSettings.modal.read.description':
    'Review the current protected JSON settings and jump directly to update or delete from each record.',
  'pages.admin.portfolioSettings.modal.pickUpdate.title': 'Select a setting to update',
  'pages.admin.portfolioSettings.modal.pickUpdate.description':
    'Choose one of the current protected settings to open its update form.',
  'pages.admin.portfolioSettings.modal.pickDelete.title': 'Select a setting to delete',
  'pages.admin.portfolioSettings.modal.pickDelete.description':
    'Choose one of the current protected settings to confirm its removal.',
  'pages.admin.portfolioSettings.modal.update.title': 'Update portfolio setting',
  'pages.admin.portfolioSettings.modal.delete.title': 'Delete portfolio setting',
  'pages.admin.portfolioSettings.modal.delete.description':
    'This action permanently removes the selected protected setting from the portfolio configuration.',
  'pages.admin.portfolioSettings.feedback.created': 'Portfolio setting created successfully.',
  'pages.admin.portfolioSettings.feedback.updated': 'Portfolio setting updated successfully.',
  'pages.admin.portfolioSettings.feedback.deleted': 'Portfolio setting deleted successfully.',
  'pages.admin.portfolioSettings.feedback.requiredKey':
    'The setting key is required before submitting.',
  'pages.admin.portfolioSettings.feedback.invalidJson':
    'The JSON value is invalid. Review the structure before submitting.',
  'pages.admin.portfolioSettings.feedback.selectionRequired':
    'Select a portfolio setting before continuing with this action.',
  'pages.admin.portfolioSettings.feedback.loadError':
    'The protected portfolio settings collection could not be loaded right now.',
  'pages.admin.portfolioSettings.feedback.saveError':
    'The portfolio setting could not be saved right now.',
  'pages.admin.portfolioSettings.feedback.deleteError':
    'The portfolio setting could not be deleted right now.',
  'pages.admin.entities.tags.description':
    'Reusable classification labels shared across projects, technologies and future editorial flows.',
  'pages.admin.tags.sectionLabel': '// TAGS',
  'pages.admin.tags.description':
    'Protected CRUD for reusable labels that classify projects and technologies through relation arrays owned by each tag.',
  'pages.admin.tags.states.loading': 'Loading the protected tags collection...',
  'pages.admin.tags.states.empty': 'No protected tag has been registered yet.',
  'pages.admin.tags.card.emptyRelations': 'No related records are currently linked to this tag.',
  'pages.admin.tags.fields.slug.placeholder': 'Enter the unique tag slug',
  'pages.admin.tags.fields.namePt.label': 'Portuguese name',
  'pages.admin.tags.fields.namePt.placeholder': 'Enter the Portuguese tag name',
  'pages.admin.tags.fields.nameEn.label': 'English name',
  'pages.admin.tags.fields.nameEn.placeholder': 'Enter the English tag name',
  'pages.admin.tags.fields.type.empty': 'No tag type is available right now.',
  'pages.admin.tags.fields.type.options.DOMAIN': 'Domain',
  'pages.admin.tags.fields.type.options.PLATFORM': 'Platform',
  'pages.admin.tags.fields.type.options.METHODOLOGY': 'Methodology',
  'pages.admin.tags.fields.type.options.INDUSTRY': 'Industry',
  'pages.admin.tags.fields.sortOrder.placeholder': 'Enter the integer sort order',
  'pages.admin.tags.fields.projects.description':
    'Select every project that should expose this tag in its public relationships.',

  'pages.admin.tags.fields.technologies.description':
    'Select every technology that should keep this tag in its relationship arrays.',
  'pages.admin.tags.modal.create.title': 'Create tag',
  'pages.admin.tags.modal.read.title': 'Read tags',
  'pages.admin.tags.modal.read.description':
    'Review the current protected tags and open update or delete flows directly from each record.',
  'pages.admin.tags.modal.pickUpdate.title': 'Select a tag to update',
  'pages.admin.tags.modal.pickUpdate.description':
    'Choose one of the current protected tags to open its update form.',
  'pages.admin.tags.modal.pickDelete.title': 'Select a tag to delete',
  'pages.admin.tags.modal.pickDelete.description':
    'Choose one of the current protected tags to confirm its removal.',
  'pages.admin.tags.modal.update.title': 'Update tag',
  'pages.admin.tags.modal.delete.title': 'Delete tag',
  'pages.admin.tags.modal.delete.description':
    'This action permanently removes the selected protected tag and its current relations from the portfolio.',
  'pages.admin.tags.feedback.created': 'Protected tag created successfully.',
  'pages.admin.tags.feedback.updated': 'Protected tag updated successfully.',
  'pages.admin.tags.feedback.deleted': 'Protected tag deleted successfully.',
  'pages.admin.tags.feedback.requiredSlug': 'The tag slug is required before submitting.',
  'pages.admin.tags.feedback.requiredNamePt':
    'The Portuguese tag name is required before submitting.',
  'pages.admin.tags.feedback.requiredNameEn': 'The English tag name is required before submitting.',
  'pages.admin.tags.feedback.requiredType': 'The tag type is required before submitting.',
  'pages.admin.tags.feedback.invalidType':
    'Select one of the supported tag types before submitting.',

  'pages.admin.tags.feedback.selectionRequired':
    'Select a protected tag before continuing with this action.',
  'pages.admin.tags.feedback.loadError':
    'The protected tags collection could not be loaded right now.',
  'pages.admin.tags.feedback.saveError': 'The protected tag could not be saved right now.',
  'pages.admin.tags.feedback.deleteError': 'The protected tag could not be deleted right now.',
  'pages.admin.entities.links.description':
    'External references such as repositories, live demos, documents and complementary navigation targets.',
  'pages.admin.links.sectionLabel': '// LINKS',
  'pages.admin.links.description':
    'Protected CRUD for reusable external references connected to projects, experiences, technologies and future formation records through owned relationship arrays.',
  'pages.admin.links.states.loading': 'Loading the protected links collection...',
  'pages.admin.links.states.empty': 'No protected link has been registered yet.',

  'pages.admin.links.card.emptyRelations': 'No related records are currently linked to this link.',
  'pages.admin.links.fields.url.placeholder': 'Enter the public link URL',
  'pages.admin.links.fields.labelPt.label': 'Portuguese label',
  'pages.admin.links.fields.labelPt.placeholder': 'Enter the Portuguese label shown to visitors',
  'pages.admin.links.fields.labelEn.label': 'English label',
  'pages.admin.links.fields.labelEn.placeholder': 'Enter the English label shown to visitors',
  'pages.admin.links.fields.descriptionPt.label': 'Portuguese description',
  'pages.admin.links.fields.descriptionPt.placeholder': 'Describe this link in Portuguese',
  'pages.admin.links.fields.descriptionEn.label': 'English description',
  'pages.admin.links.fields.descriptionEn.placeholder': 'Describe this link in English',
  'pages.admin.links.fields.type.empty': 'No link type is available right now.',

  'pages.admin.links.fields.type.options.NPM': 'npm',
  'pages.admin.links.fields.type.options.DOCS': 'Docs',
  'pages.admin.links.fields.type.options.LINKEDIN': 'LinkedIn',
  'pages.admin.links.fields.type.options.WEBSITE': 'Website',
  'pages.admin.links.fields.type.options.ARTICLE': 'Article',
  'pages.admin.links.fields.type.options.FIGMA': 'Figma',
  'pages.admin.links.fields.sortOrder.placeholder': 'Enter the integer sort order',
  'pages.admin.links.fields.projects.description':
    'Select every project that should expose this link in its public references.',
  'pages.admin.links.fields.experiences.label': 'Related experiences',
  'pages.admin.links.fields.experiences.description':
    'Select every experience that should keep this link in its relationship arrays.',
  'pages.admin.links.fields.technologies.description':
    'Select every technology that should expose this link in future public contexts.',
  'pages.admin.links.fields.formations.description':
    'Select every formation that should expose this link.',
  'pages.admin.links.fields.formations.empty': 'No formation is available to relate right now.',
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
  'pages.admin.links.feedback.requiredUrl': 'The link URL is required before submitting.',
  'pages.admin.links.feedback.requiredType': 'The link type is required before submitting.',
  'pages.admin.links.feedback.invalidType':
    'Select one of the supported link types before submitting.',

  'pages.admin.links.feedback.selectionRequired':
    'Select a protected link before continuing with this action.',
  'pages.admin.links.feedback.loadError':
    'The protected links collection could not be loaded right now.',
  'pages.admin.links.feedback.saveError': 'The protected link could not be saved right now.',
  'pages.admin.links.feedback.deleteError': 'The protected link could not be deleted right now.',
  'pages.admin.imageAssets.sectionLabel': '// IMAGE_ASSETS',
  'pages.admin.imageAssets.description':
    'Protected CRUD for normalized media files connected to projects, experiences and technologies through owned relationship arrays.',
  'pages.admin.imageAssets.states.loading': 'Loading the protected image assets collection...',
  'pages.admin.imageAssets.states.empty': 'No protected image asset has been registered yet.',
  'pages.admin.imageAssets.card.dimensions': 'Dimensions',
  'pages.admin.imageAssets.card.spokenLanguages': 'Spoken languages',
  'pages.admin.imageAssets.card.jobs': 'Jobs',
  'pages.admin.imageAssets.card.emptyRelations':
    'No related records are currently linked to this image asset.',
  'pages.admin.imageAssets.fields.fileName.placeholder': 'Enter the unique asset file name',
  'pages.admin.imageAssets.fields.filePath.placeholder':
    'Enter the public file path used by the portfolio',
  'pages.admin.imageAssets.fields.folder.placeholder': 'Enter the asset folder',
  'pages.admin.imageAssets.fields.kind.empty': 'No image asset kind is available right now.',
  'pages.admin.imageAssets.fields.kind.options.ICON': 'Icon',
  'pages.admin.imageAssets.fields.kind.options.SCREENSHOT': 'Screenshot',
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
  'pages.admin.imageAssets.fields.mimeType.placeholder': 'Enter the asset MIME type',
  'pages.admin.imageAssets.fields.width.label': 'Width',
  'pages.admin.imageAssets.fields.width.placeholder': 'Enter the asset width in pixels',
  'pages.admin.imageAssets.fields.height.label': 'Height',
  'pages.admin.imageAssets.fields.height.placeholder': 'Enter the asset height in pixels',
  'pages.admin.imageAssets.fields.projects.description':
    'Select every project that should expose this media file in its public gallery.',
  'pages.admin.imageAssets.fields.experiences.description':
    'Select every experience that should keep this media file in its relationship arrays.',
  'pages.admin.imageAssets.fields.technologies.description':
    'Select every technology that should expose this media file in its public references.',
  'pages.admin.imageAssets.fields.formations.description':
    'Select every formation linked to this image asset.',
  'pages.admin.imageAssets.fields.spokenLanguages.label': 'Related spoken languages',
  'pages.admin.imageAssets.fields.spokenLanguages.description':
    'Select every spoken language linked to this image asset.',
  'pages.admin.imageAssets.fields.spokenLanguages.empty': 'No spoken languages are available.',
  'pages.admin.imageAssets.fields.customers.description':
    'Select every customer linked to this image asset.',
  'pages.admin.imageAssets.fields.customers.empty': 'No customers are available.',
  'pages.admin.imageAssets.fields.jobs.label': 'Related jobs',
  'pages.admin.imageAssets.fields.jobs.description': 'Select every job linked to this image asset.',
  'pages.admin.imageAssets.fields.jobs.empty': 'No jobs are available.',
  'pages.admin.imageAssets.modal.create.title': 'Create image asset',
  'pages.admin.imageAssets.modal.read.title': 'Read image assets',
  'pages.admin.imageAssets.modal.read.description':
    'Review the current protected image assets and open update or delete flows directly from each record.',
  'pages.admin.imageAssets.modal.pickUpdate.title': 'Select an image asset to update',
  'pages.admin.imageAssets.modal.pickUpdate.description':
    'Choose one of the current protected image assets to open its update form.',
  'pages.admin.imageAssets.modal.pickDelete.title': 'Select an image asset to delete',
  'pages.admin.imageAssets.modal.pickDelete.description':
    'Choose one of the current protected image assets to confirm its removal.',
  'pages.admin.imageAssets.modal.update.title': 'Update image asset',
  'pages.admin.imageAssets.modal.delete.title': 'Delete image asset',
  'pages.admin.imageAssets.modal.delete.description':
    'This action permanently removes the selected protected image asset from the portfolio.',
  'pages.admin.imageAssets.feedback.created': 'Protected image asset created successfully.',
  'pages.admin.imageAssets.feedback.updated': 'Protected image asset updated successfully.',
  'pages.admin.imageAssets.feedback.deleted': 'Protected image asset deleted successfully.',
  'pages.admin.imageAssets.feedback.requiredFileName':
    'The file name is required before submitting.',
  'pages.admin.imageAssets.feedback.requiredFilePath':
    'The file path is required before submitting.',
  'pages.admin.imageAssets.feedback.requiredFolder': 'The folder is required before submitting.',
  'pages.admin.imageAssets.feedback.requiredKind':
    'The image asset kind is required before submitting.',
  'pages.admin.imageAssets.feedback.invalidKind':
    'Select one of the supported image asset kinds before submitting.',
  'pages.admin.imageAssets.feedback.requiredMimeType':
    'The MIME type is required before submitting.',
  'pages.admin.imageAssets.feedback.invalidDimensions':
    'Width and height must be valid integer numbers when informed.',
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
  'pages.admin.spokenLanguages.card.emptyRelations':
    'No related image asset is currently linked to this language entry.',
  'pages.admin.spokenLanguages.fields.code.placeholder': 'Enter the language code',
  'pages.admin.spokenLanguages.fields.namePt.placeholder': 'Enter the Portuguese language name',
  'pages.admin.spokenLanguages.fields.nameEn.placeholder': 'Enter the English language name',
  'pages.admin.spokenLanguages.fields.proficiency.empty':
    'No proficiency option is available right now.',
  'pages.admin.spokenLanguages.fields.proficiency.options.NATIVE': 'Native',
  'pages.admin.spokenLanguages.fields.proficiency.options.FLUENT': 'Fluent',
  'pages.admin.spokenLanguages.fields.highlight.description':
    'Control whether this spoken language should stay emphasized in the public portfolio.',

  'pages.admin.spokenLanguages.fields.imageAssets.description':
    'Select every image asset that should visually represent this language in the public portfolio.',
  'pages.admin.spokenLanguages.fields.imageAssets.empty':
    'No public image asset is available to relate right now.',
  'pages.admin.spokenLanguages.modal.create.title': 'Create spoken language',
  'pages.admin.spokenLanguages.modal.read.title': 'Read spoken languages',
  'pages.admin.spokenLanguages.modal.read.description':
    'Review the current protected spoken languages and open update or delete flows directly from each record.',
  'pages.admin.spokenLanguages.modal.pickUpdate.title': 'Select a spoken language to update',
  'pages.admin.spokenLanguages.modal.pickUpdate.description':
    'Choose one of the current protected spoken languages to open its update form.',
  'pages.admin.spokenLanguages.modal.pickDelete.title': 'Select a spoken language to delete',
  'pages.admin.spokenLanguages.modal.pickDelete.description':
    'Choose one of the current protected spoken languages to confirm its removal.',
  'pages.admin.spokenLanguages.modal.update.title': 'Update spoken language',
  'pages.admin.spokenLanguages.modal.delete.title': 'Delete spoken language',
  'pages.admin.spokenLanguages.modal.delete.description':
    'This action permanently removes the selected protected language entry from the portfolio.',
  'pages.admin.spokenLanguages.feedback.created': 'Protected spoken language created successfully.',
  'pages.admin.spokenLanguages.feedback.updated': 'Protected spoken language updated successfully.',
  'pages.admin.spokenLanguages.feedback.deleted': 'Protected spoken language deleted successfully.',
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
  'pages.admin.customers.states.loading': 'Loading the protected customers collection...',
  'pages.admin.customers.states.empty': 'No protected customer has been registered yet.',
  'pages.admin.customers.card.emptyRelations':
    'No linked record is currently connected to this customer.',
  'pages.admin.customers.fields.slug.placeholder': 'Enter the unique customer slug',
  'pages.admin.customers.fields.name.placeholder': 'Enter the customer name',
  'pages.admin.customers.fields.summaryPt.placeholder': 'Enter the Portuguese customer summary',
  'pages.admin.customers.fields.summaryEn.placeholder': 'Enter the English customer summary',
  'pages.admin.customers.fields.highlight.description':
    'Control whether this customer should stay highlighted in public portfolio sections.',

  'pages.admin.customers.fields.experiences.description':
    'Select every experience that should expose this customer in public storytelling.',
  'pages.admin.customers.fields.experiences.empty':
    'No experience is available to relate right now.',
  'pages.admin.customers.fields.imageAssets.description':
    'Select every image asset linked to this customer.',
  'pages.admin.customers.fields.imageAssets.empty':
    'No image asset is available to relate right now.',
  'pages.admin.customers.modal.create.title': 'Create customer',
  'pages.admin.customers.modal.read.title': 'Read customers',
  'pages.admin.customers.modal.read.description':
    'Review the current protected customers and open update or delete flows directly from each record.',
  'pages.admin.customers.modal.pickUpdate.title': 'Select a customer to update',
  'pages.admin.customers.modal.pickUpdate.description':
    'Choose one of the current protected customers to open its update form.',
  'pages.admin.customers.modal.pickDelete.title': 'Select a customer to delete',
  'pages.admin.customers.modal.pickDelete.description':
    'Choose one of the current protected customers to confirm its removal.',
  'pages.admin.customers.modal.update.title': 'Update customer',
  'pages.admin.customers.modal.delete.title': 'Delete customer',
  'pages.admin.customers.modal.delete.description':
    'This action permanently removes the selected protected customer from the portfolio.',
  'pages.admin.customers.feedback.created': 'Protected customer created successfully.',
  'pages.admin.customers.feedback.updated': 'Protected customer updated successfully.',
  'pages.admin.customers.feedback.deleted': 'Protected customer deleted successfully.',
  'pages.admin.customers.feedback.requiredSlug': 'The customer slug is required before submitting.',
  'pages.admin.customers.feedback.requiredName': 'The customer name is required before submitting.',
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
  'pages.admin.jobs.card.emptyRelations': 'No linked record is currently connected to this job.',
  'pages.admin.jobs.fields.slug.placeholder': 'Enter the unique job slug',
  'pages.admin.jobs.fields.namePt.placeholder': 'Enter the Portuguese job name',
  'pages.admin.jobs.fields.nameEn.placeholder': 'Enter the English job name',
  'pages.admin.jobs.fields.summaryPt.label': 'Portuguese summary',
  'pages.admin.jobs.fields.summaryPt.placeholder': 'Enter the Portuguese job summary',
  'pages.admin.jobs.fields.summaryEn.label': 'English summary',
  'pages.admin.jobs.fields.summaryEn.placeholder': 'Enter the English job summary',
  'pages.admin.jobs.fields.highlight.description':
    'Control whether this job should stay highlighted in public portfolio sections.',

  'pages.admin.jobs.fields.experiences.description':
    'Select every experience that should expose this job in public storytelling.',
  'pages.admin.jobs.fields.experiences.empty': 'No experience is available to relate right now.',
  'pages.admin.jobs.fields.imageAssets.description': 'Select every image asset linked to this job.',
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
  'pages.admin.jobs.feedback.requiredSlug': 'The job slug is required before submitting.',
  'pages.admin.jobs.feedback.requiredNamePt':
    'The Portuguese job name is required before submitting.',
  'pages.admin.jobs.feedback.requiredNameEn': 'The English job name is required before submitting.',

  'pages.admin.jobs.feedback.selectionRequired':
    'Select a protected job before continuing with this action.',
  'pages.admin.jobs.feedback.loadError':
    'The protected jobs collection could not be loaded right now.',
  'pages.admin.jobs.feedback.saveError': 'The protected job could not be saved right now.',
  'pages.admin.jobs.feedback.deleteError': 'The protected job could not be deleted right now.',
  'pages.admin.technologies.sectionLabel': '// TECHNOLOGIES',
  'pages.admin.technologies.description':
    'Protected CRUD for the technology catalog used by the public skills experience.',
  'pages.admin.technologies.states.loading': 'Loading the protected technologies collection...',
  'pages.admin.technologies.states.empty': 'No protected technology has been registered yet.',
  'pages.admin.technologies.fields.slug.placeholder': 'Enter the unique technology slug',
  'pages.admin.technologies.fields.name.placeholder': 'Enter the technology name',
  'pages.admin.technologies.fields.sortOrder.placeholder': 'Enter the display order',
  'pages.admin.technologies.fields.imageAssets.label': 'Related image assets',
  'pages.admin.technologies.fields.projects.description':
    'Select every project that uses this technology.',
  'pages.admin.technologies.fields.projects.empty': 'No projects are available.',
  'pages.admin.technologies.fields.experiences.label': 'Related experiences',
  'pages.admin.technologies.fields.experiences.description':
    'Select every experience that uses this technology.',
  'pages.admin.technologies.fields.experiences.empty': 'No experiences are available.',
  'pages.admin.technologies.fields.formations.description':
    'Select every formation that uses this technology.',
  'pages.admin.technologies.fields.tags.label': 'Related tags',
  'pages.admin.technologies.fields.tags.description': 'Select every tag linked to this technology.',
  'pages.admin.technologies.fields.tags.empty': 'No tags are available.',
  'pages.admin.technologies.fields.links.label': 'Related links',
  'pages.admin.technologies.fields.links.description':
    'Select every link connected to this technology.',
  'pages.admin.technologies.fields.links.empty': 'No links are available.',
  'pages.admin.technologies.fields.highlight.description':
    'Control whether this technology should stay emphasized in the public skills catalog.',
  'pages.admin.technologies.fields.highlight.enabled': 'Highlighted',
  'pages.admin.technologies.fields.highlight.disabled': 'Not highlighted',
  'pages.admin.technologies.fields.imageAssets.description':
    'Select every image asset that should visually represent this technology in the public portfolio.',

  'pages.admin.technologies.card.highlight': 'Highlight',
  'pages.admin.technologies.card.technologyContexts': 'Technology contexts',
  'pages.admin.technologies.card.tags': 'Tags',
  'pages.admin.technologies.fields.imageAssets.empty': 'No image assets are available.',
  'pages.admin.technologies.card.emptyRelations':
    'No linked record is currently connected to this technology.',
  'pages.admin.technologies.feedback.requiredSlug': 'The technology slug is required.',
  'pages.admin.technologies.feedback.requiredName': 'The technology name is required.',
  'pages.admin.technologies.feedback.requiredCategory': 'The technology category is required.',
  'pages.admin.technologies.feedback.invalidSortOrder': 'The sort order must be a valid number.',
  'pages.admin.technologies.feedback.missingSession': 'The admin session is unavailable.',
  'pages.admin.technologies.feedback.selectionRequired': 'Select a technology first.',
  'pages.admin.technologies.feedback.loadError':
    'The protected technologies collection could not be loaded right now.',
  'pages.admin.technologies.feedback.saveError':
    'The protected technology could not be saved right now.',
  'pages.admin.technologies.feedback.deleteError':
    'The protected technology could not be deleted right now.',
  'pages.admin.technologies.feedback.created': 'Protected technology created successfully.',
  'pages.admin.technologies.feedback.updated': 'Protected technology updated successfully.',
  'pages.admin.technologies.feedback.deleted': 'Protected technology deleted successfully.',
  'pages.admin.technologies.modal.create.title': 'Create technology',
  'pages.admin.technologies.modal.read.title': 'Read technologies',
  'pages.admin.technologies.modal.pick-update.title': 'Select a technology to update',
  'pages.admin.technologies.modal.pick-delete.title': 'Select a technology to delete',
  'pages.admin.technologies.modal.update.title': 'Update technology',
  'pages.admin.technologies.modal.delete.title': 'Delete technology',
  'pages.admin.technologies.modal.read.description':
    'Review the current protected technologies and open update or delete flows directly from each record.',
  'pages.admin.technologies.modal.pickUpdate.description':
    'Choose one of the current protected technologies to open its update form.',
  'pages.admin.technologies.modal.pickDelete.description':
    'Choose one of the current protected technologies to confirm its removal.',
  'pages.admin.technologies.modal.delete.description':
    'This action permanently removes the selected protected technology from the portfolio.',
  'pages.admin.formations.sectionLabel': '// FORMATIONS',
  'pages.admin.formations.description':
    'Protected CRUD for academic and professional education records, including stack relations, supporting links and image assets.',
  'pages.admin.formations.states.loading': 'Loading the protected formations collection...',
  'pages.admin.formations.states.empty': 'No protected formation has been registered yet.',
  'pages.admin.formations.card.emptyRelations':
    'No linked record is currently connected to this formation.',
  'pages.admin.formations.fields.slug.placeholder': 'Enter the unique formation slug',
  'pages.admin.formations.fields.institution.placeholder': 'Enter the institution name',
  'pages.admin.formations.fields.titlePt.placeholder': 'Enter the Portuguese formation title',
  'pages.admin.formations.fields.titleEn.placeholder': 'Enter the English formation title',
  'pages.admin.formations.fields.degreeType.empty': 'No degree type is available right now.',
  'pages.admin.formations.fields.degreeType.options.TECHNICAL': 'Technical',
  'pages.admin.formations.fields.degreeType.options.BACHELOR': 'Bachelor',
  'pages.admin.formations.fields.degreeType.options.POSTGRADUATE': 'Postgraduate',
  'pages.admin.formations.fields.degreeType.options.MBA': 'MBA',
  'pages.admin.formations.fields.degreeType.options.MASTER': 'Master',
  'pages.admin.formations.fields.degreeType.options.DOCTORATE': 'Doctorate',
  'pages.admin.formations.fields.degreeType.options.BOOTCAMP': 'Bootcamp',
  'pages.admin.formations.fields.degreeType.options.CERTIFICATION': 'Certification',
  'pages.admin.formations.fields.degreeType.options.COURSE': 'Course',
  'pages.admin.technologies.options.TOOL': 'Tool',
  'pages.admin.technologies.options.CLOUD': 'Cloud',
  'pages.admin.technologies.options.TESTING': 'Testing',
  'pages.admin.technologies.options.STYLING': 'Styling',
  'pages.admin.technologies.options.ARCHITECTURE': 'Architecture',
  'pages.admin.technologies.options.STUDYING': 'Studying',
  'pages.admin.formations.fields.summaryPt.placeholder': 'Enter the Portuguese formation summary',
  'pages.admin.formations.fields.summaryEn.placeholder': 'Enter the English formation summary',
  'pages.admin.formations.fields.startDate.label': 'Start date',
  'pages.admin.formations.fields.endDate.label': 'End date',
  'pages.admin.formations.fields.highlight.description':
    'Control whether this formation should stay highlighted in public portfolio sections.',
  'pages.admin.formations.fields.technologies.label': 'Related technologies',
  'pages.admin.formations.fields.technologies.description':
    'Select every technology that should remain related to this formation.',
  'pages.admin.formations.fields.technologies.empty':
    'No technology is available to relate right now.',
  'pages.admin.formations.fields.links.description':
    'Select every supporting link connected to this formation.',
  'pages.admin.formations.fields.links.empty': 'No link is available to relate right now.',
  'pages.admin.formations.fields.imageAssets.description':
    'Select every image asset linked to this formation.',
  'pages.admin.formations.modal.create.title': 'Create formation',
  'pages.admin.formations.modal.read.title': 'Read formations',
  'pages.admin.formations.modal.read.description':
    'Review the current protected formations and open update or delete flows directly from each record.',
  'pages.admin.formations.modal.pickUpdate.title': 'Select a formation to update',
  'pages.admin.formations.modal.pickUpdate.description':
    'Choose one of the current protected formations to open its update form.',
  'pages.admin.formations.modal.pickDelete.title': 'Select a formation to delete',
  'pages.admin.formations.modal.pickDelete.description':
    'Choose one of the current protected formations to confirm its removal.',
  'pages.admin.formations.modal.update.title': 'Update formation',
  'pages.admin.formations.modal.delete.title': 'Delete formation',
  'pages.admin.formations.modal.delete.description':
    'This action permanently removes the selected protected formation from the portfolio.',
  'pages.admin.formations.feedback.created': 'Protected formation created successfully.',
  'pages.admin.formations.feedback.updated': 'Protected formation updated successfully.',
  'pages.admin.formations.feedback.deleted': 'Protected formation deleted successfully.',
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
  'pages.admin.formations.feedback.requiredStartDate':
    'The start date is required before submitting.',
  'pages.admin.formations.feedback.invalidDateRange':
    'The end date cannot be earlier than the start date.',
  'pages.admin.formations.feedback.selectionRequired':
    'Select a protected formation before continuing with this action.',
  'pages.admin.formations.feedback.loadError':
    'The protected formations collection could not be loaded right now.',
  'pages.admin.formations.feedback.saveError':
    'The protected formation could not be saved right now.',
  'pages.admin.formations.feedback.deleteError':
    'The protected formation could not be deleted right now.',
  'pages.admin.technologyContexts.sectionLabel': '// TECHNOLOGY_CONTEXTS',
  'pages.admin.technologyContexts.description':
    'Context windows that describe how each technology is used across the portfolio.',
  'pages.admin.technologyContexts.states.loading': 'Loading technology contexts...',
  'pages.admin.technologyContexts.states.empty':
    'No protected technology context has been registered yet.',
  'pages.admin.technologyContexts.fields.endedAt.label': 'End date',
  'pages.admin.technologyContexts.modal.create.title': 'Create technology context',
  'pages.admin.technologyContexts.modal.read.title': 'Read technology contexts',
  'pages.admin.technologyContexts.modal.read.description':
    'Review the current protected technology contexts and open update or delete flows directly from each record.',
  'pages.admin.technologyContexts.modal.pickUpdate.title': 'Select a technology context to update',
  'pages.admin.technologyContexts.modal.pickUpdate.description':
    'Choose a current protected technology context to open its update form.',
  'pages.admin.technologyContexts.modal.pickDelete.title': 'Select a technology context to delete',
  'pages.admin.technologyContexts.modal.pickDelete.description':
    'Choose a current protected technology context to confirm its removal.',
  'pages.admin.technologyContexts.modal.update.title': 'Update technology context',
  'pages.admin.technologyContexts.modal.delete.title': 'Delete technology context',
  'pages.admin.technologyContexts.modal.delete.description':
    'This action permanently removes the selected protected technology context.',
  'pages.admin.technologyContexts.feedback.created':
    'Protected technology context created successfully.',
  'pages.admin.technologyContexts.feedback.updated':
    'Protected technology context updated successfully.',
  'pages.admin.technologyContexts.feedback.deleted':
    'Protected technology context deleted successfully.',
  'pages.admin.technologyContexts.feedback.requiredTechnology':
    'The technology is required before submitting.',
  'pages.admin.technologyContexts.feedback.requiredContext':
    'The context is required before submitting.',
  'pages.admin.technologyContexts.feedback.requiredStartDate':
    'The start date is required before submitting.',
  'pages.admin.technologyContexts.feedback.missingSession':
    'The authenticated admin session is unavailable. Log in again to continue.',
  'pages.admin.technologyContexts.feedback.loadError':
    'The protected technology contexts collection could not be loaded right now.',
  'pages.admin.technologyContexts.feedback.saveError':
    'The protected technology context could not be saved right now.',
  'pages.admin.technologyContexts.feedback.deleteError':
    'The protected technology context could not be deleted right now.',
  'pages.admin.entities.image-assets.description':
    'Normalized media records used by the portfolio through image asset relations instead of direct file fields.',
  'pages.admin.entities.spoken-languages.description':
    'Administrative control of language proficiency entries displayed in the profile and skills contexts.',
  'pages.admin.entities.customers.description':
    'Customer organizations referenced by experience histories and relationship-based storytelling.',
  'pages.admin.entities.jobs.description':
    'Role catalog entries that support consistent job naming and relation mapping across experiences.',
  'pages.admin.entities.formations.description':
    'Academic and professional education records, including their supporting links, images and stack relations.',
  'pages.admin.entities.technologies.description':
    'Core stack catalog with highlight rules, metrics, tags and relationship arrays owned by the technology entity.',
  'pages.admin.entities.technology-contexts.description':
    'The only dedicated relationship entity, used to register contextual usage windows for each technology.',
  'pages.admin.entities.experiences.description':
    'Professional history records with company, role, chronology, customers, projects and stack relationships.',
  'pages.admin.entities.projects.description':
    'Case-study style project entries with environment, status, date range and owned relationship arrays.',
  'pages.admin.experiences.sectionLabel': '// EXPERIENCES',
  'pages.admin.experiences.states.loading': 'Loading protected experiences...',
  'pages.admin.experiences.states.empty': 'No protected experience has been registered yet.',
  'pages.admin.experiences.modal.create.title': 'Create experience',
  'pages.admin.experiences.modal.read.title': 'Read experiences',
  'pages.admin.experiences.modal.pickUpdate.title': 'Select an experience to update',
  'pages.admin.experiences.modal.pickDelete.title': 'Select an experience to delete',
  'pages.admin.experiences.modal.update.title': 'Update experience',
  'pages.admin.experiences.modal.delete.title': 'Delete experience',
  'pages.admin.experiences.modal.read.description':
    'Review the current protected experiences and open update or delete flows directly from each record.',
  'pages.admin.experiences.modal.pickUpdate.description':
    'Choose a current protected experience to open its update form.',
  'pages.admin.experiences.modal.pickDelete.description':
    'Choose a current protected experience to confirm its removal.',
  'pages.admin.experiences.modal.delete.description':
    'This action permanently removes the selected protected experience.',
  'pages.admin.experiences.feedback.loadError':
    'The protected experiences collection could not be loaded right now.',
  'pages.admin.experiences.feedback.saveError':
    'The protected experience could not be saved right now.',
  'pages.admin.experiences.feedback.deleteError':
    'The protected experience could not be deleted right now.',
  'pages.admin.experiences.feedback.created': 'Protected experience created successfully.',
  'pages.admin.experiences.feedback.updated': 'Protected experience updated successfully.',
  'pages.admin.experiences.feedback.deleted': 'Protected experience deleted successfully.',
  'pages.admin.experiences.feedback.requiredCompanyName': 'The company name is required.',
  'pages.admin.experiences.feedback.requiredSummaryPt': 'The Portuguese summary is required.',
  'pages.admin.experiences.feedback.requiredSummaryEn': 'The English summary is required.',
  'pages.admin.experiences.feedback.requiredDescriptionPt':
    'The Portuguese description is required.',
  'pages.admin.experiences.feedback.requiredDescriptionEn': 'The English description is required.',
  'pages.admin.experiences.feedback.requiredStartDate': 'The start date is required.',
  'pages.admin.experiences.fields.slug.placeholder': 'Enter the unique experience slug',
  'pages.admin.experiences.fields.companyName.label': 'Company name',
  'pages.admin.experiences.fields.companyName.placeholder': 'Enter the company name',
  'pages.admin.experiences.fields.titlePt.placeholder': 'Enter the Portuguese role title',
  'pages.admin.experiences.fields.titleEn.placeholder': 'Enter the English role title',
  'pages.admin.experiences.fields.summaryPt.placeholder': 'Enter the Portuguese summary',
  'pages.admin.experiences.fields.summaryEn.placeholder': 'Enter the English summary',
  'pages.admin.experiences.fields.descriptionPt.placeholder': 'Enter the Portuguese description',
  'pages.admin.experiences.fields.descriptionEn.placeholder': 'Enter the English description',

  'pages.admin.experiences.fields.isCurrent.label': 'Current role',
  'pages.admin.experiences.fields.isCurrent.description': 'Mark this experience as current.',
  'pages.admin.experiences.fields.highlight.description':
    'Keep this experience emphasized in the public portfolio.',
  'pages.admin.experiences.fields.technologies.description':
    'Select every technology used in this experience.',
  'pages.admin.experiences.fields.projects.description':
    'Select every project connected to this experience.',
  'pages.admin.experiences.fields.projects.empty': 'No projects are available.',
  'pages.admin.experiences.fields.customers.description':
    'Select every customer connected to this experience.',
  'pages.admin.experiences.fields.customers.empty': 'No customers are available.',
  'pages.admin.experiences.fields.jobs.label': 'Related jobs',
  'pages.admin.experiences.fields.jobs.description':
    'Select every job connected to this experience.',
  'pages.admin.experiences.fields.jobs.empty': 'No jobs are available.',
  'pages.admin.experiences.fields.links.description':
    'Select every supporting link connected to this experience.',

  'pages.admin.experiences.fields.imageAssets.description':
    'Select every image asset connected to this experience.',
  'pages.admin.projects.states.loading': 'Loading protected projects...',
  'pages.admin.projects.states.empty': 'No protected project has been registered yet.',
  'pages.admin.projects.modal.create.title': 'Create project',
  'pages.admin.projects.modal.read.title': 'Read projects',
  'pages.admin.projects.modal.pickUpdate.title': 'Select a project to update',
  'pages.admin.projects.modal.pickDelete.title': 'Select a project to delete',
  'pages.admin.projects.modal.update.title': 'Update project',
  'pages.admin.projects.modal.delete.title': 'Delete project',
  'pages.admin.projects.modal.read.description':
    'Review the current protected projects and open update or delete flows directly from each record.',
  'pages.admin.projects.modal.pickUpdate.description':
    'Choose a current protected project to open its update form.',
  'pages.admin.projects.modal.pickDelete.description':
    'Choose a current protected project to confirm its removal.',
  'pages.admin.projects.modal.delete.description':
    'This action permanently removes the selected protected project.',
  'pages.admin.projects.feedback.loadError':
    'The protected projects collection could not be loaded right now.',
  'pages.admin.projects.feedback.saveError': 'The protected project could not be saved right now.',
  'pages.admin.projects.feedback.deleteError':
    'The protected project could not be deleted right now.',
  'pages.admin.projects.feedback.created': 'Protected project created successfully.',
  'pages.admin.projects.feedback.updated': 'Protected project updated successfully.',
  'pages.admin.projects.feedback.deleted': 'Protected project deleted successfully.',
  'pages.admin.projects.feedback.requiredShortDescriptionPt':
    'The Portuguese short description is required.',
  'pages.admin.projects.feedback.requiredShortDescriptionEn':
    'The English short description is required.',
  'pages.admin.projects.feedback.requiredFullDescriptionPt':
    'The Portuguese full description is required.',
  'pages.admin.projects.feedback.requiredFullDescriptionEn':
    'The English full description is required.',
  'pages.admin.projects.feedback.requiredOptions': 'Select all required project options.',
  'pages.admin.projects.fields.slug.placeholder': 'Enter the unique project slug',
  'pages.admin.projects.fields.titlePt.label': 'Portuguese title',
  'pages.admin.projects.fields.titlePt.placeholder': 'Enter the Portuguese project title',
  'pages.admin.projects.fields.titleEn.label': 'English title',
  'pages.admin.projects.fields.titleEn.placeholder': 'Enter the English project title',
  'pages.admin.projects.fields.shortDescriptionPt.label': 'Portuguese short description',
  'pages.admin.projects.fields.shortDescriptionPt.placeholder':
    'Enter the Portuguese short description',
  'pages.admin.projects.fields.shortDescriptionEn.label': 'English short description',
  'pages.admin.projects.fields.shortDescriptionEn.placeholder':
    'Enter the English short description',
  'pages.admin.projects.fields.fullDescriptionPt.label': 'Portuguese full description',
  'pages.admin.projects.fields.fullDescriptionPt.placeholder':
    'Enter the Portuguese full description',
  'pages.admin.projects.fields.fullDescriptionEn.label': 'English full description',
  'pages.admin.projects.fields.fullDescriptionEn.placeholder': 'Enter the English full description',
  'pages.admin.projects.fields.context.label': 'Context',
  'pages.admin.projects.fields.context.placeholder': 'Select the project context',
  'pages.admin.projects.fields.status.label': 'Status',
  'pages.admin.projects.fields.status.placeholder': 'Select the project status',
  'pages.admin.projects.fields.environment.placeholder': 'Select the project environment',
  'pages.admin.projects.fields.featured.label': 'Featured status',
  'pages.admin.projects.fields.featured.description':
    'Keep this project featured in the public portfolio.',
  'pages.admin.projects.fields.highlight.description':
    'Keep this project emphasized in the public portfolio.',
  'pages.admin.projects.fields.technologies.description':
    'Select every technology used in this project.',
  'pages.admin.projects.fields.experiences.description':
    'Select every experience connected to this project.',
  'pages.admin.projects.fields.experiences.empty': 'No experiences are available.',
  'pages.admin.projects.fields.tags.label': 'Related tags',
  'pages.admin.projects.fields.tags.description': 'Select every tag connected to this project.',
  'pages.admin.projects.fields.tags.empty': 'No tags are available.',
  'pages.admin.projects.fields.links.description':
    'Select every supporting link connected to this project.',

  'pages.admin.projects.fields.imageAssets.description':
    'Select every image asset connected to this project.',
  'pages.admin.projects.fields.status.options.ARCHIVED': 'Archived',
  'pages.admin.projects.fields.status.options.PLANNED': 'Planned',
  'pages.admin.projects.fields.environment.options.FRONTEND': 'Frontend',
  'pages.admin.projects.fields.environment.options.BACKEND': 'Backend',
  'pages.admin.projects.fields.environment.options.MOBILE': 'Mobile',
  'pages.admin.projects.fields.environment.options.DASHBOARD': 'Dashboard',
  'taxonomy.dashboard.source.experience': 'Experience',
  'taxonomy.dashboard.source.project': 'Project',
  'pages.admin.operations.localized.title': 'Title',

  'pages.admin.operations.localized.shortDescription': 'Short description',
  'pages.admin.operations.localized.fullDescription': 'Full description',
  'pages.admin.operations.localized.label': 'Label',
  'pages.admin.operations.localized.alt': 'Alternative text',
  'pages.admin.operations.localized.caption': 'Caption',
  'pages.admin.experiences.fields.titleEs.placeholder': 'Enter the Spanish role title',
  'pages.admin.experiences.fields.descriptionEs.placeholder': 'Enter the Spanish description',
  'pages.admin.experiences.feedback.requiredDescriptionEs': 'The Spanish description is required.',
  'pages.admin.projects.fields.titleEs.placeholder': 'Enter the Spanish project title',
  'pages.admin.projects.fields.shortDescriptionEs.label': 'Spanish short description',
  'pages.admin.projects.fields.shortDescriptionEs.placeholder':
    'Enter the Spanish short description',
  'pages.admin.projects.fields.fullDescriptionEs.label': 'Spanish full description',
  'pages.admin.projects.fields.fullDescriptionEs.placeholder': 'Enter the Spanish full description',
  'pages.admin.projects.feedback.requiredShortDescriptionEs':
    'The Spanish short description is required.',
  'pages.admin.projects.feedback.requiredFullDescriptionEs':
    'The Spanish full description is required.',
  'pages.admin.formations.fields.titleEs.placeholder': 'Enter the Spanish title',
  'pages.admin.spokenLanguages.fields.nameEs.placeholder': 'Enter the language name in Spanish',

  'pages.admin.customers.fields.summaryEs.placeholder': 'Enter the Spanish customer summary',
  'pages.admin.jobs.fields.nameEs.placeholder': 'Enter the job name in Spanish',
  'pages.admin.jobs.fields.summaryEs.placeholder': 'Enter the job summary in Spanish',
  'pages.admin.links.fields.labelEs.label': 'Spanish label',
  'pages.admin.links.fields.labelEs.placeholder': 'Enter the Spanish link label',
  'pages.admin.links.fields.descriptionEs.placeholder': 'Enter the Spanish link description',
  'pages.admin.links.feedback.requiredLabelPt': 'The Portuguese label is required.',
  'pages.admin.links.feedback.requiredLabelEn': 'The English label is required.',
  'pages.admin.links.feedback.requiredLabelEs': 'The Spanish label is required.',
  'pages.admin.imageAssets.fields.altEs.label': 'Spanish alternative text',
  'pages.admin.imageAssets.fields.altEs.placeholder':
    'Describe the asset in Spanish for accessibility',
  'pages.admin.imageAssets.fields.captionEs.label': 'Spanish caption',
  'pages.admin.imageAssets.fields.captionEs.placeholder': 'Enter the Spanish caption',
  'pages.admin.tags.fields.nameEs.placeholder': 'Enter the Spanish tag name',
} as const satisfies AppTranslationLanguage;
