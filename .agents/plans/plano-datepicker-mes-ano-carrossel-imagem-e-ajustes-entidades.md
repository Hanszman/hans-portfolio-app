# Plano — Correções e Features (hans-ui-design-lib, hans-portfolio-app, hans-portfolio-api)

## Contexto

Este plano cobre um conjunto de melhorias de UX na lib de componentes (`hans-ui-design-lib`) e uma
leva de ajustes de modelagem/CRUD no portfólio (`hans-portfolio-app` + `hans-portfolio-api`):
navegação de ano/mês no DatePicker, expansão de imagem no Carousel, supressão do modal de
"spoken languages", remoção do CRUD de `portfolio_settings` (mantendo a tabela para histórico),
simplificação de `ImageAsset`, ajustes de obrigatoriedade/relações em várias entidades, evolução do
`Project` (status "Abandonado", environment "Outro", rename summary/description) e reconstrução
completa dos enums de `Technology` (stack/tipo/nível/frequência) para sincronizar com os filtros da
tela de Skills.

Pontos já esclarecidos com o usuário:
- `TechnologyType.PROTOCOLS` é mantido como opção própria "Protocolos", posicionada logo após
  "Sintaxes de Marcação e Formatos" e antes de "Editores de código".
- Registros com `frequency = PREVIOUSLY_USED` → migram para `Raro`. Registros com
  `frequency = STUDYING` → migram para `level = Estudando` (novo valor de Nível) e recebem
  `frequency = Ocasional` como default.
- Typo corrigido: "Paradigmas de Programação" (não "Programção").
- Carousel: o clique para abrir em nova aba vale **apenas para o slide ativo/central**, e fica
  atrás de uma **prop opcional** (o app decide se habilita).
- `portfolio_settings`: como hoje nenhuma tela pública renderiza esses dados (confirmado na
  exploração), a tabela é mantida no banco, mas controllers, contracts, admin UI e o registro no
  `content-resource.config.ts` são removidos por completo (não só a parte de mutação).

Nenhuma etapa deste plano inclui `git commit`, `git push` ou publicação/release da lib — cada
repositório proíbe isso sem autorização explícita, e cada workstream deve ser revisado pelo usuário
antes de commit.

## Ordem de execução recomendada

1. **hans-ui-design-lib** primeiro (DatePicker + Carousel) — são pré-requisitos de UI que o app só
   poderá consumir depois de uma nova versão da lib ser publicada via CDN (`npm run release:*`,
   que exige autorização explícita do usuário antes de rodar). Até lá, o app continua na versão
   atual fixada no `index.html`.
2. **hans-portfolio-api** — mudanças de schema/migration/contracts (image assets, customers, jobs,
   formations/technologies/experiences links, projects, technologies enums, portfolio_settings,
   ordenação por highlight).
3. **hans-portfolio-app** — consumir os novos contratos da API, atualizar formulários/telas, sincronizar
   filtros de Skills, remover UI de portfolio_settings, suprimir modal de spoken languages, ajustar
   modal de projeto/experience.

A API deve ir na frente do app porque os DTOs/enums mudam; o app quebra se for atualizado primeiro
contra a API antiga. A lib pode ser feita em paralelo com a API (não depende dela).

---

## 1. hans-ui-design-lib — DatePicker: popups de mês/ano

**Padrão a seguir:** skill `create-design-lib-component`; arquitetura atual
`HansDateTimeInput` → `HansDateTimeCalendar` (puro, prop-driven, sem estado próprio).

**Novo subcomponente:** `src/components/Forms/DatePicker/DateTimeInput/DateTimeCalendar/MonthPicker/`
e `.../YearPicker/` (ou um único `MonthYearPicker/` com um `mode: 'month' | 'year'` — decidir durante
implementação qual fica mais DRY; provavelmente um único componente parametrizado, já que a
grade/paginação/botão-voltar são estruturalmente idênticos, só muda o que é listado).

Arquivos: `MonthYearPicker.tsx`, `.types.ts`, `.test.tsx`, `month-year-picker.scss`,
`helpers/MonthYearPicker.helper.ts` (+ `.helper.types.ts`, `.helper.test.ts`) com a lógica de:
paginação de anos (ex.: janelas de 12 anos, com "next/prev página"), lista de nomes de mês
localizados (reaproveitar locale já usado em `getDatePickerMonthLabel`), clamps de navegação.

**Mudanças em `DateTimeCalendar.tsx`:**
- Tornar `.hans-date-picker-calendar-title` (hoje `<strong>{monthLabel}</strong>`) clicável em duas
  partes (ou dois `<button>` adjacentes: um para o nome do mês, outro para o ano) — cada um abre o
  popup correspondente.
- Novo estado em `DateTimeInput.tsx` (mesmo nível de `isOpen`/`viewDate`): algo como
  `calendarView: 'days' | 'months' | 'years'`. Sem esse estado extra, a troca de "página" do popup
  vira condicional dentro do próprio popup do `HansPopup` já existente — **não é um popup novo
  sobreposto**, é uma substituição de conteúdo do popup atual, como o usuário pediu.
- Botão de "voltar" no header do MonthPicker/YearPicker retorna `calendarView` para `'days'`.
- Setas de paginação (mês: navega o ano da grade de meses; ano: navega a década/janela de anos) —
  seguem o mesmo padrão visual de `HansButton`/`HansIcon` (`IoIosArrowBack`/`IoIosArrowForward`)
  já usado em `DateTimeCalendar.tsx`.
- Selecionar um mês ou ano chama `setViewDate` com o novo mês/ano mantendo o dia em 1, e volta
  `calendarView` para `'days'` automaticamente.
- Continua impossível digitar livremente: nenhuma mudança em `allowInputTyping`/`readOnly`; os
  popups novos são 100% seleção por clique, igual ao calendário de dias atual.

**Testes/Storybook:** stories novas cobrindo abertura do MonthPicker, do YearPicker, navegação de
página, seleção, botão voltar, e integração end-to-end (abrir DatePicker → clicar ano → escolher
ano → volta pro calendário de dias com o mês certo). Cobertura 100% obrigatória (statements/branches/
functions/lines) nos helpers novos.

**Validação:** `npm run lint`, `npm run test:coverage`, `npm run build`, `npm run build:cdn`,
`npm run build:storybook` — só ao final, conforme AGENTS.md da lib.

---

## 2. hans-ui-design-lib — Carousel: abrir foto atual em nova aba

**Padrão a seguir:** mesma skill; componente é flat (`Carousel.tsx` + `helpers/Carousel.helper.ts`,
sem subpastas).

- Nova prop opcional em `Carousel.types.ts` (schema `HansCarouselSchema`): ex.
  `openImageOnClick?: boolean` (default `false`), documentada em `.mdx` e coberta em `.stories.tsx`.
- Novo helper `createHandleCarouselImageClick` em `Carousel.helper.ts`, seguindo o padrão de fábrica
  de handlers já usado (`createHandleCarouselSelect`/`createHandleCarouselMove`): recebe o item
  ativo e, se `openImageOnClick` estiver ligado e o slide for o ativo (`item.index ===
  resolvedActiveItemIndex`), chama `window.open(item.imageSrc, '_blank', 'noopener,noreferrer')`.
- Em `Carousel.tsx`, a `div` `role="img"` do slide ativo passa a ter, quando a prop está ligada:
  `role="button"`, `tabIndex={0}`, `onClick`, `onKeyDown` (Enter/Espaço), `aria-label` explicando a
  ação ("Abrir imagem em nova aba"), e uma classe nova (`hans-carousel-image-clickable`, cursor
  pointer) via `getCarouselImageClassName` (ajustar a assinatura do helper para receber o flag).
  Isso respeita a regra de HTML semântico + suporte a teclado do AGENTS.md, já que o elemento deixa
  de ser puramente decorativo.
- Slides não-ativos continuam sem interação de clique, mesmo quando visíveis (`visibleItemsCount > 1`).
- Se a prop for adicionada como evento/callback público (não é o caso aqui, pois a ação é interna —
  `window.open` — e não emite callback), não é necessário mexer em `src/index-wc.ts`; só é preciso
  adicionar `openImageOnClick` ao `PropsList` de `Carousel.types.ts` para o bridge de Web Component
  reconhecer o atributo booleano.

---

## 3. hans-portfolio-api — Technologies: reconstrução dos enums

**Padrão a seguir:** skill `create-api-contract` + convenção de migration já usada em
`20260817140000_normalize_technology_taxonomy_and_sort_order` (criar novo enum, backfill com
`UPDATE ... CASE`, guard `DO $$ ... RAISE EXCEPTION` antes de tornar `NOT NULL`, dropar enum antigo
por último).

### 3.1 `TechnologyStack` (schema.prisma)
Novo enum, nesta ordem: `FRONT_END, BACK_END, MOBILE, GAMES, DATABASES, TESTING, DEVOPS, CONCEPTS, OTHERS`.
Mapeamento de dados existentes: `FRONT_END→FRONT_END`, `BACK_END→BACK_END`, `MOBILE→MOBILE`,
`GAMES→GAMES`, `DATABASES→DATABASES` (renomeada de plural "Bancos de Dados" para singular "Banco de
Dados" só na label, o valor do enum pode continuar `DATABASES`), `OTHERS→OTHERS`. Sem órfãos.

### 3.2 `TechnologyType` (schema.prisma)
Novo enum, nesta ordem exata (29 + Protocolos = 30 valores):
`PROGRAMMING_LANGUAGES, WEB_LANGUAGES, LIBRARIES, FRAMEWORKS, RELATIONAL_DATABASES,
NON_RELATIONAL_DATABASES, DATABASES_MANAGEMENT_SYSTEMS, ORMS, PACKAGES, PACKAGE_MANAGERS,
VERSIONING_PLATFORMS, CLOUD_HOSTING_PLATFORMS, DEPLOYMENT_TOOLS, DEVELOPMENT_PLATFORMS,
RUNTIME_ENVIRONMENTS, TESTING_TOOLS, BUILD_TOOLS, DOCUMENTATION_TOOLS, PREPROCESSORS,
MARKUP_AND_FORMAT_SYNTAXES, PROTOCOLS, CODE_EDITORS, ARTIFICIAL_INTELLIGENCES, DESIGN_PATTERNS,
PROGRAMMING_PARADIGMS, ARCHITECTURES, PRINCIPLES, TECHNIQUES, METHODOLOGIES, OTHERS`.

Mapeamento: todos os valores antigos existem no novo enum com o mesmo nome, exceto
`OBJECT_NOTATIONS → MARKUP_AND_FORMAT_SYNTAXES` (rename semântico, dado migrado via `UPDATE`).
`PROTOCOLS` é mantido (conforme resposta do usuário), reposicionado logo após
`MARKUP_AND_FORMAT_SYNTAXES` e antes de `CODE_EDITORS`. Novos valores sem dado prévio: `ORMS`,
`RUNTIME_ENVIRONMENTS`, `TESTING_TOOLS`, `BUILD_TOOLS`, `DOCUMENTATION_TOOLS`, `PREPROCESSORS`,
`ARTIFICIAL_INTELLIGENCES`, `DESIGN_PATTERNS`, `PROGRAMMING_PARADIGMS`, `ARCHITECTURES`,
`PRINCIPLES` (não precisam de backfill, só existir no enum).

### 3.3 `TechnologyLevel`
Novo enum: `ADVANCED, INTERMEDIATE, BASIC, STUDYING` (ordem pedida: Avançado, Intermediário, Básico,
Estudando). Backfill: registros antigos mantêm seu valor (`BASIC/INTERMEDIATE/ADVANCED` inalterados);
registros com `frequency = STUDYING` recebem `level = STUDYING` (conforme decisão do usuário).

### 3.4 `TechnologyUsageFrequency`
Novo enum: `FREQUENT, OCCASIONAL, RARE` (ordem pedida: Frequente, Ocasional, Raro). Backfill:
`FREQUENT→FREQUENT`, `OCCASIONAL→OCCASIONAL`, `PREVIOUSLY_USED→RARE`, e os registros que tinham
`STUDYING` (já tratados no nível acima) recebem `frequency = OCCASIONAL` como default.

### 3.5 Migration
Uma migration `prisma/migrations/<timestamp>_rebuild_technology_taxonomy_enums/migration.sql`
seguindo o padrão de 2026-08-17: criar os 4 novos tipos de enum com sufixo temporário, adicionar
colunas novas, `UPDATE ... CASE` para backfill (incluindo as regras condicionais nível/frequência
acima), guard `DO $$` validando que nenhum registro ficou sem mapeamento, `NOT NULL` + índices,
dropar colunas/enums antigos, renomear colunas/enum novos para os nomes finais.

### 3.6 Backend — DTOs, config, seed
- `technologies.request.ts`: `@IsEnum` continua igual, só aponta pros novos enums do
  `@prisma/client` (regenerado após `prisma migrate`).
- `content-resource.config.ts`: `sortableFields`/`filterDefinitions` de `technologies` não mudam de
  estrutura, só os valores aceitos mudam (dado pelo enum).
- `prisma/normalize-seed-snapshot.ts` e `prisma/data/portfolio-seed.snapshot.json`: atualizar
  mapeamento de slugs para os novos valores de enum (principalmente o antigo `'object-notations'`
  → `MARKUP_AND_FORMAT_SYNTAXES`).
- `docs/database/initial-schema.md` / `docs/database/seed-snapshot.md`: atualizar conforme regra do
  AGENTS.md de manter docs de schema sincronizadas.

---

## 4. hans-portfolio-api — demais mudanças de schema/CRUD

### 4.1 `ImageAsset` — simplificação
- Remover colunas/campos: `folder`, `captionPt`, `captionEn`, `captionEs`, `mimeType`.
  - `filePath` é mantido como caminho completo (já inclui o nome do arquivo) — sem mudança de
    formato, só removendo a coluna redundante `folder`.
  - `mimeType` é removido (decisão: extensão já está em `fileName`/`filePath`, campo redundante,
    sem uso funcional encontrado além de exibição no admin — YAGNI).
  - `caption*` removido (sem uso público encontrado na exploração; confirmar com uma busca rápida
    antes de remover, por segurança, que nada no app público lê `captionPt/En/Es`).
- Migration: `ALTER TABLE image_asset DROP COLUMN folder, DROP COLUMN caption_pt, DROP COLUMN
  caption_en, DROP COLUMN caption_es, DROP COLUMN mime_type;`.
- Contracts (`image-assets` contracts em `hans-portfolio-api`) e `content-resource.config.ts`:
  remover os campos dos DTOs de create/update e dos `publicInclude`/`adminInclude` se referenciados.

### 4.2 `Customer` — summary opcional
- `summaryPt/En/Es` deixam de ser `String` obrigatório e passam a `String?` no schema.
- Migration: `ALTER TABLE customer ALTER COLUMN summary_pt DROP NOT NULL` (idem `summary_en`,
  `summary_es`).
- DTO `customers.request.ts`: trocar `@IsNotEmpty()` por `@IsOptional()` nos três campos.

### 4.3 `Job` — remover relação com `ImageAsset`
- Remover model `JobImageAsset` (join table) e a relação `imageAssets` em `Job`.
- Migration: `DROP TABLE job_image_asset;` (ou nome mapeado) + remover FK/índices associados.
- Contracts/admin: remover `imageAssetIds` de `jobs.request.ts` e do relation picker no
  `content-resource.config.ts`.
- Qualquer lugar que hoje mostra a imagem do job (procurar no app) passa a usar a imagem da
  `Experience` relacionada ao job (via `ExperienceJob` → `Experience.imageAssets`).

### 4.4 `Formation`, `Technology`, `Experience` — remover relação com `Link`
- Remover models de junção `FormationLink`, `TechnologyLink`, `ExperienceLink` e os relacionamentos
  `links` nessas três entidades (Project mantém `links`, não foi pedido remover lá).
- Migrations: drop das três join tables.
- Contracts/admin: remover `linkIds` dos DTOs e dos relation pickers dessas três entidades em
  `content-resource.config.ts`.

### 4.5 `Project` — status, environment, rename summary/description
- `ProjectStatus`: adicionar `ABANDONED` ("Abandonado") ao enum (migration aditiva simples,
  `ALTER TYPE "ProjectStatus" ADD VALUE 'ABANDONED'`).
- `ProjectEnvironment`: trocar `DASHBOARD` por `OTHER` ("Outro") — como isso remove um valor,
  segue o padrão completo (novo enum, backfill de registros `DASHBOARD→OTHER`, drop do antigo).
- Rename de campos: `shortDescriptionPt/En/Es` → `summaryPt/En/Es`, `fullDescriptionPt/En/Es` →
  `descriptionPt/En/Es` (alinhando nomenclatura com `Experience`). Migration usa
  `ALTER TABLE project RENAME COLUMN short_description_pt TO summary_pt` (idem para as outras 5
  colunas) — preserva dados, não precisa de backfill.
- Contracts: `projects.request.ts`/`projects.response.ts` renomeiam os campos correspondentes.
- `content-resource.config.ts`: ajustar `searchFields`/`sortableFields` se referenciarem os nomes
  antigos.

---

## 5. hans-portfolio-api — ordenação por highlight

Para cada entidade com `highlight` (`Project, Experience, Technology, Formation, SpokenLanguage,
Customer, Job`), ajustar `defaultOrderBy` em `content-resource.config.ts` para colocar `highlight`
primeiro (`desc`, já que destacados devem vir antes), mantendo a coluna secundária já definida:

- `projects`: `[{ highlight: 'desc' }, { sortOrder: 'asc' }, { slug: 'asc' }]`
- `experiences`: `[{ highlight: 'desc' }, { sortOrder: 'asc' }, { startDate: 'desc' }]`
- `technologies`: `[{ highlight: 'desc' }, { sortOrder: 'asc' }, { name: 'asc' }]`
- `formations`: `[{ highlight: 'desc' }, { sortOrder: 'asc' }, { startDate: 'desc' }]`
- `spokenLanguages`: `[{ highlight: 'desc' }, { sortOrder: 'asc' }, { code: 'asc' }]`
- `customers`: `[{ highlight: 'desc' }, { sortOrder: 'asc' }, { name: 'asc' }]`
- `jobs`: `[{ highlight: 'desc' }, { sortOrder: 'asc' }, { slug: 'asc' }]`

O agregado `dashboard.service.ts` (`GET /dashboard/highlights`) já filtra por `highlight: true`, então
não muda — a alteração relevante ali é só cosmética (já ordena por `highlight`/`featured` onde
existiam múltiplos critérios). `content-read.service.ts#buildPublicOrderBy` não muda de lógica, só
os arrays de `defaultOrderBy` da config.

---

## 6. hans-portfolio-api — remover CRUD de `portfolio_settings`

- Remover `PortfolioSettingsController`/`AdminPortfolioSettingsController`
  (`src/modules/content/controllers/portfolio-settings/`).
- Remover contracts (`src/modules/content/contracts/portfolio-settings/`).
- Remover a entrada `portfolioSettings` de `content-resource.config.ts` (registry, resource types).
- Remover a rota de `ApiRoutes.content.portfolioSettings` (e admin) de `src/routing/api-routes.ts`.
- **Manter** o model `PortfolioSetting` no `schema.prisma` e a tabela `portfolio_setting` no banco —
  nenhuma migration de remoção de tabela/coluna aqui, só remoção de código de aplicação.
- Atualizar `README.md` (seção de rotas) e docs relacionadas.

---

## 7. hans-portfolio-app — consumir mudanças da API

### 7.1 Technologies — sincronizar filtros da tela de Skills
- `src/app/pages/skills/skills.types.ts`: substituir `SkillStackFilterValue`,
  `SkillTypeFilterValue`, `SkillLevelFilterValue`, `SkillFrequencyFilterValue` (e os arrays
  `SKILL_*_FILTERS`) para espelhar exatamente os novos enums do backend, na ordem pedida, sempre com
  `ALL` ("Todos") como primeira opção.
- Remover os mapas de fallback legado (`LEGACY_TYPE_BY_SLUG`, etc.) que dependiam dos enums antigos,
  ou atualizá-los para os novos valores conforme necessário.
- `skills.helper.ts`: `resolveSkillLevelKey` (que hoje funde `STUDYING`/`RARE` de frequência em um
  nível sintético) deixa de ser necessário nesse formato, já que `STUDYING` agora é nativamente um
  `TechnologyLevel` — simplificar essa função.
- Formulário admin de Technologies (`technologies-operations.types.ts` / `.helper.ts` /
  `-operations-modal`): opções de `hans-select-option` para stack/type/level/frequency passam a usar
  os novos enums (sem incluir "Todos", que é exclusivo dos filtros públicos).
- Traduções: usar a skill `add-portfolio-translation-key` para adicionar/renomear as chaves de label
  de cada novo valor de enum nos três locales (en-us, pt-br, es-es), inclusive a renomeação de
  "Notações de objeto" → "Sintaxes de Marcação e Formatos".

### 7.2 Image assets — front
- Remover campos `folder`, `caption*`, `mimeType` de `image-assets.types.ts`,
  `image-assets-operations.types.ts`/`.helper.ts` e do template do modal de admin
  (`image-assets-operations-modal.component.html`).
- Conferir que nenhuma tela pública lê `captionPt/En/Es` antes de remover (grep rápido) — se houver
  uso público, avaliar antes de remover ou substituir pela `altPt/En/Es`.

### 7.3 Customers — summary opcional
- `customers-operations.types.ts`: `CUSTOMERS_OPERATIONS_FIELDS.summaryPt/En/Es` → `required: false`.
- `customers-operations.helper.ts` (`buildCustomersMutationPayload`): remover as checagens
  obrigatórias de `summaryPt/En/Es` (mantém envio do valor, só deixa de bloquear quando vazio).

### 7.4 Jobs — remover relação com image assets
- `jobs-operations.types.ts`/`.helper.ts`: remover `imageAssetIds`/`imageAssetLabels` e o
  `<app-operations-relation-picker>` de imagem no `jobs-operations-modal`.
- Onde a imagem do job é hoje exibida publicamente, trocar para usar a imagem da `Experience`
  relacionada (via a relação `Job → ExperienceJob → Experience.imageAssets`, já disponível na API).

### 7.5 Formations/Technologies/Experiences — remover relação com links
- Remover os campos/relation pickers de `linkIds` dos três formulários admin
  (`formations-operations.*`, `technologies-operations.*`, `experiences-operations.*`, incluindo a
  entrada `link` em `EXPERIENCE_RELATION_KEYS`).

### 7.6 Projects — status, environment, summary/description, modais
- `projects.types.ts`: `ProjectStatus`/`ProjectEnvironment` ganham os novos valores
  (`ABANDONED`/`OTHER`), `shortDescription*`→`summary*`, `fullDescription*`→`description*` (renomear
  em todo o front que hoje lê esses campos: `projects.helper.ts#mapProjectToCaseCard`,
  `project-modal.types.ts`, etc.).
- Admin form: `PROJECT_STATUS_VALUES` ganha `ABANDONED`; `PROJECT_ENVIRONMENT_VALUES` troca
  `DASHBOARD` por `OTHER`; traduções novas via `add-portfolio-translation-key`.
- **Card público** (`project-case-card.component.html`): continua mostrando só o resumo curto
  (`summary`, ex-`shortDescription`) — sem mudança de comportamento aqui, só de nome de campo.
- **Modal de detalhes do projeto** (`project-modal.component.html`): mostrar `description`
  (ex-`fullDescription`, com fallback pro `summary` se vazio, como já faz hoje) **e** as novas
  informações de `status`/`environment` (labels já existem no admin — replicar
  `statusLabel`/`environmentLabel`, hoje calculados mas não usados no card público, para uso no
  modal público).
- **Cards de projeto dentro de outros modais** (ex.: dentro do `experience-modal.component.html`):
  continuam mostrando o `summary` curto, não o `description` completo — já é o comportamento atual
  (`project.summary` no template do experience-modal), então não muda.
- Corrigir/registrar o rótulo de filtro `common.fields.environment` na tela de Projects, que hoje diz
  "environment" mas filtra por `context` (achado da exploração) — como não foi pedido
  explicitamente, deixar fora deste plano, mas eu deixaria anotado para o usuário decidir depois se
  quer corrigir separadamente (é um bug de nomenclatura pré-existente, não relacionado ao pedido).

### 7.7 Spoken languages — remover modal ao clicar
- `src/app/pages/skills/components/skill-card/skill-card.component.ts`/`.html`: quando
  `item().kind === 'language'`, o card não deve mais chamar `requestDetails()`/emitir `openDetails`
  (vira um card não clicável para esse kind, ou clicável sem efeito — melhor UX: remover o `<button>`
  wrapper e trocar por elemento não interativo apenas para `kind === 'language'`, preservando estilo
  visual).
- `skills.component.ts#openSkillDetails`: o branch de `language` deixa de existir (dead code após o
  card parar de emitir esse evento para esse kind) — remover junto com `mapSpokenLanguageToModal` se
  ficar sem uso, e o componente `app-spoken-language-modal` se não for usado em mais nenhum lugar
  (senão, manter o componente, só parar de acioná-lo a partir da tela de Skills).
- Confirmar que nenhum outro ponto do app abre esse modal antes de remover o componente por completo.

### 7.8 Portfolio settings — remover UI de admin
- Remover `src/app/pages/admin/components/portfolio-settings-operations/` (component, types,
  helper, modal) e a entrada correspondente em `admin.types.ts`/rota do menu admin (etapa `F8.3`).
- Remover `src/app/core/api/portfolio-settings/` (service + types), já que a API não expõe mais
  essas rotas.

### 7.9 DatePicker/Carousel — consumir a nova versão da lib
- Após a lib publicar a nova versão (release autorizado pelo usuário), atualizar a versão fixada em
  `src/index.html` (CDN `?v=`) para a nova versão, e, se a página de Projetos/Experiências usa
  `HansCarousel` para fotos, ligar a nova prop `openImageOnClick` onde fizer sentido (ex.: galerias
  de projeto/formação).

---

## Verificação end-to-end

- **Lib**: `npm run lint && npm run test:coverage && npm run build && npm run build:cdn && npm run
  build:storybook` dentro de `hans-ui-design-lib`; abrir Storybook local (`npm run storybook`) e
  testar manualmente o novo fluxo de mês/ano no DatePicker e o clique de imagem no Carousel.
- **API**: rodar `prisma migrate dev` localmente contra um banco de desenvolvimento/cópia, validar
  que o guard `DO $$` não aborta (sem registros órfãos), rodar a suite de testes do módulo `content`
  e `dashboard`, e verificar `docs/database/*.md` atualizados.
- **App**: rodar a suite Angular (`ng test`, cobertura 100%), subir o app localmente contra a API
  atualizada, e navegar manualmente por: Skills (filtros sincronizados, cards de idioma sem modal),
  Projects (card com summary, modal com description + status/environment, filtro "Abandonado"),
  Customers (summary vazio salva sem erro), Jobs/Formations/Technologies/Experiences (formulários
  sem os campos removidos), Dashboard (ordenação por highlight refletida onde aplicável).
- Cada repositório fica com as mudanças **não commitadas** ao final, para revisão do usuário antes
  de qualquer commit — nenhuma migration é aplicada em produção nem nenhum release da lib é
  publicado sem autorização explícita separada.

## Persistência do plano

Este arquivo é a fonte canônica do plano, salvo em
`hans-portfolio-app/.agents/plans/plano-datepicker-mes-ano-carrossel-imagem-e-ajustes-entidades.md`,
com o pointer mirror correspondente em
`hans-portfolio-app/.claude/plans/plano-datepicker-mes-ano-carrossel-imagem-e-ajustes-entidades.md`,
seguindo o padrão já usado nos outros planos desse repositório (edição só em `.agents/`, `.claude/`
é só um apontador de uma linha).
