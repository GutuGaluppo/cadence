import { useSettingsStore } from "@/features/settings/store/store";
import { useTaskStore } from "@/features/tasks/store/store";
import { TimerMode, TimerState } from "@/types";
import { create } from "zustand";
import { TimerEngine } from "../components/TimerEngine";

interface TimerStore {
  mode: TimerMode;
  state: TimerState;
  timeLeft: number;
  totalDuration: number;
  completedCycles: number;
  start: () => void;
  pause: () => void;
  reset: () => void;
  tick: () => void;
  setMode: (mode: TimerMode) => void;
}

let timerInterval: ReturnType<typeof setInterval> | null = null;

export const useTimerStore = create<TimerStore>((set, get) => ({
  mode: TimerMode.FOCUS,
  state: TimerState.IDLE,
  timeLeft: 25 * 60,
  totalDuration: 25 * 60,
  completedCycles: 0,

  start: () => {
    if (get().state === TimerState.RUNNING) return;

    set({ state: TimerState.RUNNING });

    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      get().tick();
    }, 1000);
  },

  pause: () => {
    if (timerInterval) clearInterval(timerInterval);
    set({ state: TimerState.PAUSED });
  },

  reset: () => {
    if (timerInterval) clearInterval(timerInterval);
    const settings = useSettingsStore.getState().settings;
    const initialTime = TimerEngine.calculateInitialTime(get().mode, settings);
    set({
      state: TimerState.IDLE,
      timeLeft: initialTime,
      totalDuration: initialTime,
    });
  },

  tick: () => {
    const { timeLeft, state, mode, completedCycles } = get();
    if (state !== TimerState.RUNNING) return;

    if (timeLeft <= 0) {
      const settings = useSettingsStore.getState().settings;
      const nextMode = TimerEngine.getNextMode(
        mode,
        completedCycles,
        settings.cyclesBeforeLongBreak,
      );
      const nextDuration = TimerEngine.calculateInitialTime(nextMode, settings);

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
        if (soundEnabled) new Audio("/SessionEndAlert.mp3").play().catch(() => {});
      }

      if (
        typeof Notification !== "undefined" &&
        Notification.permission === "granted"
      ) {
        new Notification("Cadence", {
          body: `${mode.replace("_", " ")} finished. Starting ${nextMode.replace("_", " ")}.`,
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
    if (timerInterval) clearInterval(timerInterval);
    const settings = useSettingsStore.getState().settings;
    const duration = TimerEngine.calculateInitialTime(mode, settings);
    set({
      mode,
      state: TimerState.IDLE,
      timeLeft: duration,
      totalDuration: duration,
    });
  },
}));

// Sync timer duration whenever settings change while the timer is idle
useSettingsStore.subscribe((newState) => {
  const { state, mode } = useTimerStore.getState();
  if (state === TimerState.IDLE) {
    const duration = TimerEngine.calculateInitialTime(mode, newState.settings);
    useTimerStore.setState({ timeLeft: duration, totalDuration: duration });
  }
});
