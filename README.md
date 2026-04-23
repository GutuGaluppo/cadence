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

Run the public website in development:

```bash
pnpm site:dev
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

Build the public website:

```bash
pnpm site:build
```

## Project Notes

- Desktop configuration lives in `src-tauri/`
- The initial launch landing page lives in `site/`
- Timer display refactor notes live in `docs/timer-display-refactor.md`
- Production planning docs live in:
  - `GUIA_PRODUCAO.md`
  - `BACKLOG_PRODUCAO.md`
  - `GITHUB_MILESTONES_ISSUES.md`
  - `RELEASE_PLAYBOOK.md`
  - `CHANGELOG.md`
  - `PRIVACY.md`
  - `SUPPORT.md`
