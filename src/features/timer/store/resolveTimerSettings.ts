import { Settings, Task } from "@/types";

export function resolveTimerSettings(
  globalSettings: Settings,
  task: Task | null,
): Settings {
  if (!task) {
    return globalSettings;
  }

  return {
    ...globalSettings,
    focusDuration: task.focusDuration ?? globalSettings.focusDuration,
    shortBreakDuration:
      task.shortBreakDuration ?? globalSettings.shortBreakDuration,
    longBreakDuration: task.longBreakDuration ?? globalSettings.longBreakDuration,
    cyclesBeforeLongBreak:
      task.cyclesBeforeLongBreak ?? globalSettings.cyclesBeforeLongBreak,
  };
}
