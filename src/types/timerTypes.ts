export type TimerState =
  | "idle"
  | "running"
  | "paused"
  | "break"
  | "longBreak"
  | "completed";

export type TimerMode = "focus" | "shortBreak" | "longBreak";

export interface TimerConfig {
  focusDuration: number; // seconds
  shortBreakDuration: number; // seconds
  longBreakDuration: number; // seconds
  cyclesBeforeLongBreak: number;
}
