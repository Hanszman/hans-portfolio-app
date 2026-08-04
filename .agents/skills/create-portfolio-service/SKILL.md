---
name: create-portfolio-service
description: Create or refactor Angular services in hans-portfolio-app, especially typed domain API services under core/api. Use when adding backend communication, merging public reads with protected admin mutations, introducing cross-cutting frontend infrastructure, or changing request and response contracts consumed by pages and CRUD operations.
---

# Create a Portfolio Service

## Prepare

1. Read `.agents/AGENTS.md`, `README.md`, the target backend controller/contracts, and the nearest frontend domain service and spec.
2. Inspect `src/app/core/api/api.config.ts`, shared API types, interceptors, authentication behavior, and domain consumers.
3. Inspect `git status --short` and preserve unrelated changes.

## Choose the location

- Put backend communication in `src/app/core/api/<domain>/`.
- Keep one service per entity/domain. Combine public GETs and protected admin CUD methods in the same domain service; do not create `<entity>-operations` duplicates.
- Put non-HTTP cross-cutting infrastructure under the relevant `src/app/core/<concern>/` folder only when it genuinely serves multiple features.
- Keep page-local state out of singleton services unless shared lifetime is required.

## Create the contract set

For a domain API service, create or update only:

- `<domain>.service.ts`
- `<domain>.types.ts`
- `<domain>.service.spec.ts`

Place request payloads, response DTO shapes, pagination envelopes, relation records, and enum unions in the types file. Do not leak untyped objects or `any` into consumers.

## Implement

- Use `@Injectable({ providedIn: 'root' })` and `inject(HttpClient)`.
- Build URLs through the shared API URL helper and environment configuration.
- Return typed `Observable<T>` values and let consumers own presentation state.
- Keep raw HTTP details, query serialization, headers, and response normalization inside the service.
- Reuse public GET endpoints for reads and protected `/admin/<resource>` routes for mutations.
- Preserve authentication through the existing interceptor/credential strategy; do not weaken route protection.
- Normalize unusual backend envelopes in a named private method or pure helper when it improves the consumer contract.
- Avoid translating API data in the HTTP service; localization belongs to centralized translation/view-model helpers.
- Keep date and relation mutation payloads aligned with backend DTOs.

## Test

- Use the current Angular HTTP testing utilities and verify method, exact URL/query, body, headers, response type, and error propagation.
- Cover default and custom pagination, trimmed/empty search, every public/admin method, and normalization branches.
- Update shared API mocks only when multiple specs benefit.
- Maintain 100% statements, branches, functions, and lines for relevant files.

## Coordinate contract changes

- When backend work is required, follow the matching skill under `../hans-portfolio-api/.agents/skills/` instead of inferring a server contract only from the frontend.
- Update every affected page/component type and mapper.
- Keep frontend and backend naming identical unless a deliberate adapter documents the difference.
- Update docs when an endpoint, payload, environment variable, or domain boundary changes.

## Validate

```powershell
rtk npm run lint
rtk npm run test:coverage -- --watch=false
rtk npm run build
```

Fix all new warnings before completion.
