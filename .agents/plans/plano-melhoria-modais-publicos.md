# Plano de melhoria dos modais públicos

## Objetivo

Padronizar e enriquecer os modais públicos de Technologies, Experiences, Education e Projects, preservando o modal de Spoken Languages, reutilizando componentes compartilhados do Portfolio e evoluindo a `hans-ui-design-lib` somente nos pontos realmente genéricos: progress bar e suporte nativo a radar chart no `hans-chart`.

O escopo é exclusivamente a experiência pública. Os modais administrativos e os contratos de mutation dos CRUDs não serão alterados.

## Situação inicial validada

- `app-technology-modal` já existe em `src/app/shared/technology-modal`, mas apenas adapta Technology para o `app-tag-modal`, que fixa `modalSize="small"`.
- `hans-chart` suporta atualmente line, bar, pie, doughnut e mixed. `optionOverrides` existe, mas não é uma base adequada para simular radar porque o helper ainda cria eixos e séries cartesianas. Radar deve virar um tipo nativo.
- A API de Technology já entrega `experienceMetrics.byContext`, com `totalMonths` para `PROFESSIONAL`, `PERSONAL`, `ACADEMIC` e `STUDY`.
- Os enums reais são:
  - `TechnologyLevel`: `BASIC`, `INTERMEDIATE`, `ADVANCED`;
  - `TechnologyUsageFrequency`: `STUDYING`, `PREVIOUSLY_USED`, `OCCASIONAL`, `FREQUENT`.
- O modal de Experience é local à página, usa `hans-tag` diretamente para clientes e tecnologias e não emite abertura de Technology a partir do detalhe.
- O modal de Project também é local à página. O view model já contém `galleryItems`, porém o modal não renderiza o `hans-carousel`.
- Education e Spoken Languages ainda são cards estáticos da página Skills e reutilizam indevidamente `TechnologyModalItem`/`TechnologyModalComponent`, embora já existam endpoints públicos e relações com Image Assets para Formations e Spoken Languages.
- O Portfolio consome a lib por CDN versionada no `src/index.html`; portanto a entrega requer publicar/servir uma nova versão compatível e atualizar conjuntamente JS e CSS.
- O radar seguirá o modelo oficial do Apache ECharts, com coordinate system e series próprios para radar. Referências: [exemplo oficial](https://echarts.apache.org/examples/en/editor.html?c=radar) e [documentação oficial](https://echarts.apache.org/en/option.html).

## Decisões de comportamento

### Technology

- O modal será `large`, centralizado e dividido em duas colunas em telas largas.
- A coluna esquerda preservará imagem, categoria, experiência consolidada, tipo, stack e projetos.
- Knowledge level e Usage frequency deixarão de ser linhas textuais e serão renderizados com `hans-progress-bar`, mantendo label e valor textual traduzidos para não depender apenas de cor/posição.
- A coluna direita conterá um `hans-chart` radar com exatamente quatro indicadores, nesta ordem estável:
  1. Professional;
  2. Personal;
  3. Academic;
  4. Study.
- Cada valor será `experienceMetrics.byContext[context].totalMonths`; contextos ausentes serão tratados como zero.
- Todos os eixos usarão a mesma escala para permitir comparação honesta. O máximo será o maior valor encontrado arredondado para o próximo múltiplo de 12, com mínimo de 12 meses.
- O tooltip será habilitado e localizado. Ao passar o mouse/foco sobre a série, exibirá o nome da tecnologia e uma linha por indicador no formato `Contexto: N mês/meses`, usando pluralização de cada locale. Assim, o valor em meses de cada indicador ficará explícito, inclusive quando for zero.
- O tooltip usará `renderMode: 'richText'`/conteúdo textual seguro; não será montado HTML com dados da API.
- Em larguras menores, as colunas serão empilhadas, com os dados primeiro e o radar abaixo, sem criar scroll/padding concorrente com o `hans-modal`.

### Progressos dos enums

| Domínio | Valor | Percentual | Cor semântica |
| --- | --- | ---: | --- |
| Knowledge level | `BASIC` | 33% | `danger` |
| Knowledge level | `INTERMEDIATE` | 66% | `warning` |
| Knowledge level | `ADVANCED` | 100% | `success` |
| Usage frequency | `STUDYING` | 25% | `danger` |
| Usage frequency | `PREVIOUSLY_USED` | 50% | `warning` |
| Usage frequency | `OCCASIONAL` | 75% | `warning` |
| Usage frequency | `FREQUENT` | 100% | `success` |

Os percentuais são uma representação ordinal de domínio, não uma métrica calculada. As cores virão dos tokens `--danger-*`, `--warning-*` e `--success-*` da lib, sem hexadecimal no Portfolio.

### Experience

- Preservar tamanho `large`, placement `right`, hierarquia e conteúdo atuais.
- Migrar o componente da pasta da página para `src/app/shared/experience-modal`.
- Renderizar clientes e tecnologias por `app-tag-button`, eliminando o `hans-tag` cru e as cores inconsistentes.
- Tecnologias continuarão interativas e emitirão `TechnologyModalItem` para abrir o modal de Technology.
- Clientes usarão o mesmo componente no modo visual não interativo. Para isso, `app-tag-button` ganhará uma entrada opcional `interactive` (default `true`); quando `false`, manterá exatamente a composição visual do tag, sem criar um botão sem ação.
- Atualizar a página Experiences para coordenar o fechamento/abertura entre Experience e Technology sem deixar dois overlays ativos.

### Education

- Criar `app-education-modal` em `src/app/shared/education-modal`.
- Deixar de adaptar Education como `TechnologyModalItem`.
- Carregar Formations pelo `FormationsService` público e mapear campos localizados, instituição, degree type, período, resumo, technologies, links e `imageAssets` para um view model próprio.
- Renderizar `hans-carousel` somente quando houver ao menos uma imagem válida vinculada.
- Com imagens: `modalSize="large"` e layout responsivo com informações e carousel.
- Sem imagens: manter a experiência compacta atual com `modalSize="small"` e sem espaço reservado para galeria.
- Ordenar imagens pela ordem relacional quando fornecida e, na ausência dela, preservar a ordem da API; descartar relações sem caminho utilizável e deduplicar por ID/path.
- Usar alt text localizado quando disponível no contrato; enquanto o tipo público não o expuser, usar fallback seguro derivado de título/instituição/filename. Se a API já enviar os campos localizados no payload real, alinhar os tipos do Front sem mudança de backend.

### Projects

- Migrar o componente local para `src/app/shared/project-modal` e manter description, context, período, clientes, stack e links.
- Renderizar `hans-carousel` somente quando `galleryItems.length > 0`.
- Com imagens: usar `modalSize="large"` e compor conteúdo/galeria responsivamente.
- Sem imagens: usar `modalSize="medium"`, que representa o modal textual sem a largura extra da galeria. Essa regra substitui o `large` atualmente hardcoded e materializa o comportamento condicional solicitado.
- Reaproveitar o mapeamento de `ProjectCaseViewModel.galleryItems`, revisando apenas ordenação, deduplicação, alt/title/description localizados e URLs relativas/absolutas.
- Manter a abertura do Technology modal a partir dos tags de stack e coordenar os overlays como já ocorre na página.

### Spoken Languages

- Criar `app-spoken-language-modal` em `src/app/shared/spoken-language-modal`, com view model próprio.
- Manter integralmente o visual atual: modal pequeno, imagem/bandeira, subtítulo e linhas de detalhe; não adicionar carousel nem alterar tamanho/layout.
- Passar a carregar os registros pelo `SpokenLanguagesService` público para eliminar o uso indevido de `TechnologyModalItem`, preservando ordem, textos e fallback visual atuais.

## Evolução da `hans-ui-design-lib`

### Novo `HansProgressBar`

Criar `src/components/ProgressBar/` com o padrão completo da lib:

- `ProgressBar.tsx`;
- `ProgressBar.types.ts`;
- `ProgressBar.test.tsx`;
- `ProgressBar.stories.tsx`;
- `ProgressBar.mdx`;
- `progress-bar.scss`;
- helpers e testes separados caso a normalização/classe/ARIA deixe de ser trivial.

Contrato público proposto:

- `value: number`;
- `min?: number` (default 0);
- `max?: number` (default 100);
- `label?: string`;
- `valueLabel?: string`;
- `progressColor?: Color` (default `primary`);
- `progressSize?: Size` (default `medium`);
- `showValue?: boolean`;
- `customClasses?: string`;
- atributos HTML/ARIA compatíveis.

Comportamento:

- normalizar valores abaixo/acima dos limites e tratar `NaN`, limites iguais e limites invertidos;
- expor `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow` e um nome acessível por label/`aria-label`;
- manter o valor textual visível, permitindo que enum traduzido e percentual sejam comunicados sem depender da cor;
- usar apenas tokens da lib para track, fill, texto, estados e temas;
- documentar React e Web Component (`<hans-progress-bar>`), tamanhos, cores, limites, acessibilidade e exemplos ordinais.

Integração pública:

- exportar componente e tipos em `src/index.ts`;
- importar SCSS em `src/styles/index.css`;
- registrar `hans-progress-bar` em `src/index-wc.ts` com `HansProgressBarPropsList`;
- validar passagem de numbers/strings pelo wrapper web component.

### Radar nativo no `HansChart`

Evoluir Chart sem quebrar os contratos existentes:

- adicionar `radar` a `HansChartType`/`HansChartSeriesType`;
- introduzir `HansChartRadarIndicator` (`name`, `max`, `min?`) e ponto radar (`name`, `value: number[]`);
- adicionar `radarIndicators` como property prop no schema/Web Component;
- adicionar formatter de valor do tooltip como property prop, com assinatura tipada para receber valor, índice e indicador;
- separar no helper as construções cartesian, pie/doughnut e radar;
- para radar, não criar `grid`, `xAxis` ou `yAxis`;
- montar `radar.indicator` e `series.type = 'radar'` nativamente;
- definir tooltip radar com trigger `item`, texto seguro e associação posicional entre indicator e valor;
- manter `optionOverrides` como último merge para ajustes avançados, sem usá-lo para substituir toda a estrutura base;
- garantir paleta, tema, resize, loading, empty state e point click existentes.

Cobertura da lib:

- helpers: escala/indicadores, série radar, ausência de eixos cartesianos, tooltip, formatter customizado, zero e dados incompletos;
- componente: render radar, atualização de props, resize/dispose, tooltip option e compatibilidade com demais tipos;
- progress bar: defaults, clamp, cores, tamanhos, labels, ARIA e Web Component props;
- stories/MDX: radar simples, radar com tooltip em unidade, progressos de 25/50/75/100%, temas e acessibilidade.

### Release/consumo

1. Executar na lib: `npm run lint`, `npm run test:coverage`, `npm run build`, `npm run build:cdn` e `npm run build:storybook`.
2. Gerar release patch da lib conforme o fluxo documentado.
3. Atualizar no Portfolio as URLs de CSS e JS no `src/index.html` para a mesma nova versão; nunca misturar versões.
4. Antes da publicação, validar localmente com o build CDN/local indicado pela lib, para não depender do deploy externo durante o desenvolvimento.

## Refatoração de view models e dados no Portfolio

- Remover `TechnologyModalItem` como union informal de três domínios.
- Manter `TechnologyModalItem` exclusivo de Technology e acrescentar:
  - enums brutos `level` e `frequency` (sem substituir pelo label antes do mapeamento);
  - labels traduzidos correspondentes;
  - `contextMetrics` com key, label e `totalMonths`;
  - configuração já normalizada das duas progress bars e do radar.
- Criar `EducationModalItem`, `SpokenLanguageModalItem` e contratos compartilhados de gallery quando fizer sentido.
- Reaproveitar `ProjectGalleryItemViewModel` ou promover um contrato mínimo comum para itens do `hans-carousel`, evitando duplicar conversores.
- Centralizar helpers puros para:
  - construir escala do radar;
  - mapear level/frequency para percentual/cor;
  - formatar tooltip localizado de meses com singular/plural;
  - normalizar/deduplicar Image Assets;
  - decidir o tamanho do modal a partir da presença de galeria.
- Não transferir regras de domínio para a lib: a lib conhece números, cores e labels; o Portfolio conhece os enums e seus significados.

## Integração da página Skills

- Injetar `TechnologiesService`, `FormationsService` e `SpokenLanguagesService`.
- Substituir `selectedSkillSignal<TechnologyModalItem>` por seleções separadas/discriminadas para Technology, Education e Spoken Language.
- Mapear cards de cada coleção para seu modal próprio.
- Preservar ordenação visual e conteúdo localizado dos cards atuais; remover constantes estáticas somente depois de equivalência comprovada com a API.
- Manter loading/error por seção para uma falha de Formations ou Languages não ocultar o catálogo de Technologies.
- Renderizar os três modais compartilhados e garantir que somente um esteja aberto por vez.
- Atualizar as traduções `en-us`, `pt-br` e `es-es` para títulos do radar, contextos, unidade/plural de meses, labels do carousel, alt fallbacks e textos vazios/erro.

## Integração das páginas Experiences e Projects

- Atualizar imports para os novos componentes em `shared` e remover as pastas locais após migração completa.
- Em Experience, adaptar customer e technology para `TagButtonViewModel`; tecnologias emitem abertura do modal e clientes usam `interactive=false`.
- Em Project, ligar `galleryItems` ao `[items]` de `hans-carousel` por property binding, com ID acessível e labels traduzidos.
- Preservar o estado/scroll das páginas ao abrir e fechar modais.
- Garantir troca limpa entre modal de domínio e Technology modal, sem dois `hans-modal` simultâneos e sem body scroll lock residual.

## Responsividade, acessibilidade e tema

- Duas colunas somente quando houver largura útil; em mobile/tablet, empilhar conteúdo e limitar chart/carousel a 100% da coluna.
- Não adicionar wrappers com `overflow` ou padding que concorram com `hans-modal`.
- Progress bars devem ter label/valor textual e semântica ARIA.
- Radar deve ter título/descrição textual acessível ao redor do canvas e uma lista-resumo invisível ou visível como fallback para os quatro contextos, porque canvas e tooltip por hover não bastam para teclado/leitor de tela.
- Carousel deve receber `imageAlt`, `carouselId` estável e controles/indicadores da lib; uma única imagem continua exibida sem controles de navegação úteis.
- Validar light/dark e temas alternativos usando tokens, sem cores fixas no Portfolio.
- Preservar foco inicial, Escape, dismiss, backdrop e restauração de scroll/foco do `hans-modal`.

## Sequência de implementação

1. Criar branch/estado de referência e registrar screenshots atuais dos cinco modais.
2. Implementar e documentar `HansProgressBar` na lib.
3. Adicionar radar e tooltip tipados ao `HansChart`, incluindo stories/MDX e testes de regressão.
4. Validar e gerar uma versão local da lib; integrar CSS/JS locais no Portfolio durante o desenvolvimento.
5. Evoluir view models/helpers do Technology modal, incluindo progressos, quatro contextos, escala e tooltip localizado.
6. Reestruturar `app-technology-modal` como modal large de duas colunas.
7. Criar `app-education-modal` e `app-spoken-language-modal`; conectar Skills às APIs públicas e separar os estados de seleção.
8. Migrar Experience para `shared`, evoluir `app-tag-button` com modo não interativo e padronizar clientes/stack.
9. Migrar Project para `shared` e adicionar carousel/tamanho condicional.
10. Atualizar traduções e remover tipos, constantes, componentes locais e estilos que ficaram obsoletos.
11. Rodar toda a validação automatizada da lib e do Portfolio.
12. Publicar release patch da lib, atualizar as duas URLs versionadas do Portfolio e repetir build/teste integrado.
13. Validar visualmente todos os cenários no Chrome DevTools local.

## Testes e critérios de aceite

### `hans-ui-design-lib`

- 100% de statements, branches, functions e lines em todo código alterado.
- `HansProgressBar` documentado, acessível, temável, exportado e disponível como Web Component.
- `HansChart` renderiza radar sem eixos cartesianos e sem regressão nos tipos existentes.
- Tooltip do radar associa corretamente cada indicator ao valor, usa formatter localizado recebido pelo consumidor e exibe zero.
- `npm run lint`, `npm run test:coverage`, `npm run build`, `npm run build:cdn` e `npm run build:storybook` passam sem novos warnings.

### Portfolio

- Technology abre large, duas colunas em desktop e uma coluna em telas estreitas.
- Level e frequency exibem texto traduzido, preenchimento e cor conforme a tabela de mapeamento.
- Radar sempre mostra os quatro contextos, usa `totalMonths`, escala comum e dados atualizados da tecnologia selecionada.
- Tooltip mostra nome/contexto e total em mês/meses nos três idiomas, inclusive valor zero.
- Experience mantém layout/placement, e clientes e stack têm o padrão visual de `app-tag-button`; tecnologias continuam abrindo seus detalhes.
- Spoken Languages permanece visualmente igual ao estado inicial.
- Education com imagens abre large e mostra carousel; sem imagens abre small e não deixa espaço vazio.
- Project com imagens abre large e mostra carousel; sem imagens abre medium e não deixa espaço vazio.
- Imagens inválidas não quebram o modal; itens válidos permanecem acessíveis e ordenados.
- Somente um modal fica aberto por vez e não há erro de console, scroll duplo ou body bloqueado após fechar.
- Troca de idioma com modal aberto atualiza labels, dados, radar e tooltip imediatamente.
- Testes cobrem sucesso, loading, erro, vazio, imagens 0/1/N, contextos ausentes, todos os enums e navegação entre modais.
- `npm run lint`, `npm run test:coverage -- --watch=false` e `npm run build` passam com 100% no escopo alterado.

## Validação visual via Chrome DevTools

- Testar `/skills`, `/experiences` e `/projects` no ambiente local.
- Technology: BASIC/INTERMEDIATE/ADVANCED e as quatro frequências; radar com valores diferentes, todos zero e contexto ausente; hover no radar confirmando o tooltip em meses.
- Education/Project: registros sem imagem, com uma imagem e com várias imagens; navegação e indicadores do carousel.
- Experience: clientes e tecnologias em todos os grupos, wrapping em larguras menores e abertura do Technology modal.
- Spoken Languages: comparar antes/depois para confirmar ausência de alteração visual.
- Repetir em light/dark, desktop, tablet e mobile, e nos locales `pt-br`, `en-us` e `es-es`.
- Verificar console, network, foco, Escape, backdrop, scroll lock, imagens quebradas e ausência de requests administrativos.

## Fora de escopo

- Alterações de schema, migration, seed ou snapshot do backend.
- Mudança dos cálculos de `experienceMetrics`; o backend continua fonte de verdade dos meses.
- Mudança visual do modal de Spoken Languages.
- Carousel em Experience ou Technology.
- Alterações nos modais administrativos.

## Assumptions

- Os endpoints públicos de Formations e Spoken Languages continuarão disponíveis e fornecerão as relações de Image Assets já existentes.
- `totalMonths` é a unidade canônica do radar; labels de anos/meses existentes não serão reconvertidos.
- O tooltip convencional do radar apresenta a série e as quatro linhas indicator/valor em uma única interação, que é mais legível e acessível do que tentar criar hotspots invisíveis por eixo.
- O tamanho compacto sem galeria será `small` para Education e `medium` para Project; o tamanho com galeria será `large` para ambos.
- A publicação da lib será patch e o Portfolio atualizará CSS e JS para exatamente a mesma versão.
