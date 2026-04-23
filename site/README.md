# Site do Cadence

Landing page pública migrada para `React + TypeScript` com build estático via
`Vite`.

## Estrutura

- `index.html`
- `privacy/index.html`
- `support/index.html`
- `changelog/index.html`
- `src/`
- `vite.config.ts`
- `tsconfig.json`

## Objetivo

Servir como página pública do produto, separada do app desktop em `Tauri`.

## Como testar localmente

Na raiz do repositório:

```bash
pnpm site:dev
```

## Como gerar build

Na raiz do repositório:

```bash
pnpm site:build
```

O artefato final fica em `site/dist/`.

## Publicação

O repositório inclui `.github/workflows/pages.yml`, que agora builda o site
React e publica `site/dist/` via GitHub Pages.
