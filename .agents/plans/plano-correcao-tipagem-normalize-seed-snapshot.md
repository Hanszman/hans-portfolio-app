# Plano de correção da tipagem do normalizador de seed snapshot

## Objetivo

Eliminar os diagnósticos TypeScript ainda exibidos pelo VS Code em `hans-portfolio-api/prisma/normalize-seed-snapshot.ts`, preservando a compatibilidade com snapshots legados e garantindo, por tipo e por teste, que a normalização não descarte nenhuma coleção ou relação do snapshot canônico.

O escopo é o `hans-portfolio-api`. O `hans-portfolio-app` e a `hans-ui-design-lib` não precisam ser alterados para esta correção.

## Situação inicial confirmada

Os três diagnósticos mostrados no editor têm a mesma origem estrutural:

1. `omitLegacyKeys(rawSnapshot, ...)` rejeita `RawPortfolioSeedSnapshot` porque o helper exige `TInput extends Record<string, unknown>`. Uma interface com propriedades conhecidas não possui automaticamente uma assinatura de índice para qualquer `string` e, portanto, não satisfaz esse constraint.
2. Como a chamada anterior não é tipada corretamente, o spread de `currentSnapshot` não consegue provar que preserva todas as propriedades obrigatórias de `PortfolioSeedSnapshot`.
3. O `return` e o `satisfies PortfolioSeedSnapshot` passam a reportar como ausentes coleções que existem no contrato bruto e deveriam atravessar a normalização sem alterações, incluindo `imageAssets`, `portfolioSettings`, `technologyContexts`, `formationTechnologies` e outras relações obrigatórias.

O problema não deve ser resolvido com `as Record<string, unknown>`, `as PortfolioSeedSnapshot`, assinatura de índice artificial em `RawPortfolioSeedSnapshot` ou desativação do diagnóstico. Essas opções esconderiam possíveis perdas futuras de dados.

## Decisão de implementação

### Helper de omissão seguro

Refatorar `omitLegacyKeys` para trabalhar com objetos de propriedades conhecidas:

- trocar o constraint incompatível `Record<string, unknown>` por `object`;
- aceitar uma lista readonly de chaves realmente pertencentes ao objeto;
- retornar `Omit<TInput, TKey>` preservando todas as demais propriedades conhecidas;
- manter a cópia antes da remoção, sem mutar o snapshot recebido;
- evitar casts amplos no consumidor; se um cast localizado for inevitável dentro do helper para executar `delete`, ele deve ficar encapsulado, documentado e coberto por testes.

Contrato-alvo conceitual:

```ts
function omitLegacyKeys<
  TInput extends object,
  const TKeys extends readonly (keyof TInput)[],
>(record: TInput, keys: TKeys): Omit<TInput, TKeys[number]>;
```

A implementação final deve ser compatível com a versão de TypeScript do projeto e com ESLint/Prettier.

### Composição explícita do snapshot canônico

Não depender apenas de um spread opaco para formar o resultado final. Construir um `normalizedSnapshot` tipado ou validado com `satisfies PortfolioSeedSnapshot`, deixando explícitas as três categorias de dados:

- coleções normalizadas/reconstruídas: Projects, Experiences, Formations, Technologies, Spoken Languages, Customers, Jobs e relações que podem receber dados legados;
- coleções clonadas durante a normalização, como Links e relações de links/imagens;
- coleções canônicas preservadas diretamente, como `imageAssets`, `portfolioSettings`, `technologyContexts`, `formationTechnologies`, `experienceTechnologies`, `projectTechnologies`, `experienceCustomers`, `experienceJobs` e `projectExperiences`.

As chaves legadas `tags`, `technologyTags` e `projectTags` não podem aparecer na saída. A composição explícita deve fazer o compilador acusar qualquer nova propriedade obrigatória adicionada futuramente a `PortfolioSeedSnapshot` até que o normalizador decida conscientemente como tratá-la.

### Relação entre os contratos bruto e canônico

Revisar `RawPortfolioSeedSnapshot` e `PortfolioSeedSnapshot` para reduzir duplicação sem perder clareza:

- o contrato bruto deve permitir somente as diferenças legadas reais: records com `icon`, URLs antigas, `category`, tags antigas e `technologyLinks` opcional;
- todas as coleções atuais não transformadas devem continuar obrigatórias e tipadas;
- considerar compor o tipo bruto a partir do canônico com `Omit<PortfolioSeedSnapshot, ...>` mais as substituições legadas, desde que o resultado permaneça legível e não torne campos atuais indevidamente opcionais;
- manter `type` como fonte canônica da Technology e `category` somente como entrada legada removida da saída.

## Etapas de execução

1. Reproduzir os diagnósticos com o mesmo projeto TypeScript usado pelos scripts Prisma:
   - `npx tsc --noEmit -p tsconfig.scripts.json`;
   - registrar os erros e confirmar que correspondem aos três avisos do VS Code.
2. Criar testes unitários específicos para `omitLegacyKeys` ou exercitá-lo integralmente pelos testes públicos do normalizador.
3. Alterar o constraint e a inferência de chaves do helper, sem adicionar index signature aos contratos de domínio.
4. Reestruturar o retorno de `normalizePortfolioSeedSnapshot` para declarar todas as coleções obrigatórias do snapshot canônico.
5. Se trouxer benefício real de manutenção, compor `RawPortfolioSeedSnapshot` a partir de `PortfolioSeedSnapshot`, mantendo explícitas as substituições legadas.
6. Rodar o typecheck dos scripts Prisma e confirmar zero diagnósticos no arquivo.
7. Executar o normalizador contra fixtures atuais e legadas.
8. Rodar `prisma:seed:snapshot` no banco local correto e revisar o diff do JSON antes de aceitá-lo.
9. Adicionar um script oficial de typecheck ao `package.json`, incluindo `prisma/**/*.ts`, para impedir que `nest build` verde volte a ocultar erros dos scripts fora de `src`.
10. Incluir esse typecheck nos gates documentados/CI aplicáveis do Back-End.

## Testes de regressão obrigatórios

Adicionar ou ajustar testes para provar que:

- um `RawPortfolioSeedSnapshot` completo é aceito sem cast no chamador;
- `tags`, `technologyTags` e `projectTags` são removidos da saída;
- propriedades legadas internas, como `icon`, `category` e URLs antigas, são removidas somente dos registros aplicáveis;
- `imageAssets`, `portfolioSettings` e `technologyContexts` permanecem idênticos em conteúdo;
- todas as relações canônicas são preservadas, especialmente:
  - `formationTechnologies`;
  - `experienceTechnologies`;
  - `projectTechnologies`;
  - `experienceCustomers`;
  - `experienceJobs`;
  - `projectExperiences`;
- relações reconstruídas de links e Image Assets continuam presentes e deduplicadas;
- o input não é mutado;
- a saída satisfaz `PortfolioSeedSnapshot` em tempo de compilação, sem `as PortfolioSeedSnapshot`;
- uma propriedade obrigatória ausente em fixture de compile-time é rejeitada pelo TypeScript;
- snapshot atual e snapshot legado produzem uma estrutura canônica completa.

## Gate permanente de TypeScript

O `nest build` não é suficiente para este caso porque o arquivo fica em `prisma/`, fora do fluxo principal de compilação da aplicação. Padronizar um comando dedicado, por exemplo:

```json
"typecheck": "tsc --noEmit -p tsconfig.json && tsc --noEmit -p tsconfig.scripts.json"
```

Antes de adotar exatamente esse comando, confirmar se o primeiro projeto já cobre `src` e testes como esperado. Se necessário, criar um `tsconfig.typecheck.json` que inclua explicitamente `src/**/*.ts`, `test/**/*.ts` e `prisma/**/*.ts`, sem alterar a configuração de emissão do build Nest.

O critério é simples: o mesmo erro que aparece no VS Code deve falhar em terminal e CI.

## Validação dos dados e do snapshot

Antes e depois da correção:

1. Registrar contagens de todas as coleções do snapshot.
2. Comparar as tuplas das tabelas relacionais por seus IDs.
3. Executar `npm run prisma:seed:snapshot` somente no ambiente local confirmado.
4. Revisar o diff de `portfolio-seed.snapshot.json`.
5. Aceitar apenas mudanças de serialização intencionais; esta correção de tipagem, isoladamente, não deve remover nem alterar dados.
6. Confirmar que uma segunda execução gera diff vazio, provando idempotência.

## Validações automatizadas

Executar no `hans-portfolio-api`:

- `npm run typecheck` após sua inclusão;
- `npm run lint`;
- `npm run format:check`;
- `npm run test:coverage` com 100% exatos em statements, branches, functions e lines;
- `npm run build`;
- `npm run prisma:format`;
- `npm run prisma:validate`;
- `npm run prisma:generate`;
- `npm run prisma:seed:snapshot`, seguido de revisão do diff e teste de idempotência.

Além disso:

- abrir novamente `prisma/normalize-seed-snapshot.ts` no VS Code e confirmar zero itens no painel Problems;
- não aceitar terminal verde com warnings ou erros inesperados;
- fazer busca final por casts amplos usados para contornar `PortfolioSeedSnapshot` ou `RawPortfolioSeedSnapshot`.

## Critérios de aceite

- Os três diagnósticos mostrados nos prints não aparecem mais no VS Code nem no typecheck de terminal.
- `omitLegacyKeys` aceita interfaces tipadas sem exigir assinatura de índice arbitrária.
- O retorno do normalizador enumera ou preserva, de forma verificável pelo compilador, todas as propriedades de `PortfolioSeedSnapshot`.
- Nenhum cast amplo mascara propriedade ausente.
- Chaves legadas são removidas e todas as coleções atuais permanecem no resultado.
- O snapshot versionado não perde dados nem relações e a exportação é idempotente.
- O Back-End passa typecheck, lint, format check, coverage exata de 100%, build e validações Prisma.
- Um erro futuro em qualquer script de `prisma/**/*.ts` falha no gate automatizado, mesmo que `nest build` continue verde.

## Restrições

- Não editar migrations históricas e não executar reset destrutivo do banco.
- Não enfraquecer `PortfolioSeedSnapshot` tornando coleções obrigatórias opcionais para eliminar o erro.
- Não adicionar `[key: string]: unknown` aos contratos apenas para satisfazer o helper.
- Não regenerar o snapshot sem revisar o diff completo.
- Preservar alterações preexistentes do usuário em ambos os repositórios.
