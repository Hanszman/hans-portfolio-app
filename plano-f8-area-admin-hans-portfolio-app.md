# Plano Especifico - F8 Area Admin do hans-portfolio-app

> Objetivo: detalhar a etapa final do remake, implementando a area administrativa autenticada do `hans-portfolio-app` sobre os endpoints protegidos ja existentes no `hans-portfolio-api`.

## 1) Escopo oficial da F8

A F8 fecha o remake com uma interface administrativa real para cadastro, edicao e remocao de conteudo do portfolio.

Essa etapa nao faz parte da navegacao publica. Ela deve:

- ficar oculta do menu publico
- ser acessada apenas por URL
- autenticar com o usuario admin ja existente no banco
- proteger todas as rotas administrativas com guard
- consumir somente os endpoints protegidos oficiais da API
- reutilizar componentes da `hans-ui-design-lib` para botoes, modais, formularios, seletores, toggles, tabelas, loading e feedback visual

## 2) Premissas firmadas

- a API ja possui `POST /auth/login`
- a API ja possui `GET /admin/session`
- a API ja possui `POST`, `PUT` e `DELETE` em `/admin/<resource>` para:
  - `projects`
  - `experiences`
  - `technologies`
  - `technology-contexts`
  - `formations`
  - `spoken-languages`
  - `customers`
  - `jobs`
  - `links`
  - `image-assets`
  - `tags`
  - `portfolio-settings`
- somente `technology-contexts` possui CRUD dedicado como entidade relacional
- os demais relacionamentos sao editados nos payloads das entidades principais
- o portfolio publico ja foi finalizado na F7 e nao deve sofrer regressao estrutural ou visual nesta etapa

## 3) Rotas oficiais recomendadas

### Publicas

- `/login`

### Protegidas

- `/admin`
- `/admin/<entity-key>` quando fizermos a expansao por pagina dedicada ou filtros por entidade

### Regras

- `/login` nao entra na navegacao publica
- ao autenticar com sucesso, redirecionar para `/admin`
- ao tentar acessar `/admin` sem token valido, redirecionar para `/login`
- ao tentar acessar `/login` ja autenticado, redirecionar para `/admin`
- a wildcard publica do app continua apontando para `home`; rotas admin devem entrar antes dessa captura

## 4) Arquitetura frontend alvo

### 4.1. Infraestrutura HTTP de autenticacao admin

Criar um dominio dedicado em `src/app/core/api/admin-auth/` com:

- `admin-auth-api.service.ts`
- `admin-auth-api.types.ts`
- specs dos contratos e chamadas HTTP

Responsabilidades:

- encapsular `POST /auth/login`
- encapsular `GET /admin/session`
- tipar request e response do fluxo autenticado

### 4.2. Sessao administrativa

Criar um dominio dedicado em `src/app/core/admin-session/` com:

- `admin-session.service.ts`
- `admin-session.types.ts`
- `admin-session.guard.ts`
- `admin-session.interceptor.ts` se o fluxo com bearer token ficar mais limpo com interceptor
- helpers de persistencia e limpeza de sessao
- specs de cada arquivo relevante

Responsabilidades:

- login
- logout
- hydrate de sessao
- armazenamento de token
- chamada de `GET /admin/session` via `admin-auth-api`
- exposicao do estado global da sessao com signals

### 4.3. Pagina de login

Criar `src/app/pages/login/` com:

- `login.component.ts`
- `login.component.html`
- `login.component.scss`
- `login.component.spec.ts`
- `login.types.ts`
- `helpers/` se o formulario crescer

Responsabilidades:

- renderizar o formulario
- validar campos obrigatorios
- disparar o login
- renderizar loading e erro
- renderizar header e footer do app para manter alinhamento com a shell publica
- permitir submit por clique e pela tecla `Enter`
- oferecer alternancia de visibilidade da senha com `hans-input` + `hans-icon`
- redirecionar em caso de sucesso

### 4.4. Dominio admin

Criar `src/app/pages/admin/` com:

- pagina raiz do admin
- componentes locais para:
  - lista de entidades
  - card/list item de entidade
  - tabela de registros
  - barra de acoes
  - modal de formulario
  - modal de confirmacao de delete
  - blocos de filtros e estado vazio

Se uma composicao passar a ser reutilizada entre varias entidades administrativas, ela pode viver em `src/app/pages/admin/components/` ou `src/app/shared/` se o reaproveitamento sair do dominio admin.

## 5) Estrategia de sessao e seguranca

### 5.1. Contrato real da API

Login:

- request:
  - `email`
  - `password`
- response:
  - `accessToken`
  - `tokenType`
  - `expiresIn`
  - `user`

Sessao:

- `GET /admin/session`
- exige bearer token valido
- devolve o admin autenticado atual

### 5.2. Persistencia

Persistencia recomendada para a F8:

- `sessionStorage`

Motivo:

- reduz permanencia desnecessaria da sessao admin no navegador
- atende bem ao caso de um painel administrativo acessado por URL
- evita transformar a primeira versao do admin em uma sessao longa por padrao

### 5.3. Estado global recomendado

O service admin deve expor:

- `accessToken`
- `adminUser`
- `isAuthenticated`
- `isHydratingSession`
- `isSubmittingLogin`
- `sessionError`

### 5.4. Fluxos obrigatorios

Login:

1. usuario informa email e senha
2. frontend chama `POST /auth/login`
3. salva token em `sessionStorage`
4. chama ou reaproveita os dados do usuario retornados
5. marca sessao autenticada
6. redireciona para `/admin`

Hydrate:

1. app encontra token em `sessionStorage`
2. chama `GET /admin/session`
3. se valido, reconstroi sessao
4. se invalido, limpa tudo

Logout:

1. limpar token
2. limpar estado global
3. limpar caches administrativos locais
4. redirecionar para `/login`

## 6) UI/UX oficial da F8

### 6.1. Principios visuais

- seguir o padrao visual atual do projeto
- nao criar nova paleta
- usar somente tokens/variaveis do tema atual
- manter a leitura mais operacional e enxuta do que nas paginas publicas
- preservar responsividade desktop e mobile

### 6.2. Componentes da hans-ui-design-lib a priorizar

- `hans-button`
- `hans-input`
- `hans-dropdown`
- `hans-select-option`
- `hans-toggle`
- `hans-date-picker`
- `hans-modal`
- `hans-table`
- `hans-loading`
- `hans-toast`
- `hans-icon`
- `hans-tag` quando um resumo visual de enum/status fizer sentido

### 6.3. Padrao de tela por entidade

Cada entidade deve ter, no minimo:

- cabecalho com nome da entidade
- acao primaria de create
- listagem/tabulacao dos registros
- acoes por linha para update e delete
- modal de create
- modal de update
- modal de delete com confirmacao
- loading, empty e erro

### 6.4. Padrao de feedback

- loading de submissao no botao
- loading de listagem com `hans-loading`
- toast de sucesso apos create/update/delete
- toast ou mensagem de erro legivel em falhas da API

## 7) Matriz de entidades e formularios

### 7.1. `portfolio-settings`

- endpoint: `/admin/portfolio-settings`
- campos:
  - `key`
  - `value`
  - `description`
- observacao:
  - `value` e JSON
  - primeira versao recomendada: editor textual com validacao antes do submit

### 7.2. `tags`

- endpoint: `/admin/tags`
- campos:
  - `slug`
  - `namePt`
  - `nameEn`
  - `type`
  - `sortOrder`
- relacionamentos:
  - `projectIds`
  - `technologyIds`

### 7.3. `links`

- endpoint: `/admin/links`
- campos:
  - `url`
  - `labelPt`
  - `labelEn`
  - `descriptionPt`
  - `descriptionEn`
  - `type`
  - `sortOrder`
  - `isPublished`
- relacionamentos:
  - `projectIds`
  - `experienceIds`
  - `formationIds`
  - `technologyIds`

### 7.4. `image-assets`

- endpoint: `/admin/image-assets`
- campos:
  - `fileName`
  - `filePath`
  - `folder`
  - `kind`
  - `altPt`
  - `altEn`
  - `captionPt`
  - `captionEn`
  - `mimeType`
  - `width`
  - `height`
  - `sortOrder`
  - `isPublished`
- relacionamentos:
  - `projectIds`
  - `experienceIds`
  - `formationIds`
  - `technologyIds`
  - `spokenLanguageIds`
  - `customerIds`
  - `jobIds`

### 7.5. `spoken-languages`

- endpoint: `/admin/spoken-languages`
- campos:
  - `code`
  - `namePt`
  - `nameEn`
  - `proficiency`
  - `highlight`
  - `sortOrder`
- relacionamentos:
  - `imageAssetIds`

### 7.6. `customers`

- endpoint: `/admin/customers`
- campos:
  - `slug`
  - `name`
  - `summaryPt`
  - `summaryEn`
  - `highlight`
  - `sortOrder`
  - `isPublished`
- relacionamentos:
  - `experienceIds`
  - `imageAssetIds`

### 7.7. `jobs`

- endpoint: `/admin/jobs`
- campos:
  - `slug`
  - `namePt`
  - `nameEn`
  - `summaryPt`
  - `summaryEn`
  - `highlight`
  - `sortOrder`
  - `isPublished`
- relacionamentos:
  - `experienceIds`
  - `imageAssetIds`

### 7.8. `formations`

- endpoint: `/admin/formations`
- campos:
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
- relacionamentos:
  - `technologyRelations`
  - `linkIds`
  - `imageAssetIds`

### 7.9. `technologies`

- endpoint: `/admin/technologies`
- campos:
  - `slug`
  - `name`
  - `category`
  - `level`
  - `frequency`
  - `highlight`
  - `sortOrder`
  - `isPublished`
- relacionamentos:
  - `projectRelations`
  - `experienceRelations`
  - `formationRelations`
  - `technologyContexts`
  - `tagIds`
  - `linkIds`
  - `imageAssetIds`

### 7.10. `technology-contexts`

- endpoint: `/admin/technology-contexts`
- campos:
  - `technologyId`
  - `context`
  - `startedAt`
  - `endedAt`
- observacao:
  - unica entidade relacional com CRUD dedicado

### 7.11. `experiences`

- endpoint: `/admin/experiences`
- campos:
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
- relacionamentos:
  - `technologyRelations`
  - `projectIds`
  - `customerIds`
  - `jobIds`
  - `linkIds`
  - `imageAssetIds`

### 7.12. `projects`

- endpoint: `/admin/projects`
- campos:
  - `slug`
  - `titlePt`
  - `titleEn`
  - `shortDescriptionPt`
  - `shortDescriptionEn`
  - `fullDescriptionPt`
  - `fullDescriptionEn`
  - `context`
  - `status`
  - `environment`
  - `featured`
  - `highlight`
  - `startDate`
  - `endDate`
  - `sortOrder`
  - `isPublished`
- relacionamentos:
  - `technologyRelations`
  - `experienceIds`
  - `tagIds`
  - `linkIds`
  - `imageAssetIds`

## 8) Ordem oficial das subetapas

1. `F8.1` - Login
2. `F8.2` - Guard, sessao e shell admin
3. `F8.3` - Portfolio settings
4. `F8.4` - Tags
5. `F8.5` - Links
6. `F8.6` - Image assets
7. `F8.7` - Spoken languages
8. `F8.8` - Customers
9. `F8.9` - Jobs
10. `F8.10` - Formations
11. `F8.11` - Technologies
12. `F8.12` - Technology contexts
13. `F8.13` - Experiences
14. `F8.14` - Projects

## 8.1) Status atual da F8

- `F8.1` concluida em `2026-07-02`
- `F8.1` ajustada em `2026-07-03` para alinhar nomenclatura, UX e documentacao
- `F8.2` concluida em `2026-07-06`
- entregas concluidas na `F8.2`:
  - shell administrativa definitiva implementada em `/admin` com header, footer e logout preservando o tema atual
  - leitura operacional da sessao autenticada consolidada dentro da pagina admin
  - fatos de protecao documentados visualmente na shell: rota oculta, validacao via `GET /admin/session` e persistencia em `sessionStorage`
  - lista inicial de todas as entidades protegidas oficializadas na UI, com endpoint, subetapa da F8 e acoes `create`, `update` e `delete` visiveis
  - modelagem da shell organizada em `admin.types.ts` e helpers dedicados para manter SRP
  - traducoes sincronizadas para `en-us`, `pt-br` e `es-es`
  - cobertura de testes da shell administrativa e de seus helpers
- entregas concluidas na `F8.1`:
  - rota oculta `/login` implementada fora da navegacao publica
  - integracao real com `POST /auth/login`
  - dominio `src/app/core/api/admin-auth/` criado para contratos e chamadas HTTP de autenticacao
  - dominio `src/app/core/admin-session/` criado para sessao, token, guard e restauracao de autenticacao
  - persistencia de token em `sessionStorage`
  - redirecionamento de login bem-sucedido para `/admin`
  - pagina de login integrada ao header e footer do app
  - submit via tecla `Enter`
  - campo de senha com alternancia de visibilidade usando componentes da `hans-ui-design-lib`
  - pagina placeholder protegida em `/admin` ja criada como destino temporario da autenticacao
  - `SectionHeaderComponent` preparado para receber acoes projetadas, habilitando o logout no canto superior direito da tela admin
  - cobertura de testes para admin auth API, admin session, guards, rotas e pagina de login
- proxima subetapa oficial: `F8.3` - Portfolio settings

## 9) Regras de implementacao por subetapa

Para cada subetapa:

1. atualizar a documentacao relevante antes e depois da implementacao
2. ler pagina/service/helper/types do escopo antes de codar
3. validar se a `hans-ui-design-lib` ja cobre todos os controles necessarios
4. implementar a feature com Angular moderno
5. criar testes unitarios no mesmo momento
6. garantir coverage total do escopo relevante
7. rodar:
   - `npm run lint`
   - `npm run test:coverage -- --watch=false`
   - `npm run build`

## 10) Riscos conhecidos e alinhamentos obrigatorios

- `portfolio-settings.value` exige tratamento controlado por ser JSON arbitrario
- formularios relacionais grandes podem exigir componentes auxiliares locais para manter legibilidade
- `hans-date-picker` deve ser validado cedo no fluxo Angular/web components antes de espalhar seu uso pela F8
- se algum controle essencial nao estiver maduro na `hans-ui-design-lib`, alinhar antes de alterar a lib
- a F8 nao deve abrir refatoracoes paralelas nas paginas publicas

## 11) Criterios de aceite finais da F8

- admin login autenticando com a API real
- area admin protegida por guard
- lista de entidades administrativas disponivel na rota admin
- CRUDs funcionando para todas as entidades protegidas suportadas
- `technology-contexts` presente como entidade relacional dedicada
- relacionamentos restantes editaveis dentro dos formularios das entidades donas
- uso consistente da `hans-ui-design-lib`
- sem cores novas fora do sistema atual de tema
- sem regressao no portfolio publico
- testes, coverage, lint e build verdes em cada incremento concluido
