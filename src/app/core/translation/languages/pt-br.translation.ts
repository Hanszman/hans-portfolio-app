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
  'header.brand.home': 'Ir para a home',
  'header.brand.role': 'Full Stack Engineer | Especialista Front-End',
  'header.tags.angular': 'Angular 20',
  'header.tags.signals': 'Signals first',
  'header.tags.api': 'API ativa',
  'header.controls.theme': 'Tema',
  'header.controls.darkMode': 'Modo escuro',
  'header.controls.darkTheme': 'Tema escuro',
  'header.controls.lightTheme': 'Tema claro',
  'header.controls.language': 'Idioma',
  'header.controls.navigation': 'Menu de navegaÃ§Ã£o',
  'header.controls.noLanguages': 'Nenhum idioma disponível',
  'header.controls.portuguese': 'Português',
  'header.controls.english': 'Inglês',
  'header.controls.spanish': 'Espanhol',
  'header.statusLabel': 'Status da fundação',
  'header.eyebrow': 'Fundação do remake do portfolio',
  'header.title':
    'Uma shell específica do portfolio, já conectada a dados reais do backend.',
  'header.description':
    'Esta primeira camada de layout estabelece a estrutura do portfolio, mantém o app alinhado com a design lib e prepara as próximas iterações visuais sobre uma shell Angular responsiva.',
  'header.highlight.layout.label': 'Layout',
  'header.highlight.layout.title': 'Header, footer, nav e page wrappers',
  'header.highlight.layout.description':
    'Composição específica do portfolio organizada dentro da camada de layout do app.',
  'header.highlight.integration.label': 'Integração',
  'header.highlight.integration.title': 'API real desde o início',
  'header.highlight.integration.description':
    'A shell permanece conectada ao backend para que cada próxima página evolua com dados reais.',
  'header.highlight.direction.label': 'Direção',
  'header.highlight.direction.title':
    'Design-lib primeiro, estrutura específica do portfolio depois',
  'header.highlight.direction.description':
    'Componentes reutilizáveis da lib continuam como base enquanto o layout único do portfolio vive aqui.',
  'footer.eyebrow': 'Shell do portfolio',
  'footer.title': 'Fundação de layout pronta para as próximas páginas',
  'footer.description':
    'A shell específica do portfolio agora separa layout de pages, mantém a navegação centralizada pela config de rotas e segue alinhada com a design lib.',
  'footer.navigationLabel': 'Navegação do footer',
  'footer.principlesLabel': 'Princípios de implementação',
  'footer.tags.standalone': 'Somente standalone',
  'footer.tags.tailwind': 'Tailwind @apply',
  'footer.tags.coverage': '100% coverage',
  'footer.social.navigation': 'Links sociais',
  'footer.social.github': 'Abrir perfil do GitHub',
  'footer.social.linkedin': 'Abrir perfil do LinkedIn',
  'footer.social.whatsapp': 'Abrir contato no WhatsApp',
  'footer.copyright.name': 'Victor Hanszman',
  'footer.copyright.year': '© {{ year }}',
  'common.actions.viewDetails': 'Ver detalhes',
  'pages.home.sectionLabel': 'Fundação',
  'pages.home.title': 'Fundação da home',
  'pages.home.description':
    'A rota home está conectada e pronta para o próximo hero, highlights e resumo do portfolio via API.',
  'pages.home.hero.eyebrow': 'Home estratégica do portfolio',
  'pages.home.hero.title':
    'Victor Hanszman constrói plataformas front-end que transformam produtos complexos em experiências claras e duráveis.',
  'pages.home.hero.description':
    'Engenheiro full stack com forte especialização em front-end, focado em Angular, TypeScript, design systems, dashboards analíticos, modernização de legados e experiências guiadas por API.',
  'pages.home.cta.projects': 'Ver projetos',
  'pages.home.cta.dashboard': 'Abrir dashboard',
  'pages.home.metrics.years.label': 'Experiência',
  'pages.home.metrics.years.description': 'Anos construindo produtos web',
  'pages.home.metrics.projects.label': 'Projetos',
  'pages.home.metrics.projects.description': 'Cases publicados no portfolio',
  'pages.home.metrics.technologies.label': 'Tecnologias',
  'pages.home.metrics.technologies.description': 'Sinais de stack mapeados',
  'pages.home.metrics.experiences.label': 'Experiências',
  'pages.home.metrics.experiences.description': 'Capítulos de carreira na API',
  'pages.home.api.label': 'API real',
  'pages.home.api.title': 'Dados reais desde a primeira tela',
  'pages.home.api.description':
    'A home já lê o endpoint agregado de dashboard, então o portfolio evolui a partir do backend em vez de mocks estáticos.',
  'pages.home.api.loading': 'Conectando dados reais do portfolio...',
  'pages.home.api.error':
    'O endpoint de dashboard está indisponível agora, mas a página mantém o conteúdo estratégico pronto.',
  'pages.home.api.featuredProjects': 'Destaques',
  'pages.home.api.highlightedProjects': 'Realçados',
  'pages.home.api.usageLinks': 'Links de stack',
  'pages.home.pillars.label': 'Posicionamento',
  'pages.home.pillars.title': 'Craft front-end senior com contexto full stack',
  'pages.home.pillars.description':
    'A home começa deixando o sinal profissional evidente: arquitetura, qualidade de entrega e clareza de produto.',
  'pages.home.pillars.architecture.label': 'Arquitetura',
  'pages.home.pillars.architecture.title': 'Fundações front-end com Angular primeiro',
  'pages.home.pillars.architecture.description':
    'Estratégia de componentes, fronteiras de estado, contratos tipados e sistemas de UI pensados para crescer sem ficarem opacos.',
  'pages.home.pillars.architecture.tag.angular': 'Angular',
  'pages.home.pillars.architecture.tag.signals': 'Signals',
  'pages.home.pillars.architecture.tag.designSystem': 'Design Systems',
  'pages.home.pillars.delivery.label': 'Entrega',
  'pages.home.pillars.delivery.title':
    'Hábitos de qualidade que sobrevivem à pressão de release',
  'pages.home.pillars.delivery.description':
    'Disciplina test-first, código lintado, visão de CI/CD e contratos de backend que tornam a evolução do produto previsível.',
  'pages.home.pillars.delivery.tag.tdd': 'TDD',
  'pages.home.pillars.delivery.tag.ci': 'CI/CD',
  'pages.home.pillars.delivery.tag.api': 'REST APIs',
  'pages.home.pillars.product.label': 'Produto',
  'pages.home.pillars.product.title':
    'Interfaces que tornam regra de negócio legível',
  'pages.home.pillars.product.description':
    'Dashboards, migrações de legado e fluxos corporativos convertidos em telas fáceis de escanear e confiar.',
  'pages.home.pillars.product.tag.dashboard': 'Dashboards',
  'pages.home.pillars.product.tag.legacy': 'Modernização de legados',
  'pages.home.pillars.product.tag.ux': 'Clareza de UX',
  'pages.home.highlights.label': 'Highlights',
  'pages.home.highlights.title': 'Sinais em destaque vindos da API do portfolio',
  'pages.home.highlights.description':
    'Projetos, experiências, tecnologias e ativos de carreira marcados como destaque no backend.',
  'pages.home.highlights.featured': 'Destaque',
  'pages.home.highlights.empty': 'Nenhum item em destaque foi retornado ainda.',
  'pages.home.stack.label': 'Stack',
  'pages.home.stack.title': 'Áreas de stack com vínculos reais do portfolio',
  'pages.home.stack.description':
    'Os grupos mais fortes vêm de relacionamentos entre projetos e tecnologias já modelados pela API.',
  'pages.home.stack.projects': 'projetos',
  'pages.home.stack.technologies': 'tecnologias',
  'pages.home.stack.empty': 'Nenhuma distribuição de stack foi retornada ainda.',
  'pages.home.career.label': 'Carreira',
  'pages.home.career.title': 'Foco profissional atual',
  'pages.home.career.description':
    'O primeiro sinal de carreira vem do endpoint público de timeline profissional.',
  'pages.home.career.empty':
    'Nenhum item de timeline profissional foi retornado ainda.',
  'pages.home.topTechnologies.label': 'Uso de tecnologia',
  'pages.home.topTechnologies.title': 'Tecnologias mais conectadas',
  'pages.home.topTechnologies.description':
    'As tecnologias principais são ranqueadas pelos relacionamentos de uso em projetos, experiências e formações.',
  'pages.home.topTechnologies.empty':
    'Nenhum dado de uso de tecnologia foi retornado ainda.',
  'pages.home.roadmap.label': 'Roadmap',
  'pages.home.roadmap.title': 'Hero, highlights e resumo via API',
  'pages.home.roadmap.description':
    'A home vai apresentar Victor, reforçar posicionamento e exibir os primeiros cards de resumo vindos do backend.',
  'pages.home.status.label': 'Status',
  'pages.home.status.title': 'Shell pronta',
  'pages.home.status.description':
    'Esta rota já está dentro da nova shell do portfolio e pronta para a implementação do hero, highlights e resumo via API.',
  'pages.home.layout.label': 'Camada de layout',
  'pages.home.layout.title': 'Componente específico da página',
  'pages.home.layout.description':
    'O conteúdo agora vive no componente Home em vez de ser passado como route data estática.',
  'pages.experiences.sectionLabel': 'Carreira',
  'pages.experiences.title': 'Narrativa de carreira',
  'pages.experiences.description':
    'Os capítulos de carreira agora leem o endpoint público de experiences e transformam relacionamentos em uma timeline profissional fácil de escanear.',
  'pages.experiences.snapshot.label': 'Panorama',
  'pages.experiences.snapshot.title': 'Cobertura da trajetória vinda da API real',
  'pages.experiences.snapshot.description':
    'Contagens, sinal do papel atual e amplitude de relacionamentos saem diretamente da coleção publicada de experiences.',
  'pages.experiences.snapshot.loading':
    'Carregando relacionamentos reais de experiences...',
  'pages.experiences.snapshot.error':
    'O endpoint de experiences está indisponível agora.',
  'pages.experiences.snapshot.metrics.currentRole': 'Papel atual',
  'pages.experiences.snapshot.metrics.experiences': 'Capítulos',
  'pages.experiences.snapshot.metrics.projects': 'Projetos',
  'pages.experiences.snapshot.metrics.technologies': 'Tecnologias',
  'pages.experiences.snapshot.metrics.customers': 'Clientes',
  'pages.experiences.snapshot.metrics.highlights': 'Destaques',
  'pages.experiences.timeline.label': 'Narrativa de carreira',
  'pages.experiences.timeline.title':
    'Timeline, contexto e impacto no mesmo fluxo de leitura',
  'pages.experiences.timeline.description':
    'Cada capítulo conecta empresa, papel, clientes, projetos e stack para que a história profissional seja lida como sistema e não como lista solta.',
  'pages.experiences.timeline.loading':
    'Carregando relacionamentos reais de experiences...',
  'pages.experiences.timeline.error':
    'O endpoint de experiences está indisponível agora.',
  'pages.experiences.timeline.empty':
    'Nenhum capítulo publicado de experiência foi retornado ainda.',
  'pages.experiences.timeline.current': 'Atual',
  'pages.experiences.timeline.highlight': 'Destaque',
  'pages.experiences.timeline.roles': 'Papéis',
  'pages.experiences.timeline.customers': 'Clientes',
  'pages.experiences.timeline.emptyCustomers':
    'Nenhum cliente vinculado ainda.',
  'pages.experiences.timeline.technologyStack': 'Stack de tecnologia',
  'pages.experiences.timeline.relatedProjects': 'Projetos relacionados',
  'pages.experiences.timeline.emptyProjects':
    'Nenhum projeto relacionado foi retornado para este capítulo.',
  'pages.experiences.detail.projectsCount': 'projetos',
  'pages.experiences.detail.analytics': 'Analíticos da experiência',
  'pages.experiences.detail.gallery': 'Galeria vinculada',
  'pages.experiences.detail.chart.jobs': 'Papéis',
  'pages.experiences.detail.chart.customers': 'Clientes',
  'pages.experiences.detail.chart.projects': 'Projetos',
  'pages.experiences.detail.chart.technologies': 'Tecnologias',
  'pages.experiences.detail.chart.series': 'Conexões',
  'pages.skills.sectionLabel': 'Tecnologia',
  'pages.skills.title': 'Profundidade técnica',
  'pages.skills.description':
    'A página de skills agora transforma `experienceMetrics` reais em um catálogo mais claro de tecnologias, com filtros úteis e leitura por contexto.',
  'pages.skills.snapshot.label': 'Retrato do portfolio',
  'pages.skills.snapshot.title': 'Tecnologias com medição real por contexto',
  'pages.skills.snapshot.description':
    'A lateral resume cobertura por categoria, densidade de destaques e o sinal de maior duração já publicado pela API.',
  'pages.skills.snapshot.loading':
    'Carregando métricas de experiência das tecnologias...',
  'pages.skills.snapshot.error':
    'O endpoint de technologies está indisponível agora.',
  'pages.skills.filters.label': 'Filtros do catálogo',
  'pages.skills.filters.title': 'Recorte a stack por categoria, nível e contexto',
  'pages.skills.filters.description':
    'Os filtros ficam leves na UI enquanto as durações reais das tecnologias continuam vindo do contrato do backend.',
  'pages.skills.filters.category': 'Categoria',
  'pages.skills.filters.level': 'Nível',
  'pages.skills.filters.context': 'Contexto',
  'pages.skills.filters.total': 'Tecnologias filtradas',
  'pages.skills.catalog.label': 'Grupos de tecnologia',
  'pages.skills.catalog.title': 'Leitura agrupada para o recorte atual',
  'pages.skills.catalog.description':
    'Cada card destaca tempo total de experiência e os contextos onde essa stack já apareceu.',
  'pages.skills.catalog.loading': 'Montando grupos de tecnologia...',
  'pages.skills.catalog.error':
    'O endpoint de technologies está indisponível agora.',
  'pages.skills.catalog.empty':
    'Nenhuma tecnologia publicada corresponde aos filtros atuais.',
  'pages.skills.card.highlight': 'Destaque',
  'pages.skills.card.totalExperience': 'Experiência total',
  'pages.skills.card.contexts': 'Cobertura por contexto',
  'pages.skills.detail.totalExperience': 'Experiência consolidada',
  'pages.skills.detail.contextChart': 'Distribuição por contexto',
  'pages.skills.detail.chartSeries': 'Meses',
  'pages.skills.detail.coverage': 'Cobertura detalhada',
  'pages.skills.detail.timeline': 'Linha do tempo de contexto',
  'pages.skills.detail.noTimeline': 'Nenhum intervalo publicado foi retornado.',
  'taxonomy.skills.filters.allCategories': 'Todas as categorias',
  'taxonomy.skills.filters.allLevels': 'Todos os níveis',
  'taxonomy.skills.filters.allContexts': 'Todos os contextos',
  'taxonomy.skills.fallback.uncategorized': 'Não categorizada',
  'taxonomy.skills.fallback.levelNotSet': 'Nível não informado',
  'taxonomy.skills.fallback.frequencyNotSet': 'Frequência não informada',
  'taxonomy.skills.fallback.noDuration': 'Sem período consolidado',
  'taxonomy.skills.fallback.zeroMonths': '0 meses',
  'taxonomy.skills.summary.mapped': 'Tecnologias mapeadas',
  'taxonomy.skills.summary.highlights': 'Destaques',
  'taxonomy.skills.summary.categories': 'Categorias',
  'taxonomy.skills.summary.advanced': 'Stack avançada',
  'taxonomy.skills.summary.longest': 'Maior tempo total',
  'taxonomy.skills.group.description':
    '{{count}} tecnologias com tempo real consolidado por contexto.',
  'taxonomy.skills.category.framework': 'Framework',
  'taxonomy.skills.category.language': 'Linguagem',
  'taxonomy.skills.category.library': 'Biblioteca',
  'taxonomy.skills.category.database': 'Banco de dados',
  'taxonomy.skills.category.devops': 'DevOps',
  'taxonomy.skills.category.orm': 'ORM',
  'taxonomy.skills.level.advanced': 'Avançado',
  'taxonomy.skills.level.intermediate': 'Intermediário',
  'taxonomy.skills.level.beginner': 'Iniciante',
  'taxonomy.skills.frequency.frequent': 'Frequente',
  'taxonomy.skills.frequency.occasional': 'Ocasional',
  'taxonomy.skills.frequency.rare': 'Rara',
  'taxonomy.skills.context.professional': 'Profissional',
  'taxonomy.skills.context.personal': 'Pessoal',
  'taxonomy.skills.context.academic': 'Acadêmico',
  'taxonomy.skills.context.study': 'Estudo',
  'taxonomy.experiences.projectStatus.completed': 'Concluído',
  'taxonomy.experiences.projectStatus.inProgress': 'Em andamento',
  'taxonomy.experiences.projectEnvironment.frontend': 'Front-end',
  'taxonomy.experiences.projectEnvironment.backend': 'Back-end',
  'taxonomy.experiences.projectEnvironment.fullstack': 'Full stack',
  'taxonomy.experiences.present': 'Atual',
  'pages.projects.sectionLabel': 'Projetos',
  'pages.projects.title': 'Cases de projeto',
  'pages.projects.description':
    'A rota projects agora lê a coleção pública real e apresenta trabalhos em formato de case, com stack, referências e assets de apoio.',
  'pages.projects.snapshot.label': 'Panorama dos cases',
  'pages.projects.snapshot.title': 'Trabalhos publicados com assets reais vinculados',
  'pages.projects.snapshot.description':
    'A lateral resume densidade de featured, referências vinculadas e o sinal de stack mais ampla já exposto pelo endpoint público de projetos.',
  'pages.projects.snapshot.loading': 'Carregando cases reais de projeto...',
  'pages.projects.snapshot.error':
    'O endpoint de projects está indisponível agora.',
  'pages.projects.filters.label': 'Filtros dos cases',
  'pages.projects.filters.title':
    'Recorte o portfolio por contexto, ambiente, status e ordem de leitura',
  'pages.projects.filters.description':
    'A UI continua leve enquanto os relacionamentos de projeto, experiência, imagem e links chegam direto do backend.',
  'pages.projects.filters.context': 'Contexto',
  'pages.projects.filters.environment': 'Ambiente',
  'pages.projects.filters.status': 'Status',
  'pages.projects.filters.sort': 'Ordenar por',
  'pages.projects.filters.total': 'Cases filtrados',
  'pages.projects.catalog.label': 'Cases',
  'pages.projects.catalog.title': 'Projetos como cases, não apenas listagens',
  'pages.projects.catalog.description':
    'Cada case conecta período, stack, contexto de entrega, empresas, deploys, repositórios e screenshots no mesmo bloco de leitura.',
  'pages.projects.catalog.loading': 'Montando os case studies de projetos...',
  'pages.projects.catalog.error':
    'O endpoint de projects está indisponível agora.',
  'pages.projects.catalog.empty':
    'Nenhum projeto publicado corresponde aos filtros atuais.',
  'pages.projects.card.featured': 'Em destaque',
  'pages.projects.card.highlight': 'Destaque',
  'pages.projects.card.technologies': 'Tecnologias',
  'pages.projects.card.companies': 'Empresas',
  'pages.projects.card.emptyCompanies': 'Nenhuma empresa vinculada ainda.',
  'pages.projects.card.links': 'Links e referências',
  'pages.projects.card.emptyLinks':
    'Nenhum link publicado foi vinculado a este case ainda.',
  'pages.projects.card.assets': 'Assets vinculados',
  'pages.projects.detail.linksCount': 'links',
  'pages.projects.detail.imagesCount': 'imagens',
  'pages.projects.detail.relatedExperiences': 'Experiências relacionadas',
  'pages.projects.detail.noExperiences':
    'Nenhuma experiência relacionada foi publicada ainda.',
  'pages.projects.detail.tags': 'Tags do case',
  'pages.projects.detail.noTags': 'Nenhuma tag publicada foi vinculada.',
  'pages.projects.detail.analytics': 'Analíticos do case',
  'pages.projects.detail.gallery': 'Galeria ampliada',
  'pages.projects.detail.chart.series': 'Densidade',
  'pages.projects.detail.chart.technologies': 'Tecnologias',
  'pages.projects.detail.chart.companies': 'Empresas',
  'pages.projects.detail.chart.links': 'Links',
  'pages.projects.detail.chart.images': 'Imagens',
  'taxonomy.projects.filters.allContexts': 'Todos os contextos',
  'taxonomy.projects.filters.allEnvironments': 'Todos os ambientes',
  'taxonomy.projects.filters.allStatuses': 'Todos os status',
  'taxonomy.projects.sort.featured': 'Em destaque primeiro',
  'taxonomy.projects.sort.recent': 'Início mais recente',
  'taxonomy.projects.sort.stack': 'Maior stack',
  'taxonomy.projects.sort.links': 'Mais assets vinculados',
  'taxonomy.projects.linkType.github': 'GitHub',
  'taxonomy.projects.linkType.deploy': 'Deploy',
  'taxonomy.projects.linkType.sourceCode': 'Código-fonte',
  'taxonomy.projects.summary.total': 'Cases publicados',
  'taxonomy.projects.summary.featured': 'Em destaque',
  'taxonomy.projects.summary.inProgress': 'Em andamento',
  'taxonomy.projects.summary.linkedAssets': 'Assets vinculados',
  'taxonomy.projects.summary.richestStack': 'Stack mais ampla',
  'taxonomy.projects.fallback.noAssets': 'Nenhum asset visual vinculado ainda.',
  'taxonomy.projects.fallback.noLinks':
    'Nenhum link publicado foi vinculado ainda.',
  'taxonomy.projects.fallback.noCompanies': 'Nenhuma empresa vinculada ainda.',
  'taxonomy.projects.fallback.untitledLink': 'Link sem título',
  'pages.dashboard.sectionLabel': 'Fundação',
  'pages.dashboard.title': 'Dashboard analítico',
  'pages.dashboard.description':
    'Sinais agregados entre projetos, stack e carreira agora vivem em uma rota própria, alimentada pelos endpoints públicos de dashboard.',
  'pages.dashboard.snapshot.label': 'Snapshot',
  'pages.dashboard.snapshot.title': 'Pegada publicada em uma leitura só',
  'pages.dashboard.snapshot.description':
    'A sidebar concentra os contadores principais vindos da API para resumir rapidamente o dataset público atual.',
  'pages.dashboard.snapshot.loading': 'Carregando agregados do dashboard...',
  'pages.dashboard.snapshot.error':
    'Os endpoints agregados do dashboard estão indisponíveis agora.',
  'pages.dashboard.snapshot.metrics.projects': 'Projetos',
  'pages.dashboard.snapshot.metrics.experiences': 'Experiências',
  'pages.dashboard.snapshot.metrics.technologies': 'Tecnologias',
  'pages.dashboard.snapshot.metrics.formations': 'Formações / idiomas',
  'pages.dashboard.snapshot.metrics.customers': 'Clientes',
  'pages.dashboard.snapshot.metrics.jobs': 'Cargos',
  'pages.dashboard.snapshot.metrics.languages': 'Idiomas',
  'pages.dashboard.stacks.label': 'Distribuição de stack',
  'pages.dashboard.stacks.title':
    'Onde o portfolio carrega mais peso técnico hoje',
  'pages.dashboard.stacks.description':
    'Cada área combina projetos relacionados e tecnologias mapeadas para deixar as zonas mais fortes evidentes de imediato.',
  'pages.dashboard.stacks.loading': 'Carregando distribuição de stack...',
  'pages.dashboard.stacks.error':
    'Os endpoints agregados do dashboard estão indisponíveis agora.',
  'pages.dashboard.stacks.empty':
    'Nenhuma distribuição de stack foi retornada ainda.',
  'pages.dashboard.stacks.projects': 'projetos',
  'pages.dashboard.stacks.technologies': 'tecnologias',
  'pages.dashboard.distribution.label': 'Pegada de projetos',
  'pages.dashboard.distribution.title':
    'Contexto de entrega, ambientes e densidade de destaque',
  'pages.dashboard.distribution.description':
    'Este bloco separa volume destacado, contexto e ambiente para o catálogo de projetos ficar mais legível.',
  'pages.dashboard.distribution.loading':
    'Carregando agregados de distribuição de projetos...',
  'pages.dashboard.distribution.error':
    'Os endpoints agregados do dashboard estão indisponíveis agora.',
  'pages.dashboard.distribution.empty':
    'Nenhum dado de distribuição de projetos foi retornado ainda.',
  'pages.dashboard.distribution.featured': 'Em destaque',
  'pages.dashboard.distribution.highlighted': 'Highlights',
  'pages.dashboard.distribution.total': 'Total de projetos',
  'pages.dashboard.distribution.contexts': 'Contextos',
  'pages.dashboard.distribution.environments': 'Ambientes',
  'pages.dashboard.technology.label': 'Uso de tecnologia',
  'pages.dashboard.technology.title': 'Sinais de uso da stack',
  'pages.dashboard.technology.description':
    'Top tecnologias e seus padrões de frequência, contexto e origem saem direto das relações agregadas da API.',
  'pages.dashboard.technology.loading':
    'Carregando agregados de uso de tecnologia...',
  'pages.dashboard.technology.error':
    'Os endpoints agregados do dashboard estão indisponíveis agora.',
  'pages.dashboard.technology.empty':
    'Nenhum agregado de uso de tecnologia foi retornado ainda.',
  'pages.dashboard.technology.levels': 'Níveis',
  'pages.dashboard.technology.frequencies': 'Frequências',
  'pages.dashboard.technology.contexts': 'Contextos',
  'pages.dashboard.technology.sources': 'Origens',
  'pages.dashboard.technology.links': 'sinais vinculados',
  'pages.dashboard.timeline.label': 'Carreira',
  'pages.dashboard.timeline.title': 'Timeline de foco profissional',
  'pages.dashboard.timeline.description':
    'A timeline pública vira uma camada analítica para mostrar capítulos ativos, densidade de highlight e espalhamento entre projetos e clientes.',
  'pages.dashboard.timeline.loading':
    'Carregando agregados da timeline profissional...',
  'pages.dashboard.timeline.error':
    'Os endpoints agregados do dashboard estão indisponíveis agora.',
  'pages.dashboard.timeline.empty':
    'Nenhum item da timeline profissional foi retornado ainda.',
  'pages.dashboard.timeline.current': 'Atual',
  'pages.dashboard.timeline.highlight': 'Highlight',
  'pages.dashboard.timeline.customers': 'Clientes',
  'pages.dashboard.timeline.emptyCustomers':
    'Nenhum cliente vinculado ainda.',
  'pages.dashboard.timeline.projects': 'Projetos',
  'pages.dashboard.timeline.emptyProjects':
    'Nenhum projeto vinculado ainda.',
  'pages.dashboard.timeline.technologies': 'Tecnologias',
  'pages.dashboard.highlights.label': 'Highlights',
  'pages.dashboard.highlights.title': 'Destaques do portfolio',
  'pages.dashboard.highlights.description':
    'Entidades marcadas no backend continuam visíveis aqui como prova de repertório entre projetos, experiência e tecnologia.',
  'pages.dashboard.highlights.loading':
    'Carregando entidades destacadas do portfolio...',
  'pages.dashboard.highlights.error':
    'Os endpoints agregados do dashboard estão indisponíveis agora.',
  'pages.dashboard.highlights.empty':
    'Nenhum item destacado do portfolio foi retornado ainda.',
  'pages.dashboard.highlights.featured': 'Em destaque',
  'taxonomy.dashboard.source.experience': 'Experiência',
  'taxonomy.dashboard.source.project': 'Projeto',
  'taxonomy.dashboard.source.formation': 'Formação',
} as const satisfies AppTranslationLanguage;
