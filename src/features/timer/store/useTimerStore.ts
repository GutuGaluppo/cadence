import { useSettingsStore } from "@/features/settings/store/store";
import { useTaskStore } from "@/features/tasks/store/store";
import { Settings, Task, TimerMode, TimerState } from "@/types";
import { create } from "zustand";
import { getTimerModeLabel } from "../getTimerModeLabel";
import { TimerEngine } from "../components/TimerEngine";
import { resolveTimerSettings } from "./resolveTimerSettings";

interface TimerStore {
  mode: TimerMode;
  state: TimerState;
  timeLeft: number;
  totalDuration: number;
  completedCycles: number;
  activeSettings: Settings;
  start: () => void;
  pause: () => void;
  reset: () => void;
  tick: () => void;
  setMode: (mode: TimerMode) => void;
  applyTask: (task: Task | null) => void;
}

export const useTimerStore = create<TimerStore>((set, get) => ({
  mode: TimerMode.FOCUS,
  state: TimerState.IDLE,
  timeLeft: 25 * 60,
  totalDuration: 25 * 60,
  completedCycles: 0,
  activeSettings: useSettingsStore.getState().settings,

  start: () => {
    if (get().state === TimerState.RUNNING) return;
    set({ state: TimerState.RUNNING });
  },

  pause: () => {
    set({ state: TimerState.PAUSED });
  },

  reset: () => {
    const activeSettings = get().activeSettings;
    const initialTime = TimerEngine.calculateInitialTime(get().mode, activeSettings);
    set({
      state: TimerState.IDLE,
      timeLeft: initialTime,
      totalDuration: initialTime,
    });
  },

  tick: () => {
    const { timeLeft, state, mode, completedCycles } = get();
    if (state !== TimerState.RUNNING) return;

    if (timeLeft <= 1) {
      const activeSettings = get().activeSettings;
      const nextMode = TimerEngine.getNextMode(
        mode,
        completedCycles,
        activeSettings.cyclesBeforeLongBreak,
      );
      const nextDuration = TimerEngine.calculateInitialTime(nextMode, activeSettings);

      // Handle completion side effects
      const { soundEnabled } = useSettingsStore.getState().settings;

      if (mode === TimerMode.FOCUS) {
        if (soundEnabled) new Audio("/BreakAlert.mp3").play().catch(() => {});
        const activeTaskId = useTaskStore.getState().activeTaskId;
        if (activeTaskId) {
          useTaskStore.getState().incrementPomodoro(activeTaskId);
        }
      } else if (mode === TimerMode.SHORT_BREAK) {
        if (soundEnabled) new Audio("/FocusAlert.mp3").play().catch(() => {});
      } else if (mode === TimerMode.LONG_BREAK) {
        if (soundEnabled)
          new Audio("/SessionEndAlert.mp3").play().catch(() => {});
      }

      if (
        typeof Notification !== "undefined" &&
        Notification.permission === "granted"
      ) {
        new Notification("Cadence", {
          body: `${getTimerModeLabel(mode)} finished. Starting ${getTimerModeLabel(nextMode)}.`,
        });
      }

      set((state) => ({
        mode: nextMode,
        timeLeft: nextDuration,
        totalDuration: nextDuration,
        completedCycles:
          mode === TimerMode.FOCUS
            ? state.completedCycles + 1
            : state.completedCycles,
        state: TimerState.RUNNING,
      }));

      return;
    }

    set({ timeLeft: timeLeft - 1 });
  },

  setMode: (mode: TimerMode) => {
    const duration = TimerEngine.calculateInitialTime(mode, get().activeSettings);
    set({
      mode,
      state: TimerState.IDLE,
      timeLeft: duration,
      totalDuration: duration,
    });
  },

  applyTask: (task) => {
    const globalSettings = useSettingsStore.getState().settings;
    const effectiveSettings = resolveTimerSettings(globalSettings, task);
    const duration = TimerEngine.calculateInitialTime(
      TimerMode.FOCUS,
      effectiveSettings,
    );

    set({
      mode: TimerMode.FOCUS,
      state: TimerState.IDLE,
      timeLeft: duration,
      totalDuration: duration,
      completedCycles: 0,
      activeSettings: effectiveSettings,
    });
  },
}));

// Sync timer duration and activeSettings whenever global settings change while the timer is idle
useSettingsStore.subscribe((newState) => {
  const { state, mode } = useTimerStore.getState();
  if (state === TimerState.IDLE) {
    const { activeTaskId, tasks } = useTaskStore.getState();
    const activeTask = tasks.find((task) => task.id === activeTaskId) ?? null;
    const activeSettings = resolveTimerSettings(newState.settings, activeTask);
    const duration = TimerEngine.calculateInitialTime(mode, activeSettings);

    useTimerStore.setState({
      timeLeft: duration,
      totalDuration: duration,
      activeSettings,
    });
  }
});
