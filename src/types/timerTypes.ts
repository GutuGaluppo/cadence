// export type TimerState =
//   | "idle"
//   | "running"
//   | "paused"
//   | "break"
//   | "longBreak"
//   | "completed";

export enum TimerState {
  IDLE = 'idle',
  RUNNING = 'running',
  PAUSED = 'paused',
  COMPLETED = 'completed',
}

export enum TimerMode {
  FOCUS = "focus",
  SHORT_BREAK = "shortBreak",
  LONG_BREAK = "longBreak",
}

export interface TimerConfig {
  focusDuration: number; // seconds
  shortBreakDuration: number; // seconds
  longBreakDuration: number; // seconds
  cyclesBeforeLongBreak: number;
}
