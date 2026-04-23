import { create } from "zustand";

export type AppView =
  | "timer"
  | "settings"
  | "focus-duration"
  | "short-break"
  | "long-break"
  | "cycles-before-long-break"
  | "tasks"
  | "task-create"
  | "task-detail";

interface AppViewStore {
  view: AppView;
  setView: (view: AppView) => void;
  resetView: () => void;
}

export const useAppViewStore = create<AppViewStore>((set) => ({
  view: "timer",
  setView: (view) => set({ view }),
  resetView: () => set({ view: "timer" }),
}));
