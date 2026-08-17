# Plano de normalização da taxonomia, relações e ordenação dos CRUDs

## Objetivo

Remover a entidade de domínio `Tag` e suas relações muitos-para-muitos sem perder a classificação atual das tecnologias, normalizar essas classificações como enums da própria `Technology`, corrigir os modais e catálogos relacionais, garantir ordenação determinística dos registros e padronizar as listas visuais de chips no Portfolio.

O plano abrange `hans-portfolio-api` e `hans-portfolio-app`. A `hans-ui-design-lib` só deverá ser alterada se a investigação provar uma lacuna genérica na lib; os componentes visuais já existentes (`hans-carousel`, `hans-select-option`, paginação, loading etc.) devem ser reutilizados antes de qualquer evolução da biblioteca.

## Situação inicial confirmada

- O modal público de Formation recebe várias `imageAssets`, mas o item usado como imagem principal não distingue `ICON` de `SCREENSHOT`. Por isso um diploma/screenshot pode aparecer junto ao título.
- O Prisma possui:
  - `Tag`, `TechnologyTag` e `ProjectTag`;
  - `Technology.tags` e `Project.tags`;
  - CRUDs público/protegido de Tags no Back-End;
  - workspace, modal, API service, tipos, traduções e testes de Tags no Front-End administrativo.
- O snapshot atual contém **25 Tags**:
  - 6 com `TagType.STACK`;
  - 19 com `TagType.DOMAIN`.
- O snapshot contém **120 `technologyTags`** e **0 `projectTags`**. Com aproximadamente 60 tecnologias, isso confirma que uma Technology normalmente possui duas classificações distintas: uma de stack e outra de tipo/domínio.
- `Technology` já possui `category`, `level` e `frequency`, mas ainda não possui colunas persistidas para `stack` nem para o tipo granular atualmente derivado dos Tags/heurísticas do Front-End.
- A tela Skills já apresenta filtros conceituais separados para Stack, Type e Level. Parte de Stack e Type ainda é inferida por slug/category em helpers do Front-End.
- As entidades CRUD com `sortOrder` são: `Project`, `Experience`, `Technology`, `Formation`, `SpokenLanguage`, `Customer`, `Job`, `Link` e `ImageAsset`. `TechnologyContext` e `PortfolioSetting` não participam desse reordenamento; `Tag` será removida.
- `ImageAsset` possui relações inversas com Projects, Experiences, Formations, Technologies, Spoken Languages, Customers e Jobs, mas a leitura administrativa depende de uma combinação de relações retornadas pela API e catálogos auxiliares. Essa combinação está incompleta em alguns cenários.
- Os catálogos administrativos são paginados. Alguns consumidores pedem uma página fixa/grande, enquanto outros dependem do tamanho padrão. Isso pode esconder registros válidos e explica por que um relacionamento pode existir no banco, mas não aparecer como opção no picker.
- O componente visual `app-tag-button` e sua pasta `shared/tag` não representam a entidade removida; eles são chips/botões reutilizáveis e devem permanecer.

## Decisão de modelagem para eliminar `Tag` sem perda de dados

### Por que uma única coluna `stack` não é suficiente

Os dados reais não são 1:1 entre Technology e Tag: cada Technology pode carregar simultaneamente um Tag `STACK` e um Tag `DOMAIN`. Colocar os 25 valores em uma única coluna faria uma das duas classificações desaparecer, impediria os filtros atuais de Stack e Type de coexistirem e contrariaria a exigência de preservar os dados versionados.

Assim, a entidade/tabela/CRUD `Tag` será removida conforme solicitado, mas suas duas taxonomias serão normalizadas em duas colunas enum 1:1 na própria Technology:

- `stack: TechnologyStack`;
- `type: TechnologyType`.

`category`, `level` e `frequency` permanecem com os significados atuais. Essa solução elimina completamente a entidade Tag e as tabelas relacionais, preserva os 120 vínculos atuais como valores escalares e remove as heurísticas de slug do Front-End.

### Enum `TechnologyStack`

Mapeamento dos seis slugs `STACK` atuais:

| Tag atual | Enum novo |
| --- | --- |
| `stack-back-end` | `BACK_END` |
| `stack-data-bases` | `DATABASES` |
| `stack-front-end` | `FRONT_END` |
| `stack-games` | `GAMES` |
| `stack-mobile` | `MOBILE` |
| `stack-others` | `OTHERS` |

### Enum `TechnologyType`

Mapear os 19 slugs `DOMAIN` para constantes estáveis, corrigindo apenas erros ortográficos históricos no identificador técnico, sem alterar os rótulos traduzidos:

- `CLOUD_HOSTING_PLATFORMS`;
- `CODE_EDITORS`;
- `DATABASES_MANAGEMENT_SYSTEMS`;
- `DEPLOYMENT_TOOLS`;
- `DEVELOPMENT_PLATFORMS`;
- `FRAMEWORKS`;
- `LIBRARIES`;
- `METHODOLOGIES`;
- `NON_RELATIONAL_DATABASES`;
- `OBJECT_NOTATIONS`;
- `OTHERS`;
- `PACKAGE_MANAGERS`;
- `PACKAGES`;
- `PROGRAMMING_LANGUAGES`;
- `PROTOCOLS`;
- `RELATIONAL_DATABASES`;
- `TECHNIQUES`;
- `VERSIONING_PLATFORMS`;
- `WEB_LANGUAGES`.

### Pré-condições obrigatórias

Antes da migration destrutiva, executar consultas de auditoria e gerar um relatório versionável/registrado no resultado da tarefa:

- quantidade de Tags por `TagType`;
- quantidade de `technology_tag` e `project_tag`;
- Technologies sem Tag `STACK`;
- Technologies sem Tag `DOMAIN`;
- Technologies com mais de um Tag do mesmo tipo;
- relações apontando para Tags que não constam no mapeamento;
- contagens e checksums lógicos por Technology (`technologyId`, stack slug, domain slug).

A migration deve abortar se houver duplicidade, ausência ou slug desconhecido. Não escolher “o primeiro” Tag silenciosamente. Se o banco divergir do snapshot, corrigir explicitamente os dados antes de continuar.

## Migração segura de banco e Prisma

### Preparação e backup versionado

1. Confirmar que o working tree do Back-End não contém mudanças de snapshot alheias à tarefa.
2. Exportar o snapshot pré-migração e guardar as contagens de todas as coleções/relações.
3. Validar `prisma migrate status`, `prisma validate` e a conexão com o banco local correto.
4. Não executar `migrate reset` nem recriar o banco; a alteração deve ser incremental e preservar os registros existentes.

### Migration de taxonomia

Criar uma migration SQL revisada manualmente com a seguinte ordem:

1. Criar os enums PostgreSQL `TechnologyStack` e `TechnologyType`.
2. Adicionar `technology.stack` e `technology.type` inicialmente como nullable.
3. Fazer backfill por `UPDATE ... FROM technology_tag JOIN tag`:
   - Tags `STACK` alimentam `technology.stack`;
   - Tags `DOMAIN` alimentam `technology.type`.
4. Executar assertions SQL antes do drop:
   - todas as Technologies têm os dois campos preenchidos;
   - o total de valores migrados corresponde ao total esperado por tipo;
   - não há ambiguidades.
5. Tornar ambas as colunas `NOT NULL`.
6. Remover foreign keys e tabelas `project_tag` e `technology_tag`.
7. Remover a tabela `tag` e o enum `TagType` quando não houver mais dependências.
8. Adicionar índices nos campos `stack` e `type` se os planos de consulta/filtros demonstrarem benefício.
9. Atualizar `schema.prisma`, gerar o Prisma Client e validar o schema final.

`project_tag` está vazio no snapshot e pode ser descartada, mas a migration ainda deve consultar o banco real e registrar a contagem antes do drop. Se houver registros locais inesperados, listar os projetos afetados; como a decisão funcional é remover essa classificação, eles podem ser descartados somente depois dessa confirmação explícita.

### Seed, snapshot e normalizadores

- Mover os valores de `technologyTags` para `technologies[].stack` e `technologies[].type`.
- Remover `tags`, `technologyTags` e `projectTags` do contrato do snapshot.
- Atualizar `seed.ts`, `export-seed-snapshot.ts`, normalizadores, validadores e respectivos testes.
- Preservar IDs e todos os demais campos/relacionamentos de Technology.
- Gerar o novo snapshot **a partir do banco migrado**, comparar as contagens e verificar que a única perda intencional foi `project_tag` e a estrutura Tag.
- Adicionar uma validação de seed que rejeite Technology sem stack/type ou com valores fora dos enums.
- Rodar a seed em um banco de validação/isolado quando o fluxo documentado permitir e comparar o resultado com o banco local antes de considerar a migration concluída.

## Refatoração do Back-End

### Remoção completa da entidade Tag

- Remover controllers público/admin de Tags, contracts, decorators/examples Swagger, resource config, services específicos, módulos/exports, rotas e testes correspondentes.
- Retirar `tags` de unions/registries de recursos de conteúdo e do dashboard.
- Remover `tagIds` de payloads de Project e Technology.
- Remover os builders de nested writes de Tags no serviço de mutation.
- Remover selects/includes/mappers de `Project.tags` e `Technology.tags`.
- Atualizar OpenAPI e exemplos para `Technology.stack` e `Technology.type`.
- Confirmar por busca final que `TagType`, `ProjectTag`, `TechnologyTag`, `tagIds`, `project_tag` e `technology_tag` não permanecem no código ativo, migrations novas ou snapshot. Migrations históricas antigas não devem ser reescritas.

### Contratos e leitura de Technology

- Adicionar `stack` e `type` aos requests de create/update, responses de coleção/item, dashboard e relações aninhadas.
- Validar os campos com `@IsEnum` e documentá-los no Swagger.
- Torná-los obrigatórios em create e opcionais em update parcial, mantendo o valor existente quando omitidos.
- Atualizar filtros/queries públicos e administrativos se a API oferece filtragem server-side.
- Fazer dashboard, métricas, agrupamentos e `topTechnologies` consumirem os campos persistidos, sem inferência por slug.

### Ordenação única e contígua

Criar uma abstração transacional compartilhada de reordenação para todos os recursos CRUD com `sortOrder`:

- `Project`;
- `Experience`;
- `Technology`;
- `Formation`;
- `SpokenLanguage`;
- `Customer`;
- `Job`;
- `Link`;
- `ImageAsset`.

Regras:

- posições válidas serão contíguas e únicas dentro de cada entidade;
- adotar uma base única para todas as entidades (preferencialmente zero, compatível com os defaults atuais) e documentá-la;
- create em uma posição ocupada desloca os itens daquela posição em diante;
- update para uma posição menor incrementa o intervalo entre nova e antiga posição;
- update para uma posição maior decrementa o intervalo atravessado;
- delete fecha o intervalo, decrementando os posteriores;
- valores negativos são normalizados para o início e valores acima do limite para o fim;
- operações que não alteram `sortOrder` não reordenam desnecessariamente;
- empates/gaps legados são normalizados previamente por `(sortOrder, createdAt, id)`.

Implementar tudo dentro de uma transação Prisma. Para evitar colisões durante updates múltiplos, usar uma estratégia de duas fases com valores temporários fora do intervalo (ou constraint deferrable suportada por SQL e devidamente testada), antes de gravar a sequência final. Não depender de várias chamadas concorrentes sem transação.

A migration de saneamento deve normalizar as nove tabelas antes de qualquer constraint. Depois, considerar/implementar índice unique por `sortOrder` em cada tabela apenas se a estratégia transacional suportar PostgreSQL e Prisma sem conflitos intermediários. Mesmo com constraint, a regra de deslocamento continua pertencendo ao serviço.

Cobrir create, move para cima, move para baixo, mesma posição, extremos, delete, lista vazia, duplicidades legadas e rollback em erro.

## Correção dos catálogos de relações

### Catálogo completo de Image Assets

O picker de relações não pode usar apenas a primeira página nem supor que `pageSize=100` sempre contém tudo.

- Criar no Front-End um helper/service genérico para carregar todas as páginas de um catálogo paginado, respeitando `totalPages`/`hasNextPage`, deduplicando por ID e preservando `sortOrder` + nome como desempate.
- Alternativamente, se o Back-End já possuir ou justificar um endpoint protegido de catálogo leve, padronizar esse endpoint para todos os relation pickers. Não criar uma exceção exclusiva para Formations.
- Aplicar a solução a todos os CRUDs que listam Image Assets: Projects, Experiences, Technologies, Formations, Spoken Languages, Customers e Jobs.
- Não filtrar por extensão, kind, pasta ou sort order, salvo quando o domínio do campo declarar esse filtro. JPG/PNG válidos devem aparecer.
- Garantir que itens já selecionados continuem visíveis mesmo durante paginação/search e que abrir um update não apague IDs ausentes de uma página parcial.
- Separar loading, erro e empty state do catálogo da entidade principal.

### Auditoria geral dos relation pickers

Repetir a mesma verificação para Technologies, Experiences, Projects, Customers, Jobs, Links, Formations, Spoken Languages e demais catálogos usados pelos CRUDs. O objetivo é eliminar outras perdas silenciosas causadas por catálogos parciais, não apenas corrigir Formation.

Testar mistura de mais de uma página, sort orders duplicados legados, search, item selecionado na última página e retorno fora de ordem.

## Correção das relações no Read de Image Assets

Auditar de ponta a ponta as sete relações inversas:

- Projects;
- Experiences;
- Technologies;
- Formations;
- Spoken Languages;
- Customers;
- Jobs.

Para cada uma:

1. Conferir o `include/select` do resource config público e administrativo.
2. Confirmar que a response traz ID da linha, ID da entidade e objeto aninhado suficiente para o label localizado.
3. Alinhar os tipos do Front-End sem casts que escondam campos ausentes.
4. Normalizar IDs diretos, IDs relacionais e IDs de objetos aninhados.
5. Mapear os nomes no `ImageAssetsOperationsViewModel` e exibir o plural traduzido no detailed read.
6. Não depender exclusivamente de catálogos auxiliares para reconstruir uma relação que a API de item pode devolver diretamente.
7. Exibir mensagem vazia apenas quando a relação realmente estiver vazia.

Adicionar fixtures com todas as sete relações preenchidas e outra fixture parcialmente preenchida. O caso Jobs mostrado no screenshot deve virar teste de regressão explícito.

## Refatoração do Front-End administrativo

### Remoção do CRUD Tags

- Remover `tags-operations`, seus modais/helpers/types/specs e o card/workspace da página Admin.
- Remover o service/types/specs de API da entidade Tags.
- Retirar `TAGS` dos registries/unions/configurações de entidade administrativa.
- Remover traduções exclusivas do CRUD/entidade Tags nos três idiomas e atualizar o teste de chaves não usadas.
- Remover relation pickers de Tags em Project e Technology.
- Adicionar selects obrigatórios de `stack` e `type` no create/update de Technology usando `hans-select-option`.
- Usar os enums brutos como `value` e chaves canônicas de taxonomia como labels traduzidos.
- Atualizar read, picker, delete confirmation, payloads, view models, validações e specs de Technology.
- Não remover nem renomear `app-tag-button`, `TagButtonViewModel`, `shared/tag` ou estilos de chips; esses elementos visuais permanecem.

### Skills: filtro de frequência

- Adicionar estado `frequencyFilter` e um `hans-select-option` com `All`, `Frequent`, `Occasional`, `Previously used` e `Studying`.
- Combinar o filtro com search, stack, type, level e highlight.
- Reiniciar a paginação para a página 1 a cada alteração de filtro.
- Consumir `technology.stack` e `technology.type` diretamente; remover os mapas/heurísticas de slug que deixarem de ser necessários.
- Manter todas as opções e labels sincronizados em `en-us`, `pt-br` e `es-es`, reutilizando as chaves de taxonomia existentes sempre que possível.

## Modais públicos

### Formation: ícone, carousel e tecnologias

- No mapper compartilhado de Image Assets, escolher a imagem principal exclusivamente entre relações com `kind === 'ICON'`.
- Usar desempate determinístico por `relation.sortOrder`, `imageAsset.sortOrder`, filename/ID.
- Se não houver ICON, renderizar o fallback visual existente; nunca promover SCREENSHOT para ícone.
- Construir `galleryItems` exclusivamente com `kind === 'SCREENSHOT'`.
- Não incluir ICON, LOGO, PROFILE ou OTHER no carousel.
- Renderizar carousel e modal large somente quando houver ao menos um screenshot válido; sem screenshots, manter o tamanho compacto.
- Incluir no `EducationModalItem` as Technologies relacionadas e renderizá-las com `app-tag-button`.
- Ordenar essas Technologies pela regra global de highlights/alfabética.
- Preferencialmente manter os chips interativos e abrir o `app-technology-modal`, garantindo que somente um overlay fique ativo e que o conteúdo anterior seja limpo.
- Cobrir o caso com ICON + SCREENSHOT, somente ICON, somente SCREENSHOT e assets duplicados/inválidos.

### Customer: summary opcional no detalhe

- Adicionar o summary localizado ao view model/modal de Customer.
- Selecionar `summaryPt`, `summaryEn` ou `summaryEs` conforme o idioma ativo.
- Renderizar o campo/seção somente quando `trim()` produzir conteúdo.
- Não mostrar label vazia, placeholder ou espaço reservado quando o summary estiver null/vazio.
- Garantir atualização reativa ao trocar idioma com o modal aberto.

## Ordenação global dos chips/tags visuais

Criar um helper compartilhado e puro para todas as listas baseadas em `app-tag-button`:

1. itens com `highlight === true` primeiro;
2. highlights em ordem alfabética;
3. demais itens em ordem alfabética;
4. desempate estável por ID/slug.

Detalhes:

- usar `Intl.Collator` com o locale ativo (`en-US`, `pt-BR`, `es-ES`) e sensibilidade adequada a acentos/case;
- não mutar o array recebido;
- tratar itens sem propriedade highlight como não destacados;
- ordenar pelo label realmente exibido no idioma atual, não por slug;
- reordenar reativamente ao trocar idioma;
- manter o limite visual “show more” aplicado **depois** da ordenação.

Auditar e aplicar em Home/Main Technologies, Highlighted Projects quando houver chips, cards e modais de Experiences, Projects, Skills/Technologies, Formations, Customers e qualquer outro uso de `app-tag-button`/listas equivalentes. Incluir clientes, tecnologias, links ou outros chips somente quando a ordem alfabética fizer sentido; listas cronológicas e carousels mantêm sua ordenação de domínio.

Para priorizar highlights de relações aninhadas, garantir que os contratos do Back-End exponham `highlight` nos objetos relacionados. Não inferir highlight no Front-End.

## Traduções e documentação

- Remover apenas chaves exclusivas da entidade/CRUD Tag; preservar chaves taxonômicas e do componente visual de chip.
- Criar/reutilizar chaves comuns para Stack, Type, Frequency e summaries, mantendo os três catálogos com o mesmo conjunto exato.
- Atualizar documentação arquitetural do Back-End sobre taxonomias escalares e reordenação transacional.
- Atualizar documentação do Front-End sobre ordenação dos chips e carregamento completo de relation catalogs.
- Registrar explicitamente que “Tag removida” significa entidade de banco/CRUD, não o componente visual `app-tag-button`.

## Estratégia de testes automatizados

### Back-End

- Migration/backfill:
  - mapeamento dos 6 stacks e 19 types;
  - falha em ausência, duplicidade ou slug desconhecido;
  - `project_tag` auditada antes do drop;
  - preservation check dos 120 vínculos atuais como 60 pares stack/type, conforme o banco real confirmar.
- Contracts/controllers/services de Technology com os novos enums.
- Ausência das rotas de Tags e de `tagIds` nos mutations.
- Reads de ImageAsset contendo as sete relações.
- Algoritmo de sort order para as nove entidades, todos os movimentos e rollback.
- Seed/export/normalize com o novo formato e equivalência de dados.
- Dashboard e payloads públicos sem relações Tag.

### Front-End

- Technology CRUD: selects, validação, payload, update prefilled e read.
- Remoção do workspace/serviço/rotas/traduções de Tags.
- Frequency filter combinado com os demais filtros e paginação.
- Helper de chips: highlights primeiro, ordem localizada, estabilidade, ausência de highlight e imutabilidade.
- Formation modal: seleção exclusiva de ICON, carousel exclusivo de SCREENSHOT, tamanho condicional e chips de Technologies.
- Customer modal: summary presente/ausente e troca de idioma.
- Image Assets admin read: sete relações, vazio real e formatos mistos.
- Relation catalog: múltiplas páginas, deduplicação, seleção fora da primeira página, loading/error e ausência de perda no update.
- Ajustar/remover todos os specs antigos da entidade Tags sem reduzir a cobertura.

## Validação visual e integrada pelo Chrome DevTools

Usar a sessão autenticada em `http://localhost:4200/admin` e os endpoints locais. Registrar baseline antes da alteração e repetir depois.

### Formação

- Abrir “Sistemas de Informação” e confirmar que o cabeçalho usa o ICON da formação.
- Confirmar que diploma/certificados aparecem apenas no carousel.
- Inspecionar DOM/network para garantir que ICON não foi inserido nos slides.
- Confirmar chips de Technologies, ordem, interação e troca limpa de modal.
- Validar light/dark, sem screenshot, uma screenshot e várias screenshots.

### Technology e filtros

- Abrir create/update e conferir selects Stack/Type preenchidos pelo valor migrado.
- Alterar apenas outro campo e garantir que stack/type não sejam apagados.
- Na Skills, combinar frequency com stack/type/level/highlight/search e conferir paginação/total.
- Trocar idioma e verificar labels e reordenação alfabética.

### Image Assets e relações

- No read de um asset ligado a Job, conferir que Jobs aparecem com o label correto.
- Repetir amostras para as sete entidades.
- Abrir update de Formation/Experience/Project com throttling e conferir que assets da última página também aparecem.
- Usar Network para provar que todas as páginas (ou o endpoint de catálogo completo) foram consumidas.
- Salvar sem mudar relações e confirmar que nenhuma relação desapareceu.

### Sort order

- Em cada uma das nove entidades, mover um item para uma posição ocupada, para o início e para o fim.
- Confirmar no read/list/API que a sequência ficou única e contígua.
- Criar em posição intermediária e excluir um item intermediário.
- Fazer refresh e conferir persistência.
- Validar que relações e conteúdos não foram modificados pelo reordenamento.

### Regressões gerais

- Abrir Home, Experiences, Skills, Projects e Admin nos três idiomas e temas light/dark.
- Verificar console sem erros/warnings inesperados, requests sem falhas e somente um modal ativo.
- Confirmar que `app-tag-button` continua funcional e estilizado apesar da remoção da entidade Tag.

## Sequência de implementação

1. Capturar baseline visual/network e exportar snapshot pré-migração.
2. Executar auditorias SQL de Tags, relações e sort orders; corrigir previamente qualquer ambiguidade.
3. Implementar e testar a abstração transacional de sort order e a normalização dos dados legados.
4. Criar migration incremental para `TechnologyStack`/`TechnologyType`, fazer backfill, validar e remover Tag/relações.
5. Atualizar Prisma Client, seeds, snapshot, exporters/normalizers e validar equivalência dos dados.
6. Remover Tag do módulo/contratos/rotas/mutations do Back-End e expor stack/type nas respostas.
7. Atualizar serviços/types/admin CRUD do Front-End, remover Tags Operations e substituir relações por selects.
8. Eliminar inferências de stack/type no Skills e adicionar filtro de frequency.
9. Criar/aplicar helper global de ordenação de chips e garantir `highlight` nos contratos aninhados.
10. Corrigir Formation modal (ICON/SCREENSHOT/Technologies) e Customer summary opcional.
11. Corrigir reads de Image Assets para as sete relações.
12. Implementar carregamento integral e reutilizável dos relation catalogs e migrar todos os consumidores.
13. Atualizar traduções e documentação; executar buscas finais por artefatos antigos.
14. Rodar validação automatizada completa dos repositórios alterados.
15. Executar toda a matriz visual/integrada no Chrome DevTools e gerar o snapshot final somente após sucesso.

## Comandos obrigatórios de qualidade

### `hans-portfolio-api`

- `npm run lint`;
- `npm run test:coverage` com **100% exatos** em statements, branches, functions e lines;
- `npm run build`;
- `npx prisma format`;
- `npx prisma validate`;
- `npx prisma generate`;
- `npx prisma migrate status`;
- comandos documentados de migration/seed/snapshot no ambiente local seguro.

### `hans-portfolio-app`

- `npm run lint`;
- `npm run test:coverage -- --watch=false` com **100% exatos** em statements, branches, functions e lines;
- `npm run build`.

### `hans-ui-design-lib`, somente se alterada

- `npm run lint`;
- `npm run test:coverage` com **100% exatos**;
- `npm run build`;
- `npm run build:cdn`;
- `npm run build:storybook`.

Nenhum `99.x%` atende ao critério. Também não considerar a tarefa concluída com testes verdes que emitam erros/warnings inesperados no terminal ou console.

## Critérios de aceite

- Formation usa ICON no cabeçalho e apenas SCREENSHOT no carousel.
- Formation lista Technologies relacionadas com chips ordenados e, quando interativos, abre o modal correto.
- A entidade/tabela/CRUD Tag e as tabelas `technology_tag`/`project_tag` foram removidas do estado final.
- Toda Technology preserva suas classificações por `stack` e `type` enums; nenhum dos 120 vínculos existentes é perdido silenciosamente.
- O snapshot final representa o banco migrado e mantém todos os dados não explicitamente descartados.
- Não existem `tagIds` em Project/Technology nem heurísticas de slug para resolver stack/type.
- Todos os chips aplicáveis exibem highlights primeiro e ordem alfabética localizada em cada grupo.
- Skills possui filtro funcional de frequência combinado aos demais filtros.
- Customer detail mostra summary localizado somente quando preenchido.
- Image Asset read mostra corretamente todas as sete relações, inclusive Jobs.
- Todos os pickers relacionais exibem catálogos completos, inclusive assets fora da primeira página.
- Sort order é único, contíguo e automaticamente reordenado nas nove entidades.
- Chrome DevTools confirma os fluxos, sem erros de console/network e sem perda de relações após update.
- Todos os repositórios alterados passam lint, build e coverage exata de 100%.

## Restrições e cuidados

- Não reescrever migrations históricas; criar migration incremental nova.
- Não executar reset/destruição do banco local.
- Não remover o componente visual `app-tag-button` nem tipos visuais de tag/chip.
- Não confiar apenas no snapshot: auditar o banco real antes dos drops.
- Não usar `pageSize` arbitrariamente alto como substituto para paginação completa.
- Não atualizar relações ausentes em payload parcial como arrays vazios.
- Não misturar reordenação de entidades com `sortOrder` das tabelas relacionais, que preservam ordem interna própria.
- Não alterar header, footer, autenticação ou rotas públicas fora das dependências diretas desta refatoração.
- Preservar alterações preexistentes do usuário e revisar o diff final por repositório.

## Assumptions

- O banco local e o snapshot atual são as fontes para validar a preservação dos dados.
- A sessão administrativa local continuará autenticada para a validação visual.
- Os registros `project_tag` podem ser descartados conforme solicitado, depois da auditoria obrigatória.
- A coexistência atual de uma Tag STACK e uma Tag DOMAIN por Technology será normalizada em `Technology.stack` e `Technology.type`; essa é a única forma lossless compatível com os filtros atuais.
- Não será necessário alterar a `hans-ui-design-lib` para este escopo, salvo descoberta comprovada durante a implementação.
