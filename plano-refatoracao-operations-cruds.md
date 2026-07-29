# Refatoração compartilhada das Operations dos CRUDs

## Objetivo

Padronizar os CRUDs administrativos de `PORTFOLIO_SETTINGS`, `TAGS`, `LINKS`,
`IMAGE_ASSETS`, `SPOKEN_LANGUAGES`, `CUSTOMERS`, `JOBS`, `FORMATIONS`,
`TECHNOLOGIES`, `TECHNOLOGY_CONTEXTS`, `EXPERIENCES` e `PROJECTS`.

A implementação deve centralizar shell, estados, ações, listas, detalhes e
confirmação de exclusão em componentes compartilhados, mantendo em cada
entidade apenas estado, API, formulário e mapeamentos específicos.

## Componentes compartilhados

- Renomear integralmente `relation-picker` para
  `operations-relation-picker`, incluindo pasta, arquivos, tipos, classe,
  selector, imports, testes e consumidores.
- Criar `app-operations` como shell compartilhado dos cards administrativos,
  compondo ações, estados e o modal projetado pela entidade.
- Criar `app-operations-item` para os pickers de update/delete e para a
  confirmação de delete.
- Criar `app-operations-detailed-item` para registros do modal de read, com
  campos detalhados e ações Update/Delete.
- Evoluir `app-operations-modal` para centralizar os modos `read`,
  `pick-update`, `pick-delete` e `delete`, preservando projeção de conteúdo
  para formulários `create` e `update`.
- Migrar os 12 CRUDs para a composição compartilhada e remover marcação e
  estilos duplicados.

## Tema

- Criar `--app-operations-surface-color` para light/dark a partir dos tokens
  atuais, usando como referência:
  `color-mix(in srgb, var(--background-color) 88%, var(--white))`.
- Aplicar o token em relation pickers, itens compartilhados e wrappers de
  toggles, sem novas cores literais.

## Experiences e Projects

- Normalizar todas as relações de Experiences: technologies, projects,
  customers, jobs, links e imageAssets.
- Normalizar todas as relações de Projects: technologies, experiences, tags,
  links e imageAssets.
- Aceitar IDs diretos, IDs das linhas relacionais, IDs dos objetos aninhados,
  coleções ausentes e duplicações entre formatos.
- Ler tecnologias das respostas públicas em `record.technologies` e manter
  mutations em `technologyRelations`.
- Corrigir captura e normalização UTC dos date pickers, validar intervalos e
  exibir feedback de validação.
- Garantir que creates válidos chamem `POST /admin/experiences` e
  `POST /admin/projects`.
- Remover inputs duplicados de context/status/environment em Projects e usar
  somente `hans-select-option`.
- Alinhar Project aos enums da API:
  - context: `PROFESSIONAL`, `PERSONAL`, `ACADEMIC`, `STUDY`;
  - status: `COMPLETED`, `IN_PROGRESS`, `ARCHIVED`, `PLANNED`;
  - environment: `FRONTEND`, `BACKEND`, `FULLSTACK`, `MOBILE`, `LIBRARY`,
    `DASHBOARD`.
- Manter labels dos selects sincronizados em `en-us`, `pt-br` e `es-es`.

## Qualidade e validação

- Cobrir componentes, helpers, contratos e branches alterados em 100%.
- Validar os seis modos dos 12 CRUDs em dark/light.
- Executar ciclo CRUD local com registros temporários exclusivos para
  Experiences e Projects, verificar todas as pré-seleções no update e remover
  somente os registros criados para o teste.
- Executar:
  - `npm run lint`;
  - `npm run test:coverage -- --watch=false`;
  - `npm run build`.
- Confirmar por busca que não restam referências ao relation picker antigo.

## Restrições

- Não alterar backend, `hans-ui-design-lib`, header, footer ou rotas públicas.
- Preservar o `TODOLIST.txt` e mudanças preexistentes do usuário.
- Alterar ou excluir apenas os registros temporários criados pela validação.
