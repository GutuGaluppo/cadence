import { useTaskStore } from "@/features/tasks/store/store";
import { Task } from "@/types";
import { create } from "zustand";
import { useTimerStore } from "./useTimerStore";

interface TimerDisplayStore {
  tasksLoadFailed: boolean;
  ensureTasksLoaded: () => Promise<void>;
  toggleTaskSelection: (task: Task) => void;
}

export const useTimerDisplayStore = create<TimerDisplayStore>((set) => ({
  tasksLoadFailed: false,

  ensureTasksLoaded: async () => {
    const { hasLoaded, isLoading, loadTasks } = useTaskStore.getState();

    if (hasLoaded || isLoading) {
      if (hasLoaded) {
        set({ tasksLoadFailed: false });
      }
      return;
    }

    set({ tasksLoadFailed: false });

    try {
      await loadTasks();
    } catch (error) {
      set({ tasksLoadFailed: true });
      console.error("Failed to load timer preview tasks:", error);
    }
  },

  toggleTaskSelection: (task) => {
    const { activeTaskId, setActiveTask } = useTaskStore.getState();
    const applyTask = useTimerStore.getState().applyTask;
    const nextTask = activeTaskId === task.id ? null : task;

    setActiveTask(nextTask?.id ?? null);
    applyTask(nextTask);
  },
}));
