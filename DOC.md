# Gerenciamento de Estado — Cadence

Este documento descreve, passo a passo, como o gerenciamento de estado funciona na aplicação Cadence, um timer Pomodoro desktop construído com React + Tauri.

---

## Visão Geral

A aplicação utiliza **Zustand** (v5) como biblioteca de gerenciamento de estado, combinado com o **padrão Repository** para persistência de dados. A arquitetura é modular, com três stores independentes:

| Store | Responsabilidade |
|-------|-----------------|
| `useTimerStore` | Controle do timer (tempo, modo, ciclos) |
| `useSettingsStore` | Configurações do usuário |
| `useTaskStore` | Lista e tarefa ativa |

---

## 1. Estrutura dos Stores

### Timer Store
**Arquivo**: [src/features/timer/store/useTimerStore.ts](src/features/timer/store/useTimerStore.ts)

Gerencia todo o estado do timer Pomodoro.

**Estado**:
```typescript
interface TimerStore {
  mode: TimerMode;          // FOCUS | SHORT_BREAK | LONG_BREAK
  state: TimerState;        // IDLE | RUNNING | PAUSED | COMPLETED
  timeLeft: number;         // segundos restantes
  totalDuration: number;    // duração total do ciclo atual
  completedCycles: number;  // ciclos de foco completados
}
```

**Valores iniciais**:
- `mode`: `FOCUS`
- `state`: `IDLE`
- `timeLeft`: `1500` (25 minutos)
- `completedCycles`: `0`

---

### Settings Store
**Arquivo**: [src/features/settings/store/store.ts](src/features/settings/store/store.ts)

Gerencia as preferências do usuário.

**Estado**:
```typescript
interface Settings {
  focusDuration: number;        // minutos de foco (padrão: 25)
  shortBreakDuration: number;   // pausa curta (padrão: 5)
  longBreakDuration: number;    // pausa longa (padrão: 15)
  cyclesBeforeLongBreak: number;// ciclos antes da pausa longa (padrão: 4)
  soundEnabled: boolean;
  alwaysOnTop: boolean;
}
```

---

### Tasks Store
**Arquivo**: [src/features/tasks/store/store.ts](src/features/tasks/store/store.ts)

Gerencia as tarefas do usuário.

**Estado**:
```typescript
interface TaskStore {
  tasks: Task[];
  activeTaskId: string | null;
  isLoading: boolean;
}

interface Task {
  id: string;           // UUID gerado automaticamente
  title: string;
  completed: boolean;
  pomodoroCount: number;
  createdAt: number;    // timestamp Unix
}
```

---

## 2. Persistência de Dados — Padrão Repository

Cada domínio tem uma **interface de repositório** e uma **implementação concreta**, isolando a lógica de acesso a dados dos stores.

```
Store → Interface Repository → Implementação (LocalStorage / SQLite)
```

### Configurações → LocalStorage
**Interface**: [src/repositories/SettingsRepository.ts](src/repositories/SettingsRepository.ts)
**Implementação**: [src/repositories/implementations/LocalStorageSettingsRepository.ts](src/repositories/implementations/LocalStorageSettingsRepository.ts)

- Chave de armazenamento: `cadence_settings`
- Serialização: JSON
- Fallback: `DEFAULT_SETTINGS` se nenhum dado for encontrado

### Tarefas → SQLite
**Interface**: [src/repositories/interfaces/TaskRepository.ts](src/repositories/interfaces/TaskRepository.ts)
**Implementação**: [src/repositories/implementations/SQLiteTaskRepository.ts](src/repositories/implementations/SQLiteTaskRepository.ts)

- Banco de dados: `sqlite:cadence.db` (via plugin Tauri `@tauri-apps/plugin-sql`)
- Carregamento lazy: `Database.load()` na primeira operação
- Mapeamento: colunas `snake_case` do banco → propriedades `camelCase` no TypeScript
- Schema inferido:
```sql
tasks (
  id TEXT,
  title TEXT,
  completed INTEGER,  -- 0 ou 1
  pomodoro_count INTEGER,
  created_at INTEGER  -- timestamp Unix
)
```

---

## 3. Fluxo de Dados

### Componente → Store → Repositório → Storage

```
Ação do usuário (clique, input)
        ↓
Ação do Store (função exposta pelo Zustand)
        ↓
Repositório (getAll / create / update / delete)
        ↓
localStorage ou SQLite
        ↓
set() atualiza o estado do store
        ↓
Componente re-renderiza automaticamente
```

---

## 4. Como os Componentes Consomem o Estado

Os componentes se conectam aos stores via hooks do Zustand com desestruturação direta:

```typescript
// Exemplo: TimerDisplay.tsx
const { state, mode, timeLeft, start, pause, reset } = useTimerStore();
const { settings } = useSettingsStore();
const { activeTaskId } = useTaskStore();
```

Apenas os campos desestruturados causam re-render quando mudam, evitando renderizações desnecessárias.

---

## 5. Comunicação Entre Stores (Cross-Store)

O `useTimerStore` é o orquestrador central. Ele acessa os outros stores diretamente via `getState()` (padrão Zustand para acesso fora de componentes):

```typescript
// Dentro do tick() no useTimerStore
const settings = useSettingsStore.getState().settings;
const { activeTaskId, incrementPomodoro } = useTaskStore.getState();
```

**Dependências entre stores**:

```
useSettingsStore
    ↑ (lê durações e cyclesBeforeLongBreak)
useTimerStore → useTaskStore
    (chama incrementPomodoro ao completar foco)
```

---

## 6. Fluxo Completo — Sessão de Foco

Passo a passo do que acontece quando um ciclo de foco termina:

1. `tick()` é chamado a cada segundo pelo intervalo do timer
2. `timeLeft` chega a `0`
3. `TimerEngine.getNextMode()` calcula o próximo modo com base em `completedCycles` e `cyclesBeforeLongBreak`
4. Se o modo atual era `FOCUS`:
   - `useTaskStore.getState().incrementPomodoro(activeTaskId)` é chamado
   - O repositório SQLite atualiza `pomodoro_count + 1` no banco
   - O estado `tasks` é atualizado no store
5. O modo muda para `SHORT_BREAK` ou `LONG_BREAK`
6. Uma notificação do browser é disparada
7. O timer reinicia automaticamente no novo modo

---

## 7. Fluxo Completo — Alteração de Configuração

1. Usuário ajusta duração em [src/features/settings/DurationStepperPanel.tsx](src/features/settings/DurationStepperPanel.tsx)
2. `updateSettings(newSettings)` é chamado no `useSettingsStore`
3. `LocalStorageSettingsRepository.saveSettings()` persiste no `localStorage`
4. `set({ settings: newSettings })` atualiza o estado do store
5. Componentes que consomem `settings` re-renderizam
6. O `useTimerStore`, na próxima vez que calcular a duração inicial, lerá o valor atualizado

---

## 8. Fluxo Completo — Gerenciamento de Tarefas

### Criar tarefa:
1. Usuário digita título e confirma em [src/features/tasks/components/TaskList.tsx](src/features/tasks/components/TaskList.tsx)
2. `addTask({ title })` é chamado no `useTaskStore`
3. `SQLiteTaskRepository.create()` gera um UUID + timestamp e executa `INSERT`
4. A tarefa retornada é adicionada ao array `tasks` via `set({ tasks: [...tasks, newTask] })`

### Selecionar tarefa ativa:
1. Usuário clica em uma tarefa
2. `setActiveTask(id)` atualiza `activeTaskId` no store (apenas memória, sem persistência)
3. O timer passa a usar essa tarefa ao completar ciclos de foco

### Deletar tarefa:
1. `deleteTask(id)` é chamado
2. SQLite executa `DELETE`
3. Store remove a tarefa do array e limpa `activeTaskId` se for a tarefa deletada

---

## 9. Inicialização da Aplicação

**Arquivo**: [src/app/providers/AppProvider.tsx](src/app/providers/AppProvider.tsx)

Na montagem do `AppProvider`:

1. `useTimerEngine` hook é inicializado — configura a lógica do intervalo do timer
2. `useSettingsStore.loadSettings()` busca configurações do localStorage
3. `useTaskStore.loadTasks()` busca tarefas do SQLite

---

## 10. Sistema de Tipos

**Arquivos**:
- [src/types/timerTypes.ts](src/types/timerTypes.ts) — `TimerState`, `TimerMode` (enums)
- [src/types/settingsTypes.ts](src/types/settingsTypes.ts) — `Settings`, `DEFAULT_SETTINGS`
- [src/types/taskTypes.ts](src/types/taskTypes.ts) — `Task`, `CreateTaskDTO`, `UpdateTaskDTO`
- [src/types/index.ts](src/types/index.ts) — exportações centralizadas (barrel)

**Enums principais**:
```typescript
enum TimerState {
  IDLE      = 'idle',
  RUNNING   = 'running',
  PAUSED    = 'paused',
  COMPLETED = 'completed'
}

enum TimerMode {
  FOCUS       = 'focus',
  SHORT_BREAK = 'shortBreak',
  LONG_BREAK  = 'longBreak'
}
```

---

## 11. Mapa de Arquivos

| Caminho | Descrição |
|---------|-----------|
| [src/features/timer/store/useTimerStore.ts](src/features/timer/store/useTimerStore.ts) | Store do timer |
| [src/features/settings/store/store.ts](src/features/settings/store/store.ts) | Store de configurações |
| [src/features/tasks/store/store.ts](src/features/tasks/store/store.ts) | Store de tarefas |
| [src/features/timer/components/TimerDisplay.tsx](src/features/timer/components/TimerDisplay.tsx) | UI principal do timer |
| [src/features/timer/components/TimerEngine.tsx](src/features/timer/components/TimerEngine.tsx) | Lógica de cálculo de modo/duração |
| [src/features/timer/hooks/useTimerEngine.ts](src/features/timer/hooks/useTimerEngine.ts) | Hook de inicialização do intervalo |
| [src/features/settings/SettingsPanel.tsx](src/features/settings/SettingsPanel.tsx) | Painel de configurações |
| [src/features/settings/DurationStepperPanel.tsx](src/features/settings/DurationStepperPanel.tsx) | Controle de duração por steps |
| [src/features/tasks/components/TaskList.tsx](src/features/tasks/components/TaskList.tsx) | Lista de tarefas |
| [src/app/providers/AppProvider.tsx](src/app/providers/AppProvider.tsx) | Inicialização global |
| [src/repositories/SettingsRepository.ts](src/repositories/SettingsRepository.ts) | Interface do repositório de settings |
| [src/repositories/implementations/LocalStorageSettingsRepository.ts](src/repositories/implementations/LocalStorageSettingsRepository.ts) | Implementação localStorage |
| [src/repositories/interfaces/TaskRepository.ts](src/repositories/interfaces/TaskRepository.ts) | Interface do repositório de tarefas |
| [src/repositories/implementations/SQLiteTaskRepository.ts](src/repositories/implementations/SQLiteTaskRepository.ts) | Implementação SQLite |
| [src/types/index.ts](src/types/index.ts) | Barrel de tipos |
