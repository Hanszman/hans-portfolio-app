import { AppTranslationLanguage } from '../translation.types';
import { EN_TRANSLATIONS } from './en-us.translation';

export const ES_ES_TRANSLATIONS = {
  ...EN_TRANSLATIONS,
  'shell.api.eyebrow': 'API',
  'shell.api.connected.title': 'API conectada',
  'shell.api.connected.description':
    'Health check ejecutado con éxito en {{ checkedAtUtc }}.',
  'shell.api.loading.title': 'Conectando con la API',
  'shell.api.loading.description':
    'Comprobando la disponibilidad del backend para el entorno actual.',
  'shell.api.blocked.title': 'Solicitud a la API bloqueada',
  'shell.api.blocked.description':
    'El navegador no pudo completar la solicitud inicial al backend desde {{ origin }}. La API puede estar online, pero el acceso aún puede estar bloqueado por CORS o por una política de red.',
  'shell.api.error.title': 'La solicitud a la API falló',
  'shell.api.error.description':
    'No fue posible completar el health check inicial del backend en el entorno actual.',
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
  'header.controls.navigation': 'MenÃº de navegaciÃ³n',
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
  'header.eyebrow': 'Fundación del remake del portfolio',
  'header.title':
    'Una shell específica del portfolio, ya conectada a datos reales del backend.',
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
  'footer.copyright.name': 'Victor Hanszman',
  'footer.copyright.year': '© {{ year }}',
  'common.actions.viewDetails': 'Ver detalles',
  'pages.home.sectionLabel': 'Fundación',
  'pages.home.title': 'Fundación de la home',
  'pages.home.description':
    'La ruta home ya está conectada y lista para el próximo hero, highlights y resumen del portfolio vía API.',
  'pages.home.hero.eyebrow': 'Home estratégica del portfolio',
  'pages.home.hero.title':
    'Victor Hanszman construye plataformas front-end que transforman productos complejos en experiencias claras y duraderas.',
  'pages.home.hero.description':
    'Ingeniero full stack con fuerte especialización en front-end, enfocado en Angular, TypeScript, design systems, dashboards analíticos, modernización de legados y experiencias guiadas por API.',
  'pages.home.cta.projects': 'Ver proyectos',
  'pages.home.cta.dashboard': 'Abrir dashboard',
  'pages.home.metrics.years.label': 'Experiencia',
  'pages.home.metrics.years.description': 'Años construyendo productos web',
  'pages.home.metrics.projects.label': 'Proyectos',
  'pages.home.metrics.projects.description': 'Casos publicados en el portfolio',
  'pages.home.metrics.technologies.label': 'Tecnologías',
  'pages.home.metrics.technologies.description': 'Señales de stack mapeadas',
  'pages.home.metrics.experiences.label': 'Experiencias',
  'pages.home.metrics.experiences.description': 'Capítulos de carrera en la API',
  'pages.home.api.label': 'API real',
  'pages.home.api.title': 'Datos reales desde la primera pantalla',
  'pages.home.api.description':
    'La home ya lee el endpoint agregado de dashboard, así que el portfolio evoluciona desde el backend en lugar de mocks estáticos.',
  'pages.home.api.loading': 'Conectando datos reales del portfolio...',
  'pages.home.api.error':
    'El endpoint de dashboard no está disponible ahora, pero la página mantiene su contenido estratégico listo.',
  'pages.home.api.featuredProjects': 'Destacados',
  'pages.home.api.highlightedProjects': 'Resaltados',
  'pages.home.api.usageLinks': 'Links de stack',
  'pages.home.pillars.label': 'Posicionamiento',
  'pages.home.pillars.title': 'Craft front-end senior con contexto full stack',
  'pages.home.pillars.description':
    'La home empieza dejando clara la señal profesional: arquitectura, calidad de entrega y claridad de producto.',
  'pages.home.pillars.architecture.label': 'Arquitectura',
  'pages.home.pillars.architecture.title':
    'Fundaciones front-end con Angular primero',
  'pages.home.pillars.architecture.description':
    'Estrategia de componentes, fronteras de estado, contratos tipados y sistemas de UI pensados para crecer sin volverse opacos.',
  'pages.home.pillars.architecture.tag.angular': 'Angular',
  'pages.home.pillars.architecture.tag.signals': 'Signals',
  'pages.home.pillars.architecture.tag.designSystem': 'Design Systems',
  'pages.home.pillars.delivery.label': 'Entrega',
  'pages.home.pillars.delivery.title':
    'Hábitos de calidad que sobreviven a la presión de release',
  'pages.home.pillars.delivery.description':
    'Disciplina test-first, código lintado, visión de CI/CD y contratos de backend que vuelven predecible la evolución del producto.',
  'pages.home.pillars.delivery.tag.tdd': 'TDD',
  'pages.home.pillars.delivery.tag.ci': 'CI/CD',
  'pages.home.pillars.delivery.tag.api': 'REST APIs',
  'pages.home.pillars.product.label': 'Producto',
  'pages.home.pillars.product.title':
    'Interfaces que vuelven legible la regla de negocio',
  'pages.home.pillars.product.description':
    'Dashboards, migraciones de legado y flujos corporativos convertidos en pantallas fáciles de escanear y confiar.',
  'pages.home.pillars.product.tag.dashboard': 'Dashboards',
  'pages.home.pillars.product.tag.legacy': 'Modernización de legados',
  'pages.home.pillars.product.tag.ux': 'Claridad de UX',
  'pages.home.highlights.label': 'Highlights',
  'pages.home.highlights.title':
    'Señales destacadas provenientes de la API del portfolio',
  'pages.home.highlights.description':
    'Proyectos, experiencias, tecnologías y activos de carrera marcados como destacados en el backend.',
  'pages.home.highlights.featured': 'Destacado',
  'pages.home.highlights.empty':
    'Todavía no se devolvió ningún item destacado del portfolio.',
  'pages.home.stack.label': 'Stack',
  'pages.home.stack.title': 'Áreas de stack con vínculos reales del portfolio',
  'pages.home.stack.description':
    'Los grupos más fuertes vienen de relaciones entre proyectos y tecnologías ya modeladas por la API.',
  'pages.home.stack.projects': 'proyectos',
  'pages.home.stack.technologies': 'tecnologías',
  'pages.home.stack.empty':
    'Todavía no se devolvió ninguna distribución de stack.',
  'pages.home.career.label': 'Carrera',
  'pages.home.career.title': 'Foco profesional actual',
  'pages.home.career.description':
    'La primera señal de carrera viene del endpoint público de timeline profesional.',
  'pages.home.career.empty':
    'Todavía no se devolvió ningún item de timeline profesional.',
  'pages.home.topTechnologies.label': 'Uso de tecnología',
  'pages.home.topTechnologies.title': 'Tecnologías más conectadas',
  'pages.home.topTechnologies.description':
    'Las tecnologías principales están rankeadas por sus relaciones de uso en proyectos, experiencias y formaciones.',
  'pages.home.topTechnologies.empty':
    'Todavía no se devolvió ningún dato de uso de tecnología.',
  'pages.home.roadmap.label': 'Roadmap',
  'pages.home.roadmap.title': 'Hero, highlights y resumen vía API',
  'pages.home.roadmap.description':
    'La home presentará a Victor, reforzará el posicionamiento y mostrará las primeras cards de resumen desde el backend.',
  'pages.home.status.label': 'Estado',
  'pages.home.status.title': 'Shell lista',
  'pages.home.status.description':
    'Esta ruta ya está dentro de la nueva shell del portfolio y lista para la implementación del hero, highlights y resumen vía API.',
  'pages.home.layout.label': 'Capa de layout',
  'pages.home.layout.title': 'Componente específico de la página',
  'pages.home.layout.description':
    'El contenido ahora vive en el componente Home en lugar de pasar como route data estática.',
  'pages.experiences.sectionLabel': 'Carrera',
  'pages.experiences.title': 'Narrativa de carrera',
  'pages.experiences.description':
    'Los capítulos de carrera ahora leen el endpoint público de experiences y transforman relaciones en una timeline profesional fácil de escanear.',
  'pages.experiences.snapshot.label': 'Panorama',
  'pages.experiences.snapshot.title':
    'Cobertura de la trayectoria proveniente de la API real',
  'pages.experiences.snapshot.description':
    'Conteos, señal del rol actual y amplitud de relaciones salen directamente de la colección publicada de experiences.',
  'pages.experiences.snapshot.loading':
    'Cargando relaciones reales de experiences...',
  'pages.experiences.snapshot.error':
    'El endpoint de experiences no está disponible ahora.',
  'pages.experiences.snapshot.metrics.currentRole': 'Rol actual',
  'pages.experiences.snapshot.metrics.experiences': 'Capítulos',
  'pages.experiences.snapshot.metrics.projects': 'Proyectos',
  'pages.experiences.snapshot.metrics.technologies': 'Tecnologías',
  'pages.experiences.snapshot.metrics.customers': 'Clientes',
  'pages.experiences.snapshot.metrics.highlights': 'Destacados',
  'pages.experiences.timeline.label': 'Narrativa de carrera',
  'pages.experiences.timeline.title':
    'Timeline, contexto e impacto en el mismo flujo de lectura',
  'pages.experiences.timeline.description':
    'Cada capítulo conecta empresa, rol, clientes, proyectos y stack para que la historia profesional se lea como un sistema y no como una lista suelta.',
  'pages.experiences.timeline.loading':
    'Cargando relaciones reales de experiences...',
  'pages.experiences.timeline.error':
    'El endpoint de experiences no está disponible ahora.',
  'pages.experiences.timeline.empty':
    'Todavía no se devolvió ningún capítulo publicado de experiencia.',
  'pages.experiences.timeline.current': 'Actual',
  'pages.experiences.timeline.highlight': 'Destacado',
  'pages.experiences.timeline.roles': 'Roles',
  'pages.experiences.timeline.customers': 'Clientes',
  'pages.experiences.timeline.emptyCustomers':
    'Todavía no hay ningún cliente vinculado.',
  'pages.experiences.timeline.technologyStack': 'Stack de tecnología',
  'pages.experiences.timeline.relatedProjects': 'Proyectos relacionados',
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
  'pages.skills.sectionLabel': 'Tecnología',
  'pages.skills.title': 'Profundidad técnica',
  'pages.skills.description':
    'La página de skills convierte `experienceMetrics` reales en un catálogo de tecnologías más claro, con filtros útiles y lectura por contexto.',
  'pages.skills.snapshot.label': 'Resumen del portfolio',
  'pages.skills.snapshot.title': 'Tecnologías con métricas reales por contexto',
  'pages.skills.snapshot.description':
    'La barra lateral resume cobertura por categoría, densidad de destacados y la señal de mayor duración publicada por la API.',
  'pages.skills.snapshot.loading':
    'Cargando métricas de experiencia de tecnologías...',
  'pages.skills.snapshot.error':
    'El endpoint de technologies no está disponible ahora.',
  'pages.skills.filters.label': 'Filtros del catálogo',
  'pages.skills.filters.title':
    'Recorta el stack por categoría, nivel y contexto',
  'pages.skills.filters.description':
    'Los filtros siguen ligeros en la UI mientras las duraciones reales vienen del contrato del backend.',
  'pages.skills.filters.category': 'Categoría',
  'pages.skills.filters.level': 'Nivel',
  'pages.skills.filters.context': 'Contexto',
  'pages.skills.filters.total': 'Tecnologías filtradas',
  'pages.skills.catalog.label': 'Grupos de tecnología',
  'pages.skills.catalog.title': 'Lectura agrupada para el filtro actual',
  'pages.skills.catalog.description':
    'Cada tarjeta destaca experiencia total y los contextos en los que esa stack ya fue usada.',
  'pages.skills.catalog.loading': 'Construyendo grupos de tecnología...',
  'pages.skills.catalog.error':
    'El endpoint de technologies no está disponible ahora.',
  'pages.skills.catalog.empty':
    'Ninguna tecnología publicada coincide con los filtros actuales.',
  'pages.skills.card.highlight': 'Destacado',
  'pages.skills.card.totalExperience': 'Experiencia total',
  'pages.skills.card.contexts': 'Cobertura por contexto',
  'pages.skills.detail.totalExperience': 'Experiencia consolidada',
  'pages.skills.detail.contextChart': 'Distribución por contexto',
  'pages.skills.detail.chartSeries': 'Meses',
  'pages.skills.detail.coverage': 'Cobertura detallada',
  'pages.skills.detail.timeline': 'Timeline de contexto',
  'pages.skills.detail.noTimeline':
    'No se devolvió ningún intervalo publicado.',
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
  'taxonomy.skills.frequency.frequent': 'Frecuente',
  'taxonomy.skills.frequency.occasional': 'Ocasional',
  'taxonomy.skills.frequency.rare': 'Rara',
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
  'pages.projects.sectionLabel': 'Proyectos',
  'pages.projects.title': 'Casos de proyecto',
  'pages.projects.description':
    'La ruta projects ahora lee la colección pública real y presenta el trabajo como casos con stack, referencias y assets de apoyo.',
  'pages.projects.snapshot.label': 'Panorama de casos',
  'pages.projects.snapshot.title': 'Trabajo publicado con assets reales vinculados',
  'pages.projects.snapshot.description':
    'La barra lateral resume densidad de featured, referencias vinculadas y la señal de stack más amplia ya expuesta por el endpoint público de proyectos.',
  'pages.projects.snapshot.loading': 'Cargando casos reales de proyecto...',
  'pages.projects.snapshot.error':
    'El endpoint de projects no está disponible ahora.',
  'pages.projects.filters.label': 'Filtros de casos',
  'pages.projects.filters.title':
    'Recorta el portfolio por contexto, entorno, estado y orden de lectura',
  'pages.projects.filters.description':
    'La UI se mantiene ligera mientras las relaciones de proyecto, experiencia, imagen y links llegan directamente del backend.',
  'pages.projects.filters.context': 'Contexto',
  'pages.projects.filters.environment': 'Entorno',
  'pages.projects.filters.status': 'Estado',
  'pages.projects.filters.sort': 'Ordenar por',
  'pages.projects.filters.total': 'Casos filtrados',
  'pages.projects.catalog.label': 'Casos',
  'pages.projects.catalog.title': 'Proyectos como casos, no solo entradas',
  'pages.projects.catalog.description':
    'Cada caso conecta período, stack, contexto de entrega, empresas, deploys, repositorios y screenshots en el mismo bloque de lectura.',
  'pages.projects.catalog.loading': 'Construyendo los casos de proyecto...',
  'pages.projects.catalog.error':
    'El endpoint de projects no está disponible ahora.',
  'pages.projects.catalog.empty':
    'Ningún proyecto publicado coincide con los filtros actuales.',
  'pages.projects.card.featured': 'Destacado',
  'pages.projects.card.highlight': 'Destacado',
  'pages.projects.card.technologies': 'Tecnologías',
  'pages.projects.card.companies': 'Empresas',
  'pages.projects.card.emptyCompanies': 'Todavía no hay empresas vinculadas.',
  'pages.projects.card.links': 'Links y referencias',
  'pages.projects.card.emptyLinks':
    'Todavía no se vinculó ningún link publicado a este caso.',
  'pages.projects.card.assets': 'Assets vinculados',
  'pages.projects.detail.linksCount': 'links',
  'pages.projects.detail.imagesCount': 'imágenes',
  'pages.projects.detail.relatedExperiences': 'Experiencias relacionadas',
  'pages.projects.detail.noExperiences':
    'Todavía no se publicó ninguna experiencia relacionada.',
  'pages.projects.detail.tags': 'Tags del caso',
  'pages.projects.detail.noTags':
    'Todavía no se vinculó ninguna tag publicada.',
  'pages.projects.detail.analytics': 'Analítica del caso',
  'pages.projects.detail.gallery': 'Galería ampliada',
  'pages.projects.detail.chart.series': 'Densidad',
  'pages.projects.detail.chart.technologies': 'Tecnologías',
  'pages.projects.detail.chart.companies': 'Empresas',
  'pages.projects.detail.chart.links': 'Links',
  'pages.projects.detail.chart.images': 'Imágenes',
  'taxonomy.projects.filters.allContexts': 'Todos los contextos',
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
  'taxonomy.projects.summary.inProgress': 'En progreso',
  'taxonomy.projects.summary.linkedAssets': 'Assets vinculados',
  'taxonomy.projects.summary.richestStack': 'Stack más amplia',
  'taxonomy.projects.fallback.noAssets':
    'Todavía no se publicó ningún asset visual vinculado.',
  'taxonomy.projects.fallback.noLinks':
    'Todavía no se vinculó ningún link publicado.',
  'taxonomy.projects.fallback.noCompanies':
    'Todavía no hay empresas vinculadas.',
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
  'pages.dashboard.stacks.title':
    'Dónde el portfolio carga hoy más peso técnico',
  'pages.dashboard.stacks.description':
    'Cada área combina proyectos relacionados y tecnologías mapeadas para dejar claras las zonas más fuertes al instante.',
  'pages.dashboard.stacks.loading': 'Cargando distribución de stack...',
  'pages.dashboard.stacks.error':
    'Los endpoints agregados del dashboard no están disponibles ahora.',
  'pages.dashboard.stacks.empty':
    'Todavía no se devolvió ninguna distribución de stack.',
  'pages.dashboard.stacks.projects': 'proyectos',
  'pages.dashboard.stacks.technologies': 'tecnologías',
  'pages.dashboard.distribution.label': 'Huella de proyectos',
  'pages.dashboard.distribution.title':
    'Contexto de entrega, ambientes y densidad de destaque',
  'pages.dashboard.distribution.description':
    'Este bloque separa volumen destacado, contexto y ambiente para que el catálogo de proyectos sea más legible.',
  'pages.dashboard.distribution.loading':
    'Cargando agregados de distribución de proyectos...',
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
  'pages.dashboard.technology.loading':
    'Cargando agregados de uso de tecnología...',
  'pages.dashboard.technology.error':
    'Los endpoints agregados del dashboard no están disponibles ahora.',
  'pages.dashboard.technology.empty':
    'Todavía no se devolvió ningún agregado de uso de tecnología.',
  'pages.dashboard.technology.levels': 'Niveles',
  'pages.dashboard.technology.frequencies': 'Frecuencias',
  'pages.dashboard.technology.contexts': 'Contextos',
  'pages.dashboard.technology.sources': 'Orígenes',
  'pages.dashboard.technology.links': 'señales vinculadas',
  'pages.dashboard.timeline.label': 'Carrera',
  'pages.dashboard.timeline.title': 'Timeline de foco profesional',
  'pages.dashboard.timeline.description':
    'La timeline pública se vuelve una capa analítica para mostrar capítulos activos, densidad de highlight y distribución entre proyectos y clientes.',
  'pages.dashboard.timeline.loading':
    'Cargando agregados de la timeline profesional...',
  'pages.dashboard.timeline.error':
    'Los endpoints agregados del dashboard no están disponibles ahora.',
  'pages.dashboard.timeline.empty':
    'Todavía no se devolvió ningún item de la timeline profesional.',
  'pages.dashboard.timeline.current': 'Actual',
  'pages.dashboard.timeline.highlight': 'Highlight',
  'pages.dashboard.timeline.customers': 'Clientes',
  'pages.dashboard.timeline.emptyCustomers':
    'Todavía no hay clientes vinculados.',
  'pages.dashboard.timeline.projects': 'Proyectos',
  'pages.dashboard.timeline.emptyProjects':
    'Todavía no hay proyectos vinculados.',
  'pages.dashboard.timeline.technologies': 'Tecnologías',
  'pages.dashboard.highlights.label': 'Highlights',
  'pages.dashboard.highlights.title': 'Destacados del portfolio',
  'pages.dashboard.highlights.description':
    'Las entidades marcadas en el backend siguen visibles aquí como prueba de repertorio entre proyectos, experiencia y tecnología.',
  'pages.dashboard.highlights.loading':
    'Cargando entidades destacadas del portfolio...',
  'pages.dashboard.highlights.error':
    'Los endpoints agregados del dashboard no están disponibles ahora.',
  'pages.dashboard.highlights.empty':
    'Todavía no se devolvió ningún item destacado del portfolio.',
  'pages.dashboard.highlights.featured': 'Destacado',
  'taxonomy.dashboard.source.experience': 'Experiencia',
  'taxonomy.dashboard.source.project': 'Proyecto',
  'taxonomy.dashboard.source.formation': 'Formación',
} as const satisfies AppTranslationLanguage;
