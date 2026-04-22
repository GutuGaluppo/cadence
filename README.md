# Cadence

Cadence is a local-first Pomodoro desktop app built with `React`, `Vite`, and
`Tauri`. It is designed for focused work sessions, task-aware timing, and a
cleaner desktop flow without browser clutter.

## Stack

- `React 19`
- `Vite 7`
- `Tauri 2`
- `Zustand`
- `SQLite` via `@tauri-apps/plugin-sql`

## Development

Install dependencies:

```bash
pnpm install
```

Run the desktop app in development:

```bash
pnpm tauri dev
```

Run only the frontend:

```bash
pnpm dev
```

## Quality Commands

Typecheck:

```bash
pnpm typecheck
```

Run unit tests:

```bash
pnpm test
```

Build the frontend bundle:

```bash
pnpm build
```

## Project Notes

- Desktop configuration lives in `src-tauri/`
- The initial launch landing page lives in `site/`
- Production planning docs live in:
  - `GUIA_PRODUCAO.md`
  - `BACKLOG_PRODUCAO.md`
  - `GITHUB_MILESTONES_ISSUES.md`
  - `RELEASE_PLAYBOOK.md`
  - `CHANGELOG.md`
  - `PRIVACY.md`
  - `SUPPORT.md`
