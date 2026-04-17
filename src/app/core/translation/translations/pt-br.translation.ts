import { AppTranslationLanguage } from '../translation.types';

export const PT_BR_TRANSLATIONS = {
  'shell.api.eyebrow': 'API',
  'shell.api.connected.title': 'API conectada',
  'shell.api.connected.description':
    'Health check executado com sucesso em {{ checkedAtUtc }}.',
  'shell.api.loading.title': 'Conectando com a API',
  'shell.api.loading.description':
    'Verificando a disponibilidade do backend para o ambiente atual.',
  'shell.api.blocked.title': 'Requisicao da API bloqueada',
  'shell.api.blocked.description':
    'O navegador nao conseguiu concluir a requisicao inicial ao backend a partir de {{ origin }}. A API pode estar online, mas o acesso ainda pode estar bloqueado por CORS ou politica de rede.',
  'shell.api.error.title': 'Requisicao da API falhou',
  'shell.api.error.description':
    'Nao foi possivel concluir o health check inicial do backend no ambiente atual.',
  'header.brand.role': 'Full Stack Engineer | Especialista Front-End',
  'header.tags.angular': 'Angular 20',
  'header.tags.signals': 'Signals first',
  'header.tags.api': 'API ativa',
  'header.controls.theme': 'Tema',
  'header.controls.darkTheme': 'Tema escuro',
  'header.controls.lightTheme': 'Tema claro',
  'header.controls.language': 'Idioma',
  'header.controls.noLanguages': 'Nenhum idioma disponivel',
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
} as const satisfies AppTranslationLanguage;
