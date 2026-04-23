# Timer Display Refactor

## Objective

This refactor had two goals:

- split the timer screen into smaller components with clear ownership
- move navigation and timer-display orchestration to Zustand so the UI no longer depends on callback prop chains

## Resulting Structure

### Timer screen

- `src/features/timer/components/TimerDisplay/TimerDisplay.tsx`
  - composition shell for the timer screen
  - initializes side effects needed by the screen
- `src/features/timer/components/TimerRing/TimerRing.tsx`
  - renders the circular progress ring, mode icon, clock, and play/pause action
  - reads timer state directly from `useTimerStore`
- `src/features/timer/components/FlipDigit/`
  - isolated animated digit rendering
- `src/features/timer/components/ControlPanel/ControlPanel.tsx`
  - reset and settings actions
  - reads timer reset action from `useTimerStore`
  - reads navigation intent from `useAppViewStore`
- `src/features/timer/components/TasksPanel/`
  - task preview list and actions related to task selection
  - reads task data from `useTaskStore`
  - reads local orchestration state from `useTimerDisplayStore`

### State stores

- `src/features/timer/store/useTimerStore.ts`
  - authoritative timer domain state
  - timer mode, running state, remaining time, cycle count, task application
- `src/features/tasks/store/store.ts`
  - authoritative task domain state
  - loading, CRUD, active task selection
- `src/features/timer/store/useTimerDisplayStore.ts`
  - UI orchestration for the timer screen
  - task preview loading status and task selection toggle
- `src/app/store/useAppViewStore.ts`
  - app-level navigation state
  - replaces `handleView` prop drilling between layout and panels

## Why Zustand Here

The timer screen has three kinds of state with different responsibilities:

- domain state
  - timer and task data that must be globally consistent
- screen orchestration state
  - transient UI concerns like preview loading failure or task toggle behavior
- navigation state
  - which panel is currently visible

Using separate stores keeps those concerns explicit without forcing one large shared store.

## Prop Drilling Removed

Before the refactor, navigation depended on callback props such as:

- `handleView`
- `onSettingsOpen`
- `onTasksOpen`
- `onActiveTaskOpen`

After the refactor:

- `MainLayout` reads only the active `view` from `useAppViewStore`
- leaf components dispatch navigation directly with `setView(...)`
- `TimerDisplay` no longer acts as a callback bridge

This reduces component coupling and makes it easier to move or reuse pieces of the timer UI.

## Design Guidelines Going Forward

- Keep domain mutations in domain stores.
- Keep temporary screen-only behavior in a small UI store near the feature.
- Avoid passing callbacks through layout layers when the interaction is really cross-cutting app state.
- Use store selectors in components so each part subscribes only to the state it renders.
- Prefer composition shells like `TimerDisplay` that assemble feature pieces, instead of concentrating business logic there.

## Practical Impact

- smaller components with clearer responsibilities
- easier to test screen logic independently
- less churn in parent components when timer UI changes
- cleaner path to keep expanding the timer feature without rebuilding callback chains
