
# Plano de Implementação — `hans-portfolio-app`

> Objetivo: guiar a execução do remake do portfólio antigo (`victor_hanszman_portfolio-old`) no repositório novo (`hans-portfolio-app`), usando Angular no front, a `hans-ui-design-lib` via CDN/web components no design system e, em etapa posterior, backend em .NET + PostgreSQL.
>
> Este plano considera:
> - a estrutura e os TODOs do portfólio antigo;
> - a base técnica já iniciada no repositório novo;
> - a `hans-ui-design-lib` e seu modelo de consumo por Angular via CDN;
> - os highlights do currículo atualizado;
> - a direção de produto discutida: menos “catálogo bruto”, mais “vitrine estratégica”.

---

## 1) Contexto e princípios do remake

### 1.1. Posicionamento que o novo portfólio deve comunicar

O novo portfólio precisa comunicar com clareza que Victor é:

- **Engenheiro de Software Full Stack com forte especialização em Front-End**;
- com **7+ anos de experiência** em aplicações web corporativas;
- com foco principal em **Angular, TypeScript e React**;
- com experiência real em **Design Systems, Micro Front-End, modernização de legados, dashboards analíticos, Clean Code, SOLID, TDD e CI/CD**;
- e com repertório complementar em **Node, PHP, C#, .NET, REST APIs, bancos relacionais e DevOps**. fileciteturn0file0L1-L18 fileciteturn0file0L19-L46 fileciteturn0file0L47-L63

### 1.2. Direção do produto

O remake **não** deve repetir a lógica do site antigo como “inventário de cards e filtros”.

A nova direção é:

- **Home como página de impacto**;
- **Highlights visíveis logo cedo**;
- **projetos tratados como cases**;
- **skills organizadas por camadas + classificações múltiplas**;
- **experiências como narrativa de carreira**;
- **dashboard analítico em tela própria**;
- **admin + backend** apenas na etapa seguinte.

### 1.3. Princípios arquiteturais

- **Front-End primeiro, backend depois**;
- **layout e UX pensados para conteúdo real, não layout genérico**;
- **design system como base visual e também como case técnico do portfólio**;
- **dados inicialmente vindos dos JSONs antigos**, com adaptação gradual para novos modelos;
- **i18n desde o início** com `pt-BR` e `en-US`;
- **dark mode e light mode reais**, via combinações de tema da lib;
- **componentes específicos do remake** ficam no próprio projeto;
- **componentes realmente reutilizáveis** devem evoluir na `hans-ui-design-lib`.

---

## 2) Inputs já confirmados no cenário atual

### 2.1. Repositório novo

O repositório novo já foi iniciado com **Angular + TypeScript + Tailwind + SCSS + Karma/Jasmine + ESLint/Prettier + standalone + routing**, e já inclui `@angular-architects/module-federation`. citeturn797322view0turn174109view2

### 2.2. Portfólio antigo

O portfólio antigo já possui as entidades principais em JSON (`projects`, `experiences`, `skills`) e uma lista grande de TODOs relevantes, incluindo responsividade, screenshots, links entre entidades, modais, paginação, gráficos, melhorias de agrupamento, idiomas e exibição das skills. citeturn174109view0turn797322view1

### 2.3. Design system

A `hans-ui-design-lib` já está preparada para:

- uso em **React via npm**;
- uso em **Angular e outras stacks via CDN/web components**;
- aplicação de **temas por combinação de cores**;
- documentação em Storybook;
- e padrão de desenvolvimento focado em testes, lint, build e consistência estrutural. citeturn174109view1

### 2.4. Currículo e perfil profissional

O currículo atualizado reforça como highlights principais:

- criação de **Design System reutilizável** na Siteware;
- migração incremental para **Angular moderno com Micro Front-End**;
- modernização de legado **Razor/C# + Angular antigo**;
- uso de **SOLID, Clean Code, TDD, CI/CD e Docker**;
- experiência com clientes corporativos grandes, incluindo **Ford**;
- experiência com **dashboards analíticos**, telemetria, geolocalização, agendamento, validações complexas e sistemas legados;
- formação em **Sistemas de Informação** e **Pós em Desenvolvimento Web Full Stack**, com TCCs relevantes. fileciteturn0file1L1-L18 fileciteturn0file1L19-L46 fileciteturn0file1L47-L63

---

## 3) Objetivo macro do Codex

O Codex deve implementar o remake em **duas macrofases**:

1. **Fase Front-End / Conteúdo / UX**
   - sem backend;
   - usando os JSONs antigos como source of truth inicial;
   - reestruturando o produto;
   - aplicando i18n, layout novo, temas, componentes da lib e componentes locais.

2. **Fase Back-End / Admin / Persistência**
   - com `.NET/C# + PostgreSQL (Neon DB)`;
   - com autenticação administrativa;
   - com CRUDs;
   - com modelagem relacional mais madura;
   - migrando os dados do JSON para banco.

---

## 4) Arquitetura alvo do produto

### 4.1. Mapa de páginas do remake

#### Públicas
- `/` → **Home**
- `/projects` → **Todos os projetos**
- `/projects/:slug` → **Detalhe do projeto / case**
- `/experience` → **Experiências**
- `/skills` → **Skills, formações, idiomas e competências**
- `/dashboard` → **Dashboard analítico**
- `/about` → **Resumo profissional e contexto pessoal leve**
- `/contact` → **Contato e links**
- `/not-found`

#### Administrativas (fase futura)
- `/admin/login`
- `/admin`
- `/admin/projects`
- `/admin/experiences`
- `/admin/skills`
- `/admin/formations`
- `/admin/languages`
- `/admin/customers`
- `/admin/jobs`
- `/admin/tags`
- `/admin/assets`
- `/admin/settings`

---

## 5) Estratégia de conteúdo

### 5.1. Home

A Home deve priorizar:

1. **Hero**
2. **Highlights**
3. **Resumo profissional**
4. **Core stack**
5. **Experiências em destaque**
6. **Prévia do dashboard**
7. **CTA final**

#### Hero
Conteúdo recomendado:
- Nome
- Título forte:
  - `Engenheiro de Software Full Stack | Especialista em Front-End`
- Subheadline:
  - foco em Angular, TypeScript, React, Design Systems, Micro Front-End e modernização de legados
- CTAs:
  - `Ver highlights`
  - `Baixar currículo`
  - `GitHub`
  - `LinkedIn`
  - `Contato`

#### Highlights
Mostrar 3 a 6 highlights na Home.
Cada card precisa ter:
- imagem/thumbnail;
- título;
- resumo curto;
- stack principal;
- contexto (profissional / pessoal / acadêmico);
- papel exercido;
- links (deploy / git / npm / docs, quando houver).

#### Resumo profissional
Bloco curto com narrativa:
- 7+ anos;
- experiência enterprise;
- especialização em front;
- backend complementar;
- foco em qualidade, escalabilidade e manutenção.

#### Core stack
Listagem visual e curada da stack principal.

#### CTA final
Convidar para:
- ver todos os projetos;
- acessar GitHub;
- baixar currículo;
- entrar em contato.

---

### 5.2. Página de projetos

A tela de projetos deve substituir o modelo antigo de listagem crua por uma vitrine mais estratégica.

#### Estrutura
- cabeçalho da página;
- barra de busca;
- filtros;
- alternância de visualização;
- grid de cards;
- paginação ou carregamento incremental;
- empty states;
- states de loading.

#### Filtros recomendados
- texto;
- tecnologia;
- contexto;
- status;
- highlight;
- período/ano;
- tipo de projeto.

#### Visualização
Suportar dois modos:
- **Grid** → cards compactos;
- **Case list** → cards maiores e mais descritivos.

#### Detalhe de projeto (`/projects/:slug`)
Cada projeto importante deve ter página própria com:
- hero do projeto;
- contexto;
- problema;
- papel exercido;
- decisões técnicas;
- stack;
- imagens;
- links;
- aprendizados;
- tecnologias relacionadas;
- projetos relacionados.

#### Categorização de projetos
Separar visualmente:
- highlights;
- profissionais;
- pessoais;
- acadêmicos;
- estudos / labs.

---

### 5.3. Página de experiências

Transformar a tela em **timeline narrativa**.

Cada experiência deve conter:
- empresa;
- cargo;
- período;
- descrição resumida;
- responsabilidades;
- entregas/destaques;
- clientes vinculados;
- projetos vinculados;
- tecnologias vinculadas;
- links relacionados, quando existirem.

#### Blocos importantes
- visão geral da carreira;
- timeline principal;
- cards de impacto;
- filtros por período, empresa e tecnologia;
- visão opcional por cliente.

---

### 5.4. Página de skills

A tela de skills deve abandonar a lógica de “Pokédex de tecnologia” e ganhar mais estrutura.

#### Seções
- core stack;
- front-end;
- back-end;
- testes e qualidade;
- bancos e ORM;
- devops e ferramentas;
- conceitos e arquitetura;
- formações;
- idiomas;
- tecnologias em estudo;
- tecnologias já utilizadas.

#### Classificação de cada tecnologia
Seguir a proposta do usuário: cada tecnologia pode ter **três eixos independentes**.

##### Eixo 1 — frequência de uso
- `frequent`
- `occasional`
- `past-use`

##### Eixo 2 — contexto de uso
- `professional`
- `personal`
- `academic`
- `study`

##### Eixo 3 — nível
- `advanced`
- `intermediate`
- `basic`

Essa modelagem é melhor do que misturar tudo em uma única “senioridade” artificial.

#### Core stack recomendada
Com base no currículo e no objetivo do portfólio:
- Angular
- TypeScript
- JavaScript
- React
- HTML
- CSS / SCSS
- Tailwind
- Node
- Design Systems
- Micro Front-End
- Git

Como stack secundária de peso:
- Next
- PHP
- Laravel
- C#
- .NET
- REST APIs
- MySQL
- SQL Server
- PostgreSQL
- Docker
- Azure DevOps
- CI/CD
- Jasmine
- Karma
- Vitest
- TDD
- SOLID
- Clean Code fileciteturn0file0L57-L63

#### Conceitos
Adicionar uma seção própria para:
- OOP / POO
- MVC
- SOLID
- Clean Code
- TDD
- Design Patterns
- Programming Paradigms
- Architectures
- Componentization
- Responsive Design
- Accessibility
- API Integration
- Dashboard Development

---

### 5.5. Dashboard analítico

Como você quer usar isso também como prova de experiência em dashboards, faz sentido ter uma tela própria.

#### Objetivo da página
Demonstrar:
- leitura analítica do próprio histórico;
- capacidade de modelar informação;
- domínio visual de dashboards;
- experiência com gráficos e storytelling de dados.

#### Tipos de gráfico sugeridos
- tecnologias por quantidade de projetos;
- tecnologias por tempo de uso;
- experiência por empresa;
- projetos por contexto;
- projetos por stack;
- evolução por ano;
- distribuição por nível/frequência/contexto;
- heatmap de tecnologias vs experiências;
- radar opcional de densidade técnica.

#### Importante
A tela precisa parecer um **produto analítico real**, não só um monte de gráfico decorativo.

Então:
- KPIs no topo;
- filtros globais;
- boa hierarquia visual;
- responsividade forte;
- legenda clara;
- acessibilidade.

---

## 6) Estratégia de design system e componentes

### 6.1. Componentes da lib que devem ser usados desde a Fase 1

Usar a `hans-ui-design-lib` para tudo o que já fizer sentido, via CDN/web components.

#### Base
- Button
- Card
- Input
- Select / Dropdown
- Tabs
- Tag / Badge
- Tooltip
- Modal (quando aplicável)
- Toggle (para dark mode, filtros, switches)
- componentes de feedback já existentes na lib, se houver

> Observação: “Empty state” **não precisa ser um componente da lib**. Pode ser tratado como um **padrão visual/estado reutilizável** no próprio projeto, com composição de Card + ícone + texto + CTA.

### 6.2. Accordion — o que é e se faz sentido

#### O que é
Accordion é aquele componente em que:
- existe uma lista de seções;
- cada seção expande/recolhe conteúdo;
- útil para evitar parede de texto.

#### Faz sentido no remake?
**Sim**, principalmente em:
- detalhes de experiência;
- FAQ/explicações curtas;
- seções “mais detalhes” em projeto;
- agrupamentos de skills;
- visão mobile de filtros;
- currículo expandido.

#### Recomendação
**Criar `Accordion` na `hans-ui-design-lib`**.

#### Requisitos para o Accordion na lib
Seguir exatamente o padrão que você definiu:
- Clean Code
- DRY
- SRP
- SOLID
- 100% coverage
- lint ok
- build ok
- Storybook ok
- Tailwind nos SCSS
- 6 arquivos padrão:
  - `tsx`
  - `scss`
  - `types`
  - `test`
  - `mdx`
  - `stories`
- helpers/test helpers quando necessário

#### Features mínimas do Accordion
- single e multiple expand;
- controlled e uncontrolled;
- keyboard navigation;
- ARIA attributes;
- ícone de expand/collapse;
- animação leve;
- suporte a disabled;
- suporte a header extra/description.

### 6.3. Componente de seleção de idioma na lib — vale a pena?

#### Resposta curta
**Sim, faz sentido**, mas com escopo certo.

#### O que deve ir para a lib
Não a lógica de i18n de cada projeto, e sim um componente genérico do tipo:
- `LanguageDropdown` ou `LocaleSelect`

#### O que ele deve receber
- lista de idiomas;
- idioma ativo;
- callback de mudança;
- labels;
- opcionalmente ícone/bandeira.

#### O que **não** deve ir para a lib
- JSONs de tradução dos projetos;
- regras específicas de rotas;
- persistência em localStorage de cada app;
- integração com Angular i18n/ngx-translate.

A lib deve só fornecer o **componente visual reutilizável**.

### 6.4. Sistema de grid — deve ir para a lib?

#### Recomendação
**Não como componente pesado no primeiro momento.**

Melhor caminho:
- manter no portfólio um conjunto de **layout primitives locais**;
- e só extrair para a lib se o padrão se repetir de verdade em outros projetos.

#### O que pode existir localmente
- `PageContainer`
- `SectionContainer`
- `ContentGrid`
- `DashboardGrid`
- `SplitHeroLayout`

Se isso virar padrão em 2 ou 3 projetos, aí sim extrair para a lib.

---

## 7) Estratégia de temas e dark mode

### 7.1. Abordagem

Ter dois temas reais:
- **light theme**
- **dark theme**

Ambos usando o sistema da lib, via `setHansTheme` / combinação equivalente já suportada. citeturn174109view1

### 7.2. Regras

- o toggle de dark mode pode ser um componente local do portfólio;
- ele usa o `toggle` da lib por baixo;
- a troca de tema deve atualizar:
  - background;
  - texto;
  - superfícies;
  - bordas;
  - estados de interação;
  - gráficos;
  - overlays;
  - tooltips.

### 7.3. Persistência
Persistir preferência em:
- `localStorage`
- e opcionalmente respeitar `prefers-color-scheme` no primeiro carregamento.

---

## 8) Estratégia de i18n

### 8.1. Idiomas da Fase 1
- `pt-BR`
- `en-US`

### 8.2. Idiomas da Fase futura
- `es`
- `fr`

### 8.3. Requisitos
- conteúdo estático traduzível;
- labels de filtros traduzíveis;
- mensagens de empty/loading/error traduzíveis;
- formatação de datas preparada para locale;
- números e percentuais formatados por locale;
- fallback robusto.

### 8.4. Fonte inicial de dados
Como os JSONs antigos já existem, a estratégia recomendada é:

- manter a estrutura original como base;
- criar um layer de mapeamento;
- mover os textos para recursos i18n aos poucos;
- isolar labels e textos de interface do conteúdo estruturado.

---

## 9) Estratégia de dados na Fase 1 (sem backend)

### 9.1. Fonte de verdade
Usar os JSONs do projeto antigo:
- `experiences`
- `projects`
- `skills`

### 9.2. Camada necessária
Criar um layer de adaptação:
- `mappers`
- `view models`
- `normalizers`
- `sorters`
- `filters`

### 9.3. Motivo
Não acoplar a UI nova diretamente ao formato legado dos JSONs, porque depois isso vai dificultar a migração para backend.

### 9.4. Recomendação prática
Criar interfaces novas no projeto:
- `ProjectViewModel`
- `ExperienceViewModel`
- `SkillViewModel`
- `FormationViewModel`
- `LanguageViewModel`
- `DashboardMetricViewModel`

E mapear os JSONs antigos para esse formato novo.

---

## 10) Etapas de implementação para o Codex

# ETAPA 1 — Reformulação do Front-End sem backend

> Objetivo: reconstruir o portfólio no `hans-portfolio-app`, com layout novo, design system, i18n, dark mode e dados vindos dos JSONs antigos.

---

### ETAPA 1.1 — Fundação técnica e arquitetura do front

#### Objetivos
- organizar a base do projeto;
- preparar i18n;
- preparar consumo da lib via CDN;
- preparar tema;
- definir estrutura de pastas;
- preparar shell do app.

#### Entregas
- estrutura de pastas por domínio;
- core module/pasta de infraestrutura;
- layout global;
- providers principais;
- assets migrados do projeto antigo;
- configuração de i18n;
- configuração de tema;
- configuração de rotas base.

#### Estrutura sugerida
```txt
src/
  app/
    core/
      config/
      constants/
      enums/
      guards/
      interceptors/
      models/
      services/
      tokens/
      utils/
    features/
      home/
      projects/
      experiences/
      skills/
      dashboard/
      about/
      contact/
      admin/ (placeholder)
    layout/
      app-shell/
      navbar/
      footer/
      page-header/
      section-wrapper/
      language-switcher/
      theme-toggle/
    shared/
      components/
      directives/
      pipes/
      helpers/
      mappers/
      view-models/
      data/
    i18n/
      pt-BR/
      en-US/
```

#### Tarefas do Codex
- configurar carregamento da `hans-ui-design-lib` via CDN no `index.html`;
- garantir uso de `CUSTOM_ELEMENTS_SCHEMA` onde necessário;
- criar serviço central de tema;
- criar serviço central de locale;
- configurar persistência de tema/idioma;
- importar assets reaproveitados do projeto antigo;
- definir tokens e constantes globais;
- criar shell base com navbar + router outlet + footer.

---

### ETAPA 1.2 — Design foundations e layout primitives

#### Objetivos
Criar os blocos estruturais do remake.

#### Componentes locais sugeridos
- `AppShellComponent`
- `NavbarComponent`
- `MobileMenuComponent`
- `FooterComponent`
- `PageSectionComponent`
- `PageIntroComponent`
- `FilterBarComponent`
- `SectionTitleComponent`
- `HighlightStripComponent`
- `ThemeToggleComponent`
- `LanguageSwitcherComponent`
- `EmptyStateBlockComponent`
- `LoadingBlockComponent`
- `StatKpiCardComponent`

#### Tarefas do Codex
- implementar containers e espaçamentos;
- padronizar largura máxima;
- padronizar headings;
- criar wrapper reutilizável para seções;
- criar navegação desktop e mobile;
- criar layout consistente entre páginas.

---

### ETAPA 1.3 — Home

#### Objetivos
Entregar a nova Home completa.

#### Seções da Home
- Hero
- Highlights
- Core stack
- About resumo
- Experience highlights
- Dashboard preview
- CTA final

#### Tarefas do Codex
- criar hero responsivo;
- montar seção de highlights com dados curados;
- montar seção de stack principal;
- montar seção curta de resumo profissional;
- mostrar 2 ou 3 experiências em destaque;
- adicionar CTA para projetos e dashboard.

#### Regras
- não colocar dashboard completo na home;
- não poluir com todos os dados pessoais;
- não colocar filtros pesados na home;
- foco em impacto visual e credibilidade.

---

### ETAPA 1.4 — Página de projetos

#### Objetivos
Reestruturar a navegação e exibição dos projetos.

#### Componentes sugeridos
- `ProjectCardComponent`
- `ProjectFiltersComponent`
- `ProjectTechnologyChipsComponent`
- `ProjectLinksListComponent`
- `ProjectGalleryComponent`
- `ProjectCaseSectionComponent`
- `ProjectListViewToggleComponent`

#### Tarefas do Codex
- implementar busca textual;
- implementar filtros;
- implementar paginação ou infinite scroll;
- implementar grid e list mode;
- criar página de detalhe com slug;
- exibir links de git/deploy/npm/docs;
- suportar highlights e projetos relacionados.

#### Regras
- cards com hierarquia visual clara;
- imagens reais sempre que possível;
- sem cards super apertados;
- sem visual de “tabela fantasiada de card”.

---

### ETAPA 1.5 — Página de experiências

#### Objetivos
Transformar a listagem antiga em timeline e narrativa.

#### Componentes sugeridos
- `ExperienceTimelineComponent`
- `ExperienceCardComponent`
- `ExperienceImpactListComponent`
- `ExperienceTechnologyListComponent`
- `ExperienceCustomersListComponent`
- `ExperienceProjectsListComponent`

#### Tarefas do Codex
- mapear dados antigos para timeline;
- exibir cargo, empresa, período e destaques;
- vincular projetos e tecnologias relacionadas;
- suportar expansão de detalhes;
- suportar filtros por empresa, período e tech.

#### Regras
- evitar excesso de texto bruto;
- priorizar clareza;
- usar accordion se ele já existir na lib, ou componente local provisório.

---

### ETAPA 1.6 — Página de skills

#### Objetivos
Reestruturar skills por camadas e classificações.

#### Componentes sugeridos
- `SkillCardComponent`
- `SkillFiltersComponent`
- `SkillClassificationLegendComponent`
- `SkillCategorySectionComponent`
- `FormationCardComponent`
- `LanguageProficiencyCardComponent`

#### Tarefas do Codex
- implementar agrupamento por categoria;
- implementar os 3 eixos de classificação;
- suportar filtros cruzados;
- destacar core stack;
- incluir formações e idiomas;
- incluir conceitos/arquitetura/padrões.

#### Regras
- não transformar tudo em card minúsculo;
- deixar claro o que é core, secundário e estudo;
- usar chips e badges com semântica consistente.

---

### ETAPA 1.7 — Página de dashboard

#### Objetivos
Entregar uma tela analítica robusta e bonita.

#### Componentes sugeridos
- `DashboardKpiRowComponent`
- `DashboardFiltersComponent`
- `ChartCardComponent`
- `DashboardInsightsPanelComponent`

#### Tarefas do Codex
- criar métricas derivadas a partir dos JSONs;
- montar KPIs;
- montar múltiplos gráficos;
- tratar tema light/dark nos gráficos;
- tratar responsividade e loading.

#### Regras
- a tela deve parecer dashboard real;
- evitar gráfico ornamental;
- cada gráfico precisa responder uma pergunta.

---

### ETAPA 1.8 — About / Contact / páginas auxiliares

#### Objetivos
Fechar o ecossistema público.

#### About
- bio profissional;
- trajetória resumida;
- formação;
- interesses profissionais;
- contexto pessoal leve, sem exagero.

#### Contact
- e-mail;
- GitHub;
- LinkedIn;
- currículo;
- CTA para networking/contato.

#### Not Found
- página 404 coerente com o tema visual.

---

### ETAPA 1.9 — Ajustes finais da Fase 1

#### Tarefas
- refinamento responsivo;
- acessibilidade;
- SEO básico;
- meta tags;
- Open Graph;
- loading states;
- empty states;
- testes;
- lint;
- build;
- deploy.

#### Critérios de pronto da Fase 1
- todas as páginas públicas funcionando;
- i18n pt/en funcionando;
- dark mode funcionando;
- dados vindos dos JSONs antigos;
- highlights visíveis;
- dashboard pronto;
- UI consistente com a lib;
- sem dependência de backend.

---

# ETAPA 2 — Evolução da `hans-ui-design-lib`

> Objetivo: adicionar ou amadurecer componentes que façam sentido como reutilização real além do portfólio.

### ETAPA 2.1 — Criar `Accordion`
Prioridade: **alta**

#### Motivos
- útil no portfólio;
- útil em outros projetos;
- resolve bem exibição de conteúdo expansível;
- bom componente para a maturidade da lib.

### ETAPA 2.2 — Criar `LanguageDropdown`
Prioridade: **média**

#### Motivos
- reaproveitável em vários projetos seus;
- encaixa com portfólio, game tracker e vitrines futuras;
- componente visual bem reutilizável.

### ETAPA 2.3 — Revisar `Dropdown`, `Tabs`, `Modal`, `Tooltip`, `Toggle`
Prioridade: **média**

#### Objetivo
Garantir que suportem bem:
- navegação mobile;
- filtros;
- temas;
- acessibilidade;
- integração com o remake.

### ETAPA 2.4 — Não extrair grid agora
Prioridade: **baixa**

Manter grid/layout primitives no portfólio primeiro.

---

# ETAPA 3 — Backend .NET + PostgreSQL + Admin

> Objetivo: evoluir do modo “JSON estático” para uma solução full stack robusta e administrável.

### ETAPA 3.1 — Stack do backend

#### Recomendação
- **ASP.NET Core Web API**
- **Entity Framework Core**
- **PostgreSQL**
- **Neon DB**
- **Swagger / OpenAPI**
- **JWT ou auth simples para admin**
- **migrations**
- **seed inicial a partir dos JSONs**

#### Motivo
Essa escolha reforça seu currículo full stack corporativo e mostra domínio fora do ecossistema JS, alinhado ao objetivo do projeto.

---

### ETAPA 3.2 — Modelagem inicial sugerida

#### Entidades principais
- `Projects`
- `Experiences`
- `Skills`
- `Formations`
- `Languages`
- `Customers`
- `Jobs`
- `Technologies`
- `Tags`
- `Links`
- `Images`

#### Relações
- `Project` N:N `Technology`
- `Experience` N:N `Technology`
- `Skill` N:N `Technology` (se necessário separar conceito de skill e technology)
- `Experience` N:N `Project`
- `Experience` N:N `Customer`
- `Experience` N:N `Job` (ou 1:N, dependendo do refinamento)
- `Formation` N:N `Link`
- `Project` N:N `Link`
- `Experience` N:N `Link`
- `Project` N:N `Image`
- `Experience` N:N `Image`
- `Formation` N:N `Image`

#### Observações importantes
- `highlight` deve ser **coluna booleana nas entidades que podem aparecer em destaque**, e não tabela separada;
- `links` e `images` como tabelas separadas faz sentido;
- `links` devem suportar tipo/descrição, por exemplo:
  - git
  - deploy
  - docs
  - npm
  - article
  - case-study
- `languages` devem representar os idiomas que você fala;
- `jobs` e `customers` realmente merecem entidades próprias, já que em experiências eles representam conceitos diferentes.

---

### ETAPA 3.3 — Campos importantes por entidade

#### Project
- id
- slug
- title
- shortDescription
- longDescription
- contextType
- status
- highlight
- startDate
- endDate
- companyName (opcional)
- role
- mainStackSummary
- challengeSummary
- solutionSummary
- learnings
- featuredOrder
- createdAt
- updatedAt

#### Experience
- id
- company
- jobTitle
- summary
- startDate
- endDate
- current
- highlight
- impactSummary
- responsibilities
- createdAt
- updatedAt

#### Technology
- id
- name
- slug
- category
- icon
- officialUrl
- createdAt
- updatedAt

#### Skill
- id
- title
- category
- frequencyLevel
- usageContext
- proficiencyLevel
- notes
- highlight
- createdAt
- updatedAt

#### Formation
- id
- institution
- courseName
- degreeType
- startDate
- endDate
- summary
- highlight
- createdAt
- updatedAt

#### SpokenLanguage
- id
- name
- proficiency
- notes

#### Link
- id
- url
- type
- description
- label
- isPrimary

#### Image
- id
- url
- altText
- description
- order
- isThumbnail

---

### ETAPA 3.4 — API surface sugerida

#### Públicas
- `GET /api/projects`
- `GET /api/projects/{slug}`
- `GET /api/experiences`
- `GET /api/skills`
- `GET /api/formations`
- `GET /api/languages`
- `GET /api/dashboard`
- `GET /api/highlights`
- `GET /api/technologies`

#### Admin
- CRUD completo para as entidades;
- upload/registro de imagens;
- gestão de links;
- ordenação de highlights;
- publicação/despublicação;
- endpoints de autenticação.

---

### ETAPA 3.5 — Admin UI

#### Objetivo
Permitir que o portfólio vire produto administrável.

#### Funcionalidades
- login;
- dashboard admin;
- CRUDs;
- formulários com validação;
- upload/select de imagem;
- preview;
- ordenação de destaques;
- controle de traduções;
- rascunho/publicado;
- auditoria leve (opcional).

#### Recomendação
O admin pode ser implementado:
- no mesmo front Angular, em rotas protegidas;
- consumindo a API .NET.

---

### ETAPA 3.6 — Migração dos JSONs para banco

#### Estratégia
1. consolidar modelos novos;
2. criar scripts de seed;
3. normalizar dados duplicados;
4. migrar projetos;
5. migrar experiências;
6. migrar skills;
7. ligar relações;
8. validar no admin;
9. trocar frontend do source JSON para source API.

---

# ETAPA 4 — Roadmap de highlights futuros

Esses dois projetos futuros **não precisam ser implementados agora**, mas o portfólio deve ser estruturado para recebê-los depois:

- `hans-game-tracker-app`
- site de exposição de produtos da loja familiar

#### Preparação recomendada já agora
- suporte a projetos em status `planned` / `in-progress`;
- suporte a highlight futuro;
- estrutura de links preparada;
- cards capazes de mostrar “coming soon” sem parecer gambiarra.

---

## 11) Backlog priorizado para o Codex

### Prioridade P0
- shell do app;
- i18n pt/en;
- tema light/dark;
- integração da lib via CDN;
- Home;
- Projects;
- Experience;
- Skills;
- Dashboard;
- assets migrados;
- view models/mappers;
- deploy funcionando.

### Prioridade P1
- detalhe de projeto;
- about/contact;
- empty/loading/error states;
- SEO;
- paginação;
- refinamentos mobile;
- componente local de language switcher;
- componentização dos filtros.

### Prioridade P2
- Accordion na lib;
- LanguageDropdown na lib;
- melhorias finas nos gráficos;
- extração futura de layout primitives;
- ajustes avançados de acessibilidade.

### Prioridade P3
- backend .NET;
- PostgreSQL / Neon;
- admin;
- seed;
- troca JSON → API.

---

## 12) Definition of Done por fase

### Fase 1 pronta quando:
- layout novo concluído;
- Home forte e estratégica;
- highlights visíveis;
- Projects/Experience/Skills/Dashboard operacionais;
- i18n pt/en pronto;
- dark mode pronto;
- lib integrada;
- dados vindos dos JSONs antigos;
- responsividade decente;
- lint/test/build ok.

### Fase 2 pronta quando:
- Accordion publicado na lib;
- LanguageDropdown publicado na lib;
- Storybook atualizado;
- cobertura e padrão da lib respeitados.

### Fase 3 pronta quando:
- API .NET publicada;
- banco estruturado;
- seed executado;
- admin funcional;
- frontend consumindo API;
- CRUD operacional.

---

## 13) Instruções objetivas para o Codex

### Mandamentos do projeto
- não copiar cegamente a estrutura do portfólio antigo;
- reaproveitar dados, ícones, imagens e referências do antigo;
- não acoplar componentes novos ao formato legado dos JSONs;
- usar a `hans-ui-design-lib` sempre que fizer sentido;
- criar componente local quando a necessidade for específica do portfólio;
- propor evolução da lib quando houver potencial real de reutilização;
- manter forte separação entre:
  - layout
  - domínio
  - apresentação
  - mapeamento de dados
  - infraestrutura
- priorizar clareza visual e storytelling de carreira;
- tratar o portfólio como produto real, não como página estática simples.

### Qualidade mínima
- código limpo;
- componentes pequenos e coesos;
- testes onde fizer sentido;
- lint ok;
- build ok;
- responsividade;
- acessibilidade básica;
- estados de loading/error/empty tratados;
- sem regressão de tema;
- sem regressão de i18n.

---

## 14) Resumo executivo

O plano ideal é:

1. **reconstruir o front do zero** no Angular, com layout novo, design system, i18n, tema e dados em JSON;
2. **reposicionar o portfólio** como vitrine estratégica com Home forte, Highlights, Cases, Skills bem modeladas e Dashboard próprio;
3. **evoluir a `hans-ui-design-lib`** com pelo menos `Accordion` e possivelmente `LanguageDropdown`;
4. **depois** adicionar backend em **.NET + PostgreSQL**, admin e persistência real;
5. deixar a base pronta para incluir seus próximos projetos como novos highlights.

Esse caminho te dá o melhor dos dois mundos:
- valor rápido no front;
- e depois um case full stack corporativo de verdade.
