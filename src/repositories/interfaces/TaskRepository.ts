import { Task, CreateTaskDTO, UpdateTaskDTO } from "@/types";

export interface TaskRepository {
  getAll(): Promise<Task[]>;
  getById(id: string): Promise<Task | null>;
  create(task: CreateTaskDTO): Promise<Task>;
  update(id: string, task: UpdateTaskDTO): Promise<Task>;
  delete(id: string): Promise<void>;
}
