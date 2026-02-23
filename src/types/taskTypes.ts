export interface Task {
  id: string;
  title: string;
  completed: boolean;
  pomodoroCount: number;
  createdAt: number;
}

export type CreateTaskDTO = Pick<Task, "title">;
export type UpdateTaskDTO = Partial<Omit<Task, "id" | "createdAt">>;
