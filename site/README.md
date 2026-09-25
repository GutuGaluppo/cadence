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

## Capturas do app

As imagens do app em `src/assets/app-*-{light,dark}.png` e o tour animado
(`cadence-tour.gif` + `cadence-tour.webp`) são capturas reais do frontend do
app, geradas por script. Para regenerar depois de mudar a UI:

```bash
pnpm dev            # em outro terminal: app em http://localhost:1420
pnpm site:capture   # captura no Chrome headless e exporta para src/assets/
```

Requer Google Chrome instalado (ou `CHROME_PATH`) e Python 3 com Pillow.
O script popula tarefas de exemplo via `localStorage`, captura cada tela em
2x nos temas claro e escuro e grava o fluxo de navegação do tour. A barra de
título com os botões do macOS é adicionada em `site/scripts/build-app-media.py`.

## Publicação

O repositório inclui `.github/workflows/pages.yml`, que agora builda o site
React e publica `site/dist/` via GitHub Pages.
