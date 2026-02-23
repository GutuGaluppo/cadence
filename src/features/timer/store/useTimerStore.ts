import { create } from "zustand";
import dayjs from "dayjs";
import { TimerMode, TimerState, TimerConfig } from "@/types";
import {
  getDurationByMode,
  getNextMode,
} from "../timerService";

interface TimerStore {
  state: TimerState;
  mode: TimerMode;
  config: TimerConfig;

  startedAt: number | null;
  elapsed: number;
  completedCycles: number;

  start: () => void;
  pause: () => void;
  reset: () => void;
  tick: () => void;
  setMode: (mode: TimerMode) => void;
}

export const useTimerStore = create<TimerStore>((set, get) => ({
  state: "idle",
  mode: "focus",

  config: {
    focusDuration: 1500,
    shortBreakDuration: 300,
    longBreakDuration: 1200,
    cyclesBeforeLongBreak: 4,
  },

  startedAt: null,
  elapsed: 0,
  completedCycles: 0,

  start: () => {
    set({
      state: "running",
      startedAt: dayjs().valueOf(),
    });
  },

  pause: () => {
    set({ state: "paused" });
  },

  reset: () => {
    set({
      state: "idle",
      elapsed: 0,
      startedAt: null,
    });
  },

  tick: () => {
    const {
      startedAt,
      mode,
      config,
      completedCycles,
    } = get();

    if (!startedAt) return;

    const duration = getDurationByMode(mode, config);
    const now = dayjs().valueOf();
    const elapsedSeconds = Math.floor((now - startedAt) / 1000);

    if (elapsedSeconds >= duration) {
      const nextCycles =
        mode === "focus"
          ? completedCycles + 1
          : completedCycles;

      const nextMode = getNextMode(
        mode,
        nextCycles,
        config
      );

      set({
        state: "idle",
        mode: nextMode,
        elapsed: 0,
        startedAt: null,
        completedCycles: nextCycles,
      });

      return;
    }

    set({ elapsed: elapsedSeconds });
  },

  setMode: (mode: TimerMode) => {
    set({
      mode,
      state: "idle",
      elapsed: 0,
      startedAt: null,
    });
  },
}));
