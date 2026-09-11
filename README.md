# Cadence

Cadence is a local-first Pomodoro desktop app built with `React`, `Vite`, and
`Tauri`. It is designed for focused work sessions, task-aware timing, and a
cleaner desktop flow without browser clutter.

## Installation

### macOS — GitHub Releases

1. Download the latest `.dmg` for macOS from [Releases](https://github.com/GutuGaluppo/cadence/releases/latest).
2. Open the `.dmg` and drag `Cadence.app` into `Applications`.
3. Open Cadence from `Applications` or Launchpad.

#### Seeing "Apple could not verify this app" or "Cadence is damaged"?

That's macOS Gatekeeper, not a problem with your download. Cadence isn't
(yet) signed with a paid Apple Developer certificate, so Gatekeeper can't
confirm who built it and shows this warning for every unsigned app — it
doesn't mean anything is actually broken.

The download is safe to open. Here's how:

1. Right-click (or Control-click) `Cadence.app` in `Applications` and choose
   **Open**, then confirm in the dialog that appears.
2. If that option is hidden, open **System Settings → Privacy & Security**,
   scroll to the Security section, and click **Open Anyway** next to the
   message about Cadence.
3. You only need to do this once — future launches open normally.

### macOS — Homebrew

```bash
brew tap gutugaluppo/cadence
brew install --cask cadence
```

Homebrew removes the quarantine flag automatically, so the app opens
without the Gatekeeper warning above. See
[`homebrew/README.md`](homebrew/README.md) for how the tap is maintained.

### Windows / Linux

Signed builds are planned; see the
[Roadmap](https://gutugaluppo.github.io/cadence/roadmap/) for details.

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
  - `homebrew/README.md`
