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
  'header.controls.darkMode': 'Modo escuro',
  'header.controls.darkTheme': 'Tema escuro',
  'header.controls.lightTheme': 'Tema claro',
  'header.controls.language': 'Idioma',
  'header.controls.noLanguages': 'Nenhum idioma disponivel',
  'header.controls.portuguese': 'Portugues',
  'header.controls.english': 'Ingles',
  'header.controls.spanish': 'Espanhol',
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
  'pages.home.hero.eyebrow': 'Home estrategica do portfolio',
  'pages.home.hero.title':
    'Victor Hanszman constroi plataformas front-end que transformam produtos complexos em experiencias claras e duraveis.',
  'pages.home.hero.description':
    'Engenheiro full stack com forte especializacao em front-end, focado em Angular, TypeScript, design systems, dashboards analiticos, modernizacao de legados e experiencias guiadas por API.',
  'pages.home.cta.projects': 'Ver projetos',
  'pages.home.cta.dashboard': 'Abrir dashboard',
  'pages.home.metrics.years.label': 'Experiencia',
  'pages.home.metrics.years.description': 'Anos construindo produtos web',
  'pages.home.metrics.projects.label': 'Projetos',
  'pages.home.metrics.projects.description': 'Cases publicados no portfolio',
  'pages.home.metrics.technologies.label': 'Tecnologias',
  'pages.home.metrics.technologies.description': 'Sinais de stack mapeados',
  'pages.home.metrics.experiences.label': 'Experiencias',
  'pages.home.metrics.experiences.description': 'Capitulos de carreira na API',
  'pages.home.api.label': 'API real',
  'pages.home.api.title': 'Dados reais desde a primeira tela',
  'pages.home.api.description':
    'A home ja le o endpoint agregado de dashboard, entao o portfolio evolui a partir do backend em vez de mocks estaticos.',
  'pages.home.api.loading': 'Conectando dados reais do portfolio...',
  'pages.home.api.error':
    'O endpoint de dashboard esta indisponivel agora, mas a pagina mantem o conteudo estrategico pronto.',
  'pages.home.api.featuredProjects': 'Destaques',
  'pages.home.api.highlightedProjects': 'Realcados',
  'pages.home.api.usageLinks': 'Links de stack',
  'pages.home.pillars.label': 'Posicionamento',
  'pages.home.pillars.title': 'Craft front-end senior com contexto full stack',
  'pages.home.pillars.description':
    'A home comeca deixando o sinal profissional evidente: arquitetura, qualidade de entrega e clareza de produto.',
  'pages.home.pillars.architecture.label': 'Arquitetura',
  'pages.home.pillars.architecture.title': 'Fundacoes front-end com Angular primeiro',
  'pages.home.pillars.architecture.description':
    'Estrategia de componentes, fronteiras de estado, contratos tipados e sistemas de UI pensados para crescer sem ficarem opacos.',
  'pages.home.pillars.architecture.tag.angular': 'Angular',
  'pages.home.pillars.architecture.tag.signals': 'Signals',
  'pages.home.pillars.architecture.tag.designSystem': 'Design Systems',
  'pages.home.pillars.delivery.label': 'Entrega',
  'pages.home.pillars.delivery.title':
    'Habitos de qualidade que sobrevivem a pressao de release',
  'pages.home.pillars.delivery.description':
    'Disciplina test-first, codigo lintado, visao de CI/CD e contratos de backend que tornam a evolucao do produto previsivel.',
  'pages.home.pillars.delivery.tag.tdd': 'TDD',
  'pages.home.pillars.delivery.tag.ci': 'CI/CD',
  'pages.home.pillars.delivery.tag.api': 'REST APIs',
  'pages.home.pillars.product.label': 'Produto',
  'pages.home.pillars.product.title':
    'Interfaces que tornam regra de negocio legivel',
  'pages.home.pillars.product.description':
    'Dashboards, migracoes de legado e fluxos corporativos convertidos em telas faceis de escanear e confiar.',
  'pages.home.pillars.product.tag.dashboard': 'Dashboards',
  'pages.home.pillars.product.tag.legacy': 'Modernizacao de legados',
  'pages.home.pillars.product.tag.ux': 'Clareza de UX',
  'pages.home.highlights.label': 'Highlights',
  'pages.home.highlights.title': 'Sinais em destaque vindos da API do portfolio',
  'pages.home.highlights.description':
    'Projetos, experiencias, tecnologias e ativos de carreira marcados como destaque no backend.',
  'pages.home.highlights.featured': 'Destaque',
  'pages.home.highlights.empty': 'Nenhum item em destaque foi retornado ainda.',
  'pages.home.stack.label': 'Stack',
  'pages.home.stack.title': 'Areas de stack com vinculos reais do portfolio',
  'pages.home.stack.description':
    'Os grupos mais fortes vem de relacionamentos entre projetos e tecnologias ja modelados pela API.',
  'pages.home.stack.projects': 'projetos',
  'pages.home.stack.technologies': 'tecnologias',
  'pages.home.stack.empty': 'Nenhuma distribuicao de stack foi retornada ainda.',
  'pages.home.career.label': 'Carreira',
  'pages.home.career.title': 'Foco profissional atual',
  'pages.home.career.description':
    'O primeiro sinal de carreira vem do endpoint publico de timeline profissional.',
  'pages.home.career.empty':
    'Nenhum item de timeline profissional foi retornado ainda.',
  'pages.home.topTechnologies.label': 'Uso de tecnologia',
  'pages.home.topTechnologies.title': 'Tecnologias mais conectadas',
  'pages.home.topTechnologies.description':
    'As tecnologias principais sao ranqueadas pelos relacionamentos de uso em projetos, experiencias e formacoes.',
  'pages.home.topTechnologies.empty':
    'Nenhum dado de uso de tecnologia foi retornado ainda.',
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
  'pages.experiences.sectionLabel': 'Carreira',
  'pages.experiences.title': 'Narrativa de carreira',
  'pages.experiences.description':
    'Os capitulos de carreira agora leem o endpoint publico de experiences e transformam relacionamentos em uma timeline profissional facil de escanear.',
  'pages.experiences.snapshot.label': 'Panorama',
  'pages.experiences.snapshot.title': 'Cobertura da trajetoria vinda da API real',
  'pages.experiences.snapshot.description':
    'Contagens, sinal do papel atual e amplitude de relacionamentos saem diretamente da colecao publicada de experiences.',
  'pages.experiences.snapshot.loading':
    'Carregando relacionamentos reais de experiences...',
  'pages.experiences.snapshot.error':
    'O endpoint de experiences esta indisponivel agora.',
  'pages.experiences.snapshot.metrics.currentRole': 'Papel atual',
  'pages.experiences.snapshot.metrics.experiences': 'Capitulos',
  'pages.experiences.snapshot.metrics.projects': 'Projetos',
  'pages.experiences.snapshot.metrics.technologies': 'Tecnologias',
  'pages.experiences.snapshot.metrics.customers': 'Clientes',
  'pages.experiences.snapshot.metrics.highlights': 'Destaques',
  'pages.experiences.timeline.label': 'Narrativa de carreira',
  'pages.experiences.timeline.title':
    'Timeline, contexto e impacto no mesmo fluxo de leitura',
  'pages.experiences.timeline.description':
    'Cada capitulo conecta empresa, papel, clientes, projetos e stack para que a historia profissional seja lida como sistema e nao como lista solta.',
  'pages.experiences.timeline.loading':
    'Carregando relacionamentos reais de experiences...',
  'pages.experiences.timeline.error':
    'O endpoint de experiences esta indisponivel agora.',
  'pages.experiences.timeline.empty':
    'Nenhum capitulo publicado de experiencia foi retornado ainda.',
  'pages.experiences.timeline.current': 'Atual',
  'pages.experiences.timeline.highlight': 'Destaque',
  'pages.experiences.timeline.roles': 'Papeis',
  'pages.experiences.timeline.customers': 'Clientes',
  'pages.experiences.timeline.emptyCustomers':
    'Nenhum cliente vinculado ainda.',
  'pages.experiences.timeline.technologyStack': 'Stack de tecnologia',
  'pages.experiences.timeline.relatedProjects': 'Projetos relacionados',
  'pages.experiences.timeline.emptyProjects':
    'Nenhum projeto relacionado foi retornado para este capitulo.',
  'pages.skills.sectionLabel': 'Tecnologia',
  'pages.skills.title': 'Profundidade tecnica',
  'pages.skills.description':
    'A pagina de skills agora transforma `experienceMetrics` reais em um catalogo mais claro de tecnologias, com filtros uteis e leitura por contexto.',
  'pages.skills.snapshot.label': 'Retrato do portfolio',
  'pages.skills.snapshot.title': 'Tecnologias com metricao real por contexto',
  'pages.skills.snapshot.description':
    'A lateral resume cobertura por categoria, densidade de destaques e o sinal de maior duracao ja publicado pela API.',
  'pages.skills.snapshot.loading':
    'Carregando metricas de experiencia das tecnologias...',
  'pages.skills.snapshot.error':
    'O endpoint de technologies esta indisponivel agora.',
  'pages.skills.filters.label': 'Filtros do catalogo',
  'pages.skills.filters.title': 'Recorte a stack por categoria, nivel e contexto',
  'pages.skills.filters.description':
    'Os filtros ficam leves na UI enquanto as duracoes reais das tecnologias continuam vindo do contrato do backend.',
  'pages.skills.filters.category': 'Categoria',
  'pages.skills.filters.level': 'Nivel',
  'pages.skills.filters.context': 'Contexto',
  'pages.skills.filters.total': 'Tecnologias filtradas',
  'pages.skills.catalog.label': 'Grupos de tecnologia',
  'pages.skills.catalog.title': 'Leitura agrupada para o recorte atual',
  'pages.skills.catalog.description':
    'Cada card destaca tempo total de experiencia e os contextos onde essa stack ja apareceu.',
  'pages.skills.catalog.loading': 'Montando grupos de tecnologia...',
  'pages.skills.catalog.error':
    'O endpoint de technologies esta indisponivel agora.',
  'pages.skills.catalog.empty':
    'Nenhuma tecnologia publicada corresponde aos filtros atuais.',
  'pages.skills.card.highlight': 'Destaque',
  'pages.skills.card.totalExperience': 'Experiencia total',
  'pages.skills.card.contexts': 'Cobertura por contexto',
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
