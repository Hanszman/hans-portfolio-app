# Plano de Implementacao - `hans-portfolio-app` + `hans-portfolio-api` (v4)

> Objetivo: guiar a execucao do remake do portfolio antigo (`victor_hanszman_portfolio-old`) no repositorio novo de front (`hans-portfolio-app`) e no repositorio novo de back (`hans-portfolio-api`), usando **Angular 20.3.6** no front-end, **`hans-ui-design-lib` via CDN/web components** como base visual, e **backend proprio em Node.js 24 + NestJS + Express + TypeScript + Prisma + PostgreSQL/Neon** desde a primeira etapa.

OBS: As informacoes de conexao com o banco de dados estao abaixo:

PGHOST=ep-shy-dawn-acds024d-pooler.sa-east-1.aws.neon.tech
PGDATABASE=hans-portfolio-db
PGUSER=neondb_owner
PGPASSWORD=npg_Tc6r5CmoLxYD
PGPORT=5432
PGSSLMODE=require
PGCHANNELBINDING=require

> Ordem oficial de implementacao:
>
> 1. **Backend completo + banco de dados + autenticacao + CRUDs + admin API**
> 2. **Frontend completo (remake do portfolio atual)**
> 3. **Integracao frontend <-> backend**

Este plano substitui o `v3` para fins de execucao.

O que muda em relacao ao `v3`:

- o backend em `.NET / C# / EF Core` deixa de ser a trilha oficial;
- o repositorio `hans-portfolio-api` sera **reaproveitado**, mas com a base atual removida;
- o backend sera recriado do zero com **NestJS + Express + TypeScript + Prisma**;
- o escopo funcional, a modelagem conceitual e a ordem de execucao continuam essencialmente os mesmos.

---

## 1) Direcao estrategica do remake

O novo portfolio precisa comunicar com clareza que Victor e:

- **Engenheiro de Software Full Stack com forte especializacao em Front-End**;
- com **7+ anos de experiencia** em aplicacoes web corporativas de grande porte;
- com foco principal em **Angular, TypeScript e React**;
- com experiencia real em **Design Systems, Micro Front-End, modernizacao de legados, dashboards analiticos, Clean Code, SOLID, TDD e CI/CD**;
- e com repertorio complementar em **Node, NestJS, Prisma, PostgreSQL, REST APIs, Docker e Azure DevOps**.

O remake deve sair do modelo antigo de "lista extensa de tecnologias e cards" e evoluir para:

- **Home com impacto e posicionamento forte**;
- **Highlights realmente visiveis**;
- **Projetos apresentados como cases**;
- **Experiencias narradas como carreira e impacto**;
- **Tela propria de dashboard analitico**;
- **Admin real com persistencia e manutencao**.

---

## 1.1) Ajustes recentes ja consolidados

### Design lib

- A `hans-ui-design-lib` continua sendo tratada neste plano como **pronta para consumo**.
- Nao ha escopo de novas tasks de desenvolvimento dentro da lib nesta fase.
- O foco continua sendo:
  - inicializacao correta via CDN/web components no Angular;
  - documentacao de quais componentes entram em cada tela;
  - criacao apenas de componentes especificos do proprio portfolio quando fizer sentido.

### Backend

- O repositorio **`hans-portfolio-api` continua sendo o ponto de partida oficial da etapa 1**.
- A base atual em `.NET` deve ser tratada como **descartavel** para o remake.
- A implementacao deve:
  - remover os arquivos atuais do backend em `.NET`;
  - recriar o projeto do zero com **NestJS** usando o adapter padrao **Express**;
  - configurar Prisma, Swagger, health check, testes e README desde o inicio;
  - registrar no README o historico de comandos e pacotes usados durante a evolucao do projeto, agora no ecossistema Node/Nest/Prisma.

---

## 2) Principios tecnicos obrigatorios

### 2.1. Front-end - Angular 20.3.6 modernizado

O front permanece com a mesma direcao oficial do `v3`:

- Standalone Components;
- Signals, `computed`, `effect` e `linkedSignal` quando fizer sentido;
- nova sintaxe de template com `@if`, `@for`, `@switch` e `@defer`;
- `input()` e `output()` modernos;
- `inject()` quando melhorar a leitura;
- roteamento standalone com lazy loading por pagina/feature;
- services e facades enxutos;
- estado local por feature;
- RxJS apenas onde realmente fizer sentido.

O front continua **sem mudanca estrutural relevante** neste `v4`, exceto pelas futuras integracoes que agora apontam para uma API em NestJS.

### 2.2. Backend - NestJS didatico, moderno e corporativo

O backend deve ser construído de forma **didatica e profissional**, mas sem burocracia desnecessaria.

#### Direcao recomendada

- **Node.js 24 Active LTS**
- **NestJS** com o adapter padrao **Express**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL (Neon DB)** como banco principal
- **Swagger / OpenAPI** desde o inicio
- **Autenticacao e autorizacao** para a area administrativa
- **Migrations versionadas** com Prisma
- **Seed inicial** baseado nos JSONs do portfolio antigo
- **Estrutura simples e legivel**, alinhada aos padroes do Nest
- **README didatico** explicando comandos, estrutura, scripts, execucao, testes, coverage, build e atualizacao de dependencias

#### Ferramentas e pacotes de referencia

- `@nestjs/config`
- `@nestjs/swagger`
- `@nestjs/terminus`
- `@nestjs/jwt`
- `@nestjs/passport`
- `passport-jwt`
- `bcrypt`
- `prisma`
- `@prisma/client`
- `jest`
- `supertest`

### 2.3. Qualidade e consistencia

Tanto no front quanto no back:

- Clean Code
- DRY
- SRP
- SOLID onde fizer sentido
- nomes claros
- responsabilidade bem separada
- testes com objetivo de **100% de coverage** no alvo mensuravel de cada etapa
- exclusao explicita de coverage apenas para arquivos gerados ou boilerplate sem valor real de teste
- lint/build/test verdes
- documentacao clara
- README completo

#### Regra oficial de testes deste remake

- testar todo arquivo que tenha comportamento relevante;
- exigir `100%` de coverage para o alvo mensuravel definido em cada step;
- excluir explicitamente do coverage apenas o que for gerado ou de baixo valor;
- exemplos tipicos de exclusao aceitavel:
  - Prisma Client gerado;
  - artefatos de migration;
  - bootstrap/config puramente declarativo;
  - DTOs ou contratos triviais sem comportamento, quando nao fizer sentido testar diretamente.

---

## 3) Ordem de execucao oficial

### Etapa 1 - Backend completo

Implementar primeiro:

- API NestJS/TypeScript no repositorio `hans-portfolio-api`
- limpeza da base atual em `.NET`
- banco PostgreSQL no Neon
- modelagem de entidades e relacionamentos no Prisma
- migrations
- seed inicial
- autenticacao/login admin
- autorizacao
- CRUDs completos
- documentacao Swagger/OpenAPI
- README da API
- scripts e historico de setup
- cobertura de testes e pipeline basica de qualidade

Regra oficial de acesso aos CRUDs:

- `Read` sera a unica operacao publica em todas as entidades
- `Create`, `Update` e `Delete` serao permitidos apenas para o usuario admin autenticado
- na pratica, apenas Victor podera realizar mutacoes administrativas no sistema

### Etapa 2 - Frontend completo

Implementar depois:

- remake completo do portfolio em Angular 20.3.6
- usando temporariamente mocks/contratos tipados compativeis com a API
- integracao visual com a `hans-ui-design-lib`
- dark mode/light mode
- traducao
- novas paginas e layout

### Etapa 3 - Integracao

Por fim:

- conectar frontend ao backend NestJS
- substituir fontes locais/mockadas pela API
- validar autenticacao do admin
- validar fluxos de upload, linkagem, listagem e edicao
- ajustes finais de UX, loading, erro e cache

---

## 4) Dados e conteudo que o sistema precisa suportar

O sistema precisa suportar, no minimo:

- project
- experience
- skill/technology
- formation
- spoken languages
- customer
- job
- link
- image assets
- tag
- portfolio setting
- highlights (`highlight`) nas entidades relevantes

Tambem precisa refletir de forma estrategica os highlights ja confirmados:

- Angular e TypeScript como stack principal do remake do portfolio
- React como **core stack do Victor enquanto repertorio tecnico e projetos pessoais**
- Design System proprio
- Micro Front-End
- modernizacao de legado Angular/Razor/C#
- dashboards analiticos
- validacoes complexas e i18n
- CI/CD, Docker e Azure DevOps
- experiencia com clientes enterprise
- projetos pessoais relevantes e futuros highlights

---

## 5) Modelagem conceitual alvo do backend

O modelo conceitual do `v3` continua valido e deve ser mantido, apenas traduzido para Prisma/Nest.

### Entidades principais

- `User`
- `Project`
- `Experience`
- `Technology`
- `Formation`
- `SpokenLanguage`
- `Customer`
- `Job`
- `Link`
- `ImageAsset`
- `Tag`
- `PortfolioSetting`

### Relacionamentos esperados

- `Project` <-> `Technology`
- `Experience` <-> `Technology`
- `Formation` <-> `Technology`
- `Project` <-> `Experience`
- `Experience` <-> `Customer`
- `Experience` <-> `Job`
- `Project` <-> `Tag`
- `Technology` <-> `Tag`
- `Project` <-> `Link`
- `Experience` <-> `Link`
- `Formation` <-> `Link`
- `Project` <-> `ImageAsset`
- `Experience` <-> `ImageAsset`
- `Formation` <-> `ImageAsset`
- `Technology` <-> `ImageAsset`
- `SpokenLanguage` <-> `ImageAsset`
- `Customer` <-> `ImageAsset`
- `Job` <-> `ImageAsset`

### Convencoes relevantes

- `highlight` continua como boolean nas entidades relevantes
- `link` e `image` continuam como entidades proprias
- `language`, `customer` e `job` continuam incluidos
- a ideia de `slug`, `sortOrder`, `isPublished`, `createdAt`, `updatedAt` continua valida onde fizer sentido

---

## 6) Banco de dados

## 6.1. Banco escolhido

- **PostgreSQL**
- provider hospedado inicialmente no **Neon DB**

## 6.2. ORM escolhido

- **Prisma ORM**

### Motivos

- forte adocao atual no ecossistema TypeScript
- recipe oficial no NestJS
- excelente DX com client tipado
- migrations e seed bem resolvidos
- boa aderencia ao objetivo de portfolio moderno em Node/Nest
- mais alinhado com vagas atuais de backend TypeScript do que Sequelize para este contexto

## 6.3. Estrategia de migrations e seed

Criar:

- `prisma/schema.prisma`
- migrations versionadas
- `prisma/seed.ts`
- scripts de ambiente para:
  - aplicar migrations
  - popular seed
  - resetar base local
  - abrir Prisma Studio

Tambem manter:

- documentacao do schema
- diagrama ER simplificado no README ou em `/docs`
- scripts SQL auxiliares para inspecao/troubleshooting quando necessario
- estrategia explicita para assets estaticos enquanto nao houver object storage:
  - versionar imagens/icones em `hans-portfolio-app/src/assets/img`
  - persistir caminhos publicos da forma `/assets/img/...` nas entidades que precisarem de icone
  - manter a tabela `image_asset` como catalogo normalizado dos arquivos versionados do frontend, incluindo subpasta e tipo de uso
  - relacionar imagens nas entidades principais por tabelas de juncao quando a API precisar expor metadata de renderizacao
  - manter um snapshot versionado dos dados em vez de depender continuamente dos JSONs do legado

---

## 7) Arquitetura sugerida do backend

## 7.1. Stack base

- Node.js 24 Active LTS
- NestJS
- Express adapter padrao
- Prisma ORM
- PostgreSQL provider
- Swagger/OpenAPI
- autenticacao com JWT para admin
- politicas de autorizacao por role

## 7.2. Estrutura de pastas sugerida

```txt
hans-portfolio-api/
  src/
    main.ts
    app.module.ts
    common/
      decorators/
      filters/
      guards/
      interceptors/
      pipes/
    config/
    modules/
      system/
      auth/
      project/
      experience/
      technology/
      formation/
      spoken-language/
      customer/
      job/
      link/
      image-asset/
      tag/
      portfolio-setting/
      dashboard/
    prisma/
      prisma.module.ts
      prisma.service.ts

  prisma/
    schema.prisma
    migrations/
    seed.ts

  test/
    e2e/

  docs/
    api/
    database/

  scripts/
    db/
    setup/
```

### Explicacao simples da arquitetura

- **controllers** -> onde ficam as rotas HTTP
- **services** -> regras de aplicacao e orquestracao
- **DTOs** -> requests/responses/validacoes
- **Prisma module/service** -> acesso ao banco
- **guards/strategies** -> autenticacao e autorizacao

> A ideia aqui e seguir o jeito do Nest, e nao reproduzir uma arquitetura de camadas tipica do `.NET`.

### Convencoes de organizacao consolidadas para este remake

- cada entidade/feature deve viver em `src/modules/<feature>`
- exemplos esperados:
  - `src/modules/system`
  - `src/modules/auth`
  - `src/modules/content`
- dentro de cada feature, a organizacao padrao deve priorizar:
  - `controllers/`
  - `services/`
  - `contracts/`
  - `types/`
- `controllers` devem concentrar apenas HTTP e delegar para `services`
- `services` devem concentrar regra/orquestracao
- `contracts` devem representar o contrato HTTP publico da API:
  - DTOs de request
  - DTOs de response
- `types` devem representar estruturas internas de implementacao:
  - rows brutas de query
  - tipos auxiliares de mapper
  - shapes internos nao expostos como contrato HTTP

### Convencao oficial para types

- o padrao oficial passa a ser **um arquivo de types por entidade ou responsabilidade**
- nome do arquivo: `<feature-ou-responsabilidade>.types.ts`
- exemplos:
  - `database-diagnostics.types.ts`
  - `project.types.ts`
  - `experience.types.ts`
- no caso do CRUD do portfolio, um modulo guarda-chuva como `src/modules/content` pode agrupar varias entidades pequenas, desde que mantenha:
  - controllers por entidade
  - contracts por entidade
  - services compartilhados apenas quando a responsabilidade generica realmente fizer sentido
- quando existir uma abstracao generica de CRUD como no modulo `content`, a customizacao por entidade deve ficar concentrada em um registry/config central
- mesmo com services genericos, os controllers devem continuar separados por entidade para manter a superficie HTTP explicita e facil de navegar
- quando uma mesma feature precisar de varios tipos internos, o preferivel e mantelos agrupados no mesmo `*.types.ts` em vez de pulverizar arquivos pequenos cedo demais

### Convencao de responsabilidade por controller/service

- quando uma responsabilidade for claramente distinta, deve existir seu proprio par de `controller` e `service`
- exemplos validos no modulo `system`:
  - `PingController` + `PingService`
  - `DatabaseDiagnosticsController` + `DatabaseDiagnosticsService`
  - `HealthController` + `HealthService`
  - `SystemController` + `SystemService` apenas para agregacao/overview do proprio modulo

### Convencao de testes

- testes unitarios devem ficar proximos do codigo da propria feature
- testes e2e devem ficar na pasta de topo `test/`
- a tendencia e ter **um arquivo e2e por feature/modulo**, por exemplo:
  - `test/system.e2e-spec.ts`
  - `test/auth.e2e-spec.ts`
  - `test/project.e2e-spec.ts`
- o comando oficial de coverage deve ser `npm run test:coverage`
- `test:coverage` deve validar o alvo de coverage da etapa e tambem executar a suite e2e
- controllers com comportamento real de delegacao tambem devem receber testes unitarios
- se a instrumentacao do framework gerar ruido artificial de branch coverage nos controllers, eles podem ficar fora do alvo mensuravel, desde que continuem testados
- arquivos gerados, contratos triviais e `types` internos podem ser excluidos do coverage quando nao fizer sentido medir execucao neles

## 7.3. Padrao de endpoints

### Publicos

- `GET /projects`
- `GET /projects/{slug}`
- `GET /experiences`
- `GET /experiences/{slug}`
- `GET /technologies`
- `GET /technologies/{slug}`
- `GET /formations`
- `GET /formations/{slug}`
- `GET /spoken-languages`
- `GET /spoken-languages/{code}`
- `GET /customers`
- `GET /customers/{slug}`
- `GET /jobs`
- `GET /jobs/{slug}`
- `GET /links`
- `GET /links/{id}`
- `GET /image-assets`
- `GET /image-assets/{id}`
- `GET /tags`
- `GET /tags/{slug}`
- `GET /portfolio-settings`
- `GET /portfolio-settings/{key}`
- `GET /dashboard`

Regra oficial:

- endpoints de leitura publica nao exigem login
- a leitura sera a unica parte aberta dos CRUDs
- todos os `GET` de colecao devem suportar paginacao
- todos os `GET` de colecao devem suportar filtros opcionais por propriedades relevantes da entidade

### Sistema

- `GET /system`
- `GET /system/ping`
- `GET /system/database`
- `GET /system/health`
- `GET /`
- `GET /health`

### Administrativos

- `POST /auth/login`
- `GET /admin/session`
- `POST /admin/projects`
- `PUT /admin/projects/{id}`
- `DELETE /admin/projects/{id}`
- CRUD equivalente para `experience`, `technology`, `formation`, `job`, `customer`, `spoken-language`, `link`, `image-asset`, `tag` e `portfolio-setting`, sempre com `POST`, `PUT` e `DELETE` em `/admin/<resource>`

Regra oficial:

- todo `Create`, `Update` e `Delete` deve ficar protegido por autenticacao e autorizacao de admin
- a area administrativa existe para uso do proprio Victor como unico admin esperado do sistema

### Observacao sobre rotas no Nest

- as rotas serao definidas por **controllers + modules**;
- o adapter HTTP padrao sera o **Express**;
- nao sera feito swap para Fastify neste projeto;
- devemos preservar, sempre que possivel, a mesma superficie HTTP ja pensada no `v3` para evitar churn futuro no frontend.

## 7.4. Documentacao da API

Obrigatorio incluir:

- Swagger/OpenAPI funcionando
- descricao dos endpoints
- exemplos de request/response
- status codes
- autenticacao descrita
- colecao de teste opcional em Insomnia/Postman

---

## 8) README do backend

O backend deve continuar tendo um README tao caprichado quanto os outros projetos novos, mas agora 100% alinhado ao ecossistema Node/Nest/Prisma.

## 8.1. O README precisa conter

- visao geral do projeto
- stack usada
- arquitetura de pastas explicada
- pre-requisitos
- como clonar
- como configurar `.env` / `.env.example`
- como rodar localmente
- como rodar migrations
- como popular a base
- como acessar Swagger
- como acessar health
- como validar conexao com banco
- como rodar testes
- como gerar coverage
- como fazer build
- como atualizar dependencias
- lista de comandos importantes
- historico dos comandos/scripts usados para criacao do projeto
- duvidas comuns de setup
- explicacao simples de Nest modules/controllers/services/Prisma para iniciantes

### Comandos minimos que devem aparecer documentados

- `npm install`
- `npm run start:dev`
- `npm run build`
- `npm run test`
- `npm run test:coverage`
- `npm run prisma:migrate:dev`
- `npm run prisma:migrate:deploy`
- `npm run prisma:studio`
- `npm run prisma:seed`
- `npm run prisma:seed:reset`
- `npm run prisma:seed:snapshot`
- `npm run prisma:admin:bootstrap`
- comando de checagem de dependencias desatualizadas adotado no projeto

---

## 9) Etapa 1 - Plano detalhado do backend

## 9.1. Sprint B1 - Foundation

### Objetivo

Subir a base do backend com arquitetura minima, Swagger e banco conectado.

### Entregas

- limpeza da base atual do `hans-portfolio-api`
- inicializacao do projeto NestJS do zero
- configuracao do Express adapter padrao
- configuracao do PostgreSQL (Neon/local) via Prisma
- configuracao do `.env` e `.env.example`
- configuracao do Swagger/OpenAPI
- health check inicial
- endpoint `GET /system`
- endpoint `GET /system/ping`
- endpoint `GET /system/database`
- endpoint `GET /system/health`
- alias `GET /`
- alias `GET /health`
- README inicial da API em ingles
- documentacao dos comandos de execucao, testes e Prisma
- testes e2e para `ping`, `health` e `database`

### Criterios de aceite

- API sobe localmente
- Swagger abre
- conexao com banco configurada
- `ping`, `health` e `database diagnostics` funcionam
- projeto roda sem warnings criticos

## 9.2. Sprint B2 - Modeling and migrations

### Objetivo

Criar schema Prisma, relacionamentos e primeira migration.

### Entregas

- modelos principais no `schema.prisma`
- enums
- relacoes N:N necessarias
- migration inicial
- aplicacao da migration no `hans-portfolio-db`
- documentacao simplificada do schema

### Criterios de aceite

- banco sobe com schema completo inicial
- relacoes principais criadas
- nomes de tabelas/colunas padronizados

## 9.3. Sprint B3 - Seed snapshot

### Objetivo

Popular o banco a partir do legado uma unica vez e consolidar um seed versionado, deterministico e replayable.

### Entregas

- import inicial dos dados do legado
- consolidacao de um snapshot versionado em `prisma/data/portfolio-seed.snapshot.json`
- `prisma/seed.ts` independente do projeto antigo
- `prisma/reset.ts` para limpeza dos dados do portfolio
- `prisma/export-seed-snapshot.ts` para regenerar o snapshot quando necessario
- carga inicial para `project`, `experience`, `technology`, `formation`, `spoken-language`, `customer`, `job`, `portfolio-setting` e vinculos
- versionamento dos assets reutilizados em `hans-portfolio-app/src/assets/img`
- novos campos opcionais de `icon` nas entidades que precisarem expor um asset principal no frontend
- catalogo versionado em `image_asset` com campos de `folder` e `kind`
- relacoes de imagem preenchidas para `project`, `experience`, `formation`, `technology`, `spoken-language`, `customer` e `job`
- documentacao do fluxo novo de `prisma:seed`, `prisma:seed:reset` e `prisma:seed:snapshot`
- o fluxo de `prisma:seed` deve recriar o admin bootstrapado quando `ADMIN_BOOTSTRAP_*` estiver configurado, para reduzir atrito apos resets completos de schema

### Criterios de aceite

- ambiente local sobe com conteudo real
- os dados do portfolio podem ser apagados e repovoados sem depender do repo antigo
- `npm run prisma:seed` aplica migrations pendentes e reinsere o snapshot versionado
- `npm run prisma:seed:reset` limpa os dados do portfolio

## 9.4. Sprint B4 - Authentication and authorization

### Objetivo

Criar acesso administrativo seguro.

### Entregas

- login admin
- criacao do primeiro usuario admin
- script de bootstrap do primeiro admin
- hash de senha com `bcrypt`
- autenticacao JWT
- autorizacao por role
- protecao de rotas administrativas com guards
- endpoint protegido inicial `GET /admin/session`
- formalizacao da regra: somente `Read` publico; `Create`, `Update` e `Delete` exclusivos do admin autenticado

### Criterios de aceite

- endpoints admin exigem autenticacao
- endpoints publicos continuam livres
- operacoes de escrita ficam bloqueadas para usuarios nao autenticados
- `POST /auth/login` retorna JWT valido para o admin bootstrapado
- `GET /admin/session` valida a sessao autenticada do admin

## 9.5. Sprint B5 - Administrative CRUDs

### Objetivo

Criar CRUD completo das entidades relevantes.

### Entregas

- CRUD de Projects
- CRUD de Experiences
- CRUD de Technologies
- CRUD de Formations
- CRUD de SpokenLanguages
- CRUD de Customers
- CRUD de Jobs
- CRUD de Tags
- CRUD de Links
- CRUD de ImageAssets
- CRUD de PortfolioSettings
- DTO validation e responses consistentes
- separacao explicita entre leitura publica e escrita administrativa protegida
- rotas publicas de leitura em `/projects`, `/experiences`, `/technologies`, `/formations`, `/spoken-languages`, `/customers`, `/jobs`, `/links`, `/image-assets`, `/tags` e `/portfolio-settings`
- rotas administrativas protegidas sob `/admin/<resource>` com `POST`, `PUT` e `DELETE`
- possibilidade de usar um modulo guarda-chuva `content` com services genericos de leitura/escrita, desde que cada entidade mantenha seus controllers e contracts
- registry/config central para definir por entidade: delegate Prisma, lookup field, ordenacao, includes e DTOs
- tabelas de relacionamento modeladas no Prisma e expostas na leitura via includes das entidades principais, mesmo sem CRUD administrativo dedicado nesta sprint
- todos os `GET` de colecao devem retornar `data + pagination`
- todos os `GET` de colecao devem aceitar filtros opcionais por propriedades relevantes
- todos os `GET` de colecao devem aceitar ordenacao opcional por query params, respeitando a whitelist de campos permitidos por entidade
- `PUT` pode continuar sendo usado como update parcial se a API mantiver DTOs parciais e comportamento nao-destrutivo para campos omitidos
- `POST` e `PUT` administrativos devem aceitar arrays/estruturas para criar ou substituir relacoes N:N diretamente pelas entidades principais, sem exigir endpoints separados para cada join table

### Criterios de aceite

- todos os CRUDs principais funcionam via Swagger
- requests validadas
- responses consistentes
- mensagens de erro claras
- somente `Read` permanece publico nas entidades expostas
- apenas `POST`, `PUT` e `DELETE` existem na superficie administrativa das entidades de conteudo
- leituras publicas de colecao funcionam com paginacao
- leituras publicas de colecao funcionam com filtros opcionais por propriedades relevantes
- leituras publicas de colecao funcionam com ordenacao opcional via query params
- relacoes principais podem ser manipuladas nos payloads administrativos das entidades donas

## 9.6. Sprint B6 - Dashboard e endpoints agregados

### Objetivo

Criar endpoints derivados/analiticos para o dashboard do front.

### Entregas

- endpoint de distribuicao por stack
- endpoint de projetos por contexto
- endpoint de tecnologias por frequencia/contexto/nivel
- endpoint de timeline profissional
- endpoint de highlights

### Criterios de aceite

- front consegue consumir dados analiticos sem calculo pesado client-side

## 9.7. Sprint B7 - Tests, docs and finish

### Objetivo

Fechar a API redonda.

### Entregas

- testes unitarios criticos
- testes e2e basicos
- Swagger refinado
- README final
- scripts de setup e banco
- revisao de nomenclatura e estrutura
- exclusoes de coverage apenas onde forem justificadas

### Criterios de aceite

- documentacao boa o suficiente para retomar o projeto meses depois sem sofrer
- cobertura do alvo da etapa em 100%

---

## 10) Front-end e integracao

As secoes de frontend e integracao do `v3` continuam validas como direcao principal deste remake.

Neste `v4`, elas devem ser entendidas com os seguintes ajustes:

- toda referencia a "API .NET" passa a significar **API NestJS**
- toda referencia a "contracts compativeis com a API" passa a significar **contracts compativeis com a superficie HTTP do backend Nest**
- o frontend continua vindo **depois** do backend
- a integracao continua vindo **depois** do frontend

As decisoes de front que permanecem firmadas:

- Angular **20.3.6** com abordagem moderna
- estrutura `core`, `layout` e `pages`
- `translation` dentro de `core`
- `shared` dentro de `core`
- `helpers` no lugar de `utils`
- dashboard em tela propria
- dark mode/light mode reais

---

## 11) Criterios gerais para o Codex

O Codex deve:

- respeitar a ordem oficial: **backend -> frontend -> integracao**
- modernizar o front com **Angular 20.3.6 e seus padroes atuais**
- manter o codigo simples de entender
- evitar abstracao excessiva cedo demais
- priorizar nomenclatura clara e estrutura legivel
- reaproveitar o legado apenas onde faz sentido
- usar a `hans-ui-design-lib` como base visual, sem forcar tudo para dentro dela
- separar o que e componente de lib do que e especifico do portfolio
- estruturar o backend como vitrine real de **Node.js + NestJS + Prisma corporativos**
- testar tudo o que tiver comportamento relevante
- exigir 100% de coverage no alvo mensuravel de cada etapa

---

## 12) Entregaveis finais esperados

### Backend

- API NestJS/TypeScript documentada
- banco PostgreSQL modelado
- Prisma com migrations
- seed inicial real
- auth admin
- CRUDs completos
- Swagger
- README completo

### Frontend

- portfolio remake completo em Angular 20.3.6
- layout moderno
- temas claro/escuro
- traducao multilingue preparada
- dashboard analitico proprio
- admin visual
- consumo da design lib via CDN

### Integracao

- frontend publico consumindo GETs publicos
- frontend admin consumindo CRUDs protegidos
- fluxo de manutencao real do portfolio sem depender de JSON hardcoded

---

## 13) Resumo executivo

### Ordem oficial

1. Backend completo
2. Frontend completo
3. Integracao

### Decisoes firmadas

- Angular **20.3.6** com abordagem moderna
- Front com `core`, `layout` e `pages`
- Backend em **NestJS + Express + TypeScript + Prisma + PostgreSQL/Neon**
- Swagger obrigatorio
- README completo da API obrigatorio
- `highlight` como boolean nas entidades
- `link` e `image` como entidades proprias
- `language`, `customer` e `job` incluidos
- `React` explicitamente tratado como **core stack**
- dashboard em tela propria
- dark mode/light mode reais
- reuse do `hans-portfolio-api` com reimplementacao total do backend

### Referencias que fundamentam a troca de stack

- Node 24 Active LTS: `https://nodejs.org/en/about/releases/`
- Nest usa Express por padrao: `https://docs.nestjs.com/`
- Nest possui recipe oficial para Prisma: `https://docs.nestjs.com/recipes/prisma`
- Prisma como sinal forte de adocao: `https://www.npmjs.com/package/prisma`

---

## 14) Proximo passo recomendado para execucao pelo Codex

Comecar pela **Sprint B1 - Foundation do backend**, ja fazendo:

- limpeza do `hans-portfolio-api`
- inicializacao do NestJS do zero
- configuracao de Prisma + PostgreSQL
- Swagger
- health check
- `GET /system`
- `GET /system/ping`
- `GET /system/database`
- `GET /system/health`
- alias `GET /`
- alias `GET /health`
- README inicial em ingles
- testes e2e iniciais

Depois seguir linearmente B2 -> B7, so entao iniciar a etapa do frontend.
