# Milestones e Issues — GitHub

Este arquivo organiza o release em milestones e já traz issues prontas para copiar para o GitHub do projeto `GutuGaluppo/cadence`.

## Labels sugeridas

- `type:infra`
- `type:frontend`
- `type:desktop`
- `type:docs`
- `type:qa`
- `priority:P0`
- `priority:P1`
- `release:1.0`

## Milestones

### Milestone 1 — Release Foundation

Objetivo:

- remover resíduos de template
- fechar metadados reais do produto
- endurecer configuração de produção

Issues:

- `#1` Definir escopo e canal do release 1.0
- `#2` Remover placeholders e metadados de template
- `#3` Revisar CSP e capabilities do app Tauri

### Milestone 2 — Quality Gate

Objetivo:

- garantir confiança mínima antes da primeira release pública

Issues:

- `#4` Criar suíte mínima de testes para a lógica do timer
- `#5` Criar checklist e execução de smoke tests
- `#6` Adicionar validação TypeScript e Rust ao CI

### Milestone 3 — Release Delivery

Objetivo:

- automatizar build, assinatura e distribuição

Issues:

- `#7` Criar workflow de CI
- `#8` Criar workflow de release por tag
- `#9` Configurar assinatura e notarização do build macOS
- `#10` Definir estratégia de rollback e versionamento

### Milestone 4 — Launch Surface

Objetivo:

- publicar a superfície pública do produto

Issues:

- `#11` Criar landing page de lançamento
- `#12` Gerar screenshots e assets finais
- `#13` Publicar changelog, suporte e política de privacidade

## Issues prontas para copiar

---

## Issue `#1`

**Título**

`Define release 1.0 scope, supported OSes, and distribution channel`

**Labels**

- `type:docs`
- `priority:P0`
- `release:1.0`

**Body**

```md
## Goal

Freeze the scope for Cadence 1.0 before release engineering starts.

## Decisions required

- Release language
- Supported operating systems for 1.0
- Primary distribution channel
- Public product naming convention

## Acceptance criteria

- Scope is documented
- Launch OS matrix is defined
- Distribution channel is defined
- Naming is consistent for app, release, and website
```

---

## Issue `#2`

**Título**

`Remove template placeholders and production metadata gaps`

**Labels**

- `type:desktop`
- `type:docs`
- `priority:P0`
- `release:1.0`

**Body**

```md
## Goal

Replace scaffold placeholders with real product metadata.

## Scope

- Update README with real product information
- Replace placeholder author/description in Cargo manifest
- Remove unused `greet` command from Rust side
- Validate product name and bundle metadata

## Acceptance criteria

- No template text remains in shipping metadata
- README describes the real app
- Cargo manifest is production-ready
- Tauri config metadata is consistent
```

---

## Issue `#3`

**Título**

`Harden Tauri production configuration (CSP and capabilities)`

**Labels**

- `type:desktop`
- `priority:P0`
- `release:1.0`

**Body**

```md
## Goal

Replace permissive runtime defaults with explicit production-safe configuration.

## Scope

- Review current Tauri capability permissions
- Replace `csp: null` with an explicit CSP
- Revalidate the main desktop flows after changes

## Acceptance criteria

- Capabilities follow least privilege
- App works in dev and release builds
- No critical desktop flow regresses
```

---

## Issue `#4`

**Título**

`Add minimum automated tests for timer and settings resolution`

**Labels**

- `type:infra`
- `priority:P0`
- `release:1.0`

**Body**

```md
## Goal

Protect the core timing logic before public release.

## Scope

- Initial duration calculation
- Next mode transition
- Task-specific effective settings
- Time formatting

## Acceptance criteria

- Tests run from one command
- Core timer logic has automated coverage
- Failures are visible in CI
```

---

## Issue `#5`

**Título**

`Create release smoke-test checklist and execute it before every tag`

**Labels**

- `type:qa`
- `priority:P0`
- `release:1.0`

**Body**

```md
## Goal

Establish a repeatable manual quality gate before each release.

## Required flows

- Fresh install
- Create task
- Select active task
- Start/pause/reset timer
- Auto transition to break
- Persist data after restart
- Validate tray behavior
- Validate always-on-top

## Acceptance criteria

- Checklist is documented
- Latest execution is recorded before release
```

---

## Issue `#6`

**Título**

`Add TypeScript and Rust validation commands to CI`

**Labels**

- `type:infra`
- `priority:P1`
- `release:1.0`

**Body**

```md
## Goal

Catch obvious regressions before merge.

## Required commands

- `pnpm exec tsc --noEmit`
- `cargo fmt --check`
- `cargo clippy -- -D warnings`

## Acceptance criteria

- Commands run in CI
- Failures block merge
```

---

## Issue `#7`

**Título**

`Create CI workflow for pushes and pull requests`

**Labels**

- `type:infra`
- `priority:P0`
- `release:1.0`

**Body**

```md
## Goal

Add baseline continuous integration to the repository.

## Acceptance criteria

- Workflow exists under `.github/workflows/ci.yml`
- Runs on push and pull request
- Installs JS and Rust dependencies
- Runs validation commands successfully
```

---

## Issue `#8`

**Título**

`Create tag-driven release workflow with build artifacts and checksums`

**Labels**

- `type:infra`
- `priority:P0`
- `release:1.0`

**Body**

```md
## Goal

Automate release generation from semantic tags.

## Acceptance criteria

- `v*.*.*` tags trigger release workflow
- Build artifacts are attached to GitHub Releases
- Checksums are published
- Release notes can be appended or generated
```

---

## Issue `#9`

**Título**

`Configure macOS code signing and notarization for public distribution`

**Labels**

- `type:desktop`
- `priority:P0`
- `release:1.0`

**Body**

```md
## Goal

Ship a public macOS build without security trust friction.

## Acceptance criteria

- Build is signed
- Build is notarized
- Final artifact passes install/open on a clean machine
```

---

## Issue `#10`

**Título**

`Define rollback plan and release retention policy`

**Labels**

- `type:docs`
- `priority:P1`
- `release:1.0`

**Body**

```md
## Goal

Make regression response operational before launch.

## Acceptance criteria

- Older releases stay accessible
- Rollback steps are documented
- Version retention policy is defined
```

---

## Issue `#11`

**Título**

`Create launch landing page with download CTA aligned to the app brand`

**Labels**

- `type:frontend`
- `priority:P0`
- `release:1.0`

**Body**

```md
## Goal

Publish a focused marketing page that matches Cadence's visual language.

## Minimum sections

- Hero
- Benefits
- How it works
- Download
- FAQ
- Footer

## Acceptance criteria

- Responsive page is deployed
- Primary CTA points to release downloads
- Visual language matches the desktop app
```

---

## Issue `#12`

**Título**

`Produce final app screenshots and release-ready brand assets`

**Labels**

- `type:frontend`
- `type:docs`
- `priority:P0`
- `release:1.0`

**Body**

```md
## Goal

Support the release page and app store-like presentation with real product assets.

## Required assets

- Main timer screenshot
- Tasks screenshot
- Settings screenshot
- Final app icon exports

## Acceptance criteria

- Assets are export-ready
- Assets match the release build
```

---

## Issue `#13`

**Título**

`Publish changelog, support channel, and privacy policy`

**Labels**

- `type:docs`
- `priority:P1`
- `release:1.0`

**Body**

```md
## Goal

Complete the public release surface around the app.

## Acceptance criteria

- `CHANGELOG.md` exists
- Support contact is public
- Privacy policy is available
- Landing page footer links are functional
```
