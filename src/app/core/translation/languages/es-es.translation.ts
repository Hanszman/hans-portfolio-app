import { AppTranslationLanguage } from '../translation.types';

export const ES_ES_TRANSLATIONS = {
  'header.brand.home': 'Ir al inicio',
  'header.controls.theme': 'Tema',
  'header.controls.darkTheme': 'Tema oscuro',
  'header.controls.lightTheme': 'Tema claro',
  'header.controls.language': 'Idioma',
  'header.controls.navigation': 'Menú de navegación',
  'header.controls.noLanguages': 'Ningún idioma disponible',
  'footer.social.navigation': 'Links sociales',
  'footer.social.github': 'Abrir perfil de GitHub',
  'footer.social.linkedin': 'Abrir perfil de LinkedIn',
  'footer.social.whatsapp': 'Abrir contacto de WhatsApp',
  'footer.social.email': 'Enviar un correo',
  'footer.copyright.name': 'Victor Hanszman',
  'footer.copyright.year': '© {{ year }}',
  'common.actions.viewDetails': 'Ver detalles',
  'common.actions.close': 'Cerrar',
  'common.actions.save': 'Guardar',
  'common.actions.showMore': 'Mostrar más',
  'common.actions.showLess': 'Mostrar menos',
  'common.search.label': 'Búsqueda',
  'common.search.placeholder': 'Buscar registros',
  'common.pagination.navigation': 'Paginacion',
  'common.pagination.first': 'Primera',
  'common.pagination.previous': 'Anterior',
  'common.pagination.next': 'Siguiente',
  'common.pagination.last': 'Ultima',
  'common.pagination.pageLabel': 'Pagina',
  'common.pagination.page': 'Ir a la pagina {{ page }}',
  'common.entities.projects': 'Proyectos',
  'common.entities.technologies': 'Tecnologías',
  'common.fields.slug': 'Slug',
  'common.fields.sortOrder': 'Orden de visualización',
  'common.empty.linkedCompanies': 'Todavía no hay empresas vinculadas.',
  'common.entities.portfolioSettings': 'Portfolio settings',
  'common.entities.links': 'Enlaces',
  'common.entities.formation': 'Formación',
  'common.fields.startDate': 'Fecha inicial',
  'common.fields.endDate': 'Fecha final',
  'common.fields.stack': 'Stack',
  'common.relations.imageAssets': 'Image assets relacionados',
  'common.relations.experiences': 'Experiences relacionadas',
  'common.relations.customers': 'Clientes relacionados',
  'common.feedback.requiredEnglishSummary': 'El resumen en inglés es obligatorio antes del envío.',
  'common.feedback.requiredPortugueseSummary':
    'El resumen en portugués es obligatorio antes del envío.',
  'common.feedback.invalidSortOrder': 'El orden debe ser un número válido.',
  'common.feedback.missingAdminSessionShort':
    'La sesión administrativa autenticada no está disponible.',
  'common.placeholders.displayOrder': 'Escribe el orden de visualización',
  'common.placeholders.spanishSummary': 'Introduce el resumen en español',
  'common.empty.imageAssets': 'No hay imágenes disponibles.',
  'common.empty.links': 'No hay links disponibles.',
  'common.empty.technologies': 'No hay tecnologías disponibles.',
  'common.empty.formations': 'No hay formaciones disponibles.',
  'common.empty.imageAssetsForRelation':
    'Ningún image asset está disponible para relacionar ahora.',
  'common.empty.experiencesForRelation':
    'Ninguna experiencia pública está disponible para relacionar ahora.',
  'common.empty.unregisteredText': 'Todavía no se registró ningún texto.',
  'common.empty.stackDistribution': 'Todavía no se devolvió ninguna distribución de stack.',
  'common.filters.all': 'Todos',
  'common.states.highlighted': 'Destacado',
  'common.states.notHighlighted': 'Sin destaque',
  'common.location.beloHorizonteBrazil': 'Belo Horizonte, Brasil',
  'common.sections.clients': '// clientes',
  'common.sections.projects': '// proyectos',
  'common.sections.techStack': '// stack_tecnico',
  'common.sections.rolesHeld': '// cargos_ocupados',
  'common.sections.description': '// descripcion',
  'common.states.studying': 'Estudiando',
  'common.entities.home': 'Home',
  'common.entities.skills': 'Habilidades',
  'common.entities.dashboard': 'Panel',
  'common.entities.experiences': 'Experiencias',
  'common.entities.formations': 'Formaciones',
  'common.entities.customers': 'Clientes',
  'common.entities.languages': 'Idiomas',
  'common.entities.tags': 'Tags',
  'common.entities.jobs': 'Jobs',
  'common.entities.technologyContexts': 'Technology contexts',
  'common.languages.english': 'Inglés',
  'common.languages.portuguese': 'Portugués',
  'common.languages.spanish': 'Español',
  'common.values.other': 'Otro',
  'common.entities.imageAssets': 'Imágenes',
  'common.fields.type': 'Tipo',
  'common.fields.name': 'Nombre',
  'common.fields.description': 'Descripción',
  'common.fields.summary': 'Resumen',
  'common.fields.date': 'Fecha',
  'common.fields.code': 'Código',
  'common.fields.url': 'URL',
  'common.fields.category': 'Categoria',
  'common.fields.frequency': 'Frecuencia',
  'common.fields.level': 'Nivel',
  'common.fields.technology': 'Tecnología',
  'common.fields.environment': 'Entorno',
  'common.fields.spanishName': 'Nombre en español',
  'common.fields.spanishTitle': 'Título en español',
  'common.fields.spanishSummary': 'Resumen en español',
  'common.fields.spanishDescription': 'Descripción en español',
  'common.fields.fileName': 'Nombre del archivo',
  'common.fields.filePath': 'Ruta del archivo',
  'common.fields.folder': 'Carpeta',
  'common.fields.kind': 'Tipo',
  'common.fields.mimeType': 'MIME type',
  'common.fields.degreeType': 'Tipo de formación',
  'common.fields.institution': 'Institución',
  'common.fields.settingKey': 'Clave del setting',
  'common.fields.jsonValue': 'Valor JSON',
  'common.fields.proficiency': 'Dominio',
  'common.fields.highlightStatus': 'Estado destacado',
  'common.fields.highlight': 'Destacado',
  'common.fields.totalCompanyPeriod': 'Período total en la empresa:',
  'common.relations.technologies': 'Tecnologías relacionadas',
  'common.relations.formations': 'Formaciones relacionadas',
  'common.relations.links': 'Links relacionados',
  'common.feedback.missingAdminSession':
    'La sesión administrativa autenticada no está disponible. Inicia sesión nuevamente para continuar.',
  'common.feedback.invalidIntegerSortOrder': 'El orden debe ser un número entero válido.',
  'common.feedback.invalidDateRange':
    'La fecha de finalización no puede ser anterior a la fecha de inicio.',
  'common.feedback.requiredStartDate': 'La fecha de inicio es obligatoria antes del envío.',
  'common.feedback.requiredSpanishName': 'El nombre en español es obligatorio.',
  'common.feedback.requiredSlug': 'El slug es obligatorio.',
  'common.feedback.requiredTitlePt': 'El título en portugués es obligatorio.',
  'common.feedback.requiredTitleEn': 'El título en inglés es obligatorio.',
  'common.feedback.requiredTitleEs': 'El título en español es obligatorio.',
  'common.feedback.requiredSummaryEs': 'El resumen en español es obligatorio.',
  'common.placeholders.integerSortOrder': 'Ingresa el orden entero de exhibición',
  'common.empty.projectsForRelation':
    'Ningún proyecto público está disponible para relacionar ahora.',
  'common.empty.technologiesForRelation':
    'Ninguna tecnología pública está disponible para relacionar ahora.',
  'pages.home.hero.availability': 'Disponible para trabajar',
  'pages.home.hero.greeting': 'Hola, soy',
  'pages.home.hero.subtitle': 'Ingeniero de Software Full Stack Sénior',
  'pages.home.hero.description':
    'Ingeniero de software sénior con experiencia en desarrollo Front-End y Back-End. Resido en Belo Horizonte, Minas Gerais, Brasil. Actualmente trabajo de forma remota y estoy abierto a nuevas oportunidades en el desarrollo de software.',
  'pages.home.hero.cta.projects': 'Ver Proyectos',
  'pages.home.hero.cta.experiences': 'Mi Experiencia',
  'pages.home.hero.social.navigation': 'Enlaces sociales',
  'pages.home.metrics.years.label': 'Años de experiencia',
  'pages.home.metrics.years.description':
    'Durante muchos años, hemos estado desarrollando productos web de alta calidad para el mercado.',
  'pages.home.metrics.projects.label': 'Proyectos entregados',
  'pages.home.metrics.projects.description':
    'Experiencia en numerosos proyectos profesionales, personales y académicos.',
  'pages.home.metrics.technologies.description':
    'Ya se han utilizado numerosas herramientas para el desarrollo y los estudios.',
  'pages.home.metrics.ariaLabel': 'Métricas del portfolio',
  'pages.home.loading': 'Conectando datos reales del portfolio...',
  'pages.home.error': 'Los datos reales de la home no están disponibles por ahora.',
  'pages.home.stack.label': '// CORE_STACK',
  'pages.home.stack.title': 'Tecnologías Principales',
  'pages.home.stack.description':
    'Actualmente, estas son las principales tecnologías en las que tengo mayor experiencia y con las que he tenido más práctica a lo largo de mi carrera en el desarrollo de software.',
  'pages.home.stack.moreSkills': 'Ver más habilidades',
  'pages.home.highlightedProjects.label': '// PRINCIPALES_LOGROS',
  'pages.home.highlightedProjects.title': 'Proyectos Destacados',
  'pages.home.highlightedProjects.description':
    'Una selección de proyectos que representan mis trabajos y desafíos técnicos más relevantes.',
  'pages.home.highlightedProjects.moreProjects': 'Ver más proyectos',
  'pages.experiences.sectionLabel': '// CAREER_TIMELINE',
  'pages.experiences.title': 'Experiencia Profesional',
  'pages.experiences.description':
    'Un recorrido cronológico por mi carrera construyendo soluciones de software de impacto.',
  'pages.experiences.timeline.loading': 'Cargando relaciones reales de experiences...',
  'pages.experiences.timeline.error': 'El endpoint de experiences no está disponible ahora.',
  'pages.experiences.timeline.empty':
    'Todavía no se devolvió ningún capítulo publicado de experiencia.',
  'pages.experiences.timeline.emptyCustomers': 'Todavía no hay ningún cliente vinculado.',
  'pages.experiences.timeline.emptyProjects':
    'No se devolvió ningún proyecto relacionado para este capítulo.',

  'pages.experiences.technology.category': 'Categoría',
  'pages.experiences.technology.level': 'Nivel de conocimiento',
  'pages.experiences.technology.frequency': 'Frecuencia de uso',
  'pages.experiences.technology.projects': 'Proyectos usados',
  'pages.experiences.customer.company': 'Empresa relacionada',
  'pages.experiences.customer.projects': 'Proyectos relacionados',
  'pages.skills.sectionLabel': '// SKILLS_ARSENAL',
  'pages.skills.title': 'Habilidades y Tecnologías',
  'pages.skills.description':
    'Una vista completa de mi arsenal técnico, educación y competencias lingüísticas.',
  'pages.skills.filters.level': 'Nivel',
  'pages.skills.education.title': 'Educación',
  'pages.skills.search.placeholder': 'Buscar tecnología...',
  'pages.skills.catalog.loading': 'Construyendo grupos de tecnología...',
  'pages.skills.catalog.error': 'El endpoint de technologies no está disponible ahora.',
  'pages.skills.catalog.empty': 'Ninguna tecnología publicada coincide con los filtros actuales.',
  'pages.skills.detail.totalExperience': 'Experiencia consolidada',
  'pages.skills.detail.technologyContexts': 'Contextos de la tecnología',
  'pages.skills.detail.contextExperience': 'Experiencia por contexto',
  'pages.skills.education.detail.degree': 'Formación',

  'pages.skills.education.detail.gallery': 'Imágenes',
  'pages.skills.languages.detail.proficiency': 'Competencia',
  'pages.projects.detail.emptyGallery': 'No hay imágenes vinculadas',
  'common.time.month': '{{count}} mes',
  'common.time.months': '{{count}} meses',
  'common.time.year': '{{count}} año',
  'common.time.years': '{{count}} años',
  'taxonomy.skills.filters.allCategories': 'Todas las categorías',
  'taxonomy.skills.filters.allLevels': 'Todos los niveles',
  'taxonomy.skills.filters.allContexts': 'Todos los contextos',
  'taxonomy.skills.fallback.uncategorized': 'Sin categoría',
  'taxonomy.skills.fallback.levelNotSet': 'Nivel no informado',
  'taxonomy.skills.fallback.frequencyNotSet': 'Frecuencia no informada',
  'taxonomy.skills.fallback.noDuration': 'Sin período consolidado',
  'taxonomy.skills.fallback.zeroMonths': '0 meses',
  'taxonomy.skills.summary.mapped': 'Tecnologías mapeadas',
  'taxonomy.skills.summary.highlights': 'Destacados',
  'taxonomy.skills.summary.categories': 'Categorías',
  'taxonomy.skills.summary.advanced': 'Stack avanzada',
  'taxonomy.skills.summary.longest': 'Mayor tiempo total',
  'taxonomy.skills.group.description':
    '{{count}} tecnologías con tiempo real consolidado por contexto.',
  'taxonomy.skills.category.framework': 'Framework',
  'taxonomy.skills.category.language': 'Lenguaje',
  'taxonomy.skills.category.library': 'Biblioteca',
  'taxonomy.skills.category.database': 'Base de datos',
  'taxonomy.skills.category.devops': 'DevOps',
  'taxonomy.skills.category.orm': 'ORM',
  'taxonomy.skills.level.advanced': 'Avanzado',
  'taxonomy.skills.level.intermediate': 'Intermedio',
  'taxonomy.skills.level.beginner': 'Principiante',
  'taxonomy.skills.level.basic': 'Basico',

  'taxonomy.skills.stack.frontEnd': 'Front-End',
  'taxonomy.skills.stack.backEnd': 'Back-End',
  'taxonomy.skills.stack.databases': 'Bases de datos',
  'taxonomy.skills.stack.games': 'Games',
  'taxonomy.skills.stack.mobile': 'Mobile',
  'taxonomy.skills.stack.others': 'Otros',
  'taxonomy.skills.type.programmingLanguages': 'Lenguajes de programación',
  'taxonomy.skills.type.webLanguages': 'Lenguajes web',
  'taxonomy.skills.type.libraries': 'Bibliotecas',
  'taxonomy.skills.type.frameworks': 'Frameworks',
  'taxonomy.skills.type.relationalDataBases': 'Bases de datos relacionales',
  'taxonomy.skills.type.nonRelationalDataBases': 'Bases de datos no relacionales',
  'taxonomy.skills.type.databasesManagementSystems': 'Sistemas de gestión de bases de datos',
  'taxonomy.skills.type.codeEditors': 'Editores de código',
  'taxonomy.skills.type.techniques': 'Técnicas',
  'taxonomy.skills.type.methodologies': 'Metodologías',
  'taxonomy.skills.type.objectNotations': 'Notaciones de objeto',
  'taxonomy.skills.type.packageManagers': 'Gestores de paquetes',
  'taxonomy.skills.type.packages': 'Paquetes',
  'taxonomy.skills.type.versioningPlatforms': 'Plataformas de versionado',
  'taxonomy.skills.type.cloudHostingPlatforms': 'Plataformas de alojamiento en la nube',
  'taxonomy.skills.type.deploymentTools': 'Herramientas de deploy',
  'taxonomy.skills.type.developmentPlatforms': 'Plataformas de desarrollo',
  'taxonomy.skills.type.protocols': 'Protocolos',
  'taxonomy.skills.frequency.frequent': 'Frecuente',
  'taxonomy.skills.frequency.occasional': 'Ocasional',
  'taxonomy.skills.frequency.rare': 'Rara',
  'taxonomy.skills.frequency.previouslyUsed': 'Usado anteriormente',
  'taxonomy.skills.context.professional': 'Profesional',
  'taxonomy.skills.context.personal': 'Personal',
  'taxonomy.skills.context.academic': 'Académico',
  'taxonomy.skills.context.study': 'Estudio',
  'taxonomy.experiences.projectStatus.completed': 'Completado',
  'taxonomy.experiences.projectStatus.inProgress': 'En progreso',

  'taxonomy.experiences.projectEnvironment.fullstack': 'Full stack',
  'taxonomy.experiences.present': 'Actual',
  'pages.projects.sectionLabel': '// PROJECTS_SHOWCASE',
  'pages.projects.description':
    'Una colección de aplicaciones reales, profesionales, trabajos académicos y experimentos personales.',
  'pages.projects.filters.label': 'Filtros de casos',
  'pages.projects.search.placeholder': 'Buscar proyectos...',
  'pages.projects.catalog.loading': 'Construyendo los casos de proyecto...',
  'pages.projects.catalog.error': 'El endpoint de projects no está disponible ahora.',
  'pages.projects.catalog.empty': 'Ningún proyecto publicado coincide con los filtros actuales.',

  'pages.projects.card.links': 'Links y referencias',
  'pages.projects.detail.gallery': 'Galería ampliada',
  'taxonomy.projects.filters.allEnvironments': 'Todos los entornos',
  'taxonomy.projects.filters.allStatuses': 'Todos los estados',
  'taxonomy.projects.sort.featured': 'Destacados primero',
  'taxonomy.projects.sort.recent': 'Inicio más reciente',
  'taxonomy.projects.sort.stack': 'Stack más amplia',
  'taxonomy.projects.sort.links': 'Más assets vinculados',
  'taxonomy.projects.linkType.github': 'GitHub',
  'taxonomy.projects.linkType.deploy': 'Deploy',
  'taxonomy.projects.linkType.sourceCode': 'Código fuente',
  'taxonomy.projects.summary.total': 'Casos publicados',
  'taxonomy.projects.summary.featured': 'Destacados',
  'taxonomy.projects.summary.linkedAssets': 'Assets vinculados',
  'taxonomy.projects.summary.richestStack': 'Stack más amplia',
  'taxonomy.projects.fallback.noAssets': 'Todavía no se publicó ningún asset visual vinculado.',
  'taxonomy.projects.fallback.noLinks': 'Todavía no se vinculó ningún link publicado.',
  'taxonomy.projects.fallback.untitledLink': 'Link sin título',
  'pages.dashboard.sectionLabel': '// DASHBOARD',
  'pages.dashboard.title': 'Panel Analítico',
  'pages.dashboard.description':
    'Análisis agregado de todas las áreas profesionales, herramientas y proyectos, presentado en un panel de control con gráficos informativos.',
  'pages.dashboard.snapshot.loading': 'Cargando agregados del dashboard...',
  'pages.dashboard.snapshot.error':
    'Los endpoints agregados del dashboard no están disponibles ahora.',
  'pages.dashboard.snapshot.metrics.formations': 'Formaciones / idiomas',
  'pages.dashboard.snapshot.metrics.jobs': 'Cargos',
  'pages.dashboard.stacks.label': 'Distribución de stack',
  'pages.dashboard.stacks.title': 'Dónde el portfolio carga hoy más peso técnico',
  'pages.dashboard.stacks.description':
    'Cada área combina proyectos relacionados y tecnologías mapeadas para dejar claras las zonas más fuertes al instante.',
  'pages.dashboard.distribution.label': 'Huella de proyectos',
  'pages.dashboard.distribution.title': 'Contexto de entrega, ambientes y densidad de destaque',
  'pages.dashboard.distribution.description':
    'Este bloque separa volumen destacado, contexto y ambiente para que el catálogo de proyectos sea más legible.',
  'pages.dashboard.distribution.empty':
    'Todavía no se devolvió ningún dato de distribución de proyectos.',
  'pages.dashboard.distribution.environments': 'Ambientes',
  'pages.dashboard.technology.label': 'Uso de tecnología',
  'pages.dashboard.technology.title': 'Señales de uso de stack',
  'pages.dashboard.technology.description':
    'Las tecnologías líderes y sus patrones de frecuencia, contexto y origen salen directo de las relaciones agregadas de la API.',
  'pages.dashboard.technology.empty':
    'Todavía no se devolvió ningún agregado de uso de tecnología.',
  'pages.dashboard.technology.levels': 'Niveles',
  'pages.dashboard.technology.frequencies': 'Frecuencias',
  'pages.dashboard.technology.contexts': 'Contextos',
  'pages.dashboard.technology.sources': 'Orígenes',
  'pages.dashboard.technology.links': 'señales vinculadas',
  'pages.dashboard.projectsByType.label': 'Proyectos por tipo de tecnología',
  'pages.dashboard.projectsByType.title': 'Proyectos por tipo de tecnologías',
  'pages.dashboard.projectsByType.description':
    'El gráfico final mantiene vivo el patrón del dashboard antiguo al agrupar los proyectos publicados por la familia de tecnología que realmente usan.',
  'pages.dashboard.projectsByType.empty':
    'Todavía no se devolvió ninguna distribución de tecnologías por proyecto.',
  'pages.dashboard.projectsByType.selectLabel': 'Tipo de tecnología',
  'pages.login.sectionLabel': '// ACCESO_ADMIN',
  'pages.login.title': 'Acceso administrativo',
  'pages.login.description':
    'Una ruta protegida y no pública para gestionar el portfolio a través del flujo autenticado de admin.',
  'pages.login.security.title': 'Ruta protegida',
  'pages.login.security.description':
    'Usa la cuenta admin existente en la API para desbloquear los próximos pasos administrativos del portfolio.',
  'pages.login.form.title': 'Autenticar sesión administrativa',
  'pages.login.form.description':
    'Este login permanece intencionalmente oculto de la navegación pública y solo está disponible por URL directa.',
  'pages.login.form.emailLabel': 'Correo administrativo',
  'pages.login.form.emailPlaceholder': 'Ingresa tu correo',
  'pages.login.form.passwordLabel': 'Contraseña administrativa',
  'pages.login.form.passwordPlaceholder': 'Ingresa tu contraseña',
  'pages.login.form.passwordVisibility.show': 'Mostrar contraseña',
  'pages.login.form.passwordVisibility.hide': 'Ocultar contraseña',
  'pages.login.form.submit': 'Entrar',
  'pages.login.feedback.invalidCredentials':
    'Las credenciales administrativas son inválidas o la sesión no pudo iniciarse.',
  'pages.admin.shell.eyebrow': '// ADMIN_WORKSPACE',
  'pages.admin.shell.title': 'Workspace administrativo',
  'pages.admin.shell.description':
    'Shell operativa protegida para los flujos finales de la F8, ya alineada con ruta oculta, sesión autenticada y roadmap de entidades.',
  'pages.admin.shell.actions.logout': 'Cerrar sesión',
  'pages.admin.shell.session.kicker': 'Sesión autenticada',
  'pages.admin.shell.registry.kicker': 'Registro de entidades',
  'pages.admin.shell.registry.title': '{{count}} flujos de entidad',
  'pages.admin.shell.registry.description':
    'La shell administrativa ahora centraliza todos los dominios protegidos planificados para los próximos subpasos CRUD.',
  'pages.admin.facts.route.title': 'Ruta oculta confirmada',
  'pages.admin.facts.route.description':
    'El menú público sigue intacto mientras /admin permanece disponible solo por URL directa y por el guard.',
  'pages.admin.facts.validation.title': 'Validación de sesión activa',
  'pages.admin.facts.validation.description':
    'Cada entrada protegida todavía depende de un bearer token válido y de confirmación del servidor vía GET /admin/session.',
  'pages.admin.facts.storage.title': 'Persistencia acotada',
  'pages.admin.facts.storage.description':
    'La sesión administrativa actual continúa aislada en sessionStorage para evitar accesos prolongados sin necesidad.',
  'pages.admin.entitiesSection.eyebrow': '// PROXIMOS_SUBPASOS',
  'pages.admin.entitiesSection.title': 'Roadmap de entidades protegidas',
  'pages.admin.entitiesSection.description':
    'Cada tarjeta abajo marca el orden oficial de la F8, su familia de endpoint protegido y las acciones de create, update y delete que se habilitarán en las próximas entregas.',
  'pages.admin.operations.create': 'Crear',
  'pages.admin.operations.read': 'Leer',
  'pages.admin.operations.update': 'Editar',
  'pages.admin.operations.delete': 'Eliminar',
  'pages.admin.operations.yes': 'Sí',
  'pages.admin.operations.no': 'No',
  'pages.admin.operations.emptyRelations': 'No hay registros relacionados vinculados.',
  'pages.admin.relationMode.owner': 'Relaciones de la entidad dueña',
  'pages.admin.relationMode.dedicated': 'Entidad relacional dedicada',
  'pages.admin.entities.portfolio-settings.description':
    'Configuración global, destacados y ajustes estructurados que conducen la shell del portfolio.',
  'pages.admin.portfolioSettings.sectionLabel': '// PORTFOLIO_SETTINGS',
  'pages.admin.portfolioSettings.description':
    'CRUD protegido y real para los ajustes en JSON que moldean la shell, los destacados y los contenidos estructurados.',
  'pages.admin.portfolioSettings.states.loading':
    'Cargando la colección protegida de portfolio settings...',
  'pages.admin.portfolioSettings.states.empty':
    'Todavía no se registró ningún portfolio setting protegido.',

  'pages.admin.portfolioSettings.card.emptyDescription':
    'Todavía no se registró una descripción para este setting.',

  'pages.admin.portfolioSettings.fields.key.placeholder': 'Ingresa la clave única del setting',
  'pages.admin.portfolioSettings.fields.description.placeholder':
    'Describe la responsabilidad de este setting',
  'pages.admin.portfolioSettings.fields.value.placeholder':
    'Ingresa un objeto, array o valor escalar JSON válido',
  'pages.admin.portfolioSettings.modal.create.title': 'Crear portfolio setting',
  'pages.admin.portfolioSettings.modal.read.title': 'Leer configuraciones del portfolio',
  'pages.admin.portfolioSettings.modal.read.description':
    'Revise las configuraciones JSON protegidas actuales y acceda directamente a los flujos de edicion o eliminacion desde cada registro.',
  'pages.admin.portfolioSettings.modal.pickUpdate.title': 'Selecciona un setting para editar',
  'pages.admin.portfolioSettings.modal.pickUpdate.description':
    'Elige uno de los settings protegidos actuales para abrir su formulario de edición.',
  'pages.admin.portfolioSettings.modal.pickDelete.title': 'Selecciona un setting para eliminar',
  'pages.admin.portfolioSettings.modal.pickDelete.description':
    'Elige uno de los settings protegidos actuales para confirmar su eliminación.',
  'pages.admin.portfolioSettings.modal.update.title': 'Editar portfolio setting',
  'pages.admin.portfolioSettings.modal.delete.title': 'Eliminar portfolio setting',
  'pages.admin.portfolioSettings.modal.delete.description':
    'Esta acción elimina permanentemente el setting protegido seleccionado de la configuración del portfolio.',
  'pages.admin.portfolioSettings.feedback.created': 'Portfolio setting creado con éxito.',
  'pages.admin.portfolioSettings.feedback.updated': 'Portfolio setting actualizado con éxito.',
  'pages.admin.portfolioSettings.feedback.deleted': 'Portfolio setting eliminado con éxito.',
  'pages.admin.portfolioSettings.feedback.requiredKey':
    'La clave del setting es obligatoria antes de enviar.',
  'pages.admin.portfolioSettings.feedback.invalidJson':
    'El valor JSON es inválido. Revisa la estructura antes de enviar.',
  'pages.admin.portfolioSettings.feedback.selectionRequired':
    'Selecciona un portfolio setting antes de continuar con esta acción.',
  'pages.admin.portfolioSettings.feedback.loadError':
    'La colección protegida de portfolio settings no puede cargarse ahora.',
  'pages.admin.portfolioSettings.feedback.saveError':
    'El portfolio setting no puede guardarse ahora.',
  'pages.admin.portfolioSettings.feedback.deleteError':
    'El portfolio setting no puede eliminarse ahora.',
  'pages.admin.entities.tags.description':
    'Etiquetas reutilizables de clasificación compartidas entre proyectos, tecnologías y futuros flujos editoriales.',
  'pages.admin.tags.sectionLabel': '// TAGS',
  'pages.admin.tags.description':
    'CRUD protegido para etiquetas reutilizables que clasifican proyectos y tecnologías mediante arrays relacionales mantenidos por la propia tag.',
  'pages.admin.tags.states.loading': 'Cargando la colección protegida de tags...',
  'pages.admin.tags.states.empty': 'Todavía no se registró ninguna tag protegida.',
  'pages.admin.tags.card.emptyRelations':
    'Ningún registro relacionado está vinculado actualmente a esta tag.',
  'pages.admin.tags.fields.slug.placeholder': 'Ingresa el slug único de la tag',
  'pages.admin.tags.fields.namePt.label': 'Nombre en portugués',
  'pages.admin.tags.fields.namePt.placeholder': 'Ingresa el nombre de la tag en portugués',
  'pages.admin.tags.fields.nameEn.label': 'Nombre en inglés',
  'pages.admin.tags.fields.nameEn.placeholder': 'Ingresa el nombre de la tag en inglés',
  'pages.admin.tags.fields.type.empty': 'No hay tipos de tag disponibles en este momento.',
  'pages.admin.tags.fields.type.options.DOMAIN': 'Dominio',
  'pages.admin.tags.fields.type.options.PLATFORM': 'Plataforma',
  'pages.admin.tags.fields.type.options.METHODOLOGY': 'Metodologia',
  'pages.admin.tags.fields.type.options.INDUSTRY': 'Industria',
  'pages.admin.tags.fields.sortOrder.placeholder': 'Ingresa el orden entero de la tag',
  'pages.admin.tags.fields.projects.description':
    'Selecciona todos los proyectos que deben exponer esta tag en sus relaciones públicas.',
  'pages.admin.tags.fields.technologies.description':
    'Selecciona todas las tecnologías que deben mantener esta tag en sus arrays relacionales.',
  'pages.admin.tags.modal.create.title': 'Crear tag',
  'pages.admin.tags.modal.read.title': 'Leer tags',
  'pages.admin.tags.modal.read.description':
    'Revise las tags protegidas actuales y abra directamente los flujos de edicion o eliminacion desde cada registro.',
  'pages.admin.tags.modal.pickUpdate.title': 'Selecciona una tag para editar',
  'pages.admin.tags.modal.pickUpdate.description':
    'Elige una de las tags protegidas actuales para abrir su formulario de edición.',
  'pages.admin.tags.modal.pickDelete.title': 'Selecciona una tag para eliminar',
  'pages.admin.tags.modal.pickDelete.description':
    'Elige una de las tags protegidas actuales para confirmar su eliminación.',
  'pages.admin.tags.modal.update.title': 'Editar tag',
  'pages.admin.tags.modal.delete.title': 'Eliminar tag',
  'pages.admin.tags.modal.delete.description':
    'Esta acción elimina permanentemente la tag protegida seleccionada y sus relaciones actuales del portfolio.',
  'pages.admin.tags.feedback.created': 'Tag protegida creada con éxito.',
  'pages.admin.tags.feedback.updated': 'Tag protegida actualizada con éxito.',
  'pages.admin.tags.feedback.deleted': 'Tag protegida eliminada con éxito.',
  'pages.admin.tags.feedback.requiredSlug': 'El slug de la tag es obligatorio antes de enviar.',
  'pages.admin.tags.feedback.requiredNamePt':
    'El nombre de la tag en portugués es obligatorio antes de enviar.',
  'pages.admin.tags.feedback.requiredNameEn':
    'El nombre de la tag en inglés es obligatorio antes de enviar.',
  'pages.admin.tags.feedback.requiredType': 'El tipo de la tag es obligatorio antes de enviar.',
  'pages.admin.tags.feedback.invalidType':
    'Seleccione uno de los tipos de tag compatibles antes de enviar.',

  'pages.admin.tags.feedback.selectionRequired':
    'Selecciona una tag protegida antes de continuar con esta acción.',
  'pages.admin.tags.feedback.loadError': 'La colección protegida de tags no puede cargarse ahora.',
  'pages.admin.tags.feedback.saveError': 'La tag protegida no puede guardarse ahora.',
  'pages.admin.tags.feedback.deleteError': 'La tag protegida no puede eliminarse ahora.',
  'pages.admin.entities.links.description':
    'Referencias externas como repositorios, demos, documentos y destinos complementarios de navegación.',
  'pages.admin.links.sectionLabel': '// LINKS',
  'pages.admin.links.description':
    'CRUD protegido para referencias externas reutilizables conectadas a proyectos, experiencias, tecnologías y futuros registros de formación mediante arrays relacionales propios.',
  'pages.admin.links.states.loading': 'Cargando la colección protegida de links...',
  'pages.admin.links.states.empty': 'Todavía no se registró ningún link protegido.',

  'pages.admin.links.card.emptyRelations':
    'Ningún registro relacionado está vinculado actualmente a este link.',
  'pages.admin.links.fields.url.placeholder': 'Ingresa la URL pública del link',
  'pages.admin.links.fields.labelPt.label': 'Etiqueta en portugués',
  'pages.admin.links.fields.labelPt.placeholder':
    'Ingresa la etiqueta en portugués mostrada al visitante',
  'pages.admin.links.fields.labelEn.label': 'Etiqueta en inglés',
  'pages.admin.links.fields.labelEn.placeholder':
    'Ingresa la etiqueta en inglés mostrada al visitante',
  'pages.admin.links.fields.descriptionPt.label': 'Descripción en portugués',
  'pages.admin.links.fields.descriptionPt.placeholder': 'Describe este link en portugués',
  'pages.admin.links.fields.descriptionEn.label': 'Descripción en inglés',
  'pages.admin.links.fields.descriptionEn.placeholder': 'Describe este link en inglés',
  'pages.admin.links.fields.type.empty': 'No hay tipos de link disponibles en este momento.',

  'pages.admin.links.fields.type.options.NPM': 'npm',
  'pages.admin.links.fields.type.options.DOCS': 'Documentacion',
  'pages.admin.links.fields.type.options.LINKEDIN': 'LinkedIn',
  'pages.admin.links.fields.type.options.WEBSITE': 'Sitio web',
  'pages.admin.links.fields.type.options.ARTICLE': 'Articulo',
  'pages.admin.links.fields.type.options.FIGMA': 'Figma',
  'pages.admin.links.fields.sortOrder.placeholder': 'Ingresa el orden entero del link',
  'pages.admin.links.fields.projects.description':
    'Selecciona todos los proyectos que deben exponer este link en sus referencias públicas.',
  'pages.admin.links.fields.experiences.label': 'Experiencias relacionadas',
  'pages.admin.links.fields.experiences.description':
    'Selecciona todas las experiencias que deben mantener este link en sus arrays relacionales.',
  'pages.admin.links.fields.technologies.description':
    'Selecciona todas las tecnologías que deben exponer este link en futuros contextos públicos.',
  'pages.admin.links.fields.formations.description':
    'Selecciona todas las formaciones que deben exponer este enlace.',
  'pages.admin.links.fields.formations.empty':
    'No hay ninguna formación disponible para relacionar en este momento.',
  'pages.admin.links.modal.create.title': 'Crear link',
  'pages.admin.links.modal.read.title': 'Leer links',
  'pages.admin.links.modal.read.description':
    'Revise los links protegidos actuales y abra directamente los flujos de edición o eliminación desde cada registro.',
  'pages.admin.links.modal.pickUpdate.title': 'Selecciona un link para editar',
  'pages.admin.links.modal.pickUpdate.description':
    'Elige uno de los links protegidos actuales para abrir su formulario de edición.',
  'pages.admin.links.modal.pickDelete.title': 'Selecciona un link para eliminar',
  'pages.admin.links.modal.pickDelete.description':
    'Elige uno de los links protegidos actuales para confirmar su eliminación.',
  'pages.admin.links.modal.update.title': 'Editar link',
  'pages.admin.links.modal.delete.title': 'Eliminar link',
  'pages.admin.links.modal.delete.description':
    'Esta acción elimina permanentemente el link protegido seleccionado del portfolio.',
  'pages.admin.links.feedback.created': 'Link protegido creado con éxito.',
  'pages.admin.links.feedback.updated': 'Link protegido actualizado con éxito.',
  'pages.admin.links.feedback.deleted': 'Link protegido eliminado con éxito.',
  'pages.admin.links.feedback.requiredUrl': 'La URL del link es obligatoria antes de enviar.',
  'pages.admin.links.feedback.requiredType': 'El tipo del link es obligatorio antes de enviar.',
  'pages.admin.links.feedback.invalidType':
    'Seleccione uno de los tipos de link compatibles antes de enviar.',

  'pages.admin.links.feedback.selectionRequired':
    'Selecciona un link protegido antes de continuar con esta acción.',
  'pages.admin.links.feedback.loadError':
    'La colección protegida de links no puede cargarse ahora.',
  'pages.admin.links.feedback.saveError': 'El link protegido no puede guardarse ahora.',
  'pages.admin.links.feedback.deleteError': 'El link protegido no puede eliminarse ahora.',
  'pages.admin.imageAssets.sectionLabel': '// IMAGE_ASSETS',
  'pages.admin.imageAssets.description':
    'CRUD protegido para archivos multimedia normalizados conectados a proyectos, experiencias y tecnologías mediante arreglos relacionales propios.',
  'pages.admin.imageAssets.states.loading': 'Cargando la colección protegida de image assets...',
  'pages.admin.imageAssets.states.empty': 'Todavía no se registró ningún image asset protegido.',
  'pages.admin.imageAssets.card.dimensions': 'Dimensiones',
  'pages.admin.imageAssets.card.spokenLanguages': 'Idiomas',
  'pages.admin.imageAssets.card.jobs': 'Cargos',
  'pages.admin.imageAssets.card.emptyRelations':
    'Ningún registro relacionado está vinculado a este image asset en este momento.',
  'pages.admin.imageAssets.fields.fileName.placeholder':
    'Ingresa el nombre único del archivo del asset',
  'pages.admin.imageAssets.fields.filePath.placeholder':
    'Ingresa la ruta pública del archivo usada por el portfolio',
  'pages.admin.imageAssets.fields.folder.placeholder': 'Ingresa la carpeta del asset',
  'pages.admin.imageAssets.fields.kind.empty': 'No hay tipos de image asset disponibles ahora.',
  'pages.admin.imageAssets.fields.kind.options.ICON': 'Icono',
  'pages.admin.imageAssets.fields.kind.options.SCREENSHOT': 'Captura de pantalla',
  'pages.admin.imageAssets.fields.altPt.label': 'Alt en portugués',
  'pages.admin.imageAssets.fields.altPt.placeholder':
    'Describe el asset en portugués para accesibilidad',
  'pages.admin.imageAssets.fields.altEn.label': 'Alt en inglés',
  'pages.admin.imageAssets.fields.altEn.placeholder':
    'Describe el asset en inglés para accesibilidad',
  'pages.admin.imageAssets.fields.captionPt.label': 'Leyenda en portugués',
  'pages.admin.imageAssets.fields.captionPt.placeholder':
    'Ingresa la leyenda en portugués mostrada con este asset',
  'pages.admin.imageAssets.fields.captionEn.label': 'Leyenda en inglés',
  'pages.admin.imageAssets.fields.captionEn.placeholder':
    'Ingresa la leyenda en inglés mostrada con este asset',
  'pages.admin.imageAssets.fields.mimeType.placeholder': 'Ingresa el MIME type del asset',
  'pages.admin.imageAssets.fields.width.label': 'Ancho',
  'pages.admin.imageAssets.fields.width.placeholder': 'Ingresa el ancho del asset en píxeles',
  'pages.admin.imageAssets.fields.height.label': 'Altura',
  'pages.admin.imageAssets.fields.height.placeholder': 'Ingresa la altura del asset en píxeles',
  'pages.admin.imageAssets.fields.projects.description':
    'Selecciona todos los proyectos que deben exponer este archivo multimedia en su galería pública.',
  'pages.admin.imageAssets.fields.experiences.description':
    'Selecciona todas las experiencias que deben mantener este archivo multimedia en sus arreglos relacionales.',
  'pages.admin.imageAssets.fields.technologies.description':
    'Selecciona todas las tecnologías que deben exponer este archivo multimedia en sus referencias públicas.',
  'pages.admin.imageAssets.fields.formations.description':
    'Selecciona todas las formaciones vinculadas a esta imagen.',
  'pages.admin.imageAssets.fields.spokenLanguages.label': 'Idiomas relacionados',
  'pages.admin.imageAssets.fields.spokenLanguages.description':
    'Selecciona todos los idiomas vinculados a esta imagen.',
  'pages.admin.imageAssets.fields.spokenLanguages.empty': 'No hay idiomas disponibles.',
  'pages.admin.imageAssets.fields.customers.description':
    'Selecciona todos los clientes vinculados a esta imagen.',
  'pages.admin.imageAssets.fields.customers.empty': 'No hay clientes disponibles.',
  'pages.admin.imageAssets.fields.jobs.label': 'Puestos relacionados',
  'pages.admin.imageAssets.fields.jobs.description':
    'Selecciona todos los puestos vinculados a esta imagen.',
  'pages.admin.imageAssets.fields.jobs.empty': 'No hay puestos disponibles.',
  'pages.admin.imageAssets.modal.create.title': 'Crear image asset',
  'pages.admin.imageAssets.modal.read.title': 'Leer image assets',
  'pages.admin.imageAssets.modal.read.description':
    'Revisa los image assets protegidos actuales y abre flujos de edición o eliminación directamente desde cada registro.',
  'pages.admin.imageAssets.modal.pickUpdate.title': 'Selecciona un image asset para editar',
  'pages.admin.imageAssets.modal.pickUpdate.description':
    'Elige uno de los image assets protegidos actuales para abrir su formulario de edición.',
  'pages.admin.imageAssets.modal.pickDelete.title': 'Selecciona un image asset para eliminar',
  'pages.admin.imageAssets.modal.pickDelete.description':
    'Elige uno de los image assets protegidos actuales para confirmar su eliminación.',
  'pages.admin.imageAssets.modal.update.title': 'Editar image asset',
  'pages.admin.imageAssets.modal.delete.title': 'Eliminar image asset',
  'pages.admin.imageAssets.modal.delete.description':
    'Esta acción elimina permanentemente el image asset protegido seleccionado del portfolio.',
  'pages.admin.imageAssets.feedback.created': 'Image asset protegido creado con éxito.',
  'pages.admin.imageAssets.feedback.updated': 'Image asset protegido actualizado con éxito.',
  'pages.admin.imageAssets.feedback.deleted': 'Image asset protegido eliminado con éxito.',
  'pages.admin.imageAssets.feedback.requiredFileName':
    'El nombre del archivo es obligatorio antes de enviar.',
  'pages.admin.imageAssets.feedback.requiredFilePath':
    'La ruta del archivo es obligatoria antes de enviar.',
  'pages.admin.imageAssets.feedback.requiredFolder': 'La carpeta es obligatoria antes de enviar.',
  'pages.admin.imageAssets.feedback.requiredKind':
    'El tipo del image asset es obligatorio antes de enviar.',
  'pages.admin.imageAssets.feedback.invalidKind':
    'Selecciona uno de los tipos de image asset compatibles antes de enviar.',
  'pages.admin.imageAssets.feedback.requiredMimeType':
    'El MIME type es obligatorio antes de enviar.',
  'pages.admin.imageAssets.feedback.invalidDimensions':
    'El ancho y la altura deben ser números enteros válidos cuando se informen.',
  'pages.admin.imageAssets.feedback.selectionRequired':
    'Selecciona un image asset protegido antes de continuar con esta acción.',
  'pages.admin.imageAssets.feedback.loadError':
    'La colección protegida de image assets no puede cargarse ahora.',
  'pages.admin.imageAssets.feedback.saveError':
    'El image asset protegido no puede guardarse ahora.',
  'pages.admin.imageAssets.feedback.deleteError':
    'El image asset protegido no puede eliminarse ahora.',
  'pages.admin.spokenLanguages.sectionLabel': '// SPOKEN_LANGUAGES',
  'pages.admin.spokenLanguages.description':
    'CRUD protegido para los registros de dominio de idiomas mostrados en el perfil y en los flujos de skills del portfolio.',
  'pages.admin.spokenLanguages.states.loading': 'Cargando la colección protegida de idiomas...',
  'pages.admin.spokenLanguages.states.empty':
    'Todavía no se ha registrado ningún idioma protegido.',
  'pages.admin.spokenLanguages.card.emptyRelations':
    'Ningún image asset relacionado está vinculado a esta entrada de idioma.',
  'pages.admin.spokenLanguages.fields.code.placeholder': 'Ingresa el código del idioma',
  'pages.admin.spokenLanguages.fields.namePt.placeholder':
    'Ingresa el nombre del idioma en portugués',
  'pages.admin.spokenLanguages.fields.nameEn.placeholder': 'Ingresa el nombre del idioma en inglés',
  'pages.admin.spokenLanguages.fields.proficiency.empty':
    'Ninguna opción de dominio está disponible en este momento.',
  'pages.admin.spokenLanguages.fields.proficiency.options.NATIVE': 'Nativo',
  'pages.admin.spokenLanguages.fields.proficiency.options.FLUENT': 'Fluido',
  'pages.admin.spokenLanguages.fields.highlight.description':
    'Controla si este idioma debe seguir destacado en el portfolio público.',
  'pages.admin.spokenLanguages.fields.imageAssets.description':
    'Selecciona todos los image assets que deben representar visualmente este idioma en el portfolio público.',
  'pages.admin.spokenLanguages.fields.imageAssets.empty':
    'Ningún image asset público está disponible para relacionar ahora.',
  'pages.admin.spokenLanguages.modal.create.title': 'Crear spoken language',
  'pages.admin.spokenLanguages.modal.read.title': 'Leer spoken languages',
  'pages.admin.spokenLanguages.modal.read.description':
    'Revisa los spoken languages protegidos actuales y abre flujos de edición o eliminación directamente desde cada registro.',
  'pages.admin.spokenLanguages.modal.pickUpdate.title': 'Selecciona un spoken language para editar',
  'pages.admin.spokenLanguages.modal.pickUpdate.description':
    'Elige uno de los spoken languages protegidos actuales para abrir su formulario de edición.',
  'pages.admin.spokenLanguages.modal.pickDelete.title':
    'Selecciona un spoken language para eliminar',
  'pages.admin.spokenLanguages.modal.pickDelete.description':
    'Elige uno de los spoken languages protegidos actuales para confirmar su eliminación.',
  'pages.admin.spokenLanguages.modal.update.title': 'Editar spoken language',
  'pages.admin.spokenLanguages.modal.delete.title': 'Eliminar spoken language',
  'pages.admin.spokenLanguages.modal.delete.description':
    'Esta acción elimina permanentemente la entrada de idioma protegida seleccionada del portfolio.',
  'pages.admin.spokenLanguages.feedback.created': 'Spoken language protegido creado con éxito.',
  'pages.admin.spokenLanguages.feedback.updated':
    'Spoken language protegido actualizado con éxito.',
  'pages.admin.spokenLanguages.feedback.deleted': 'Spoken language protegido eliminado con éxito.',
  'pages.admin.spokenLanguages.feedback.requiredCode':
    'El código del idioma es obligatorio antes de enviar.',
  'pages.admin.spokenLanguages.feedback.requiredNamePt':
    'El nombre del idioma en portugués es obligatorio antes de enviar.',
  'pages.admin.spokenLanguages.feedback.requiredNameEn':
    'El nombre del idioma en inglés es obligatorio antes de enviar.',
  'pages.admin.spokenLanguages.feedback.requiredProficiency':
    'El dominio del idioma es obligatorio antes de enviar.',
  'pages.admin.spokenLanguages.feedback.invalidProficiency':
    'Selecciona uno de los niveles de dominio compatibles antes de enviar.',
  'pages.admin.spokenLanguages.feedback.selectionRequired':
    'Selecciona un spoken language protegido antes de continuar con esta acción.',
  'pages.admin.spokenLanguages.feedback.loadError':
    'La colección protegida de spoken languages no puede cargarse ahora.',
  'pages.admin.spokenLanguages.feedback.saveError':
    'El spoken language protegido no puede guardarse ahora.',
  'pages.admin.spokenLanguages.feedback.deleteError':
    'El spoken language protegido no puede eliminarse ahora.',
  'pages.admin.customers.sectionLabel': '// CUSTOMERS',
  'pages.admin.customers.description':
    'CRUD protegido para los registros de clientes conectados a experiencias y relaciones de medios del portfolio.',
  'pages.admin.customers.states.loading': 'Cargando la colección protegida de customers...',
  'pages.admin.customers.states.empty': 'Todavía no se ha registrado ningún customer protegido.',
  'pages.admin.customers.card.emptyRelations':
    'Ningún registro relacionado está conectado a este customer.',
  'pages.admin.customers.fields.slug.placeholder': 'Ingresa el slug único del customer',
  'pages.admin.customers.fields.name.placeholder': 'Ingresa el nombre del customer',
  'pages.admin.customers.fields.summaryPt.placeholder':
    'Ingresa el resumen en portugués del customer',
  'pages.admin.customers.fields.summaryEn.placeholder': 'Ingresa el resumen en inglés del customer',
  'pages.admin.customers.fields.highlight.description':
    'Controla si este customer debe seguir destacado en las secciones públicas del portfolio.',

  'pages.admin.customers.fields.experiences.description':
    'Selecciona todas las experiences que deben exponer este customer en el storytelling público.',
  'pages.admin.customers.fields.experiences.empty':
    'Ninguna experience está disponible para relacionar ahora.',
  'pages.admin.customers.fields.imageAssets.description':
    'Selecciona todos los image assets vinculados a este customer.',
  'pages.admin.customers.fields.imageAssets.empty':
    'Ningún image asset está disponible para relacionar ahora.',
  'pages.admin.customers.modal.create.title': 'Crear customer',
  'pages.admin.customers.modal.read.title': 'Leer customers',
  'pages.admin.customers.modal.read.description':
    'Revisa los customers protegidos actuales y abre flujos de edición o eliminación directamente desde cada registro.',
  'pages.admin.customers.modal.pickUpdate.title': 'Selecciona un customer para editar',
  'pages.admin.customers.modal.pickUpdate.description':
    'Elige uno de los customers protegidos actuales para abrir su formulario de edición.',
  'pages.admin.customers.modal.pickDelete.title': 'Selecciona un customer para eliminar',
  'pages.admin.customers.modal.pickDelete.description':
    'Elige uno de los customers protegidos actuales para confirmar su eliminación.',
  'pages.admin.customers.modal.update.title': 'Editar customer',
  'pages.admin.customers.modal.delete.title': 'Eliminar customer',
  'pages.admin.customers.modal.delete.description':
    'Esta acción elimina permanentemente el customer protegido seleccionado del portfolio.',
  'pages.admin.customers.feedback.created': 'Customer protegido creado con éxito.',
  'pages.admin.customers.feedback.updated': 'Customer protegido actualizado con éxito.',
  'pages.admin.customers.feedback.deleted': 'Customer protegido eliminado con éxito.',
  'pages.admin.customers.feedback.requiredSlug':
    'El slug del customer es obligatorio antes del envío.',
  'pages.admin.customers.feedback.requiredName':
    'El nombre del customer es obligatorio antes del envío.',

  'pages.admin.customers.feedback.selectionRequired':
    'Selecciona un customer protegido antes de continuar con esta acción.',
  'pages.admin.customers.feedback.loadError':
    'La colección protegida de customers no puede cargarse ahora.',
  'pages.admin.customers.feedback.saveError': 'El customer protegido no puede guardarse ahora.',
  'pages.admin.customers.feedback.deleteError': 'El customer protegido no puede eliminarse ahora.',
  'pages.admin.jobs.sectionLabel': '// JOBS',
  'pages.admin.jobs.description':
    'CRUD protegido para registros de cargos usados para normalizar posiciones de experiences y relaciones con medios.',
  'pages.admin.jobs.states.loading': 'Cargando la colección protegida de jobs...',
  'pages.admin.jobs.states.empty': 'Todavía no se ha registrado ningún job protegido.',
  'pages.admin.jobs.card.emptyRelations':
    'Ningún registro relacionado está conectado a este job en este momento.',
  'pages.admin.jobs.fields.slug.placeholder': 'Ingresa el slug único del job',
  'pages.admin.jobs.fields.namePt.placeholder': 'Ingresa el nombre del job en portugués',
  'pages.admin.jobs.fields.nameEn.placeholder': 'Ingresa el nombre del job en inglés',
  'pages.admin.jobs.fields.summaryPt.label': 'Resumen en portugués',
  'pages.admin.jobs.fields.summaryPt.placeholder': 'Ingresa el resumen del job en portugués',
  'pages.admin.jobs.fields.summaryEn.label': 'Resumen en inglés',
  'pages.admin.jobs.fields.summaryEn.placeholder': 'Ingresa el resumen del job en inglés',
  'pages.admin.jobs.fields.highlight.description':
    'Controla si este job debe permanecer destacado en las secciones públicas del portfolio.',

  'pages.admin.jobs.fields.experiences.description':
    'Selecciona todas las experiences que deben exponer este job en la narrativa pública.',
  'pages.admin.jobs.fields.experiences.empty':
    'Ninguna experience está disponible para relacionar ahora.',
  'pages.admin.jobs.fields.imageAssets.description':
    'Selecciona todos los image assets vinculados a este job.',
  'pages.admin.jobs.modal.create.title': 'Crear job',
  'pages.admin.jobs.modal.read.title': 'Leer jobs',
  'pages.admin.jobs.modal.read.description':
    'Revisa los jobs protegidos actuales y abre flujos de update o delete directamente desde cada registro.',
  'pages.admin.jobs.modal.pickUpdate.title': 'Selecciona un job para actualizar',
  'pages.admin.jobs.modal.pickUpdate.description':
    'Elige uno de los jobs protegidos actuales para abrir su formulario de update.',
  'pages.admin.jobs.modal.pickDelete.title': 'Selecciona un job para eliminar',
  'pages.admin.jobs.modal.pickDelete.description':
    'Elige uno de los jobs protegidos actuales para confirmar su eliminación.',
  'pages.admin.jobs.modal.update.title': 'Actualizar job',
  'pages.admin.jobs.modal.delete.title': 'Eliminar job',
  'pages.admin.jobs.modal.delete.description':
    'Esta acción elimina permanentemente el job protegido seleccionado del portfolio.',
  'pages.admin.jobs.feedback.created': 'Job protegido creado con éxito.',
  'pages.admin.jobs.feedback.updated': 'Job protegido actualizado con éxito.',
  'pages.admin.jobs.feedback.deleted': 'Job protegido eliminado con éxito.',
  'pages.admin.jobs.feedback.requiredSlug': 'El slug del job es obligatorio antes del envío.',
  'pages.admin.jobs.feedback.requiredNamePt':
    'El nombre del job en portugués es obligatorio antes del envío.',
  'pages.admin.jobs.feedback.requiredNameEn':
    'El nombre del job en inglés es obligatorio antes del envío.',

  'pages.admin.jobs.feedback.selectionRequired':
    'Selecciona un job protegido antes de continuar con esta acción.',
  'pages.admin.jobs.feedback.loadError': 'La colección protegida de jobs no puede cargarse ahora.',
  'pages.admin.jobs.feedback.saveError': 'El job protegido no puede guardarse ahora.',
  'pages.admin.jobs.feedback.deleteError': 'El job protegido no puede eliminarse ahora.',
  'pages.admin.technologies.sectionLabel': '// TECNOLOGIAS',
  'pages.admin.technologies.description':
    'CRUD protegido del catalogo de tecnologias usado por la experiencia publica de skills.',
  'pages.admin.technologies.states.loading': 'Cargando la coleccion protegida de tecnologias...',
  'pages.admin.technologies.states.empty': 'Aun no se ha registrado ninguna tecnologia protegida.',
  'pages.admin.technologies.fields.slug.placeholder': 'Introduce el slug unico de la tecnologia',
  'pages.admin.technologies.fields.name.placeholder': 'Introduce el nombre de la tecnologia',
  'pages.admin.technologies.fields.sortOrder.placeholder': 'Introduce el orden de visualizacion',
  'pages.admin.technologies.fields.imageAssets.label': 'Imagenes relacionadas',
  'pages.admin.technologies.fields.projects.description':
    'Selecciona todos los proyectos que utilizan esta tecnologia.',
  'pages.admin.technologies.fields.projects.empty': 'No hay proyectos disponibles.',
  'pages.admin.technologies.fields.experiences.label': 'Experiencias relacionadas',
  'pages.admin.technologies.fields.experiences.description':
    'Selecciona todas las experiencias que utilizan esta tecnologia.',
  'pages.admin.technologies.fields.experiences.empty': 'No hay experiencias disponibles.',
  'pages.admin.technologies.fields.formations.description':
    'Selecciona todas las formaciones que utilizan esta tecnologia.',
  'pages.admin.technologies.fields.tags.label': 'Etiquetas relacionadas',
  'pages.admin.technologies.fields.tags.description':
    'Selecciona todas las etiquetas vinculadas a esta tecnologia.',
  'pages.admin.technologies.fields.tags.empty': 'No hay etiquetas disponibles.',
  'pages.admin.technologies.fields.links.label': 'Enlaces relacionados',
  'pages.admin.technologies.fields.links.description':
    'Selecciona todos los enlaces conectados a esta tecnologia.',
  'pages.admin.technologies.fields.links.empty': 'No hay enlaces disponibles.',
  'pages.admin.technologies.fields.highlight.description':
    'Controla si esta tecnologia debe permanecer destacada en el catalogo publico de skills.',
  'pages.admin.technologies.fields.highlight.enabled': 'Destacada',
  'pages.admin.technologies.fields.highlight.disabled': 'No destacada',
  'pages.admin.technologies.fields.imageAssets.description':
    'Selecciona cada imagen que debe representar visualmente esta tecnologia en el portfolio publico.',

  'pages.admin.technologies.card.highlight': 'Destacada',
  'pages.admin.technologies.card.technologyContexts': 'Contextos de tecnología',
  'pages.admin.technologies.card.tags': 'Etiquetas',
  'pages.admin.technologies.fields.imageAssets.empty': 'No hay imágenes disponibles.',
  'pages.admin.technologies.card.emptyRelations':
    'No hay ningun registro relacionado con esta tecnologia.',
  'pages.admin.technologies.feedback.requiredSlug': 'El slug de la tecnologia es obligatorio.',
  'pages.admin.technologies.feedback.requiredName': 'El nombre de la tecnologia es obligatorio.',
  'pages.admin.technologies.feedback.requiredCategory':
    'La categoria de la tecnologia es obligatoria.',
  'pages.admin.technologies.feedback.invalidSortOrder': 'El orden debe ser un numero valido.',
  'pages.admin.technologies.feedback.missingSession':
    'La sesion administrativa no esta disponible.',
  'pages.admin.technologies.feedback.selectionRequired': 'Selecciona primero una tecnologia.',
  'pages.admin.technologies.feedback.loadError':
    'La coleccion protegida de tecnologias no se puede cargar ahora.',
  'pages.admin.technologies.feedback.saveError':
    'La tecnologia protegida no se puede guardar ahora.',
  'pages.admin.technologies.feedback.deleteError':
    'La tecnologia protegida no se puede eliminar ahora.',
  'pages.admin.technologies.feedback.created': 'Tecnologia protegida creada correctamente.',
  'pages.admin.technologies.feedback.updated': 'Tecnologia protegida actualizada correctamente.',
  'pages.admin.technologies.feedback.deleted': 'Tecnologia protegida eliminada correctamente.',
  'pages.admin.technologies.modal.create.title': 'Crear tecnologia',
  'pages.admin.technologies.modal.read.title': 'Leer tecnologias',
  'pages.admin.technologies.modal.pick-update.title': 'Selecciona una tecnologia para editar',
  'pages.admin.technologies.modal.pick-delete.title': 'Selecciona una tecnologia para eliminar',
  'pages.admin.technologies.modal.update.title': 'Editar tecnologia',
  'pages.admin.technologies.modal.delete.title': 'Eliminar tecnologia',
  'pages.admin.technologies.modal.read.description':
    'Revisa las tecnologias protegidas actuales y abre los flujos de actualizacion o eliminacion directamente desde cada registro.',
  'pages.admin.technologies.modal.pickUpdate.description':
    'Elige una de las tecnologias protegidas actuales para abrir su formulario de actualizacion.',
  'pages.admin.technologies.modal.pickDelete.description':
    'Elige una de las tecnologias protegidas actuales para confirmar su eliminacion.',
  'pages.admin.technologies.modal.delete.description':
    'Esta accion elimina permanentemente la tecnologia protegida seleccionada del portfolio.',
  'pages.admin.formations.sectionLabel': '// FORMATIONS',
  'pages.admin.formations.description':
    'CRUD protegido para registros académicos y de formación profesional, incluyendo relaciones de stack, links de apoyo e image assets.',
  'pages.admin.formations.states.loading': 'Cargando la colección protegida de formations...',
  'pages.admin.formations.states.empty': 'Todavía no se ha registrado ninguna formation protegida.',
  'pages.admin.formations.card.emptyRelations':
    'Ningún registro relacionado está conectado a esta formation en este momento.',
  'pages.admin.formations.fields.slug.placeholder': 'Ingresa el slug único de la formation',
  'pages.admin.formations.fields.institution.placeholder': 'Ingresa el nombre de la institución',
  'pages.admin.formations.fields.titlePt.placeholder':
    'Ingresa el título de la formation en portugués',
  'pages.admin.formations.fields.titleEn.placeholder':
    'Ingresa el título de la formation en inglés',
  'pages.admin.formations.fields.degreeType.empty':
    'Ningún tipo de formación está disponible ahora.',
  'pages.admin.formations.fields.degreeType.options.TECHNICAL': 'Técnico',
  'pages.admin.formations.fields.degreeType.options.BACHELOR': 'Licenciatura',
  'pages.admin.formations.fields.degreeType.options.POSTGRADUATE': 'Posgrado',
  'pages.admin.formations.fields.degreeType.options.MBA': 'MBA',
  'pages.admin.formations.fields.degreeType.options.MASTER': 'Maestría',
  'pages.admin.formations.fields.degreeType.options.DOCTORATE': 'Doctorado',
  'pages.admin.formations.fields.degreeType.options.BOOTCAMP': 'Bootcamp',
  'pages.admin.formations.fields.degreeType.options.CERTIFICATION': 'Certificación',
  'pages.admin.formations.fields.degreeType.options.COURSE': 'Curso',
  'pages.admin.technologies.options.TOOL': 'Herramienta',
  'pages.admin.technologies.options.CLOUD': 'Nube',
  'pages.admin.technologies.options.TESTING': 'Pruebas',
  'pages.admin.technologies.options.STYLING': 'Estilos',
  'pages.admin.technologies.options.ARCHITECTURE': 'Arquitectura',
  'pages.admin.technologies.options.STUDYING': 'En estudio',
  'pages.admin.formations.fields.summaryPt.placeholder':
    'Ingresa el resumen de la formation en portugués',
  'pages.admin.formations.fields.summaryEn.placeholder':
    'Ingresa el resumen de la formation en inglés',
  'pages.admin.formations.fields.startDate.label': 'Fecha de inicio',
  'pages.admin.formations.fields.endDate.label': 'Fecha de término',
  'pages.admin.formations.fields.highlight.description':
    'Controla si esta formation debe permanecer destacada en las secciones públicas del portfolio.',
  'pages.admin.formations.fields.technologies.label': 'Technologies relacionadas',
  'pages.admin.formations.fields.technologies.description':
    'Selecciona todas las technologies que deben permanecer relacionadas con esta formation.',
  'pages.admin.formations.fields.technologies.empty':
    'Ninguna technology está disponible para relacionar ahora.',
  'pages.admin.formations.fields.links.description':
    'Selecciona todos los links de apoyo conectados a esta formation.',
  'pages.admin.formations.fields.links.empty': 'Ningún link está disponible para relacionar ahora.',
  'pages.admin.formations.fields.imageAssets.description':
    'Selecciona todos los image assets vinculados a esta formation.',
  'pages.admin.formations.modal.create.title': 'Crear formation',
  'pages.admin.formations.modal.read.title': 'Leer formations',
  'pages.admin.formations.modal.read.description':
    'Revisa las formations protegidas actuales y abre flujos de update o delete directamente desde cada registro.',
  'pages.admin.formations.modal.pickUpdate.title': 'Selecciona una formation para actualizar',
  'pages.admin.formations.modal.pickUpdate.description':
    'Elige una de las formations protegidas actuales para abrir su formulario de update.',
  'pages.admin.formations.modal.pickDelete.title': 'Selecciona una formation para eliminar',
  'pages.admin.formations.modal.pickDelete.description':
    'Elige una de las formations protegidas actuales para confirmar su eliminación.',
  'pages.admin.formations.modal.update.title': 'Actualizar formation',
  'pages.admin.formations.modal.delete.title': 'Eliminar formation',
  'pages.admin.formations.modal.delete.description':
    'Esta acción elimina permanentemente la formation protegida seleccionada del portfolio.',
  'pages.admin.formations.feedback.created': 'Formation protegida creada con éxito.',
  'pages.admin.formations.feedback.updated': 'Formation protegida actualizada con éxito.',
  'pages.admin.formations.feedback.deleted': 'Formation protegida eliminada con éxito.',
  'pages.admin.formations.feedback.requiredSlug':
    'El slug de la formation es obligatorio antes del envío.',
  'pages.admin.formations.feedback.requiredInstitution':
    'La institución es obligatoria antes del envío.',
  'pages.admin.formations.feedback.requiredTitlePt':
    'El título de la formation en portugués es obligatorio antes del envío.',
  'pages.admin.formations.feedback.requiredTitleEn':
    'El título de la formation en inglés es obligatorio antes del envío.',
  'pages.admin.formations.feedback.requiredDegreeType':
    'El tipo de formación es obligatorio antes del envío.',
  'pages.admin.formations.feedback.requiredStartDate':
    'La fecha de inicio es obligatoria antes del envío.',
  'pages.admin.formations.feedback.invalidDateRange':
    'La fecha de término no puede ser anterior a la fecha de inicio.',

  'pages.admin.formations.feedback.selectionRequired':
    'Selecciona una formation protegida antes de continuar con esta acción.',
  'pages.admin.formations.feedback.loadError':
    'La colección protegida de formations no puede cargarse ahora.',
  'pages.admin.formations.feedback.saveError': 'La formation protegida no puede guardarse ahora.',
  'pages.admin.formations.feedback.deleteError':
    'La formation protegida no puede eliminarse ahora.',
  'pages.admin.technologyContexts.sectionLabel': '// CONTEXTOS_DE_TECNOLOGIA',
  'pages.admin.technologyContexts.description':
    'Ventanas contextuales que describen cómo se usa cada tecnología en el portafolio.',
  'pages.admin.technologyContexts.states.loading': 'Cargando contextos de tecnología...',
  'pages.admin.technologyContexts.states.empty':
    'Todavía no se ha registrado ningún contexto de tecnología protegido.',
  'pages.admin.technologyContexts.fields.endedAt.label': 'Fecha de finalización',
  'pages.admin.technologyContexts.modal.create.title': 'Crear contexto de tecnología',
  'pages.admin.technologyContexts.modal.read.title': 'Leer contextos de tecnología',
  'pages.admin.technologyContexts.modal.read.description':
    'Revisa los contextos protegidos actuales y abre los flujos de actualización o eliminación directamente desde cada registro.',
  'pages.admin.technologyContexts.modal.pickUpdate.title':
    'Selecciona un contexto de tecnología para actualizar',
  'pages.admin.technologyContexts.modal.pickUpdate.description':
    'Elige un contexto protegido actual para abrir su formulario de actualización.',
  'pages.admin.technologyContexts.modal.pickDelete.title':
    'Selecciona un contexto de tecnología para eliminar',
  'pages.admin.technologyContexts.modal.pickDelete.description':
    'Elige un contexto protegido actual para confirmar su eliminación.',
  'pages.admin.technologyContexts.modal.update.title': 'Actualizar contexto de tecnología',
  'pages.admin.technologyContexts.modal.delete.title': 'Eliminar contexto de tecnología',
  'pages.admin.technologyContexts.modal.delete.description':
    'Esta acción elimina permanentemente el contexto de tecnología protegido seleccionado.',
  'pages.admin.technologyContexts.feedback.created':
    'Contexto de tecnología protegido creado correctamente.',
  'pages.admin.technologyContexts.feedback.updated':
    'Contexto de tecnología protegido actualizado correctamente.',
  'pages.admin.technologyContexts.feedback.deleted':
    'Contexto de tecnología protegido eliminado correctamente.',
  'pages.admin.technologyContexts.feedback.requiredTechnology':
    'La tecnología es obligatoria antes de enviar.',
  'pages.admin.technologyContexts.feedback.requiredContext':
    'El contexto es obligatorio antes de enviar.',
  'pages.admin.technologyContexts.feedback.requiredStartDate':
    'La fecha de inicio es obligatoria antes de enviar.',
  'pages.admin.technologyContexts.feedback.missingSession':
    'La sesión administrativa autenticada no está disponible. Inicia sesión de nuevo para continuar.',
  'pages.admin.technologyContexts.feedback.loadError':
    'La colección protegida de contextos de tecnología no se pudo cargar ahora.',
  'pages.admin.technologyContexts.feedback.saveError':
    'El contexto de tecnología protegido no se pudo guardar ahora.',
  'pages.admin.technologyContexts.feedback.deleteError':
    'El contexto de tecnología protegido no se pudo eliminar ahora.',
  'pages.admin.entities.image-assets.description':
    'Registros normalizados de medios usados por el portfolio a través de relaciones de image assets.',
  'pages.admin.entities.spoken-languages.description':
    'Control administrativo de las entradas de dominio de idiomas mostradas en el perfil y en los contextos de skills.',
  'pages.admin.entities.customers.description':
    'Organizaciones cliente referenciadas por el historial de experiencias y la narrativa basada en relaciones.',
  'pages.admin.entities.jobs.description':
    'Catálogo de cargos para mantener nombres consistentes y mapeo relacional entre experiencias.',
  'pages.admin.entities.formations.description':
    'Registros académicos y de formación profesional, incluyendo links, imágenes y relaciones de stack.',
  'pages.admin.entities.technologies.description':
    'Catálogo principal de stack con destacados, métricas, tags y arrays relacionales administrados por la entidad.',
  'pages.admin.entities.technology-contexts.description':
    'La única entidad relacional dedicada, usada para registrar ventanas contextuales de uso para cada tecnología.',
  'pages.admin.entities.experiences.description':
    'Registros del historial profesional con empresa, rol, cronología, clientes, proyectos y relaciones de stack.',
  'pages.admin.entities.projects.description':
    'Entradas de proyecto en formato case study, con entorno, estado, período y arrays relacionales propios.',
  'pages.admin.experiences.sectionLabel': '// EXPERIENCIAS',
  'pages.admin.experiences.states.loading': 'Cargando experiencias protegidas...',
  'pages.admin.experiences.states.empty': 'Todavía no hay experiencias protegidas.',
  'pages.admin.experiences.modal.create.title': 'Crear experiencia',
  'pages.admin.experiences.modal.read.title': 'Leer experiencias',
  'pages.admin.experiences.modal.pickUpdate.title': 'Seleccionar experiencia para editar',
  'pages.admin.experiences.modal.pickDelete.title': 'Seleccionar experiencia para eliminar',
  'pages.admin.experiences.modal.update.title': 'Editar experiencia',
  'pages.admin.experiences.modal.delete.title': 'Eliminar experiencia',
  'pages.admin.experiences.modal.read.description':
    'Revisa las experiencias protegidas y abre los flujos de edición o eliminación.',
  'pages.admin.experiences.modal.pickUpdate.description':
    'Elige una experiencia protegida para abrir el formulario.',
  'pages.admin.experiences.modal.pickDelete.description':
    'Elige una experiencia protegida para confirmar la eliminación.',
  'pages.admin.experiences.modal.delete.description':
    'Esta acción elimina permanentemente la experiencia seleccionada.',
  'pages.admin.experiences.feedback.loadError':
    'No se pudieron cargar las experiencias protegidas.',
  'pages.admin.experiences.feedback.saveError': 'No se pudo guardar la experiencia protegida.',
  'pages.admin.experiences.feedback.deleteError': 'No se pudo eliminar la experiencia protegida.',
  'pages.admin.experiences.feedback.created': 'Experiencia protegida creada correctamente.',
  'pages.admin.experiences.feedback.updated': 'Experiencia protegida actualizada correctamente.',
  'pages.admin.experiences.feedback.deleted': 'Experiencia protegida eliminada correctamente.',
  'pages.admin.experiences.fields.slug.placeholder': 'Escribe el slug único de la experiencia',
  'pages.admin.experiences.fields.companyName.label': 'Empresa',
  'pages.admin.experiences.fields.companyName.placeholder': 'Escribe el nombre de la empresa',
  'pages.admin.experiences.fields.titlePt.placeholder': 'Escribe el cargo en portugués',
  'pages.admin.experiences.fields.titleEn.placeholder': 'Escribe el cargo en inglés',
  'pages.admin.experiences.fields.summaryPt.placeholder': 'Escribe el resumen en portugués',
  'pages.admin.experiences.fields.summaryEn.placeholder': 'Escribe el resumen en inglés',
  'pages.admin.experiences.fields.descriptionPt.placeholder': 'Escribe la descripción en portugués',
  'pages.admin.experiences.fields.descriptionEn.placeholder': 'Escribe la descripción en inglés',

  'pages.admin.experiences.fields.isCurrent.label': 'Puesto actual',
  'pages.admin.experiences.fields.isCurrent.description': 'Marca esta experiencia como actual.',
  'pages.admin.experiences.fields.highlight.description':
    'Mantén esta experiencia destacada en el portafolio público.',
  'pages.admin.projects.states.loading': 'Cargando proyectos protegidos...',
  'pages.admin.projects.states.empty': 'Todavía no hay proyectos protegidos.',
  'pages.admin.projects.modal.create.title': 'Crear proyecto',
  'pages.admin.projects.modal.read.title': 'Leer proyectos',
  'pages.admin.projects.modal.pickUpdate.title': 'Seleccionar proyecto para editar',
  'pages.admin.projects.modal.pickDelete.title': 'Seleccionar proyecto para eliminar',
  'pages.admin.projects.modal.update.title': 'Editar proyecto',
  'pages.admin.projects.modal.delete.title': 'Eliminar proyecto',
  'pages.admin.projects.modal.read.description':
    'Revisa los proyectos protegidos y abre los flujos de edición o eliminación.',
  'pages.admin.projects.modal.pickUpdate.description':
    'Elige un proyecto protegido para abrir el formulario.',
  'pages.admin.projects.modal.pickDelete.description':
    'Elige un proyecto protegido para confirmar la eliminación.',
  'pages.admin.projects.modal.delete.description':
    'Esta acción elimina permanentemente el proyecto seleccionado.',
  'pages.admin.projects.feedback.loadError': 'No se pudieron cargar los proyectos protegidos.',
  'pages.admin.projects.feedback.saveError': 'No se pudo guardar el proyecto protegido.',
  'pages.admin.projects.feedback.deleteError': 'No se pudo eliminar el proyecto protegido.',
  'pages.admin.projects.feedback.created': 'Proyecto protegido creado correctamente.',
  'pages.admin.projects.feedback.updated': 'Proyecto protegido actualizado correctamente.',
  'pages.admin.projects.feedback.deleted': 'Proyecto protegido eliminado correctamente.',
  'pages.admin.projects.fields.slug.placeholder': 'Escribe el slug único del proyecto',
  'pages.admin.projects.fields.titlePt.label': 'Título en portugués',
  'pages.admin.projects.fields.titlePt.placeholder': 'Escribe el título en portugués',
  'pages.admin.projects.fields.titleEn.label': 'Título en inglés',
  'pages.admin.projects.fields.titleEn.placeholder': 'Escribe el título en inglés',
  'pages.admin.projects.fields.shortDescriptionPt.label': 'Resumen corto en portugués',
  'pages.admin.projects.fields.shortDescriptionPt.placeholder':
    'Escribe el resumen corto en portugués',
  'pages.admin.projects.fields.shortDescriptionEn.label': 'Resumen corto en inglés',
  'pages.admin.projects.fields.shortDescriptionEn.placeholder':
    'Escribe el resumen corto en inglés',
  'pages.admin.projects.fields.fullDescriptionPt.label': 'Descripción completa en portugués',
  'pages.admin.projects.fields.fullDescriptionPt.placeholder':
    'Escribe la descripción completa en portugués',
  'pages.admin.projects.fields.fullDescriptionEn.label': 'Descripción completa en inglés',
  'pages.admin.projects.fields.fullDescriptionEn.placeholder':
    'Escribe la descripción completa en inglés',
  'pages.admin.projects.fields.context.label': 'Contexto',
  'pages.admin.projects.fields.context.placeholder': 'Selecciona el contexto',
  'pages.admin.projects.fields.status.label': 'Estado',
  'pages.admin.projects.fields.status.placeholder': 'Selecciona el estado',
  'pages.admin.projects.fields.environment.placeholder': 'Selecciona el entorno',
  'pages.admin.projects.fields.featured.label': 'Destacado principal',
  'pages.admin.projects.fields.featured.description':
    'Mantén el proyecto destacado en el portafolio.',
  'pages.admin.projects.fields.highlight.description':
    'Mantén el proyecto enfatizado en el portafolio.',
  'pages.admin.projects.fields.status.options.ARCHIVED': 'Archivado',
  'pages.admin.projects.fields.status.options.PLANNED': 'Planificado',
  'pages.admin.projects.fields.environment.options.FRONTEND': 'Frontend',
  'pages.admin.projects.fields.environment.options.BACKEND': 'Backend',
  'pages.admin.projects.fields.environment.options.MOBILE': 'Móvil',
  'pages.admin.projects.fields.environment.options.DASHBOARD': 'Dashboard',
  'pages.admin.experiences.feedback.requiredCompanyName': 'El nombre de la empresa es obligatorio.',
  'pages.admin.experiences.feedback.requiredSummaryPt': 'El resumen en portugués es obligatorio.',
  'pages.admin.experiences.feedback.requiredSummaryEn': 'El resumen en inglés es obligatorio.',
  'pages.admin.experiences.feedback.requiredDescriptionPt':
    'La descripción en portugués es obligatoria.',
  'pages.admin.experiences.feedback.requiredDescriptionEn':
    'La descripción en inglés es obligatoria.',
  'pages.admin.experiences.feedback.requiredStartDate': 'La fecha inicial es obligatoria.',
  'pages.admin.experiences.fields.technologies.description':
    'Selecciona todas las tecnologías usadas en esta experiencia.',
  'pages.admin.experiences.fields.projects.description':
    'Selecciona todos los proyectos conectados a esta experiencia.',
  'pages.admin.experiences.fields.projects.empty': 'No hay proyectos disponibles.',
  'pages.admin.experiences.fields.customers.description':
    'Selecciona todos los clientes conectados a esta experiencia.',
  'pages.admin.experiences.fields.customers.empty': 'No hay clientes disponibles.',
  'pages.admin.experiences.fields.jobs.label': 'Cargos relacionados',
  'pages.admin.experiences.fields.jobs.description':
    'Selecciona todos los cargos conectados a esta experiencia.',
  'pages.admin.experiences.fields.jobs.empty': 'No hay cargos disponibles.',
  'pages.admin.experiences.fields.links.description':
    'Selecciona todos los links conectados a esta experiencia.',

  'pages.admin.experiences.fields.imageAssets.description':
    'Selecciona todas las imágenes conectadas a esta experiencia.',
  'pages.admin.projects.feedback.requiredShortDescriptionPt':
    'El resumen corto en portugués es obligatorio.',
  'pages.admin.projects.feedback.requiredShortDescriptionEn':
    'El resumen corto en inglés es obligatorio.',
  'pages.admin.projects.feedback.requiredFullDescriptionPt':
    'La descripción completa en portugués es obligatoria.',
  'pages.admin.projects.feedback.requiredFullDescriptionEn':
    'La descripción completa en inglés es obligatoria.',
  'pages.admin.projects.feedback.requiredOptions':
    'Selecciona todas las opciones obligatorias del proyecto.',
  'pages.admin.projects.fields.technologies.description':
    'Selecciona todas las tecnologías usadas en este proyecto.',
  'pages.admin.projects.fields.experiences.description':
    'Selecciona todas las experiencias conectadas a este proyecto.',
  'pages.admin.projects.fields.experiences.empty': 'No hay experiencias disponibles.',
  'pages.admin.projects.fields.tags.label': 'Tags relacionadas',
  'pages.admin.projects.fields.tags.description':
    'Selecciona todas las tags conectadas a este proyecto.',
  'pages.admin.projects.fields.tags.empty': 'No hay tags disponibles.',
  'pages.admin.projects.fields.links.description':
    'Selecciona todos los links conectados a este proyecto.',

  'pages.admin.projects.fields.imageAssets.description':
    'Selecciona todas las imágenes conectadas a este proyecto.',
  'taxonomy.dashboard.source.experience': 'Experiencia',
  'taxonomy.dashboard.source.project': 'Proyecto',
  'pages.admin.operations.localized.title': 'Título',

  'pages.admin.operations.localized.shortDescription': 'Descripción breve',
  'pages.admin.operations.localized.fullDescription': 'Descripción completa',
  'pages.admin.operations.localized.label': 'Etiqueta',
  'pages.admin.operations.localized.alt': 'Texto alternativo',
  'pages.admin.operations.localized.caption': 'Leyenda',
  'pages.admin.experiences.fields.titleEs.placeholder': 'Introduce el cargo en español',
  'pages.admin.experiences.fields.descriptionEs.placeholder': 'Introduce la descripción en español',
  'pages.admin.experiences.feedback.requiredDescriptionEs':
    'La descripción en español es obligatoria.',
  'pages.admin.projects.fields.titleEs.placeholder': 'Introduce el título del proyecto en español',
  'pages.admin.projects.fields.shortDescriptionEs.label': 'Descripción breve en español',
  'pages.admin.projects.fields.shortDescriptionEs.placeholder':
    'Introduce la descripción breve en español',
  'pages.admin.projects.fields.fullDescriptionEs.label': 'Descripción completa en español',
  'pages.admin.projects.fields.fullDescriptionEs.placeholder':
    'Introduce la descripción completa en español',
  'pages.admin.projects.feedback.requiredShortDescriptionEs':
    'La descripción breve en español es obligatoria.',
  'pages.admin.projects.feedback.requiredFullDescriptionEs':
    'La descripción completa en español es obligatoria.',
  'pages.admin.formations.fields.titleEs.placeholder': 'Introduce el título en español',
  'pages.admin.spokenLanguages.fields.nameEs.placeholder':
    'Introduce el nombre del idioma en español',

  'pages.admin.customers.fields.summaryEs.placeholder':
    'Introduce el resumen del cliente en español',
  'pages.admin.jobs.fields.nameEs.placeholder': 'Introduce el nombre del cargo en español',
  'pages.admin.jobs.fields.summaryEs.placeholder': 'Introduce el resumen del cargo en español',
  'pages.admin.links.fields.labelEs.label': 'Etiqueta en español',
  'pages.admin.links.fields.labelEs.placeholder': 'Introduce la etiqueta del enlace en español',
  'pages.admin.links.fields.descriptionEs.placeholder':
    'Introduce la descripción del enlace en español',
  'pages.admin.links.feedback.requiredLabelPt': 'La etiqueta en portugués es obligatoria.',
  'pages.admin.links.feedback.requiredLabelEn': 'La etiqueta en inglés es obligatoria.',
  'pages.admin.links.feedback.requiredLabelEs': 'La etiqueta en español es obligatoria.',
  'pages.admin.imageAssets.fields.altEs.label': 'Texto alternativo en español',
  'pages.admin.imageAssets.fields.altEs.placeholder':
    'Describe la imagen en español para accesibilidad',
  'pages.admin.imageAssets.fields.captionEs.label': 'Leyenda en español',
  'pages.admin.imageAssets.fields.captionEs.placeholder': 'Introduce la leyenda en español',
  'pages.admin.tags.fields.nameEs.placeholder': 'Introduce el nombre de la etiqueta en español',
} as const satisfies AppTranslationLanguage;
