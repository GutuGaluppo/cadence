import { TimerMode, Settings } from '@/types';

export class TimerEngine {
  static calculateInitialTime(mode: TimerMode, settings: Settings): number {
    switch (mode) {
      case TimerMode.FOCUS:
        return settings.focusDuration * 60;
      case TimerMode.SHORT_BREAK:
        return settings.shortBreakDuration * 60;
      case TimerMode.LONG_BREAK:
        return settings.longBreakDuration * 60;
      default:
        return 25 * 60;
    }
  }

  static getNextMode(currentMode: TimerMode, completedCycles: number, cyclesBeforeLongBreak: number): TimerMode {
    if (currentMode !== TimerMode.FOCUS) {
      return TimerMode.FOCUS;
    }

    // If we just finished a focus session
    const totalFocusSessions = completedCycles + 1;
    if (totalFocusSessions % cyclesBeforeLongBreak === 0) {
      return TimerMode.LONG_BREAK;
    }
    return TimerMode.SHORT_BREAK;
  }

}
