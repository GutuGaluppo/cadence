import { TimerConfig, TimerMode } from "@/types";

export function getDurationByMode(
  mode: TimerMode,
  config: TimerConfig
): number {
  switch (mode) {
    case TimerMode.FOCUS:
      return config.focusDuration;
    case TimerMode.SHORT_BREAK:
      return config.shortBreakDuration;
    case TimerMode.LONG_BREAK:
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
  if (currentMode === TimerMode.FOCUS) {
    return shouldTriggerLongBreak(completedCycles, config)
      ? TimerMode.LONG_BREAK
      : TimerMode.SHORT_BREAK;
  }

  return TimerMode.FOCUS;
}