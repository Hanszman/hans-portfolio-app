# Plano de unificação de Technology Type e correção dos reads relacionais

## Objetivo

Eliminar a duplicidade conceitual entre `Technology.category` e `Technology.type`, tornando `type` a única fonte de verdade para a classificação da tecnologia, corrigir o normalizador do snapshot versionado, aperfeiçoar o modal público de Formations e o layout dos filtros de Skills e garantir que todos os reads administrativos exponham corretamente as relações existentes nos dois sentidos.

O escopo principal abrange `hans-portfolio-api` e `hans-portfolio-app`. A `hans-ui-design-lib` não deve ser alterada, pois os componentes necessários já existem; ela só entrará no escopo caso a implementação demonstre uma lacuna genérica e reproduzível que não possa ser resolvida pela composição correta no Portfolio.

## Situação inicial confirmada

- O schema Prisma ainda possui simultaneamente:
  - `Technology.category: TechnologyCategory`;
  - `Technology.type: TechnologyType`.
- `TechnologyCategory` representa uma segunda classificação concorrente e aparece em contratos, filtros, dashboard, mocks, helpers, formulários administrativos, traduções e testes dos dois projetos.
- O snapshot atual contém os dois valores. A regra definida para a migração é inequívoca: **o valor existente em `type` é canônico e sempre vence**; `category` não deve sobrescrever nem alterar `type`.
- `prisma/normalize-seed-snapshot.ts` retorna um spread de um objeto com chaves legadas omitidas. Essa inferência perde a garantia de que todas as coleções obrigatórias de `PortfolioSeedSnapshot` permanecem presentes, gerando o erro de TypeScript mostrado no VS Code. Entre as propriedades reportadas estão `imageAssets`, `portfolioSettings`, `technologyContexts`, `formationTechnologies` e outras relações obrigatórias.
- O modal público de Formation já recebe Technologies relacionadas, mas:
  - a seção está presa à coluna esquerda do grid superior e deixa uma área vazia à direita;
  - o view model contém somente `slug` e `name`;
  - os chips não recebem o ícone da Technology;
  - não há emissão de seleção, portanto clicar em uma Technology não abre seu modal.
- Na tela Skills, o grid automático atual usa três colunas em resoluções médias. Isso posiciona Stack, Type e Level na primeira linha e Frequency isolada na segunda, enquanto o layout desejado é Stack + Type na primeira linha e Level + Frequency na segunda.
- O Back-End já inclui relações de Image Asset com Projects, Experiences, Technologies, Formations, Spoken Languages, Customers e Jobs, inclusive a relação inversa de Jobs.
- No Front-End, o formulário de Image Assets normaliza IDs diretos e registros relacionais aninhados, mas o mapper do read usa apenas campos como `jobIds`, `formationIds` e `customerIds`. Ele ignora coleções aninhadas como `jobs`, `formations` e `customers`, o que explica o caso comprovado `Job -> 4mti.jpg` aparecer no read de Job enquanto `4mti.jpg -> Jobs` aparece vazio no read de Image Asset.
- A página pública `/skills` foi inspecionada localmente: os chips de Technology no modal de Formation recebem foco, mas o clique não abre o modal de Technology.
- A rota local `/admin` redirecionou para `/login` durante o levantamento. A validação visual dos reads administrativos exigirá que o usuário autentique a sessão no Chrome DevTools antes dessa etapa, caso ela ainda esteja expirada.

## Decisões de domínio

### `Technology.type` como única classificação

- Remover `TechnologyCategory` do schema Prisma e remover a coluna `technology.category`.
- Preservar `TechnologyType` e a coluna `technology.type` como única fonte de verdade.
- Não criar um novo mapeamento de `category` para `type` quando `type` já estiver preenchido.
- Se uma entrada exclusivamente legada não possuir `type`, o normalizador poderá usar somente as regras legadas já documentadas para resolver `TechnologyType`; `category` não deve substituir um `type` válido nem ser persistida no snapshot final.
- Se não for possível determinar um `type` canônico para um registro legado, a normalização deve falhar com uma mensagem explícita, em vez de escolher um valor silenciosamente.
- `stack`, `level` e `frequency` permanecem independentes e sem mudança semântica.

### Contrato final esperado

Uma Technology deverá expor, no que diz respeito à taxonomia:

- `stack: TechnologyStack`;
- `type: TechnologyType`;
- `level: TechnologyLevel`;
- `frequency: TechnologyUsageFrequency`.

Não deverá existir `category`, `TechnologyCategory`, `categoryFilter`, `categoryLabel`, `categoryOptions` ou qualquer equivalente ativo em banco, API, UI, mocks, fixtures, traduções ou documentação. Migrations históricas já aplicadas não devem ser reescritas.

## Migração segura de banco e preservação de dados

### Auditoria prévia

Antes da migration:

1. Exportar/confirmar o snapshot atual e registrar a contagem de Technologies.
2. Consultar a distribuição de `category` e `type` e listar registros em que os dois conceitos aparentem divergir.
3. Confirmar que todas as Technologies possuem `type` válido e não nulo.
4. Guardar uma projeção comparável por Technology contendo `id`, `slug`, `type`, `stack`, `level` e `frequency`.
5. Confirmar `prisma migrate status` e que o banco local correto está conectado.

As divergências serão registradas apenas para auditoria. Conforme a regra funcional, o valor de `type` deve ser mantido sem alteração.

### Migration incremental

Criar uma migration nova, sem editar migrations históricas:

1. Fazer uma assertion/preflight de que nenhum registro possui `type` nulo ou inválido.
2. Remover a coluna `category` de `technology`.
3. Remover o enum PostgreSQL `TechnologyCategory` somente depois de confirmar que não possui outras dependências.
4. Manter intactos IDs, `type`, `stack`, relações, métricas e demais dados de Technology.
5. Validar o schema, gerar o Prisma Client e conferir o status da migration.

Não executar `prisma migrate reset`, não recriar o banco e não usar a migration para regravar valores de `type`.

### Seeds e snapshot

- Remover `category` dos tipos canônicos de seed e de `portfolio-seed.snapshot.json`.
- Atualizar exporter, loader, normalizer, validators e testes.
- Aceitar `category` apenas no tipo de entrada legado, se necessário para compatibilidade de snapshots antigos, mas nunca devolvê-la no `PortfolioSeedSnapshot` normalizado.
- Gerar o snapshot final a partir do banco migrado.
- Comparar antes/depois:
  - mesma quantidade e mesmos IDs de Technologies;
  - mesmo `type` por ID;
  - mesmas relações por tupla de IDs;
  - mesmas demais coleções e conteúdos, salvo a remoção intencional de `category`.
- Revisar o diff do snapshot antes de aceitá-lo; nenhuma relação pode desaparecer como efeito colateral.

## Correção de `normalize-seed-snapshot.ts`

O conserto não deve usar um cast amplo para esconder o erro.

- Construir o retorno canônico explicitamente com todas as propriedades obrigatórias de `PortfolioSeedSnapshot`.
- Preservar no retorno as coleções não transformadas, incluindo `imageAssets`, `portfolioSettings`, `technologyContexts` e todas as tabelas relacionais exigidas pelo contrato.
- Usar `satisfies PortfolioSeedSnapshot` ou um objeto local explicitamente tipado para que futuras coleções obrigatórias causem erro de compilação até serem tratadas.
- Separar claramente:
  - leitura de `RawPortfolioSeedSnapshot`, que pode conter chaves legadas;
  - transformação dos registros afetados;
  - composição do snapshot canônico completo.
- Na normalização de Technology, manter `technology.type` quando presente; o fallback legado só deve ser usado quando o campo estiver ausente.
- Remover `category` do objeto emitido sem remover acidentalmente outras chaves.

Testes obrigatórios do normalizador:

- preserva todas as coleções obrigatórias;
- remove somente chaves legadas esperadas;
- mantém `type` quando `category` diverge;
- resolve `type` apenas para entrada realmente legada sem o campo;
- falha para legado sem resolução possível;
- não altera IDs nem relações;
- o arquivo passa no type-check do editor e no build, sem `as PortfolioSeedSnapshot` inseguro.

## Refatoração do Back-End

Remover `category` de ponta a ponta:

- schema e Prisma Client;
- requests de create/update e queries de filtro;
- responses públicas, administrativas, de dashboard e objetos relacionais aninhados;
- decorators e exemplos Swagger;
- services, selectors, mappers e resource configs;
- agrupamentos, métricas e filtros;
- mocks, factories, fixtures e specs;
- documentação arquitetural e OpenAPI gerado.

Para mutations:

- `type` continua obrigatório no create;
- em update parcial, `type` só muda quando enviado;
- remover qualquer fallback que derive `type` de `category` em payloads atuais;
- rejeitar `category` como campo válido após a migração do contrato.

Executar busca final por `TechnologyCategory` e por identificadores de category associados a Technology. Ocorrências em migrations históricas são permitidas; ocorrências em código ativo, snapshot canônico e documentação atual não são.

## Refatoração do Front-End

### Contratos e formulários de Technology

- Remover `category` dos services/types de API, page view models, mocks e fixtures.
- Remover o campo/select de Category dos formulários administrativos de create/update.
- Manter um único select de Type usando os valores brutos de `TechnologyType` e labels traduzidos.
- Remover Category dos reads, pickers, cards, modais e payloads.
- Remover filtros, helpers e inferências baseados em Category.
- Atualizar dashboard, Home, Experiences, Projects e Skills onde os tipos aninhados ainda carreguem `category`.
- Remover chaves de tradução exclusivas de Category nos três idiomas e reutilizar as chaves canônicas de Type.
- Garantir que `en-us`, `pt-br` e `es-es` permaneçam com o mesmo conjunto exato de chaves e que nenhuma chave removida continue sendo chamada.

### Modal de Formation

Reestruturar `app-education-modal` mantendo a composição responsiva:

- manter o bloco superior em duas colunas quando houver carousel: informações à esquerda e screenshots à direita;
- mover a seção Technologies para fora desse grid superior e fazê-la ocupar `grid-column: 1 / -1`, usando toda a largura disponível;
- em telas menores, manter tudo em uma coluna sem overflow horizontal;
- enriquecer o view model das Technologies com ID/slug, label localizado, ícone/imagem, alt text e highlight necessários ao componente compartilhado;
- usar exatamente o mesmo `app-tag-button`/mapper compartilhado adotado em Home, Experiences e Projects;
- manter a ordenação global vigente: highlights primeiro e, em cada grupo, ordem alfabética localizada;
- emitir a Technology selecionada pelo modal de Formation;
- no componente pai, fechar/limpar o modal de Formation antes de abrir o modal de Technology selecionado, garantindo apenas um overlay e nenhum conteúdo acumulado;
- conservar o carousel exclusivo para `SCREENSHOT` e a imagem principal exclusiva para `ICON`.

Testar:

- seção em largura total com e sem carousel;
- chips com ícone e alt text;
- clique abre a Technology correta;
- troca de idioma atualiza labels e ordenação;
- abertura sequencial não acumula modais;
- responsividade e temas light/dark.

### Layout dos filtros da tela Skills

Substituir a dependência do auto-flow por áreas/linhas explícitas:

- primeira linha desktop: Stack e Type;
- segunda linha desktop: Level à esquerda e Frequency ao lado;
- demais filtros, como Highlight, permanecem na composição já definida sem desalinhamento;
- em viewport estreita, empilhar os campos em uma coluna;
- manter `hans-select-option`, labels traduzidos e a regra atual de reset da paginação para a página 1 quando qualquer filtro mudar.

O layout deve ser validado nas larguras desktop, tablet e mobile, sem espaços artificiais ou controles isolados em uma terceira coluna.

## Correção e auditoria dos reads relacionais administrativos

### Causa de regressão já identificada

O read de Image Assets monta parte dos labels somente a partir de arrays diretos (`jobIds`, `formationIds`, `customerIds` etc.), enquanto a API normalmente entrega registros relacionais aninhados (`jobs[].jobId`, `jobs[].job.id` etc.). O formulário já considera mais formatos do que o read. Essa divergência deve ser eliminada.

### Normalizador compartilhado

Criar/reutilizar um normalizador puro e tipado que, para cada relação, aceite:

- ID direto no registro principal;
- foreign key da linha relacional, como `jobId` ou `imageAssetId`;
- ID do objeto aninhado, como `job.id`;
- coleção ausente ou `null`;
- formatos direto e aninhado simultâneos;
- duplicações, com deduplicação estável.

O mesmo resultado canônico deve alimentar:

- IDs selecionados dos formulários create/update;
- fields do detailed read;
- labels localizados;
- preservação de relações em mutations.

Não reconstruir labels exclusivamente por um catálogo paginado quando o objeto aninhado da resposta já contém o nome. Se um catálogo auxiliar for necessário, carregar todas as páginas e manter fallback para os dados aninhados.

### Matriz de auditoria

Auditar todos os pares de relações expostos pelos CRUDs, não apenas o exemplo Job/Image Asset:

- Image Assets ↔ Projects;
- Image Assets ↔ Experiences;
- Image Assets ↔ Technologies;
- Image Assets ↔ Formations;
- Image Assets ↔ Spoken Languages;
- Image Assets ↔ Customers;
- Image Assets ↔ Jobs;
- Technologies ↔ Formations/Experiences/Projects/Links/Image Assets/Contexts;
- Experiences ↔ Projects/Customers/Jobs/Links/Image Assets/Technologies;
- Projects ↔ Experiences/Links/Image Assets/Technologies;
- demais pares presentes nos contracts atuais.

Para cada par:

1. Confirmar o `include/select` Prisma nos dois endpoints relevantes.
2. Confirmar o formato serializado real pelo Network do Chrome.
3. Alinhar os tipos do Front-End, sem casts que escondam formatos ausentes.
4. Resolver IDs e labels nos dois sentidos.
5. Exibir a mensagem vazia apenas quando todas as fontes canônicas estiverem realmente vazias.
6. Provar que salvar um update sem alterar relações não as remove.

Criar um teste de regressão explícito para `4mti-fullstack-junior ↔ 4mti.jpg`: o Job deve listar o asset e o asset deve listar o Job. Acrescentar fixtures cobrindo as sete relações de Image Asset, mistura de IDs diretos/linhas aninhadas, null e duplicações.

## Sequência de implementação

1. Capturar baseline de `/skills` e, após login, dos reads administrativos e responses de Network.
2. Exportar/validar snapshot pré-migração e executar auditoria de `category`/`type` e relações.
3. Corrigir e testar `normalize-seed-snapshot.ts`, garantindo o retorno canônico completo.
4. Criar a migration incremental que remove `category` e `TechnologyCategory` sem regravar `type`.
5. Atualizar schema, Prisma Client, seeds, snapshot e ferramentas de export/normalização.
6. Remover Category dos contratos, services, Swagger, dashboard e testes do Back-End.
7. Remover Category dos services, models, formulários, filtros, modais, traduções e testes do Front-End.
8. Refatorar o modal de Formation para seção de Technologies em largura total, com ícones e navegação entre modais.
9. Ajustar o grid explícito dos filtros da tela Skills.
10. Implementar o normalizador compartilhado de relações e migrar os mappers dos reads/forms.
11. Auditar toda a matriz relacional e corrigir includes/contracts/mappers restantes.
12. Regenerar o snapshot final e comparar dados e relações com o baseline.
13. Atualizar documentação e executar buscas finais por Category e reconstruções relacionais antigas.
14. Rodar todos os gates automatizados nos repositórios alterados.
15. Executar a matriz final no Chrome DevTools e registrar qualquer necessidade de login antes da validação administrativa.

## Validação via Chrome DevTools

### Skills e Formation

- Abrir `/skills` nos três idiomas.
- Conferir Stack/Type na primeira linha e Level/Frequency na segunda, em desktop e tablet; conferir empilhamento em mobile.
- Abrir uma Formation com Technologies e screenshots.
- Confirmar que a seção Technologies usa toda a largura do modal.
- Inspecionar chips com ícones e nomes corretos.
- Clicar em uma Technology e confirmar a abertura do modal correto, com limpeza do modal anterior.
- Repetir em light/dark e verificar console sem erros.

### Admin e relações

- Se `/admin` redirecionar para `/login`, solicitar ao usuário que autentique a sessão e continuar no mesmo Chrome após o login.
- No read de Jobs, abrir `4mti-fullstack-junior` e confirmar `4mti.jpg` em Image Assets.
- No read de Image Assets, abrir `4mti.jpg` e confirmar o Job correspondente.
- Repetir amostras para todos os pares da matriz relacional.
- Conferir as responses no Network para distinguir falha de API de falha de mapper.
- Abrir update, não alterar relações, salvar e reabrir os dois reads para comprovar preservação bidirecional.
- Validar busca/paginação, troca de idioma e ausência de mensagens vazias incorretas.

### Migração e dados

- Conferir por API/Prisma que `category` não existe mais.
- Confirmar que o `type` de cada Technology é idêntico ao baseline.
- Confirmar que contagens e tuplas relacionais não mudaram.
- Validar que os payloads públicos e administrativos não contêm `category`.

## Testes automatizados obrigatórios

### `hans-portfolio-api`

- schema/migration e preservação de `type`;
- requests/responses sem Category;
- normalizador de snapshot completo e seguro;
- seed/export/snapshot sem perda de coleções;
- includes e respostas bidirecionais das relações;
- controllers/services/dashboard atualizados;
- unitários e e2e com **100% exatos** em statements, branches, functions e lines.

Executar:

- `npm run lint`;
- `npm run format:check`;
- `npm run test:coverage`;
- suíte e2e com coverage conforme os scripts documentados no projeto;
- `npm run build`;
- `npx prisma format`;
- `npx prisma validate`;
- `npx prisma generate`;
- `npx prisma migrate status`;
- scripts documentados de migration, seed e snapshot no banco local seguro.

### `hans-portfolio-app`

- services/types e payloads sem Category;
- formulários/read/modal de Technology somente com Type;
- Formation modal: largura, ícones, clique, saída e troca limpa de modal;
- layout responsivo dos filtros;
- normalizadores e detailed reads para formatos relacionais mistos;
- regressão Job ↔ Image Asset e demais relações;
- tradução com paridade e ausência de chaves não usadas;
- **100% exatos** em statements, branches, functions e lines.

Executar:

- `npm run lint`;
- `npm run test:coverage -- --watch=false`;
- `npm run build`.

### `hans-ui-design-lib`

Não há alteração planejada. Se ela se tornar necessária, executar também lint, coverage exata de 100%, build, build CDN e build Storybook antes de concluir.

Nenhum `99.x%` atende ao critério. Testes verdes com erros ou warnings inesperados no terminal/console também não atendem ao aceite.

## Documentação e limpeza final

- Atualizar README/AGENTS e documentação arquitetural do Back-End para declarar `Technology.type` como taxonomia única.
- Atualizar documentação do Front-End sobre o contrato da Technology e a normalização bidirecional das relações.
- Atualizar Swagger/OpenAPI e exemplos.
- Remover chaves de tradução de Category não utilizadas nos três idiomas.
- Fazer buscas finais por:
  - `TechnologyCategory`;
  - `.category` em contextos de Technology;
  - `categoryFilter`, `categoryOptions`, `categoryLabel`;
  - casts relacionados a formatos antigos;
  - mappers de read que usem apenas `*Ids` ignorando objetos relacionais.
- Revisar o diff por repositório e preservar mudanças preexistentes do usuário.

## Critérios de aceite

- A tabela Technology não possui coluna `category` e o enum `TechnologyCategory` não existe no estado atual do schema.
- Cada Technology preserva exatamente seu `type` anterior; nenhuma divergência é resolvida em favor de Category.
- O snapshot canônico não contém Category, compila sem casts inseguros e preserva todas as coleções e relações obrigatórias.
- `normalize-seed-snapshot.ts` não apresenta erro no VS Code/type-check.
- O modal de Formation usa toda a largura para Technologies e mostra chips com ícone e interação idênticos aos demais modais.
- Clicar em uma Technology da Formation abre seu modal correto sem overlays acumulados.
- Skills organiza os filtros em Stack/Type e Level/Frequency nas duas linhas planejadas, com responsividade preservada.
- Reads administrativos mostram relações reais nos dois sentidos; o caso Job ↔ Image Asset funciona explicitamente.
- Updates que não alteram relações não removem vínculos.
- Chrome DevTools confirma UI, Network e console sem regressões.
- Todos os repositórios alterados passam lint, build e coverage exata de 100% em todas as métricas.

## Restrições e assumptions

- Não reescrever migrations históricas nem executar reset destrutivo do banco.
- O banco local e o snapshot versionado são as fontes de verdade para a auditoria de preservação.
- `type` já está preenchido para os registros atuais; isso será confirmado antes da migration.
- Category será removida, não convertida em uma nova taxonomia.
- A sessão administrativa precisará ser autenticada pelo usuário antes da validação final se continuar redirecionando para `/login`.
- A implementação deve respeitar os padrões de componentes compartilhados, services tipados, traduções e testes documentados nos dois projetos.
