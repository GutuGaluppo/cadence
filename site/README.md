# Site do Cadence

Landing page estática inicial para o lançamento do app.

## Arquivos

- `index.html`
- `support.html`
- `privacy.html`
- `changelog.html`
- `styles.css`
- `app.js`

## Objetivo

Servir como primeira versão da página pública do produto, separada do app desktop.

## Como publicar

Por ser uma página estática, você pode publicar em:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- bucket estático em S3/R2

O repositório agora inclui `.github/workflows/pages.yml` para publicar `site/`
via GitHub Pages com GitHub Actions.

## Como testar localmente

Exemplo com Python:

```bash
cd site
python3 -m http.server 4173
```

Depois abra `http://localhost:4173`.

## Ajustes recomendados antes da publicação

- atualizar os links para artefatos específicos após a primeira release assinada
- incluir screenshots reais do app quando estiverem prontas
- configurar o domínio público final em `Settings > Pages` se o projeto usar domínio customizado
