import { create } from 'zustand';
import { Task, CreateTaskDTO, UpdateTaskDTO } from '@/types';
import { SQLiteTaskRepository } from '@/repositories/implementations/SQLiteTaskRepository';

const repository = new SQLiteTaskRepository();

interface TaskStore {
  tasks: Task[];
  activeTaskId: string | null;
  isLoading: boolean;
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

  loadTasks: async () => {
    set({ isLoading: true });
    const tasks = await repository.getAll();
    set({ tasks, isLoading: false });
  },

  addTask: async (dto: CreateTaskDTO) => {
    const newTask = await repository.create(dto);
    set((state) => ({ tasks: [...state.tasks, newTask] }));
  },

  updateTask: async (id: string, dto: UpdateTaskDTO) => {
    const updatedTask = await repository.update(id, dto);
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? updatedTask : t)),
    }));
  },

  deleteTask: async (id: string) => {
    await repository.delete(id);
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
      activeTaskId: state.activeTaskId === id ? null : state.activeTaskId,
    }));
  },

  setActiveTask: (id: string | null) => {
    set({ activeTaskId: id });
  },

  incrementPomodoro: async (id: string) => {
    const task = get().tasks.find(t => t.id === id);
    if (task) {
      await get().updateTask(id, { pomodoroCount: task.pomodoroCount + 1 });
    }
  }
}));
