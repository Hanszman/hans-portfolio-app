import {
  AppLocale,
  AppTranslationCatalog,
} from './translation.types';

export const DEFAULT_APP_LOCALE: AppLocale = 'en';

export const APP_LOCALE_STORAGE_KEY = 'hans-portfolio-locale';

export const APP_TRANSLATIONS = {
  en: {
    'shell.api.eyebrow': 'API',
    'shell.api.connected.title': 'API connected',
    'shell.api.connected.description':
      'Health check passed at {checkedAtUtc}.',
    'shell.api.loading.title': 'Connecting to API',
    'shell.api.loading.description':
      'Checking the backend availability for the current environment.',
    'shell.api.blocked.title': 'API request blocked',
    'shell.api.blocked.description':
      'The browser could not complete the initial backend request from {origin}. The API may be online, but the access can still be blocked by CORS or network policy.',
    'shell.api.error.title': 'API request failed',
    'shell.api.error.description':
      'The initial backend health check could not be completed for the current environment.',
    'header.brand.role': 'Full Stack Engineer | Front-End specialist',
    'header.tags.angular': 'Angular 20',
    'header.tags.signals': 'Signals first',
    'header.tags.api': 'API live',
    'header.controls.darkTheme': 'Dark theme',
    'header.controls.lightTheme': 'Light theme',
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
    'pages.experiences.roadmap.title':
      'Impact timeline and leadership narrative',
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
  },
  'pt-BR': {
    'shell.api.eyebrow': 'API',
    'shell.api.connected.title': 'API conectada',
    'shell.api.connected.description':
      'Health check executado com sucesso em {checkedAtUtc}.',
    'shell.api.loading.title': 'Conectando com a API',
    'shell.api.loading.description':
      'Verificando a disponibilidade do backend para o ambiente atual.',
    'shell.api.blocked.title': 'Requisicao da API bloqueada',
    'shell.api.blocked.description':
      'O navegador nao conseguiu concluir a requisicao inicial ao backend a partir de {origin}. A API pode estar online, mas o acesso ainda pode estar bloqueado por CORS ou politica de rede.',
    'shell.api.error.title': 'Requisicao da API falhou',
    'shell.api.error.description':
      'Nao foi possivel concluir o health check inicial do backend no ambiente atual.',
    'header.brand.role': 'Full Stack Engineer | Especialista Front-End',
    'header.tags.angular': 'Angular 20',
    'header.tags.signals': 'Signals first',
    'header.tags.api': 'API ativa',
    'header.controls.darkTheme': 'Tema escuro',
    'header.controls.lightTheme': 'Tema claro',
    'header.controls.portuguese': 'Portugues',
    'header.controls.english': 'Ingles',
    'header.statusLabel': 'Status da fundacao',
    'header.eyebrow': 'Fundacao do remake do portfolio',
    'header.title':
      'Uma shell especifica do portfolio, ja conectada a dados reais do backend.',
    'header.description':
      'Esta primeira camada de layout estabelece a estrutura do portfolio, mantem o app alinhado com a design lib e prepara as proximas iteracoes visuais sobre uma shell Angular responsiva.',
    'header.highlight.layout.label': 'Layout',
    'header.highlight.layout.title': 'Header, footer, nav e page wrappers',
    'header.highlight.layout.description':
      'Composicao especifica do portfolio organizada dentro da camada de layout do app.',
    'header.highlight.integration.label': 'Integracao',
    'header.highlight.integration.title': 'API real desde o inicio',
    'header.highlight.integration.description':
      'A shell permanece conectada ao backend para que cada proxima pagina evolua com dados reais.',
    'header.highlight.direction.label': 'Direcao',
    'header.highlight.direction.title':
      'Design-lib primeiro, estrutura especifica do portfolio depois',
    'header.highlight.direction.description':
      'Componentes reutilizaveis da lib continuam como base enquanto o layout unico do portfolio vive aqui.',
    'footer.eyebrow': 'Shell do portfolio',
    'footer.title': 'Fundacao de layout pronta para as proximas paginas',
    'footer.description':
      'A shell especifica do portfolio agora separa layout de pages, mantem a navegacao centralizada pela config de rotas e segue alinhada com a design lib.',
    'footer.navigationLabel': 'Navegacao do footer',
    'footer.principlesLabel': 'Principios de implementacao',
    'footer.tags.standalone': 'Somente standalone',
    'footer.tags.tailwind': 'Tailwind @apply',
    'footer.tags.coverage': '100% coverage',
    'pages.home.sectionLabel': 'Fundacao',
    'pages.home.title': 'Fundacao da home',
    'pages.home.description':
      'A rota home esta conectada e pronta para o proximo hero, highlights e resumo do portfolio via API.',
    'pages.home.roadmap.label': 'Roadmap',
    'pages.home.roadmap.title': 'Hero, highlights e resumo via API',
    'pages.home.roadmap.description':
      'A home vai apresentar Victor, reforcar posicionamento e exibir os primeiros cards de resumo vindos do backend.',
    'pages.home.status.label': 'Status',
    'pages.home.status.title': 'Shell pronta',
    'pages.home.status.description':
      'Esta rota ja esta dentro da nova shell do portfolio e pronta para a implementacao do hero, highlights e resumo via API.',
    'pages.home.layout.label': 'Camada de layout',
    'pages.home.layout.title': 'Componente especifico da pagina',
    'pages.home.layout.description':
      'O conteudo agora vive no componente Home em vez de ser passado como route data estatica.',
    'pages.experiences.sectionLabel': 'Fundacao',
    'pages.experiences.title': 'Fundacao de experiences',
    'pages.experiences.description':
      'A rota experiences esta pronta para timeline, narrativa de impacto e dados de carreira via API.',
    'pages.experiences.roadmap.label': 'Roadmap',
    'pages.experiences.roadmap.title':
      'Timeline de impacto e narrativa de lideranca',
    'pages.experiences.roadmap.description':
      'Esta pagina vai organizar a carreira por contexto, impacto, stack e relacionamentos vindos do backend.',
    'pages.experiences.status.label': 'Status',
    'pages.experiences.status.title': 'Storytelling de carreira',
    'pages.experiences.status.description':
      'A estrutura esta pronta para secoes mais ricas que tornam a trajetoria mais facil de escanear e entender.',
    'pages.experiences.layout.label': 'Camada de layout',
    'pages.experiences.layout.title': 'Componente especifico da pagina',
    'pages.experiences.layout.description':
      'Esta pagina agora possui seu proprio conteudo estatico de fundacao, sem receber isso por route data.',
    'pages.skills.sectionLabel': 'Fundacao',
    'pages.skills.title': 'Fundacao de skills',
    'pages.skills.description':
      'A rota skills esta pronta para tecnologias agrupadas, conceitos, patterns e metricas de experiencia.',
    'pages.skills.roadmap.label': 'Roadmap',
    'pages.skills.roadmap.title':
      'Clusters de tecnologia e metricas reais de experiencia',
    'pages.skills.roadmap.description':
      'Esta pagina vai consumir dados de skills do backend e organiza-los em filtros, grupos e resumos uteis.',
    'pages.skills.status.label': 'Status',
    'pages.skills.status.title': 'Conceitos, patterns e arquiteturas',
    'pages.skills.status.description':
      'O remake vai incluir conhecimento tecnico mais amplo, nao apenas tecnologias especificas.',
    'pages.skills.layout.label': 'Camada de layout',
    'pages.skills.layout.title': 'Componente especifico da pagina',
    'pages.skills.layout.description':
      'A composicao especifica de skills agora pode evoluir independente das outras rotas.',
    'pages.projects.sectionLabel': 'Fundacao',
    'pages.projects.title': 'Fundacao de projects',
    'pages.projects.description':
      'A rota projects esta pronta para trabalhos em destaque, screenshots, links e dados de projetos via API.',
    'pages.projects.roadmap.label': 'Roadmap',
    'pages.projects.roadmap.title':
      'Trabalhos em destaque, resultados e assets vinculados',
    'pages.projects.roadmap.description':
      'Esta pagina vai conectar projetos a tecnologias, deploys, repositorios e imagens de apoio.',
    'pages.projects.status.label': 'Status',
    'pages.projects.status.title': 'Screenshots, links e referencias de deploy',
    'pages.projects.status.description':
      'O remake vai tornar cada projeto mais facil de avaliar com assets mais ricos e referencias explicitas.',
    'pages.projects.layout.label': 'Camada de layout',
    'pages.projects.layout.title': 'Componente especifico da pagina',
    'pages.projects.layout.description':
      'O conteudo especifico de projects agora vive na page Projects e pode evoluir sem acoplamento com route data.',
    'pages.dashboard.sectionLabel': 'Fundacao',
    'pages.dashboard.title': 'Fundacao do dashboard',
    'pages.dashboard.description':
      'A rota dashboard esta pronta para metricas agregadas, graficos e insights do portfolio via API.',
    'pages.dashboard.roadmap.label': 'Roadmap',
    'pages.dashboard.roadmap.title':
      'Metricas operacionais e dados agregados do portfolio',
    'pages.dashboard.roadmap.description':
      'Esta pagina vai evoluir para a camada visual de resumo de totais, relacionamentos e indicadores de saude.',
    'pages.dashboard.status.label': 'Status',
    'pages.dashboard.status.title': 'Graficos e saude do portfolio',
    'pages.dashboard.status.description':
      'A fundacao do dashboard esta isolada em sua propria page para que graficos e metricas crescam com clareza.',
    'pages.dashboard.layout.label': 'Camada de layout',
    'pages.dashboard.layout.title': 'Componente especifico da pagina',
    'pages.dashboard.layout.description':
      'O conteudo especifico do Dashboard agora pertence a propria page em vez de metadata das rotas.',
  },
} as const satisfies AppTranslationCatalog;
