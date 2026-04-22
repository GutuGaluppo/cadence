import { getTaskRepository } from "@/repositories/implementations/getTaskRepository";
import { CreateTaskDTO, Task, UpdateTaskDTO } from "@/types";
import { create } from "zustand";

interface TaskStore {
  tasks: Task[];
  activeTaskId: string | null;
  isLoading: boolean;
  hasLoaded: boolean;
  loadTasks: () => Promise<void>;
  addTask: (dto: CreateTaskDTO) => Promise<void>;
  updateTask: (id: string, dto: UpdateTaskDTO) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  setActiveTask: (id: string | null) => void;
  incrementPomodoro: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  activeTaskId: null,
  isLoading: false,
  hasLoaded: false,

  loadTasks: async () => {
    if (get().isLoading || get().hasLoaded) {
      return;
    }

    set({ isLoading: true });

    try {
      const repository = await getTaskRepository();
      const tasks = await repository.getAll();
      set({ tasks, isLoading: false, hasLoaded: true });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  addTask: async (dto: CreateTaskDTO) => {
    const repository = await getTaskRepository();
    const newTask = await repository.create(dto);
    set((state) => ({ tasks: [newTask, ...state.tasks], hasLoaded: true }));
  },

  updateTask: async (id: string, dto: UpdateTaskDTO) => {
    const repository = await getTaskRepository();
    const updatedTask = await repository.update(id, dto);
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? updatedTask : t)),
      hasLoaded: true,
    }));
  },

  deleteTask: async (id: string) => {
    const repository = await getTaskRepository();
    await repository.delete(id);
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
      activeTaskId: state.activeTaskId === id ? null : state.activeTaskId,
      hasLoaded: true,
    }));
  },

  setActiveTask: (id: string | null) => {
    set({ activeTaskId: id });
  },

  incrementPomodoro: async (id: string) => {
    const task = get().tasks.find((item) => item.id === id);

    if (task) {
      await get().updateTask(id, { pomodoroCount: task.pomodoroCount + 1 });
    }
  },
}));
