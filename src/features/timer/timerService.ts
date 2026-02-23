import { TimerConfig, TimerMode } from "@/types";

export function getDurationByMode(
  mode: TimerMode,
  config: TimerConfig
): number {
  switch (mode) {
    case "focus":
      return config.focusDuration;
    case "shortBreak":
      return config.shortBreakDuration;
    case "longBreak":
      return config.longBreakDuration;
  }
}

export function calculateProgress(
  elapsed: number,
  total: number
): number {
  if (total === 0) return 0;
  return Math.min(elapsed / total, 1);
}

export function shouldTriggerLongBreak(
  completedCycles: number,
  config: TimerConfig
): boolean {
  return (
    completedCycles > 0 &&
    completedCycles % config.cyclesBeforeLongBreak === 0
  );
}

export function getNextMode(
  currentMode: TimerMode,
  completedCycles: number,
  config: TimerConfig
): TimerMode {
  if (currentMode === "focus") {
    return shouldTriggerLongBreak(completedCycles, config)
      ? "longBreak"
      : "shortBreak";
  }

  return "focus";
}