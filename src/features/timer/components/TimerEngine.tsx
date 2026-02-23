import { TimerMode, Settings } from '@/types';

export class TimerEngine {
  static calculateInitialTime(mode: TimerMode, settings: Settings): number {
    switch (mode) {
      case "focus":
        return settings.focusDuration * 60;
      case "shortBreak":
        return settings.shortBreakDuration * 60;
      case "longBreak":
        return settings.longBreakDuration * 60;
      default:
        return 25 * 60;
    }
  }

  static getNextMode(currentMode: TimerMode, completedCycles: number, cyclesBeforeLongBreak: number): TimerMode {
    if (currentMode !== "focus") {
      return "focus";
    }

    // If we just finished a focus session
    const totalFocusSessions = completedCycles + 1;
    if (totalFocusSessions % cyclesBeforeLongBreak === 0) {
      return "longBreak";
    }
    return "shortBreak";
  }

  static calculateProgress(timeLeft: number, totalDuration: number): number {
    if (totalDuration === 0) return 0;
    return ((totalDuration - timeLeft) / totalDuration) * 100;
  }
}
