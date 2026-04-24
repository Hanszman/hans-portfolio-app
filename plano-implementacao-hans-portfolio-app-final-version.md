# Plano de Implementacao - hans-portfolio-app + hans-portfolio-api (v5)

> Objetivo: guiar a continuacao oficial do remake do portfolio antigo (`victor_hanszman_portfolio-old`) usando o novo front em `hans-portfolio-app` e a nova API em `hans-portfolio-api`, com Angular moderno no front, `hans-ui-design-lib` como base visual oficial e integracao antecipada com a API NestJS ja concluida.

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
- a integracao real com a API deve comecar ja nas primeiras etapas do front, para visualizarmos dados reais desde cedo

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
- o plano old mantido no repositorio deve permanecer intacto
- qualquer evolucao de documentacao de execucao do remake deve acontecer somente neste plano versao final

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
- `app.routes.ts` deve concentrar a configuracao de rotas do app
- evitar espalhar a definicao principal de rotas em varios arquivos sem ganho real de clareza
- evitar passar textos estaticos de pagina em `route.data`
- `route.data` deve ser reservado para informacoes realmente relacionadas a roteamento, ids, slugs, flags ou dados dinamicos necessarios para resolver uma tela
- textos estaticos de apresentacao devem pertencer ao componente da pagina correspondente enquanto nao vierem da API
- a navegacao principal deve ser derivada da configuracao real de rotas quando possivel, sem exigir cadastro paralelo manual de labels estaticos
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
- o app nao deve manter um catalogo tipado proprio listando quais componentes existem na lib
- a responsabilidade de registrar e expor os componentes (`hans-button`, `hans-dropdown`, `hans-toggle`, `hans-tag`, etc.) pertence a propria `hans-ui-design-lib`
- no portfolio, o contrato com a lib deve ficar limitado aos pontos de integracao realmente necessarios, como aplicacao dinamica de tema via `window.HansUI.setTheme`

### 3.4. Integracao com backend desde o inicio do front

- nao usar mocks como trilha principal do remake
- priorizar consumo real da API NestJS ja nas primeiras sprints do frontend
- usar dados reais da API desde o inicio sempre que a feature ja tiver endpoint disponivel
- so usar dados estaticos temporarios quando houver bloqueio tecnico pontual e explicitamente justificado

### 3.5. Estrategia oficial de ambiente do frontend

- o frontend deve usar a estrategia padrao do Angular com `src/environments/environment.ts`
- a configuracao de producao deve usar `src/environments/environment.production.ts`
- a base local do app deve apontar para `http://localhost:4200`
- a base local da API deve apontar para `http://localhost:3000`
- a base produtiva do app deve apontar para `https://hans-portfolio-app.vercel.app`
- a base produtiva da API deve apontar para `https://hans-portfolio-api.vercel.app`
- a estrategia de ambiente do app deve continuar simples, publica e sem segredos no bundle

Mapa alvo:

- desenvolvimento local:
  `appBaseUrl=http://localhost:4200`
  `apiBaseUrl=http://localhost:3000`
- producao:
  `appBaseUrl=https://hans-portfolio-app.vercel.app`
  `apiBaseUrl=https://hans-portfolio-api.vercel.app`

### 3.6. Estrategia oficial de ambiente do backend para URLs publicas e CORS

- o backend deve manter `PORTFOLIO_APP_BASE_URL` e `PORTFOLIO_API_BASE_URL` no ambiente
- em ambiente local, essas variaveis devem apontar para `http://localhost:4200` e `http://localhost:3000`
- em producao, essas variaveis devem apontar para `https://hans-portfolio-app.vercel.app` e `https://hans-portfolio-api.vercel.app`
- a lista de origins liberadas para CORS deve ser derivada de uma configuracao central do backend, e nao hardcoded diretamente no `main.ts`
- `CORS_ALLOWED_ORIGINS` pode existir apenas como complemento opcional para previews, staging ou acessos extras

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

### 4.5. Estrategia oficial de gerenciamento de estado do frontend

O gerenciamento de estado do `hans-portfolio-app` deve seguir uma estrategia progressiva e leve, alinhada ao Angular moderno.

Principio central:

- usar a menor solucao que resolva bem o problema
- comecar local
- promover para feature quando necessario
- promover para global apenas quando houver necessidade real de compartilhamento transversal

#### Estado local de componente - padrao oficial

Para estado local de componente, a abordagem padrao deve ser:

- `signal()` para estado mutavel local
- `computed()` para derivacoes
- `effect()` para side effects controlados
- `input()` e `output()` para comunicacao entre componentes

Casos tipicos de estado local:

- expandido/colapsado
- tabs ativas
- modal aberto/fechado
- loading visual local
- filtros temporarios de UI ainda nao compartilhados
- estado de hover, selecao e interacao
- view-model derivada de props e estado local

#### Estado de pagina/feature - padrao oficial

Quando o estado precisar ser compartilhado entre varios componentes da mesma rota/feature, a abordagem oficial deve ser:

- service de feature com signals
- API publica enxuta
- estado privado mutavel
- sinais derivados expostos como leitura
- metodos explicitos para mutacoes

Casos tipicos:

- filtros de pagina
- paginacao
- ordenacao
- estado de carregamento e erro da feature
- selecao de item ativo
- cache leve da feature enquanto a rota estiver viva
- view-model consolidada para a pagina

#### Estado global de aplicacao - quando realmente usar

Estado global deve existir apenas para informacoes transversais e recorrentes entre varias telas.

Casos provaveis de estado global neste projeto:

- tema claro/escuro
- idioma/locale atual
- sessao admin autenticada
- configuracoes globais do portfolio carregadas uma vez e reutilizadas
- notificacoes/toasts globais
- estado global de layout realmente compartilhado

#### Solucao oficial recomendada por nivel

Para este remake, a estrategia recomendada e:

- componente: `signals` diretamente no componente
- pagina/feature: services de feature baseados em `signals`
- global: services singleton baseados em `signals`

#### Posicao oficial sobre NgRx

O projeto nao deve nascer obrigatoriamente com `@ngrx/store` classico como base de toda a aplicacao.

Motivos:

- o escopo atual do portfolio nao exige, de partida, a complexidade de um store global classico
- a direcao do projeto ja esta orientada a Angular moderno e signal-first
- boa parte dos cenarios de estado aqui pode ser resolvida com signals + services de forma mais simples e legivel

Se o estado global crescer a ponto de exigir uma solucao mais estruturada, a preferencia futura deve ser:

- avaliar primeiro `NgRx Signal Store`
- considerar `@ngrx/store` classico apenas se o projeto realmente passar a exigir event sourcing mais formal, tooling global pesado ou padroes de escala que nao se justifiquem agora

#### Posicao oficial sobre RxJS e BehaviorSubject

RxJS continua permitido, mas nao como container padrao de estado da aplicacao.

Uso aceitavel de RxJS:

- interoperabilidade com `HttpClient`
- router events
- formulos reativos quando o fluxo pedir
- debounce/throttle
- combinacao/cancelamento de streams
- polling
- websockets
- cenarios realmente stream-oriented

`BehaviorSubject` nao deve ser a escolha padrao para stores novos do app.

So deve entrar quando houver motivo claro de interoperabilidade com APIs baseadas em Observable ou quando o custo de adaptacao para signals nao compensar.

#### Posicao oficial sobre carregamento de dados remotos

Para leitura de dados da API:

- preferir `HttpClient` + services/adapters + signals
- manter o contrato HTTP fora dos componentes visuais
- expor para as paginas sinais de `data`, `loading`, `error` e derivados relevantes

Observacao importante:

- o Angular possui `httpResource`, mas a documentacao oficial o marca como experimental
- portanto, ele pode ser avaliado pontualmente em fluxos de leitura reativa simples, mas nao deve virar o padrao principal do projeto neste momento

#### Posicao oficial sobre persistencia no browser

Uso recomendado:

- `localStorage` para preferencias publicas duraveis, como tema e idioma
- `sessionStorage` para estado temporario de sessao quando realmente fizer sentido
- evitar guardar dados sensiveis de forma persistente sem necessidade real

Casos provaveis de persistencia:

- tema selecionado
- idioma selecionado
- preferencias leves de visualizacao

#### Regra pratica de escalonamento de estado

Ao implementar qualquer fluxo, usar esta ordem de decisao:

1. isso pode ficar so no componente com `signals`?
2. isso precisa ser compartilhado apenas dentro da pagina/feature?
3. isso realmente precisa ser global?
4. isso precisa persistir no browser?
5. isso realmente exige RxJS/`BehaviorSubject` ou um store mais sofisticado?

Se a resposta parar cedo, nao escalar a solucao sem necessidade.

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

Regra operacional:

- investigar a `hans-ui-design-lib` antes de criar qualquer UI nova
- investigar tambem a lib antes de criar controles simples dentro de componentes existentes, como botoes, toggles, dropdowns, inputs, tags e cards
- se existir componente equivalente e ele atender ao caso, usar a lib
- se existir componente parecido mas que nao atenda ao caso especifico, documentar mentalmente o motivo e criar apenas a composicao especifica do portfolio no app
- se o gap parecer reutilizavel para outros projetos, parar e alinhar antes de alterar a lib
- nao duplicar no portfolio um componente generico que a lib ja entrega, mesmo quando o uso parecer pequeno ou localizado

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
- containers/wrappers de layout quando o componente da lib existente nao representar bem uma area estrutural generica do portfolio

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
- responsividade minima preservada como requisito de todo componente visual novo

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

### 6.6. Regra de manutencao do README do app

Ao longo do desenvolvimento, o `README.md` do `hans-portfolio-app` deve ser atualizado apenas nas partes necessarias, preservando o formato que ja foi alinhado no repositorio.

Regras explicitas:

- nao mexer na ordem geral das informacoes do README
- manter as secoes `Features`, `Development`, `Tech Stack` e `History` na estrutura em que ja estao
- manter os icones que ja existem nos titulos `##`
- quando novas secoes forem realmente necessarias, incluir novos icones coerentes nos titulos `##`
- evitar reestruturacoes amplas do README sem necessidade real

---

## 7) Arquitetura alvo do hans-portfolio-app

### 7.1. Direcao estrutural

O frontend novo deve seguir uma organizacao moderna, legivel e simples de navegar.

Direcao oficial:

- `core/` para infraestrutura transversal
- `layout/` para casca visual e estrutura base
- `pages/` para paginas principais
- `features/` quando um dominio crescer o suficiente para merecer agrupamento proprio
- `shared/` apenas se surgir um item realmente generico e transversal que nao seja melhor classificado como layout, pagina, feature ou core
- `helpers/` no lugar de `utils/`

### 7.2. Responsabilidades sugeridas

`core/`

- api clients
- configuracoes globais
- translation
- theme
- stores globais baseados em signals quando realmente necessarios
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
- componentes de layout especificos do portfolio, mesmo quando baseados visualmente na `hans-ui-design-lib`
- containers reutilizaveis do proprio portfolio quando forem parte da composicao visual/estrutural das paginas

`pages/`

- home
- experiences
- technologies ou skills
- projects
- dashboard
- possiveis paginas complementares do remake
- cada rota publica deve ter seu proprio componente de pagina quando a tela tiver responsabilidade visual/conteudo proprio
- evitar componentes genericos de pagina baseados apenas em trocar textos por `route.data`

`shared/`

- deve nascer vazio ou nem existir ate haver necessidade real
- componentes realmente compartilhados entre varias features do portfolio, quando nao forem layout e nao pertencerem a um dominio especifico
- directives ou pipes que facam sentido no app inteiro

### 7.3. Distribuicao sugerida de stores

Exemplos de onde cada tipo de estado deve morar:

`component`

- filtros visuais simples
- abas locais
- modais locais
- hover/selecoes locais

`pages/<feature>`

- filtros de listagem
- ordenacao
- paginacao
- item selecionado
- leitura de endpoints daquela feature

`core`

- tema
- idioma
- sessao admin
- configuracoes globais carregadas da API
- notificacoes globais

### 7.4. Convencoes para stores e services de estado

- cada store/service deve ter responsabilidade clara
- evitar stores gigantes
- expor sinais readonly sempre que possivel
- centralizar mutacoes em metodos nomeados
- nao deixar componentes visuais conhecerem detalhes de HTTP
- nao misturar persistencia, transporte HTTP e regra de view no mesmo arquivo

### 7.5. Convencoes de codigo

- nomes claros
- responsabilidade bem separada
- pouca magia
- pouca indirecao desnecessaria
- preferencia por composicao simples
- evitar abstracao cedo demais
- manter leitura facil mesmo meses depois
- helpers especificos de uma feature devem ficar proximos da propria feature
- helpers especificos de componente/pagina devem ficar dentro de uma pasta local `helpers/`, seguindo o mesmo padrao adotado na `hans-ui-design-lib`
- tipos, interfaces, models e contratos semelhantes devem ficar em arquivos `*.types.ts`, proximos da feature ou dominio dono
- consts de apoio do componente/pagina tambem devem ficar no `*.types.ts` da propria feature quando fizerem parte do contrato e da modelagem daquela view
- evitar declarar interfaces e types inline no componente quando eles fizerem parte real da estrutura do codigo
- arquivos `helper` devem conter apenas funcoes auxiliares, sem acumular types, interfaces ou consts da feature
- configuracoes globais de tema devem ficar em `core/theme/theme.config.ts`
- temas concretos devem ficar separados por arquivo em `core/theme/themes`, por exemplo `light.theme.ts` e `dark.theme.ts`
- traducoes devem ficar separadas por idioma em `core/translation/translations`
- a configuracao agregadora de traducoes deve apenas compor os arquivos de idioma em `APP_TRANSLATIONS`
- classes CSS devem usar apenas `-` como separador
- evitar `_` em nomes de classes CSS
- preferir SCSS com `@apply` e classes utilitarias do Tailwind, seguindo o mesmo padrao adotado na `hans-ui-design-lib`
- usar CSS puro apenas quando a regra realmente nao puder ser expressa de forma clara com utilitarios
- nao sobrescrever base global de tipografia/reset no `styles.scss` quando a `hans-ui-design-lib` ja fornecer essa fundacao
- configuracoes publicas de integracao com a API devem ficar centralizadas em um unico arquivo claro por dominio, evitando espalhar tokens/helpers sem necessidade real

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
- consolidar a regra de manutencao do README do app sem alterar sua ordem estrutural
- consolidar a regra de manter o plano old intacto e evoluir apenas este plano final
- confirmar estrutura base do app
- manter a integracao por CDN/web components preparada
- consolidar a direcao oficial de integracao antecipada com a API
- consolidar a estrategia oficial de `environment.ts` e `environment.production.ts` do frontend
- consolidar a estrategia oficial de URLs publicas e CORS derivada de env no backend

#### Criterios de aceite

- documentacao coerente com o estado atual do projeto
- diretrizes tecnicas claras para as proximas sprints
- nenhum espaco para duvida sobre o uso de Angular moderno, coverage e design lib
- nenhum espaco para duvida sobre a regra de preservacao do formato do README
- nenhum espaco para duvida sobre a estrategia de ambiente e integracao antecipada

### F1.1 - Estrutura base do app

#### Objetivo

Criar a fundacao estrutural do app novo sem ainda atacar paginas completas.

#### Entregas

- estrutura inicial de `core`, `layout`, `pages`, `shared` e `helpers`
- definicao da shell principal do app
- organizacao inicial de rotas
- base inicial de composicao do layout
- placeholders visuais e copy apenas provisoriamente, para sustentar a fundacao da shell e do roteamento
- testes unitarios da casca minima criada

#### Criterios de aceite

- app com estrutura clara para crescimento
- shell minima funcional
- coverage total do escopo implementado

### F1.2 - Ambiente e integracao HTTP inicial

#### Objetivo

Conectar o frontend ao backend desde cedo e preparar a base de ambiente do projeto.

#### Entregas

- `environment.ts` com configuracao local do app e da API
- `environment.production.ts` com configuracao produtiva do app e da API
- configuracao de desenvolvimento apontando para `http://localhost:4200` e `http://localhost:3000`
- configuracao de producao apontando para `https://hans-portfolio-app.vercel.app` e `https://hans-portfolio-api.vercel.app`
- camada inicial de configuracao centralizada da API no front
- configuracao centralizada da API em um unico arquivo de dominio no front
- configuracao centralizada de URLs publicas e CORS no backend via env
- client HTTP base
- primeiros adapters de leitura publica da API
- validacao de acesso real do browser ao backend, incluindo CORS quando necessario
- testes unitarios dos adapters e da logica de ambiente

#### Criterios de aceite

- frontend consegue consumir a API real desde o inicio das proximas features
- ambiente local e produtivo possuem base URL clara e documentada
- sem depender de mocks como abordagem padrao
- coverage total do escopo implementado

### F1.3 - Layout principal e navegacao

#### Objetivo

Construir a casca navegavel principal do portfolio.

#### Entregas

- layout principal
- header
- footer
- navegacao principal
- navegacao derivada da configuracao real de rotas, sem textos estaticos em `route.data`
- wrappers de pagina
- uso seletivo de web components da `hans-ui-design-lib` como base visual da shell
- uso de `hans-button` da `hans-ui-design-lib` para controles visuais de navegacao
- containers reutilizaveis do portfolio para evitar duplicacao de boxes/cards estruturais
- responsividade inicial da shell
- testes unitarios dos componentes de layout criados

#### Criterios de aceite

- navegacao principal funcional
- layout responsivo minimo funcional
- coverage total do escopo implementado

### F1.4 - Temas, traducao e contrato com a design lib

#### Objetivo

Fechar a infraestrutura transversal que sera usada pelo restante do front.

#### Entregas

- base de tema claro/escuro usando `ThemeService`, `signal`, `computed`, persistencia em `localStorage` e aplicacao no `document`
- paletas completas do app em `core/theme/theme.config.ts`, sempre com os 23 tokens esperados pela `hans-ui-design-lib`
- arquivos de tema separados em `core/theme/themes/light.theme.ts` e `core/theme/themes/dark.theme.ts`
- objeto agregador `APP_THEMES`, evitando prefixos desnecessarios como `PORTFOLIO_THEMES`
- base de traducao usando `@ngx-translate/core`, providers standalone, `TranslatePipe`, locale `en-us`/`pt-BR`, fallback seguro, interpolacao de parametros e persistencia em `localStorage`
- arquivos de traducao separados por idioma em `core/translation/translations`
- objeto agregador `APP_TRANSLATIONS` compondo os arquivos de `en-us` e `pt-BR`
- contrato de integracao com a `hans-ui-design-lib` centralizado em `DesignLibService`
- aplicacao dinamica de tema via API global do CDN (`window.HansUI.setTheme`) em vez de chamadas diretas espalhadas pelo app
- o app nao deve manter lista tipada/catologo proprio dos componentes disponiveis na `hans-ui-design-lib`
- validacao dos web components da lib que ja entram na shell, incluindo `hans-button`, `hans-tag`, `hans-toggle` e `hans-dropdown`
- ao consumir a lib via CDN/web components, o app deve usar apenas propriedades, atributos, acoes e eventos realmente expostos pelo contrato publico dos custom elements
- callbacks internos dos componentes React da lib, como `onChange` ou `onSelect`, nao devem ser assumidos automaticamente no Angular enquanto nao estiverem expostos como props/eventos dos web components
- a `hans-ui-design-lib` deve exportar props tipadas para web components, evitando que booleanos e objetos/arrays sejam convertidos indevidamente para string pelo wrapper React -> Web Component
- desenvolvimento local do app deve poder consumir o build CDN local da lib via `index.local.html`, enquanto producao permanece apontando para o CDN publico
- controle de tema no header usando `hans-toggle`
- controle de idioma no header usando `hans-dropdown`, para suportar crescimento futuro para mais idiomas sem trocar o padrao de UI
- textos estaticos iniciais da shell/layout/pages passando pela camada de traducao, nao hardcoded direto nos templates quando forem copy de UI
- testes unitarios do escopo implementado

#### Criterios de aceite

- base de temas preparada e consumida pela shell
- base de traducao preparada e consumida pela shell/pages iniciais
- contrato com a design lib claro, funcional e isolado em service proprio
- nenhum componente reutilizavel da lib deve ser recriado no app sem antes investigar a `hans-ui-design-lib`
- novos controles visuais devem continuar usando componentes da lib quando ja existirem, como `hans-button`, `hans-tag`, `hans-toggle` e `hans-dropdown`
- templates devem preferir `TranslatePipe` para copy traduzida, deixando services de traducao para estado/acoes em TypeScript
- coverage total do escopo implementado

### F2 - Home estrategica

#### Objetivo

Construir uma home forte, moderna e com posicionamento profissional claro.

#### Entregas

- hero principal
- resumo profissional
- highlights de senioridade e stack
- CTA(s) coerentes com portfolio profissional
- blocos de projetos/experiencias em destaque
- uso de avatar/icon da `hans-ui-design-lib` quando fizer sentido para enriquecer leitura visual
- aproveitamento de imagens reais vindas da API sempre que endpoints agregados ja entregarem `imagePath` ou `icon`
- secoes de prova social/impacto se fizer sentido
- consumo de dados reais da API nas secoes que ja tiverem endpoint adequado
- componentes especificos da home com testes unitarios

#### Criterios de aceite

- home comunica senioridade e proposta de valor em poucos segundos
- responsividade boa
- integracao real com a API usada sempre que o backend ja suportar a necessidade da secao
- coverage total do que for implementado

### Observacao de organizacao tecnica da API do front

- manter `src/app/core/api/api.config.ts` na raiz da camada de API
- organizar endpoints por dominio dentro de pastas como `core/api/dashboard/` e `core/api/system/`
- cada dominio deve concentrar `service.ts`, `types.ts` e `service.spec.ts`
- factories/mocks compartilhados para specs devem ficar em `core/api/mocks/`
- evitar sufixo `Api` nos nomes dos services quando a propria localizacao em `core/api/` ja deixar o contexto obvio

### F3 - Pagina de experiences

#### Objetivo

Transformar experiencias em narrativa de carreira, nao apenas lista de cards.

#### Entregas

- timeline ou composicao equivalente
- agrupamentos/organizacao clara
- destaque para impacto, contexto e stack
- ligacoes com clientes, cargos, projetos e tecnologias
- consumo real dos endpoints de experiences e relacionamentos disponiveis
- testes unitarios completos

#### Criterios de aceite

- leitura facil
- boa hierarquia visual
- narrativa profissional clara
- coverage total do escopo entregue

#### Status de execucao atual

- F3 concluida no `hans-portfolio-app`
- pagina `experiences` agora consome `GET /experiences` com relacionamentos reais
- a leitura foi organizada como timeline narrativa com foco em empresa, papel, clientes, projetos e stack
- reutilizacao da `hans-ui-design-lib` aplicada com `hans-avatar`, `hans-tag` e `hans-icon`
- proxima etapa oficial: `F4 - Pagina de technologies/skills`

### F4 - Pagina de technologies/skills

#### Objetivo

Apresentar stack e experiencia tecnica com mais clareza do que no portfolio antigo.

#### Entregas

- listagem moderna de tecnologias
- filtros realmente uteis
- agrupamentos e visualizacoes mais claras
- destaque para experiencia total e por contexto
- consumo real dos dados de `experienceMetrics` da API
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
- consumo real dos endpoints de projetos e settings relacionados
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
- consumo real dos endpoints agregados do dashboard
- graficos e indicadores coerentes
- estrutura integrada aos endpoints agregados da API
- componentes de analytics testados

#### Criterios de aceite

- dashboard agrega valor real
- nao parece decorativo
- leitura clara dos dados
- coverage total do escopo entregue

### F7 - Integracao visual final do portfolio publico

#### Objetivo

Fechar consistencia visual e tecnica do portfolio publico com a integracao real ja em funcionamento.

#### Entregas

- refinamento de UX
- ajustes de responsividade
- estados de loading, empty e erro
- revisao de acessibilidade
- revisao de navegacao
- revisao de consistencia com `hans-ui-design-lib`
- revisao da consistencia da integracao com a API em todas as paginas publicas
- testes adicionais necessarios

#### Criterios de aceite

- portfolio publico pronto e integrado com a API
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

A integracao com o backend nao deve ficar isolada apenas no final do projeto. Ela deve comecar nas primeiras etapas do frontend e amadurecer ao longo das entregas.

Fluxo oficial:

- preparar ambiente e client HTTP na `F1.2`
- consumir dados reais nas paginas publicas desde as primeiras features
- integrar dashboard com endpoints agregados assim que a pagina existir
- consolidar estados de loading/erro/empty ao longo do desenvolvimento
- preparar autenticacao admin no front em momento apropriado
- depois integrar CRUDs protegidos quando a etapa administrativa chegar

Escopo continuo da integracao:

- conectar o app aos GETs publicos da API
- evitar mocks como trilha principal
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
- manter a configuracao de ambiente do frontend simples e explicita
- manter a base local apontando para `http://localhost:3000`
- manter a base produtiva apontando para `https://hans-portfolio-api.vercel.app`

---

## 12) Regras operacionais para cada nova task do front

Toda nova task de frontend deve seguir esta ordem minima:

1. verificar se existe componente equivalente na `hans-ui-design-lib`
2. definir se o que falta e especifico do portfolio ou reutilizavel
3. estruturar a implementacao com Angular moderno
4. conectar com a API real sempre que a feature ja tiver endpoint disponivel
5. implementar junto com teste unitario
6. garantir coverage total do escopo alterado
7. rodar lint
8. rodar build
9. atualizar documentacao quando necessario

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
- aplicar a estrategia oficial de estado: `signals` primeiro, feature services depois, global apenas quando necessario
- evitar `BehaviorSubject` e store global classico como padrao inicial
- preservar o formato do `README.md` do app quando futuras atualizacoes forem necessarias
- manter o plano old intacto e atualizar apenas este plano final
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
- integracao real com a API desde as primeiras etapas relevantes
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
- integracao com a API deve comecar nas primeiras etapas do frontend
- Angular `20.3.6` com abordagem moderna obrigatoria
- standalone components apenas
- `signals`, `computed` e `effect` como base
- estrategia de estado progressiva: local com signals, feature com services signal-based, global apenas quando necessario
- RxJS apenas quando extremamente necessario
- `@if` e `@for` no HTML
- `input()`, `output()` e `inject()` como padrao moderno
- `hans-ui-design-lib` como base visual obrigatoria quando houver componente equivalente
- qualquer novo componente reutilizavel da design lib deve ser alinhado antes
- todo componente, pagina, service ou helper relevante deve nascer com teste unitario
- meta oficial de coverage total no escopo relevante de cada etapa
- `README.md` do app deve manter sua ordem estrutural e seus icones atuais
- o plano old deve permanecer intacto
- lint, build e testes devem acompanhar todas as entregas

### Proximo passo oficial recomendado

Comecar a etapa de frontend pela fundacao do app e da integracao antecipada com a API, seguindo `F1.1` e `F1.2` antes de avançar para as primeiras paginas publicas.
