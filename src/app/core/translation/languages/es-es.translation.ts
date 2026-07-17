import { AppTranslationLanguage } from '../translation.types';

export const ES_ES_TRANSLATIONS = {
  'header.brand.home': 'Ir al inicio',
  'header.brand.role': 'Full Stack Engineer | Especialista Front-End',
  'header.tags.angular': 'Angular 20',
  'header.tags.signals': 'Signals first',
  'header.tags.api': 'API activa',
  'header.controls.theme': 'Tema',
  'header.controls.darkMode': 'Modo oscuro',
  'header.controls.darkTheme': 'Tema oscuro',
  'header.controls.lightTheme': 'Tema claro',
  'header.controls.language': 'Idioma',
  'header.controls.navigation': 'Menú de navegación',
  'header.controls.noLanguages': 'Ningún idioma disponible',
  'header.controls.portuguese': 'Portugués',
  'header.controls.english': 'Inglés',
  'header.controls.spanish': 'Español',
  'header.navigation.home': 'Home',
  'header.navigation.experiences': 'Experiencias',
  'header.navigation.skills': 'Habilidades',
  'header.navigation.projects': 'Proyectos',
  'header.navigation.dashboard': 'Panel',
  'header.statusLabel': 'Estado de la fundación',
  'header.eyebrow': 'Fundación del portfolio',
  'header.title': 'Una shell específica del portfolio, ya conectada a datos reales del backend.',
  'header.description':
    'Esta primera capa de layout establece la estructura del portfolio, mantiene la app alineada con la design lib y prepara las próximas iteraciones visuales sobre una shell Angular responsiva.',
  'header.highlight.layout.label': 'Layout',
  'header.highlight.layout.title': 'Header, footer, nav y wrappers de página',
  'header.highlight.layout.description':
    'Composición específica del portfolio organizada dentro de la capa de layout de la app.',
  'header.highlight.integration.label': 'Integración',
  'header.highlight.integration.title': 'API real desde el inicio',
  'header.highlight.integration.description':
    'La shell sigue conectada al backend para que cada próxima página evolucione con datos reales.',
  'header.highlight.direction.label': 'Dirección',
  'header.highlight.direction.title':
    'Design-lib primero, estructura específica del portfolio después',
  'header.highlight.direction.description':
    'Los componentes reutilizables de la lib siguen como base mientras el layout único del portfolio vive aquí.',
  'footer.eyebrow': 'Shell del portfolio',
  'footer.title': 'Base de layout lista para las próximas páginas',
  'footer.description':
    'La shell específica del portfolio ahora separa layout de pages, mantiene la navegación centralizada por la configuración de rutas y sigue alineada con la design lib.',
  'footer.navigationLabel': 'Navegación del footer',
  'footer.principlesLabel': 'Principios de implementación',
  'footer.tags.standalone': 'Solo standalone',
  'footer.tags.tailwind': 'Tailwind @apply',
  'footer.tags.coverage': '100% coverage',
  'footer.social.navigation': 'Links sociales',
  'footer.social.github': 'Abrir perfil de GitHub',
  'footer.social.linkedin': 'Abrir perfil de LinkedIn',
  'footer.social.whatsapp': 'Abrir contacto de WhatsApp',
  'footer.social.email': 'Enviar un correo',
  'footer.location': 'Belo Horizonte, Brasil',
  'footer.copyright.name': 'Victor Hanszman',
  'footer.copyright.year': '© {{ year }}',
  'common.actions.viewDetails': 'Ver detalles',
  'common.actions.close': 'Cerrar',
  'common.actions.save': 'Guardar',
  'common.actions.applyFilters': 'Aplicar filtros',
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
  'pages.home.hero.availability': 'Disponible para trabajar',
  'pages.home.hero.greeting': 'Hola, soy',
  'pages.home.hero.subtitle': 'Ingeniero de Software Full Stack',
  'pages.home.hero.description':
    'Ingeniero de Software Full Stack especializado en Front-End y Back-End. Con base en Belo Horizonte, Minas Gerais, Brasil. Actualmente trabajando de forma remota y abierto a nuevas oportunidades en desarrollo de software.',
  'pages.home.hero.location': 'Belo Horizonte, Brasil',
  'pages.home.hero.cta.projects': 'Ver proyectos',
  'pages.home.hero.cta.experiences': 'Mi experiencia',
  'pages.home.hero.social.navigation': 'Enlaces sociales',
  'pages.home.metrics.years.label': 'Años de experiencia',
  'pages.home.metrics.years.description': 'Años construyendo productos web',
  'pages.home.metrics.projects.label': 'Proyectos entregados',
  'pages.home.metrics.projects.description': 'Casos publicados en el portfolio',
  'pages.home.metrics.technologies.label': 'Tecnologías',
  'pages.home.metrics.technologies.description': 'Señales de stack mapeadas',
  'pages.home.metrics.ariaLabel': 'Métricas del portfolio',
  'pages.home.loading': 'Conectando datos reales del portfolio...',
  'pages.home.error': 'Los datos reales de la home no están disponibles por ahora.',
  'pages.home.stack.label': '// CORE_STACK',
  'pages.home.stack.title': 'Tecnologías principales',
  'pages.home.stack.description':
    'Las señales de stack más visibles recopiladas del agregado en vivo del dashboard.',
  'pages.home.stack.projects': 'proyectos',
  'pages.home.stack.technologies': 'tecnologías',
  'pages.home.stack.empty': 'Todavía no se devolvió ninguna distribución de stack.',
  'pages.home.navigation.experiences.eyebrow': '// carrera',
  'pages.home.navigation.experiences.title': 'Experiencias',
  'pages.home.navigation.experiences.description':
    'Trayectoria profesional y línea de tiempo de carrera.',
  'pages.home.navigation.skills.eyebrow': '// arsenal',
  'pages.home.navigation.skills.title': 'Habilidades',
  'pages.home.navigation.skills.description': 'Tecnologías, formaciones e idiomas.',
  'pages.home.navigation.projects.eyebrow': '// entregas',
  'pages.home.navigation.projects.title': 'Proyectos',
  'pages.home.navigation.projects.description': 'Aplicaciones reales y estudios de caso.',
  'pages.experiences.sectionLabel': '// CAREER_TIMELINE',
  'pages.experiences.title': 'Experiencia Profesional',
  'pages.experiences.description':
    'Un recorrido cronológico por mi carrera construyendo soluciones de software de impacto.',
  'pages.experiences.snapshot.label': 'Panorama',
  'pages.experiences.snapshot.title': 'Cobertura de la trayectoria proveniente de la API real',
  'pages.experiences.snapshot.description':
    'Conteos, señal del rol actual y amplitud de relaciones salen directamente de la colección publicada de experiences.',
  'pages.experiences.snapshot.loading': 'Cargando relaciones reales de experiences...',
  'pages.experiences.snapshot.error': 'El endpoint de experiences no está disponible ahora.',
  'pages.experiences.snapshot.metrics.currentRole': 'Rol actual',
  'pages.experiences.snapshot.metrics.experiences': 'Capítulos',
  'pages.experiences.snapshot.metrics.projects': 'Proyectos',
  'pages.experiences.snapshot.metrics.technologies': 'Tecnologías',
  'pages.experiences.snapshot.metrics.customers': 'Clientes',
  'pages.experiences.snapshot.metrics.highlights': 'Destacados',
  'pages.experiences.timeline.label': 'Narrativa de carrera',
  'pages.experiences.timeline.title': 'Timeline, contexto e impacto en el mismo flujo de lectura',
  'pages.experiences.timeline.description':
    'Cada capítulo conecta empresa, rol, clientes, proyectos y stack para que la historia profesional se lea como un sistema y no como una lista suelta.',
  'pages.experiences.timeline.loading': 'Cargando relaciones reales de experiences...',
  'pages.experiences.timeline.error': 'El endpoint de experiences no está disponible ahora.',
  'pages.experiences.timeline.empty':
    'Todavía no se devolvió ningún capítulo publicado de experiencia.',
  'pages.experiences.timeline.current': 'Actual',
  'pages.experiences.timeline.highlight': 'Destacado',
  'pages.experiences.timeline.roles': 'Roles',
  'pages.experiences.timeline.customers': 'Clientes',
  'pages.experiences.timeline.emptyCustomers': 'Todavía no hay ningún cliente vinculado.',
  'pages.experiences.timeline.technologyStack': 'Stack de tecnología',
  'pages.experiences.timeline.relatedProjects': 'Proyectos relacionados',
  'pages.experiences.timeline.moreTechnologies': 'más',
  'pages.experiences.timeline.emptyProjects':
    'No se devolvió ningún proyecto relacionado para este capítulo.',
  'pages.experiences.detail.projectsCount': 'proyectos',
  'pages.experiences.detail.analytics': 'Analítica de la experiencia',
  'pages.experiences.detail.gallery': 'Galería vinculada',
  'pages.experiences.detail.chart.jobs': 'Roles',
  'pages.experiences.detail.chart.customers': 'Clientes',
  'pages.experiences.detail.chart.projects': 'Proyectos',
  'pages.experiences.detail.chart.technologies': 'Tecnologías',
  'pages.experiences.detail.chart.series': 'Conexiones',
  'pages.experiences.detail.projects': '// proyectos',
  'pages.experiences.detail.clients': '// clientes',
  'pages.experiences.detail.techStack': '// stack_tecnico',
  'pages.experiences.detail.stackGroups.frontend': 'Front-end',
  'pages.experiences.detail.stackGroups.backend': 'Back-end',
  'pages.experiences.detail.stackGroups.databases': 'Bases de datos',
  'pages.experiences.detail.stackGroups.others': 'Otros',
  'pages.experiences.technology.category': 'Categoría',
  'pages.experiences.technology.type': 'Tipo',
  'pages.experiences.technology.stack': 'Stack',
  'pages.experiences.technology.level': 'Nivel de conocimiento',
  'pages.experiences.technology.frequency': 'Frecuencia de uso',
  'pages.experiences.technology.projects': 'Proyectos usados',
  'pages.experiences.customer.company': 'Empresa relacionada',
  'pages.experiences.customer.projects': 'Proyectos relacionados',
  'pages.skills.sectionLabel': '// SKILLS_ARSENAL',
  'pages.skills.title': 'Habilidades y Tecnologías',
  'pages.skills.description':
    'Una vista completa de mi arsenal técnico, educación y competencias lingüísticas.',
  'pages.skills.snapshot.label': 'Resumen del portfolio',
  'pages.skills.snapshot.title': 'Tecnologías con métricas reales por contexto',
  'pages.skills.snapshot.description':
    'La barra lateral resume cobertura por categoría, densidad de destacados y la señal de mayor duración publicada por la API.',
  'pages.skills.snapshot.loading': 'Cargando métricas de experiencia de tecnologías...',
  'pages.skills.snapshot.error': 'El endpoint de technologies no está disponible ahora.',
  'pages.skills.filters.label': 'Filtros del catálogo',
  'pages.skills.filters.title': 'Recorta el stack por categoría, nivel y contexto',
  'pages.skills.filters.description':
    'Los filtros siguen ligeros en la UI mientras las duraciones reales vienen del contrato del backend.',
  'pages.skills.filters.category': 'Categoría',
  'pages.skills.filters.type': 'Tipo',
  'pages.skills.filters.stack': 'Stack',
  'pages.skills.filters.level': 'Nivel',
  'pages.skills.filters.context': 'Contexto',
  'pages.skills.filters.total': 'Tecnologías filtradas',
  'pages.skills.education.title': 'Educación',
  'pages.skills.education.informationSystems.title': 'Sistemas de Información',
  'pages.skills.education.informationSystems.institution':
    'Pontificia Universidad Católica de Minas Gerais',
  'pages.skills.education.informationSystems.period': '02/2015 - 12/2018',
  'pages.skills.education.informationSystems.badge': 'Licenciatura',
  'pages.skills.education.fullStackWeb.title': 'Desarrollo Web FullStack',
  'pages.skills.education.fullStackWeb.institution':
    'Pontificia Universidad Católica de Minas Gerais',
  'pages.skills.education.fullStackWeb.period': '03/2019 - 06/2021',
  'pages.skills.education.fullStackWeb.badge': 'Especialista',
  'pages.skills.education.angularNode.title': 'Programador FullStack Angular & Node',
  'pages.skills.education.angularNode.institution': 'Udemy',
  'pages.skills.education.angularNode.period': '03/2020 - 04/2020',
  'pages.skills.education.angularNode.badge': 'Certificado',
  'pages.skills.languages.title': 'Idiomas',
  'pages.skills.languages.portuguese.title': 'Portugués',
  'pages.skills.languages.portuguese.subtitle': 'Comunicación nativa',
  'pages.skills.languages.portuguese.meta': 'Portugués brasileño',
  'pages.skills.languages.portuguese.badge': 'Nativo',
  'pages.skills.languages.english.title': 'Inglés',
  'pages.skills.languages.english.subtitle': 'Comunicación profesional',
  'pages.skills.languages.english.meta': 'Lectura, escritura y conversación',
  'pages.skills.languages.english.badge': 'Fluido',
  'pages.skills.technologies.title': 'Tecnologías',
  'pages.skills.search.placeholder': 'Buscar tecnología...',
  'pages.skills.catalog.label': 'Grupos de tecnología',
  'pages.skills.catalog.title': 'Lectura agrupada para el filtro actual',
  'pages.skills.catalog.description':
    'Cada tarjeta destaca experiencia total y los contextos en los que esa stack ya fue usada.',
  'pages.skills.catalog.loading': 'Construyendo grupos de tecnología...',
  'pages.skills.catalog.error': 'El endpoint de technologies no está disponible ahora.',
  'pages.skills.catalog.empty': 'Ninguna tecnología publicada coincide con los filtros actuales.',
  'pages.skills.card.highlight': 'Destacado',
  'pages.skills.card.totalExperience': 'Experiencia total',
  'pages.skills.card.contexts': 'Cobertura por contexto',
  'pages.skills.detail.totalExperience': 'Experiencia consolidada',
  'pages.skills.detail.contextChart': 'Distribución por contexto',
  'pages.skills.detail.chartSeries': 'Meses',
  'pages.skills.detail.coverage': 'Cobertura detallada',
  'pages.skills.detail.timeline': 'Timeline de contexto',
  'pages.skills.detail.noTimeline': 'No se devolvió ningún intervalo publicado.',
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
  'taxonomy.skills.level.studying': 'Estudiando',
  'taxonomy.skills.level.all': 'Todos',
  'taxonomy.skills.stack.all': 'Todos',
  'taxonomy.skills.stack.frontEnd': 'Front-End',
  'taxonomy.skills.stack.backEnd': 'Back-End',
  'taxonomy.skills.stack.databases': 'Bases de datos',
  'taxonomy.skills.stack.games': 'Games',
  'taxonomy.skills.stack.mobile': 'Mobile',
  'taxonomy.skills.stack.others': 'Otros',
  'taxonomy.skills.type.all': 'Todos',
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
  'taxonomy.skills.type.others': 'Otros',
  'taxonomy.skills.frequency.frequent': 'Frecuente',
  'taxonomy.skills.frequency.occasional': 'Ocasional',
  'taxonomy.skills.frequency.rare': 'Rara',
  'taxonomy.skills.frequency.previouslyUsed': 'Usado anteriormente',
  'taxonomy.skills.frequency.studying': 'Estudiando',
  'taxonomy.skills.context.professional': 'Profesional',
  'taxonomy.skills.context.personal': 'Personal',
  'taxonomy.skills.context.academic': 'Académico',
  'taxonomy.skills.context.study': 'Estudio',
  'taxonomy.experiences.projectStatus.completed': 'Completado',
  'taxonomy.experiences.projectStatus.inProgress': 'En progreso',
  'taxonomy.experiences.projectEnvironment.frontend': 'Front-end',
  'taxonomy.experiences.projectEnvironment.backend': 'Back-end',
  'taxonomy.experiences.projectEnvironment.fullstack': 'Full stack',
  'taxonomy.experiences.present': 'Actual',
  'pages.projects.sectionLabel': '// PROJECTS_SHOWCASE',
  'pages.projects.title': 'Proyectos',
  'pages.projects.description':
    'Una colección de aplicaciones reales, trabajos académicos y experimentos personales.',
  'pages.projects.snapshot.label': 'Panorama de casos',
  'pages.projects.snapshot.title': 'Trabajo publicado con assets reales vinculados',
  'pages.projects.snapshot.description':
    'La barra lateral resume densidad de featured, referencias vinculadas y la señal de stack más amplia ya expuesta por el endpoint público de proyectos.',
  'pages.projects.snapshot.loading': 'Cargando casos reales de proyecto...',
  'pages.projects.snapshot.error': 'El endpoint de projects no está disponible ahora.',
  'pages.projects.filters.label': 'Filtros de casos',
  'pages.projects.filters.title':
    'Recorta el portfolio por contexto, entorno, estado y orden de lectura',
  'pages.projects.filters.description':
    'La UI se mantiene ligera mientras las relaciones de proyecto, experiencia, imagen y links llegan directamente del backend.',
  'pages.projects.filters.context': 'Contexto',
  'pages.projects.filters.environment': 'Entorno',
  'pages.projects.filters.status': 'Estado',
  'pages.projects.filters.sort': 'Ordenar por',
  'pages.projects.filters.total': 'proyectos',
  'pages.projects.search.placeholder': 'Buscar proyectos...',
  'pages.projects.catalog.label': 'Casos',
  'pages.projects.catalog.title': 'Proyectos como casos, no solo entradas',
  'pages.projects.catalog.description':
    'Cada caso conecta período, stack, contexto de entrega, empresas, deploys, repositorios y screenshots en el mismo bloque de lectura.',
  'pages.projects.catalog.loading': 'Construyendo los casos de proyecto...',
  'pages.projects.catalog.error': 'El endpoint de projects no está disponible ahora.',
  'pages.projects.catalog.empty': 'Ningún proyecto publicado coincide con los filtros actuales.',
  'pages.projects.card.featured': 'Destacado',
  'pages.projects.card.highlight': 'Destacado',
  'pages.projects.card.technologies': 'Tecnologías',
  'pages.projects.card.companies': 'Empresas',
  'pages.projects.card.emptyCompanies': 'Todavía no hay empresas vinculadas.',
  'pages.projects.card.links': 'Links y referencias',
  'pages.projects.card.emptyLinks': 'Todavía no se vinculó ningún link publicado a este caso.',
  'pages.projects.card.assets': 'Assets vinculados',
  'pages.projects.detail.linksCount': 'links',
  'pages.projects.detail.imagesCount': 'imágenes',
  'pages.projects.detail.relatedExperiences': 'Experiencias relacionadas',
  'pages.projects.detail.noExperiences': 'Todavía no se publicó ninguna experiencia relacionada.',
  'pages.projects.detail.tags': 'Tags del caso',
  'pages.projects.detail.noTags': 'Todavía no se vinculó ninguna tag publicada.',
  'pages.projects.detail.clients': '// clientes',
  'pages.projects.detail.techStack': '// stack_tecnico',
  'pages.projects.detail.analytics': 'Analítica del caso',
  'pages.projects.detail.gallery': 'Galería ampliada',
  'pages.projects.detail.chart.series': 'Densidad',
  'pages.projects.detail.chart.technologies': 'Tecnologías',
  'pages.projects.detail.chart.companies': 'Empresas',
  'pages.projects.detail.chart.links': 'Links',
  'pages.projects.detail.chart.images': 'Imágenes',
  'taxonomy.projects.filters.allContexts': 'Todos',
  'taxonomy.projects.filters.allEnvironments': 'Todos los entornos',
  'taxonomy.projects.filters.allStatuses': 'Todos los estados',
  'taxonomy.projects.context.formation': 'Formación',
  'taxonomy.projects.sort.featured': 'Destacados primero',
  'taxonomy.projects.sort.recent': 'Inicio más reciente',
  'taxonomy.projects.sort.stack': 'Stack más amplia',
  'taxonomy.projects.sort.links': 'Más assets vinculados',
  'taxonomy.projects.linkType.github': 'GitHub',
  'taxonomy.projects.linkType.deploy': 'Deploy',
  'taxonomy.projects.linkType.sourceCode': 'Código fuente',
  'taxonomy.projects.summary.total': 'Casos publicados',
  'taxonomy.projects.summary.featured': 'Destacados',
  'taxonomy.projects.summary.inProgress': 'En progreso',
  'taxonomy.projects.summary.linkedAssets': 'Assets vinculados',
  'taxonomy.projects.summary.richestStack': 'Stack más amplia',
  'taxonomy.projects.fallback.noAssets': 'Todavía no se publicó ningún asset visual vinculado.',
  'taxonomy.projects.fallback.noLinks': 'Todavía no se vinculó ningún link publicado.',
  'taxonomy.projects.fallback.noCompanies': 'Todavía no hay empresas vinculadas.',
  'taxonomy.projects.fallback.untitledLink': 'Link sin título',
  'pages.dashboard.sectionLabel': 'Fundación',
  'pages.dashboard.title': 'Dashboard analítico',
  'pages.dashboard.description':
    'Señales agregadas entre proyectos, stack y carrera ahora viven en una ruta propia, alimentada por los endpoints públicos de dashboard.',
  'pages.dashboard.snapshot.label': 'Snapshot',
  'pages.dashboard.snapshot.title': 'Huella publicada en una sola lectura',
  'pages.dashboard.snapshot.description':
    'La sidebar concentra los contadores principales de la API para resumir rápidamente el dataset público actual.',
  'pages.dashboard.snapshot.loading': 'Cargando agregados del dashboard...',
  'pages.dashboard.snapshot.error':
    'Los endpoints agregados del dashboard no están disponibles ahora.',
  'pages.dashboard.snapshot.metrics.projects': 'Proyectos',
  'pages.dashboard.snapshot.metrics.experiences': 'Experiencias',
  'pages.dashboard.snapshot.metrics.technologies': 'Tecnologías',
  'pages.dashboard.snapshot.metrics.formations': 'Formaciones / idiomas',
  'pages.dashboard.snapshot.metrics.customers': 'Clientes',
  'pages.dashboard.snapshot.metrics.jobs': 'Cargos',
  'pages.dashboard.snapshot.metrics.languages': 'Idiomas',
  'pages.dashboard.stacks.label': 'Distribución de stack',
  'pages.dashboard.stacks.title': 'Dónde el portfolio carga hoy más peso técnico',
  'pages.dashboard.stacks.description':
    'Cada área combina proyectos relacionados y tecnologías mapeadas para dejar claras las zonas más fuertes al instante.',
  'pages.dashboard.stacks.loading': 'Cargando distribución de stack...',
  'pages.dashboard.stacks.error':
    'Los endpoints agregados del dashboard no están disponibles ahora.',
  'pages.dashboard.stacks.empty': 'Todavía no se devolvió ninguna distribución de stack.',
  'pages.dashboard.stacks.projects': 'proyectos',
  'pages.dashboard.stacks.technologies': 'tecnologías',
  'pages.dashboard.distribution.label': 'Huella de proyectos',
  'pages.dashboard.distribution.title': 'Contexto de entrega, ambientes y densidad de destaque',
  'pages.dashboard.distribution.description':
    'Este bloque separa volumen destacado, contexto y ambiente para que el catálogo de proyectos sea más legible.',
  'pages.dashboard.distribution.loading': 'Cargando agregados de distribución de proyectos...',
  'pages.dashboard.distribution.error':
    'Los endpoints agregados del dashboard no están disponibles ahora.',
  'pages.dashboard.distribution.empty':
    'Todavía no se devolvió ningún dato de distribución de proyectos.',
  'pages.dashboard.distribution.featured': 'Destacados',
  'pages.dashboard.distribution.highlighted': 'Highlights',
  'pages.dashboard.distribution.total': 'Total de proyectos',
  'pages.dashboard.distribution.contexts': 'Contextos',
  'pages.dashboard.distribution.environments': 'Ambientes',
  'pages.dashboard.technology.label': 'Uso de tecnología',
  'pages.dashboard.technology.title': 'Señales de uso de stack',
  'pages.dashboard.technology.description':
    'Las tecnologías líderes y sus patrones de frecuencia, contexto y origen salen directo de las relaciones agregadas de la API.',
  'pages.dashboard.technology.loading': 'Cargando agregados de uso de tecnología...',
  'pages.dashboard.technology.error':
    'Los endpoints agregados del dashboard no están disponibles ahora.',
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
  'pages.dashboard.projectsByType.loading':
    'Cargando la distribución de tecnologías por proyecto...',
  'pages.dashboard.projectsByType.error':
    'La distribución de tecnologías por proyecto no está disponible ahora.',
  'pages.dashboard.projectsByType.empty':
    'Todavía no se devolvió ninguna distribución de tecnologías por proyecto.',
  'pages.dashboard.projectsByType.selectLabel': 'Tipo de tecnología',
  'pages.dashboard.timeline.label': 'Carrera',
  'pages.dashboard.timeline.title': 'Timeline de foco profesional',
  'pages.dashboard.timeline.description':
    'La timeline pública se vuelve una capa analítica para mostrar capítulos activos, densidad de highlight y distribución entre proyectos y clientes.',
  'pages.dashboard.timeline.loading': 'Cargando agregados de la timeline profesional...',
  'pages.dashboard.timeline.error':
    'Los endpoints agregados del dashboard no están disponibles ahora.',
  'pages.dashboard.timeline.empty':
    'Todavía no se devolvió ningún item de la timeline profesional.',
  'pages.dashboard.timeline.current': 'Actual',
  'pages.dashboard.timeline.highlight': 'Highlight',
  'pages.dashboard.timeline.customers': 'Clientes',
  'pages.dashboard.timeline.emptyCustomers': 'Todavía no hay clientes vinculados.',
  'pages.dashboard.timeline.projects': 'Proyectos',
  'pages.dashboard.timeline.emptyProjects': 'Todavía no hay proyectos vinculados.',
  'pages.dashboard.timeline.technologies': 'Tecnologías',
  'pages.dashboard.highlights.label': 'Highlights',
  'pages.dashboard.highlights.title': 'Destacados del portfolio',
  'pages.dashboard.highlights.description':
    'Las entidades marcadas en el backend siguen visibles aquí como prueba de repertorio entre proyectos, experiencia y tecnología.',
  'pages.dashboard.highlights.loading': 'Cargando entidades destacadas del portfolio...',
  'pages.dashboard.highlights.error':
    'Los endpoints agregados del dashboard no están disponibles ahora.',
  'pages.dashboard.highlights.empty': 'Todavía no se devolvió ningún item destacado del portfolio.',
  'pages.dashboard.highlights.featured': 'Destacado',
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
  'pages.admin.relationMode.owner': 'Relaciones de la entidad dueña',
  'pages.admin.relationMode.dedicated': 'Entidad relacional dedicada',
  'pages.admin.entities.portfolio-settings.title': 'Portfolio settings',
  'pages.admin.entities.portfolio-settings.description':
    'Configuración global, destacados y ajustes estructurados que conducen la shell del portfolio.',
  'pages.admin.portfolioSettings.sectionLabel': '// PORTFOLIO_SETTINGS',
  'pages.admin.portfolioSettings.title': 'Portfolio settings',
  'pages.admin.portfolioSettings.description':
    'CRUD protegido y real para los ajustes en JSON que moldean la shell, los destacados y los contenidos estructurados.',
  'pages.admin.portfolioSettings.actions.create': 'Crear',
  'pages.admin.portfolioSettings.actions.submit': 'Guardar',
  'pages.admin.portfolioSettings.states.loading':
    'Cargando la colección protegida de portfolio settings...',
  'pages.admin.portfolioSettings.states.empty':
    'Todavía no se registró ningún portfolio setting protegido.',
  'pages.admin.portfolioSettings.card.key': 'Clave del setting',
  'pages.admin.portfolioSettings.card.description': 'Descripción',
  'pages.admin.portfolioSettings.card.emptyDescription':
    'Todavía no se registró una descripción para este setting.',
  'pages.admin.portfolioSettings.card.value': 'Valor JSON',
  'pages.admin.portfolioSettings.fields.key.label': 'Clave del setting',
  'pages.admin.portfolioSettings.fields.key.placeholder':
    'Ingresa la clave única del setting',
  'pages.admin.portfolioSettings.fields.description.label': 'Descripción',
  'pages.admin.portfolioSettings.fields.description.placeholder':
    'Describe la responsabilidad de este setting',
  'pages.admin.portfolioSettings.fields.value.label': 'Valor JSON',
  'pages.admin.portfolioSettings.fields.value.placeholder':
    'Ingresa un objeto, array o valor escalar JSON válido',
  'pages.admin.portfolioSettings.modal.create.title':
    'Crear portfolio setting',
  'pages.admin.portfolioSettings.modal.read.title':
    'Leer configuraciones del portfolio',
  'pages.admin.portfolioSettings.modal.read.description':
    'Revise las configuraciones JSON protegidas actuales y acceda directamente a los flujos de edicion o eliminacion desde cada registro.',
  'pages.admin.portfolioSettings.modal.pickUpdate.title':
    'Selecciona un setting para editar',
  'pages.admin.portfolioSettings.modal.pickUpdate.description':
    'Elige uno de los settings protegidos actuales para abrir su formulario de edición.',
  'pages.admin.portfolioSettings.modal.pickDelete.title':
    'Selecciona un setting para eliminar',
  'pages.admin.portfolioSettings.modal.pickDelete.description':
    'Elige uno de los settings protegidos actuales para confirmar su eliminación.',
  'pages.admin.portfolioSettings.modal.update.title':
    'Editar portfolio setting',
  'pages.admin.portfolioSettings.modal.delete.title':
    'Eliminar portfolio setting',
  'pages.admin.portfolioSettings.modal.delete.description':
    'Esta acción elimina permanentemente el setting protegido seleccionado de la configuración del portfolio.',
  'pages.admin.portfolioSettings.feedback.created':
    'Portfolio setting creado con éxito.',
  'pages.admin.portfolioSettings.feedback.updated':
    'Portfolio setting actualizado con éxito.',
  'pages.admin.portfolioSettings.feedback.deleted':
    'Portfolio setting eliminado con éxito.',
  'pages.admin.portfolioSettings.feedback.requiredKey':
    'La clave del setting es obligatoria antes de enviar.',
  'pages.admin.portfolioSettings.feedback.invalidJson':
    'El valor JSON es inválido. Revisa la estructura antes de enviar.',
  'pages.admin.portfolioSettings.feedback.missingSession':
    'La sesión administrativa autenticada no está disponible. Inicia sesión nuevamente para continuar.',
  'pages.admin.portfolioSettings.feedback.selectionRequired':
    'Selecciona un portfolio setting antes de continuar con esta acción.',
  'pages.admin.portfolioSettings.feedback.loadError':
    'La colección protegida de portfolio settings no puede cargarse ahora.',
  'pages.admin.portfolioSettings.feedback.saveError':
    'El portfolio setting no puede guardarse ahora.',
  'pages.admin.portfolioSettings.feedback.deleteError':
    'El portfolio setting no puede eliminarse ahora.',
  'pages.admin.entities.tags.title': 'Tags',
  'pages.admin.entities.tags.description':
    'Etiquetas reutilizables de clasificación compartidas entre proyectos, tecnologías y futuros flujos editoriales.',
  'pages.admin.tags.sectionLabel': '// TAGS',
  'pages.admin.tags.description':
    'CRUD protegido para etiquetas reutilizables que clasifican proyectos y tecnologías mediante arrays relacionales mantenidos por la propia tag.',
  'pages.admin.tags.actions.submit': 'Guardar',
  'pages.admin.tags.states.loading':
    'Cargando la colección protegida de tags...',
  'pages.admin.tags.states.empty':
    'Todavía no se registró ninguna tag protegida.',
  'pages.admin.tags.card.slug': 'Slug de la tag',
  'pages.admin.tags.card.namePt': 'Nombre en portugués',
  'pages.admin.tags.card.nameEn': 'Nombre en inglés',
  'pages.admin.tags.card.type': 'Tipo',
  'pages.admin.tags.card.sortOrder': 'Orden',
  'pages.admin.tags.card.projects': 'Proyectos',
  'pages.admin.tags.card.technologies': 'Tecnologías',
  'pages.admin.tags.card.emptyRelations':
    'Ningún registro relacionado está vinculado actualmente a esta tag.',
  'pages.admin.tags.fields.slug.label': 'Slug de la tag',
  'pages.admin.tags.fields.slug.placeholder':
    'Ingresa el slug único de la tag',
  'pages.admin.tags.fields.namePt.label': 'Nombre en portugués',
  'pages.admin.tags.fields.namePt.placeholder':
    'Ingresa el nombre de la tag en portugués',
  'pages.admin.tags.fields.nameEn.label': 'Nombre en inglés',
  'pages.admin.tags.fields.nameEn.placeholder':
    'Ingresa el nombre de la tag en inglés',
  'pages.admin.tags.fields.type.label': 'Tipo',
  'pages.admin.tags.fields.type.placeholder':
    'Seleccione el tipo de la tag',
  'pages.admin.tags.fields.type.empty':
    'No hay tipos de tag disponibles en este momento.',
  'pages.admin.tags.fields.sortOrder.label': 'Orden',
  'pages.admin.tags.fields.sortOrder.placeholder':
    'Ingresa el orden entero de la tag',
  'pages.admin.tags.fields.projects.label': 'Proyectos relacionados',
  'pages.admin.tags.fields.projects.description':
    'Selecciona todos los proyectos que deben exponer esta tag en sus relaciones públicas.',
  'pages.admin.tags.fields.projects.empty':
    'Ningún proyecto público está disponible para relacionar ahora.',
  'pages.admin.tags.fields.technologies.label': 'Tecnologías relacionadas',
  'pages.admin.tags.fields.technologies.description':
    'Selecciona todas las tecnologías que deben mantener esta tag en sus arrays relacionales.',
  'pages.admin.tags.fields.technologies.empty':
    'Ninguna tecnología pública está disponible para relacionar ahora.',
  'pages.admin.tags.modal.create.title': 'Crear tag',
  'pages.admin.tags.modal.read.title': 'Leer tags',
  'pages.admin.tags.modal.read.description':
    'Revise las tags protegidas actuales y abra directamente los flujos de edicion o eliminacion desde cada registro.',
  'pages.admin.tags.modal.pickUpdate.title':
    'Selecciona una tag para editar',
  'pages.admin.tags.modal.pickUpdate.description':
    'Elige una de las tags protegidas actuales para abrir su formulario de edición.',
  'pages.admin.tags.modal.pickDelete.title':
    'Selecciona una tag para eliminar',
  'pages.admin.tags.modal.pickDelete.description':
    'Elige una de las tags protegidas actuales para confirmar su eliminación.',
  'pages.admin.tags.modal.update.title': 'Editar tag',
  'pages.admin.tags.modal.delete.title': 'Eliminar tag',
  'pages.admin.tags.modal.delete.description':
    'Esta acción elimina permanentemente la tag protegida seleccionada y sus relaciones actuales del portfolio.',
  'pages.admin.tags.feedback.created':
    'Tag protegida creada con éxito.',
  'pages.admin.tags.feedback.updated':
    'Tag protegida actualizada con éxito.',
  'pages.admin.tags.feedback.deleted':
    'Tag protegida eliminada con éxito.',
  'pages.admin.tags.feedback.requiredSlug':
    'El slug de la tag es obligatorio antes de enviar.',
  'pages.admin.tags.feedback.requiredNamePt':
    'El nombre de la tag en portugués es obligatorio antes de enviar.',
  'pages.admin.tags.feedback.requiredNameEn':
    'El nombre de la tag en inglés es obligatorio antes de enviar.',
  'pages.admin.tags.feedback.requiredType':
    'El tipo de la tag es obligatorio antes de enviar.',
  'pages.admin.tags.feedback.invalidType':
    'Seleccione uno de los tipos de tag compatibles antes de enviar.',
  'pages.admin.tags.feedback.invalidSortOrder':
    'El orden debe ser un número entero válido.',
  'pages.admin.tags.feedback.missingSession':
    'La sesión administrativa autenticada no está disponible. Inicia sesión nuevamente para continuar.',
  'pages.admin.tags.feedback.selectionRequired':
    'Selecciona una tag protegida antes de continuar con esta acción.',
  'pages.admin.tags.feedback.loadError':
    'La colección protegida de tags no puede cargarse ahora.',
  'pages.admin.tags.feedback.saveError':
    'La tag protegida no puede guardarse ahora.',
  'pages.admin.tags.feedback.deleteError':
    'La tag protegida no puede eliminarse ahora.',
  'pages.admin.entities.links.title': 'Links',
  'pages.admin.entities.links.description':
    'Referencias externas como repositorios, demos, documentos y destinos complementarios de navegación.',
  'pages.admin.links.sectionLabel': '// LINKS',
  'pages.admin.links.description':
    'CRUD protegido para referencias externas reutilizables conectadas a proyectos, experiencias, tecnologías y futuros registros de formación mediante arrays relacionales propios.',
  'pages.admin.links.actions.submit': 'Guardar',
  'pages.admin.links.states.loading':
    'Cargando la colección protegida de links...',
  'pages.admin.links.states.empty':
    'Todavía no se registró ningún link protegido.',
  'pages.admin.links.card.url': 'URL',
  'pages.admin.links.card.labelPt': 'Etiqueta en portugués',
  'pages.admin.links.card.labelEn': 'Etiqueta en inglés',
  'pages.admin.links.card.descriptionPt': 'Descripción en portugués',
  'pages.admin.links.card.descriptionEn': 'Descripción en inglés',
  'pages.admin.links.card.type': 'Tipo',
  'pages.admin.links.card.sortOrder': 'Orden',
  'pages.admin.links.card.isPublished': 'Publicación',
  'pages.admin.links.card.projects': 'Proyectos',
  'pages.admin.links.card.experiences': 'Experiencias',
  'pages.admin.links.card.technologies': 'Tecnologías',
  'pages.admin.links.card.formations': 'Formaciones',
  'pages.admin.links.card.emptyRelations':
    'Ningún registro relacionado está vinculado actualmente a este link.',
  'pages.admin.links.card.emptyText':
    'Todavía no se registró ningún texto.',
  'pages.admin.links.fields.url.label': 'URL',
  'pages.admin.links.fields.url.placeholder':
    'Ingresa la URL pública del link',
  'pages.admin.links.fields.labelPt.label': 'Etiqueta en portugués',
  'pages.admin.links.fields.labelPt.placeholder':
    'Ingresa la etiqueta en portugués mostrada al visitante',
  'pages.admin.links.fields.labelEn.label': 'Etiqueta en inglés',
  'pages.admin.links.fields.labelEn.placeholder':
    'Ingresa la etiqueta en inglés mostrada al visitante',
  'pages.admin.links.fields.descriptionPt.label': 'Descripción en portugués',
  'pages.admin.links.fields.descriptionPt.placeholder':
    'Describe este link en portugués',
  'pages.admin.links.fields.descriptionEn.label': 'Descripción en inglés',
  'pages.admin.links.fields.descriptionEn.placeholder':
    'Describe este link en inglés',
  'pages.admin.links.fields.type.label': 'Tipo',
  'pages.admin.links.fields.type.placeholder':
    'Seleccione el tipo del link',
  'pages.admin.links.fields.type.empty':
    'No hay tipos de link disponibles en este momento.',
  'pages.admin.links.fields.sortOrder.label': 'Orden',
  'pages.admin.links.fields.sortOrder.placeholder':
    'Ingresa el orden entero del link',
  'pages.admin.links.fields.isPublished.label': 'Estado de publicación',
  'pages.admin.links.fields.isPublished.description':
    'Controla si esta referencia externa debe permanecer visible en el portfolio público.',
  'pages.admin.links.fields.isPublished.enabled': 'Publicado',
  'pages.admin.links.fields.isPublished.disabled': 'Oculto',
  'pages.admin.links.fields.projects.label': 'Proyectos relacionados',
  'pages.admin.links.fields.projects.description':
    'Selecciona todos los proyectos que deben exponer este link en sus referencias públicas.',
  'pages.admin.links.fields.projects.empty':
    'Ningún proyecto público está disponible para relacionar ahora.',
  'pages.admin.links.fields.experiences.label': 'Experiencias relacionadas',
  'pages.admin.links.fields.experiences.description':
    'Selecciona todas las experiencias que deben mantener este link en sus arrays relacionales.',
  'pages.admin.links.fields.experiences.empty':
    'Ninguna experiencia pública está disponible para relacionar ahora.',
  'pages.admin.links.fields.technologies.label': 'Tecnologías relacionadas',
  'pages.admin.links.fields.technologies.description':
    'Selecciona todas las tecnologías que deben exponer este link en futuros contextos públicos.',
  'pages.admin.links.fields.technologies.empty':
    'Ninguna tecnología pública está disponible para relacionar ahora.',
  'pages.admin.links.fields.formations.label': 'Formaciones relacionadas',
  'pages.admin.links.fields.formations.description':
    'Las relaciones de formaciones ya están soportadas en el payload y serán seleccionables en cuanto el catálogo público dedicado esté disponible.',
  'pages.admin.links.fields.formations.empty':
    'Aún no existe un catálogo público de formaciones disponible para selección relacional.',
  'pages.admin.links.modal.create.title': 'Crear link',
  'pages.admin.links.modal.read.title': 'Leer links',
  'pages.admin.links.modal.read.description':
    'Revise los links protegidos actuales y abra directamente los flujos de edición o eliminación desde cada registro.',
  'pages.admin.links.modal.pickUpdate.title':
    'Selecciona un link para editar',
  'pages.admin.links.modal.pickUpdate.description':
    'Elige uno de los links protegidos actuales para abrir su formulario de edición.',
  'pages.admin.links.modal.pickDelete.title':
    'Selecciona un link para eliminar',
  'pages.admin.links.modal.pickDelete.description':
    'Elige uno de los links protegidos actuales para confirmar su eliminación.',
  'pages.admin.links.modal.update.title': 'Editar link',
  'pages.admin.links.modal.delete.title': 'Eliminar link',
  'pages.admin.links.modal.delete.description':
    'Esta acción elimina permanentemente el link protegido seleccionado del portfolio.',
  'pages.admin.links.feedback.created':
    'Link protegido creado con éxito.',
  'pages.admin.links.feedback.updated':
    'Link protegido actualizado con éxito.',
  'pages.admin.links.feedback.deleted':
    'Link protegido eliminado con éxito.',
  'pages.admin.links.feedback.requiredUrl':
    'La URL del link es obligatoria antes de enviar.',
  'pages.admin.links.feedback.requiredType':
    'El tipo del link es obligatorio antes de enviar.',
  'pages.admin.links.feedback.invalidType':
    'Seleccione uno de los tipos de link compatibles antes de enviar.',
  'pages.admin.links.feedback.invalidSortOrder':
    'El orden debe ser un número entero válido.',
  'pages.admin.links.feedback.missingSession':
    'La sesión administrativa autenticada no está disponible. Inicia sesión nuevamente para continuar.',
  'pages.admin.links.feedback.selectionRequired':
    'Selecciona un link protegido antes de continuar con esta acción.',
  'pages.admin.links.feedback.loadError':
    'La colección protegida de links no puede cargarse ahora.',
  'pages.admin.links.feedback.saveError':
    'El link protegido no puede guardarse ahora.',
  'pages.admin.links.feedback.deleteError':
    'El link protegido no puede eliminarse ahora.',
  'pages.admin.imageAssets.sectionLabel': '// IMAGE_ASSETS',
  'pages.admin.imageAssets.description':
    'CRUD protegido para archivos multimedia normalizados conectados a proyectos, experiencias y tecnologías mediante arreglos relacionales propios.',
  'pages.admin.imageAssets.states.loading':
    'Cargando la colección protegida de image assets...',
  'pages.admin.imageAssets.states.empty':
    'Todavía no se registró ningún image asset protegido.',
  'pages.admin.imageAssets.card.fileName': 'Nombre del archivo',
  'pages.admin.imageAssets.card.filePath': 'Ruta del archivo',
  'pages.admin.imageAssets.card.folder': 'Carpeta',
  'pages.admin.imageAssets.card.kind': 'Tipo',
  'pages.admin.imageAssets.card.mimeType': 'MIME type',
  'pages.admin.imageAssets.card.dimensions': 'Dimensiones',
  'pages.admin.imageAssets.card.sortOrder': 'Orden',
  'pages.admin.imageAssets.card.altPt': 'Alt en portugués',
  'pages.admin.imageAssets.card.altEn': 'Alt en inglés',
  'pages.admin.imageAssets.card.captionPt': 'Leyenda en portugués',
  'pages.admin.imageAssets.card.captionEn': 'Leyenda en inglés',
  'pages.admin.imageAssets.card.isPublished': 'Publicación',
  'pages.admin.imageAssets.card.projects': 'Proyectos',
  'pages.admin.imageAssets.card.experiences': 'Experiencias',
  'pages.admin.imageAssets.card.technologies': 'Tecnologías',
  'pages.admin.imageAssets.card.emptyRelations':
    'Ningún registro relacionado está vinculado a este image asset en este momento.',
  'pages.admin.imageAssets.card.emptyText':
    'Todavía no se registró ningún texto.',
  'pages.admin.imageAssets.fields.fileName.label': 'Nombre del archivo',
  'pages.admin.imageAssets.fields.fileName.placeholder':
    'Ingresa el nombre único del archivo del asset',
  'pages.admin.imageAssets.fields.filePath.label': 'Ruta del archivo',
  'pages.admin.imageAssets.fields.filePath.placeholder':
    'Ingresa la ruta pública del archivo usada por el portfolio',
  'pages.admin.imageAssets.fields.folder.label': 'Carpeta',
  'pages.admin.imageAssets.fields.folder.placeholder':
    'Ingresa la carpeta del asset',
  'pages.admin.imageAssets.fields.kind.label': 'Tipo',
  'pages.admin.imageAssets.fields.kind.placeholder':
    'Selecciona el tipo del asset',
  'pages.admin.imageAssets.fields.kind.empty':
    'No hay tipos de image asset disponibles ahora.',
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
  'pages.admin.imageAssets.fields.mimeType.label': 'MIME type',
  'pages.admin.imageAssets.fields.mimeType.placeholder':
    'Ingresa el MIME type del asset',
  'pages.admin.imageAssets.fields.width.label': 'Ancho',
  'pages.admin.imageAssets.fields.width.placeholder':
    'Ingresa el ancho del asset en píxeles',
  'pages.admin.imageAssets.fields.height.label': 'Altura',
  'pages.admin.imageAssets.fields.height.placeholder':
    'Ingresa la altura del asset en píxeles',
  'pages.admin.imageAssets.fields.sortOrder.label': 'Orden',
  'pages.admin.imageAssets.fields.sortOrder.placeholder':
    'Ingresa el orden entero de exhibición',
  'pages.admin.imageAssets.fields.isPublished.label': 'Estado de publicación',
  'pages.admin.imageAssets.fields.isPublished.description':
    'Controla si este archivo multimedia debe permanecer disponible en el portfolio público.',
  'pages.admin.imageAssets.fields.isPublished.enabled': 'Publicado',
  'pages.admin.imageAssets.fields.isPublished.disabled': 'Oculto',
  'pages.admin.imageAssets.fields.projects.label': 'Proyectos relacionados',
  'pages.admin.imageAssets.fields.projects.description':
    'Selecciona todos los proyectos que deben exponer este archivo multimedia en su galería pública.',
  'pages.admin.imageAssets.fields.projects.empty':
    'Ningún proyecto público está disponible para relacionar ahora.',
  'pages.admin.imageAssets.fields.experiences.label': 'Experiencias relacionadas',
  'pages.admin.imageAssets.fields.experiences.description':
    'Selecciona todas las experiencias que deben mantener este archivo multimedia en sus arreglos relacionales.',
  'pages.admin.imageAssets.fields.experiences.empty':
    'Ninguna experiencia pública está disponible para relacionar ahora.',
  'pages.admin.imageAssets.fields.technologies.label': 'Tecnologías relacionadas',
  'pages.admin.imageAssets.fields.technologies.description':
    'Selecciona todas las tecnologías que deben exponer este archivo multimedia en sus referencias públicas.',
  'pages.admin.imageAssets.fields.technologies.empty':
    'Ninguna tecnología pública está disponible para relacionar ahora.',
  'pages.admin.imageAssets.modal.create.title': 'Crear image asset',
  'pages.admin.imageAssets.modal.read.title': 'Leer image assets',
  'pages.admin.imageAssets.modal.read.description':
    'Revisa los image assets protegidos actuales y abre flujos de edición o eliminación directamente desde cada registro.',
  'pages.admin.imageAssets.modal.pickUpdate.title':
    'Selecciona un image asset para editar',
  'pages.admin.imageAssets.modal.pickUpdate.description':
    'Elige uno de los image assets protegidos actuales para abrir su formulario de edición.',
  'pages.admin.imageAssets.modal.pickDelete.title':
    'Selecciona un image asset para eliminar',
  'pages.admin.imageAssets.modal.pickDelete.description':
    'Elige uno de los image assets protegidos actuales para confirmar su eliminación.',
  'pages.admin.imageAssets.modal.update.title': 'Editar image asset',
  'pages.admin.imageAssets.modal.delete.title': 'Eliminar image asset',
  'pages.admin.imageAssets.modal.delete.description':
    'Esta acción elimina permanentemente el image asset protegido seleccionado del portfolio.',
  'pages.admin.imageAssets.feedback.created':
    'Image asset protegido creado con éxito.',
  'pages.admin.imageAssets.feedback.updated':
    'Image asset protegido actualizado con éxito.',
  'pages.admin.imageAssets.feedback.deleted':
    'Image asset protegido eliminado con éxito.',
  'pages.admin.imageAssets.feedback.requiredFileName':
    'El nombre del archivo es obligatorio antes de enviar.',
  'pages.admin.imageAssets.feedback.requiredFilePath':
    'La ruta del archivo es obligatoria antes de enviar.',
  'pages.admin.imageAssets.feedback.requiredFolder':
    'La carpeta es obligatoria antes de enviar.',
  'pages.admin.imageAssets.feedback.requiredKind':
    'El tipo del image asset es obligatorio antes de enviar.',
  'pages.admin.imageAssets.feedback.invalidKind':
    'Selecciona uno de los tipos de image asset compatibles antes de enviar.',
  'pages.admin.imageAssets.feedback.requiredMimeType':
    'El MIME type es obligatorio antes de enviar.',
  'pages.admin.imageAssets.feedback.invalidSortOrder':
    'El orden debe ser un número entero válido.',
  'pages.admin.imageAssets.feedback.invalidDimensions':
    'El ancho y la altura deben ser números enteros válidos cuando se informen.',
  'pages.admin.imageAssets.feedback.missingSession':
    'La sesión administrativa autenticada no está disponible. Inicia sesión nuevamente para continuar.',
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
  'pages.admin.spokenLanguages.states.loading':
    'Cargando la colección protegida de idiomas...',
  'pages.admin.spokenLanguages.states.empty':
    'Todavía no se ha registrado ningún idioma protegido.',
  'pages.admin.spokenLanguages.card.code': 'Código',
  'pages.admin.spokenLanguages.card.namePt': 'Nombre en portugués',
  'pages.admin.spokenLanguages.card.nameEn': 'Nombre en inglés',
  'pages.admin.spokenLanguages.card.proficiency': 'Dominio',
  'pages.admin.spokenLanguages.card.highlight': 'Destacado',
  'pages.admin.spokenLanguages.card.sortOrder': 'Orden',
  'pages.admin.spokenLanguages.card.imageAssets': 'Image assets',
  'pages.admin.spokenLanguages.card.emptyRelations':
    'Ningún image asset relacionado está vinculado a esta entrada de idioma.',
  'pages.admin.spokenLanguages.fields.code.label': 'Código',
  'pages.admin.spokenLanguages.fields.code.placeholder':
    'Ingresa el código del idioma',
  'pages.admin.spokenLanguages.fields.namePt.label': 'Nombre en portugués',
  'pages.admin.spokenLanguages.fields.namePt.placeholder':
    'Ingresa el nombre del idioma en portugués',
  'pages.admin.spokenLanguages.fields.nameEn.label': 'Nombre en inglés',
  'pages.admin.spokenLanguages.fields.nameEn.placeholder':
    'Ingresa el nombre del idioma en inglés',
  'pages.admin.spokenLanguages.fields.proficiency.label': 'Dominio',
  'pages.admin.spokenLanguages.fields.proficiency.empty':
    'Ninguna opción de dominio está disponible en este momento.',
  'pages.admin.spokenLanguages.fields.highlight.label': 'Estado destacado',
  'pages.admin.spokenLanguages.fields.highlight.description':
    'Controla si este idioma debe seguir destacado en el portfolio público.',
  'pages.admin.spokenLanguages.fields.highlight.enabled': 'Destacado',
  'pages.admin.spokenLanguages.fields.highlight.disabled': 'Sin destacar',
  'pages.admin.spokenLanguages.fields.sortOrder.label': 'Orden',
  'pages.admin.spokenLanguages.fields.sortOrder.placeholder':
    'Ingresa el orden entero de exhibición',
  'pages.admin.spokenLanguages.fields.imageAssets.label':
    'Image assets relacionados',
  'pages.admin.spokenLanguages.fields.imageAssets.description':
    'Selecciona todos los image assets que deben representar visualmente este idioma en el portfolio público.',
  'pages.admin.spokenLanguages.fields.imageAssets.empty':
    'Ningún image asset público está disponible para relacionar ahora.',
  'pages.admin.spokenLanguages.modal.create.title': 'Crear spoken language',
  'pages.admin.spokenLanguages.modal.read.title': 'Leer spoken languages',
  'pages.admin.spokenLanguages.modal.read.description':
    'Revisa los spoken languages protegidos actuales y abre flujos de edición o eliminación directamente desde cada registro.',
  'pages.admin.spokenLanguages.modal.pickUpdate.title':
    'Selecciona un spoken language para editar',
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
  'pages.admin.spokenLanguages.feedback.created':
    'Spoken language protegido creado con éxito.',
  'pages.admin.spokenLanguages.feedback.updated':
    'Spoken language protegido actualizado con éxito.',
  'pages.admin.spokenLanguages.feedback.deleted':
    'Spoken language protegido eliminado con éxito.',
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
  'pages.admin.spokenLanguages.feedback.invalidSortOrder':
    'El orden debe ser un número entero válido.',
  'pages.admin.spokenLanguages.feedback.missingSession':
    'La sesión administrativa autenticada no está disponible. Inicia sesión nuevamente para continuar.',
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
  'pages.admin.customers.states.loading':
    'Cargando la colección protegida de customers...',
  'pages.admin.customers.states.empty':
    'Todavía no se ha registrado ningún customer protegido.',
  'pages.admin.customers.card.slug': 'Slug',
  'pages.admin.customers.card.name': 'Nombre',
  'pages.admin.customers.card.summaryPt': 'Resumen en portugués',
  'pages.admin.customers.card.summaryEn': 'Resumen en inglés',
  'pages.admin.customers.card.highlight': 'Destacado',
  'pages.admin.customers.card.isPublished': 'Estado de publicación',
  'pages.admin.customers.card.sortOrder': 'Orden',
  'pages.admin.customers.card.experiences': 'Experiences',
  'pages.admin.customers.card.imageAssets': 'Image assets',
  'pages.admin.customers.card.emptyRelations':
    'Ningún registro relacionado está conectado a este customer.',
  'pages.admin.customers.fields.slug.label': 'Slug',
  'pages.admin.customers.fields.slug.placeholder':
    'Ingresa el slug único del customer',
  'pages.admin.customers.fields.name.label': 'Nombre',
  'pages.admin.customers.fields.name.placeholder':
    'Ingresa el nombre del customer',
  'pages.admin.customers.fields.summaryPt.label': 'Resumen en portugués',
  'pages.admin.customers.fields.summaryPt.placeholder':
    'Ingresa el resumen en portugués del customer',
  'pages.admin.customers.fields.summaryEn.label': 'Resumen en inglés',
  'pages.admin.customers.fields.summaryEn.placeholder':
    'Ingresa el resumen en inglés del customer',
  'pages.admin.customers.fields.highlight.label': 'Estado destacado',
  'pages.admin.customers.fields.highlight.description':
    'Controla si este customer debe seguir destacado en las secciones públicas del portfolio.',
  'pages.admin.customers.fields.highlight.enabled': 'Destacado',
  'pages.admin.customers.fields.highlight.disabled': 'Sin destacar',
  'pages.admin.customers.fields.isPublished.label': 'Estado de publicación',
  'pages.admin.customers.fields.isPublished.description':
    'Controla si este customer debe permanecer visible en las experiences públicas.',
  'pages.admin.customers.fields.isPublished.enabled': 'Publicado',
  'pages.admin.customers.fields.isPublished.disabled': 'No publicado',
  'pages.admin.customers.fields.sortOrder.label': 'Orden',
  'pages.admin.customers.fields.sortOrder.placeholder':
    'Ingresa el orden entero de exhibición',
  'pages.admin.customers.fields.experiences.label': 'Experiences relacionadas',
  'pages.admin.customers.fields.experiences.description':
    'Selecciona todas las experiences que deben exponer este customer en el storytelling público.',
  'pages.admin.customers.fields.experiences.empty':
    'Ninguna experience está disponible para relacionar ahora.',
  'pages.admin.customers.fields.imageAssets.label':
    'Image assets relacionados',
  'pages.admin.customers.fields.imageAssets.description':
    'Selecciona todos los image assets vinculados a este customer.',
  'pages.admin.customers.fields.imageAssets.empty':
    'Ningún image asset está disponible para relacionar ahora.',
  'pages.admin.customers.modal.create.title': 'Crear customer',
  'pages.admin.customers.modal.read.title': 'Leer customers',
  'pages.admin.customers.modal.read.description':
    'Revisa los customers protegidos actuales y abre flujos de edición o eliminación directamente desde cada registro.',
  'pages.admin.customers.modal.pickUpdate.title':
    'Selecciona un customer para editar',
  'pages.admin.customers.modal.pickUpdate.description':
    'Elige uno de los customers protegidos actuales para abrir su formulario de edición.',
  'pages.admin.customers.modal.pickDelete.title':
    'Selecciona un customer para eliminar',
  'pages.admin.customers.modal.pickDelete.description':
    'Elige uno de los customers protegidos actuales para confirmar su eliminación.',
  'pages.admin.customers.modal.update.title': 'Editar customer',
  'pages.admin.customers.modal.delete.title': 'Eliminar customer',
  'pages.admin.customers.modal.delete.description':
    'Esta acción elimina permanentemente el customer protegido seleccionado del portfolio.',
  'pages.admin.customers.feedback.created':
    'Customer protegido creado con éxito.',
  'pages.admin.customers.feedback.updated':
    'Customer protegido actualizado con éxito.',
  'pages.admin.customers.feedback.deleted':
    'Customer protegido eliminado con éxito.',
  'pages.admin.customers.feedback.requiredSlug':
    'El slug del customer es obligatorio antes del envío.',
  'pages.admin.customers.feedback.requiredName':
    'El nombre del customer es obligatorio antes del envío.',
  'pages.admin.customers.feedback.requiredSummaryPt':
    'El resumen en portugués es obligatorio antes del envío.',
  'pages.admin.customers.feedback.requiredSummaryEn':
    'El resumen en inglés es obligatorio antes del envío.',
  'pages.admin.customers.feedback.invalidSortOrder':
    'El orden debe ser un número entero válido.',
  'pages.admin.customers.feedback.missingSession':
    'La sesión administrativa autenticada no está disponible. Inicia sesión nuevamente para continuar.',
  'pages.admin.customers.feedback.selectionRequired':
    'Selecciona un customer protegido antes de continuar con esta acción.',
  'pages.admin.customers.feedback.loadError':
    'La colección protegida de customers no puede cargarse ahora.',
  'pages.admin.customers.feedback.saveError':
    'El customer protegido no puede guardarse ahora.',
  'pages.admin.customers.feedback.deleteError':
    'El customer protegido no puede eliminarse ahora.',
  'pages.admin.entities.image-assets.title': 'Image assets',
  'pages.admin.entities.image-assets.description':
    'Registros normalizados de medios usados por el portfolio a través de relaciones de image assets.',
  'pages.admin.entities.spoken-languages.title': 'Spoken languages',
  'pages.admin.entities.spoken-languages.description':
    'Control administrativo de las entradas de dominio de idiomas mostradas en el perfil y en los contextos de skills.',
  'pages.admin.entities.customers.title': 'Customers',
  'pages.admin.entities.customers.description':
    'Organizaciones cliente referenciadas por el historial de experiencias y la narrativa basada en relaciones.',
  'pages.admin.entities.jobs.title': 'Jobs',
  'pages.admin.entities.jobs.description':
    'Catálogo de cargos para mantener nombres consistentes y mapeo relacional entre experiencias.',
  'pages.admin.entities.formations.title': 'Formations',
  'pages.admin.entities.formations.description':
    'Registros académicos y de formación profesional, incluyendo links, imágenes y relaciones de stack.',
  'pages.admin.entities.technologies.title': 'Technologies',
  'pages.admin.entities.technologies.description':
    'Catálogo principal de stack con destacados, métricas, tags y arrays relacionales administrados por la entidad.',
  'pages.admin.entities.technology-contexts.title': 'Technology contexts',
  'pages.admin.entities.technology-contexts.description':
    'La única entidad relacional dedicada, usada para registrar ventanas contextuales de uso para cada tecnología.',
  'pages.admin.entities.experiences.title': 'Experiences',
  'pages.admin.entities.experiences.description':
    'Registros del historial profesional con empresa, rol, cronología, clientes, proyectos y relaciones de stack.',
  'pages.admin.entities.projects.title': 'Projects',
  'pages.admin.entities.projects.description':
    'Entradas de proyecto en formato case study, con entorno, estado, período y arrays relacionales propios.',
  'taxonomy.dashboard.source.experience': 'Experiencia',
  'taxonomy.dashboard.source.project': 'Proyecto',
  'taxonomy.dashboard.source.formation': 'Formación',
} as const satisfies AppTranslationLanguage;
