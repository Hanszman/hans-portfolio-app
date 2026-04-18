import { AppTranslationLanguage } from '../translation.types';

export const PT_BR_TRANSLATIONS = {
  'shell.api.eyebrow': 'API',
  'shell.api.connected.title': 'API conectada',
  'shell.api.connected.description':
    'Health check executado com sucesso em {{ checkedAtUtc }}.',
  'shell.api.loading.title': 'Conectando com a API',
  'shell.api.loading.description':
    'Verificando a disponibilidade do backend para o ambiente atual.',
  'shell.api.blocked.title': 'Requisição da API bloqueada',
  'shell.api.blocked.description':
    'O navegador não conseguiu concluir a requisição inicial ao backend a partir de {{ origin }}. A API pode estar online, mas o acesso ainda pode estar bloqueado por CORS ou política de rede.',
  'shell.api.error.title': 'Requisição da API falhou',
  'shell.api.error.description':
    'Não foi possível concluir o health check inicial do backend no ambiente atual.',
  'header.brand.role': 'Full Stack Engineer | Especialista Front-End',
  'header.tags.angular': 'Angular 20',
  'header.tags.signals': 'Signals first',
  'header.tags.api': 'API ativa',
  'header.controls.theme': 'Tema',
  'header.controls.darkMode': 'Modo escuro',
  'header.controls.darkTheme': 'Tema escuro',
  'header.controls.lightTheme': 'Tema claro',
  'header.controls.language': 'Idioma',
  'header.controls.noLanguages': 'Nenhum idioma disponível',
  'header.controls.portuguese': 'Português',
  'header.controls.english': 'Inglês',
  'header.statusLabel': 'Status da fundação',
  'header.eyebrow': 'Fundação do remake do portfólio',
  'header.title':
    'Uma shell específica do portfólio, já conectada a dados reais do backend.',
  'header.description':
    'Esta primeira camada de layout estabelece a estrutura do portfólio, mantém o app alinhado com a design lib e prepara as próximas iterações visuais sobre uma shell Angular responsiva.',
  'header.highlight.layout.label': 'Layout',
  'header.highlight.layout.title': 'Header, footer, nav e page wrappers',
  'header.highlight.layout.description':
    'Composição específica do portfólio organizada dentro da camada de layout do app.',
  'header.highlight.integration.label': 'Integração',
  'header.highlight.integration.title': 'API real desde o início',
  'header.highlight.integration.description':
    'A shell permanece conectada ao backend para que cada próxima página evolua com dados reais.',
  'header.highlight.direction.label': 'Direção',
  'header.highlight.direction.title':
    'Design-lib primeiro, estrutura específica do portfólio depois',
  'header.highlight.direction.description':
    'Componentes reutilizáveis da lib continuam como base enquanto o layout único do portfólio vive aqui.',
  'footer.eyebrow': 'Shell do portfólio',
  'footer.title': 'Fundação de layout pronta para as próximas páginas',
  'footer.description':
    'A shell específica do portfólio agora separa layout de pages, mantém a navegação centralizada pela config de rotas e segue alinhada com a design lib.',
  'footer.navigationLabel': 'Navegação do footer',
  'footer.principlesLabel': 'Princípios de implementação',
  'footer.tags.standalone': 'Somente standalone',
  'footer.tags.tailwind': 'Tailwind @apply',
  'footer.tags.coverage': '100% coverage',
  'pages.home.sectionLabel': 'Fundação',
  'pages.home.title': 'Fundação da home',
  'pages.home.description':
    'A rota home está conectada e pronta para o próximo hero, highlights e resumo do portfólio via API.',
  'pages.home.roadmap.label': 'Roadmap',
  'pages.home.roadmap.title': 'Hero, highlights e resumo via API',
  'pages.home.roadmap.description':
    'A home vai apresentar Victor, reforçar posicionamento e exibir os primeiros cards de resumo vindos do backend.',
  'pages.home.status.label': 'Status',
  'pages.home.status.title': 'Shell pronta',
  'pages.home.status.description':
    'Esta rota já está dentro da nova shell do portfólio e pronta para a implementação do hero, highlights e resumo via API.',
  'pages.home.layout.label': 'Camada de layout',
  'pages.home.layout.title': 'Componente específico da página',
  'pages.home.layout.description':
    'O conteúdo agora vive no componente Home em vez de ser passado como route data estática.',
  'pages.experiences.sectionLabel': 'Fundação',
  'pages.experiences.title': 'Fundação de experiences',
  'pages.experiences.description':
    'A rota experiences está pronta para timeline, narrativa de impacto e dados de carreira via API.',
  'pages.experiences.roadmap.label': 'Roadmap',
  'pages.experiences.roadmap.title':
    'Timeline de impacto e narrativa de liderança',
  'pages.experiences.roadmap.description':
    'Esta página vai organizar a carreira por contexto, impacto, stack e relacionamentos vindos do backend.',
  'pages.experiences.status.label': 'Status',
  'pages.experiences.status.title': 'Storytelling de carreira',
  'pages.experiences.status.description':
    'A estrutura está pronta para seções mais ricas que tornam a trajetória mais fácil de escanear e entender.',
  'pages.experiences.layout.label': 'Camada de layout',
  'pages.experiences.layout.title': 'Componente específico da página',
  'pages.experiences.layout.description':
    'Esta página agora possui seu próprio conteúdo estático de fundação, sem receber isso por route data.',
  'pages.skills.sectionLabel': 'Fundação',
  'pages.skills.title': 'Fundação de skills',
  'pages.skills.description':
    'A rota skills está pronta para tecnologias agrupadas, conceitos, patterns e métricas de experiência.',
  'pages.skills.roadmap.label': 'Roadmap',
  'pages.skills.roadmap.title':
    'Clusters de tecnologia e métricas reais de experiência',
  'pages.skills.roadmap.description':
    'Esta página vai consumir dados de skills do backend e organizá-los em filtros, grupos e resumos úteis.',
  'pages.skills.status.label': 'Status',
  'pages.skills.status.title': 'Conceitos, patterns e arquiteturas',
  'pages.skills.status.description':
    'O remake vai incluir conhecimento técnico mais amplo, não apenas tecnologias específicas.',
  'pages.skills.layout.label': 'Camada de layout',
  'pages.skills.layout.title': 'Componente específico da página',
  'pages.skills.layout.description':
    'A composição específica de skills agora pode evoluir independente das outras rotas.',
  'pages.projects.sectionLabel': 'Fundação',
  'pages.projects.title': 'Fundação de projects',
  'pages.projects.description':
    'A rota projects está pronta para trabalhos em destaque, screenshots, links e dados de projetos via API.',
  'pages.projects.roadmap.label': 'Roadmap',
  'pages.projects.roadmap.title':
    'Trabalhos em destaque, resultados e assets vinculados',
  'pages.projects.roadmap.description':
    'Esta página vai conectar projetos a tecnologias, deploys, repositórios e imagens de apoio.',
  'pages.projects.status.label': 'Status',
  'pages.projects.status.title': 'Screenshots, links e referências de deploy',
  'pages.projects.status.description':
    'O remake vai tornar cada projeto mais fácil de avaliar com assets mais ricos e referências explícitas.',
  'pages.projects.layout.label': 'Camada de layout',
  'pages.projects.layout.title': 'Componente especifico da pagina',
  'pages.projects.layout.description':
    'O conteúdo específico de projects agora vive na page Projects e pode evoluir sem acoplamento com route data.',
  'pages.dashboard.sectionLabel': 'Fundação',
  'pages.dashboard.title': 'Fundação do dashboard',
  'pages.dashboard.description':
    'A rota dashboard está pronta para métricas agregadas, gráficos e insights do portfólio via API.',
  'pages.dashboard.roadmap.label': 'Roadmap',
  'pages.dashboard.roadmap.title':
    'Métricas operacionais e dados agregados do portfólio',
  'pages.dashboard.roadmap.description':
    'Esta página vai evoluir para a camada visual de resumo de totais, relacionamentos e indicadores de saúde.',
  'pages.dashboard.status.label': 'Status',
  'pages.dashboard.status.title': 'Gráficos e saúde do portfólio',
  'pages.dashboard.status.description':
    'A fundação do dashboard está isolada em sua própria page para que gráficos e métricas cresçam com clareza.',
  'pages.dashboard.layout.label': 'Camada de layout',
  'pages.dashboard.layout.title': 'Componente especifico da pagina',
  'pages.dashboard.layout.description':
    'O conteúdo específico do Dashboard agora pertence à própria page em vez de metadata das rotas.',
} as const satisfies AppTranslationLanguage;
