# Plano de Implementacao - hans-portfolio-app + hans-portfolio-api (v5)

> Objetivo: guiar a continuacao oficial do remake do portfolio antigo (`victor_hanszman_portfolio-old`) usando o novo front em `hans-portfolio-app` e a nova API em `hans-portfolio-api`, com Angular moderno no front, `hans-ui-design-lib` como base visual oficial e integracao posterior com a API NestJS ja concluida.

Este documento substitui o `v4` como referencia oficial de execucao.

## 1) Estado atual consolidado

### 1.1. Ordem oficial do remake

1. Backend completo
2. Frontend completo
3. Integracao frontend <-> backend

### 1.2. Situacao atual do projeto

- a etapa de backend ja foi concluida no repositorio `hans-portfolio-api`
- a API oficial do portfolio agora existe em NestJS + Express + TypeScript + Prisma + PostgreSQL/Neon
- o proximo foco oficial do remake passa a ser o front no repositorio `hans-portfolio-app`
- a integracao real com a API continua sendo uma etapa posterior ao fechamento estrutural do front

### 1.3. Fontes oficiais de contexto

As referencias mais importantes para as proximas etapas continuam sendo:

- `hans-portfolio-app/plano-implementacao-hans-portfolio-app-final-version.md`
- `hans-portfolio-app/Histórico-Implementação.pdf`
- `hans-portfolio-app/docs/CV - Victor Hanszman (PT-BR).pdf`
- `hans-portfolio-app/docs/CV - Victor Hanszman (EN).pdf`
- `hans-portfolio-app/README.md`
- `hans-portfolio-api/README.md`
- `victor_hanszman_portfolio-old` como referencia funcional e de conteudo do portfolio anterior
- `hans-ui-design-lib` como referencia oficial de componentes reutilizaveis e contratos visuais

---

## 2) Direcao estrategica do remake

O novo portfolio precisa comunicar com mais clareza que Victor e:

- Engenheiro de Software Full Stack com forte especializacao em Front-End
- profissional com 7+ anos de experiencia em aplicacoes web corporativas
- especialista principalmente em Angular, TypeScript e React
- profissional com experiencia real em Design Systems, Micro Front-End, dashboards, modernizacao de legados, Clean Code, SOLID, TDD e CI/CD
- profissional com repertorio complementar em Node, NestJS, Prisma, PostgreSQL, REST APIs, Docker e Azure DevOps

O remake nao deve ser apenas uma migracao visual do portfolio antigo. A nova versao deve:

- comunicar melhor posicionamento, senioridade e proposta de valor
- sair do modelo de listagens extensas e pouco hierarquizadas
- tratar projetos como cases
- tratar experiencias como narrativa de carreira e impacto
- aproveitar melhor analytics e visualizacao de dados
- ter base preparada para manutencao real por meio da API nova

---

## 3) Decisoes tecnicas firmadas

### 3.1. Frontend

- Angular `20.3.6`
- TypeScript `5.9.x`
- standalone components apenas
- sem Angular modules de feature
- signals como mecanismo principal de estado local
- `computed()` e `effect()` como ferramentas de derivacao e reacao
- RxJS apenas quando for realmente necessario
- sintaxe nova de template com `@if`, `@for`, `@switch` e `@defer` quando fizer sentido
- `input()`, `output()` e `inject()` no lugar da sintaxe antiga sempre que aplicavel
- roteamento standalone com lazy loading por pagina/feature
- preferencia por zoneless, mantendo a base atual do app
- SCSS + TailwindCSS como base de estilo

### 3.2. Backend

- backend oficial em `hans-portfolio-api`
- NestJS com adapter padrao Express
- Prisma ORM
- PostgreSQL/Neon
- Swagger/OpenAPI
- autenticacao admin
- CRUDs administrativos e leituras publicas ja disponiveis

### 3.3. Design system

- `hans-ui-design-lib` e a base visual oficial do projeto
- o consumo do app continua previsto via CDN/web components
- componentes ja existentes na lib devem ser reutilizados antes de qualquer implementacao customizada equivalente

---

## 4) Principios obrigatorios do frontend

### 4.1. Angular moderno como regra, nao como preferencia

Durante todo o desenvolvimento do novo `hans-portfolio-app`, devemos seguir estas regras sem excecao, salvo justificativa tecnica muito clara:

- usar `standalone: true` implicitamente em toda a estrutura moderna do Angular
- nao criar `NgModule` para paginas, componentes, services ou features
- usar `signals`, `computed` e `effect` como abordagem padrao de estado e reatividade
- usar RxJS somente quando o problema realmente exigir stream assicrona, composicao de eventos ou interoperabilidade com APIs baseadas em Observable
- usar `@if` e `@for` no HTML
- nao usar `*ngIf` nem `*ngFor`
- usar `input()` e `output()` nas APIs publicas dos componentes
- usar `inject()` ao inves de construtores antigos quando isso deixar o codigo mais claro
- priorizar templates, APIs e patterns da versao atual do Angular
- evitar sintaxe antiga apenas por costume

### 4.2. Filosofia de estado no front

- estado local de pagina/feature deve nascer simples
- cada tela deve concentrar seu proprio estado o maximo possivel
- shared state global so deve existir quando houver necessidade real
- preferir derivar view-models com `computed()` em vez de espalhar transformacoes ad hoc no template
- efeitos devem ser usados com criterio, apenas para sincronizacao e side effects reais

### 4.3. Convencoes de template

- templates devem ser legiveis e modernos
- loops e condicionais devem usar a nova sintaxe do Angular
- evitar logica pesada no HTML
- preferir view-models/computed no `.ts` para simplificar o template
- usar `@defer` quando houver ganho real de performance ou UX

### 4.4. Convencoes de injecao e API dos componentes

- preferir `inject()` para dependencias
- preferir `input()` e `output()` para entrada e saida de componentes
- evitar decorators antigos quando a API moderna equivalente existir e estiver adequada
- manter componentes com interfaces pequenas e previsiveis

---

## 5) Politica oficial de reutilizacao da hans-ui-design-lib

### 5.1. Regra principal

Sempre que o portfolio precisar de um componente ja existente na `hans-ui-design-lib`, o componente da lib deve ser usado.

Exemplos tipicos:

- button
- input
- dropdown
- select-option
- toggle
- date-picker
- avatar
- card
- carousel
- tag
- chart
- accordion
- icon
- loading
- kanban
- popup
- toast
- modal
- table
- tabs

### 5.2. Regra de decisao antes de criar UI nova

Antes de criar qualquer novo componente visual no `hans-portfolio-app`, devemos validar:

1. ja existe componente equivalente na `hans-ui-design-lib`?
2. o componente da lib atende integralmente?
3. o que falta e especifico do portfolio ou reutilizavel em outros projetos?

### 5.3. Regra para componentes reutilizaveis

Se um novo componente for claramente reutilizavel em outros projetos ou cenarios, ele nao deve ser criado diretamente no `hans-portfolio-app` sem alinhamento previo.

Nesses casos:

- parar antes da implementacao
- avisar o Victor
- alinhar se o componente deve nascer na `hans-ui-design-lib`
- so depois decidir a estrategia final

### 5.4. Regra para componentes especificos do portfolio

Se o componente for claramente especifico do portfolio e nao fizer sentido como asset generico de design system, ele pode ser criado no `hans-portfolio-app`.

Exemplos provaveis:

- hero sections especificas
- blocos de storytelling de carreira
- composicoes de case study
- layouts especificos de timeline do portfolio
- secoes de highlights muito ligadas ao contexto do Victor

---

## 6) Regra oficial de testes, coverage e qualidade

### 6.1. Regra obrigatoria por implementacao

Sempre que formos implementar qualquer item do front, devemos criar o teste unitario correspondente no mesmo momento.

Isso vale para:

- componente
- pagina
- service
- facade
- helper
- mapper
- guard
- resolver
- model/view-model com comportamento relevante

### 6.2. Meta oficial de coverage

A meta oficial do remake continua sendo cobertura total do sistema, com foco em:

- `100%` de coverage em todos os arquivos com comportamento relevante
- `100%` de lines
- `100%` de branches sempre que aplicavel e mensuravel
- `100%` de functions sempre que aplicavel e mensuravel

Arquivos que podem ficar fora do alvo apenas com justificativa clara:

- configuracoes puramente declarativas
- bootstrap extremamente trivial
- arquivos gerados
- wrappers sem comportamento relevante
- codigo de framework onde medir coverage nao gera sinal de qualidade real

### 6.3. Regra operacional por etapa

Em toda etapa de implementacao do frontend, devemos garantir:

- testes unitarios criados junto com o codigo
- coverage validado junto da implementacao
- lint verde
- prettier/formatacao correta
- build verde

### 6.4. Comandos de qualidade que devem ser rodados ao longo do desenvolvimento

No `hans-portfolio-app`, a rotina minima por etapa deve incluir, conforme o escopo alterado:

- `npm run test`
- `npm run test:coverage`
- `npm run lint`
- `npm run build`

Quando fizer sentido, tambem validar:

- `npm run start`
- `npm run dev`

### 6.5. Filosofia de qualidade

- nao empurrar testes para depois
- nao deixar coverage para o fim
- nao aceitar codigo "provisorio" sem cobertura
- nao aceitar quebra de lint/prettier
- nao acumular debitos que poderiam ser evitados no momento da entrega

---

## 7) Arquitetura alvo do hans-portfolio-app

### 7.1. Direcao estrutural

O frontend novo deve seguir uma organizacao moderna, legivel e simples de navegar.

Direcao oficial:

- `core/` para infraestrutura transversal
- `layout/` para casca visual e estrutura base
- `pages/` para paginas principais
- `features/` quando um dominio crescer o suficiente para merecer agrupamento proprio
- `shared/` apenas para itens realmente compartilhados
- `helpers/` no lugar de `utils/`

### 7.2. Responsabilidades sugeridas

`core/`

- api clients
- configuracoes globais
- translation
- tokens de app
- adapters de consumo da API
- helpers compartilhados
- services transversais

`layout/`

- shell principal
- header
- footer
- navegacao principal
- wrappers de pagina
- layout de secoes

`pages/`

- home
- experiences
- technologies ou skills
- projects
- dashboard
- possiveis paginas complementares do remake

`shared/`

- componentes realmente compartilhados entre varias features do portfolio
- directives ou pipes que facam sentido no app inteiro

### 7.3. Convencoes de codigo

- nomes claros
- responsabilidade bem separada
- pouca magia
- pouca indirecao desnecessaria
- preferencia por composicao simples
- evitar abstracao cedo demais
- manter leitura facil mesmo meses depois

---

## 8) Escopo funcional alvo do frontend

### 8.1. Base de referencia do portfolio antigo

O `victor_hanszman_portfolio-old` serve como referencia de escopo e conteudo para:

- home
- experiences
- skills
- projects
- navegacao basica
- dados historicos e filtros

### 8.2. O que o remake precisa preservar

- conteudo principal do portfolio antigo
- experiencias profissionais
- projetos
- tecnologias/habilidades
- narrativa de carreira
- versoes em mais de um idioma
- recursos visuais e assets ja existentes quando fizer sentido

### 8.3. O que o remake precisa melhorar

- hierarquia visual
- posicionamento profissional
- storytelling
- responsividade
- performance
- acessibilidade
- clareza dos filtros e agrupamentos
- capacidade de consumo da API nova
- preparo para manutencao futura

### 8.4. Escopo expandido esperado

O front novo nao deve ficar restrito ao portfolio antigo. O plano oficial considera tambem:

- home mais forte e mais estrategica
- dashboard analitico em pagina propria
- dark mode/light mode reais
- traducao estruturada
- componentes e secoes orientados a cases
- preparacao para area administrativa visual em etapa posterior

---

## 9) Conteudo e narrativa que o front deve evidenciar

O front deve deixar muito explicito:

- especializacao forte em front-end moderno
- dominio de Angular, TypeScript e React
- experiencia corporativa real
- Design Systems e componentizacao
- modernizacao de legados
- dashboards analiticos
- integracao com backend proprio moderno
- TDD e foco em qualidade
- CI/CD, Docker e Azure DevOps
- repertorio full stack sem perder o protagonismo do front

Esses pontos devem aparecer distribuidos entre:

- hero
- highlights
- resumo profissional
- experiencias
- projetos
- dashboard
- secoes de stack/competencias

---

## 10) Plano detalhado da etapa de frontend

### F0 - Foundation e documentacao

#### Objetivo

Fechar a base do app novo e consolidar as regras do projeto antes do desenvolvimento funcional.

#### Entregas

- revisar README do app
- revisar este plano oficial
- consolidar regras de Angular moderno
- consolidar politica de testes e coverage
- consolidar politica de uso da `hans-ui-design-lib`
- confirmar estrutura base do app
- manter a integracao por CDN/web components preparada

#### Criterios de aceite

- documentacao coerente com o estado atual do projeto
- diretrizes tecnicas claras para as proximas sprints
- nenhum espaco para duvida sobre o uso de Angular moderno, coverage e design lib

### F1 - App shell, layout base e infra transversal

#### Objetivo

Criar a casca oficial do app e a infraestrutura base de navegacao, tema e organizacao.

#### Entregas

- app shell
- layout principal
- header
- footer
- navegacao principal
- wrappers de pagina
- estrutura inicial de `core`, `layout`, `pages`, `shared` e `helpers`
- base de tema claro/escuro
- base de traducao
- contrato de integracao com a `hans-ui-design-lib`
- testes unitarios cobrindo a casca do app e os componentes criados

#### Criterios de aceite

- navegacao principal funcional
- layout responsivo minimo funcional
- base de temas preparada
- base de traducao preparada
- testes com coverage total do escopo implementado

### F2 - Home estrategica

#### Objetivo

Construir uma home forte, moderna e com posicionamento profissional claro.

#### Entregas

- hero principal
- resumo profissional
- highlights de senioridade e stack
- CTA(s) coerentes com portfolio profissional
- blocos de projetos/experiencias em destaque
- secoes de prova social/impacto se fizer sentido
- componentes especificos da home com testes unitarios

#### Criterios de aceite

- home comunica senioridade e proposta de valor em poucos segundos
- responsividade boa
- sem depender ainda da integracao real com a API
- coverage total do que for implementado

### F3 - Pagina de experiences

#### Objetivo

Transformar experiencias em narrativa de carreira, nao apenas lista de cards.

#### Entregas

- timeline ou composicao equivalente
- agrupamentos/organizacao clara
- destaque para impacto, contexto e stack
- ligacoes com clientes, cargos, projetos e tecnologias
- testes unitarios completos

#### Criterios de aceite

- leitura facil
- boa hierarquia visual
- narrativa profissional clara
- coverage total do escopo entregue

### F4 - Pagina de technologies/skills

#### Objetivo

Apresentar stack e experiencia tecnica com mais clareza do que no portfolio antigo.

#### Entregas

- listagem moderna de tecnologias
- filtros realmente uteis
- agrupamentos e visualizacoes mais claras
- destaque para experiencia total e por contexto
- aproveitamento posterior dos dados de `experienceMetrics` da API
- testes unitarios completos

#### Criterios de aceite

- pagina mais clara do que a versao antiga
- filtros previsiveis
- boa leitura em desktop e mobile
- coverage total do escopo entregue

### F5 - Pagina de projects

#### Objetivo

Apresentar projetos como cases, com mais contexto e valor percebido.

#### Entregas

- cards ou composicoes de case study
- destaque de contexto, papel, stack e resultados
- espaco para links, imagens e highlights
- filtros e ordenacoes coerentes
- testes unitarios completos

#### Criterios de aceite

- pagina comunica melhor os projetos do que o portfolio antigo
- visual consistente com a home e experiences
- coverage total do escopo entregue

### F6 - Dashboard analitico

#### Objetivo

Criar a tela propria de dashboard prevista no plano do remake.

#### Entregas

- pagina dedicada
- consumo inicial mockado/adapter-friendly
- graficos e indicadores coerentes
- estrutura pronta para usar os endpoints agregados da API
- componentes de analytics testados

#### Criterios de aceite

- dashboard agrega valor real
- nao parece decorativo
- leitura clara dos dados
- coverage total do escopo entregue

### F7 - Integracao visual final do portfolio publico

#### Objetivo

Fechar consistencia visual e tecnica do portfolio publico antes da integracao real com o backend.

#### Entregas

- refinamento de UX
- ajustes de responsividade
- estados de loading, empty e erro
- revisao de acessibilidade
- revisao de navegacao
- revisao de consistencia com `hans-ui-design-lib`
- testes adicionais necessarios

#### Criterios de aceite

- portfolio publico pronto para ser integrado
- linguagem visual consistente
- coverage total do escopo entregue

### F8 - Preparacao da area administrativa visual

#### Objetivo

Deixar o frontend pronto para, em etapa apropriada, receber a area admin consumindo os endpoints protegidos da API.

#### Entregas

- definicao da estrutura de rotas/admin
- contratos de autenticacao
- base para formularios administrativos
- avaliacao de quais componentes da `hans-ui-design-lib` servem para o admin
- alinhamento de gaps reutilizaveis antes de qualquer mudanca na lib

#### Criterios de aceite

- direcao da area admin documentada
- sem implementacao prematura desnecessaria
- sem criar componente reutilizavel novo na lib sem alinhamento previo

---

## 11) Plano da etapa de integracao

Depois que o frontend estiver estruturalmente pronto:

- conectar o app aos GETs publicos da API
- substituir mocks/adapters locais por consumo real
- integrar dashboard com endpoints agregados
- integrar technologies com `experienceMetrics`
- integrar projetos, experiencias e settings da API
- preparar autenticacao admin no front
- depois integrar CRUDs protegidos quando a etapa administrativa chegar

### Regras da integracao

- preservar contratos tipados
- manter separacao clara entre adapters de API e componentes de UI
- nao deixar detalhes HTTP vazarem para componentes visuais
- manter testes unitarios completos dos adapters, mappers e services

---

## 12) Regras operacionais para cada nova task do front

Toda nova task de frontend deve seguir esta ordem minima:

1. verificar se existe componente equivalente na `hans-ui-design-lib`
2. definir se o que falta e especifico do portfolio ou reutilizavel
3. estruturar a implementacao com Angular moderno
4. implementar junto com teste unitario
5. garantir coverage total do escopo alterado
6. rodar lint
7. rodar build
8. atualizar documentacao quando necessario

### Regras explicitas de nao-regressao de padrao

- nao usar `ngIf`/`ngFor`
- nao voltar para `@Input()`/`@Output()` antigos por habito
- nao criar modules
- nao transformar RxJS em abordagem padrao do app
- nao criar componente customizado se a `hans-ui-design-lib` ja resolver
- nao criar componente reutilizavel novo na lib sem alinhamento previo com Victor

---

## 13) Criterios gerais para o Codex

O Codex deve:

- respeitar a ordem oficial: backend concluido -> frontend -> integracao
- tratar o frontend como foco atual do projeto
- usar Angular moderno de forma consistente
- usar `signals`, `computed` e `effect` como base
- usar RxJS so quando realmente necessario
- usar `@if` e `@for`
- usar `input()`, `output()` e `inject()` quando aplicavel
- criar teste unitario junto de cada implementacao
- perseguir `100%` de coverage no escopo mensuravel de cada etapa
- rodar `test`, `test:coverage`, `lint` e `build` ao longo das etapas de implementacao
- consultar primeiro a `hans-ui-design-lib` antes de criar UI nova
- avisar antes de qualquer alteracao ou inclusao de componente reutilizavel na design lib
- manter no app apenas o que for especifico do portfolio
- atualizar documentacao quando as decisoes forem evoluindo

---

## 14) Entregaveis finais esperados

### Backend

- API NestJS/TypeScript documentada
- auth admin
- CRUDs completos
- dashboard endpoints
- seed real
- Swagger e README completos

### Frontend

- remake completo do portfolio em Angular moderno
- app shell bem estruturado
- home forte
- experiences, technologies e projects refeitas
- dashboard proprio
- traducao preparada
- light/dark mode reais
- uso consistente da `hans-ui-design-lib`
- testes unitarios acompanhando todas as entregas
- coverage total no escopo relevante

### Integracao

- portfolio publico consumindo a API
- dashboard consumindo endpoints agregados
- area administrativa preparada para consumo dos endpoints protegidos
- manutencao futura do portfolio sem depender de JSON hardcoded do legado

---

## 15) Resumo executivo

### Decisoes firmadas

- backend concluido em NestJS + Prisma + PostgreSQL/Neon
- frontend passa a ser o foco oficial do remake
- Angular `20.3.6` com abordagem moderna obrigatoria
- standalone components apenas
- `signals`, `computed` e `effect` como base
- RxJS apenas quando extremamente necessario
- `@if` e `@for` no HTML
- `input()`, `output()` e `inject()` como padrao moderno
- `hans-ui-design-lib` como base visual obrigatoria quando houver componente equivalente
- qualquer novo componente reutilizavel da design lib deve ser alinhado antes
- todo componente, pagina, service ou helper relevante deve nascer com teste unitario
- meta oficial de coverage total no escopo relevante de cada etapa
- lint, build e testes devem acompanhar todas as entregas

### Proximo passo oficial recomendado

Comecar a etapa de frontend pelo fechamento da fundacao do app e da arquitetura base, seguindo a sprint `F1 - App shell, layout base e infra transversal`, sem iniciar integracao real com a API antes do front publico estar estruturalmente pronto.
