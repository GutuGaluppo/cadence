# Guia de Produção — Cadence

Este documento descreve, com base no estado atual do repositório, o passo a passo para colocar o **Cadence** em produção como um app desktop pronto para download, com distribuição pública, build assinado e landing page alinhada com a linguagem visual do produto.

## 1. Objetivo de lançamento

O objetivo não deve ser interpretado como “nenhum bug possível no universo”. Em produção, o critério correto é:

- zero bugs críticos conhecidos
- zero bugs maiores abertos no fluxo principal
- build assinado e instalável
- landing page publicada com CTA de download funcional
- versão rastreável com changelog, assets e rollback simples

## 2. Estado atual do projeto

Hoje o repositório já entrega uma base boa para um app desktop:

- frontend em `React + Vite`
- shell desktop em `Tauri 2`
- persistência local com `SQLite` via `@tauri-apps/plugin-sql`
- configurações locais com `localStorage`
- timer, tarefas, customização de durações e tray icon já implementados

Pontos que ainda impedem um release público maduro:

- `README.md` ainda está genérico
- `src-tauri/Cargo.toml` ainda tem placeholder de descrição e autor
- `src-tauri/src/lib.rs` ainda expõe o comando template `greet`
- `src-tauri/tauri.conf.json` está com `"csp": null`, o que não é uma postura ideal de produção
- não existe pipeline CI/CD no repositório
- não existe suíte de testes automatizados
- não existe landing page no repositório
- não existe fluxo de assinatura/notarização/configuração de distribuição
- não existe página de suporte, changelog público nem política de privacidade

## 3. Critério de pronto para produção

Considere o app “production ready” somente quando todos os itens abaixo estiverem concluídos:

- build local passa sem erros
- smoke test manual aprovado
- regressão dos fluxos principais aprovada
- instalador gerado para cada OS alvo
- assinatura e notarização concluídas para os canais exigidos
- landing page publicada
- botão de download aponta para artefatos reais e versionados
- changelog e release notes publicados
- suporte mínimo definido: email, issue tracker ou formulário

## 4. Escopo mínimo do release 1.0

Para um primeiro lançamento enxuto, o Cadence deve sair com:

- timer Pomodoro estável
- configurações persistidas
- tarefas persistidas em SQLite
- tarefa ativa com sessões customizadas
- notificações sonoras funcionando
- integração básica com tray icon
- janela “always on top” funcionando
- instalador para macOS

Se o lançamento for multi-plataforma desde o primeiro dia, adicionar:

- instalador para Windows
- instalador para Linux
- matriz de QA por sistema operacional

## 5. Ordem recomendada de execução

### Etapa 1 — Congelar escopo e marca

Antes de mexer em infra, fechar:

- nome oficial do produto: `Cadence` ou `Cadence Pomodoro`
- idiomas do app e da landing page
- sistemas operacionais suportados no lançamento
- canal de distribuição: `GitHub Releases`, `site próprio + bucket`, ou ambos

Observação importante:

- o app hoje está majoritariamente em inglês
- se a landing page for em português e o app em inglês, a experiência fica inconsistente
- decisão recomendada:
  - ou lançar app + landing page em inglês
  - ou implementar i18n e lançar tudo em português

### Etapa 2 — Limpar placeholders e metadados de produção

Arquivos a ajustar:

- `README.md`
- `package.json`
- `src-tauri/Cargo.toml`
- `src-tauri/tauri.conf.json`
- `src-tauri/src/lib.rs`

Checklist:

- substituir descrição placeholder em `src-tauri/Cargo.toml`
- substituir `authors = ["you"]`
- remover o comando template `greet`
- revisar `productName`, `identifier` e versão
- garantir que o nome exibido ao usuário está consistente em todos os arquivos
- revisar ícones de app, tray e instalador

### Etapa 3 — Endurecer o app para produção

Itens obrigatórios:

- remover código morto e artefatos de template
- revisar `src-tauri/capabilities/default.json` com princípio de menor privilégio
- trocar `"csp": null` por uma política explícita
- revisar o comportamento de notificações quando a permissão é negada
- validar migrações SQLite em upgrade de versão
- testar corrupção de `localStorage` e fallback seguro

Itens recomendados:

- adicionar tela ou modal “About”
- mostrar versão atual do app
- adicionar link de suporte/feedback
- adicionar fallback visual para erro inesperado

## 6. Qualidade: testes e definição de “bug free”

“Bug free”, na prática, deve significar:

- nenhum bug crítico aberto
- nenhum bug que impeça timer, tarefa, persistência ou instalação
- nenhum bug visual severo na janela principal

### 6.1. Automatizar checagens mínimas

Adicionar scripts de qualidade para rodar em CI:

```bash
pnpm install
pnpm exec tsc --noEmit
cargo fmt --manifest-path src-tauri/Cargo.toml --all --check
cargo clippy --manifest-path src-tauri/Cargo.toml --all-targets -- -D warnings
pnpm tauri build
```

Recomendação:

- adicionar `Vitest` para lógica pura do timer e stores
- adicionar `Playwright` ou smoke runner de desktop para os fluxos essenciais

### 6.2. Cobertura mínima recomendada

Testes unitários:

- cálculo de duração por modo
- transição entre `focus`, `short break` e `long break`
- resolução de settings globais + settings por tarefa
- formatação de tempo

Testes de integração:

- CRUD de tarefas no repositório SQLite
- persistência de settings
- carregamento após reinício

Smoke tests de release:

- abrir o app pela primeira vez
- criar tarefa
- selecionar tarefa ativa
- iniciar, pausar e resetar timer
- alterar settings
- fechar e reabrir o app
- confirmar persistência
- validar áudio
- validar tray icon
- validar `always on top`

### 6.3. Matriz manual de QA

Executar no mínimo:

1. Instalação limpa
2. Primeira abertura
3. Fluxo completo de 1 ciclo de foco
4. Troca automática para pausa
5. Criação, edição implícita e remoção de tarefa
6. Persistência após restart
7. Upgrade da versão anterior para a nova
8. Desinstalação

## 7. Pipeline de release

Hoje o repositório não possui `.github/workflows`. Para produção, adicionar pelo menos:

- `ci.yml`
- `release.yml`

### 7.1. CI obrigatório

O pipeline de CI deve:

- instalar dependências JS e Rust
- rodar `tsc`
- rodar `cargo fmt --check`
- rodar `cargo clippy`
- gerar build de verificação

### 7.2. Release obrigatório

O pipeline de release deve:

- disparar por tag semântica, por exemplo `v1.0.0`
- gerar artefatos por OS
- publicar em `GitHub Releases`
- anexar changelog
- gerar checksums

Recomendação prática:

- usar build matrix por sistema operacional
- não depender de cross-compilation para instaladores finais

## 8. Assinatura e distribuição

### 8.1. macOS

Obrigatório se o app for público:

- `Developer ID Application`
- assinatura do binário
- notarização Apple
- staple do pacote final

Artefatos recomendados:

- `.dmg`
- `.app.tar.gz`

### 8.2. Windows

Obrigatório se houver release para Windows:

- certificado de code signing
- assinatura do `.msi` ou `.exe`

### 8.3. Linux

Se o release incluir Linux:

- decidir formatos: `AppImage`, `deb`, `rpm`
- explicitar distros suportadas

### 8.4. Hospedagem dos downloads

Opções recomendadas:

- `GitHub Releases` como origem primária
- site apontando para os assets da release
- opcionalmente espelhar em `S3`, `R2` ou similar

## 9. Landing page de produção

Hoje o repositório não possui landing page. A recomendação é criar **um projeto separado dentro do mesmo repositório** para não misturar a build do app desktop com a build do site.

Estrutura recomendada:

```text
cadence/
  src/                  # app desktop atual
  src-tauri/            # shell Tauri atual
  site/                 # landing page nova
    src/
    public/
    package.json
  GUIA_PRODUCAO.md
```

### 9.1. Direção visual da landing page

A landing page deve herdar o visual do app atual:

- fundo principal: `#EFEDE9`
- cor primária: `#2E2566`
- texto principal: `#1A1A1A`
- acento: `#E8B93A`
- tipografia: `DM Sans`
- linguagem: minimalista, clara, calma, com foco em ritmo e profundidade

Evitar:

- visual genérico de SaaS
- gradientes roxos padrão
- excesso de cards sem hierarquia
- CTA confuso

### 9.2. Estrutura mínima da landing page

Seções mínimas:

1. Hero
2. Benefícios principais
3. Como funciona
4. Download
5. FAQ curto
6. Footer com suporte e privacidade

### 9.3. Hero pronto

Sugestão de hero, já alinhada ao estilo do app:

**Headline**

`Focus in a calmer rhythm.`

**Subheadline**

`Cadence is a local-first Pomodoro desktop app for deep work, task-based sessions, and a cleaner daily flow.`

**CTA principal**

`Download for macOS`

**CTA secundário**

`See release notes`

### 9.4. Texto curto de apoio

Sugestão:

`Track focused sessions, switch smoothly between work and breaks, and keep your tasks grounded in a lightweight desktop experience. No browser clutter. No account required.`

### 9.5. Seção de benefícios

Blocos recomendados:

- `Task-aware sessions`
  - Attach custom focus and break durations to the task you are working on.
- `Local-first by default`
  - Your tasks and settings stay on your machine.
- `Built for deep work`
  - Tray access, fast startup, and a compact interface designed to stay out of your way.

### 9.6. Seção de download

A seção de download deve exibir:

- versão atual
- sistema operacional suportado
- botão de download por OS
- hash/checksum opcional
- link para changelog

Estrutura mínima:

- `Download for macOS`
- `Windows version coming soon` ou botão real, se já estiver pronto
- `Linux version coming soon` ou botão real, se já estiver pronto

### 9.7. Screenshot e assets

Antes de publicar a landing page, gerar:

- 1 screenshot da tela principal
- 1 screenshot da tela de tarefas
- 1 screenshot da tela de settings
- ícone em alta resolução

Opcional:

- GIF curto mostrando timer + seleção de tarefa

## 10. Conteúdo obrigatório fora da landing page

Além do site e do binário, produção séria pede:

- `CHANGELOG.md`
- política de privacidade
- página de suporte
- email de contato
- FAQ básico

Se houver qualquer analytics ou crash reporting:

- incluir consentimento e política clara

## 11. Release checklist final

### App

- [ ] versão atualizada em `package.json`
- [ ] versão atualizada em `src-tauri/tauri.conf.json`
- [ ] versão atualizada em `src-tauri/Cargo.toml`
- [ ] `README.md` atualizado
- [ ] placeholders removidos
- [ ] CSP revisada
- [ ] capabilities revisadas
- [ ] smoke tests aprovados
- [ ] build local validado

### Distribuição

- [ ] artefatos gerados
- [ ] assinatura aplicada
- [ ] notarização concluída
- [ ] checksums gerados
- [ ] release publicada

### Landing page

- [ ] hero publicado
- [ ] CTA aponta para download real
- [ ] screenshots publicadas
- [ ] release notes acessíveis
- [ ] footer com suporte e privacidade

## 12. Sugestões relevantes que não estavam no prompt

Estas são adições fortemente recomendadas:

### 12.1. Auto-update

Hoje o projeto não indica fluxo de atualização automática. Vale decidir entre:

- release manual via download
- updater do Tauri em uma segunda fase

Para 1.0, release manual é aceitável. Para 1.1+, updater vale muito.

### 12.2. Observabilidade

Mesmo em app local, vale considerar:

- logging estruturado
- captura de erro não fatal
- canal simples de feedback do usuário

### 12.3. Estratégia de rollback

Definir antes do lançamento:

- onde ficam os builds antigos
- como o usuário baixa uma versão anterior
- como comunicar regressão se um release vier com problema

### 12.4. Licença

Definir se o projeto será:

- proprietário
- open source
- freemium

Isso afeta site, repositório, suporte e distribuição.

### 12.5. Internacionalização

Como o app atual está majoritariamente em inglês, vale escolher uma direção antes da landing page:

- manter tudo em inglês no primeiro lançamento
- ou adicionar i18n e publicar em dois idiomas

## 13. Ordem de implementação mais eficiente

Se a meta for colocar o app no ar com o menor risco possível, a ordem recomendada é:

1. limpar placeholders e metadados
2. endurecer segurança e capabilities
3. criar testes mínimos e CI
4. fechar bugs críticos e validar smoke tests
5. configurar assinatura e build de release
6. criar landing page
7. publicar release + site no mesmo dia

## 14. Entregáveis finais esperados

Ao final deste processo, o projeto deve ter:

- app desktop assinado e instalável
- release pública com assets versionados
- landing page publicada com hero, texto e botão de download
- changelog e suporte mínimos publicados
- pipeline básica de CI/release
- zero bugs críticos conhecidos

Se o objetivo for um lançamento realmente forte, o próximo passo depois deste documento é abrir um checklist executável em issues ou milestones e transformar cada etapa acima em tarefas fecháveis.
