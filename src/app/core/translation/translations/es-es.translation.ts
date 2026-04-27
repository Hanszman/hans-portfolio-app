import { AppTranslationLanguage } from '../translation.types';
import { EN_TRANSLATIONS } from './en-us.translation';

export const ES_ES_TRANSLATIONS = {
  ...EN_TRANSLATIONS,
  'shell.api.connected.title': 'API conectada',
  'shell.api.connected.description':
    'Health check ejecutado con exito en {{ checkedAtUtc }}.',
  'shell.api.loading.title': 'Conectando con la API',
  'shell.api.loading.description':
    'Comprobando la disponibilidad del backend para el entorno actual.',
  'shell.api.blocked.title': 'Solicitud a la API bloqueada',
  'shell.api.blocked.description':
    'El navegador no pudo completar la solicitud inicial al backend desde {{ origin }}. La API puede estar online, pero el acceso aun puede estar bloqueado por CORS o por una politica de red.',
  'shell.api.error.title': 'La solicitud a la API fallo',
  'shell.api.error.description':
    'No fue posible completar el health check inicial del backend en el entorno actual.',
  'header.brand.role': 'Full Stack Engineer | Especialista Front-End',
  'header.tags.angular': 'Angular 20',
  'header.tags.signals': 'Signals first',
  'header.tags.api': 'API activa',
  'header.controls.theme': 'Tema',
  'header.controls.darkMode': 'Modo oscuro',
  'header.controls.darkTheme': 'Tema oscuro',
  'header.controls.lightTheme': 'Tema claro',
  'header.controls.language': 'Idioma',
  'header.controls.noLanguages': 'Ningun idioma disponible',
  'header.controls.portuguese': 'Portugues',
  'header.controls.english': 'Ingles',
  'header.controls.spanish': 'Espanol',
  'header.statusLabel': 'Estado de la fundacion',
  'header.eyebrow': 'Fundacion del remake del portfolio',
  'header.title':
    'Una shell especifica del portfolio, ya conectada a datos reales del backend.',
  'header.description':
    'Esta primera capa de layout establece la estructura del portfolio, mantiene la app alineada con la design lib y prepara las proximas iteraciones visuales sobre una shell Angular responsiva.',
  'header.highlight.layout.label': 'Layout',
  'header.highlight.layout.title': 'Header, footer, nav y wrappers de pagina',
  'header.highlight.layout.description':
    'Composicion especifica del portfolio organizada dentro de la capa de layout de la app.',
  'header.highlight.integration.label': 'Integracion',
  'header.highlight.integration.title': 'API real desde el inicio',
  'header.highlight.integration.description':
    'La shell sigue conectada al backend para que cada proxima pagina evolucione con datos reales.',
  'header.highlight.direction.label': 'Direccion',
  'header.highlight.direction.title':
    'Design-lib primero, estructura especifica del portfolio despues',
  'header.highlight.direction.description':
    'Los componentes reutilizables de la lib siguen como base mientras el layout unico del portfolio vive aqui.',
  'footer.eyebrow': 'Shell del portfolio',
  'footer.title': 'Base de layout lista para las proximas paginas',
  'footer.description':
    'La shell especifica del portfolio ahora separa layout de pages, mantiene la navegacion centralizada por la configuracion de rutas y sigue alineada con la design lib.',
  'footer.navigationLabel': 'Navegacion del footer',
  'footer.principlesLabel': 'Principios de implementacion',
  'footer.tags.standalone': 'Solo standalone',
  'footer.tags.tailwind': 'Tailwind @apply',
  'footer.tags.coverage': '100% coverage',
  'pages.home.sectionLabel': 'Fundacion',
  'pages.home.title': 'Fundacion de la home',
  'pages.home.description':
    'La ruta home ya esta conectada y lista para el proximo hero, highlights y resumen del portfolio via API.',
  'pages.home.hero.eyebrow': 'Home estrategica del portfolio',
  'pages.home.hero.title':
    'Victor Hanszman construye plataformas front-end que transforman productos complejos en experiencias claras y duraderas.',
  'pages.home.hero.description':
    'Ingeniero full stack con fuerte especializacion en front-end, enfocado en Angular, TypeScript, design systems, dashboards analiticos, modernizacion de legados y experiencias guiadas por API.',
  'pages.home.cta.projects': 'Ver proyectos',
  'pages.home.cta.dashboard': 'Abrir dashboard',
  'pages.home.metrics.years.label': 'Experiencia',
  'pages.home.metrics.years.description': 'Anos construyendo productos web',
  'pages.home.metrics.projects.label': 'Proyectos',
  'pages.home.metrics.projects.description': 'Casos publicados en el portfolio',
  'pages.home.metrics.technologies.label': 'Tecnologias',
  'pages.home.metrics.technologies.description': 'Senales de stack mapeadas',
  'pages.home.metrics.experiences.label': 'Experiencias',
  'pages.home.metrics.experiences.description': 'Capitulos de carrera en la API',
  'pages.home.api.label': 'API real',
  'pages.home.api.title': 'Datos reales desde la primera pantalla',
  'pages.home.api.description':
    'La home ya lee el endpoint agregado de dashboard, asi que el portfolio evoluciona desde el backend en lugar de mocks estaticos.',
  'pages.home.api.loading': 'Conectando datos reales del portfolio...',
  'pages.home.api.error':
    'El endpoint de dashboard no esta disponible ahora, pero la pagina mantiene su contenido estrategico listo.',
  'pages.home.api.featuredProjects': 'Destacados',
  'pages.home.api.highlightedProjects': 'Resaltados',
  'pages.home.api.usageLinks': 'Links de stack',
  'pages.home.pillars.label': 'Posicionamiento',
  'pages.home.pillars.title': 'Craft front-end senior con contexto full stack',
  'pages.home.pillars.description':
    'La home empieza dejando clara la senal profesional: arquitectura, calidad de entrega y claridad de producto.',
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
    'Habitos de calidad que sobreviven a la presion de release',
  'pages.home.pillars.delivery.description':
    'Disciplina test-first, codigo lintado, vision de CI/CD y contratos de backend que vuelven predecible la evolucion del producto.',
  'pages.home.pillars.delivery.tag.tdd': 'TDD',
  'pages.home.pillars.delivery.tag.ci': 'CI/CD',
  'pages.home.pillars.delivery.tag.api': 'REST APIs',
  'pages.home.pillars.product.label': 'Producto',
  'pages.home.pillars.product.title':
    'Interfaces que vuelven legible la regla de negocio',
  'pages.home.pillars.product.description':
    'Dashboards, migraciones de legado y flujos corporativos convertidos en pantallas faciles de escanear y confiar.',
  'pages.home.pillars.product.tag.dashboard': 'Dashboards',
  'pages.home.pillars.product.tag.legacy': 'Modernizacion de legados',
  'pages.home.pillars.product.tag.ux': 'Claridad de UX',
  'pages.home.highlights.label': 'Highlights',
  'pages.home.highlights.title':
    'Senales destacadas provenientes de la API del portfolio',
  'pages.home.highlights.description':
    'Proyectos, experiencias, tecnologias y activos de carrera marcados como destacados en el backend.',
  'pages.home.highlights.featured': 'Destacado',
  'pages.home.highlights.empty':
    'Todavia no se devolvio ningun item destacado del portfolio.',
  'pages.home.stack.label': 'Stack',
  'pages.home.stack.title': 'Areas de stack con vinculos reales del portfolio',
  'pages.home.stack.description':
    'Los grupos mas fuertes vienen de relaciones entre proyectos y tecnologias ya modeladas por la API.',
  'pages.home.stack.projects': 'proyectos',
  'pages.home.stack.technologies': 'tecnologias',
  'pages.home.stack.empty':
    'Todavia no se devolvio ninguna distribucion de stack.',
  'pages.home.career.label': 'Carrera',
  'pages.home.career.title': 'Foco profesional actual',
  'pages.home.career.description':
    'La primera senal de carrera viene del endpoint publico de timeline profesional.',
  'pages.home.career.empty':
    'Todavia no se devolvio ningun item de timeline profesional.',
  'pages.home.topTechnologies.label': 'Uso de tecnologia',
  'pages.home.topTechnologies.title': 'Tecnologias mas conectadas',
  'pages.home.topTechnologies.description':
    'Las tecnologias principales estan rankeadas por sus relaciones de uso en proyectos, experiencias y formaciones.',
  'pages.home.topTechnologies.empty':
    'Todavia no se devolvio ningun dato de uso de tecnologia.',
  'pages.home.roadmap.label': 'Roadmap',
  'pages.home.roadmap.title': 'Hero, highlights y resumen via API',
  'pages.home.roadmap.description':
    'La home presentara a Victor, reforzara el posicionamiento y mostrara las primeras cards de resumen desde el backend.',
  'pages.home.status.label': 'Estado',
  'pages.home.status.title': 'Shell lista',
  'pages.home.status.description':
    'Esta ruta ya esta dentro de la nueva shell del portfolio y lista para la implementacion del hero, highlights y resumen via API.',
  'pages.home.layout.label': 'Capa de layout',
  'pages.home.layout.title': 'Componente especifico de la pagina',
  'pages.home.layout.description':
    'El contenido ahora vive en el componente Home en lugar de pasar como route data estatica.',
  'pages.experiences.sectionLabel': 'Carrera',
  'pages.experiences.title': 'Narrativa de carrera',
  'pages.experiences.description':
    'Los capitulos de carrera ahora leen el endpoint publico de experiences y transforman relaciones en una timeline profesional facil de escanear.',
  'pages.experiences.snapshot.label': 'Panorama',
  'pages.experiences.snapshot.title':
    'Cobertura de la trayectoria proveniente de la API real',
  'pages.experiences.snapshot.description':
    'Conteos, senal del rol actual y amplitud de relaciones salen directamente de la coleccion publicada de experiences.',
  'pages.experiences.snapshot.loading':
    'Cargando relaciones reales de experiences...',
  'pages.experiences.snapshot.error':
    'El endpoint de experiences no esta disponible ahora.',
  'pages.experiences.snapshot.metrics.currentRole': 'Rol actual',
  'pages.experiences.snapshot.metrics.experiences': 'Capitulos',
  'pages.experiences.snapshot.metrics.projects': 'Proyectos',
  'pages.experiences.snapshot.metrics.technologies': 'Tecnologias',
  'pages.experiences.snapshot.metrics.customers': 'Clientes',
  'pages.experiences.snapshot.metrics.highlights': 'Destacados',
  'pages.experiences.timeline.label': 'Narrativa de carrera',
  'pages.experiences.timeline.title':
    'Timeline, contexto e impacto en el mismo flujo de lectura',
  'pages.experiences.timeline.description':
    'Cada capitulo conecta empresa, rol, clientes, proyectos y stack para que la historia profesional se lea como un sistema y no como una lista suelta.',
  'pages.experiences.timeline.loading':
    'Cargando relaciones reales de experiences...',
  'pages.experiences.timeline.error':
    'El endpoint de experiences no esta disponible ahora.',
  'pages.experiences.timeline.empty':
    'Todavia no se devolvio ningun capitulo publicado de experiencia.',
  'pages.experiences.timeline.current': 'Actual',
  'pages.experiences.timeline.highlight': 'Destacado',
  'pages.experiences.timeline.roles': 'Roles',
  'pages.experiences.timeline.customers': 'Clientes',
  'pages.experiences.timeline.emptyCustomers':
    'Todavia no hay ningun cliente vinculado.',
  'pages.experiences.timeline.technologyStack': 'Stack de tecnologia',
  'pages.experiences.timeline.relatedProjects': 'Proyectos relacionados',
  'pages.experiences.timeline.emptyProjects':
    'No se devolvio ningun proyecto relacionado para este capitulo.',
  'pages.skills.sectionLabel': 'Tecnologia',
  'pages.skills.title': 'Profundidad tecnica',
  'pages.skills.description':
    'La pagina de skills convierte `experienceMetrics` reales en un catalogo de tecnologias mas claro, con filtros utiles y lectura por contexto.',
  'pages.skills.snapshot.label': 'Resumen del portfolio',
  'pages.skills.snapshot.title': 'Tecnologias con metricas reales por contexto',
  'pages.skills.snapshot.description':
    'La barra lateral resume cobertura por categoria, densidad de destacados y la senal de mayor duracion publicada por la API.',
  'pages.skills.snapshot.loading':
    'Cargando metricas de experiencia de tecnologias...',
  'pages.skills.snapshot.error':
    'El endpoint de technologies no esta disponible ahora.',
  'pages.skills.filters.label': 'Filtros del catalogo',
  'pages.skills.filters.title':
    'Recorta el stack por categoria, nivel y contexto',
  'pages.skills.filters.description':
    'Los filtros siguen ligeros en la UI mientras las duraciones reales vienen del contrato del backend.',
  'pages.skills.filters.category': 'Categoria',
  'pages.skills.filters.level': 'Nivel',
  'pages.skills.filters.context': 'Contexto',
  'pages.skills.filters.total': 'Tecnologias filtradas',
  'pages.skills.catalog.label': 'Grupos de tecnologia',
  'pages.skills.catalog.title': 'Lectura agrupada para el filtro actual',
  'pages.skills.catalog.description':
    'Cada tarjeta destaca experiencia total y los contextos en los que esa stack ya fue usada.',
  'pages.skills.catalog.loading': 'Construyendo grupos de tecnologia...',
  'pages.skills.catalog.error':
    'El endpoint de technologies no esta disponible ahora.',
  'pages.skills.catalog.empty':
    'Ninguna tecnologia publicada coincide con los filtros actuales.',
  'pages.skills.card.highlight': 'Destacado',
  'pages.skills.card.totalExperience': 'Experiencia total',
  'pages.skills.card.contexts': 'Cobertura por contexto',
  'taxonomy.skills.filters.allCategories': 'Todas las categorias',
  'taxonomy.skills.filters.allLevels': 'Todos los niveles',
  'taxonomy.skills.filters.allContexts': 'Todos los contextos',
  'taxonomy.skills.fallback.uncategorized': 'Sin categoria',
  'taxonomy.skills.fallback.levelNotSet': 'Nivel no informado',
  'taxonomy.skills.fallback.frequencyNotSet': 'Frecuencia no informada',
  'taxonomy.skills.fallback.noDuration': 'Sin periodo consolidado',
  'taxonomy.skills.fallback.zeroMonths': '0 meses',
  'taxonomy.skills.summary.mapped': 'Tecnologias mapeadas',
  'taxonomy.skills.summary.highlights': 'Destacados',
  'taxonomy.skills.summary.categories': 'Categorias',
  'taxonomy.skills.summary.advanced': 'Stack avanzada',
  'taxonomy.skills.summary.longest': 'Mayor tiempo total',
  'taxonomy.skills.group.description':
    '{{count}} tecnologias con tiempo real consolidado por contexto.',
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
  'taxonomy.skills.context.academic': 'Academico',
  'taxonomy.skills.context.study': 'Estudio',
  'taxonomy.experiences.projectStatus.completed': 'Completado',
  'taxonomy.experiences.projectStatus.inProgress': 'En progreso',
  'taxonomy.experiences.projectEnvironment.frontend': 'Front-end',
  'taxonomy.experiences.projectEnvironment.backend': 'Back-end',
  'taxonomy.experiences.projectEnvironment.fullstack': 'Full stack',
  'taxonomy.experiences.present': 'Actual',
  'pages.projects.sectionLabel': 'Fundacion',
  'pages.projects.title': 'Fundacion de projects',
  'pages.projects.description':
    'La ruta projects esta lista para trabajos destacados, screenshots, links y datos de proyectos via API.',
  'pages.projects.roadmap.label': 'Roadmap',
  'pages.projects.roadmap.title':
    'Trabajos destacados, resultados y assets vinculados',
  'pages.projects.roadmap.description':
    'Esta pagina conectara proyectos con tecnologias, deploys, repositorios e imagenes de apoyo.',
  'pages.projects.status.label': 'Estado',
  'pages.projects.status.title':
    'Screenshots, links y referencias de deploy',
  'pages.projects.status.description':
    'El remake hara que cada proyecto sea mas facil de evaluar con assets mas ricos y referencias explicitas.',
  'pages.projects.layout.label': 'Capa de layout',
  'pages.projects.layout.title': 'Componente especifico de la pagina',
  'pages.projects.layout.description':
    'El contenido especifico de projects ahora vive en la page Projects y puede evolucionar sin acoplamiento con route data.',
  'pages.dashboard.sectionLabel': 'Fundacion',
  'pages.dashboard.title': 'Fundacion del dashboard',
  'pages.dashboard.description':
    'La ruta dashboard esta lista para metricas agregadas, graficos e insights del portfolio via API.',
  'pages.dashboard.roadmap.label': 'Roadmap',
  'pages.dashboard.roadmap.title':
    'Metricas operativas y datos agregados del portfolio',
  'pages.dashboard.roadmap.description':
    'Esta pagina evolucionara hacia la capa visual de resumen de totales, relaciones e indicadores de salud.',
  'pages.dashboard.status.label': 'Estado',
  'pages.dashboard.status.title': 'Graficos y salud del portfolio',
  'pages.dashboard.status.description':
    'La fundacion del dashboard esta aislada en su propia page para que graficos y metricas crezcan con claridad.',
  'pages.dashboard.layout.label': 'Capa de layout',
  'pages.dashboard.layout.title': 'Componente especifico de la pagina',
  'pages.dashboard.layout.description':
    'El contenido especifico del Dashboard ahora pertenece a la propia page en lugar de metadata de rutas.',
} as const satisfies AppTranslationLanguage;
