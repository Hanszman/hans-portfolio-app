import { AppTranslationLanguage } from '../translation.types';

export const PT_BR_TRANSLATIONS = {
  'header.brand.home': 'Ir para a home',
  'header.controls.theme': 'Tema',
  'header.controls.darkTheme': 'Tema escuro',
  'header.controls.lightTheme': 'Tema claro',
  'header.controls.language': 'Idioma',
  'header.controls.navigation': 'Menu de navegação',
  'header.controls.noLanguages': 'Nenhum idioma disponível',
  'footer.social.navigation': 'Links sociais',
  'footer.social.github': 'Abrir perfil do GitHub',
  'footer.social.linkedin': 'Abrir perfil do LinkedIn',
  'footer.social.whatsapp': 'Abrir contato no WhatsApp',
  'footer.social.email': 'Enviar um e-mail',
  'footer.copyright.name': 'Victor Hanszman',
  'footer.copyright.year': '© {{ year }}',
  'common.actions.viewDetails': 'Ver detalhes',
  'common.actions.close': 'Fechar',
  'common.actions.save': 'Salvar',
  'common.actions.showMore': 'Mostrar mais',
  'common.actions.showLess': 'Mostrar menos',
  'common.formatting.toolbar': 'Formatação de texto',
  'common.formatting.bold': 'Negrito',
  'common.formatting.italic': 'Itálico',
  'common.formatting.underline': 'Sublinhado',
  'common.formatting.unorderedList': 'Lista com marcadores',
  'common.search.label': 'Busca',
  'common.search.placeholder': 'Buscar registros',
  'common.pagination.navigation': 'Paginacao',
  'common.pagination.first': 'Primeira',
  'common.pagination.previous': 'Anterior',
  'common.pagination.next': 'Proxima',
  'common.pagination.last': 'Ultima',
  'common.pagination.pageLabel': 'Pagina',
  'common.pagination.page': 'Ir para a pagina {{ page }}',
  'common.entities.projects': 'Projetos',
  'common.entities.technologies': 'Tecnologias',
  'common.entities.technologiesAndTools': 'Tecnologias & Ferramentas',
  'common.fields.slug': 'Slug',
  'common.fields.sortOrder': 'Ordem de exibição',
  'common.empty.linkedCompanies': 'Nenhuma empresa vinculada ainda.',
  'common.entities.links': 'Links',
  'common.entities.formation': 'Formação',
  'common.fields.startDate': 'Data inicial',
  'common.fields.endDate': 'Data final',
  'common.fields.stack': 'Stack',
  'common.relations.imageAssets': 'Image assets relacionados',
  'common.relations.experiences': 'Experiences relacionadas',
  'common.relations.customers': 'Clientes relacionados',
  'common.feedback.requiredEnglishSummary': 'O resumo em inglês é obrigatório antes do envio.',
  'common.feedback.requiredPortugueseSummary':
    'O resumo em português é obrigatório antes do envio.',
  'common.feedback.invalidSortOrder': 'A ordem deve ser um número válido.',
  'common.feedback.missingAdminSessionShort':
    'A sessão administrativa autenticada não está disponível.',
  'common.placeholders.displayOrder': 'Digite a ordem de exibição',
  'common.placeholders.spanishSummary': 'Digite o resumo em espanhol',
  'common.empty.imageAssets': 'Nenhum recurso de imagem disponível.',
  'common.empty.links': 'Nenhum link disponível.',
  'common.empty.technologies': 'Nenhuma tecnologia disponível.',
  'common.empty.formations': 'Nenhuma formação esta disponível.',
  'common.empty.imageAssetsForRelation':
    'Nenhum image asset está disponível para relacionar agora.',
  'common.empty.experiencesForRelation':
    'Nenhuma experiência pública está disponível para relacionamento agora.',
  'common.empty.unregisteredText': 'Nenhum texto foi registrado ainda.',
  'common.empty.stackDistribution': 'Nenhuma distribuição de stack foi retornada ainda.',
  'common.filters.all': 'Todos',
  'common.filters.others': 'Outros',
  'common.states.highlighted': 'Em destaque',
  'common.states.notHighlighted': 'Sem destaque',
  'common.location.beloHorizonteBrazil': 'Belo Horizonte, Brasil',
  'common.sections.clients': '// clientes',
  'common.sections.projects': '// projetos',
  'common.sections.techStack': '// stack_técnica',
  'common.sections.rolesHeld': '// cargos_ocupados',
  'common.sections.description': '// descrição',
  'common.states.studying': 'Estudando',
  'common.entities.home': 'Home',
  'common.entities.skills': 'Habilidades',
  'common.entities.dashboard': 'Painel',
  'common.entities.experiences': 'Experiências',
  'common.entities.formations': 'Formações',
  'common.entities.customers': 'Clientes',
  'common.entities.languages': 'Idiomas',
  'common.entities.jobs': 'Jobs',
  'common.entities.technologyContexts': 'Technology contexts',
  'common.languages.english': 'Inglês',
  'common.languages.portuguese': 'Português',
  'common.languages.spanish': 'Espanhol',
  'common.values.other': 'Outro',
  'common.entities.imageAssets': 'Imagens',
  'common.fields.type': 'Tipo',
  'common.fields.name': 'Nome',
  'common.fields.portugueseName': 'Nome em português',
  'common.fields.englishName': 'Nome em inglês',
  'common.fields.description': 'Descrição',
  'common.fields.summary': 'Resumo',
  'common.fields.date': 'Data',
  'common.fields.code': 'Código',
  'common.fields.url': 'URL',
  'common.fields.frequency': 'Frequencia',
  'common.fields.level': 'Nivel',
  'common.fields.technology': 'Tecnologia',
  'common.fields.environment': 'Ambiente',
  'common.fields.spanishName': 'Nome em espanhol',
  'common.fields.spanishTitle': 'Título em espanhol',
  'common.fields.spanishSummary': 'Resumo em espanhol',
  'common.fields.spanishDescription': 'Descrição em espanhol',
  'common.fields.fileName': 'Nome do arquivo',
  'common.fields.filePath': 'Caminho do arquivo',
  'common.fields.folder': 'Pasta',
  'common.fields.kind': 'Tipo',
  'common.fields.mimeType': 'MIME type',
  'common.fields.degreeType': 'Tipo de formação',
  'common.fields.institution': 'Instituição',
  'common.fields.settingKey': 'Chave do setting',
  'common.fields.jsonValue': 'Valor JSON',
  'common.fields.proficiency': 'Proficiência',
  'common.fields.highlightStatus': 'Status de destaque',
  'common.fields.highlight': 'Destaque',
  'common.fields.totalCompanyPeriod': 'Período total na empresa:',
  'common.relations.technologies': 'Tecnologias relacionadas',
  'common.relations.formations': 'Formações relacionadas',
  'common.relations.links': 'Links relacionados',
  'common.feedback.missingAdminSession':
    'A sessão administrativa autenticada não está disponível. Faça login novamente para continuar.',
  'common.feedback.invalidIntegerSortOrder': 'A ordem deve ser um número inteiro válido.',
  'common.feedback.invalidDateRange': 'A data de término não pode ser anterior à data de início.',
  'common.feedback.requiredStartDate': 'A data inicial é obrigatória antes do envio.',
  'common.feedback.requiredSpanishName': 'O nome em espanhol é obrigatório.',
  'common.feedback.requiredSlug': 'O slug é obrigatório.',
  'common.feedback.requiredTitlePt': 'O título em português é obrigatório.',
  'common.feedback.requiredTitleEn': 'O título em inglês é obrigatório.',
  'common.feedback.requiredTitleEs': 'O título em espanhol é obrigatório.',
  'common.feedback.requiredSummaryEs': 'O resumo em espanhol é obrigatório.',
  'common.placeholders.integerSortOrder': 'Digite a ordem inteira de exibição',
  'common.empty.projectsForRelation':
    'Nenhum projeto público está disponível para relacionamento agora.',
  'common.empty.technologiesForRelation':
    'Nenhuma tecnologia pública está disponível para relacionamento agora.',
  'pages.home.hero.availability': 'Disponível para trabalho',
  'pages.home.hero.greeting': 'Olá, sou',
  'pages.home.hero.subtitle': 'Engenheiro de Software Full Stack Sênior',
  'pages.home.hero.description':
    'Engenheiro de Software Sênior com experiência de desenvolvimento tanto em Front-End como em Back-End. Moro em Belo Horizonte, Minas Gerais, Brasil. Atualmente trabalhando remotamente e estou aberto a novas oportunidades em desenvolvimento de software.',
  'pages.home.hero.cta.projects': 'Ver Projetos',
  'pages.home.hero.cta.experiences': 'Minha Experiência',
  'pages.home.hero.social.navigation': 'Links sociais',
  'pages.home.metrics.years.label': 'Anos de experiência',
  'pages.home.metrics.years.description':
    'Há muitos anos construindo produtos web de alta qualidade no mercado',
  'pages.home.metrics.projects.label': 'Projetos entregues',
  'pages.home.metrics.projects.description':
    'Experiência com muitos projetos profissionais, pessoais e academicos.',
  'pages.home.metrics.technologies.description':
    'Grande quantidade de ferramentas já utilizadas para desenvolvimento e estudos.',
  'pages.home.metrics.ariaLabel': 'Métricas do portfolio',
  'pages.home.loading': 'Conectando dados reais do portfolio...',
  'pages.home.error': 'Os dados reais da home estão indisponíveis no momento.',
  'pages.home.stack.label': '// CORE_STACK',
  'pages.home.stack.title': 'Tecnologias Principais',
  'pages.home.stack.description':
    'Atualmente essas são as principais stacks que tenho mais domínio e que tive mais prática ao longo da minha carreira no desenvolvimento de software.',
  'pages.home.stack.moreSkills': 'Veja mais habilidades',
  'pages.home.highlightedProjects.label': '// PRINCIPAIS_CONQUISTAS',
  'pages.home.highlightedProjects.title': 'Projetos em Destaque',
  'pages.home.highlightedProjects.description':
    'Uma seleção de projetos que representam meus trabalhos e desafios técnicos mais relevantes.',
  'pages.home.highlightedProjects.moreProjects': 'Veja mais projetos',
  'pages.experiences.sectionLabel': '// CAREER_TIMELINE',
  'pages.experiences.title': 'Experiência Profissional',
  'pages.experiences.description':
    'Uma jornada cronológica pela minha carreira construindo soluções de software de impacto.',
  'pages.experiences.timeline.loading': 'Carregando relacionamentos reais de experiences...',
  'pages.experiences.timeline.error': 'O endpoint de experiences está indisponível agora.',
  'pages.experiences.timeline.empty':
    'Nenhum capítulo publicado de experiência foi retornado ainda.',
  'pages.experiences.timeline.emptyCustomers': 'Nenhum cliente vinculado ainda.',
  'pages.experiences.timeline.emptyProjects':
    'Nenhum projeto relacionado foi retornado para este capítulo.',

  'pages.experiences.technology.level': 'Nível de conhecimento',
  'pages.experiences.technology.frequency': 'Frequência de uso',
  'pages.experiences.technology.projects': 'Projetos utilizados',
  'pages.experiences.customer.company': 'Empresa relacionada',
  'pages.experiences.customer.projects': 'Projetos relacionados',
  'pages.skills.sectionLabel': '// SKILLS_ARSENAL',
  'pages.skills.title': 'Habilidades & Tecnologias',
  'pages.skills.description':
    'Uma visão completa do meu arsenal técnico, formação e proficiência em idiomas.',
  'pages.skills.filters.level': 'Nível',
  'pages.skills.education.title': 'Formação',
  'pages.skills.search.placeholder': 'Buscar tecnologia...',
  'pages.skills.catalog.loading': 'Montando grupos de tecnologia...',
  'pages.skills.catalog.error': 'O endpoint de technologies está indisponível agora.',
  'pages.skills.catalog.empty': 'Nenhuma tecnologia publicada corresponde aos filtros atuais.',
  'pages.skills.detail.totalExperience': 'Experiência consolidada',
  'pages.skills.detail.technologyContexts': 'Contextos da tecnologia',
  'pages.skills.detail.contextExperience': 'Experiência por contexto',
  'pages.skills.education.detail.degree': 'Formação',

  'pages.skills.education.detail.gallery': 'Imagens',
  'pages.projects.detail.emptyGallery': 'Nenhuma imagem vinculada',
  'common.time.month': '{{count}} mês',
  'common.time.months': '{{count}} meses',
  'common.time.year': '{{count}} ano',
  'common.time.years': '{{count}} anos',
  'taxonomy.skills.filters.allTypes': 'Todos os tipos',
  'taxonomy.skills.filters.allLevels': 'Todos os níveis',
  'taxonomy.skills.filters.allContexts': 'Todos os contextos',
  'taxonomy.skills.fallback.untyped': 'Sem tipo',
  'taxonomy.skills.fallback.levelNotSet': 'Nível não informado',
  'taxonomy.skills.fallback.frequencyNotSet': 'Frequência não informada',
  'taxonomy.skills.fallback.noDuration': 'Sem período consolidado',
  'taxonomy.skills.fallback.zeroMonths': '0 meses',
  'taxonomy.skills.summary.mapped': 'Tecnologias mapeadas',
  'taxonomy.skills.summary.highlights': 'Destaques',
  'taxonomy.skills.summary.types': 'Tipos',
  'taxonomy.skills.summary.advanced': 'Stack avançada',
  'taxonomy.skills.summary.longest': 'Maior tempo total',
  'taxonomy.skills.group.description':
    '{{count}} tecnologias com tempo real consolidado por contexto.',
  'taxonomy.skills.level.advanced': 'Avançado',
  'taxonomy.skills.level.intermediate': 'Intermediário',
  'taxonomy.skills.level.basic': 'Básico',

  'taxonomy.skills.stack.frontEnd': 'Front-End',
  'taxonomy.skills.stack.backEnd': 'Back-End',
  'taxonomy.skills.stack.databases': 'Banco de Dados',
  'taxonomy.skills.stack.games': 'Games',
  'taxonomy.skills.stack.mobile': 'Mobile',
  'taxonomy.skills.stack.testing': 'Testes',
  'taxonomy.skills.stack.devops': 'DevOps',
  'taxonomy.skills.stack.concepts': 'Conceitos',
  'taxonomy.skills.stack.others': 'Outros',
  'taxonomy.skills.type.programmingLanguages': 'Linguagens de programação',
  'taxonomy.skills.type.webLanguages': 'Linguagens web',
  'taxonomy.skills.type.libraries': 'Bibliotecas',
  'taxonomy.skills.type.frameworks': 'Frameworks',
  'taxonomy.skills.type.relationalDataBases': 'Bancos de dados relacionais',
  'taxonomy.skills.type.nonRelationalDataBases': 'Bancos de dados não relacionais',
  'taxonomy.skills.type.databasesManagementSystems': 'Sistemas de gerenciamento de bancos de dados',
  'taxonomy.skills.type.orms': 'ORMs',
  'taxonomy.skills.type.codeEditors': 'Editores de código',
  'taxonomy.skills.type.techniques': 'Técnicas',
  'taxonomy.skills.type.methodologies': 'Metodologias',
  'taxonomy.skills.type.markupAndFormatSyntaxes': 'Sintaxes de Marcação e Formatos',
  'taxonomy.skills.type.packageManagers': 'Gerenciadores de pacotes',
  'taxonomy.skills.type.packages': 'Pacotes',
  'taxonomy.skills.type.versioningPlatforms': 'Plataformas de versionamento',
  'taxonomy.skills.type.cloudHostingPlatforms': 'Plataformas de hospedagem em nuvem',
  'taxonomy.skills.type.deploymentTools': 'Ferramentas de deploy',
  'taxonomy.skills.type.developmentPlatforms': 'Plataformas de desenvolvimento',
  'taxonomy.skills.type.runtimeEnvironments': 'Ambientes de execução',
  'taxonomy.skills.type.testingTools': 'Ferramentas de testes',
  'taxonomy.skills.type.buildTools': 'Ferramentas de build',
  'taxonomy.skills.type.documentationTools': 'Ferramentas de documentação',
  'taxonomy.skills.type.preprocessors': 'Pré-processadores',
  'taxonomy.skills.type.protocols': 'Protocolos',
  'taxonomy.skills.type.artificialIntelligences': 'Inteligências artificiais',
  'taxonomy.skills.type.designPatterns': 'Padrões de projeto',
  'taxonomy.skills.type.programmingParadigms': 'Paradigmas de programação',
  'taxonomy.skills.type.architectures': 'Arquiteturas',
  'taxonomy.skills.type.principles': 'Princípios',
  'taxonomy.skills.frequency.frequent': 'Frequente',
  'taxonomy.skills.frequency.occasional': 'Ocasional',
  'taxonomy.skills.frequency.rare': 'Rara',
  'taxonomy.skills.context.professional': 'Profissional',
  'taxonomy.skills.context.personal': 'Pessoal',
  'taxonomy.skills.context.academic': 'Acadêmico',
  'taxonomy.skills.context.study': 'Estudo',
  'taxonomy.experiences.projectStatus.completed': 'Concluído',
  'taxonomy.experiences.projectStatus.inProgress': 'Em andamento',

  'taxonomy.experiences.projectEnvironment.fullstack': 'Full stack',
  'taxonomy.experiences.present': 'Atual',
  'pages.projects.sectionLabel': '// PROJECTS_SHOWCASE',
  'pages.projects.description':
    'Uma coleção de aplicações reais, profissionais, trabalhos acadêmicos e experimentos pessoais.',
  'pages.projects.filters.label': 'Filtros dos cases',
  'pages.projects.search.placeholder': 'Buscar projetos...',
  'pages.projects.catalog.loading': 'Montando os case studies de projetos...',
  'pages.projects.catalog.error': 'O endpoint de projects está indisponível agora.',
  'pages.projects.catalog.empty': 'Nenhum projeto publicado corresponde aos filtros atuais.',

  'pages.projects.card.links': 'Links e referências',
  'pages.projects.detail.gallery': 'Galeria ampliada',
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
  'taxonomy.projects.summary.linkedAssets': 'Assets vinculados',
  'taxonomy.projects.summary.richestStack': 'Stack mais ampla',
  'taxonomy.projects.fallback.noAssets': 'Nenhum asset visual vinculado ainda.',
  'taxonomy.projects.fallback.noLinks': 'Nenhum link publicado foi vinculado ainda.',
  'taxonomy.projects.fallback.untitledLink': 'Link sem título',
  'pages.dashboard.sectionLabel': '// DASHBOARD',
  'pages.dashboard.title': 'Painel Analítico',
  'pages.dashboard.description':
    'Análises agregadas entre stacks, ferramentas e projetos da carreira em um painel com gráficos informativos.',
  'pages.dashboard.snapshot.loading': 'Carregando agregados do dashboard...',
  'pages.dashboard.snapshot.error':
    'Os endpoints agregados do dashboard estão indisponíveis agora.',
  'pages.dashboard.snapshot.metrics.formations': 'Formações / idiomas',
  'pages.dashboard.snapshot.metrics.jobs': 'Cargos',
  'pages.dashboard.stacks.label': 'Distribuição de stack',
  'pages.dashboard.stacks.title': 'Onde o portfolio carrega mais peso técnico hoje',
  'pages.dashboard.stacks.description':
    'Cada área combina projetos relacionados e tecnologias mapeadas para deixar as zonas mais fortes evidentes de imediato.',
  'pages.dashboard.distribution.label': 'Pegada de projetos',
  'pages.dashboard.distribution.title': 'Contexto de entrega, ambientes e densidade de destaque',
  'pages.dashboard.distribution.description':
    'Este bloco separa volume destacado, contexto e ambiente para o catálogo de projetos ficar mais legível.',
  'pages.dashboard.distribution.empty':
    'Nenhum dado de distribuição de projetos foi retornado ainda.',
  'pages.dashboard.distribution.environments': 'Ambientes',
  'pages.dashboard.technology.label': 'Uso de tecnologia',
  'pages.dashboard.technology.title': 'Sinais de uso da stack',
  'pages.dashboard.technology.description':
    'Top tecnologias e seus padrões de frequência, contexto e origem saem direto das relações agregadas da API.',
  'pages.dashboard.technology.empty': 'Nenhum agregado de uso de tecnologia foi retornado ainda.',
  'pages.dashboard.technology.levels': 'Níveis',
  'pages.dashboard.technology.frequencies': 'Frequências',
  'pages.dashboard.technology.contexts': 'Contextos',
  'pages.dashboard.technology.sources': 'Origens',
  'pages.dashboard.technology.links': 'sinais vinculados',
  'pages.dashboard.projectsByType.label': 'Projetos por tipo de tecnologia',
  'pages.dashboard.projectsByType.title': 'Projetos por tipo de tecnologias',
  'pages.dashboard.projectsByType.description':
    'O gráfico final mantém vivo o padrão do dashboard antigo ao agrupar os projetos publicados pela família de tecnologia que eles realmente usam.',
  'pages.dashboard.projectsByType.empty':
    'Nenhuma distribuição de tecnologias por projeto foi retornada ainda.',
  'pages.dashboard.projectsByType.selectLabel': 'Tipo de tecnologia',
  'pages.login.sectionLabel': '// ACESSO_ADMIN',
  'pages.login.title': 'Acesso administrativo',
  'pages.login.description':
    'Uma rota protegida e não pública para gerenciar o portfolio pelo fluxo autenticado de admin.',
  'pages.login.security.title': 'Rota protegida',
  'pages.login.security.description':
    'Use a conta admin existente na API para desbloquear as próximas etapas administrativas do portfolio.',
  'pages.login.form.title': 'Autenticar sessão administrativa',
  'pages.login.form.description':
    'Este login permanece intencionalmente oculto da navegação pública e só fica disponível pela URL direta.',
  'pages.login.form.emailLabel': 'E-mail administrativo',
  'pages.login.form.emailPlaceholder': 'Digite seu e-mail',
  'pages.login.form.passwordLabel': 'Senha administrativa',
  'pages.login.form.passwordPlaceholder': 'Digite sua senha',
  'pages.login.form.passwordVisibility.show': 'Mostrar senha',
  'pages.login.form.passwordVisibility.hide': 'Ocultar senha',
  'pages.login.form.submit': 'Entrar',
  'pages.login.feedback.invalidCredentials':
    'As credenciais administrativas são inválidas ou a sessão não pôde ser iniciada.',
  'pages.admin.shell.eyebrow': '// ADMIN_WORKSPACE',
  'pages.admin.shell.title': 'Workspace administrativo',
  'pages.admin.shell.description':
    'Shell operacional protegida para os fluxos finais da F8, já alinhada com rota oculta, sessão autenticada e roadmap das entidades.',
  'pages.admin.shell.actions.logout': 'Sair',
  'pages.admin.shell.session.kicker': 'Sessão autenticada',
  'pages.admin.shell.registry.kicker': 'Registro de entidades',
  'pages.admin.shell.registry.title': '{{count}} fluxos de entidade',
  'pages.admin.shell.registry.description':
    'A shell administrativa agora centraliza todos os domínios protegidos planejados para as próximas subetapas de CRUD.',
  'pages.admin.facts.route.title': 'Rota oculta confirmada',
  'pages.admin.facts.route.description':
    'O menu público continua intacto enquanto /admin permanece acessível apenas por URL direta e pelo guard.',
  'pages.admin.facts.validation.title': 'Validação de sessão ativa',
  'pages.admin.facts.validation.description':
    'Toda entrada protegida continua dependente de bearer token válido e confirmação do servidor via GET /admin/session.',
  'pages.admin.facts.storage.title': 'Persistência com escopo',
  'pages.admin.facts.storage.description':
    'A sessão administrativa atual continua isolada em sessionStorage para evitar acesso prolongado sem necessidade.',
  'pages.admin.entitiesSection.eyebrow': '// PROXIMAS_SUBETAPAS',
  'pages.admin.entitiesSection.title': 'Roadmap das entidades protegidas',
  'pages.admin.entitiesSection.description':
    'Cada card abaixo marca a ordem oficial da F8, sua família de endpoint protegido e as ações de create, update e delete que serão habilitadas nas próximas entregas.',
  'pages.admin.operations.create': 'Criar',
  'pages.admin.operations.read': 'Ler',
  'pages.admin.operations.update': 'Editar',
  'pages.admin.operations.delete': 'Excluir',
  'pages.admin.operations.yes': 'Sim',
  'pages.admin.operations.no': 'Não',
  'pages.admin.operations.emptyRelations': 'Nenhum registro relacionado está vinculado.',
  'pages.admin.relationMode.owner': 'Relacionamentos da entidade dona',
  'pages.admin.relationMode.dedicated': 'Entidade relacional dedicada',
  'pages.admin.entities.links.description':
    'Referências externas como repositórios, demos, documentos e destinos complementares de navegação.',
  'pages.admin.links.sectionLabel': '// LINKS',
  'pages.admin.links.description':
    'CRUD protegido para referências externas reutilizáveis conectadas a projetos, experiências, tecnologias e futuros registros de formação por meio de arrays relacionais próprios.',
  'pages.admin.links.states.loading': 'Carregando a coleção protegida de links...',
  'pages.admin.links.states.empty': 'Nenhum link protegido foi cadastrado ainda.',

  'pages.admin.links.card.emptyRelations':
    'Nenhum registro relacionado está vinculado a este link no momento.',
  'pages.admin.links.fields.url.placeholder': 'Digite a URL pública do link',
  'pages.admin.links.fields.labelPt.label': 'Rótulo em português',
  'pages.admin.links.fields.labelPt.placeholder':
    'Digite o rótulo em português exibido ao visitante',
  'pages.admin.links.fields.labelEn.label': 'Rótulo em inglês',
  'pages.admin.links.fields.labelEn.placeholder': 'Digite o rótulo em inglês exibido ao visitante',
  'pages.admin.links.fields.descriptionPt.label': 'Descrição em português',
  'pages.admin.links.fields.descriptionPt.placeholder': 'Descreva este link em português',
  'pages.admin.links.fields.descriptionEn.label': 'Descrição em inglês',
  'pages.admin.links.fields.descriptionEn.placeholder': 'Descreva este link em inglês',
  'pages.admin.links.fields.type.empty': 'Nenhum tipo de link esta disponível no momento.',

  'pages.admin.links.fields.type.options.NPM': 'npm',
  'pages.admin.links.fields.type.options.DOCS': 'Documentacao',
  'pages.admin.links.fields.type.options.LINKEDIN': 'LinkedIn',
  'pages.admin.links.fields.type.options.WEBSITE': 'Site',
  'pages.admin.links.fields.type.options.ARTICLE': 'Artigo',
  'pages.admin.links.fields.type.options.FIGMA': 'Figma',
  'pages.admin.links.fields.sortOrder.placeholder': 'Digite a ordem inteira do link',
  'pages.admin.links.fields.projects.description':
    'Selecione todos os projetos que devem expor este link em suas referências públicas.',
  'pages.admin.links.fields.experiences.label': 'Experiências relacionadas',
  'pages.admin.links.fields.experiences.description':
    'Selecione todas as experiências que devem manter este link em seus arrays relacionais.',
  'pages.admin.links.fields.technologies.description':
    'Selecione todas as tecnologias que devem expor este link em futuros contextos públicos.',
  'pages.admin.links.fields.formations.description':
    'Selecione todas as formações que devem expor este link.',
  'pages.admin.links.fields.formations.empty':
    'Nenhuma formação está disponível para relacionamento agora.',
  'pages.admin.links.modal.create.title': 'Criar link',
  'pages.admin.links.modal.read.title': 'Ler links',
  'pages.admin.links.modal.read.description':
    'Revise os links protegidos atuais e abra os fluxos de edição ou exclusão diretamente de cada registro.',
  'pages.admin.links.modal.pickUpdate.title': 'Selecione um link para editar',
  'pages.admin.links.modal.pickUpdate.description':
    'Escolha um dos links protegidos atuais para abrir seu formulário de edição.',
  'pages.admin.links.modal.pickDelete.title': 'Selecione um link para excluir',
  'pages.admin.links.modal.pickDelete.description':
    'Escolha um dos links protegidos atuais para confirmar sua remoção.',
  'pages.admin.links.modal.update.title': 'Editar link',
  'pages.admin.links.modal.delete.title': 'Excluir link',
  'pages.admin.links.modal.delete.description':
    'Esta ação remove permanentemente o link protegido selecionado do portfolio.',
  'pages.admin.links.feedback.created': 'Link protegido criado com sucesso.',
  'pages.admin.links.feedback.updated': 'Link protegido atualizado com sucesso.',
  'pages.admin.links.feedback.deleted': 'Link protegido excluído com sucesso.',
  'pages.admin.links.feedback.requiredUrl': 'A URL do link é obrigatória antes do envio.',
  'pages.admin.links.feedback.requiredType': 'O tipo do link é obrigatório antes do envio.',
  'pages.admin.links.feedback.invalidType':
    'Selecione um dos tipos de link suportados antes de enviar.',

  'pages.admin.links.feedback.selectionRequired':
    'Selecione um link protegido antes de continuar com esta ação.',
  'pages.admin.links.feedback.loadError':
    'A coleção protegida de links não pode ser carregada agora.',
  'pages.admin.links.feedback.saveError': 'O link protegido não pode ser salvo agora.',
  'pages.admin.links.feedback.deleteError': 'O link protegido não pode ser excluído agora.',
  'pages.admin.imageAssets.sectionLabel': '// IMAGE_ASSETS',
  'pages.admin.imageAssets.description':
    'CRUD protegido para arquivos de mídia normalizados conectados a projetos, experiências e tecnologias por meio de arrays relacionais proprietários.',
  'pages.admin.imageAssets.states.loading': 'Carregando a coleção protegida de image assets...',
  'pages.admin.imageAssets.states.empty': 'Nenhum image asset protegido foi cadastrado ainda.',
  'pages.admin.imageAssets.card.dimensions': 'Dimensões',
  'pages.admin.imageAssets.card.spokenLanguages': 'Idiomas',
  'pages.admin.imageAssets.card.jobs': 'Cargos',
  'pages.admin.imageAssets.card.emptyRelations':
    'Nenhum registro relacionado está vinculado a este image asset no momento.',
  'pages.admin.imageAssets.fields.fileName.placeholder': 'Digite o nome único do arquivo do asset',
  'pages.admin.imageAssets.fields.filePath.placeholder':
    'Digite o caminho público do arquivo usado pelo portfolio',
  'pages.admin.imageAssets.fields.folder.placeholder': 'Digite a pasta do asset',
  'pages.admin.imageAssets.fields.kind.empty': 'Nenhum tipo de image asset está disponível agora.',
  'pages.admin.imageAssets.fields.kind.options.ICON': 'Icone',
  'pages.admin.imageAssets.fields.kind.options.SCREENSHOT': 'Captura de tela',
  'pages.admin.imageAssets.fields.altPt.label': 'Alt em português',
  'pages.admin.imageAssets.fields.altPt.placeholder':
    'Descreva o asset em português para acessibilidade',
  'pages.admin.imageAssets.fields.altEn.label': 'Alt em inglês',
  'pages.admin.imageAssets.fields.altEn.placeholder':
    'Descreva o asset em inglês para acessibilidade',
  'pages.admin.imageAssets.fields.captionPt.label': 'Legenda em português',
  'pages.admin.imageAssets.fields.captionPt.placeholder':
    'Digite a legenda em português exibida com este asset',
  'pages.admin.imageAssets.fields.captionEn.label': 'Legenda em inglês',
  'pages.admin.imageAssets.fields.captionEn.placeholder':
    'Digite a legenda em inglês exibida com este asset',
  'pages.admin.imageAssets.fields.mimeType.placeholder': 'Digite o MIME type do asset',
  'pages.admin.imageAssets.fields.width.label': 'Largura',
  'pages.admin.imageAssets.fields.width.placeholder': 'Digite a largura do asset em pixels',
  'pages.admin.imageAssets.fields.height.label': 'Altura',
  'pages.admin.imageAssets.fields.height.placeholder': 'Digite a altura do asset em pixels',
  'pages.admin.imageAssets.fields.projects.description':
    'Selecione todos os projetos que devem expor este arquivo de mídia em sua galeria pública.',
  'pages.admin.imageAssets.fields.experiences.description':
    'Selecione todas as experiências que devem manter este arquivo de mídia em seus arrays de relacionamento.',
  'pages.admin.imageAssets.fields.technologies.description':
    'Selecione todas as tecnologias que devem expor este arquivo de mídia em suas referências públicas.',
  'pages.admin.imageAssets.fields.formations.description':
    'Selecione todas as Formações vinculadas a esta imagem.',
  'pages.admin.imageAssets.fields.spokenLanguages.label': 'Idiomas relacionados',
  'pages.admin.imageAssets.fields.spokenLanguages.description':
    'Selecione todos os idiomas vinculados a esta imagem.',
  'pages.admin.imageAssets.fields.spokenLanguages.empty': 'Nenhum idioma esta disponível.',
  'pages.admin.imageAssets.fields.customers.description':
    'Selecione todos os clientes vinculados a esta imagem.',
  'pages.admin.imageAssets.fields.customers.empty': 'Nenhum cliente esta disponível.',
  'pages.admin.imageAssets.fields.jobs.label': 'Cargos relacionados',
  'pages.admin.imageAssets.fields.jobs.description':
    'Selecione todos os cargos vinculados a esta imagem.',
  'pages.admin.imageAssets.fields.jobs.empty': 'Nenhum cargo esta disponível.',
  'pages.admin.imageAssets.modal.create.title': 'Criar image asset',
  'pages.admin.imageAssets.modal.read.title': 'Ler image assets',
  'pages.admin.imageAssets.modal.read.description':
    'Revise os image assets protegidos atuais e abra fluxos de edição ou exclusão diretamente de cada registro.',
  'pages.admin.imageAssets.modal.pickUpdate.title': 'Selecione um image asset para editar',
  'pages.admin.imageAssets.modal.pickUpdate.description':
    'Escolha um dos image assets protegidos atuais para abrir seu formulário de edição.',
  'pages.admin.imageAssets.modal.pickDelete.title': 'Selecione um image asset para excluir',
  'pages.admin.imageAssets.modal.pickDelete.description':
    'Escolha um dos image assets protegidos atuais para confirmar sua remoção.',
  'pages.admin.imageAssets.modal.update.title': 'Editar image asset',
  'pages.admin.imageAssets.modal.delete.title': 'Excluir image asset',
  'pages.admin.imageAssets.modal.delete.description':
    'Esta ação remove permanentemente o image asset protegido selecionado do portfolio.',
  'pages.admin.imageAssets.feedback.created': 'Image asset protegido criado com sucesso.',
  'pages.admin.imageAssets.feedback.updated': 'Image asset protegido atualizado com sucesso.',
  'pages.admin.imageAssets.feedback.deleted': 'Image asset protegido excluído com sucesso.',
  'pages.admin.imageAssets.feedback.requiredFileName':
    'O nome do arquivo é obrigatório antes do envio.',
  'pages.admin.imageAssets.feedback.requiredFilePath':
    'O caminho do arquivo é obrigatório antes do envio.',
  'pages.admin.imageAssets.feedback.requiredFolder': 'A pasta é obrigatória antes do envio.',
  'pages.admin.imageAssets.feedback.requiredKind':
    'O tipo do image asset é obrigatório antes do envio.',
  'pages.admin.imageAssets.feedback.invalidKind':
    'Selecione um dos tipos de image asset suportados antes do envio.',
  'pages.admin.imageAssets.feedback.requiredMimeType': 'O MIME type é obrigatório antes do envio.',
  'pages.admin.imageAssets.feedback.invalidDimensions':
    'Largura e altura devem ser números inteiros válidos quando informados.',
  'pages.admin.imageAssets.feedback.selectionRequired':
    'Selecione um image asset protegido antes de continuar com esta ação.',
  'pages.admin.imageAssets.feedback.loadError':
    'A coleção protegida de image assets não pode ser carregada agora.',
  'pages.admin.imageAssets.feedback.saveError': 'O image asset protegido não pode ser salvo agora.',
  'pages.admin.imageAssets.feedback.deleteError':
    'O image asset protegido não pode ser excluído agora.',
  'pages.admin.spokenLanguages.sectionLabel': '// SPOKEN_LANGUAGES',
  'pages.admin.spokenLanguages.description':
    'CRUD protegido para os registros de proficiência em idiomas exibidos ao longo do perfil e dos fluxos de skills do portfolio.',
  'pages.admin.spokenLanguages.states.loading': 'Carregando a coleção protegida de idiomas...',
  'pages.admin.spokenLanguages.states.empty': 'Nenhum idioma protegido foi cadastrado ainda.',
  'pages.admin.spokenLanguages.card.emptyRelations':
    'Nenhum image asset relacionado está vinculado a este idioma.',
  'pages.admin.spokenLanguages.fields.code.placeholder': 'Digite o código do idioma',
  'pages.admin.spokenLanguages.fields.namePt.placeholder': 'Digite o nome do idioma em português',
  'pages.admin.spokenLanguages.fields.nameEn.placeholder': 'Digite o nome do idioma em inglês',
  'pages.admin.spokenLanguages.fields.proficiency.empty':
    'Nenhuma opção de proficiência está disponível neste momento.',
  'pages.admin.spokenLanguages.fields.proficiency.options.NATIVE': 'Nativo',
  'pages.admin.spokenLanguages.fields.proficiency.options.FLUENT': 'Fluente',
  'pages.admin.spokenLanguages.fields.highlight.description':
    'Controle se este idioma deve permanecer em destaque no portfolio público.',

  'pages.admin.spokenLanguages.fields.imageAssets.description':
    'Selecione todos os image assets que devem representar visualmente este idioma no portfolio público.',
  'pages.admin.spokenLanguages.fields.imageAssets.empty':
    'Nenhum image asset público está disponível para relacionamento agora.',
  'pages.admin.spokenLanguages.modal.create.title': 'Criar spoken language',
  'pages.admin.spokenLanguages.modal.read.title': 'Ler spoken languages',
  'pages.admin.spokenLanguages.modal.read.description':
    'Revise os spoken languages protegidos atuais e abra fluxos de edição ou exclusão diretamente de cada registro.',
  'pages.admin.spokenLanguages.modal.pickUpdate.title': 'Selecione um spoken language para editar',
  'pages.admin.spokenLanguages.modal.pickUpdate.description':
    'Escolha um dos spoken languages protegidos atuais para abrir seu formulário de edição.',
  'pages.admin.spokenLanguages.modal.pickDelete.title': 'Selecione um spoken language para excluir',
  'pages.admin.spokenLanguages.modal.pickDelete.description':
    'Escolha um dos spoken languages protegidos atuais para confirmar sua remoção.',
  'pages.admin.spokenLanguages.modal.update.title': 'Editar spoken language',
  'pages.admin.spokenLanguages.modal.delete.title': 'Excluir spoken language',
  'pages.admin.spokenLanguages.modal.delete.description':
    'Esta ação remove permanentemente o registro de idioma protegido selecionado do portfolio.',
  'pages.admin.spokenLanguages.feedback.created': 'Spoken language protegido criado com sucesso.',
  'pages.admin.spokenLanguages.feedback.updated':
    'Spoken language protegido atualizado com sucesso.',
  'pages.admin.spokenLanguages.feedback.deleted': 'Spoken language protegido excluído com sucesso.',
  'pages.admin.spokenLanguages.feedback.requiredCode':
    'O código do idioma é obrigatório antes do envio.',
  'pages.admin.spokenLanguages.feedback.requiredNamePt':
    'O nome do idioma em português é obrigatório antes do envio.',
  'pages.admin.spokenLanguages.feedback.requiredNameEn':
    'O nome do idioma em inglês é obrigatório antes do envio.',
  'pages.admin.spokenLanguages.feedback.requiredProficiency':
    'A proficiência do idioma é obrigatória antes do envio.',
  'pages.admin.spokenLanguages.feedback.invalidProficiency':
    'Selecione um dos níveis de proficiência suportados antes do envio.',
  'pages.admin.spokenLanguages.feedback.selectionRequired':
    'Selecione um spoken language protegido antes de continuar com esta ação.',
  'pages.admin.spokenLanguages.feedback.loadError':
    'A coleção protegida de spoken languages não pode ser carregada agora.',
  'pages.admin.spokenLanguages.feedback.saveError':
    'O spoken language protegido não pode ser salvo agora.',
  'pages.admin.spokenLanguages.feedback.deleteError':
    'O spoken language protegido não pode ser excluído agora.',
  'pages.admin.customers.sectionLabel': '// CUSTOMERS',
  'pages.admin.customers.description':
    'CRUD protegido para os registros de clientes conectados a experiências e relacionamentos de mídia do portfolio.',
  'pages.admin.customers.states.loading': 'Carregando a coleção protegida de customers...',
  'pages.admin.customers.states.empty': 'Nenhum customer protegido foi cadastrado ainda.',
  'pages.admin.customers.card.emptyRelations':
    'Nenhum registro relacionado está conectado a este customer.',
  'pages.admin.customers.fields.slug.placeholder': 'Digite o slug único do customer',
  'pages.admin.customers.fields.name.placeholder': 'Digite o nome do customer',
  'pages.admin.customers.fields.summaryPt.placeholder': 'Digite o resumo em português do customer',
  'pages.admin.customers.fields.summaryEn.placeholder': 'Digite o resumo em inglês do customer',
  'pages.admin.customers.fields.highlight.description':
    'Controle se este customer deve permanecer em destaque nas seções públicas do portfolio.',

  'pages.admin.customers.fields.experiences.description':
    'Selecione todas as experiences que devem expor este customer no storytelling público.',
  'pages.admin.customers.fields.experiences.empty':
    'Nenhuma experience está disponível para relacionamento agora.',
  'pages.admin.customers.fields.imageAssets.description':
    'Selecione todos os image assets vinculados a este customer.',
  'pages.admin.customers.fields.imageAssets.empty':
    'Nenhum image asset está disponível para relacionamento agora.',
  'pages.admin.customers.modal.create.title': 'Criar customer',
  'pages.admin.customers.modal.read.title': 'Ler customers',
  'pages.admin.customers.modal.read.description':
    'Revise os customers protegidos atuais e abra fluxos de edição ou exclusão diretamente de cada registro.',
  'pages.admin.customers.modal.pickUpdate.title': 'Selecione um customer para editar',
  'pages.admin.customers.modal.pickUpdate.description':
    'Escolha um dos customers protegidos atuais para abrir seu formulário de edição.',
  'pages.admin.customers.modal.pickDelete.title': 'Selecione um customer para excluir',
  'pages.admin.customers.modal.pickDelete.description':
    'Escolha um dos customers protegidos atuais para confirmar sua remoção.',
  'pages.admin.customers.modal.update.title': 'Editar customer',
  'pages.admin.customers.modal.delete.title': 'Excluir customer',
  'pages.admin.customers.modal.delete.description':
    'Esta ação remove permanentemente o customer protegido selecionado do portfolio.',
  'pages.admin.customers.feedback.created': 'Customer protegido criado com sucesso.',
  'pages.admin.customers.feedback.updated': 'Customer protegido atualizado com sucesso.',
  'pages.admin.customers.feedback.deleted': 'Customer protegido excluído com sucesso.',
  'pages.admin.customers.feedback.requiredSlug': 'O slug do customer é obrigatório antes do envio.',
  'pages.admin.customers.feedback.requiredName': 'O nome do customer é obrigatório antes do envio.',

  'pages.admin.customers.feedback.selectionRequired':
    'Selecione um customer protegido antes de continuar com esta ação.',
  'pages.admin.customers.feedback.loadError':
    'A coleção protegida de customers não pode ser carregada agora.',
  'pages.admin.customers.feedback.saveError': 'O customer protegido não pode ser salvo agora.',
  'pages.admin.customers.feedback.deleteError': 'O customer protegido não pode ser excluído agora.',
  'pages.admin.jobs.sectionLabel': '// JOBS',
  'pages.admin.jobs.description':
    'CRUD protegido para registros de cargos usados para normalizar posições de experiences e relacionamentos com mídias.',
  'pages.admin.jobs.states.loading': 'Carregando a coleção protegida de jobs...',
  'pages.admin.jobs.states.empty': 'Nenhum job protegido foi cadastrado ainda.',
  'pages.admin.jobs.card.emptyRelations':
    'Nenhum registro relacionado está conectado a este job no momento.',
  'pages.admin.jobs.fields.slug.placeholder': 'Digite o slug único do job',
  'pages.admin.jobs.fields.namePt.placeholder': 'Digite o nome do job em português',
  'pages.admin.jobs.fields.nameEn.placeholder': 'Digite o nome do job em inglês',
  'pages.admin.jobs.fields.summaryPt.label': 'Resumo em português',
  'pages.admin.jobs.fields.summaryPt.placeholder': 'Digite o resumo do job em português',
  'pages.admin.jobs.fields.summaryEn.label': 'Resumo em inglês',
  'pages.admin.jobs.fields.summaryEn.placeholder': 'Digite o resumo do job em inglês',
  'pages.admin.jobs.fields.highlight.description':
    'Controla se este job deve permanecer em destaque nas seções públicas do portfolio.',

  'pages.admin.jobs.fields.experiences.description':
    'Selecione todas as experiences que devem expor este job na narrativa pública.',
  'pages.admin.jobs.fields.experiences.empty':
    'Nenhuma experience está disponível para relacionar agora.',
  'pages.admin.jobs.modal.create.title': 'Criar job',
  'pages.admin.jobs.modal.read.title': 'Ler jobs',
  'pages.admin.jobs.modal.read.description':
    'Revise os jobs protegidos atuais e abra fluxos de update ou delete diretamente de cada registro.',
  'pages.admin.jobs.modal.pickUpdate.title': 'Selecione um job para atualizar',
  'pages.admin.jobs.modal.pickUpdate.description':
    'Escolha um dos jobs protegidos atuais para abrir seu formulário de update.',
  'pages.admin.jobs.modal.pickDelete.title': 'Selecione um job para excluir',
  'pages.admin.jobs.modal.pickDelete.description':
    'Escolha um dos jobs protegidos atuais para confirmar sua remoção.',
  'pages.admin.jobs.modal.update.title': 'Atualizar job',
  'pages.admin.jobs.modal.delete.title': 'Excluir job',
  'pages.admin.jobs.modal.delete.description':
    'Esta ação remove permanentemente o job protegido selecionado do portfolio.',
  'pages.admin.jobs.feedback.created': 'Job protegido criado com sucesso.',
  'pages.admin.jobs.feedback.updated': 'Job protegido atualizado com sucesso.',
  'pages.admin.jobs.feedback.deleted': 'Job protegido excluído com sucesso.',
  'pages.admin.jobs.feedback.requiredSlug': 'O slug do job é obrigatório antes do envio.',
  'pages.admin.jobs.feedback.requiredNamePt':
    'O nome do job em português é obrigatório antes do envio.',
  'pages.admin.jobs.feedback.requiredNameEn':
    'O nome do job em inglês é obrigatório antes do envio.',

  'pages.admin.jobs.feedback.selectionRequired':
    'Selecione um job protegido antes de continuar com esta ação.',
  'pages.admin.jobs.feedback.loadError':
    'A coleção protegida de jobs não pode ser carregada agora.',
  'pages.admin.jobs.feedback.saveError': 'O job protegido não pode ser salvo agora.',
  'pages.admin.jobs.feedback.deleteError': 'O job protegido não pode ser excluído agora.',
  'pages.admin.technologies.sectionLabel': '// TECNOLOGIES',
  'pages.admin.technologies.description':
    'CRUD protegido do catalogo de tecnologias usado pela experiencia publica de skills.',
  'pages.admin.technologies.states.loading': 'Carregando a colecao protegida de technologies...',
  'pages.admin.technologies.states.empty': 'Nenhuma technology protegida foi cadastrada ainda.',
  'pages.admin.technologies.fields.slug.placeholder': 'Digite o slug unico da technology',
  'pages.admin.technologies.fields.name.placeholder': 'Digite o nome da technology',
  'pages.admin.technologies.fields.sortOrder.placeholder': 'Digite a ordem de exibicao',
  'pages.admin.technologies.fields.imageAssets.label': 'Imagens relacionadas',
  'pages.admin.technologies.fields.projects.description':
    'Selecione todos os projetos que usam esta tecnologia.',
  'pages.admin.technologies.fields.projects.empty': 'Nenhum projeto esta disponível.',
  'pages.admin.technologies.fields.experiences.label': 'Experiencias relacionadas',
  'pages.admin.technologies.fields.experiences.description':
    'Selecione todas as experiencias que usam esta tecnologia.',
  'pages.admin.technologies.fields.experiences.empty': 'Nenhuma experiencia esta disponível.',
  'pages.admin.technologies.fields.formations.description':
    'Selecione todas as Formações que usam esta tecnologia.',
  'pages.admin.technologies.fields.tags.label': 'Tags relacionadas',
  'pages.admin.technologies.fields.tags.description':
    'Selecione todas as tags vinculadas a esta tecnologia.',
  'pages.admin.technologies.fields.tags.empty': 'Nenhuma tag esta disponível.',
  'pages.admin.technologies.fields.highlight.description':
    'Controle se esta technology deve permanecer destacada no catalogo publico de skills.',
  'pages.admin.technologies.fields.highlight.enabled': 'Destacada',
  'pages.admin.technologies.fields.highlight.disabled': 'Nao destacada',
  'pages.admin.technologies.fields.imageAssets.description':
    'Selecione cada imagem que deve representar visualmente esta technology no portfolio publico.',

  'pages.admin.technologies.card.highlight': 'Destaque',
  'pages.admin.technologies.card.technologyContexts': 'Contextos de tecnologia',
  'pages.admin.technologies.card.tags': 'Etiquetas',
  'pages.admin.technologies.fields.imageAssets.empty': 'Nenhuma imagem está disponível.',
  'pages.admin.technologies.card.emptyRelations':
    'Nenhum registro relacionado esta conectado a esta technology.',
  'pages.admin.technologies.feedback.requiredSlug': 'O slug da technology e obrigatorio.',
  'pages.admin.technologies.feedback.requiredName': 'O nome da technology e obrigatorio.',
  'pages.admin.technologies.feedback.requiredStack': 'A stack da tecnologia é obrigatória.',
  'pages.admin.technologies.feedback.requiredType': 'O tipo da tecnologia é obrigatório.',
  'pages.admin.technologies.feedback.invalidSortOrder': 'A ordem deve ser um numero valido.',
  'pages.admin.technologies.feedback.missingSession':
    'A sessao administrativa nao esta disponível.',
  'pages.admin.technologies.feedback.selectionRequired': 'Selecione uma technology primeiro.',
  'pages.admin.technologies.feedback.loadError':
    'A colecao protegida de technologies nao pode ser carregada agora.',
  'pages.admin.technologies.feedback.saveError': 'A technology protegida nao pode ser salva agora.',
  'pages.admin.technologies.feedback.deleteError':
    'A technology protegida nao pode ser excluida agora.',
  'pages.admin.technologies.feedback.created': 'Technology protegida criada com sucesso.',
  'pages.admin.technologies.feedback.updated': 'Technology protegida atualizada com sucesso.',
  'pages.admin.technologies.feedback.deleted': 'Technology protegida excluida com sucesso.',
  'pages.admin.technologies.modal.create.title': 'Criar technology',
  'pages.admin.technologies.modal.read.title': 'Ler technologies',
  'pages.admin.technologies.modal.pick-update.title': 'Selecione uma technology para editar',
  'pages.admin.technologies.modal.pick-delete.title': 'Selecione uma technology para excluir',
  'pages.admin.technologies.modal.update.title': 'Editar technology',
  'pages.admin.technologies.modal.delete.title': 'Excluir technology',
  'pages.admin.technologies.modal.read.description':
    'Revise as technologies protegidas atuais e abra os fluxos de edicao ou exclusao diretamente em cada registro.',
  'pages.admin.technologies.modal.pickUpdate.description':
    'Escolha uma das technologies protegidas atuais para abrir o formulario de edicao.',
  'pages.admin.technologies.modal.pickDelete.description':
    'Escolha uma das technologies protegidas atuais para confirmar a exclusao.',
  'pages.admin.technologies.modal.delete.description':
    'Esta acao remove permanentemente a technology protegida selecionada do portfolio.',
  'pages.admin.formations.sectionLabel': '// FORMATIONS',
  'pages.admin.formations.description':
    'CRUD protegido para registros acadêmicos e de formação profissional, incluindo relações de stack, links de apoio e image assets.',
  'pages.admin.formations.states.loading': 'Carregando a coleção protegida de formations...',
  'pages.admin.formations.states.empty': 'Nenhuma formation protegida foi cadastrada ainda.',
  'pages.admin.formations.card.emptyRelations':
    'Nenhum registro relacionado está conectado a esta formation no momento.',
  'pages.admin.formations.fields.slug.placeholder': 'Digite o slug único da formation',
  'pages.admin.formations.fields.institution.placeholder': 'Digite o nome da instituição',
  'pages.admin.formations.fields.titlePt.placeholder': 'Digite o título da formation em português',
  'pages.admin.formations.fields.titleEn.placeholder': 'Digite o título da formation em inglês',
  'pages.admin.formations.fields.degreeType.empty':
    'Nenhum tipo de formação está disponível agora.',
  'pages.admin.formations.fields.degreeType.options.TECHNICAL': 'Técnico',
  'pages.admin.formations.fields.degreeType.options.BACHELOR': 'Bacharelado',
  'pages.admin.formations.fields.degreeType.options.POSTGRADUATE': 'Pós-graduação',
  'pages.admin.formations.fields.degreeType.options.MBA': 'MBA',
  'pages.admin.formations.fields.degreeType.options.MASTER': 'Mestrado',
  'pages.admin.formations.fields.degreeType.options.DOCTORATE': 'Doutorado',
  'pages.admin.formations.fields.degreeType.options.BOOTCAMP': 'Bootcamp',
  'pages.admin.formations.fields.degreeType.options.CERTIFICATION': 'Certificação',
  'pages.admin.formations.fields.degreeType.options.COURSE': 'Curso',
  'pages.admin.technologies.options.TOOL': 'Ferramenta',
  'pages.admin.technologies.options.CLOUD': 'Nuvem',
  'pages.admin.technologies.options.TESTING': 'Testes',
  'pages.admin.technologies.options.STYLING': 'Estilizacao',
  'pages.admin.technologies.options.ARCHITECTURE': 'Arquitetura',
  'pages.admin.formations.fields.summaryPt.placeholder':
    'Digite o resumo da formation em português',
  'pages.admin.formations.fields.summaryEn.placeholder': 'Digite o resumo da formation em inglês',
  'pages.admin.formations.fields.startDate.label': 'Data de início',
  'pages.admin.formations.fields.endDate.label': 'Data de término',
  'pages.admin.formations.fields.highlight.description':
    'Controla se esta formation deve permanecer em destaque nas seções públicas do portfolio.',
  'pages.admin.formations.fields.technologies.label': 'Technologies relacionadas',
  'pages.admin.formations.fields.technologies.description':
    'Selecione todas as technologies que devem permanecer relacionadas a esta formation.',
  'pages.admin.formations.fields.technologies.empty':
    'Nenhuma technology está disponível para relacionar agora.',
  'pages.admin.formations.fields.imageAssets.description':
    'Selecione todos os image assets vinculados a esta formation.',
  'pages.admin.formations.modal.create.title': 'Criar formation',
  'pages.admin.formations.modal.read.title': 'Ler formations',
  'pages.admin.formations.modal.read.description':
    'Revise as formations protegidas atuais e abra fluxos de update ou delete diretamente de cada registro.',
  'pages.admin.formations.modal.pickUpdate.title': 'Selecione uma formation para atualizar',
  'pages.admin.formations.modal.pickUpdate.description':
    'Escolha uma das formations protegidas atuais para abrir seu formulário de update.',
  'pages.admin.formations.modal.pickDelete.title': 'Selecione uma formation para excluir',
  'pages.admin.formations.modal.pickDelete.description':
    'Escolha uma das formations protegidas atuais para confirmar sua remoção.',
  'pages.admin.formations.modal.update.title': 'Atualizar formation',
  'pages.admin.formations.modal.delete.title': 'Excluir formation',
  'pages.admin.formations.modal.delete.description':
    'Esta ação remove permanentemente a formation protegida selecionada do portfolio.',
  'pages.admin.formations.feedback.created': 'Formation protegida criada com sucesso.',
  'pages.admin.formations.feedback.updated': 'Formation protegida atualizada com sucesso.',
  'pages.admin.formations.feedback.deleted': 'Formation protegida excluída com sucesso.',
  'pages.admin.formations.feedback.requiredSlug':
    'O slug da formation é obrigatório antes do envio.',
  'pages.admin.formations.feedback.requiredInstitution':
    'A instituição é obrigatória antes do envio.',
  'pages.admin.formations.feedback.requiredTitlePt':
    'O título da formation em português é obrigatório antes do envio.',
  'pages.admin.formations.feedback.requiredTitleEn':
    'O título da formation em inglês é obrigatório antes do envio.',
  'pages.admin.formations.feedback.requiredDegreeType':
    'O tipo de formação é obrigatório antes do envio.',
  'pages.admin.formations.feedback.requiredStartDate':
    'A data de início é obrigatória antes do envio.',
  'pages.admin.formations.feedback.invalidDateRange':
    'A data de término não pode ser anterior à data de início.',

  'pages.admin.formations.feedback.selectionRequired':
    'Selecione uma formation protegida antes de continuar com esta ação.',
  'pages.admin.formations.feedback.loadError':
    'A coleção protegida de formations não pode ser carregada agora.',
  'pages.admin.formations.feedback.saveError': 'A formation protegida não pode ser salva agora.',
  'pages.admin.formations.feedback.deleteError':
    'A formation protegida não pode ser excluída agora.',
  'pages.admin.technologyContexts.sectionLabel': '// CONTEXTOS_DE_TECNOLOGIA',
  'pages.admin.technologyContexts.description':
    'Janelas contextuais que descrevem como cada tecnologia é usada no portfólio.',
  'pages.admin.technologyContexts.states.loading': 'Carregando contextos de tecnologia...',
  'pages.admin.technologyContexts.states.empty':
    'Nenhum contexto de tecnologia protegido foi registrado ainda.',
  'pages.admin.technologyContexts.fields.endedAt.label': 'Data de término',
  'pages.admin.technologyContexts.modal.create.title': 'Criar contexto de tecnologia',
  'pages.admin.technologyContexts.modal.read.title': 'Ler contextos de tecnologia',
  'pages.admin.technologyContexts.modal.read.description':
    'Revise os contextos protegidos atuais e abra os fluxos de edição ou exclusão diretamente em cada registro.',
  'pages.admin.technologyContexts.modal.pickUpdate.title':
    'Selecione um contexto de tecnologia para editar',
  'pages.admin.technologyContexts.modal.pickUpdate.description':
    'Escolha um contexto protegido atual para abrir seu formulário de edição.',
  'pages.admin.technologyContexts.modal.pickDelete.title':
    'Selecione um contexto de tecnologia para excluir',
  'pages.admin.technologyContexts.modal.pickDelete.description':
    'Escolha um contexto protegido atual para confirmar sua remoção.',
  'pages.admin.technologyContexts.modal.update.title': 'Editar contexto de tecnologia',
  'pages.admin.technologyContexts.modal.delete.title': 'Excluir contexto de tecnologia',
  'pages.admin.technologyContexts.modal.delete.description':
    'Esta ação remove permanentemente o contexto de tecnologia protegido selecionado.',
  'pages.admin.technologyContexts.feedback.created':
    'Contexto de tecnologia protegido criado com sucesso.',
  'pages.admin.technologyContexts.feedback.updated':
    'Contexto de tecnologia protegido atualizado com sucesso.',
  'pages.admin.technologyContexts.feedback.deleted':
    'Contexto de tecnologia protegido excluído com sucesso.',
  'pages.admin.technologyContexts.feedback.requiredTechnology':
    'A tecnologia é obrigatória antes do envio.',
  'pages.admin.technologyContexts.feedback.requiredContext':
    'O contexto é obrigatório antes do envio.',
  'pages.admin.technologyContexts.feedback.requiredStartDate':
    'A data de início é obrigatória antes do envio.',
  'pages.admin.technologyContexts.feedback.missingSession':
    'A sessão administrativa autenticada não está disponível. Faça login novamente para continuar.',
  'pages.admin.technologyContexts.feedback.loadError':
    'A coleção protegida de contextos de tecnologia não pode ser carregada agora.',
  'pages.admin.technologyContexts.feedback.saveError':
    'O contexto de tecnologia protegido não pode ser salvo agora.',
  'pages.admin.technologyContexts.feedback.deleteError':
    'O contexto de tecnologia protegido não pode ser excluído agora.',
  'pages.admin.entities.image-assets.description':
    'Registros normalizados de mídia usados pelo portfolio por meio de relacionamentos de image assets.',
  'pages.admin.entities.spoken-languages.description':
    'Controle administrativo das entradas de proficiência linguística exibidas no perfil e nos contextos de skills.',
  'pages.admin.entities.customers.description':
    'Organizações clientes referenciadas pelo histórico de experiências e pela narrativa baseada em relacionamentos.',
  'pages.admin.entities.jobs.description':
    'Catálogo de cargos para manter nomeação consistente de papéis e mapeamento relacional nas experiências.',
  'pages.admin.entities.formations.description':
    'Registros acadêmicos e de formação profissional, incluindo links, imagens e relacionamentos de stack.',
  'pages.admin.entities.technologies.description':
    'Catálogo principal de stack com destaques, métricas, tags e arrays relacionais geridos pela entidade.',
  'pages.admin.entities.technology-contexts.description':
    'A única entidade relacional dedicada, usada para registrar janelas contextuais de uso por tecnologia.',
  'pages.admin.entities.experiences.description':
    'Registros do histórico profissional com empresa, papel, cronologia, clientes, projetos e relacionamentos de stack.',
  'pages.admin.entities.projects.description':
    'Entradas de projeto em formato de case, com ambiente, status, período e arrays relacionais próprios.',
  'pages.admin.experiences.sectionLabel': '// EXPERIÊNCIAS',
  'pages.admin.experiences.states.loading': 'Carregando experiências protegidas...',
  'pages.admin.experiences.states.empty': 'Nenhuma experiência protegida foi cadastrada.',
  'pages.admin.experiences.modal.create.title': 'Criar experiência',
  'pages.admin.experiences.modal.read.title': 'Ler experiências',
  'pages.admin.experiences.modal.pickUpdate.title': 'Selecionar experiência para editar',
  'pages.admin.experiences.modal.pickDelete.title': 'Selecionar experiência para excluir',
  'pages.admin.experiences.modal.update.title': 'Editar experiência',
  'pages.admin.experiences.modal.delete.title': 'Excluir experiência',
  'pages.admin.experiences.modal.read.description':
    'Revise as experiências protegidas e abra os fluxos de edição ou exclusão.',
  'pages.admin.experiences.modal.pickUpdate.description':
    'Escolha uma experiência protegida para abrir o formulário.',
  'pages.admin.experiences.modal.pickDelete.description':
    'Escolha uma experiência protegida para confirmar a exclusão.',
  'pages.admin.experiences.modal.delete.description':
    'Esta ação remove permanentemente a experiência selecionada.',
  'pages.admin.experiences.feedback.loadError':
    'Não foi possível carregar as experiências protegidas.',
  'pages.admin.experiences.feedback.saveError': 'Não foi possível salvar a experiência protegida.',
  'pages.admin.experiences.feedback.deleteError':
    'Não foi possível excluir a experiência protegida.',
  'pages.admin.experiences.feedback.created': 'Experiência protegida criada com sucesso.',
  'pages.admin.experiences.feedback.updated': 'Experiência protegida atualizada com sucesso.',
  'pages.admin.experiences.feedback.deleted': 'Experiência protegida excluída com sucesso.',
  'pages.admin.experiences.fields.slug.placeholder': 'Digite o slug único da experiência',
  'pages.admin.experiences.fields.companyName.label': 'Nome da empresa',
  'pages.admin.experiences.fields.companyName.placeholder': 'Digite o nome da empresa',
  'pages.admin.experiences.fields.titlePt.placeholder': 'Digite o cargo em português',
  'pages.admin.experiences.fields.titleEn.placeholder': 'Digite o cargo em inglês',
  'pages.admin.experiences.fields.summaryPt.placeholder': 'Digite o resumo em português',
  'pages.admin.experiences.fields.summaryEn.placeholder': 'Digite o resumo em inglês',
  'pages.admin.experiences.fields.descriptionPt.placeholder': 'Digite a descrição em português',
  'pages.admin.experiences.fields.descriptionEn.placeholder': 'Digite a descrição em inglês',

  'pages.admin.experiences.fields.isCurrent.label': 'Cargo atual',
  'pages.admin.experiences.fields.isCurrent.description': 'Marque esta experiência como atual.',
  'pages.admin.experiences.fields.highlight.description':
    'Mantenha esta experiência destacada no portfólio público.',
  'pages.admin.experiences.feedback.requiredStartDate': 'A data inicial é obrigatória.',
  'pages.admin.experiences.feedback.requiredCompanyName': 'O nome da empresa é obrigatório.',
  'pages.admin.experiences.feedback.requiredSummaryPt': 'O resumo em português é obrigatório.',
  'pages.admin.experiences.feedback.requiredSummaryEn': 'O resumo em inglês é obrigatório.',
  'pages.admin.experiences.feedback.requiredDescriptionPt':
    'A descrição em português é obrigatória.',
  'pages.admin.experiences.feedback.requiredDescriptionEn': 'A descrição em inglês é obrigatória.',
  'pages.admin.experiences.fields.technologies.description':
    'Selecione todas as tecnologias usadas nesta experiência.',
  'pages.admin.experiences.fields.projects.description':
    'Selecione todos os projetos conectados a esta experiência.',
  'pages.admin.experiences.fields.projects.empty': 'Nenhum projeto disponível.',
  'pages.admin.experiences.fields.customers.description':
    'Selecione todos os clientes conectados a esta experiência.',
  'pages.admin.experiences.fields.customers.empty': 'Nenhum cliente disponível.',
  'pages.admin.experiences.fields.jobs.label': 'Cargos relacionados',
  'pages.admin.experiences.fields.jobs.description':
    'Selecione todos os cargos conectados a esta experiência.',
  'pages.admin.experiences.fields.jobs.empty': 'Nenhum cargo disponível.',

  'pages.admin.experiences.fields.imageAssets.description':
    'Selecione todos os recursos de imagem conectados a esta experiência.',
  'pages.admin.projects.states.loading': 'Carregando projetos protegidos...',
  'pages.admin.projects.states.empty': 'Nenhum projeto protegido foi cadastrado.',
  'pages.admin.projects.modal.create.title': 'Criar projeto',
  'pages.admin.projects.modal.read.title': 'Ler projetos',
  'pages.admin.projects.modal.pickUpdate.title': 'Selecionar projeto para editar',
  'pages.admin.projects.modal.pickDelete.title': 'Selecionar projeto para excluir',
  'pages.admin.projects.modal.update.title': 'Editar projeto',
  'pages.admin.projects.modal.delete.title': 'Excluir projeto',
  'pages.admin.projects.modal.read.description':
    'Revise os projetos protegidos e abra os fluxos de edição ou exclusão.',
  'pages.admin.projects.modal.pickUpdate.description':
    'Escolha um projeto protegido para abrir o formulário.',
  'pages.admin.projects.modal.pickDelete.description':
    'Escolha um projeto protegido para confirmar a exclusão.',
  'pages.admin.projects.modal.delete.description':
    'Esta ação remove permanentemente o projeto selecionado.',
  'pages.admin.projects.feedback.loadError': 'Não foi possível carregar os projetos protegidos.',
  'pages.admin.projects.feedback.saveError': 'Não foi possível salvar o projeto protegido.',
  'pages.admin.projects.feedback.deleteError': 'Não foi possível excluir o projeto protegido.',
  'pages.admin.projects.feedback.created': 'Projeto protegido criado com sucesso.',
  'pages.admin.projects.feedback.updated': 'Projeto protegido atualizado com sucesso.',
  'pages.admin.projects.feedback.deleted': 'Projeto protegido excluído com sucesso.',
  'pages.admin.projects.fields.slug.placeholder': 'Digite o slug único do projeto',
  'pages.admin.projects.fields.titlePt.label': 'Título em português',
  'pages.admin.projects.fields.titlePt.placeholder': 'Digite o título em português',
  'pages.admin.projects.fields.titleEn.label': 'Título em inglês',
  'pages.admin.projects.fields.titleEn.placeholder': 'Digite o título em inglês',
  'pages.admin.projects.fields.summaryPt.label': 'Resumo curto em português',
  'pages.admin.projects.fields.summaryPt.placeholder':
    'Digite o resumo curto em português',
  'pages.admin.projects.fields.summaryEn.label': 'Resumo curto em inglês',
  'pages.admin.projects.fields.summaryEn.placeholder': 'Digite o resumo curto em inglês',
  'pages.admin.projects.fields.descriptionPt.label': 'Descrição completa em português',
  'pages.admin.projects.fields.descriptionPt.placeholder':
    'Digite a descrição completa em português',
  'pages.admin.projects.fields.descriptionEn.label': 'Descrição completa em inglês',
  'pages.admin.projects.fields.descriptionEn.placeholder':
    'Digite a descrição completa em inglês',
  'pages.admin.projects.fields.context.label': 'Contexto',
  'pages.admin.projects.fields.context.placeholder': 'Selecione o contexto',
  'pages.admin.projects.fields.status.label': 'Status',
  'pages.admin.projects.fields.status.placeholder': 'Selecione o status',
  'pages.admin.projects.fields.environment.placeholder': 'Selecione o ambiente',
  'pages.admin.projects.fields.featured.label': 'Destaque principal',
  'pages.admin.projects.fields.featured.description':
    'Mantenha o projeto em destaque no portfólio.',
  'pages.admin.projects.fields.highlight.description':
    'Mantenha o projeto enfatizado no portfólio.',
  'pages.admin.projects.feedback.requiredSummaryPt':
    'O resumo curto em português é obrigatório.',
  'pages.admin.projects.feedback.requiredSummaryEn':
    'O resumo curto em inglês é obrigatório.',
  'pages.admin.projects.feedback.requiredDescriptionPt':
    'A descrição completa em português é obrigatória.',
  'pages.admin.projects.feedback.requiredDescriptionEn':
    'A descrição completa em inglês é obrigatória.',
  'pages.admin.projects.feedback.requiredOptions':
    'Selecione todas as opções obrigatórias do projeto.',
  'pages.admin.projects.fields.experiences.description':
    'Selecione todas as experiências conectadas a este projeto.',
  'pages.admin.projects.fields.experiences.empty': 'Nenhuma experiência disponível.',
  'pages.admin.projects.fields.technologies.description':
    'Selecione todas as tecnologias usadas neste projeto.',
  'pages.admin.projects.fields.tags.label': 'Tags relacionadas',
  'pages.admin.projects.fields.tags.description':
    'Selecione todas as tags conectadas a este projeto.',
  'pages.admin.projects.fields.tags.empty': 'Nenhuma tag disponível.',
  'pages.admin.projects.fields.links.description':
    'Selecione todos os links de apoio conectados a este projeto.',

  'pages.admin.projects.fields.imageAssets.description':
    'Selecione todos os recursos de imagem conectados a este projeto.',
  'pages.admin.projects.fields.status.options.ARCHIVED': 'Arquivado',
  'pages.admin.projects.fields.status.options.PLANNED': 'Planejado',
  'pages.admin.projects.fields.status.options.ABANDONED': 'Abandonado',
  'pages.admin.projects.fields.environment.options.FRONTEND': 'Frontend',
  'pages.admin.projects.fields.environment.options.BACKEND': 'Backend',
  'pages.admin.projects.fields.environment.options.MOBILE': 'Mobile',
  'pages.admin.projects.fields.environment.options.OTHER': 'Outro',
  'taxonomy.dashboard.source.experience': 'Experiência',
  'taxonomy.dashboard.source.project': 'Projeto',
  'pages.admin.operations.localized.title': 'Título',

  'pages.admin.operations.localized.shortDescription': 'Resumo curto',
  'pages.admin.operations.localized.fullDescription': 'Descrição completa',
  'pages.admin.operations.localized.label': 'Rótulo',
  'pages.admin.operations.localized.alt': 'Texto alternativo',
  'pages.admin.operations.localized.caption': 'Legenda',
  'pages.admin.experiences.fields.titleEs.placeholder': 'Digite o cargo em espanhol',
  'pages.admin.experiences.fields.descriptionEs.placeholder': 'Digite a descrição em espanhol',
  'pages.admin.experiences.feedback.requiredDescriptionEs':
    'A descrição em espanhol é obrigatória.',
  'pages.admin.projects.fields.titleEs.placeholder': 'Digite o título em espanhol',
  'pages.admin.projects.fields.summaryEs.label': 'Resumo curto em espanhol',
  'pages.admin.projects.fields.summaryEs.placeholder': 'Digite o resumo curto em espanhol',
  'pages.admin.projects.fields.descriptionEs.label': 'Descrição completa em espanhol',
  'pages.admin.projects.fields.descriptionEs.placeholder':
    'Digite a descrição completa em espanhol',
  'pages.admin.projects.feedback.requiredSummaryEs':
    'O resumo curto em espanhol é obrigatório.',
  'pages.admin.projects.feedback.requiredDescriptionEs':
    'A descrição completa em espanhol é obrigatória.',
  'pages.admin.formations.fields.titleEs.placeholder': 'Digite o título em espanhol',
  'pages.admin.spokenLanguages.fields.nameEs.placeholder': 'Digite o nome do idioma em espanhol',

  'pages.admin.customers.fields.summaryEs.placeholder': 'Digite o resumo do cliente em espanhol',
  'pages.admin.jobs.fields.nameEs.placeholder': 'Digite o nome do cargo em espanhol',
  'pages.admin.jobs.fields.summaryEs.placeholder': 'Digite o resumo do cargo em espanhol',
  'pages.admin.links.fields.labelEs.label': 'Rótulo em espanhol',
  'pages.admin.links.fields.labelEs.placeholder': 'Digite o rótulo do link em espanhol',
  'pages.admin.links.fields.descriptionEs.placeholder': 'Digite a descrição do link em espanhol',
  'pages.admin.links.feedback.requiredLabelPt': 'O rótulo em português é obrigatório.',
  'pages.admin.links.feedback.requiredLabelEn': 'O rótulo em inglês é obrigatório.',
  'pages.admin.links.feedback.requiredLabelEs': 'O rótulo em espanhol é obrigatório.',
  'pages.admin.imageAssets.fields.altEs.label': 'Texto alternativo em espanhol',
  'pages.admin.imageAssets.fields.altEs.placeholder':
    'Descreva a imagem em espanhol para acessibilidade',
  'pages.admin.imageAssets.fields.captionEs.label': 'Legenda em espanhol',
  'pages.admin.imageAssets.fields.captionEs.placeholder': 'Digite a legenda em espanhol',
} as const satisfies AppTranslationLanguage;
