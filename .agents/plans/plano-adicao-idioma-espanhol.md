# Plano de adição integral do idioma espanhol

## 1. Objetivo

Adicionar suporte completo a espanhol (`es-es`) aos dados persistidos, contratos HTTP, agregações do backend, formulários administrativos e páginas públicas do Hans Portfolio, preservando os dados atuais e a arquitetura já adotada nos repositórios:

- frontend: `hans-portfolio-app`;
- backend: `hans-portfolio-api`;
- banco: PostgreSQL/Neon gerenciado por Prisma;
- fonte versionada dos dados: `prisma/data/portfolio-seed.snapshot.json`.

O frontend já possui o locale `es-es` e catálogos de copy estática. O escopo principal desta entrega é completar a localização do conteúdo dinâmico vindo da API e permitir sua manutenção no admin.

## 2. Documentação e código considerados

Este plano foi construído após a leitura das diretrizes, READMEs, planos, documentação de banco e rascunhos dos dois repositórios, seguida da inspeção do código real de tradução, contratos, CRUD compartilhado, dashboard, Prisma, migrations e snapshot.

Fontes principais:

- `hans-portfolio-app/.agents/AGENTS.md`;
- `hans-portfolio-app/README.md`;
- planos e roadmap em `hans-portfolio-app/.agents/plans/`;
- `hans-portfolio-app/.agents/drafts/TODOLIST.txt`;
- `hans-portfolio-api/.agents/AGENTS.md`;
- `hans-portfolio-api/README.md`;
- `hans-portfolio-api/docs/database/initial-schema.md`;
- `hans-portfolio-api/docs/database/seed-snapshot.md`;
- `hans-portfolio-api/.agents/drafts/TODOLIST.txt`.

## 3. Diagnóstico atual

### 3.1. Frontend

- `AppLocale` já aceita `en-us`, `pt-br` e `es-es`.
- `APP_TRANSLATIONS` já carrega `en-us.translation.ts`, `pt-br.translation.ts` e `es-es.translation.ts`.
- O seletor de idioma, persistência em `localStorage`, atributo `lang` e copy estática já suportam espanhol.
- `resolveLocalizedText` já é a fronteira central para conteúdo localizado, mas os mapeadores hoje normalmente fornecem apenas as entradas `pt-br` e `en-us`; ao selecionar espanhol ocorre fallback para inglês.
- Tipos HTTP, mocks, helpers públicos e adaptadores dos 12 CRUDs ainda modelam apenas os campos Pt/En.

### 3.2. Backend e banco

O schema possui 17 pares de propriedades localizadas distribuídos em 9 entidades. Para manter a convenção atual, cada par receberá uma propriedade irmã terminada em `Es`.

| Entidade | Campos existentes | Campos novos |
| --- | --- | --- |
| `Project` | `titlePt/En`, `shortDescriptionPt/En`, `fullDescriptionPt/En` | `titleEs`, `shortDescriptionEs`, `fullDescriptionEs` |
| `Experience` | `titlePt/En`, `summaryPt/En`, `descriptionPt/En` | `titleEs`, `summaryEs`, `descriptionEs` |
| `Formation` | `titlePt/En`, `summaryPt/En` | `titleEs`, `summaryEs` |
| `SpokenLanguage` | `namePt/En` | `nameEs` |
| `Customer` | `summaryPt/En` | `summaryEs` |
| `Job` | `namePt/En`, `summaryPt/En` | `nameEs`, `summaryEs` |
| `Link` | `labelPt/En`, `descriptionPt/En` | `labelEs`, `descriptionEs` |
| `ImageAsset` | `altPt/En`, `captionPt/En` | `altEs`, `captionEs` |
| `Tag` | `namePt/En` | `nameEs` |

Regras de nulabilidade:

- o novo campo `Es` deve ser obrigatório quando os correspondentes Pt/En já são obrigatórios;
- `Link.descriptionEs`, `ImageAsset.altEs` e `ImageAsset.captionEs` permanecem opcionais, acompanhando os campos atuais;
- nomes próprios, marcas, slugs, URLs, caminhos, códigos, enums e nomes técnicos que não variam por idioma não ganham colunas artificiais.

Conteúdo adicional identificado:

- `PortfolioSetting` não possui colunas Pt/En dedicadas, mas o registro `profile` contém `value.introPt` e `value.introEn`; deve receber `value.introEs`.
- `experienceMetrics.label` é produzido pelo backend somente em inglês. A duração deverá ganhar labels localizados ou passar a ser formatada no frontend a partir de `years` e `months`.
- o dashboard deriva `namePt/En`, `titlePt/En` e `subtitlePt/En`; seus selects, tipos e responses também precisam de `Es`.
- campos de busca e ordenação do `content-resource.config.ts` incluem Pt/En e deverão incluir Es.

### 3.3. Inventário do snapshot

O snapshot atual contém:

- 25 tags;
- 2 idiomas falados;
- 12 clientes;
- 3 cargos;
- 3 formações;
- 3 experiências;
- 21 projetos;
- 17 links;
- 94 image assets;
- 3 portfolio settings.

Há 140 valores localizados Pt/En não nulos a traduzir. Os 94 assets atualmente não possuem alt/caption preenchidos, mas as colunas `altEs` e `captionEs` ainda devem existir para manter o contrato completo e permitir cadastros futuros.

## 4. Decisões arquiteturais

1. Manter o modelo atual de colunas por idioma (`Pt`, `En`, `Es`). Não introduzir tabela genérica de traduções nem JSON localizado nas entidades, pois isso ampliaria desnecessariamente o escopo e destoaria da arquitetura existente.
2. A API continuará retornando todas as variantes localizadas. Não será introduzido `Accept-Language` nesta entrega.
3. O frontend continuará escolhendo a variante com `resolveLocalizedText`/`TranslationService`; não serão espalhados `if`, `switch` ou ternários por locale.
4. Espanhol seguirá a variante internacional neutra, com consistência terminológica entre páginas públicas, admin e snapshot.
5. Marcas e termos técnicos consagrados serão preservados: Angular, TypeScript, Full Stack, CRM, Kanban, nomes de empresas, nomes de produtos, URLs e slugs não serão traduzidos sem necessidade.
6. O snapshot completo continuará sendo a fonte de verdade para reseed. Um manifesto de backfill será um artefato auditável da migração, não uma segunda seed permanente.
7. A evolução do banco será aditiva e em duas fases para evitar perda de dados e permitir preencher espanhol antes de aplicar `NOT NULL`.

## 5. Estratégia de tradução dos dados existentes

### 5.1. Manifesto de tradução

Criar no backend um arquivo versionado de backfill, por exemplo:

`prisma/data/migrations/2026-add-spanish-content.json`

O arquivo deve identificar registros por chave estável (`slug`, `code`, `url`, `filePath` ou `key`) e conter exclusivamente os novos valores em espanhol. Todos os 140 valores serão traduzidos manualmente pelo Codex, sem depender de tradução automática em runtime.

Regras editoriais:

- usar espanhol neutro e natural;
- traduzir o sentido, não fazer substituição palavra por palavra;
- preservar nomes próprios, marcas, acrônimos, comandos, nomes de tecnologias e trechos de código;
- manter a intenção e o nível de detalhe dos textos Pt/En;
- corrigir apenas incoerências evidentes que afetem a tradução, registrando qualquer correção simultânea de Pt/En no diff;
- preservar `null` quando o par Pt/En também não tiver conteúdo;
- validar acentos, pontuação, interpolação, plural e caracteres UTF-8;
- impedir valores temporários como `TODO`, strings vazias ou cópia acidental de português/inglês, salvo termos invariantes documentados.

Exemplos de referência:

- `Português` / `Portuguese` -> `Portugués`;
- `Inglês` / `English` -> `Inglés`;
- `Experiência em Stefanini Group` -> `Experiencia en Stefanini Group`;
- `Sistemas de Informação` -> `Sistemas de Información`;
- `Bancos de Dados` -> `Bases de Datos`;
- `Cliente importado do portfólio legado de Victor Hanszman.` -> `Cliente importado del portafolio anterior de Victor Hanszman.`

### 5.2. Script de backfill

Criar um script idempotente e testável, por exemplo `prisma/backfill-spanish-content.ts`, que:

- valide o manifesto antes de escrever;
- confirme que cada chave aponta para exatamente um registro;
- atualize somente campos `Es` e `profile.value.introEs`;
- execute as escritas em transação;
- possa ser reexecutado sem alterar outros dados;
- falhe se faltar registro, tradução obrigatória ou houver entrada duplicada;
- apresente resumo por entidade e quantidade atualizada;
- nunca limpe tabelas nem toque em usuários ou relações.

Adicionar scripts explícitos ao `package.json`, como `prisma:spanish:validate` e `prisma:spanish:backfill`, evitando acoplar o backfill ao reset destrutivo da seed.

### 5.3. Verificações de conteúdo

Criar validação automatizada que compare, para cada registro:

- presença de Es sempre que o campo for obrigatório;
- mesma cardinalidade de registros antes/depois;
- mesmos IDs, slugs, relações, datas, sort orders e enums;
- ausência de traduções órfãs no manifesto;
- presença de `introEs` em `portfolio-settings.profile`;
- preservação dos valores Pt/En byte a byte, exceto correções explicitamente aprovadas.

## 6. Migração Prisma sem perda de dados

### Fase A — preparação e colunas aditivas

1. Confirmar worktrees limpas e registrar os hashes atuais dos dois repositórios.
2. Executar no banco de origem:
   - `npm run prisma:migrate:status`;
   - `npm run prisma:seed:snapshot`;
   - revisar e versionar o snapshot atual antes de qualquer mudança.
3. Em produção, gerar também um backup externo do PostgreSQL/Neon antes do deploy; o snapshot não substitui backup operacional do banco.
4. Adicionar temporariamente os campos `Es` como opcionais no Prisma.
5. Rodar `npm run prisma:format`, `npm run prisma:validate` e `npm run prisma:generate`.
6. Criar uma migration somente aditiva, com nome como `add_spanish_content_columns`, e revisar o SQL para garantir apenas `ADD COLUMN`, sem `DROP`, rename implícito ou recriação de tabela.
7. Aplicar a migration em banco local/clonado com `prisma:migrate:deploy` ou o fluxo de desenvolvimento documentado.
8. Publicar uma versão transitória do backend que aceite/retorne Es opcionalmente, mantendo compatibilidade com o frontend antigo.

### Fase B — tradução e consolidação

1. Executar `prisma:spanish:validate` em modo read-only.
2. Executar `prisma:spanish:backfill` no ambiente controlado.
3. Rodar consultas de integridade para provar que todos os campos obrigatórios foram preenchidos.
4. Atualizar o schema final, tornando os campos Es obrigatórios onde Pt/En já são obrigatórios.
5. Criar uma segunda migration, como `require_spanish_content_columns`, contendo somente os `SET NOT NULL` aplicáveis.
6. Aplicar e validar a segunda migration.
7. Exportar novamente `npm run prisma:seed:snapshot` e revisar o diff completo do snapshot.
8. Testar `prisma:seed` apenas em um banco descartável, provando que o novo snapshot recria o mesmo conteúdo e todas as relações. Não executar reset no banco que contém a fonte de dados real.
9. Manter o manifesto e o script de backfill versionados pelo menos durante o rollout/rollback da entrega.

### Rollback

- antes da Fase B, rollback de aplicação é simples porque as colunas novas são opcionais e ignoradas pelo frontend anterior;
- depois da Fase B, preferir rollback de aplicação mantendo as colunas Es, pois remover colunas perderia as traduções;
- qualquer restauração de dados deve usar o backup externo ou o snapshot anterior versionado;
- migrations de rollback destrutivas não devem ser automatizadas nem executadas sem validação manual do alvo.

## 7. Alterações no backend

### 7.1. Prisma, snapshot e scripts

- adicionar os 17 campos `Es` ao `schema.prisma` com nulabilidade simétrica;
- atualizar `seed-snapshot.types.ts`, normalizadores, export e seed apenas onde os tipos gerados exigirem;
- adicionar `introEs` ao JSON `profile` do snapshot;
- gerar as duas migrations aditivas/consolidadoras;
- atualizar `docs/database/initial-schema.md` e `docs/database/seed-snapshot.md`.

### 7.2. Contratos administrativos e Swagger

Adicionar os campos Es, decorators de validação e exemplos Swagger nos DTOs de:

- projects;
- experiences;
- formations;
- spoken languages;
- customers;
- jobs;
- links;
- image assets;
- tags.

Os DTOs de update continuarão derivados por `PartialType`, permitindo alteração parcial. A validação deve exigir Es nos creates finais sempre que Pt/En forem exigidos e aceitar os opcionais vazios somente conforme o contrato atual.

### 7.3. CRUD compartilhado

- acrescentar Es aos `searchFields` de todas as entidades localizadas;
- acrescentar Es a `sortableFields` quando Pt/En já forem ordenáveis;
- manter includes e mutações genéricas, verificando que o serviço não filtra propriedades novas;
- testar create/update/read com Es e busca por termos exclusivamente espanhóis;
- revisar o contrato legado de tags (`namePt/nameEn` versus aliases `labelPt/labelEn`) e expor `nameEs` de forma coerente, sem criar um terceiro alias incorreto.

### 7.4. Dashboard e conteúdo derivado

- acrescentar `nameEs`, `titleEs` e `subtitleEs` aos tipos, selects, mappers e responses do dashboard;
- propagar Es em stack distribution, timeline e highlights;
- para tecnologia, instituição ou empresa que são invariantes, preencher os três títulos derivados com o mesmo valor somente no response, sem criar colunas inúteis;
- substituir a dependência de `experienceMetrics.label` em inglês por uma destas opções, em ordem de preferência:
  1. o backend retorna os valores numéricos e o frontend monta a frase com pluralização traduzida;
  2. se a API precisar manter labels prontos, retornar `labelPt`, `labelEn` e `labelEs`, mantendo `label` temporariamente como alias deprecated de inglês.
- documentar a decisão no Swagger e remover qualquer texto dinâmico monolíngue restante.

### 7.5. Testes do backend

- specs de validação para todos os DTOs create/update;
- specs do resource config para busca/ordenação por Es;
- specs do CRUD compartilhado provando persistência e retorno de Es;
- specs do dashboard para todos os campos derivados Es;
- specs do formatador de duração em espanhol, incluindo singular/plural e zero;
- e2e de create, read, search, sort e update com texto espanhol;
- teste do validador e do backfill em fixture/banco descartável;
- teste de export/reseed que preserve IDs e relações.

## 8. Alterações no frontend

### 8.1. Contratos e mocks

Adicionar as propriedades Es correspondentes em:

- types de projects, experiences, formations, spoken languages, customers, jobs, links, image assets e tags;
- relações aninhadas que repetem esses registros;
- tipos do dashboard;
- payloads administrativos;
- mocks e fixtures de API.

Evitar tipos frouxos ou casts para ocultar campos ausentes. Os mocks devem conter espanhol real, não duplicar inglês como atalho.

### 8.2. Resolução do conteúdo público

Em todo uso de `resolveLocalizedText`, fornecer o mapa completo:

```ts
{
  'pt-br': record.titlePt,
  'en-us': record.titleEn,
  'es-es': record.titleEs,
}
```

Aplicar isso em:

- home e seus destaques;
- experiences, relações e modal de tecnologia;
- skills/formations/spoken languages;
- projects, tags, links, galeria e experiências relacionadas;
- dashboard, timeline, stacks e highlights;
- alt texts, captions e qualquer fallback de acessibilidade.

Criar, se necessário, helpers tipados pequenos para montar os mapas de `title`, `name`, `summary`, `description`, `label`, `alt` e `caption`, reduzindo repetição sem esconder o contrato.

### 8.3. Admin

Adicionar um input espanhol ao lado lógico de cada grupo Pt/En nos creates e updates das 9 entidades localizadas:

- labels, placeholders, validações required/opcionais e mensagens em todos os três idiomas;
- estado inicial, preenchimento no update, reset de formulário e payload de mutation;
- exibição dos valores Es no read detalhado;
- busca administrativa capaz de localizar espanhol;
- layout responsivo para três variantes sem duplicar regras por entidade.

O registro `portfolio-settings.profile` continuará no editor JSON, mas sua documentação/validação deve exigir `introEs` nesse objeto conhecido.

### 8.4. Copy estática e catálogos

- auditar paridade exata das chaves `en-us`, `pt-br` e `es-es`;
- adicionar labels/placeholders administrativos para os novos campos;
- manter enums e listas fechadas nos catálogos estáticos existentes, pois não precisam virar colunas de banco;
- localizar duração usando pluralização/formatador centralizado, nunca o label inglês da API;
- manter formatação de datas com `Intl.DateTimeFormat` usando o locale ativo.

### 8.5. Testes do frontend

- `resolveLocalizedText` retornando Es sem fallback quando o valor existe;
- fallback controlado para conteúdo opcional ausente;
- mapeadores públicos de todas as páginas com fixtures trilingues;
- dashboard e relações aninhadas em espanhol;
- create/update/read dos CRUDs com inputs Es;
- required e payload correto dos campos obrigatórios;
- troca reativa de idioma sem reload;
- busca por texto espanhol;
- alt/caption e conteúdo de acessibilidade em espanhol;
- garantia de que nenhum texto de API em inglês apareça com locale `es-es` quando há tradução.

## 9. Ordem de implementação e rollout

1. Congelar inventário e exportar o snapshot atual.
2. Criar o manifesto com as 140 traduções espanholas e sua validação.
3. Implementar a migration A com colunas opcionais.
4. Atualizar backend, Swagger, search/sort e responses para Es opcional.
5. Atualizar dashboard e eliminar labels derivados monolíngues.
6. Aplicar migration A e executar backfill em ambiente local/clonado.
7. Validar integridade e revisar linguisticamente todos os registros.
8. Criar/aplicar migration B com `NOT NULL` nos campos obrigatórios.
9. Exportar e versionar o novo snapshot integral.
10. Atualizar contratos, mapeadores e mocks do frontend.
11. Adicionar inputs Es em todos os CRUDs e completar as copies estáticas.
12. Executar testes automatizados dos dois repositórios.
13. Validar visualmente o portfolio público e todos os CRUDs em espanhol.
14. Fazer deploy backend-first: migration A + backend compatível, backfill, migration B, depois frontend.
15. Repetir consultas de integridade e smoke tests em produção.

## 10. Validação manual integrada

No ambiente local:

1. selecionar espanhol e navegar por home, experiences, skills, projects e dashboard;
2. conferir títulos, resumos, descrições, relações, tags, links, alt texts, captions e métricas;
3. abrir os modos create/read/update/delete das entidades localizadas;
4. criar registros temporários contendo caracteres espanhóis (`á`, `é`, `í`, `ó`, `ú`, `ü`, `ñ`, `¿`, `¡`);
5. reabrir os registros e confirmar persistência, busca e ordenação;
6. conferir Swagger e responses diretos da API;
7. excluir somente os registros temporários;
8. verificar console do navegador, network, logs da API e ausência de erros Prisma.

## 11. Comandos obrigatórios

Backend:

```bash
npm run prisma:format
npm run prisma:validate
npm run prisma:generate
npm run prisma:migrate:status
npm run lint
npm run format:check
npm run test:coverage
npm run build
```

Frontend:

```bash
npm run lint
npm run test:coverage -- --watch=false
npm run build
```

Também executar os novos validadores de tradução/backfill e testar `prisma:seed` em banco descartável.

## 12. Critérios de aceite

- todos os campos localizados obrigatórios possuem Pt, En e Es no banco;
- os 140 valores existentes estão traduzidos para espanhol e versionados no snapshot;
- `profile.value.introEs` existe e é exibido corretamente onde aplicável;
- nenhum ID, relação, data, enum ou conteúdo Pt/En foi perdido;
- a API aceita, persiste, busca, ordena e retorna Es;
- Swagger documenta todos os campos novos;
- dashboard e métricas não devolvem copy visível somente em inglês;
- frontend público usa Es real em todas as entidades e relações;
- admin permite criar, ler e atualizar todos os campos Es;
- não existem ternários/switches locais por idioma fora da camada central;
- migrations funcionam em banco com dados existentes sem reset;
- snapshot exportado consegue recriar integralmente o conteúdo em banco descartável;
- testes, coverage, lint, format e build ficam verdes nos dois repositórios;
- documentação dos dois repositórios reflete o contrato trilingue final.

## 13. Passo a passo reutilizável para adicionar um novo idioma

1. Definir o locale BCP 47 (ex.: `fr-fr`) e o sufixo de campo (`Fr`) antes de codar.
2. Inventariar todas as propriedades localizadas persistidas, derivadas e aninhadas em JSON.
3. Adicionar o locale, catálogo estático e opção no frontend, garantindo paridade de chaves.
4. Criar um manifesto versionado com traduções humanas identificadas por chaves estáveis.
5. Adicionar colunas opcionais no Prisma em uma migration exclusivamente aditiva.
6. Atualizar DTOs, Swagger, tipos, search/sort, CRUD compartilhado, dashboard e agregações.
7. Publicar backend retrocompatível antes do frontend consumidor.
8. Executar backfill idempotente em transação e validar completude/integridade.
9. Tornar obrigatórias somente as colunas equivalentes a campos já obrigatórios, em uma segunda migration.
10. Exportar o snapshot atualizado e testar restore/reseed em banco descartável.
11. Atualizar types, mocks, helpers, páginas públicas, relações e CRUDs no frontend.
12. Centralizar a seleção do conteúdo pelo locale; não criar condicionais espalhadas.
13. Localizar também conteúdo derivado, pluralização, datas, números e acessibilidade.
14. Rodar os gates de qualidade dos dois repositórios e o ciclo integrado no navegador.
15. Fazer rollout backend-first, manter backup e evitar rollback destrutivo de colunas.

## 14. Assumptions

- o espanhol adotado será neutro/internacional;
- não haverá mudança para tabela genérica de traduções nesta entrega;
- a API continuará retornando todas as variantes de idioma no mesmo payload;
- o banco atualmente configurado será tratado como fonte sensível e nunca sofrerá reset para esta migração;
- somente bancos descartáveis poderão receber `prisma:seed` durante os testes de restauração;
- as traduções serão produzidas manualmente pelo Codex e revisadas no diff antes do backfill;
- alterações no backend e no frontend serão entregues de forma coordenada, com backend compatível publicado primeiro.
