# Plano de Implementação — `hans-portfolio-app` + `hans-portfolio-api` (v3)

> Objetivo: guiar a execução do remake do portfólio antigo (`victor_hanszman_portfolio-old`) no repositório novo de front (`hans-portfolio-app`) e no repositório novo de back (`hans-portfolio-api`), usando **Angular 20.3.6** no front-end, **`hans-ui-design-lib` via CDN/web components** como base visual, e **backend próprio em .NET 10 / C# + PostgreSQL (Neon)** desde a primeira etapa.

OBS: As informações de conexão com o banco de dados estão no arquivo db-connection.txt.

> Ordem oficial de implementação:
>
> 1. **Backend completo + banco de dados + autenticação + CRUDs + admin API**
> 2. **Frontend completo (remake do portfólio atual)**
> 3. **Integração frontend ↔ backend**
>
> Este plano considera:
>
> - a estrutura e os JSONs do portfólio antigo;
> - o repositório novo em Angular;

- o repositório novo da API em .NET 10 (`hans-portfolio-api`);
  > - a `hans-ui-design-lib`, que já possui os componentes necessários (incluindo `Accordion` e `Carousel`) e será apenas consumida, sem novas implementações nesta fase;
  > - o currículo atualizado em PT-BR e EN;
  > - o posicionamento profissional também refletido no LinkedIn público;
  > - a direção de produto discutida: menos “catálogo bruto”, mais “vitrine estratégica”.

---

## 1) Direção estratégica do remake

O novo portfólio precisa comunicar com clareza que Victor é:

- **Engenheiro de Software Full Stack com forte especialização em Front-End**;
- com **7+ anos de experiência** em aplicações web corporativas de grande porte;
- com foco principal em **Angular, TypeScript e React**;
- com experiência real em **Design Systems, Micro Front-End, modernização de legados, dashboards analíticos, Clean Code, SOLID, TDD e CI/CD**;
- e com repertório complementar em **Node, PHP, C#, .NET, REST APIs, bancos relacionais, Docker e Azure DevOps**.

O remake deve sair do modelo antigo de “lista extensa de tecnologias e cards” e evoluir para:

- **Home com impacto e posicionamento forte**;
- **Highlights realmente visíveis**;
- **Projetos apresentados como cases**;
- **Experiências narradas como carreira e impacto**;
- **Tela própria de dashboard analítico**;
- **Admin real com persistência e manutenção futura**.

---

## 1.1) Ajustes recentes já consolidados

### Design lib

- A `hans-ui-design-lib` já deve ser tratada neste plano como **pronta para consumo**, incluindo os componentes de **Accordion** e **Carousel**.
- Portanto, **não haverá novas tarefas de desenvolvimento dentro da lib** neste plano.
- O foco será apenas em:
  - inicialização correta via CDN/web components no Angular;
  - documentação de quais componentes da lib entram em cada tela;
  - criação apenas de componentes específicos do próprio portfólio, quando fizer sentido.

### Backend

- O repositório **`hans-portfolio-api` já existe** e deve ser o ponto de partida oficial da etapa 1.
- Ele foi criado em **.NET 10** e já contém a estrutura inicial padrão do template de Web API.
- Como parte das primeiras tasks, deve-se:
  - remover qualquer rota/controller/exemplo padrão herdado do template (ex.: `WeatherForecast` ou equivalente);
  - configurar Swagger/OpenAPI de forma definitiva;
  - estruturar a base do projeto para a API real do portfólio;
  - criar README completo da API;
  - registrar no README o histórico de comandos e pacotes usados durante a evolução do projeto.

## 2) Princípios técnicos obrigatórios

### 2.1. Front-end — Angular 20.3.6 modernizado

O projeto front deve assumir explicitamente **Angular 20.3.6** como base e usar as abordagens modernas do framework.

#### Padrões obrigatórios

- **Standalone Components** no lugar de arquitetura baseada em modules.
- **Signals** para gerenciamento de estado local e de fachada, usando:
  - `signal()`
  - `computed()`
  - `effect()`
  - `linkedSignal()` quando realmente fizer sentido
- **Nova sintaxe de template** com:
  - `@if`
  - `@else`
  - `@switch`
  - `@for`
  - `@defer`, quando fizer sentido para performance e lazy rendering
- **`input()` e `output()`** modernos, evitando decorators antigos quando a nova abordagem for aplicável.
- **`inject()`** para consumo de dependências, evitando constructor injection quando a leitura ficar melhor dessa forma.
- **Roteamento standalone com lazy loading** por página/feature.
- **Services e facades enxutos**, focados em SRP.
- **Estado local por feature**, evitando centralização prematura.
- **RxJS apenas onde ele realmente agrega valor**; não usar Observable para tudo se Signals resolver melhor.

#### O que evitar

- `NgModule` como base da arquitetura.
- `*ngIf` e `*ngFor` em novas telas, salvo compatibilidade pontual e justificada.
- Stores complexas cedo demais para um portfólio.
- Abstração demais antes da integração real com a API.

### 2.2. Backend — .NET 10 simples de entender, mas robusto

O backend deve ser construído de forma **didática**, já que o projeto também servirá como estudo/aprofundamento em C#/.NET, mas sem perder robustez arquitetural. O ponto de partida oficial será o repositório **`hans-portfolio-api`**, já iniciado em **.NET 10**.

#### Direção recomendada

- **ASP.NET Core Web API em .NET 10**
- **Controllers-based API** em vez de começar com Minimal API, para deixar a estrutura mais previsível e mais próxima de APIs enterprise tradicionais.
- **Entity Framework Core** como ORM principal.
- **PostgreSQL (Neon DB)** como banco.
- **Swagger / OpenAPI** desde o início, com link local documentado no README.
- **Autenticação e autorização** para a área administrativa.
- **Migrations** versionadas.
- **Seed inicial** baseado nos JSONs do portfólio antigo.
- **Estrutura simples e legível**, com nomes claros e poucas mágicas.
- **README didático** explicando comandos, estrutura, scripts, execução HTTP/HTTPS, testes, coverage, build e atualização de dependências.

### 2.3. Qualidade e consistência

Tanto no front quanto no back:

- Clean Code
- DRY
- SRP
- SOLID onde fizer sentido
- nomes claros
- responsabilidade bem separada
- testes unitários nos pontos críticos
- lint/build/test verdes
- documentação clara
- README completo
- objetivo de **100% de test coverage** no front e no back
- no front, **lint obrigatório** em todo fluxo
- em ambos, **build obrigatório** e sem warnings críticos

#### Convenção de arquivos correlatos

Seguir a filosofia da `hans-ui-design-lib`: cada unidade relevante deve ter sua estrutura correlata **quando fizer sentido**, sem criar arquivos vazios só para cumprir tabela.

##### Front-end

Para componentes, facades, services e helpers relevantes, prever arquivos como:

- `component.ts`
- `component.html`
- `component.scss`
- `component.spec.ts`
- `component.types.ts`
- `component.helpers.ts`

> `types` e `helpers` só devem existir quando realmente agregarem legibilidade e separação de responsabilidade.

##### Back-end

No back, adaptar a mesma lógica à convenção de C#/.NET:

- entidade/model
- DTO/request/response
- service
- repository quando necessário
- validator quando necessário
- test correspondente
- helper/extensão quando necessário

> Aqui a analogia com a design lib é estrutural, não literal: em C# não faz sentido forçar arquivos `types` para tudo, porque os próprios DTOs, records, enums e contracts já cumprem esse papel.

---

## 3) Ordem de execução oficial

### Etapa 1 — Backend completo

Implementar primeiro:

- API .NET/C# no repositório `hans-portfolio-api`
- remoção das rotas/exemplos padrão do template (`WeatherForecast` ou equivalente)
- banco PostgreSQL no Neon
- modelagem de entidades e relacionamentos
- migrations
- seed inicial
- autenticação/login admin
- autorização
- CRUDs completos
- documentação Swagger/OpenAPI
- README da API
- scripts e histórico de setup
- cobertura de testes e pipeline básica de qualidade

### Etapa 2 — Frontend completo

Implementar depois:

- remake completo do portfólio em Angular 20.3.6
- usando temporariamente mocks/contratos tipados compatíveis com a API
- integração visual com a `hans-ui-design-lib`
- dark mode/light mode
- tradução
- novas páginas e layout

### Etapa 3 — Integração

Por fim:

- conectar frontend ao backend
- substituir fontes locais/mockadas pela API
- validar autenticação do admin
- validar fluxos de upload/linkagem/listagem/edição
- ajustes finais de UX, loading, erro e cache

---

## 4) Dados e conteúdo que o sistema precisa suportar

O sistema precisa suportar, no mínimo, os conteúdos abaixo:

- projetos
- experiências
- skills/technologies
- formações
- idiomas
- customers
- jobs
- links
- imagens/assets
- tags/categorias
- configurações do portfólio
- destaques (`highlight`) nas entidades relevantes

Além disso, precisa refletir de forma estratégica os highlights já confirmados:

- Angular e TypeScript como stack principal do remake do portfólio
- React como **core stack do Victor enquanto repertório técnico e projetos pessoais**, não como framework deste portfólio
- Design System próprio
- Micro Front-End
- modernização de legado Angular/Razor/C#
- dashboards analíticos
- validações complexas e i18n
- CI/CD, Docker e Azure DevOps
- experiência com clientes enterprise
- projetos pessoais relevantes e futuros highlights

---

## 5) Modelagem conceitual alvo do backend

## 5.1. Entidades principais

### `User`

Responsável pelo acesso administrativo.

Campos sugeridos:

- `id`
- `name`
- `email`
- `passwordHash`
- `role`
- `isActive`
- `createdAt`
- `updatedAt`

### `Project`

Campos sugeridos:

- `id`
- `slug`
- `titlePt`
- `titleEn`
- `shortDescriptionPt`
- `shortDescriptionEn`
- `fullDescriptionPt`
- `fullDescriptionEn`
- `context` (professional / personal / academic / study)
- `status` (completed / in-progress / archived / planned)
- `environment` (frontend / backend / fullstack / mobile / library / dashboard)
- `repositoryUrl`
- `deployUrl`
- `docsUrl`
- `npmUrl`
- `featured`
- `highlight`
- `startDate`
- `endDate`
- `sortOrder`
- `isPublished`
- `createdAt`
- `updatedAt`

### `Experience`

Campos sugeridos:

- `id`
- `slug`
- `companyName`
- `titlePt`
- `titleEn`
- `summaryPt`
- `summaryEn`
- `descriptionPt`
- `descriptionEn`
- `startDate`
- `endDate`
- `isCurrent`
- `highlight`
- `sortOrder`
- `isPublished`
- `createdAt`
- `updatedAt`

### `Technology`

Campos sugeridos:

- `id`
- `slug`
- `name`
- `category`
- `icon`
- `officialUrl`
- `highlight`
- `sortOrder`
- `isPublished`
- `createdAt`
- `updatedAt`

#### Classificações da tecnologia

Como alinhado, cada tecnologia deve suportar **3 eixos independentes**:

1. **Nível**
   - básico
   - intermediário
   - avançado

2. **Frequência de uso**
   - frequente
   - ocasional
   - já-utilizei
   - estudando

3. **Contexto de uso**
   - profissional
   - pessoal
   - acadêmico
   - estudo

Esses eixos podem ser armazenados:

- como colunas na relação entre tecnologia e entidade relacionada;
- ou em tabelas associativas com metadados.

### `Formation`

Campos sugeridos:

- `id`
- `slug`
- `institution`
- `titlePt`
- `titleEn`
- `degreeType`
- `summaryPt`
- `summaryEn`
- `startDate`
- `endDate`
- `highlight`
- `sortOrder`
- `isPublished`
- `createdAt`
- `updatedAt`

### `SpokenLanguage`

Idiomas falados pelo Victor, não confundir com idiomas de tradução da UI.

Campos sugeridos:

- `id`
- `code`
- `namePt`
- `nameEn`
- `proficiency`
- `highlight`
- `sortOrder`

### `Customer`

Campos sugeridos:

- `id`
- `slug`
- `name`
- `summaryPt`
- `summaryEn`
- `highlight`
- `sortOrder`
- `isPublished`

### `Job`

Campos sugeridos:

- `id`
- `slug`
- `namePt`
- `nameEn`
- `summaryPt`
- `summaryEn`
- `highlight`
- `sortOrder`
- `isPublished`

### `Link`

Como você pediu, links devem ser entidade própria.

Campos sugeridos:

- `id`
- `url`
- `labelPt`
- `labelEn`
- `descriptionPt`
- `descriptionEn`
- `type` (github / deploy / npm / docs / linkedin / website / article / figma / other)
- `targetType`
- `targetId`
- `sortOrder`
- `isPublished`
- `createdAt`
- `updatedAt`

> Observação: você mencionou possibilidade de relação N:N com múltiplas entidades. Há duas abordagens:
>
> - **Polimórfica simples (`targetType` + `targetId`)** → mais prática
> - **Tabelas de junção específicas** (`ProjectLink`, `ExperienceLink`, etc.) → mais relacional e rígida
>
> Para esse cenário, a recomendação é **tabelas de junção específicas**, porque o domínio é mais claro e mais amigável para manutenção futura.

### `ImageAsset`

Também como entidade própria.

Campos sugeridos:

- `id`
- `fileName`
- `filePath`
- `altPt`
- `altEn`
- `captionPt`
- `captionEn`
- `mimeType`
- `width`
- `height`
- `sortOrder`
- `isPublished`
- `createdAt`
- `updatedAt`

### `Tag`

Campos sugeridos:

- `id`
- `slug`
- `namePt`
- `nameEn`
- `type`
- `sortOrder`

### `PortfolioSetting`

Campos sugeridos:

- `id`
- `key`
- `value`
- `description`

## 5.2. Relacionamentos esperados

### Relações principais

- `Project` N:N `Technology`
- `Experience` N:N `Technology`
- `Formation` N:N `Technology`
- `Project` N:N `Experience`
- `Experience` N:N `Customer`
- `Experience` N:N `Job`
- `Project` N:N `Tag`
- `Technology` N:N `Tag`
- `Project` 1:N ou N:N `Link`
- `Experience` 1:N ou N:N `Link`
- `Formation` 1:N ou N:N `Link`
- `Project` 1:N ou N:N `ImageAsset`
- `Experience` 1:N ou N:N `ImageAsset`
- `Formation` 1:N ou N:N `ImageAsset`

### Destaque (`highlight`)

`highlight` **não** deve ser tabela própria.
Deve ser um **campo booleano** nas entidades relevantes, como alinhado.

---

## 6) Banco de dados

## 6.1. Banco escolhido

- **PostgreSQL**
- provider hospedado inicialmente no **Neon DB**

## 6.2. ORM escolhido

- **Entity Framework Core**

### Motivos

- padrão de mercado no ecossistema .NET
- excelente integração com ASP.NET Core
- migrations consolidadas
- curva de aprendizado razoável
- documentação abundante
- encaixa bem no objetivo de vitrine corporativa com C#/.NET

## 6.3. Estratégia de migrations e seed

Criar:

- migrations versionadas
- seed inicial dos dados baseados nos JSONs antigos
- scripts de ambiente para:
  - criar banco
  - aplicar migrations
  - popular seed
  - resetar base local

### Observação importante

Mesmo usando EF Core, vale manter:

- documentação do schema
- diagrama ER simplificado no README ou em `/docs`
- scripts SQL auxiliares para inspeção/manual troubleshooting

---

## 7) Arquitetura sugerida do backend

## 7.1. Stack base

- .NET SDK estável atual
- ASP.NET Core Web API
- Entity Framework Core
- PostgreSQL provider
- Swagger/OpenAPI
- autenticação com JWT ou cookie auth para admin
- políticas de autorização por role

## 7.2. Estrutura de pastas sugerida

```txt
backend/
  src/
    HansPortfolio.Api/
      Controllers/
      Contracts/
        Requests/
        Responses/
      Extensions/
      Middlewares/
      Program.cs
      appsettings.json
      appsettings.Development.json

    HansPortfolio.Application/
      Interfaces/
      Services/
      DTOs/
      Mappings/
      Validators/

    HansPortfolio.Domain/
      Entities/
      Enums/
      ValueObjects/
      Constants/

    HansPortfolio.Infrastructure/
      Data/
        Context/
        Configurations/
        Migrations/
        Seeds/
      Repositories/
      Auth/
      Storage/
      Services/

  tests/
    HansPortfolio.UnitTests/
    HansPortfolio.IntegrationTests/

  docs/
    api/
    database/

  scripts/
    db/
    setup/
```

### Explicação simples das camadas

- **Api** → onde moram controllers, configuração HTTP e Swagger
- **Application** → casos de uso, regras de aplicação, DTOs e validações
- **Domain** → entidades e regras centrais de negócio
- **Infrastructure** → banco, EF Core, autenticação, storage e implementações concretas

> Essa separação é boa sem virar arquitetura astronauta.

## 7.3. Padrão de endpoints

### Públicos

Endpoints GET sem autenticação para consumo do portfólio.

Exemplos:

- `GET /api/projects`
- `GET /api/projects/{slug}`
- `GET /api/experiences`
- `GET /api/skills`
- `GET /api/formations`
- `GET /api/languages`
- `GET /api/dashboard`
- `GET /api/settings/public`

### Administrativos

Endpoints protegidos para CRUD.

Exemplos:

- `POST /api/auth/login`
- `GET /api/admin/projects`
- `POST /api/admin/projects`
- `PUT /api/admin/projects/{id}`
- `DELETE /api/admin/projects/{id}`
- CRUD equivalente para experiências, tecnologias, formações, jobs, customers, idiomas, links e imagens

## 7.4. Documentação da API

Obrigatório incluir:

- Swagger/OpenAPI funcionando
- descrição dos endpoints
- exemplos de request/response
- status codes
- autenticação descrita
- coleções de teste (opcionalmente Insomnia/Postman)

---

## 8) README do backend

O backend deve ter um README tão caprichado quanto os seus outros projetos novos.

## 8.1. O README precisa conter

- visão geral do projeto
- stack usada
- arquitetura de pastas explicada
- pré-requisitos
- como clonar
- como configurar `.env` / `appsettings`
- como rodar localmente em **HTTP e HTTPS**
- como rodar migrations
- como popular a base
- como acessar Swagger
- como rodar testes
- como gerar coverage
- como fazer build
- como atualizar/restaurar pacotes
- lista de comandos importantes
- histórico dos comandos/scripts usados para criação do projeto
- dúvidas comuns de setup
- observações para quem está começando em .NET

### Comandos mínimos que devem aparecer documentados

- `dotnet restore`
- `dotnet build`
- `dotnet run`
- `dotnet watch run`
- `dotnet test`
- comando de coverage adotado no projeto
- `dotnet list package --outdated`
- comandos de migration do EF Core

### Swagger

Documentar explicitamente no README a URL local da documentação interativa, por exemplo:

- `https://localhost:xxxx/swagger`
- e, se existir, a variação HTTP correspondente

## 8.2. Histórico de setup

O plano deve prever uma seção no README com algo tipo:

- comando usado para criar solution
- comando usado para criar projeto API
- comando usado para criar projetos de camada
- pacotes NuGet instalados
- comando para adicionar migrations
- comando para aplicar banco
- comando para rodar a aplicação
- comando para build
- comando para testes
- comando para coverage
- comando para checar pacotes desatualizados

> Sim: em .NET existe um fluxo parecido com instalação de dependências, só que com **NuGet** em vez de npm.

---

## 9) Etapa 1 — Plano detalhado do backend

## 9.1. Sprint B1 — Foundation

### Objetivo

Subir a base do backend com a arquitetura mínima, Swagger e banco conectado.

### Entregas

- aproveitamento da solution/projeto já existente em `hans-portfolio-api`
- remoção das rotas/exemplos padrão do template (`WeatherForecast` ou equivalente)
- criação/organização dos projetos `Api`, `Application`, `Domain`, `Infrastructure`, se necessário
- configuração de referência entre projetos
- configuração do PostgreSQL (Neon/local)
- instalação do EF Core
- configuração do DbContext
- configuração do Swagger/OpenAPI
- health check inicial
- README inicial da API
- documentação dos comandos de execução HTTP/HTTPS

### Critérios de aceite

- API sobe localmente
- Swagger abre
- conexão com banco configurada
- solução roda sem warnings críticos

## 9.2. Sprint B2 — Modelagem e migrations

### Objetivo

Criar entidades, configurações e primeira migration.

### Entregas

- entidades principais
- enums
- tabelas de junção N:N necessárias
- configurações EF Core por entidade
- migration inicial
- documentação simplificada do schema

### Critérios de aceite

- banco sobe com schema completo inicial
- relações principais criadas
- nomes de tabelas/colunas padronizados

## 9.3. Sprint B3 — Seed dos dados legados

### Objetivo

Popular banco com base nos JSONs do projeto antigo.

### Entregas

- parser/mapper dos JSONs antigos
- seed inicial
- carga de dados para projetos, experiências, tecnologias e vínculos
- import de ícones e imagens reutilizadas do projeto antigo, quando aplicável

### Critérios de aceite

- ambiente local sobe já com conteúdo real
- dados do legado são reproduzidos com consistência

## 9.4. Sprint B4 — Autenticação e autorização

### Objetivo

Criar acesso administrativo seguro.

### Entregas

- login admin
- criação do primeiro usuário admin
- hash de senha
- autenticação
- autorização por role
- proteção de rotas administrativas

### Critérios de aceite

- endpoints admin exigem autenticação
- endpoints públicos continuam livres

## 9.5. Sprint B5 — CRUDs administrativos

### Objetivo

Criar CRUD completo de todas as entidades relevantes.

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

### Critérios de aceite

- todos os CRUDs principais funcionam via Swagger
- requests validadas
- responses consistentes
- mensagens de erro claras

## 9.6. Sprint B6 — Dashboard e endpoints agregados

### Objetivo

Criar endpoints derivados/analíticos para o dashboard do front.

### Entregas

- endpoint de distribuição por stack
- endpoint de projetos por contexto
- endpoint de tecnologias por frequência/contexto/nível
- endpoint de timeline profissional
- endpoint de highlights

### Critérios de aceite

- front consegue consumir dados analíticos sem cálculo pesado client-side

## 9.7. Sprint B7 — Testes, docs e acabamento

### Objetivo

Fechar a API redonda.

### Entregas

- testes unitários críticos
- testes de integração básicos
- Swagger refinado
- README final
- scripts de setup e banco
- revisão de nomenclatura e estrutura

### Critérios de aceite

- documentação boa o suficiente para você mesmo retomar o projeto meses depois sem sofrer

---

## 10) Front-end — arquitetura revisada e alinhada ao que você pediu

Você levantou um ponto bom: a estrutura anterior estava abstrata demais. Vamos simplificar e aproximar mais do modelo do portfólio antigo, deixando claro o papel de cada pasta.

## 10.1. Pastas-pai dentro de `src/app`

A estrutura base deve ter **três grandes pastas**:

- `core`
- `layout`
- `pages`

Além disso, ficam os arquivos raiz:

- `app.component.*`
- `app.routes.ts`
- eventualmente uma pasta `routes/` se o volume crescer

## 10.2. Estrutura sugerida do front

```txt
src/
  app/
    core/
      constants/
      enums/
      helpers/
      interfaces/
      models/
      services/
      guards/
      interceptors/
      facades/
      directives/
      pipes/
      translation/
        config/
        locales/
        loaders/
        types/
      theme/
        tokens/
        combinations/
        services/
      shared/
        components/
        directives/
        pipes/
        types/

    layout/
      components/
        page-header/
        page-footer/
        side-menu/
        mobile-menu/
        page-container/
        section-container/
      shells/
        public-shell/
        admin-shell/

    pages/
      home/
      projects/
        project-list/
        project-details/
      experiences/
      skills/
      dashboard/
      about/
      contact/
      admin/
        login/
        dashboard/
        projects/
        experiences/
        technologies/
        formations/
        languages/
        customers/
        jobs/
        tags/
        assets/
        settings/

    app.component.ts
    app.component.html
    app.component.scss
    app.routes.ts
```

## 10.3. Explicação da estrutura

### `core`

Tudo que é estrutural e compartilhável no nível da aplicação.

#### Inclui

- modelos
- interfaces
- enums
- services
- guards
- interceptors
- facades
- helpers
- translation
- theme
- shared

### `layout`

Tudo que estrutura visualmente a aplicação e é usado como moldura das páginas.

#### Inclui

- `page-header`
- `page-footer`
- `page-container`
- `section-container`
- `public-shell`
- `admin-shell`

### Explicando os nomes que ficaram confusos antes

- **`page-footer`** → sim, melhor manter o par com `page-header`
- **`page-container`** → container estrutural mais amplo da página
- **`section-container`** → wrapper/container de seções internas, usado para largura, espaçamento e ritmo visual
- **`shell`** → layout base que encaixa header/footer/menu/router-outlet; aqui faz sentido manter `public-shell` e `admin-shell`, porque é um termo bem comum para “casca estrutural” da aplicação

### `pages`

As páginas/rotas mesmo.

## 10.4. Ajustes que você pediu e foram incorporados

- `utils` foi removido
- fica apenas `helpers`
- `shared` fica dentro de `core`
- `i18n` foi renomeado para `translation`
- `translation` fica dentro de `core`
- estrutura mais próxima do portfólio antigo: **layout + pages** bem claros

---

## 11) Estratégia do front-end

## 11.1. Consumo da `hans-ui-design-lib`

A lib será usada via **CDN/web components** no Angular, como você já iniciou.

### Componentes previstos para uso forte no remake

- Button
- Card
- Input
- Textarea
- Select / Dropdown
- Modal
- Tabs
- Tag / Badge
- Tooltip
- Toggle / Switch
- Accordion
- Carousel
- eventualmente Table, se a lib já tiver

## 11.2. Sobre `Accordion` e `Carousel`

Como você informou, esses componentes **já foram desenvolvidos na `hans-ui-design-lib`**.

### Decisão atual do plano

- **não vamos desenvolver mais nada na lib nesta iniciativa**
- vamos apenas **consumir os componentes já existentes**
- qualquer ajuste fino de uso deve acontecer no remake, não como escopo de evolução da lib

### Onde devem ser usados

- **Accordion**
  - detalhes expansíveis de experiências
  - blocos “mais informações” em projetos
  - agrupamentos no admin
- **Carousel**
  - screenshots de projetos em destaque
  - galeria de imagens nos cases
  - vitrine visual de highlights na Home, se fizer sentido

## 11.3. Sobre `Empty State`

Você está certo: **não precisa ser necessariamente um componente da lib**.

Aqui ele deve ser tratado como:

- **padrão visual/estado de interface**
- reutilizado nas páginas e componentes do projeto

Exemplos:

- “nenhum projeto encontrado”
- “nenhuma tecnologia corresponde aos filtros”
- “dashboard sem dados”

Pode existir como composição no próprio projeto, usando Card/Illustration/Text/Button da lib.

## 11.4. Sobre grid system

Minha recomendação:

- **não extrair agora para a design lib**
- começar como **primitiva de layout local do projeto**

Motivo:

- grid/layout costuma variar muito de projeto para projeto
- melhor validar a necessidade real em 2 ou 3 projetos antes de promover isso para componente/primitiva da lib

No remake, resolver com:

- `page-container`
- `section-container`
- classes utilitárias bem definidas
- helpers/layout tokens locais

## 11.5. Sobre componente de seleção de idioma

Neste plano, o selector de idioma **não entra como escopo obrigatório de evolução da lib**.

### Direção adotada

- primeiro, implementar o seletor no próprio remake, com composição dos componentes já existentes da lib
- depois, avaliar extração para a `hans-ui-design-lib` somente se a necessidade se repetir de fato nos outros projetos

Ou seja:

- **agora:** componente local do projeto
- **futuro:** possível promoção para a lib, se provar reuso real

---

## 12) Funcionalidades principais do frontend

## 12.1. Páginas públicas

- `/` Home
- `/projects` lista de projetos
- `/projects/:slug` detalhe do projeto
- `/experiences`
- `/skills`
- `/dashboard`
- `/about`
- `/contact`
- `/not-found`

## 12.2. Páginas admin

- `/admin/login`
- `/admin`
- páginas de CRUD visual para as entidades principais

## 12.3. Home

A Home deve focar em:

- hero forte
- highlights
- resumo profissional
- core stack
- experiências em destaque
- CTA para projetos
- CTA para contato

## 12.4. Projects

- busca
- filtros
- grid e visão expandida
- cards com thumbnail, stack, links e contexto
- detalhes como case

## 12.5. Experiences

- timeline de carreira
- impacto por empresa
- customers e jobs relacionados
- tecnologias usadas

## 12.6. Skills

- core stack primeiro
- tecnologias complementares
- classificações por nível/frequência/contexto
- formações e idiomas

## 12.7. Dashboard

Você pediu uma tela realmente analítica — e faz sentido.

### Ideia

Ter uma página separada mostrando experiência com dashboards analíticos.

### Exemplos de gráficos

- tecnologias por categoria
- projetos por contexto
- experiências por período
- tecnologias por nível
- tecnologias por frequência
- projetos por stack
- distribuição profissional/pessoal/acadêmica

> Importante: essa tela deve existir, mas **fora da Home**, para não poluir a entrada principal.

---

## 13) Temas e modo escuro

## 13.1. Estratégia

O remake deve suportar:

- **light mode**
- **dark mode**

## 13.2. Implementação

- criar **duas combinações de tema** compatíveis com o sistema já existente na lib
- alternar entre elas por um toggle do projeto
- esse toggle pode usar o componente `toggle/switch` da lib por baixo dos panos
- persistir preferência do usuário localmente

## 13.3. Onde colocar essa lógica

- `core/theme/`
- service/facade para tema
- componentes específicos do remake em `layout` ou `core/shared/components`

---

## 14) Tradução

## 14.1. Idiomas iniciais

- `pt-BR`
- `en-US`

## 14.2. Idiomas futuros

- `es`
- `fr`

## 14.3. Diretriz

A pasta chama **`translation`**, não `i18n`, para evitar acoplamento de nomenclatura à lib usada.

## 14.4. Estratégia

- textos desacoplados da engine
- locale files organizados por domínio/página
- selector de idioma reaproveitável
- front preparado para expansão futura

---

## 15) Uso dos dados antigos na transição

Mesmo com backend vindo primeiro, os **JSONs do projeto antigo** continuam sendo fundamentais para:

- modelar entidades
- criar seed inicial
- validar estrutura de dados
- reaproveitar ícones/imagens/foto
- não perder conteúdo já mapeado

As imagens de tecnologias, foto pessoal e outros assets podem ser copiadas do projeto antigo como base inicial, como você pediu.

---

## 16) Core stack e classificação de tecnologias

Como você pediu, **React entra explicitamente como core stack**.

> Importante: isso se refere ao **repertório técnico do Victor e aos projetos pessoais**, não ao framework usado neste portfólio. O remake do portfólio continua sendo em **Angular 20.3.6**.

### Core stack sugerida

- Angular
- TypeScript
- JavaScript
- React
- HTML
- CSS / SCSS
- Tailwind
- Design Systems
- REST APIs
- Git

### Complementares / backend / qualidade / ferramentas

- Node
- Express
- PHP
- Laravel
- C#
- .NET
- PostgreSQL
- SQL Server
- MySQL
- Docker
- Azure DevOps
- CI/CD
- Jasmine
- Karma
- Vitest
- TDD
- SOLID
- Clean Code
- Micro Front-End

### Filtro/classificação no produto

Cada tecnologia deve poder ser filtrada por:

- categoria
- nível
- frequência
- contexto
- highlight

---

## 17) Etapa 2 — Plano detalhado do frontend

## 17.1. Sprint F1 — Foundation front

### Objetivo

Preparar arquitetura Angular 20.3.6, layout base e tema.

### Entregas

- revisão da estrutura de pastas
- shells público e admin
- page-header / page-footer
- page-container / section-container
- setup de translation
- setup de theme
- setup da lib via CDN/web components
- rotas base públicas e admin

### Critérios de aceite

- front sobe com layout base
- temas funcionam
- troca de idioma funciona em estrutura mínima

## 17.2. Sprint F2 — Home e highlights

### Entregas

- hero
- highlights
- resumo profissional
- core stack
- CTA final

## 17.3. Sprint F3 — Projects

### Entregas

- listagem
- filtros
- busca
- detalhe do projeto
- cards com links principais

## 17.4. Sprint F4 — Experiences + Skills + About + Contact

### Entregas

- timeline de experiências
- skills classificadas
- formações
- idiomas falados
- página about
- página contact

## 17.5. Sprint F5 — Dashboard

### Entregas

- tela analítica separada
- gráficos e KPIs visuais
- consumo preparado para endpoints agregados

## 17.6. Sprint F6 — Admin UI

### Entregas

- login admin front
- shell admin
- tabelas/formulários CRUD
- estados de loading, erro e sucesso

---

## 18) Etapa 3 — Integração

## 18.1. Sprint I1 — Contratos e adapters

- conectar clients HTTP
- mapear DTOs
- revisar contratos front/back

## 18.2. Sprint I2 — Consumo de dados reais

- substituir mocks/estruturas temporárias pela API
- conectar páginas públicas
- conectar admin

## 18.3. Sprint I3 — Refinamento

- loading states
- error states
- retry pontual
- paginação
- ordenação
- refinamento de UX

## 18.4. Sprint I4 — Fechamento

- revisão de responsividade
- revisão de acessibilidade
- revisão de SEO técnico básico
- revisão final de performance
- revisão final dos README(s)

---

## 19) Critérios gerais para o Codex

O Codex deve:

- respeitar a ordem oficial: **backend → frontend → integração**
- modernizar o front com **Angular 20.3.6 e seus padrões atuais**
- manter o código simples de entender
- evitar abstração excessiva cedo demais
- priorizar nomenclatura clara e estrutura legível
- reaproveitar o legado apenas onde faz sentido
- usar a `hans-ui-design-lib` como base visual, sem forçar tudo para dentro dela
- separar o que é componente de lib do que é específico do portfólio
- estruturar o backend como vitrine real de C#/.NET corporativo

---

## 20) Entregáveis finais esperados

Ao final do ciclo completo, o projeto deve entregar:

### Backend

- API .NET/C# documentada
- banco PostgreSQL modelado
- EF Core com migrations
- seed inicial real
- auth admin
- CRUDs completos
- Swagger
- README completo

### Frontend

- portfólio remake completo em Angular 20.3.6
- layout moderno
- temas claro/escuro
- tradução multilíngue preparada
- dashboard analítico próprio
- admin visual
- consumo da design lib via CDN

### Integração

- frontend público consumindo GETs públicos
- frontend admin consumindo CRUDs protegidos
- fluxo de manutenção real do portfólio sem depender de JSON hardcoded

---

## 21) Resumo executivo

### Ordem oficial

1. Backend completo
2. Frontend completo
3. Integração

### Decisões firmadas

- Angular **20.3.6** com abordagem moderna
- Front com `core`, `layout` e `pages`
- `translation` dentro de `core`
- `shared` dentro de `core`
- `helpers` no lugar de `utils`
- Backend em **ASP.NET Core Web API + EF Core + PostgreSQL/Neon**
- Swagger obrigatório
- README completo da API obrigatório
- `highlight` como boolean nas entidades
- `links` e `images` como entidades próprias
- `languages`, `customers` e `jobs` incluídos
- `React` explicitamente tratado como **core stack**
- dashboard em tela própria
- dark mode/light mode reais

---

## 22) Próximo passo recomendado para execução pelo Codex

Começar pela **Sprint B1 — Foundation do backend**, já criando:

- a solution .NET
- os projetos por camada
- PostgreSQL + EF Core
- Swagger
- health check
- README inicial
- estrutura simples e didática

Depois seguir linearmente B2 → B7, só então iniciar F1.
