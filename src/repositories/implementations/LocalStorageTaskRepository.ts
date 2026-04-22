import { CreateTaskDTO, Task, UpdateTaskDTO } from "@/types";
import { TaskRepository } from "../interfaces/TaskRepository";

interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

function createMemoryStorage(): StorageLike {
  const storage = new Map<string, string>();

  return {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => {
      storage.set(key, value);
    },
  };
}

function resolveStorage(): StorageLike {
  if (typeof localStorage !== "undefined") {
    return localStorage;
  }

  return createMemoryStorage();
}

export class LocalStorageTaskRepository implements TaskRepository {
  private readonly storageKey = "cadence_tasks";

  constructor(private readonly storage: StorageLike = resolveStorage()) {}

  async getAll(): Promise<Task[]> {
    return this.readTasks().sort(
      (left, right) => right.createdAt - left.createdAt,
    );
  }

  async getById(id: string): Promise<Task | null> {
    return this.readTasks().find((task) => task.id === id) ?? null;
  }

  async create(dto: CreateTaskDTO): Promise<Task> {
    const task: Task = {
      id: crypto.randomUUID(),
      title: dto.title,
      completed: false,
      pomodoroCount: 0,
      createdAt: Date.now(),
      focusDuration: dto.focusDuration,
      shortBreakDuration: dto.shortBreakDuration,
      longBreakDuration: dto.longBreakDuration,
      cyclesBeforeLongBreak: dto.cyclesBeforeLongBreak,
    };

    this.writeTasks([task, ...this.readTasks()]);

    return task;
  }

  async update(id: string, dto: UpdateTaskDTO): Promise<Task> {
    const tasks = this.readTasks();
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      throw new Error("Task not found");
    }

    const updatedTask: Task = {
      ...tasks[taskIndex],
      ...dto,
    };

    tasks[taskIndex] = updatedTask;
    this.writeTasks(tasks);

    return updatedTask;
  }

  async delete(id: string): Promise<void> {
    this.writeTasks(this.readTasks().filter((task) => task.id !== id));
  }

  private readTasks(): Task[] {
    const data = this.storage.getItem(this.storageKey);

    if (!data) {
      return [];
    }

    try {
      return JSON.parse(data) as Task[];
    } catch {
      return [];
    }
  }

  private writeTasks(tasks: Task[]): void {
    this.storage.setItem(this.storageKey, JSON.stringify(tasks));
  }
}
