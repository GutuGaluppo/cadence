# Backlog de Produção — Cadence

Este backlog transforma o [GUIA_PRODUCAO.md](/Users/augustogaluppo/development/portifolio-projects/cadence/GUIA_PRODUCAO.md:1) em entregas executáveis, com prioridade, dependências e critérios de aceite.

## Convenções

- `P0`: bloqueia release público
- `P1`: altamente recomendado para lançamento 1.0
- `P2`: pós-lançamento ou melhoria incremental

## Fase 1 — Produto e Metadados

### `P0-01` Fechar posicionamento do release 1.0

Objetivo:

- decidir idioma do app
- decidir sistemas operacionais do lançamento
- decidir canal primário de distribuição

Dependências:

- nenhuma

Critérios de aceite:

- decisão registrada em documento
- escopo do release 1.0 congelado
- canal de distribuição definido: `GitHub Releases`, `site próprio`, ou ambos

### `P0-02` Remover placeholders de template

Objetivo:

- limpar metadados e resíduos de scaffold

Arquivos-alvo:

- `README.md`
- `src-tauri/Cargo.toml`
- `src-tauri/src/lib.rs`
- `src-tauri/tauri.conf.json`

Critérios de aceite:

- `README.md` descreve o produto real
- `authors` e `description` do Cargo estão corretos
- comando `greet` removido
- nome do produto consistente em frontend, Tauri e release

### `P1-03` Exibir versão do app na interface

Objetivo:

- tornar a build rastreável visualmente

Critérios de aceite:

- a versão atual aparece em uma área clara da interface
- a versão reflete a release em `package.json` e `tauri.conf.json`

## Fase 2 — Hardening e Segurança

### `P0-04` Revisar CSP e políticas de runtime

Objetivo:

- sair de `"csp": null` para uma política explícita

Arquivos-alvo:

- `src-tauri/tauri.conf.json`

Critérios de aceite:

- CSP declarada
- app abre e funciona em dev e build
- nenhuma dependência crítica quebra por CSP

### `P0-05` Revisar capabilities do Tauri

Objetivo:

- reduzir permissões ao mínimo necessário

Arquivos-alvo:

- `src-tauri/capabilities/default.json`

Critérios de aceite:

- somente permissões necessárias permanecem
- CRUD de tarefas, tray e fluxos principais continuam funcionando

### `P1-06` Padronizar tratamento de erro

Objetivo:

- evitar falhas silenciosas e melhorar recuperação

Escopo mínimo:

- persistência local
- SQLite
- notificação
- áudio

Critérios de aceite:

- erros inesperados não quebram a UI inteira
- existe fallback visual ou log claro para falhas importantes

## Fase 3 — Qualidade

### `P0-07` Criar suíte mínima de testes unitários

Objetivo:

- proteger a lógica central do timer

Escopo:

- cálculo de duração
- transição de modos
- settings efetivos por tarefa
- formatação de tempo

Critérios de aceite:

- testes rodam por comando único
- cobertura mínima nos módulos puros do timer

### `P0-08` Criar smoke tests de release

Objetivo:

- validar manualmente o fluxo principal antes de cada tag

Critérios de aceite:

- checklist executável documentado
- última execução registrada antes da release

### `P1-09` Adicionar lint e validação Rust/TypeScript ao pipeline

Objetivo:

- impedir regressões triviais

Critérios de aceite:

- CI roda `tsc`
- CI roda `cargo fmt --check`
- CI roda `cargo clippy`

## Fase 4 — Release Engineering

### `P0-10` Criar workflow de CI

Objetivo:

- validar toda PR e branch principal

Critérios de aceite:

- workflow em `.github/workflows/ci.yml`
- roda em push e pull request
- falhas bloqueiam merge

### `P0-11` Criar workflow de release

Objetivo:

- automatizar build por tag

Critérios de aceite:

- tag semântica dispara release
- artefatos são anexados à release
- checksums são publicados

### `P0-12` Configurar assinatura e notarização

Objetivo:

- permitir download público sem fricção de segurança

Critérios de aceite:

- build macOS assinado
- notarização concluída
- artefato final aprovado em máquina limpa

### `P1-13` Definir estratégia de rollback

Objetivo:

- responder rápido a regressões pós-release

Critérios de aceite:

- releases anteriores continuam acessíveis
- rollback documentado

## Fase 5 — Conteúdo e Distribuição

### `P0-14` Publicar landing page

Objetivo:

- apresentar o produto e concentrar downloads

Escopo mínimo:

- hero
- benefícios
- como funciona
- botão de download
- FAQ curto
- footer com suporte

Critérios de aceite:

- página publicada
- responsiva
- CTA principal leva para a rota de release correta

### `P0-15` Publicar assets de marketing

Objetivo:

- sustentar página e release com material visual

Entregáveis:

- ícone final
- screenshot principal
- screenshot de tarefas
- screenshot de settings

Critérios de aceite:

- assets em alta resolução
- consistentes com o visual final do app

### `P1-16` Publicar `CHANGELOG.md`, privacidade e suporte

Objetivo:

- fechar o pacote mínimo de lançamento

Critérios de aceite:

- changelog público
- canal de suporte definido
- política de privacidade publicada

## Fase 6 — Pós-lançamento

### `P2-17` Avaliar auto-update

Objetivo:

- reduzir atrito em releases futuras

Critérios de aceite:

- decisão tomada: sem updater, updater manual ou updater Tauri

### `P2-18` Instrumentar telemetria leve ou feedback in-app

Objetivo:

- capturar qualidade real de uso

Critérios de aceite:

- existe canal de feedback simples
- política de privacidade está alinhada ao dado coletado

## Sequência recomendada

1. `P0-01`
2. `P0-02`
3. `P0-04`
4. `P0-05`
5. `P0-07`
6. `P0-10`
7. `P0-11`
8. `P0-12`
9. `P0-14`
10. `P0-15`
11. `P0-08`
12. release `v1.0.0`

## Gate de release

Não publicar `v1.0.0` antes de concluir:

- `P0-01`
- `P0-02`
- `P0-04`
- `P0-05`
- `P0-07`
- `P0-08`
- `P0-10`
- `P0-11`
- `P0-12`
- `P0-14`
- `P0-15`
