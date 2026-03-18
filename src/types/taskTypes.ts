export interface Task {
  id: string;
  title: string;
  completed: boolean;
  pomodoroCount: number;
  createdAt: number;
  focusDuration?: number;
  shortBreakDuration?: number;
  longBreakDuration?: number;
  cyclesBeforeLongBreak?: number;
}

export type CreateTaskDTO = {
  title: string;
  focusDuration?: number;
  shortBreakDuration?: number;
  longBreakDuration?: number;
  cyclesBeforeLongBreak?: number;
};

export type UpdateTaskDTO = Partial<Omit<Task, "id" | "createdAt">>;
