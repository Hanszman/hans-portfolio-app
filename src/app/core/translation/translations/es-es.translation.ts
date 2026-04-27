import { AppTranslationLanguage } from '../translation.types';
import { EN_TRANSLATIONS } from './en-us.translation';

export const ES_ES_TRANSLATIONS = {
  ...EN_TRANSLATIONS,
  'shell.api.connected.title': 'API conectada',
  'shell.api.loading.title': 'Conectando con la API',
  'shell.api.loading.description':
    'Comprobando la disponibilidad del backend para el entorno actual.',
  'shell.api.error.title': 'La solicitud a la API fallo',
  'header.brand.role': 'Full Stack Engineer | Especialista Front-End',
  'header.controls.theme': 'Tema',
  'header.controls.darkMode': 'Modo oscuro',
  'header.controls.darkTheme': 'Tema oscuro',
  'header.controls.lightTheme': 'Tema claro',
  'header.controls.language': 'Idioma',
  'header.controls.noLanguages': 'Ningun idioma disponible',
  'header.controls.portuguese': 'Portugues',
  'header.controls.english': 'Ingles',
  'header.controls.spanish': 'Espanol',
  'pages.skills.sectionLabel': 'Tecnologia',
  'pages.skills.title': 'Profundidad tecnica',
  'pages.skills.description':
    'La pagina de skills convierte `experienceMetrics` reales en un catalogo de tecnologias mas claro, con filtros utiles y lectura por contexto.',
  'pages.skills.snapshot.label': 'Resumen del portfolio',
  'pages.skills.snapshot.title':
    'Tecnologias con metricas reales por contexto',
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
} as const satisfies AppTranslationLanguage;
